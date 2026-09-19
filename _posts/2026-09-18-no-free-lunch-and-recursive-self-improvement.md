---
layout: post
title: "The no free lunch theorem and recursive self-improvement"
subtitle: "What optimization theory can and cannot say about AGI"
description: "A technical reading of how Wolpert and Macready's No Free Lunch theorems bear on recursive self-improvement, specialization, inductive bias, model collapse, and recent empirical evidence."
keywords: no free lunch theorem, recursive self-improvement, intelligence explosion, AGI, AI safety, Chollet, Wolpert, Macready, Hibbard, MIRI, Yudkowsky, model collapse
date: 2026-09-18
image: /files/pics/blog/2026/no-free-lunch-rsi-hero.jpg
---

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#theorem">What the theorem says</a></li>
<li><a href="#limits">Arguments for limits on RSI</a>
  <ul>
    <li><a href="#chollet">Chollet. Specialization is not generality.</a></li>
    <li><a href="#hibbard">Hibbard. Bias is necessary.</a></li>
    <li><a href="#closed-loop">Closed loops. Self-generated data is not enough.</a></li>
  </ul>
</li>
<li><a href="#counterarguments">Counterarguments and recent evidence</a>
  <ul>
    <li><a href="#miri">MIRI. The real world is not random.</a></li>
    <li><a href="#inference-scaling">Inference scaling. Extra compute can improve fixed models.</a></li>
    <li><a href="#empirical">Recent evidence. The bottleneck is now measurable.</a></li>
  </ul>
</li>
<li><a href="#open">What remains open</a></li>
<li><a href="#conclusion">Conclusion</a></li>
<li><a href="#references">References</a></li>
</ul>
</div>

## [Introduction](#table-of-contents) {#introduction}

<div class="post-hero-image">
<img src="/files/pics/blog/2026/no-free-lunch-rsi-hero.jpg" alt="Books and a skull drawing on a wall">
</div>

Recursive self-improvement (RSI) is the proposed process by which an AI system
redesigns its own architecture, learning rules, or objective functions, becomes
more capable, and then uses that added capability to improve itself again. The
idea has been central to arguments about an "intelligence explosion" since I.J.
Good described an ultraintelligent machine in 1965.

The No Free Lunch (NFL) theorems, proved by David Wolpert and William G.
Macready in 1997, are often brought into this debate because they state a hard
limit on optimization in the abstract <a id="ref1-back" href="#ref1">[1]</a>.
They do not show that RSI is impossible. They do show that "better optimization"
is never a context-free property. An optimizer improves by fitting some problem
distribution better, and that fit is a bias.

That distinction matters. If RSI means improvement inside a narrow, well-defined
domain, the NFL theorems do not create much trouble. If RSI means open-ended
movement toward generally superior intelligence, the theorem asks a sharper
question. Superior on what distribution of problems?

## [What the theorem says](#table-of-contents) {#theorem}

The core result of the Wolpert-Macready paper is that two optimization
algorithms have the same average performance when averaged uniformly over all
possible objective functions on a finite domain. If algorithm A performs better
than algorithm B on one set of functions, algorithm B performs better than A on
a matching set elsewhere <a href="#ref1">[1]</a>.

The result is exact because the setup is exact. The objective function is a
black box, and the average is taken over all possible functions with a uniform
prior. That prior treats random functions and highly structured functions as
equally likely. It is not a claim about which functions the physical world tends
to present.

The useful lesson is narrower and stronger than the slogan. An optimizer does
well when its assumptions match the problem distribution. Those assumptions may
be explicit, as in a prior over environments, or implicit, as in an architecture
that favors some patterns over others. There is no free way to be optimal across
all possible distributions, because assumptions that help on one distribution
can hurt on another.

RSI therefore has to specify its target. A system can improve at theorem proving,
chip design, protein modeling, or AI research benchmarks. Those are meaningful
claims because each names a problem family. A claim that a system is simply
"more intelligent" is incomplete unless it also says which environments,
feedback signals, and tasks make that comparison true.

## [Arguments for limits on RSI](#table-of-contents) {#limits}

The NFL-based critique of RSI has three parts. Chollet argues that self-improvement
deepens specialization. Hibbard argues that useful agents must commit to
inductive bias. Recent work on model collapse argues that closed training loops
lose information unless fresh data or an external verifier keeps the loop
attached to the target distribution.

### [Chollet. Specialization is not generality.](#table-of-contents) {#chollet}

François Chollet's 2017 essay "The Impossibility of an Intelligence Explosion"
is the best-known modern use of NFL against an unconstrained intelligence
explosion <a id="ref2-back" href="#ref2">[2]</a>. His claim is not that no AI
system can improve itself. His claim is that improvement is always relative to a
problem distribution.

If an AI system rewrites itself to become better at computer science, formal
reasoning, or physics, it has moved toward the structure of those tasks. That may
be extremely useful. It is still specialization. The NFL theorems rule out the
stronger picture in which a system climbs a single universal intelligence axis
without paying any cost elsewhere in problem space.

Chollet's broader view is that intelligence is skill acquisition under a set of
priors, embodiment, memory, tools, and environmental constraints. Humans, octopuses,
and Go systems are not points on one clean scale. They solve different problems
under different assumptions. RSI can improve a system along a chosen axis, but
that does not by itself imply general capability across all axes.

### [Hibbard. Bias is necessary.](#table-of-contents) {#hibbard}

Bill Hibbard's 2011 paper "Bias and No Free Lunch in Formal Measures of
Intelligence" makes the same issue formal for universal agents <a id="ref3-back" href="#ref3">[3]</a>.
He discusses agents in the AIXI tradition, where Solomonoff-style priors favor
computable environments with shorter descriptions. AIXI is not practical or
computable as written. It is useful here because it makes the role of bias
visible.

AIXI performs well only relative to a prior over environments. That prior assumes
that the world is computable and that shorter programs deserve higher weight.
This is not a flaw in the agent. It is the reason the agent can learn at all.
Without a prior, observations do not tell the agent which future states are more
likely, which actions are better, or which self-modification is an improvement.

The RSI consequence is direct. A system modifying its own learning rules or
objective cannot evaluate a proposed change from nowhere. It needs a standard of
comparison, and that standard encodes assumptions about the environments it will
face. If the system tries to remain perfectly neutral across all possible
environments, the NFL theorems say that no proposed rewrite has better expected
value than any other under the uniform average. Self-improvement needs bias.

### [Closed loops. Self-generated data is not enough.](#table-of-contents) {#closed-loop}

A 2026 SSRN paper titled "Why the God in the Machine has no Training Set" applies
this point to closed-loop training <a id="ref4-back" href="#ref4">[4]</a>. The
paper argues that an RSI system cannot generate new information about the world
by repeatedly training on its own outputs. A loop that lacks independent data or
an external verifier can refine a proxy distribution, but it cannot guarantee
progress against the distribution it ultimately needs to model.

Shumailov et al. give the empirical version of this concern. In their work on
model collapse, generative models trained repeatedly on generated outputs lose
parts of the original distribution, starting with rare features <a id="ref5-back" href="#ref5">[5]</a>.
The model's output distribution contracts over repeated generations. Keeping
some real data in the training mixture slows the effect, which is exactly the
point. Fresh information matters.

NFL does not prove model collapse. It explains why a closed loop should not be
expected to discover information that never enters the loop. If the only feedback
signal is derived from the model's own distribution, the system may improve at
imitating and selecting its own artifacts rather than at tracking the outside
world.

## [Counterarguments and recent evidence](#table-of-contents) {#counterarguments}

The main objections to the NFL-limit argument do not deny the theorem. They
deny that the theorem's uniform average is the right model for AI. The real world
is highly structured. Some domains have formal feedback. Some capability gains
come from spending more compute at inference time rather than from retraining on
self-generated data.

### [MIRI. The real world is not random.](#table-of-contents) {#miri}

Eliezer Yudkowsky's 2017 reply to Chollet, published by MIRI, accepts the NFL
theorems and argues that they are mostly irrelevant to practical RSI <a id="ref6-back" href="#ref6">[6]</a>.
NFL averages over all possible functions. Our universe is not sampled from that
average in any practical sense. It has locality, stable physical laws, low-entropy
regularities, and many repeatable causal structures.

On this view, an AI system does not need to perform well in every possible
mathematical universe. It needs to perform well in this one. A system that becomes
better at scientific reasoning, coding, planning, and physical modeling may gain
broad practical power because those tasks share structure in our universe. The
system pays for lunch by doing worse in other possible worlds, but those worlds
do not matter for the immediate risk analysis.

AlphaGo Zero is the usual example. It improved through self-play and surpassed
human Go knowledge without learning from human games. That does not violate NFL
because Go is not an arbitrary objective function. It is a fixed formal domain
with a stable reward rule. The question is whether AI research, science, and
real-world planning provide enough equivalent structure.

### [Inference scaling. Extra compute can improve fixed models.](#table-of-contents) {#inference-scaling}

Inference scaling adds a newer counterargument. Recent reasoning models show
that spending more compute at test time, through longer reasoning, sampling,
search, or verification, can improve performance without changing the model
weights <a id="ref7-back" href="#ref7">[7]</a>. This is not a closed training
loop. It is a way to search harder inside the model and select better answers.

Paul Christiano's work on iterated distillation and amplification describes a
related loop <a id="ref8-back" href="#ref8">[8]</a>. A weak model is amplified
by giving it more time, more copies, decomposition, or assistance. The amplified
behavior is then distilled into a successor model. If the process has a reliable
external signal, it can produce real gains rather than merely amplifying the
model's own errors.

This matters because it separates two kinds of RSI. In domains with strong
verifiers, such as code tests, proof checkers, games, and some mathematics,
self-improvement can be genuine. In domains where the system must judge its own
open-ended research direction, the signal is weaker. A 2026 survey of 1,250 RSI
papers found that demonstrated self-improvement strength tracks this verification
hierarchy <a id="ref9-back" href="#ref9">[9]</a>. The more independent the
evaluation signal is, the better the loop works.

### [Recent evidence. The bottleneck is now measurable.](#table-of-contents) {#empirical}

The debate is now tied to a growing empirical record. Chollet's ARC-AGI series
tests novel reasoning under minimal prior knowledge. ARC-AGI-2 reported a large
gap between human performance and current AI systems. ARC-AGI-3 moved to
interactive environments where agents must infer goals, explore, remember, and
plan. The paper reports human success across all environments while current AI
systems remain below 1% <a id="ref10-back" href="#ref10">[10]</a>.

A 2026 Princeton-led shadow evaluation tested another part of the RSI story. AI
agents were given the central research question from two unpublished NeurIPS
papers, and the original authors evaluated the results. The agents could do
research engineering. They ran experiments, processed results, and wrote papers.
They did not produce work at the target research standard <a id="ref11-back" href="#ref11">[11]</a>.
The reported failures were not simple tool failures. They involved
choosing weak directions, over-updating on limited evidence, and failing to
recover when the plan stopped working.

Cunningham et al. give a quantitative complement to those results <a id="ref12-back" href="#ref12">[12]</a>.
They model RSI as feedback loops whose acceleration depends on elasticities
across the loop. Their calibration suggests current loops are not yet strong
enough for self-sustaining acceleration, while also noting that they appear to be
strengthening. Their distinction between narrow and broad capability is central.
An AI system might accelerate benchmark-oriented AI R&D without producing the
wide practical capability gain assumed by stronger intelligence explosion
claims.

## [What remains open](#table-of-contents) {#open}

The main question is not whether NFL is true. It is whether the distribution that
matters for RSI is narrow enough, structured enough, and verifiable enough for
self-improvement to compound.

The limit argument says that each useful improvement must aim at a distribution.
Better performance on that distribution comes from bias, data, feedback, or a
verifier. Without those, RSI has no basis for deciding which self-modification is
better. Closed-loop training on synthetic outputs makes this problem visible
because the loop can lose contact with the target distribution.

The counterargument says that the real world supplies enough structure for this
not to matter much. A system can sacrifice performance in arbitrary mathematical
worlds and still become broadly effective in ours. In domains with formal
verification, current evidence supports that view. Test-time search, code tests,
mathematical verifiers, and game rules can all turn extra computation into
measurable gains.

The unresolved part is open-ended research. Research direction-setting requires
choosing which question matters, which evidence should update the plan, and when
to abandon an approach. The recent empirical results suggest that this remains a
harder target than benchmark solving or engineering execution. That does not
settle the RSI debate, but it narrows the live question. The issue is no longer
whether self-improvement can happen at all. It is whether improvement in
verified narrow domains can transfer into the broad judgment needed for sustained
AI research progress.

## [Conclusion](#table-of-contents) {#conclusion}

The NFL theorems do not rule out recursive self-improvement. They rule out a
stronger and vaguer claim, that an optimizer can become better in the abstract
without a target distribution or bias. Once the target is named, the theorem
stops being a prohibition and becomes an accounting rule. Gains come from
structure, and structure must enter through priors, data, tools, or feedback.

The most useful version of the debate separates three claims. Chollet's argument
says RSI should be expected to specialize rather than climb a universal
intelligence scale. Hibbard's argument says useful self-modification requires
inductive bias. The model collapse literature says closed loops need fresh data
or independent checks. MIRI's reply says those limits do not block large gains in
our structured physical world.

Recent evidence makes the divide more concrete. Verified domains show real
self-improvement. Open-ended research still shows a direction-setting bottleneck.
That is where the NFL argument remains relevant. Not as a proof that RSI cannot
happen, but as a demand that any RSI story explain which distribution is being
optimized, what bias makes it learnable, and what signal keeps the loop attached
to the world.

## [References](#table-of-contents) {#references}

<a id="ref1" href="#ref1-back">[1]</a> Wolpert, D. H. and Macready, W. G. "No Free Lunch Theorems for Optimization." IEEE Transactions on Evolutionary Computation, vol. 1, no. 1, pp. 67–82, April 1997. Available at: <a href="https://ieeexplore.ieee.org/document/585893" target="_blank">https://ieeexplore.ieee.org/document/585893</a>

<a id="ref2" href="#ref2-back">[2]</a> Chollet, F. "The Impossibility of Intelligence Explosion." Medium, 2017. Available at: <a href="https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec" target="_blank">https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec</a>

<a id="ref3" href="#ref3-back">[3]</a> Hibbard, B. "Bias and No Free Lunch in Formal Measures of Intelligence." Journal of Artificial General Intelligence, vol. 2, no. 1, pp. 54–61, 2011. Available at: <a href="https://sciendo.com/pdf/10.2478/v10229-011-0004-6" target="_blank">https://sciendo.com/pdf/10.2478/v10229-011-0004-6</a>

<a id="ref4" href="#ref4-back">[4]</a> "Why the God in the Machine has no Training Set." SSRN, 2026. Available at: <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6687440" target="_blank">https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6687440</a>

<a id="ref5" href="#ref5-back">[5]</a> Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R., and Gal, Y. "AI models collapse when trained on recursively generated data." Nature, vol. 631, no. 8022, pp. 755–759, 2024. Preprint available at: <a href="https://arxiv.org/abs/2305.17493" target="_blank">https://arxiv.org/abs/2305.17493</a>

<a id="ref6" href="#ref6-back">[6]</a> Yudkowsky, E. "A reply to Francois Chollet on intelligence explosion." Machine Intelligence Research Institute, December 6, 2017. Available at: <a href="https://intelligence.org/2017/12/06/chollet/" target="_blank">https://intelligence.org/2017/12/06/chollet/</a>

<a id="ref7" href="#ref7-back">[7]</a> "Test-Time Scaling in Reasoning LLMs. Inference Regimes, Evaluation, and Reproducibility." arXiv 2608.04001, 2026. Available at: <a href="https://arxiv.org/abs/2608.04001" target="_blank">https://arxiv.org/abs/2608.04001</a>

<a id="ref8" href="#ref8-back">[8]</a> Christiano, P., Shlegeris, B., and Amodei, D. "Supervising strong learners by amplifying weak experts." arXiv 1810.08575, 2018. Available at: <a href="https://arxiv.org/abs/1810.08575" target="_blank">https://arxiv.org/abs/1810.08575</a>

<a id="ref9" href="#ref9-back">[9]</a> "Recursive Self-Improvement in AI. From Bounded Self-Refinement to Autonomous Research Loops." arXiv 2607.07663, 2026. Available at: <a href="https://arxiv.org/abs/2607.07663" target="_blank">https://arxiv.org/abs/2607.07663</a>

<a id="ref10" href="#ref10-back">[10]</a> Chollet, F. et al. "ARC-AGI-3. A New Challenge for Frontier Agentic Intelligence." arXiv 2603.24621, 2026. Available at: <a href="https://arxiv.org/abs/2603.24621" target="_blank">https://arxiv.org/abs/2603.24621</a>

<a id="ref11" href="#ref11-back">[11]</a> Kirgis, P. and Kapoor, S. et al. "Can AI agents conduct open-ended AI research?" arXiv 2607.27191, 2026. Available at: <a href="https://arxiv.org/abs/2607.27191" target="_blank">https://arxiv.org/abs/2607.27191</a>

<a id="ref12" href="#ref12-back">[12]</a> Cunningham, T., Althoff, L. et al. "The Economics of Recursive Self-Improvement." arXiv 2609.15802, 2026. Available at: <a href="https://arxiv.org/abs/2609.15802" target="_blank">https://arxiv.org/abs/2609.15802</a>
