# Personal Website Brand Pass 独立审查提示词

请对 Zhenpeng Liu 的个人网站做一次独立、证据优先的设计与实现审查。本轮只审查已经完成的 **Brand Pass：Hero、字体、文案**。不要因为仓库文档说“完成”就替实现辩护；也不要因为早期需求曾要求大量动效，就把“增加更多效果”当成默认答案。

## 审查对象

- 线上页面：<https://alex051107.github.io/personal-website/>
- GitHub 仓库：<https://github.com/alex051107/personal-website>
- 本轮实现提交：<https://github.com/alex051107/personal-website/commit/d62808a8bb1fd26ab18d7ad2ba191b5e66bffda3>
- Brand Pass 总纲：`docs/BRAND_PASS_BRIEF.md`
- Hero 候选研究：`docs/HERO_REFERENCE_MATRIX.md`
- 字体等内容证明：`docs/TYPOGRAPHY_PROOF.md`
- 文案和 claim change log：`docs/COPY_STYLE_GUIDE.md`
- 浏览器验收：`docs/BRAND_PASS_ACCEPTANCE.md`
- 依赖与 payload：`docs/BRAND_PASS_PAYLOAD.md`
- Hero 实现：`js/hero-station.js`
- 项目滚动和阶段图加载：`js/site-motion.js`
- 来源与许可：`THIRD_PARTY_NOTICES.md`

若线上页面与固定提交不一致，以固定提交为源码证据，并把线上差异写成 deployment mismatch。

## 已接受的基线，不要推翻

- 四个项目各有六张阶段图，共 24 张；图与原生滚动同步。
- 纸张、碳黑、石墨、克制黄铜、自然头像和大图方向保留。
- EvidenceOps、CarePlan、Dynamics Atlas、HSP90 / LiGaMD 是不同科学对象，不应被改写成四个同构 AI Agent 产品。
- 本轮不该再生成一套项目配图，不该恢复“一张概念图 + 六段文字”，也不该增加 React、Spline、Lenis、shader 或新的生产动画 runtime。

## 本轮目标

陌生访问者在最初 8–10 秒应能理解：

1. 作者在做 AI for Science 和 scientific software；
2. 核心工程观点是模型答案之外的 evidence、stopping rules、recorded state 和 human authority；
3. Hero 是一台可理解的 Agent Harness，不是抽象 AI 雕塑；
4. 网站像科学编辑作品集，而不是 SaaS 模板或动效组件展厅。

## 必须实际操作的 Hero 状态

请在 1440px 桌面和约 390px 手机宽度实际操作。无法操作的项目写 `CANNOT_VERIFY`，不要根据文档补观察。

1. **ASSEMBLED**：页面静止；七个模块可识别；Contract、route 和 Human 面板不应遮住模型。
2. **INSPECT**：点击 `Inspect the harness`；模块有限距离分离；七个 label 和 leader line 应绑定真实模块并避免重叠。
3. **FOCUS**：选择 Gates 或另一个模块；目标保留，其他模块变暗；再次选择或 Escape 应恢复完整装置。
4. **PASS**：装置先重新组装，再按 Contract → Agent → Tool → G1–G6 → Receipt 运行；Human release / revise / reject 只在六个 Gate 通过后开放；Human 选择必须改变 Result。
5. **BLOCK**：在 G3 `residue_map` 停止；下游不得伪装成成功；receipt 应记录 block；release 不可用；Result 应为 `BLOCKED` 或 `NEEDS INPUT`。
6. **边界**：检查 reduced motion、Save-Data static fallback、键盘 Enter/Escape、390px 触屏和原生滚动。

## Hero 参考选择的核验方式

不要要求页面把 10 个来源做成 10 个可识别特效。`docs/HERO_REFERENCE_MATRIX.md` 应记录至少 10 个候选及其依赖、许可/复用边界、输入方式、滚动所有权和 KEEP/ADAPT/REJECT。生产实现只应保留一个机制：

> Exploded Scientific Agent Harness with world-bound leader labels

重点参考：

- Motion Prompts — Exploded Product with Leader Labels：<https://motionprompts.dev/component/exploded-product-labels/>
- Motion Prompts — Dotted Path Traveller：<https://motionprompts.dev/component/dotted-path-traveller/>
- Three.js CSS2D label example：<https://threejs.org/examples/css2d_label>
- Theatre.js：<https://www.theatrejs.com/>
- Motion Primitives：<https://motion-primitives.com/>
- Codrops：<https://tympanus.net/codrops/>

判断标准是“机制是否解释真实 scientific object”，不是“像不像参考网站”。不得建议恢复 Lenis、pinned scroll、自动循环、通用粒子、Aurora、霓虹、机器人核心或新的 runtime，除非你先证明当前方案有具体不可修复的问题。

## 字体审查

核验 `proofs/typography/index.html` 是否用同一份真实内容比较：

1. Instrument Serif + Instrument Sans + Geist Mono；
2. Newsreader + IBM Plex Sans + IBM Plex Mono；
3. 原来的系统字体。

检查 1440px 和 390px 的 Hero、比较矩阵、workflow stage、长段落和 technical receipt。生产字体必须本地 WOFF2、有 OFL notice、只 preload 首屏必要字重、无 synthetic bold，并在 macOS / Windows 使用相同 primary family。不要只评价“更好看”；说明 display identity、长文阅读、technical state 区分和手机换行。

## 文案与 claim 审查

首页 thesis 应先给观点，再给领域范围。每个项目开头必须有：

1. 普通读者能懂的 `Why it matters`；
2. 一句 `What the system does`，包含 input、AI/Agent/ML 动作、确定性检查和 output/decision；
3. 一行 `Evidence and boundary`，包含记录结果、评估范围和不成立的结论。

逐项核验以下边界：

- EvidenceOps：70/70 固定公开或标注合成案例，不等于开放式科学准确率或生产使用。
- CarePlan：200/200 checks、120 synthetic orders；公开 harness 不调用模型服务，不是临床或生产系统。
- Dynamics Atlas：13/13、24/24、42/42 是公开 harness / replay 记录，不是 held-out Agent benchmark。
- HSP90：N31 / 27 exact-ligand groups、最低 group-equal MAE 0.8182；paired interval crossed zero；结论是 no model selected，不是 broad generalization 或 physical koff。

查找并指出不必要的 `bounded / inspectable / reviewable / controlled / durable / explicit` 堆叠，以及未解释就出现的 P512、N31、TaskPacket 等缩写。不要通过删除关键限制来“让文案更自信”。

## 性能与实现核验

- 新增生产动画 runtime 应为 0。
- Three.js 在静止和离开视口后应停止 `requestAnimationFrame`。
- 24 张项目图在初始解析时只能有每个项目的当前和相邻图：8 个 `src`、16 个 `data-src`；后续只在成为当前或相邻阶段时补 `src`。
- 保留 native scroll、fallback、reduced motion、keyboard 和 touch。
- 检查 390px 横向溢出、标签遮挡、字体加载失败、404、console error 和 cache fingerprint。

## 输出合同

以一个不超过 120 字的总判断开头，然后输出：

1. `CHANGES_REQUESTED` 或 `READY_TO_MERGE`。
2. 最多 10 条 findings，按 P0 / P1 / P2 排序。每条必须包含可复现行为、具体 selector/文件/行或页面位置、为什么影响理解或正确性、最小修复和验收方法。
3. Hero 五状态表：ASSEMBLED / INSPECT / FOCUS / PASS / BLOCK，每项标 `PASS / PARTIAL / FAIL / CANNOT_VERIFY`。
4. 字体证明表：identity / reading / technical states / 390px / license / preload。
5. 四项目三层文案表，并指出任何超出证据的 claim。
6. 依赖和 payload 结论：新增 runtime、字体成本、阶段图初始窗口。
7. 最后只给一个下一步：如果可合并，说明部署后读回；如果不可合并，说明最先修的一个根因。

## 审查边界

- 不把 README、截图或验收文档当成页面已做到的证明；必须读源码或实际操作。
- 不编造五人陌生访客测试。没有真实参与者就标记为尚未验证。
- 不把 designed / implemented / tested on 写成 proves / ensures / solves。
- 不直接修改代码；本轮只输出独立审查结论。
- 不建议为了数量增加更多图片、节点、扫描线或动画库。
