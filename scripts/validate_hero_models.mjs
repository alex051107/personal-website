import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const modelRoot = join(projectRoot, 'models', 'hero-3d');

const expected = [
  'hero-harness-input-dock-v1.glb',
  'hero-harness-chassis-v1.glb',
  'hero-harness-locator-carrier-v1.glb',
  'hero-harness-tool-bank-v1.glb',
  'hero-harness-compatibility-bank-v1.glb',
  'hero-harness-output-station-v1.glb',
  'hero-harness-human-key-v1.glb',
  'hero-protein-ligand-specimen-v1.glb'
];

const requiredExtensions = new Set([
  'EXT_meshopt_compression',
  'EXT_texture_webp',
  'KHR_mesh_quantization'
]);

const failures = [];
const report = [];
let totalBytes = 0;
let totalTriangles = 0;

for (const filename of expected) {
  const path = join(modelRoot, filename);
  let bytes;

  try {
    bytes = readFileSync(path);
  } catch (error) {
    failures.push(`${filename}: missing or unreadable (${error.code || error.message})`);
    continue;
  }

  const size = statSync(path).size;
  totalBytes += size;

  if (size > 1_000_000) failures.push(`${filename}: ${size} bytes exceeds the 1 MB per-file budget`);
  if (bytes.length < 20) failures.push(`${filename}: file is too small to be a GLB`);
  if (bytes.toString('ascii', 0, 4) !== 'glTF') failures.push(`${filename}: invalid GLB magic`);
  if (bytes.readUInt32LE(4) !== 2) failures.push(`${filename}: expected glTF 2.0`);
  if (bytes.readUInt32LE(8) !== bytes.length) failures.push(`${filename}: declared GLB length does not match file size`);

  const jsonChunkLength = bytes.readUInt32LE(12);
  const jsonChunkType = bytes.readUInt32LE(16);
  if (jsonChunkType !== 0x4e4f534a) {
    failures.push(`${filename}: first GLB chunk is not JSON`);
    continue;
  }

  let document;
  try {
    const jsonText = bytes.subarray(20, 20 + jsonChunkLength).toString('utf8').replace(/[\u0000\u0020]+$/u, '');
    document = JSON.parse(jsonText);
  } catch (error) {
    failures.push(`${filename}: invalid JSON chunk (${error.message})`);
    continue;
  }

  if (document.asset?.version !== '2.0') failures.push(`${filename}: JSON asset version is not 2.0`);
  if (!Array.isArray(document.scenes) || document.scenes.length !== 1) failures.push(`${filename}: expected exactly one scene`);
  if (!Array.isArray(document.nodes) || document.nodes.length !== 1) failures.push(`${filename}: expected one fused source node`);
  if (!Array.isArray(document.meshes) || document.meshes.length !== 1) failures.push(`${filename}: expected one fused source mesh`);
  const primitiveCount = (document.meshes || []).reduce((count, mesh) => count + (mesh.primitives || []).length, 0);
  if (primitiveCount !== 1) failures.push(`${filename}: expected one fused source primitive`);
  if (Array.isArray(document.animations) && document.animations.length > 0) failures.push(`${filename}: unexpected baked animation`);

  const actualExtensions = new Set(document.extensionsRequired || []);
  for (const extension of requiredExtensions) {
    if (!actualExtensions.has(extension)) failures.push(`${filename}: missing required ${extension}`);
  }

  const externalUris = [
    ...(document.buffers || []).map((item) => item.uri),
    ...(document.images || []).map((item) => item.uri)
  ].filter(Boolean);
  if (externalUris.length) failures.push(`${filename}: has external resources instead of an embedded GLB payload`);

  let triangles = 0;
  for (const mesh of document.meshes || []) {
    for (const primitive of mesh.primitives || []) {
      const accessor = document.accessors?.[primitive.indices];
      if (accessor && (primitive.mode === undefined || primitive.mode === 4)) {
        triangles += accessor.count / 3;
      }
    }
  }

  if (!Number.isInteger(triangles) || triangles <= 0) failures.push(`${filename}: triangle count could not be verified`);
  if (triangles > 60_000) failures.push(`${filename}: ${triangles} triangles exceeds the 60k module budget`);

  totalTriangles += triangles;
  report.push({ filename, size, triangles });
}

if (totalBytes > 6_000_000) failures.push(`combined payload ${totalBytes} bytes exceeds the 6 MB budget`);

for (const item of report) {
  console.log(`${item.filename}\t${item.size} bytes\t${item.triangles} triangles`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`HERO_MODEL_CHECK PASS files=${report.length} total_bytes=${totalBytes} total_triangles=${totalTriangles}`);
}
