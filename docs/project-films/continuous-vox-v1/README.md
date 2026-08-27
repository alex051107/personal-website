# 四项目 VOX 连续单镜头方案

## 为什么改成一张总场景

上一版把每个项目拆成三个独立视频片段，优点是文字和对象更容易锁定，缺点是用户必须后期拼接，两个文件边界容易出现硬切、构图跳变和音频断裂。

这一版把每个项目的完整工作流搭成一座连续纸质工作台，并补充三张关键状态参考：

- `master-start-frame` 锁定首帧、完整空间和对象身份；
- `keyframes/01–03` 只锁定中途的重要状态，不是三个视频片段；
- 在 Google Flow 中使用 Gemini Omni Flash 的 10 秒生成长度；
- 全程一台相机沿同一条纸轨移动；
- 阶段切换来自场内对象经过、前景纸片遮挡和焦点转移，不产生文件级 cut；
- 所有动作、环境声、纸张摩擦和机械轻响在一次生成中保持连续。

## 当前文件

| 项目 | start frame | 当前状态 |
|---|---|---|
| EvidenceOps | `evidenceops/master-start-frame.png` | 总场景 + 3 张关键帧已就绪 |
| CarePlan | `careplan/master-start-frame.png` | 总场景 + 3 张关键帧已就绪 |
| Dynamics Atlas | `dynamics-atlas/master-start-frame.png` | 总场景 + 3 张关键帧已就绪 |
| HSP90 / LiGaMD | `hsp90-ligamd/master-start-frame-v2.png` | 总场景 + 3 张关键帧已就绪 |

`hsp90-ligamd/master-start-frame.png` 是修复前版本，只保留作为对照，不作为视频输入。

## Google Flow 路径

1. 新建或打开一个 Flow 项目。
2. 模型选择 `Video → Gemini Omni Flash`。
3. Generation length 选择 `10s`。
4. 把对应项目的 master 图设为 Start frame。
5. 稳定方案：只使用 master 图，直接复制 `video-prompts.zh-CN.md` 中该项目的一条完整提示词。
6. 可选导演参考：如果当前界面支持多参考图，再按顺序加入 `keyframes/01–03`，并使用 `keyframe-index.zh-CN.md` 中的多图前缀。它们只是镜头状态参考，不能分别生成视频。
7. 无论是否加入关键帧，都只生成一个 10 秒文件，不使用 Scenebuilder，不做后期拼接。

## 生成门槛

用户已经明确确认“一张总场景生成一条完整视频”，并允许三至四张重要 frame 作为参考。当前处于 `keyframes-confirmed`。最终 Omni 单镜头提示词已经写入 `video-prompts.zh-CN.md`，参考帧语义与顺序见 `keyframe-index.zh-CN.md`。
