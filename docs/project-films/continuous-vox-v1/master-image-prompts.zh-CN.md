# 四项目连续 VOX 总场景图片提示词

以下四条均为可以独立复制的 GPT Image 图片提示词。每条直接生成该项目 10 秒连续视频所需的唯一 start frame。

## EvidenceOps

```text
用途：scientific-educational；个人网站 EvidenceOps 10 秒连续单镜头的唯一 start frame，16:9。

主要请求：把 EvidenceOps 的完整因果路线搭成一座连续的 VOX 2.5D 纸质新闻解释工作台。必须是一整个物理空间，不是三联画，不分 panel，不出现分镜编号或边框。所有阶段由同一条可追踪的纸轨连接，允许一台相机在 10 秒内从左向右连续移动。

场景：最左侧是论文收件盒与固定标签 SYNTHETIC DEMO、PAPER A；同一纸带把选中页送入 PASSAGE 03，旁边固定四个字段 TEXT、VALUE、UNIT、CONTEXT。画面中央，纸轨展开成四个独立 candidate PAPER A、PAPER B、PAPER C、PAPER D，进入 EXACT SUPPORT 检查板；一个短支路进入 REJECTED 托盘。主轨继续到右侧 HUMAN REVIEW，一张来源页与记录页通过 SOURCE ATTACHED 纸铰链连接，最终面对 RECORDED 抽屉。右侧背景有一条回送纸轨弯回左上论文入口。

风格与材质：高级 VOX 2.5D 剪纸新闻解释；暖象牙无涂层纸、炭黑纸、再生牛皮纸、少量赭黄；4–10mm 纸层、剪裁与撕纸纤维、半调、复印颗粒、干墨、轻微套印误差、真实纸层接触阴影；薄黄铜箔只用于铰链、索引片和极小状态标记，占画面不足 10%。哑光，不要厚重金属、深玻璃展柜、塑料 CGI、镜头光晕或产品摄影 bokeh。

构图：一张超宽感工作台压入标准 16:9；左、中、右区域有层次但没有分栏。相机阅读方向为左到右。前景安排两块无字纸边，供后续运镜时产生自然遮挡。标签保持中央安全区。

文字规则：只允许上述标签，每个逐字出现一次；SOURCE ATTACHED 固定两行。使用凝练英文大写无衬线，黑墨或暖白墨固定在命名纸载体上。其它论文和表格只显示不可读的中性线纹，不生成真实标题、作者、DOI、指标或结论。

禁止：机器人、AI脑、神经球、蓝黑 AI 配色、紫色、霓虹、粒子、发光网络、SaaS UI、真实论文、科学结论、自动批准、额外文字、乱码、logo、水印、字幕条。
```

## CarePlan

```text
用途：scientific-educational；个人网站 CarePlan 10 秒连续单镜头的唯一 start frame，16:9。

主要请求：把 CarePlan 的完整控制流搭成一座连续的 VOX 2.5D 纸质新闻解释工作台。必须是一整个相连场景，不是三联画、流程图卡片或分镜拼贴；所有阶段由同一条纸轨连接，适合一台相机在 10 秒内从左向右走完。

场景：最左侧 SYNTHETIC ORDER 与 CURRENT STATE: NEW 沿纸轨进入 ELIGIBILITY 闸门；短支路进入 STOP，主轨继续到 VERSIONED QUEUE。两张重复 ORDER-01 / V1 在同一幂等锁前，其中一张被 LOCKED DUPLICATE 固定，只剩一个活动 token。唯一 token 进入中央 DRAFT ONLY 起草区；PLAN TYPE、RATIONALE、REVIEW NOTES 是三个空白字段，APPROVAL FIELD ABSENT 是不可开启的封板。纸轨继续经过 SCHEMA CHECK 与 STATE TRANSITION，最后停在 REVIEW PENDING。最右侧一只自然的半调剪纸人手握住自动化外部的纸质杠杆；HUMAN REVIEWER 与 FINAL DECISION OUTSIDE AI 清晰可见。后方回送纸轨连接回左侧新订单。

风格与材质：高级 VOX 2.5D 剪纸新闻解释；暖象牙纸、炭黑纸、牛皮纸、少量赭黄；4–10mm 纸层、剪裁白边、撕纸纤维、半调人手、复印颗粒、干墨、轻微套印误差和真实接触阴影；薄黄铜箔只用于小铰链与锁扣。无蓝黑 AI 色、无紫色、无霓虹、无写实微缩金属玻璃机器。

构图：俯视三分之二，左→右连续阅读；资格闸门、版本队列、AI 起草、验证和人类杠杆属于同一工作台。前景有无字纸边供相机穿越产生场内遮挡，没有文件级转场。

文字规则：所有上述英文标签逐字正确、每个只出现一次，固定在对应纸载体上。其它纸面是不可读线纹。不得生成患者姓名、药物、诊断、处方、治疗建议、批准、签名、日期或真实临床内容。

禁止：自动批准、人脸、第二只手、错误手指、机器人、聊天 UI、绿光成功态、红色洗屏、蓝紫霓虹、额外文字、乱码、logo、水印或字幕。
```

## Dynamics Atlas

```text
用途：scientific-educational；个人网站 Dynamics Atlas 10 秒连续单镜头的唯一 start frame，16:9。

主要请求：把 Dynamics Atlas 做成一座一眼能看懂权限边界的连续纸质 Agent Harness。必须是一整个物理工作台，不分 panel、不做六宫格、不出现分镜编号；同一条纸轨连接输入、Agent 建议、注册工具、六道门、receipt/bundle 与 human scope。

场景：最左侧一张 TASKPACKET 与两张明显不同的数据盘 DATASET A、DATASET B。左中有一辆尺寸较小但非常清楚的纸质 LOCATOR AGENT SIDECAR；它只能把一张 SUGGESTION ONLY 卡推向 MISSING SOURCE，且与实线主执行轨物理断开。主轨进入 REGISTERED TOOL，输出一条 ROUTE STRIP。中右是标题为 6 GATES 的连续纸闸门列，固定牌依次为 IDENTITY、RIGHTS、MAPPING、COVERAGE、MEANING、MATURITY；短支路进入 STRUCTURED STOP。主轨继续到右侧，将 DECISION TRACE、RUN RECEIPT、EVIDENCE BUNDLE 三张纸绑定成一个 RECEIPT + BUNDLE packet，最终停在 HUMAN SCOPE 框中。背景回送轨返回下一张 TaskPacket。

风格与材质：高级 VOX 2.5D 剪纸新闻解释；暖象牙纸、炭黑纸、再生牛皮纸、少量赭黄；剪裁/撕纸纤维、4–10mm 纸层、半调、复印颗粒、干墨、轻微套印误差、真实接触阴影；薄黄铜箔只用于索引、车轮、锁片和铰链。不要写实金属设备、蓝紫赛博风、发光线路或深玻璃。

构图：一个连续横向 Agent harness。相机可以从左侧输入沿主轨横移到右侧 bundle。Locator Agent 必须明显是“建议侧车”，它的支路和主执行轨不连接；Registered Tool 与 6 Gates 在视觉上拥有更明确的执行权。

文字规则：只允许上述短标签，每个出现一次；其它字段、provenance 和 receipt 细节使用不可读中性线纹。不得生成真实数据源、hash、benchmark、科学结果或广义结论。

禁止：Agent 胜利徽章、机器人脸、Agent 自动跨越 gates、未注册工具、蓝黑 AI 配色、紫色霓虹、粒子、SaaS 面板、代码终端、额外文字、乱码、logo、水印或字幕。
```

## HSP90 / LiGaMD

```text
用途：scientific-educational；个人网站 HSP90 / LiGaMD 10 秒连续单镜头的唯一 start frame，16:9。

主要请求：把三条 LiGaMD replica 到谨慎模型选择的完整科学路线搭成一座连续的 VOX 2.5D 纸质工作台。必须是一整个相连场景，不分 panel、不做六宫格；所有阶段由同一条纸轨连接，适合一台相机在 10 秒内从左向右连续移动。这个项目不是 Agent 项目，不加入机器人、Agent 或工具调用幻想。

场景：最左侧一个 HSP90–LIGAND SYSTEM 纸质分子剪影与一张唯一的 ASSAY-DERIVED pKoff 标签。三条分别标注 REPLICA 1、REPLICA 2、REPLICA 3 的剪纸轨迹独立进入三个 SUSTAINED EXIT 标记、三个 512 FRAMES 胶片条和三张 DYNAMIC10 卡。三张 Dynamic10 的对应位置通过现有纸带汇入唯一纸质载体 ONE SYSTEM ROW；其下一行写 STATIC20 + MEAN DYNAMIC10。主轨继续进入标题 N31 SYSTEMS → 27 EXACT-LIGAND GROUPS 的分组台；相同 ligand 纸块在 TRAIN / TEST 分开前锁组，FOLD-LOCAL 固定可见。右侧用相同 folds 进入固定 MODEL A、MODEL B、MODEL C、MODEL D 与 GROUPED DUMMY 行。PAIRED INTERVAL 图中的纸质区间跨过 ZERO，最终竖起 NO MODEL SELECTED。背景三条 replica 纸带回弯到左侧系统卡。

风格与材质：高级 VOX 2.5D 剪纸科学新闻解释；暖象牙纸、炭黑纸、牛皮纸、赭黄/灰/炭黑三种 replica 识别色；4–10mm 纸层、剪裁白边、半调分子图、复印颗粒、干墨、轻微套印误差和真实接触阴影；极少量薄黄铜箔用于锁片与小指针。无写实黄铜铁路、无深玻璃机器、无蓝紫霓虹、无粒子。

构图：左侧 system/replicas，中部 features/system row/grouping，右侧 models/interval/decision，属于同一工作台并由同一纸轨连接。前景无字纸带可提供自然场内遮挡。

文字规则：所有英文标签逐字固定；pKoff 大小写必须正确；N31、27、512、10、20 不得变形或像计数器滚动。图表不生成真实区间端点。

禁止：真实 ligand 名、IC50、物理 koff、模型冠军、胜利奖杯、绿光成功、Agent、机器人、广义泛化结论、额外文字、乱码、logo、水印或字幕。
```
