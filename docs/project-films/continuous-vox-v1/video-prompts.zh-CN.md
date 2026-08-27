# 四项目 Gemini Omni Flash 10 秒连续视频提示词

## 统一使用方法

每个项目必须把本节指定的 master 图片作为 `Start frame`，不要添加 End frame，不要使用 Scenebuilder。模型选择 `Video → Gemini Omni Flash`，画幅 `16:9`，长度 `10s`，输出数量先选 `1`。

每个项目现另有 3 张 `keyframes/` 导演参考图。它们不是三个 clip，也不需要分别生成视频。最稳定的用法仍是只上传 master；如果当前界面支持多参考图，可把三张 keyframe 按 `01 → 02 → 03` 加入，并在下方完整提示词之前加上 `keyframe-index.zh-CN.md` 提供的多图前缀。最终仍只输出一个连续文件。

以下每个代码块都是一条可以独立复制的完整提示词，不需要与其它文件拼接。

---

## EvidenceOps

**Start frame：** `evidenceops/master-start-frame.png`

```text
镜头时长：10 秒，必须只输出一个完整的 10 秒连续视频文件。不得拆分为多个 clip，不得在视频内部剪切，不得生成三联画，不得使用场景切换模板。

叙事目标：在同一个连续的 VOX 纸质工作台中，一口气展示 EvidenceOps 如何把多篇合成论文收窄到一个具体 passage，比较候选段落是否具有 exact support，保留 rejected route，最后把 source-attached record 交给人类查看并记录。观众应当始终能够追踪同一张纸从输入到记录的路线。

严格首帧：把上传的 EvidenceOps master-start-frame.png 当作不可修改的第 0.00 秒首帧。完整保留当前 16:9 构图、俯视三分之二相机角度、左侧论文盒、PAPER A、PASSAGE 03、四个字段标签、四个 candidate carriers、EXACT SUPPORT 检查板、REJECTED 托盘、右侧 HUMAN REVIEW、SOURCE ATTACHED 铰链、RECORDED 抽屉、顶部回送轨、底部纸轨、所有纸张数量、物体位置、比例、颜色、纸纤维、半调纹理、复印颗粒、干墨、薄黄铜箔和接触阴影。不得重新搭景、补画新装置、删掉任何现有阶段或把工作台拆成独立画面。

对象身份锁定：论文盒中的纸张只作为静止来源；唯一活动输入是前排 PAPER A carrier；PASSAGE 03 始终是同一个 passage 载体；PAPER A、PAPER B、PAPER C、PAPER D 始终是四张独立 candidate；EXACT SUPPORT 只有一个检查板和四行固定检查槽；REJECTED 只有一个托盘；右侧只有一份 source-linked record、一只剪纸人手、一支铅笔和一个 RECORDED 抽屉。任何对象都不得复制、分裂、融合、瞬移、变材质或凭空出现。任意时刻最多让约三分之一可见对象运动。

单一连续运镜：全片只使用一条平缓的左向右 editorial tracking move。相机从当前总览位置开始，10 秒内沿底部和中部纸轨向右横移不超过画面宽度的 12%，同时缓慢推近不超过 4%；相机旋转不超过 1°，焦段保持不变。运动使用平滑 ease-in-out，没有停机、回退、重置、第二次运镜、orbit、whip pan、dolly zoom、手持抖动或突然变焦。相机可以被前景无字纸边短暂遮挡，但遮挡发生在同一场景和同一次拍摄中，不是转场或 cut。

逐秒动作：
0.00–0.35 秒：严格保持首帧稳定。只有极轻的纸层环境呼吸和接触阴影变化，相机尚未明显移动。
0.35–1.55 秒：前排 PAPER A 沿现有纸轨向 PASSAGE 03 前进一个短行程；论文盒和其它纸张保持原位。PASSAGE 03 中已有的赭黄框由一个无字纸质定位片从左向右扫过一次，不生成新高亮或新文字。
1.55–2.55 秒：TEXT、VALUE、UNIT、CONTEXT 四个字段标签按从上到下顺序分别轻抬 2–3 毫米并落回原铰链，每个错开约 0.18 秒。字段文字不变化，标签不翻面、不换位。
2.55–4.05 秒：同一 PAPER A carrier 继续沿可见路线进入 candidate rail。一个无字索引片依次经过 PAPER A、PAPER B、PAPER C、PAPER D，每次只做一次轻微停顿。四张候选始终清楚可数，不消失、不交换顺序。
4.05–5.65 秒：EXACT SUPPORT 的四个无字检查滑片按照 TEXT → VALUE → UNIT → CONTEXT 依次移动并锁止。随后 PAPER C 作为 mismatch 沿参考图中已有的短支路滑入 REJECTED 托盘；它必须作为同一张完整纸卡移动，不能在主轨上留下复制品。PAPER A 与来源路线继续保留。
5.65–6.55 秒：相机继续向右。现有前景无字纸边从镜头前经过并遮挡画面约 40%–60%，形成同一空间内的自然视觉桥。禁止全屏遮黑、溶解或 morph。
6.55–8.15 秒：source-linked record 沿主轨抵达 HUMAN REVIEW。右侧剪纸手只用铅笔尖轻触来源页上已有的赭黄区域一次，不写字、不签名、不盖章；SOURCE ATTACHED 铰链始终清晰，来源页与记录页不分离。
8.15–9.45 秒：手和铅笔沿原路径轻微退开。完整 record 保持铰链连接，沿现有纸轨平稳滑入 RECORDED 抽屉；抽屉不关闭，只让一个无字纸锁片轻轻落下，表示“已记录”而非“已批准”。
9.45–10.00 秒：所有主要运动停止。顶部回送轨上的一张无字新输入纸轻微前移，暗示下一轮；稳定终帧包含在 10 秒总时长内，不得额外延长输出。

纸层与焦点：纸盒、passage、candidate rail、检查板、人手和抽屉按真实纸层距离产生轻微视差。只允许一次有来源的缓慢焦点转移：6.20–6.80 秒从 EXACT SUPPORT 转到 HUMAN REVIEW；禁止焦点抽动、全画面突然锐化或景深重建。

文字锁定：必须保留并只允许现有文字 SYNTHETIC DEMO、PAPER A、PASSAGE 03、TEXT、VALUE、UNIT、CONTEXT、PAPER B、PAPER C、PAPER D、EXACT SUPPORT、REJECTED、HUMAN REVIEW、SOURCE ATTACHED、RECORDED。保持每个字符的拼写、大小写、空格、行数、字形、字号、颜色、位置、透视和纸质载体与首帧完全一致。文字像印刷油墨一样固定在原纸面上，只能随原载体做刚体运动。禁止乱码、重写、补字、改字、闪烁、漂移、镜像、模糊、消失、复制、换行或移动到另一载体。所有正文继续保持不可读线纹。不要生成旁白字幕、标题条或浮动 UI。

同步声音：生成连续而克制的纸张工作室环境底噪；0.45 秒一次纸卡滑轨声；1.55–2.55 秒四次轻纸/薄箔 tick；2.80–3.80 秒四次索引轻响；4.10–5.20 秒四次低沉检查锁片声；5.30 秒一次 rejected 托盘软止挡；5.80–6.50 秒连续纸纤维擦镜声；7.10 秒一次铅笔触纸；8.35–9.25 秒纸铰链与抽屉滑动；9.35 秒一次克制锁片声。声音必须在全片连续，不得在阶段之间静音。不要音乐、旁白、对白、胜利音效或电影重击。

禁止事项：禁止文件内剪切、场景重建、三联画、对象融化、纸张变金属/塑料、真实论文内容、作者、DOI、科学结论、自动批准、签名、日期、机器人、AI 脑、蓝紫霓虹、红色洗屏、绿色成功光、粒子、镜头光晕、logo、水印或额外可读文字。
```

---

## CarePlan

**Start frame：** `careplan/master-start-frame.png`

```text
镜头时长：10 秒，必须只输出一个完整的 10 秒连续视频文件。不得拆成多个 clip，不得使用剪切、三联画或模板转场。

叙事目标：在同一座连续纸质 CarePlan 工作台中，展示合成订单先经过确定性 eligibility hard stop，唯一版本进入 AI 的 draft-only 区域，typed draft 再经过 schema 和 state-transition 检查，最终停在 review pending，由自动化外部的人类拥有最终决定。画面不能暗示临床使用或 AI 自动批准。

严格首帧：把上传的 CarePlan master-start-frame.png 作为不可修改的第 0.00 秒首帧。保留左侧 SYNTHETIC ORDER、ELIGIBILITY、STOP 支路、VERSIONED QUEUE、三张 ORDER-01 / V1 卡、LOCKED DUPLICATE、DRAFT ONLY、PLAN TYPE、RATIONALE、REVIEW NOTES、APPROVAL FIELD ABSENT、SCHEMA CHECK、STATE TRANSITION、REVIEW PENDING、右侧半调剪纸人手和杠杆、HUMAN REVIEWER、FINAL DECISION OUTSIDE AI、所有连接纸轨、颜色、材质、物体数量、比例、相机角度和纸层阴影。不得把它们重绘成三个独立镜头。

对象身份锁定：只有一张活动 SYNTHETIC ORDER；STOP 托盘只接收一张演示 duplicate；VERSIONED QUEUE 中始终有三张可数卡，其中两张共享 ORDER-01 / V1，只有一张可以继续；DRAFT ONLY 中只有一支纸质笔和三个空白字段；APPROVAL FIELD ABSENT 是固定封板，不是按钮；SCHEMA CHECK 与 STATE TRANSITION 各一个；REVIEW PENDING 只有一个 dock；右侧只有一只手和一个杠杆。不得新增患者、药物、表单字段、手、按钮或结果。

单一连续运镜：全片只做一次从左向右的平稳 route-follow。相机横移不超过画面宽度的 13%，推近不超过 4%，旋转不超过 1°；速度缓入、匀速、缓出。相机沿同一条底部回送轨和工作轨前进，没有停机、剪切、orbit、第二条相机路径、突然 zoom 或重构图。前景纸边经过镜头只作为场内遮挡。

逐秒动作：
0.00–0.35 秒：严格首帧稳定，所有标签与对象先锁定。
0.35–1.45 秒：一张 SYNTHETIC ORDER 沿现有纸轨进入 ELIGIBILITY。闸门两片纸翼轻闭一次再重新打开主路线；AI 起草区完全不动作。
1.45–2.15 秒：一张 duplicate 演示卡沿短支路滑入 STOP；活动订单保持为同一对象，沿主路线继续。STOP 不闪红光，不触发警报。
2.15–3.45 秒：相机跟随活动订单抵达 VERSIONED QUEUE。两张重复 ORDER-01 / V1 同时向前一个短行程；LOCKED DUPLICATE 的纸挡片闭合，固定其中一张，只让一张活动 token 继续。第三张卡保持静止可见。
3.45–5.35 秒：唯一活动 token 进入 DRAFT ONLY。现有纸质笔尖依次指向 PLAN TYPE、RATIONALE、REVIEW NOTES 三个空白框，每个框只出现一段不可读灰色线纹；不生成治疗内容。APPROVAL FIELD ABSENT 始终封闭且不变化。
5.35–7.10 秒：draft 沿同一纸轨依次经过 SCHEMA CHECK 和 STATE TRANSITION。两个检查窗只让内部无字纸挡片各滑动一次并锁止；不能生成 PASS、APPROVED、勾号或新状态。
7.10–8.60 秒：同一 draft 抵达 REVIEW PENDING 并停止。相机继续向右，使外部人手与杠杆成为视觉重点；所有 AI 区域停止动作。
8.60–9.45 秒：人手只产生轻微握紧和释放的纸质形变，杠杆最多移动 2° 后回到原位，不完成决定；FINAL DECISION OUTSIDE AI 始终清晰，表明系统停在人工边界。
9.45–10.00 秒：所有对象稳定。左侧回送轨上一张新订单纸轻微前移；稳定终帧包含在 10 秒总时长内，不得额外延长。

纸层与焦点：资格闸门、队列、draft panel、检查窗和人手之间产生轻微纸层视差。只允许一次焦点转移：7.60–8.20 秒从 REVIEW PENDING 平滑移到 HUMAN REVIEWER 杠杆。禁止抽焦、镜头呼吸或背景突然锐化。

文字锁定：保留且只允许首帧中的 SYNTHETIC ORDER、CURRENT STATE: NEW、ELIGIBILITY、STOP、VERSIONED QUEUE、ORDER-01 / V1、LOCKED DUPLICATE、DRAFT ONLY、PLAN TYPE、RATIONALE、REVIEW NOTES、APPROVAL FIELD ABSENT、SCHEMA CHECK、STATE TRANSITION、REVIEW PENDING、HUMAN REVIEWER、FINAL DECISION OUTSIDE AI。所有文字固定在原载体，保持拼写、大小写、空格、斜杠、行数、字形、字号、颜色、位置和透视完全一致。禁止新增 APPROVED、药名、患者数据、签名、日期、乱码、闪烁、漂移、镜像、复制或消失。不要旁白字幕或 UI 文案。

同步声音：全程连续低声纸张工作台环境音；0.45 秒纸卡滑动；1.10 秒 eligibility 闸门轻响；1.80 秒 stop 托盘软止挡；2.35–3.30 秒队列落位与一次幂等锁扣；3.70–5.10 秒三次非常轻的纸笔动作；5.55 和 6.45 秒两次检查挡片锁止；7.35 秒 review dock 止挡；8.70 秒人手纸纤维与杠杆极轻摩擦。不要音乐、旁白、对白、医疗设备报警、成功提示音或重低音冲击。

禁止事项：禁止临床建议、真实病人、处方、诊断、自动批准、APPROVED 新文字、模型越过 eligibility、第二只手、人脸、机器人、聊天气泡、蓝紫霓虹、绿色成功光、红色洗屏、粒子、塑料 CGI、logo、水印、额外文字、场景切换或文件内剪切。
```

---

## Dynamics Atlas

**Start frame：** `dynamics-atlas/master-start-frame.png`

```text
镜头时长：10 秒，必须只输出一个完整的 10 秒连续视频文件。不得拆成多个 clip，不得剪切或生成多个独立场景。

叙事目标：在同一座连续纸质 Agent Harness 中，展示 TASKPACKET 与两份分子数据进入；Locator Agent 只能提出 missing-source 建议；REGISTERED TOOL 编译明确路线；六道确定性 gates 决定是否继续；任何接受或阻断结果都形成 receipt/bundle，最终由 HUMAN SCOPE 限定科学声明。必须一眼看懂 Agent 有用但没有执行和批准权。

严格首帧：将上传的 Dynamics Atlas master-start-frame.png 作为不可修改的第 0.00 秒首帧。保留 TASKPACKET、DATASET A、DATASET B、LOCATOR AGENT SIDECAR、SUGGESTION ONLY、MISSING SOURCE、REGISTERED TOOL、ROUTE STRIP、6 GATES、IDENTITY、RIGHTS、MAPPING、COVERAGE、MEANING、MATURITY、STRUCTURED STOP、DECISION TRACE、RUN RECEIPT、EVIDENCE BUNDLE、RECEIPT + BUNDLE、HUMAN SCOPE、所有纸轨、回送轨、对象数量、相对位置、材质、纸纤维、半调、干墨、薄箔、光线与相机角度。不得把总场景拆开或重新生成布局。

权限和对象锁定：TaskPacket 只有一张；两个 dataset 盘必须始终保持不同图案且各一个；Locator Agent 只有一个旁路侧车，它只能移动 SUGGESTION ONLY 卡，不能接触主执行轨、datasets 或 gates；Registered Tool 只有一个；6 Gates 必须恰好六道且顺序不变；STRUCTURED STOP 只有一个支路；DECISION TRACE、RUN RECEIPT、EVIDENCE BUNDLE 各一张并最终绑定成一个 packet；HUMAN SCOPE 只有一个框。不得新增 Agent、工具、gate、bundle、结果或数据。

单一连续运镜：使用一次平稳的左向右 harness route-follow。相机横移不超过画面宽度的 14%，推近不超过 4%，旋转不超过 1°；从 TASKPACKET 与 datasets 开始，沿主轨经过 registered tool 和 gates，最后抵达 receipt/bundle 与 human scope。全片没有 cut、orbit、第二条相机路径、重置、突然 zoom 或转场模板。上方 Agent 旁路与下方主轨通过真实纸层产生视差。

逐秒动作：
0.00–0.35 秒：严格首帧稳定，锁定所有对象和文字。
0.35–1.35 秒：TASKPACKET 沿主轨前进一个短行程。DATASET A 与 DATASET B 只让各自顶部无字来源纸签轻抬并落回，数据盘不旋转、不交换、不融合。
1.35–2.45 秒：LOCATOR AGENT SIDECAR 沿上方旁路向右移动很短距离，只把 SUGGESTION ONLY 卡推向 MISSING SOURCE。虚线建议卡停在 missing-source slot 前；Agent 与主执行轨之间的物理断点必须始终可见。主 TaskPacket 暂停等待，Agent 不操作数据。
2.45–3.70 秒：主 TaskPacket 恢复前进，进入 REGISTERED TOOL。工具只从已有出口展开 ROUTE STRIP；不得出现代码、终端、未注册工具或科学结果。
3.70–6.45 秒：相机沿 route strip 连续经过六道 gates。IDENTITY、RIGHTS、MAPPING、COVERAGE、MEANING、MATURITY 按顺序各让一个无字小锁片向下闭合一次；门牌文字和数量完全静止。每次只动作一道 gate，前一道稳定后下一道再动作。
6.45–7.15 秒：一枚失败演示 token 从 MATURITY 后的已有短支路进入 STRUCTURED STOP；它是单独演示 token，不复制主 packet。主 packet 保持在主轨继续向右。
7.15–8.75 秒：主 packet 到达 binder。DECISION TRACE、RUN RECEIPT、EVIDENCE BUNDLE 三张现有纸页依次向内合拢，成为同一个 RECEIPT + BUNDLE；所有来源关系仍可见，纸页不融合、不变成新对象。
8.75–9.50 秒：绑定后的 packet 沿主轨进入 HUMAN SCOPE 并停止。Locator Agent 此时完全静止且远离结果区域；human scope 只框定记录，不生成批准或广义科学结论。
9.50–10.00 秒：所有主要运动停止，左下回送轨带来下一张无字 TaskPacket 轮廓。稳定终帧包含在 10 秒总时长内，不得额外延长。

纸层与焦点：TaskPacket、两个数据盘、上方 Agent 旁路、主 route、gates、stop tray 和 bundle 产生真实纸层视差。只允许一次焦点转移：6.90–7.50 秒从 gates 转到 receipt/bundle；禁止焦点抽动、全画面突然锐化或焦段变化。

文字锁定：保留且只允许 TASKPACKET、DATASET A、DATASET B、LOCATOR AGENT SIDECAR、SUGGESTION ONLY、MISSING SOURCE、REGISTERED TOOL、ROUTE STRIP、6 GATES、IDENTITY、RIGHTS、MAPPING、COVERAGE、MEANING、MATURITY、STRUCTURED STOP、DECISION TRACE、RUN RECEIPT、EVIDENCE BUNDLE、RECEIPT + BUNDLE、HUMAN SCOPE。保持每个字符、空格、加号、数字、行数、字形、字号、颜色、位置、透视与纸载体不变。禁止乱码、闪烁、漂移、镜像、复制、消失、新 hash、新 benchmark、新数据源或新科学结论。其它详情保持不可读线纹。不要字幕或浮动 UI。

同步声音：全程连续低声档案工作室环境音；0.50 秒 TaskPacket 纸轨声；0.75 和 1.05 秒两个 dataset 纸签轻扣；1.45–2.30 秒侧车纸轮与建议卡滑动；2.75 秒 registered tool 进料；3.90–6.25 秒六次不同但同等克制的纸/薄箔 gate click；6.80 秒 structured stop 软止挡；7.35–8.50 秒三页 binder 合拢；9.05 秒 human-scope 框架止挡。不要音乐、旁白、对白、Agent 语音、胜利音、错误警报或电影冲击。

禁止事项：禁止 Agent 跨入主执行轨、Agent 自主批准、Agent 操作数据、机器人脸、聊天气泡、未注册工具、gate 数量变化、场景切换、文件内剪切、蓝黑 AI 配色、紫色霓虹、发光网络、粒子、代码屏幕、真实数据、fake benchmark、logo、水印或额外文字。
```

---

## HSP90 / LiGaMD

**Start frame：** `hsp90-ligamd/master-start-frame-v2.png`

```text
镜头时长：10 秒，必须只输出一个完整的 10 秒连续视频文件。不得拆成多个 clip，不得剪切、切换场景或生成三联画。

叙事目标：在同一座连续的 VOX 纸质科学工作台中，展示一个 HSP90–ligand system 的三条 LiGaMD replica 分别完成 sustained-exit 与 512-frame 特征提取，三份 Dynamic10 汇入唯一 system row，再按 exact ligand 分组和 fold-local 规则评估固定模型；paired interval 跨过 ZERO，因此最终记录 NO MODEL SELECTED。这个项目不是 Agent 项目，不加入 Agent、机器人或自动决策叙事。

严格首帧：把上传的 HSP90/LiGaMD master-start-frame-v2.png 当作不可修改的第 0.00 秒首帧。完整保留 HSP90–LIGAND SYSTEM、唯一 ASSAY-DERIVED pKoff 标签、REPLICA 1/2/3、三个 SUSTAINED EXIT、三个 512 FRAMES、三张 DYNAMIC10、唯一 ONE SYSTEM ROW、STATIC20 + MEAN DYNAMIC10、N31 SYSTEMS → 27 EXACT-LIGAND GROUPS 分组台、九个可见 group bins、TRAIN、TEST、FOLD-LOCAL、MODEL A/B/C/D、GROUPED DUMMY、PAIRED INTERVAL、ZERO、NO MODEL SELECTED、底部回送轨、所有数字、纸层、颜色、半调、纸纤维、图表和相机角度。不得重新设计分子图、增加模型或删除统计边界。

科学对象锁定：HSP90–ligand system 只有一个；ASSAY-DERIVED pKoff 标签只有一张并同时属于三条 replicas；REPLICA 1/2/3 始终是三条不同纸带；每条 replica 恰好对应一个 sustained-exit、一个 512-frame filmstrip 和一张 Dynamic10；三张 Dynamic10 只能汇入一个 ONE SYSTEM ROW；分组台和九个 bins 数量固定；TRAIN/TEST 只是一对 fold 路线；模型行固定为 A/B/C/D 与 grouped dummy；paired interval 中现有区间数量和 ZERO 位置固定。不得复制 label、replica、system row、group、model 或 interval。

单一连续运镜：全片使用一条从左向右的科学 workflow track。相机横移不超过画面宽度的 14%，推近不超过 4%，旋转不超过 1°，从左侧 system/replicas 沿纸带经过 features、system row、grouping、models，最后抵达 interval decision。速度缓入、匀速、缓出；没有 cut、orbit、回退、第二次运镜、突然 zoom 或重构图。前景回送纸带可以短暂遮挡画面下缘，但不成为转场。

逐秒动作：
0.00–0.35 秒：严格首帧稳定，所有数字、标签与分子图先锁定。
0.35–2.25 秒：REPLICA 1、REPLICA 2、REPLICA 3 三条纸带按 0.18 秒错峰依次前进。每条先让自己的 SUSTAINED EXIT 无字小锁片落下，再让对应 512 FRAMES filmstrip 向右滑动一个短行程，最后让对应 DYNAMIC10 卡上的无字柱点轻微升起并稳定。三个流程保持独立，不同时全部运动。
2.25–3.50 秒：三张 Dynamic10 的对应位置通过现有三条纸带向唯一 ONE SYSTEM ROW 汇合。ONE SYSTEM ROW 与 STATIC20 + MEAN DYNAMIC10 标签完全静止，只让三个无字纸质输入片依次插入；不得把三条 replica 变成三个训练标签。
3.50–5.35 秒：唯一 system-row token 沿主轨进入 N31 SYSTEMS → 27 EXACT-LIGAND GROUPS。九个可见 group bins 按从左上到右下的顺序，每次只让一个无字锁片闭合；相同颜色/形状的 ligand 纸块保持在同一 bin，不跨组、不随机交换。
5.35–6.25 秒：TRAIN 与 TEST 两条 fold 路线从分组台右侧平稳展开；FOLD-LOCAL 标签与已有 preprocessing 边界保持固定。不得让同一 group 同时出现在 train 和 test。
6.25–7.75 秒：同一组 fold tokens 依次经过 MODEL A、MODEL B、MODEL C、MODEL D、GROUPED DUMMY。五个现有小指针只做幅度相同的轻微偏转并回稳；没有模型被放大、点亮、加冠或宣布获胜。
7.75–9.25 秒：PAIRED INTERVAL 中现有纸质区间条按从上到下顺序轻微滑入最终位置。所有区间和端点保持首帧既有数量；候选区间清楚跨过固定 ZERO 线。不得生成新数值或改变 ZERO。
9.25–9.60 秒：NO MODEL SELECTED 纸牌仅轻微向前立起 3–5° 并稳定，没有庆祝、警报或失败爆炸。
9.60–10.00 秒：所有主要运动停止。底部回送纸轨上的三个小箭头只产生极轻微向左回流，暗示回到三条 replicas；稳定终帧包含在 10 秒总时长内，不得额外延长。

纸层与焦点：system card、三条 replica、filmstrips、Dynamic10、system row、group bins、models 和 interval 按真实纸层产生连续视差。只允许一次焦点转移：7.35–7.95 秒从 model rows 平滑转到 PAIRED INTERVAL；禁止焦点抽动、景深重建或镜头焦段改变。

文字与数字锁定：保留且只允许 HSP90–LIGAND SYSTEM、ASSAY-DERIVED pKoff、REPLICA 1、REPLICA 2、REPLICA 3、SUSTAINED EXIT、512 FRAMES、DYNAMIC10、ONE SYSTEM ROW、STATIC20 + MEAN DYNAMIC10、N31 SYSTEMS → 27 EXACT-LIGAND GROUPS、TRAIN、TEST、FOLD-LOCAL、MODEL A、MODEL B、MODEL C、MODEL D、GROUPED DUMMY、PAIRED INTERVAL、ZERO、NO MODEL SELECTED。pKoff 的大小写必须完全不变；N31、27、512、10、20 以及模型字母不得滚动、计数、改字或消失。保持全部拼写、符号、空格、行数、载体、透视、字号、颜色和锐度与首帧一致。禁止乱码、闪烁、漂移、镜像、复制、额外区间端点、真实 ligand 名或真实数值。不要字幕或浮动 UI。

同步声音：生成连续低声纸质科学工作台环境音；0.45–2.10 秒三组错峰纸带、filmstrip 和特征压缩轻响；2.40–3.35 秒三次对齐 click 与一次 system-row 锁扣；3.75–5.15 秒克制的 group-bin 纸锁声；5.60 秒 fold 轨道分叉；6.40–7.60 秒五次完全同等强度的仪器 tick；7.95–9.10 秒纸质 interval 滑动；9.35 秒一次低而克制的 decision latch。不要音乐、旁白、对白、模型胜利音、警报或电影冲击。

禁止事项：禁止物理 koff 声明、IC50、真实 ligand 名、真实区间数值、模型冠军、绿色成功态、失败爆炸、Agent、机器人、DNA 装饰、蓝紫霓虹、粒子云、发光网络、场景切换、文件内剪切、对象复制、文字变化、logo、水印或额外科学结论。
```
