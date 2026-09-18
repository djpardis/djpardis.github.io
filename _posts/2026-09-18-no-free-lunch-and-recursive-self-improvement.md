---
layout: post
title: "No free lunch and the limits of recursive self-improvement"
subtitle: "What a theorem about optimization algorithms has to say about the intelligence explosion debate"
description: "An examination of the academic debate connecting the No Free Lunch theorems of Wolpert and Macready with recursive self-improvement, covering Chollet, Hibbard, recent 2026 work on closed-loop model collapse, and the MIRI counterargument."
keywords: no free lunch theorem, recursive self-improvement, intelligence explosion, AGI, AI safety, Chollet, Wolpert, Macready, Hibbard, MIRI, Yudkowsky, model collapse
date: 2026-09-18
---

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#the-theorem">The theorem and what it actually proves</a></li>
<li><a href="#chollet">Chollet. The price of specialization</a></li>
<li><a href="#hibbard">Hibbard. Inductive bias as a necessary commitment</a></li>
<li><a href="#closed-loop">The closed-loop problem. Model collapse and data exhaustion</a></li>
<li><a href="#miri">The MIRI counterargument. Physical structure as the relevant prior</a></li>
<li><a href="#open">What remains open</a></li>
<li><a href="#conclusion">Conclusion</a></li>
<li><a href="#references">References</a></li>
</ul>
</div>

## [Introduction](#table-of-contents) {#introduction}

Recursive self-improvement (RSI) is the hypothetical process by which an AI system redesigns its own architecture, learning rules, or objective functions to become more capable, and then uses that increased capability to produce further improvements. The concept has been central to arguments about an "intelligence explosion" since I.J. Good first described it in 1965. The standard worry is that a system which can improve itself will do so at an accelerating rate until it reaches a level of capability far beyond human range.

The No Free Lunch (NFL) theorems, proved by David Wolpert and William G. Macready in 1997, provide a precise mathematical constraint on what optimization algorithms can achieve in general <a id="ref1-back" href="#ref1">[1]</a>. Applying them to RSI is not straightforward, and the resulting academic debate has attracted contributions from AI researchers, philosophers of mind, and AI safety researchers. This post traces the main arguments, the strongest objections, and what the disagreement actually turns on.

## [The theorem and what it actually proves](#table-of-contents) {#the-theorem}

The core claim of the 1997 Wolpert-Macready paper is this: for any pair of optimization algorithms A and B, if you average their performance over all possible objective functions with a uniform prior, both perform identically. Any advantage A has over B on some subset of problems is exactly offset by B's advantage over A on the complementary subset <a href="#ref1">[1]</a>.

The theorem is proven for closed optimization, where the objective function is treated as a black box drawn from the uniform distribution over all possible functions on a finite domain. This makes the result precise, but it also defines its limits. The uniform prior assigns equal probability to functions with random structure and to functions with deep regularity. It does not reflect any belief about which functions the real world tends to produce.

The practical corollary matters more than the mathematical statement: an algorithm that is well-suited to one family of problems achieves that suitability by incorporating structure that matches those problems. That matching is not free. It comes at the cost of worse performance on problems with different structure. There is no algorithm that is simultaneously optimal across all problem families; that would require simultaneously incorporating contradictory structural assumptions.

When applied to the question of general intelligence and RSI, the theorem raises an immediate difficulty. If "intelligence" is an optimization process, then any improvement to that process must be directed at a specific problem distribution. Improving performance on that distribution means specializing. And NFL guarantees that specialization on one distribution degrades performance on others.

## [Chollet. The price of specialization](#table-of-contents) {#chollet}

François Chollet's 2017 essay "The Impossibility of an Intelligence Explosion" is the most widely cited application of NFL to the RSI debate <a id="ref2-back" href="#ref2">[2]</a>. Chollet's argument does not deny that RSI can occur. It argues that RSI produces a more specialized system, not a more generally capable one.

The reasoning runs as follows. If intelligence is a problem-solving algorithm evaluated against some distribution of tasks, then NFL applies: the algorithm's performance is always relative to that distribution. An AI undergoing RSI to become more effective at computer science and formal reasoning is implicitly narrowing its inductive biases toward that problem family. The NFL theorems guarantee that this improvement on one part of the problem space is purchased with degraded performance on other parts.

Chollet's broader claim is that "general intelligence" is not a single axis on which a system can simply climb. Empirically, every intelligent system we have studied is specialized to its ecological niche: the problem of being human, the problem of being an octopus, the problem of playing Go. A recursively self-improving AI would not escape this constraint. Each iteration of improvement would deepen its specialization rather than expand its universal capability.

Eliezer Yudkowsky responded to Chollet at length on behalf of MIRI, and we will address that response below. But Chollet's NFL application was also independently questioned by Scott Aaronson, who noted that citing NFL to bound AI capability treats the theorem as saying more than it does. The theorem applies to a uniform prior over all functions; it does not apply to the distribution of problems found in a structured physical world <a href="#ref2">[2]</a>. This is the crux of the disagreement.

## [Hibbard. Inductive bias as a necessary commitment](#table-of-contents) {#hibbard}

Bill Hibbard's 2011 paper "Bias and No Free Lunch in Formal Measures of Intelligence," published in the Journal of Artificial General Intelligence, provides a complementary formal treatment <a id="ref3-back" href="#ref3">[3]</a>. Where Chollet focuses on the specialization argument from the perspective of problem-solving capability, Hibbard focuses on what NFL implies for agents that try to measure and improve their own intelligence.

Hibbard examines universal reinforcement learning agents of the type formalized by Marcus Hutter as AIXI. AIXI is often described as the optimal agent in the sense of Solomonoff induction, which assigns prior probability to environments proportional to the inverse of the size of the program that would generate them. This is an inductive bias: it assumes that the environment is computable and favors shorter descriptions. That assumption is what makes AIXI tractable and what makes it perform well in environments that are, in fact, computable and relatively simple.

The NFL implication Hibbard draws is that this bias is not a deficiency of AIXI but a necessary feature of any agent that performs better than random. Any agent optimizing across a wide range of environments must choose inductive biases. Without committing to a specific mathematical prior over environments, an agent cannot distinguish better from worse responses to observations. Its performance collapses to random chance when averaged over the environments that its bias does not match.

The RSI constraint follows directly. A system rewriting its own objective functions or core learning heuristics during self-improvement cannot evaluate which rewrite is better without anchoring to some prior over the environments it will face. If it tries to remain completely neutral across all environments to maximize generality, the NFL theorems guarantee that its self-modification process degrades into a random walk. Every rewrite is as good as every other, on average. Useful self-improvement requires a committed, non-neutral prior about what the world is like.

## [The closed-loop problem. Model collapse and data exhaustion](#table-of-contents) {#closed-loop}

A 2026 paper on SSRN titled "Why the God in the Machine has no Training Set" synthesizes the NFL argument with empirical results on closed-loop training of large language models <a id="ref4-back" href="#ref4">[4]</a>. The paper argues that an RSI agent operating in a closed loop has no mathematically sound source of fresh distributional information. It must train on data that is progressively more contaminated by its own previous outputs.

The empirical grounding for this concern comes from Shumailov et al., who demonstrated in 2024 what they called model collapse: when a language model is trained repeatedly on its own generated outputs rather than on independent human-produced text, the distribution of its outputs contracts <a id="ref5-back" href="#ref5">[5]</a>. Rare features of the original distribution disappear first, then moderate features, until the model converges toward a narrow set of outputs with low variance. The collapse is irreversible given the training setup. Retaining a fraction of original real data substantially slows the degradation, but a fully closed loop produces it reliably.

The NFL connection is this: the theorem says that no algorithm can manufacture predictive performance about an unknown function from a closed loop of self-referential reasoning. The signal in any training process comes from information about the target distribution. Once an RSI agent severs its feedback loop from independent empirical data, it is optimizing against a shrinking and increasingly corrupted proxy for the actual distribution it needs to generalize over. Each iteration of self-improvement refines performance on the proxy, not on the real world. NFL provides the theoretical warrant for why this cannot produce genuine capability gain: there is no information about the actual objective function being injected into the loop.

The practical implication is that RSI loops dependent on synthetic self-generated data do not converge toward greater capability. They converge toward a degenerate specialization on whatever structural artifact of their own outputs they happen to reinforce. The paper argues this is not merely an engineering problem to be solved with better self-training techniques, but a mathematical constraint on closed optimization.

## [The MIRI counterargument. Physical structure as the relevant prior](#table-of-contents) {#miri}

Yudkowsky's 2017 reply to Chollet on the MIRI blog accepts the mathematical statement of NFL while arguing that it is practically irrelevant to the RSI question <a id="ref6-back" href="#ref6">[6]</a>. The argument is direct: NFL averages over all possible functions with a uniform prior. Our universe is not drawn from a uniform prior over all mathematical structures. It is one specific, highly structured physical universe, described by a small number of physical laws with low Kolmogorov complexity.

The set of problems that actually arise from the physical world occupies a tiny and highly non-uniform region of all possible problem space. Gravity, quantum mechanics, computational locality, and polynomial complexity bounds constrain what kinds of functions real-world problems present. An intelligence calibrated to physical reality is not operating under the uniform prior that NFL requires for its conclusions to hold. It is operating under a prior heavily concentrated on structured, low-entropy problems.

Within that constrained prior, Yudkowsky argues, there is room for genuine general improvement through RSI. A system that becomes better at scientific reasoning, formal manipulation, long-horizon planning, and modeling physical processes is becoming better at a broad and practically important class of problems, all of which share structure. NFL does not forbid this. It forbids universal optimization across all possible functions. It says nothing about directed improvement across the structured subset of functions that physical reality produces.

Yudkowsky also raises what he calls the scaling argument from AlphaGo Zero. That system taught itself Go by self-play from scratch, surpassing all human knowledge of the game in three days. The argument against RSI would predict that this closed-loop improvement would degrade: the system would specialize on some artifact of its own play rather than improving at Go itself. Instead it achieved superhuman play. Yudkowsky takes this as evidence that closed-loop self-improvement in a structured domain can produce genuine capability gain, at least within a fixed problem definition.

Whether this analogy extends from a game with a fixed reward signal to the more open-ended problem of general intelligence is the point where the debate remains genuinely unresolved.

## [What remains open](#table-of-contents) {#open}

The dispute between these positions is not about whether NFL is a theorem. All parties accept the mathematics. The disagreement is about the size and structure of the problem distribution that matters for evaluating RSI.

Chollet and Hibbard argue that even within physical reality, problem distributions are diverse enough that no single system can improve uniformly across them. Becoming better at formal reasoning involves trade-offs against social cognition, perceptual grounding, and the kinds of embodied physical intuition that are difficult to represent symbolically. RSI produces a more capable system along its chosen axis of optimization, but this is not the same as producing a more generally capable system.

MIRI's position is that the physically realizable problem distribution is structured enough that improvement along its dominant dimensions counts as genuine general improvement. An agent optimized for physical-world reasoning is better in all the ways that matter for the real question, which is whether RSI produces a system with decisive practical advantage over humans.

The 2026 SSRN paper adds a third consideration that neither side in the original Chollet-MIRI exchange fully addressed: even if the problem distribution is favorable, RSI loops dependent on synthetic data face an information-theoretic barrier independent of the NFL question. If the training signal degrades empirically as Shumailov et al. show, the prior structure of the problem distribution becomes irrelevant. The system cannot access it.

These are separate constraints. The NFL argument is about whether the target distribution is structured enough to support general improvement. The model collapse argument is about whether a closed-loop RSI process can actually track the target distribution at all. Both need to be satisfied for RSI to work as described in the intelligence explosion scenario.

## [Conclusion](#table-of-contents) {#conclusion}

The NFL theorems do not prove that recursively self-improving AI is impossible. What they establish is a precise cost structure on optimization: any improvement on one class of problems is purchased with degraded performance on the complementary class, under a uniform prior over all functions. Whether that cost matters in practice depends on whether the real-world problem distribution is uniform or structured.

The debate has produced three distinct claims worth keeping separate. Chollet's specialization argument says that RSI produces deeper specialization, not broader capability, and that general intelligence is not a single axis. Hibbard's formal argument says that any self-improving agent must commit to specific inductive biases about its environment, and that this commitment is what makes useful improvement possible at all. The model collapse literature says that closed-loop RSI without external data faces an independent empirical barrier, regardless of what the NFL theorems imply about the target distribution. MIRI's counterargument says that the relevant prior is not uniform and that physical structure leaves room for genuine general improvement within our universe.

These are each technically coherent positions. The disagreement is not primarily mathematical. It is about the right prior over the real-world problem distribution and about whether the problem of general capability is decomposable or unitary. Neither the NFL theorems nor current empirical results fully settle it.

## [References](#table-of-contents) {#references}

<a id="ref1" href="#ref1-back">[1]</a> Wolpert, D. H. and Macready, W. G. "No Free Lunch Theorems for Optimization." IEEE Transactions on Evolutionary Computation, vol. 1, no. 1, pp. 67–82, April 1997. Available at: <a href="https://ieeexplore.ieee.org/document/585893" target="_blank">https://ieeexplore.ieee.org/document/585893</a>

<a id="ref2" href="#ref2-back">[2]</a> Chollet, F. "The Impossibility of Intelligence Explosion." Medium, 2017. Available at: <a href="https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec" target="_blank">https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec</a>

<a id="ref3" href="#ref3-back">[3]</a> Hibbard, B. "Bias and No Free Lunch in Formal Measures of Intelligence." Journal of Artificial General Intelligence, vol. 2, no. 1, pp. 54–61, 2011. Available at: <a href="https://sciendo.com/pdf/10.2478/v10229-011-0004-6" target="_blank">https://sciendo.com/pdf/10.2478/v10229-011-0004-6</a>

<a id="ref4" href="#ref4-back">[4]</a> "Why the God in the Machine has no Training Set." SSRN, 2026. Available at: <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6687440" target="_blank">https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6687440</a>

<a id="ref5" href="#ref5-back">[5]</a> Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R., and Gal, Y. "AI models collapse when trained on recursively generated data." Nature, vol. 631, no. 8022, pp. 755–759, 2024. Preprint available at: <a href="https://arxiv.org/abs/2305.17493" target="_blank">https://arxiv.org/abs/2305.17493</a>

<a id="ref6" href="#ref6-back">[6]</a> Yudkowsky, E. "A reply to Francois Chollet on intelligence explosion." Machine Intelligence Research Institute, December 6, 2017. Available at: <a href="https://intelligence.org/2017/12/06/chollet/" target="_blank">https://intelligence.org/2017/12/06/chollet/</a>
