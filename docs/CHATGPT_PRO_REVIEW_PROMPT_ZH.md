### 目标

审查这个个人网站是否真正把“AI for Science、Agent workflow 和可审查的工程证据”讲清楚，并判断当前版本应该保留后精修、重构首页，还是重做 Hero 与项目叙事。请直接检查线上页面和 GitHub 源码，不要根据 README 或下面的自述替实现辩护。

当前版本可能存在结构性问题。不要因为已经制作了大量图片、3D 模型和动效就倾向保留，也不要因为提示词列出了参考来源就默认这些来源已经被有效使用。

### 审查对象

- 线上页面：<https://alex051107.github.io/personal-website/>
- GitHub 仓库：<https://github.com/alex051107/personal-website>
- 本轮实现基线：<https://github.com/alex051107/personal-website/commit/1f73cc57c690ea31808b4fad700885bc5ea6b4cc>
- 审查入口：`docs/REVIEW_GUIDE.md`
- 设计与动效合同：`design.md`
- 第三方来源与许可：`THIRD_PARTY_NOTICES.md`
- Hero 代码：`js/hero-station.js`、`js/hero-particle.js`
- 滚动联动代码：`js/site-motion.js`
- Hero 资源映射：`docs/hero-harness-module-manifest.md`

如有浏览器或 Computer Use，请在 1440px 桌面宽度和约 390px 手机宽度实际操作。运行 Hero，观察六个 Gate，点击 Human Authority 拉杆，滚动四个项目的全部 Step，尝试点击与键盘切换，并检查 reduced-motion。无法访问或无法操作的项目标记为 `CANNOT_VERIFY`，不要补写观察结果。

### 原始设计目标

这个网站不是普通的 AI SaaS 批发页。访问者应该在最初几秒看懂作者在做 AI for Science、科学工作流和 bounded Agent engineering；后续叙事需要说明四个项目分别解决什么问题、AI 或 Agent 做了什么、软件规则控制什么、人保留什么权力、结果留下什么证据。

保留当前偏纸张、碳黑、暖灰和克制黄铜的编辑设计。不要建议紫色、蓝黑渐变、霓虹光晕、玻璃卡片、圆角卡片墙、假 Dashboard、机器人脑图标或通用粒子背景。作者喜欢现在的整体风格、自然头像和大幅项目图片，问题主要在信息是否清楚、动效是否与项目语义绑定、交互是否有高级感。

早期 “Good Move” 提案中值得保留的是 classical-art landing 的高端排版、明暗关系、触摸响应和克制的进入动效。后续反馈已经否决玻璃拟态、蓝黑 AI 配色和为了炫技而存在的特效。请按后续反馈判断，不要把早期提案当成必须恢复的视觉规范。

Hero 应该是一台能读懂的 3D Agent Harness，不是一组抽象模型。可见流程应为 `Contract / TaskPacket → Agent → Tools → six deterministic gates → Trace / State → Human lever → Result`。每个模块需要有有限、可解释的动作。粒子应该表达蛋白质或分子对象与 Agent Harness 的关系，不应只是“看起来像 AI”的装饰。

四个项目的图片、流程图、Step、状态卡和正文必须使用同一个对象与同一条路线。图片要让人一眼看懂输入、AI 或 Agent 动作、工具、规则或 Gate、输出和人工边界。内容顺序应从一般问题与重要性进入具体实现，再到记录结果和限制，尤其要让没有生化背景的读者明白科学对象为什么重要。

滚动应承担解释工作。进入一个项目后，页面可保持主场景可见；滚动到不同 Step 时，场景焦点、当前节点、进入该节点的光路、状态卡、运行记录和解释文字应同步变化。手机端可以改为紧凑的 Sticky Step Dock，但不能劫持原生滚动。

### 最初提供的灵感材料

这些抖音视频记录了最初的审美、3D 和粒子方向。若页面无法访问，保留 `CANNOT_VERIFY`，使用上面的文字目标完成审查。

- Hallmark / 去通用 AI 味：<https://v.douyin.com/qdmmJMICz6A/>
- 五个动效资源网站：<https://v.douyin.com/w5PBVIDOS8s/>
- Motion Sites 等动态参考：<https://v.douyin.com/UvzxXpTvvZ8/>
- Image-to-3D Hero 流程：<https://v.douyin.com/CO2PJSd3JjQ/>
- 3D 粒子网站交互：<https://v.douyin.com/ZWMPFy8AflY/>

### 必须逐项对照的 10 个动效参考

五个资源目录为 Motion Sites <https://motionsites.org/>、React Bits <https://reactbits.dev/>、Uiverse <https://uiverse.io/>、Anime.js <https://animejs.com/> 和 Aceternity UI <https://ui.aceternity.com/>。Motion Sites 中的 “Future State” 与 “Exact” 也是审美检索词，但本轮需要核验的是下面十个已经声明适配的具体对象。

1. MotionSites AI Agent Pipeline：<https://motionsites.org/prompts/dani-0212bfb0-ai-agent-pipeline>
2. MotionSites Agent Plan：<https://motionsites.org/prompts/user-2tkbbpfwyn8ymjznhwgiup3yzvd-agent-plan>
3. React Bits Scroll Expand：<https://reactbits.dev/animations/scroll-expand>
4. React Bits Animated List：<https://reactbits.dev/components/animated-list>
5. Uiverse Progress Status Card：<https://uiverse.io/Cybercom682/ordinary-duck-36>
6. Uiverse Terminal Card：<https://uiverse.io/Yaya12085/soft-jellyfish-99>
7. Anime.js `createDrawable`：<https://animejs.com/documentation/svg/createdrawable/>
8. Anime.js `createMotionPath`：<https://animejs.com/documentation/svg/createmotionpath/>
9. Aceternity UI Sticky Scroll Reveal：<https://ui.aceternity.com/components/sticky-scroll-reveal>
10. Aceternity UI Tracing Beam：<https://ui.aceternity.com/components/tracing-beam>

另外检查这两个曾被提出、后来没有纳入的 21st.dev 参考。判断“拒绝其视觉外观，但保留其中某个交互机制”是否有价值。

- Neon Nebula：<https://21st.dev/r/karthiksivacharan/neon-nebula>
- N Ascii：<https://21st.dev/r/nblairwalker/n-ascii>

### 待核验结论

- C1. 首屏在五秒内能让陌生访问者看懂作者方向是 AI for Science，而不是泛 AI 设计或纯计算生物学作品集。
- C2. Hero 的物体、标签、动效和交互共同解释一条 Agent Harness workflow；用户能看懂拉杆为什么必须位于自动化之外。
- C3. 3D、粒子和光路有项目语义；每个动作代表真实的输入、调用、检查、状态或人工决定。
- C4. 滚动到不同 Step 时，主场景、`Input / Core / Model / Check / Human / State` 节点、路线、状态、运行记录和文字处于同一个阶段，没有内容错位或只换装饰。
- C5. EvidenceOps、Dynamics Atlas、HSP90 / LiGaMD、CarePlan 四个项目都有明确的 `why → input → AI/Agent/ML action → tool/rule/gate → output/record → limitation`，图片与文字逐项对应；“Compare the four systems” 使用统一且有意义的比较维度。
- C6. 10 个参考动效在体验中各自可识别并承担信息功能，没有为了凑数量而重复实现同一种淡入、发光或进度条。
- C7. 页面保留编辑感和自然头像，同时避免典型 AI 模板排版；大图获得足够空间，文字层级和留白没有掩盖信息缺口。
- C8. 生化与科学内容先交代一般问题和决策意义，再进入术语与实现；非专业读者不会被碎片化字段挡在外面。
- C9. 桌面、手机、键盘、触屏和 reduced-motion 都能完成核心叙事；没有横向溢出、焦点丢失、滚动卡顿或持续占用资源的动画。
- C10. 仓库里的图片、GLB、vendored runtime、来源说明和 claim boundary 足够让第三方复查；网页表现与源码、文档没有互相矛盾。

### 输出合同

输出以一个不超过 150 字的总判断开头，其余内容包括以下七项。

1. `C1–C10` 审查表。每项只能标记 `PASS`、`PARTIAL`、`FAIL` 或 `CANNOT_VERIFY`。证据必须指向具体页面区段、可见行为、CSS selector、源码路径或准确网址。
2. 10 个动效参考对照表。每个参考写清当前实现在哪里、保留了什么交互机制、是否只是表面模仿，以及最小修改是什么。
3. Hero 审查。画出当前用户实际能理解的流程，再画出目标流程；指出丢失、错序或看不懂的模块，并给出一份可执行的场景与动作修改说明。
4. 四个项目逐项审查。分别检查图片、流程图、Step、正文和 claim boundary；为每个项目改写一句 `why it matters` 和一句最直白的系统说明。
5. 视觉与内容问题清单。区分排版问题、配图问题、动效问题、内容逻辑问题和技术问题。不要用“更高级”“提高沉浸感”这类无法执行的建议，必须写出对象、状态变化、触发条件和预期结果。
6. 最多 12 项的修复顺序，使用 `P0 / P1 / P2`。每项包含改动位置、改动内容、验收方法。P0 只放会让访问者看不懂项目或让关键交互失效的问题。
7. 最后在 `KEEP_AND_REFINE`、`RESTRUCTURE_HOME`、`REBUILD_HERO_AND_STORIES` 中选择一个，并用一句话说明依据。

### 停止条件

- C1–C10、10 个参考、4 个项目、Hero、移动端和 reduced-motion 都有结果。
- 不把仓库说明当成页面已经做到的证据，不编造没有亲自看到的动画、截图、性能数据或许可结论。
- 外部参考引用原始页面；源码结论固定到提交 `1f73cc57c690ea31808b4fad700885bc5ea6b4cc`。
- 不直接改代码。这一轮只交审查结论和可验收的修改单。
- 总输出不超过 4500 个中文字，表格计入总长度。
