#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="${project_root}/images/hero-3d-source/3D models for Heroic Alpha Station."
output_dir="${project_root}/models/hero-3d"
transform_bin="${GLTF_TRANSFORM_BIN:-gltf-transform}"

if [[ ! -x "${transform_bin}" ]] && ! command -v "${transform_bin}" >/dev/null 2>&1; then
  echo "gltf-transform was not found. Set GLTF_TRANSFORM_BIN to the CLI path." >&2
  exit 2
fi

mkdir -p "${output_dir}"

sources=(
  "f7bb4d1b2b4789df751949cd16904dcc.glb"
  "a5ed2a6e674a97d882e774c88071c6f5.glb"
  "ee5a40b3ebe016602069d8ffe283dfba.glb"
  "4348f3c88282a12b6f30498674a06bed.glb"
  "50546d6fc67527e6370c7219fb7f4282.glb"
  "1426b495a652a73a220f525dc54c83e0.glb"
  "8df3ae092a948b94938e2cffca8673a2.glb"
  "12614b371a080dab0fe3828dd3427374.glb"
)

outputs=(
  "hero-harness-input-dock-v1.glb"
  "hero-harness-chassis-v1.glb"
  "hero-harness-locator-carrier-v1.glb"
  "hero-harness-tool-bank-v1.glb"
  "hero-harness-compatibility-bank-v1.glb"
  "hero-harness-output-station-v1.glb"
  "hero-harness-human-key-v1.glb"
  "hero-protein-ligand-specimen-v1.glb"
)

for index in "${!sources[@]}"; do
  source_path="${source_dir}/${sources[$index]}"
  output_path="${output_dir}/${outputs[$index]}"

  if [[ ! -f "${source_path}" ]]; then
    echo "Missing source model: ${source_path}" >&2
    exit 3
  fi

  if [[ -f "${output_path}" ]]; then
    echo "skip ${outputs[$index]} (already exists)"
    continue
  fi

  echo "optimize ${sources[$index]} -> ${outputs[$index]}"
  "${transform_bin}" optimize "${source_path}" "${output_path}" \
    --compress meshopt \
    --meshopt-level high \
    --texture-compress webp \
    --texture-size 1024 \
    --simplify true \
    --simplify-ratio 0.03 \
    --simplify-error 0.002 \
    --flatten false \
    --join false \
    --palette false \
    --sparse false
done

du -h "${output_dir}"/*.glb
