# Copy Style Guide

## Core position

The site is about the scientific software around an AI or model result: the
input, the automated move, the rule that can stop it, the record it leaves,
and the person who owns the final decision.

This is a more useful through-line than listing every technical domain at the
top of the page. It connects the Agent Harness to four different scientific
objects without pretending that the four projects share one model or one
product architecture.

## Homepage thesis test

### Candidate A

> AI can search, draft, and compare. I build scientific systems that make the
> evidence, stopping rules, and final decision visible.

Strength: concise and close to the Brand Pass brief. Weakness: “systems” and
“visible” remain abstract.

### Candidate B — selected

> AI can search, draft, and compare. I build the scientific software around
> the answer: the evidence it came from, the rules that can stop it, and the
> person who decides what happens next.

Strength: names the work as software and turns three architecture nouns into
three actions a visitor can picture. It also leads directly into the Hero.

Supporting paragraph:

> My projects span molecular data, scientific ML, source-grounded evidence,
> and human-reviewed workflows. Each one shows the input, the automated move,
> the stopping condition, and the record left behind.

### Candidate C

> A scientific model can return an answer. I work on the evidence, software
> rules, and review path that determine whether the answer can be used.

Strength: plain. Weakness: “can be used” is broader than several current
prototype and method-note claims.

## Voice

Write as a technically strong student and research engineer explaining real
work to an intelligent visitor.

- Lead with the concrete problem.
- Name the scientific object before the architecture term.
- Keep the actor visible: Agent suggests; tool executes; Gate blocks; reviewer
  decides.
- Use one sentence for the mechanism and one compact line for the evidence.
- State a boundary where it changes what the result means.
- Prefer ordinary verbs over strings of careful adjectives.

Do not sound like a system prompt, legal disclaimer, generic AI product, or
component showcase. Do not announce that the page is “showing” or “making
explicit” something when the concrete object can simply be named.

## Project opening contract

Every homepage project opening has exactly three layers. The six interactive
stages may elaborate the mechanism after this opening, but they do not replace
it.

### EvidenceOps

**Why it matters**

> A relevant passage may still fail to support the exact wording, value, unit,
> or experimental condition.

**What the system does**

> EvidenceOps takes a versioned passage, retrieves a candidate span, proposes
> structured claim fields, checks exact support, and records the result for
> human review.

**Evidence and boundary**

> 70/70 fixed public or labelled synthetic cases matched their expected
> routes; this does not measure open-ended scientific accuracy or production
> use.

### CarePlan

**Why it matters**

> A plausible biomedical draft is not a valid workflow decision.

**What the system does**

> CarePlan takes a synthetic order through an eligibility rule, a typed AI
> draft, schema and state checks, and an authorized reviewer who approves or
> rejects the final state.

**Evidence and boundary**

> 200/200 recorded checks passed across 120 synthetic orders; the public
> harness calls no model service and makes no clinical or production claim.

### Dynamics Atlas

**Why it matters**

> Two datasets can describe the same protein and still be incompatible for one
> analysis.

**What the system does**

> Dynamics Atlas takes a TaskPacket and two molecular datasets; a Locator Agent
> may suggest a registered source, while a compiler and six deterministic Gates
> return an EvidenceBundle, a request for input, or a blocked route.

**Evidence and boundary**

> The public harness records 13/13 harness checks, 24/24 machine checks, and
> 42/42 HSP90 replays; its retrospective development packets are not a held-out
> Agent benchmark.

### HSP90 / LiGaMD

**Why it matters**

> Thousands of simulation frames can still correspond to one experimental
> label.

**What the system does**

> The pipeline keeps three LiGaMD replicas attached to one protein–ligand
> system, builds one system-level feature row, and evaluates models with entire
> ligand groups held out together.

**Evidence and boundary**

> On N31 / 27 exact-ligand groups, the lowest group-equal MAE was 0.8182, but
> the paired improvement interval crossed zero; no model was selected and no
> broad-generalization or physical-koff claim follows.

## Technical-name rule

Introduce the ordinary object first, then its code name.

- “the task contract (`TaskPacket`)” before repeated `TaskPacket` use;
- “the persisted route record (`DecisionTrace`)” before the code identifier;
- “31 systems in the frozen panel (`N31`)” before the shorthand;
- “one endpoint feature contract (`P512`)” before the field name.

The Hero may use the short names after its leader labels have explained the
parts.

## Claim ladder

Use the strongest verb supported by the evidence:

1. **designed** — an architecture or contract exists;
2. **implemented** — the named code path exists;
3. **tested on** — a named evaluation was run;
4. **observed** — a result was recorded;
5. **supports** — evidence justifies a bounded conclusion;
6. **establishes** — the evidence genuinely establishes the claim.

Do not move from `implemented` or `tested on` to `proves`, `ensures`, or
`solves`.

## Vocabulary discipline

### Prefer

- passage, value, unit, assay, condition;
- dataset, residue map, ligand group, replica;
- input, tool call, check, stop reason, receipt;
- suggest, retrieve, extract, compare, block, record, decide;
- fixed cases, synthetic orders, held-out groups, paired interval.

### Reduce

`bounded`, `inspectable`, `reviewable`, `controlled`, `durable`, `dependable`,
`explicit`, `evidence-rich`, `made physical`, `owns the decision`, `current
limit`, and `the model is one step` are not forbidden. Keep one only when the
concrete object or action does not already say the same thing.

### Do not claim without new evidence

`best`, `production-ready`, `robust`, `secure`, `reliable`, `generalizable`,
`autonomous`, `complete`, `comprehensive`, `ensures`, `guarantees`, and
`solves`.

## Sentence and label rules

- Use sentence case for prose headings.
- Reserve uppercase for short machine identifiers such as `G3`, `BLOCK`, or
  `REVIEW_PENDING`.
- Do not begin all four projects with the same grammatical construction.
- Keep one centre of gravity per paragraph.
- Prefer one direct sentence to a polished “not X, but Y” contrast.
- Replace `Current limit` with `Evidence and boundary` on the homepage.
- Keep detailed caveats on the case-study page; the homepage receives only the
  boundary needed to interpret the visible number.

## Claim change log

| Surface | Current language | Proposed language | Reason |
| --- | --- | --- | --- |
| Opening | “I build AI-assisted scientific software for evidence review, molecular-data integration, binding-kinetics research, and controlled biomedical workflows.” | Selected thesis plus one supporting paragraph | Replaces a field inventory with one memorable engineering position |
| Opening scope | “the person or rule that owns the decision” | “the person who decides what happens next” | Uses a human action instead of governance shorthand |
| Comparison intro | “The shared pattern is not one model architecture...” | “The projects answer different questions, but each exposes the input, automated move, stopping rule, and recorded outcome.” | Removes a defensive contrast and tells the visitor how to read the matrix |
| EvidenceOps boundary | “Current limit ... fixed cases test defined behavior” | 70/70 fixed cases plus the exact non-claim | Puts the evidence before the limitation |
| CarePlan boundary | Long list under `Current limit` | 200/200 checks, 120 synthetic orders, no model-service/clinical/production claim | Connects the boundary to a recorded scope |
| Dynamics Atlas boundary | “synthetic public harness ... not a held-out Agent benchmark” | The three recorded check counts followed by the benchmark boundary | Makes the observable evidence legible before the non-claim |
| HSP90 boundary | “supports neither model selection nor broad generalization” | Point estimate plus interval-crosses-zero and `no model selected` | Shows why the decision follows |
| Hero controls | “Run a scenario to inspect each gate” | `Inspect the harness`, `Run PASS example`, `Run BLOCK example` | Names finite, distinct actions |

No project date, role, metric, deployment state, clinical status, or scientific
claim is broadened by this Brand Pass.
