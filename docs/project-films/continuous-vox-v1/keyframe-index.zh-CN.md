# 四项目关键帧索引与使用方式

## 核心规则

每个项目只有一个视频：master 图是第 0.00 秒首帧和完整空间；三张 keyframe 是导演参考，用来锁定中途出现的对象、状态和终点。它们不代表三个视频文件，也不要求画面硬切到对应构图。

推荐优先级：

1. **最稳定**：只上传 master 作为 Start frame，粘贴完整视频提示词。
2. **界面支持多图参考时**：master 仍是 Start frame；keyframe 01、02、03 按顺序作为 reference / ingredient 加入。
3. 如果加入参考图后模型把画面做成拼贴、硬切或改变首帧，就移除三张 keyframe，只保留 master。提示词已经包含全部关键状态。

## 多图模式前缀

如果上传了 master 和三张 keyframe，把下面这段放在对应项目完整提示词的最前面：

```text
输入图片角色锁定：图片 1 是唯一 Start frame、唯一完整空间与所有对象身份的最高优先级来源；视频必须严格从图片 1 开始。图片 2、图片 3、图片 4 只是同一空间在后续时刻的导演状态参考，分别对应早段、中段和终段。不得把四张图片做成四个镜头文件、幻灯片、拼贴、三联画或硬切；不得逐张复刻相机角度。请在图片 1 的同一座工作台上，以一条连续运镜让对象逐步达到图片 2、图片 3、图片 4 所表达的语义状态，最终只输出一个完整 10 秒视频。
```

## EvidenceOps

- Start frame：`evidenceops/master-start-frame.png`
- 01 `evidenceops/keyframes/01-passage-input.png`：多页论文收窄到 `PASSAGE 03`，同时保留 TEXT / VALUE / UNIT / CONTEXT。
- 02 `evidenceops/keyframes/02-exact-support.png`：四篇候选在同一检查板比对；支持项进入 exact support，不匹配项保留在 rejected route。
- 03 `evidenceops/keyframes/03-human-record.png`：source-attached record 到达人类复核并进入 `RECORDED`，不表达自动批准。

连续语义：`papers → passage → exact support / rejected → human review → recorded`。

## CarePlan

- Start frame：`careplan/master-start-frame.png`
- 01 `careplan/keyframes/01-eligibility-gate.png`：`SYNTHETIC ORDER` 先经过 eligibility；不合格路线进入 STOP，AI drafting 尚未启动。
- 02 `careplan/keyframes/02-versioned-draft.png`：通过路线进入 versioned queue，duplicate 被锁定；AI 只能形成 `DRAFT ONLY`，approval field 缺失。
- 03 `careplan/keyframes/03-human-boundary.png`：schema check 与 state transition 完成后进入 `REVIEW PENDING`；最终控制杆属于 human reviewer。

连续语义：`synthetic order → eligibility / stop → versioned draft → schema/state → human decision outside AI`。

## Dynamics Atlas

- Start frame：`dynamics-atlas/master-start-frame.png`
- 01 `dynamics-atlas/keyframes/01-agent-suggestion.png`：TaskPacket 与两个 dataset 输入；`LOCATOR AGENT` 只给 `SUGGESTION ONLY / Missing source`，不跨越主轨道。
- 02 `dynamics-atlas/keyframes/02-six-gates.png`：registered tool 编译 route，单一纸带依次经过 G1–G6；失败路线进入 `STRUCTURED STOP`。
- 03 `dynamics-atlas/keyframes/03-bundle-human-scope.png`：`EVIDENCE BUNDLE` 展开 Decision Trace、Run Receipt 与 Provenance，自动轨道在 `HUMAN SCOPE` 前结束。

连续语义：`TaskPacket → Agent suggestion → registered tool → six gates / stop → evidence bundle → human scope`。

## HSP90 / LiGaMD

- Start frame：`hsp90-ligamd/master-start-frame-v2.png`
- 01 `hsp90-ligamd/keyframes/01-system-replicas.png`：一个 HSP90–ligand system 绑定一个 assay-derived pKoff，并分成三条独立 replica。
- 02 `hsp90-ligamd/keyframes/02-dynamic10-system-row.png`：每条 replica 的 512-frame 持续退出轨迹编码为 Dynamic10，三条输出合并为唯一 `ONE SYSTEM ROW = STATIC20 + MEAN DYNAMIC10`。
- 03 `hsp90-ligamd/keyframes/03-grouped-validation.png`：标题保留完整的 27 exact-ligand groups，画面延续 master，只展示 3×3＝9 个可见 representative bins；N31 systems 做 train/test 隔离，在同 folds 比较固定模型与 grouped dummy；paired interval crosses zero，所以 `NO MODEL SELECTED`。

连续语义：`system + assay pKoff → three replicas → 512-frame exit → Dynamic10 → one system row → exact-ligand folds → fixed comparison → no model selected`。

这里不出现 Agent：该项目展示的是科学特征工程与分组验证，不是 Agent workflow。
