# 四项目 10 秒连续单镜头导演时间轴

这些是视频提示词之前的导演锁定稿。每个项目只有一张 start frame、一个 10 秒视频文件和一台连续运动的相机。

## 全局运动规则

- `0.0–0.35s` 严格保持上传首帧稳定，供模型锁定对象与文字。
- 一条相机轨迹贯穿 10 秒：缓慢横移为主，推近不超过画面宽度的 5%，旋转不超过 1°。
- 任何时刻最多约三分之一可见对象运动。
- 阶段转换只使用场内遮挡、轨道转弯和焦点转移；禁止剪切、溶解、闪白、液体 morph、粒子传送和突然 zoom。
- 所有可读文字是固定纸面纹理；文字载体可以移动，字符不能重新生成。
- `9.60–10.00s` 保持稳定终态，包含在 10 秒总时长内。
- 生成连续环境音，但不生成旁白、音乐、字幕或新的可读文字。

## EvidenceOps

**一镜到底目标：** 论文进入 → 精确 passage → candidate exact-support 比较 → 人类收到 source-attached record。

| 时间 | 画面与动作 | 声音 |
|---|---|---|
| `0.00–0.35` | 首帧静止；相机锁定左侧论文入口。 | 连续低声纸张工作室环境底噪。 |
| `0.35–1.70` | `PAPER A` 从收件盒沿可见纸轨进入 `PASSAGE 03`；其它论文保持原位。 | 一次柔和纸张抽出声。 |
| `1.70–2.70` | `TEXT / VALUE / UNIT / CONTEXT` 四个字段按顺序轻抬并落回；相机沿轨道缓慢向右。 | 四次克制纸片/薄箔轻扣。 |
| `2.70–4.45` | 同一 paper carrier 继续进入四个 candidate 区；纸质索引片依次掠过 A/B/C/D。 | 四个强度递减的索引 tick。 |
| `4.45–6.10` | `EXACT SUPPORT` 四行检查片依次收紧；一个 mismatch 沿已有支路进入 `REJECTED`。 | 四次锁片声和一次纸托盘止挡。 |
| `6.10–7.80` | 主轨保留的 source-linked carrier 继续向右；前景无字纸边经过镜头形成自然场内遮挡，相机不停。 | 纸纤维擦过声连续跨越遮挡。 |
| `7.80–9.20` | 人类剪纸手用铅笔指向来源；`SOURCE ATTACHED` 保持清晰；record 滑入 `RECORDED`。 | 铅笔轻触、纸铰链、抽屉软止挡。 |
| `9.20–10.00` | 背景回送纸轨轻移一张新输入；所有其它对象稳定。 | 新纸轻响，环境底噪不中断。 |

## CarePlan

**一镜到底目标：** 合成订单先过硬停 → 唯一版本进入 AI 仅起草 → schema/state 验证 → 人类拥有最终决定。

| 时间 | 画面与动作 | 声音 |
|---|---|---|
| `0.00–0.35` | 首帧静止，焦点在 `SYNTHETIC ORDER`。 | 低声纸张工作台环境音。 |
| `0.35–1.65` | 订单沿纸轨进入 `ELIGIBILITY`；闸门先闭合再打开主路线。 | 纸张滑动和一次干净闸门声。 |
| `1.65–2.35` | 一张演示用 duplicate 沿短支路进入 `STOP`；主订单不消失，继续前行。 | 中性止挡声，无红色警报。 |
| `2.35–4.00` | 相机继续向右；两张重复 `ORDER-01 / V1` 到达队列，其中一张被 `LOCKED DUPLICATE` 挡住，只保留一个活动 token。 | 两次队列落位声和一次锁扣。 |
| `4.00–5.85` | 唯一 token 进入 `DRAFT ONLY`；纸质笔尖依次指向三个空白字段，`APPROVAL FIELD ABSENT` 始终封闭。 | 三次柔和笔划，不生成真实内容。 |
| `5.85–7.55` | draft 沿同一纸轨先后穿过 `SCHEMA CHECK` 与 `STATE TRANSITION`；两个检查窗只移动无字挡片。 | 两次低沉纸板锁止声。 |
| `7.55–9.20` | 卡片停在 `REVIEW PENDING`；相机焦点转向外部 `HUMAN REVIEWER` 杠杆；人手只握住，不拉下。 | 安静杠杆室声和一次手部纸纤维摩擦。 |
| `9.20–10.00` | 所有自动化部件停止；新订单在左侧入口微微前移。 | 环境音连续，不出现成功提示音。 |

## Dynamics Atlas

**一镜到底目标：** TaskPacket 与两份数据进入 → Locator Agent 只提出建议 → 注册工具和六道确定性 gates 执行 → receipt/bundle 进入 human scope。

| 时间 | 画面与动作 | 声音 |
|---|---|---|
| `0.00–0.35` | 首帧静止；`TASKPACKET`、`DATASET A`、`DATASET B` 同时可见。 | 低声档案工作室环境底噪。 |
| `0.35–1.55` | 两份数据盘仅展开自己的来源纸签；TaskPacket 沿主轨前进。 | 两次纸盘落位和一次纸轨滑动。 |
| `1.55–2.70` | `LOCATOR AGENT SIDECAR` 沿旁路轻移，只把 `SUGGESTION ONLY` 推向 `MISSING SOURCE`；它与主执行轨保持断开。 | 一次轻微侧车滚动与建议卡滑出声。 |
| `2.70–4.05` | 主轨上的 TaskPacket 进入 `REGISTERED TOOL`；route strip 从现有出口连续展开。 | 纸带进料和短促工具锁定声。 |
| `4.05–6.65` | 相机沿 route strip 平滑经过六道 gates；每道 gate 只移动一个小锁片，依次解析。 | 六次不同音高但克制的纸/薄箔 click。 |
| `6.65–7.35` | 一个失败演示 token 进入 `STRUCTURED STOP`；主 token 保持在执行轨继续前进。 | 一次短纸带分流和托盘止挡。 |
| `7.35–9.20` | `DECISION TRACE / RUN RECEIPT / EVIDENCE BUNDLE` 三页在同一 binder 内闭合成 packet，并停在 `HUMAN SCOPE`。 | 三页纸合拢、binder 轻扣、框架止挡。 |
| `9.20–10.00` | Locator Agent 完全静止；回送轨带来下一张 TaskPacket。 | 环境底噪和很轻的新纸声。 |

## HSP90 / LiGaMD

**一镜到底目标：** 三条 replica 独立提取 → 汇成一个 system row → exact-ligand grouped folds → 区间跨零，因此不选择模型。

| 时间 | 画面与动作 | 声音 |
|---|---|---|
| `0.00–0.35` | 首帧静止；HSP90–ligand system 与唯一 `ASSAY-DERIVED pKoff` 同时清晰。 | 低声纸张科学工作台环境音。 |
| `0.35–2.25` | 三条 replica 纸带错峰展开；每条依次经过自己的 `SUSTAINED EXIT`、`512 FRAMES` 和 `DYNAMIC10`，不互相合并。 | 三组错峰纸带、胶片和压缩轻响。 |
| `2.25–3.55` | 三张 Dynamic10 卡的对应位置沿现有纸带汇入唯一 `ONE SYSTEM ROW / STATIC20 + MEAN DYNAMIC10`。 | 三次对齐 click 和一次汇总锁扣。 |
| `3.55–5.60` | system row 进入 `N31 SYSTEMS → 27 EXACT-LIGAND GROUPS`；同形 ligand 纸块在 TRAIN/TEST 分开前锁成一组。 | 分组格轻移和九个非常轻的纸盒锁止，不做密集连响。 |
| `5.60–6.65` | TRAIN 与 TEST 路线展开；`FOLD-LOCAL` 固定不动。 | 一次轨道分叉声。 |
| `6.65–8.15` | 同一 folds 依次经过 MODEL A/B/C/D 与 GROUPED DUMMY；只有小指针动作，没有冠军。 | 五次相同强度的仪器 tick。 |
| `8.15–9.45` | `PAIRED INTERVAL` 的现有区间条轻微落位并跨过 `ZERO`；`NO MODEL SELECTED` 卡竖起，无庆祝。 | 纸质区间滑动和一次克制决定锁扣。 |
| `9.45–10.00` | 三条 replica 回送纸带在背景轻动，所有数字和标签稳定。 | 环境底噪连续，结束无胜利音。 |
