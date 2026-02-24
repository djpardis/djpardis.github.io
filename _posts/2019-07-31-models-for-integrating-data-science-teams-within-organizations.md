---
layout: post
title: 'Models for integrating data science teams within organizations'
subtitle: 'A comparative analysis'
description: 'A comprehensive analysis of different organizational models for integrating data science teams, comparing centralized, decentralized, and hybrid approaches across coordination efficiency, employee happiness, and product success factors.'
keywords: data science, team organization, management, organizational design, product data science, center of excellence, embedded teams
image: /files/pics/blog/2019/ds-team-models-1.jpeg
card_image: /files/pics/blog/2019/ds-team-models-1-card.jpeg
---

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#center-of-excellence-model">The center-of-excellence model</a>
  <ul>
    <li><a href="#coe-misconceptions">Some misconceptions</a></li>
    <li><a href="#coe-drawbacks">Drawbacks</a></li>
    <li><a href="#coe-benefits">Benefits and success scenarios</a></li>
  </ul>
</li>
<li><a href="#accounting-model">Accounting model</a>
  <ul>
    <li><a href="#accounting-drawbacks">Drawbacks</a></li>
    <li><a href="#accounting-benefits">Benefits</a></li>
  </ul>
</li>
<li><a href="#consultant-model">The consultant model</a>
  <ul>
    <li><a href="#consultant-benefits">Benefits</a></li>
    <li><a href="#consultant-drawbacks">Drawbacks</a></li>
  </ul>
</li>
<li><a href="#embedded-model">The embedded model</a>
  <ul>
    <li><a href="#embedded-benefits">Benefits</a></li>
    <li><a href="#embedded-drawbacks">Drawbacks</a></li>
  </ul>
</li>
<li><a href="#democratic-model">The democratic model</a>
  <ul>
    <li><a href="#democratic-benefits">Benefits</a></li>
    <li><a href="#democratic-drawbacks">Drawbacks</a></li>
  </ul>
</li>
<li><a href="#product-data-science-model">The product data science model</a>
  <ul>
    <li><a href="#pds-benefits">Benefits</a></li>
    <li><a href="#pds-drawbacks">Drawbacks</a></li>
  </ul>
</li>
<li><a href="#conclusion">Conclusion</a></li>
<li><a href="#references">References</a></li>
<li><a href="#acknowledgements">Acknowledgements</a></li>
<li><a href="#citations-and-coverage">Citations and coverage</a></li>
</ul>
</div>

## [Introduction](#table-of-contents) {#introduction}

<div class="image-row">
  <div class="image-container">
    <img src="/files/pics/blog/2019/ds-team-models-1.jpeg" alt="DS Crit meeting photo 1">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2019/ds-team-models-2.jpeg" alt="DS Crit meeting photo 2">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2019/ds-team-models-3.jpeg" alt="DS Crit meeting photo 3">
  </div>
</div>
*At our <a href="https://twitter.com/djpardis/status/955946036693843969" target="_blank">inaugural DS Crit meeting</a> at Twitter HQ.* 

Beginning in the <a href="https://en.wikipedia.org/wiki/Apache_Hadoop" target="_blank">first decade of the 21st century</a>, internet companies were able to gain visibility into the business in ways never possible in the age of spreadsheets and relational database management systems. No longer did they need to wait for end-of-quarter financial results in order to gauge business performance; and no more did they need to rely on extrapolations from samples to get a comprehensive view of what was working for all customers. In addition to improved visibility into the state of the business, the new data storage and aggregation capabilities enabled companies to build <a href="https://www.oreilly.com/library/view/data-analytics-with/9781491913734/ch01.html" target="_blank">data products</a> like search engines, language processors, and recommender systems.

What became important was to determine how this work could be achieved efficiently and effectively. Designing and building a data science organization is a complex problem, particularly when determining the nature of data science interactions with stakeholders.

> A DS team isn't just the people, it is the process and the interaction of the team with the rest of the company.
>
> — DJ Patil <a href="#ref2">[2]</a>

In this post, I compare some of the popular models of integrating data science teams within companies. In determining the best model, I take into account the following factors:

**Coordination efficiency.** Every team creates new sources of knowledge. Incorporating that knowledge into the business in a timely and repeatable fashion requires robust organization design. Bad designs lead to failures and inefficiencies in knowledge sharing and coordination; this directly affects the *speed* and *cost* at which work is done.

> The goal of work is some output, a strategy, product, marketing plan, budget, account plan, sale, feature, etc. Communication is a way of incorporating stakeholders into a plan *before* it is too far along to change or the cost is too high (or coworkers too angry!)
>
> — <a href="https://medium.com/@stevesi" target="_blank">Steven Sinofsky</a> on Twitter

**Employee happiness.** No discussion of organizational structure is complete without considering employee happiness, motivation, and growth factors. This is not just about reducing the cost of recruiting in response to employee churn, but also about providing employees with the circumstances to do creative and effective work during their tenure. Designing structures without considering employee happiness is a costly failure.

**Product success.** Data scientists opportunity size new ideas, design experiments and metrics, and design and tune models. They promote the correct use of data within the company. New products shipped without these considerations usually contain deficiencies in instrumentation and implementation, and are potentially misaligned with company strategy. The customer voice is not accurately represented when experiments are incorrectly assessed and metrics incorrectly crafted. The decision making process is delayed without high quality data and metrics. Machine learning projects either fail or lack in quality without data science involvement.

I make a number of assumptions. The *company* is a single <a href="https://cio-wiki.org/wiki/Strategic_Business_Unit" target="_blank">strategic business unit (SBU)</a>. The SBU is partitioned in two ways. First, it is partitioned into independent *functions,* with respect to specialization and responsibilities. Each function (e.g. design, marketing, or sales) is a group managing the needs of the business within the context of their specialization and responsibilities. Second, the SBU is partitioned with respect to outputs and services, into independent *products.* The products are independent in that they have independent launch timelines. Using these definitions, a *product team* is a subset of the SBU—with <a href="https://en.wikipedia.org/wiki/Cross-functional_team" target="_blank">cross-functional</a> membership—responsible for delivering a product or service.



A *data scientist (DS)* is skilled in data engineering, data management, data analysis, and machine learning; and *data science* is their work. The *data science function* is a group of data scientists and their managers.

We are now ready to review and compare the myriad ways that the data science function has been integrated within the SBU.

## [The center-of-excellence model](#table-of-contents) {#center-of-excellence-model}

We start with the most centralized of all other models. In the center-of-excellence (CoE) model, also known as *the research model*, the expectation is that the data science team works independently to identify big bets and build prototypes. Under this model, the data science team is considered to be the company's innovation arm.

### [Some misconceptions](#table-of-contents) {#coe-misconceptions}

There are some misconceptions that lead companies to choosing the CoE model for their data science team.

**a. PhD graduates are hired to do research.** Data science teams hire many PhD and Master's graduates. The focus of most of these programs is research, and so there is a misconception that graduates of these programs are hired to do research. However, the true motivation for hiring PhD and Master's graduates into DS roles is different. Data science is an interdisciplinary field with a wide variety of requirements. Data scientists are usually required to handle data engineering, statistical analysis, and machine learning in highly diverse domains (e.g. Finance, Marketing, Logistics, Healthcare, Social Media). The extra years of studies in engineering, mathematics, and statistics are meant to boost their abilities in producing quality analyses, in communicating results, in working with external stakeholders, and in designing of new methodology.

**b. Innovation happens in a lab.** In cases where companies rightly expect innovation from the data science team, there is a misconception that the innovation arm of the company needs to be freed and independent of the day-to-day requirements of the business. When teams do not consider the company's existing business model and infrastructure, their output does not translate into functioning products. This is why despite some <a href="https://en.wikipedia.org/wiki/Bell_Labs" target="_blank">historical success stories</a>, many companies refrain from such an investment even when it is affordable. The question then arises, "who is in charge of innovation?" <a href="https://medium.com/@djpardis/q-a-with-steven-sinofsky-at-twitter-hq-a658ca5db953" target="_blank">That will need to be the topic of a future post</a>.

### [Drawbacks](#table-of-contents) {#coe-drawbacks}

There are important drawbacks to having the data science team operate within the CoE model:

**a. Lack of context about the challenges of the business.** Without visibility into the day-to-day decision-making challenges, purely centralized data science teams find it difficult to identify the most important problems to tackle. They focus on pie in the sky ideas while the business suffers.

**b. Difficulty in closing the loop.** In cases where they are successful at identifying and solving an important problem, centralized research teams find it difficult to get the solution adopted by the product teams. The adoption of the proposed solution would likely disrupt a team's existing roadmap—as the two teams are out of sync. Resolving this conflict usually requires actions by higher management, leading to unwelcome interruptions to existing teams and their roadmaps. If higher management does not step in, research teams become demotivated.

> My view is everyone is on the same calendar/cadence. That's a huge thing for me. If you don't have that then split resources (all of them) by cadence. Teams on difference cadences can't collaborate.
>
> — <a href="https://medium.com/@stevesi" target="_blank">Steven Sinofsky</a> on Twitter

**c. High cost associated with building new team to back initiative.** Rather than disrupting existing roadmaps, an alternate path is to build a new product team to back a proposed solution. This team would have cross-functional membership to work on the proposals by the research team, making it a costly but valid endeavor. Valid, because ideas need to be backed by a complete team in order to be assessed correctly and quickly. It would be useless to measure the success of an idea if any part of the experience is lacking. A new feature requires design, engineering, data, marketing, comms, and sales involvement to realize its potential.

The cost of building a brand new product team further increases if the new product team does not form <a href="https://en.wikipedia.org/wiki/Partition_of_a_set" target="_blank">a partition</a> along with existing product teams. Forming a partition with other product teams is important, otherwise roadmaps and responsibilities would be overlapping. This puts the new team's longevity at jeopardy as they try to figure out their raison d'être—while confusing other teams.

**d. Non-recurring and nondeterministic output.** Under the research model, the product teams might be able to adopt and find value in a single output from the data science team, but wonder if there would be follow-through and continued feedback if they were to go ahead and make the proposed changes.

### [Benefits and success scenarios](#table-of-contents) {#coe-benefits}

It should be noted that the CoE model works for many types of teams. Centralization helps focus and agency. You should fully centralize that which you can clearly encapsulate from the rest of the organization. Full centralization works when coupling is low and joint meetings are few and far between.

As an example, consider tooling development teams. Once the company decides on a technology or programming language, tooling improvement efforts can happen more or less independently of product launch timelines.

Another example of a successful CoE team is <a href="https://en.wikipedia.org/wiki/Microsoft_Research" target="_blank">Microsoft Research</a>, a subsidiary of Microsoft. Formed in 1991, there is no expectation that the institute produce any result that would be applicable to core Microsoft products. It turns out that <a href="https://www.forbes.com/sites/louiscolumbus/2019/01/06/microsoft-leads-the-ai-patent-race-going-into-2019/#69ce0e6844de" target="_blank">Microsoft is leading the patent race in AI</a> as a result of its investment in a research institute.

## [Accounting model](#table-of-contents) {#accounting-model}

In the accounting model, also known as *the BI model*, the central data science team produces reports and presentations on a recurring basis (usually monthly and quarterly). The data science team would inform the company of notable movements in top-level metrics. Once the team identifies an interesting or worrying trend, they would work with product teams to investigate the root cause. Thus, quite frequently, playing detective becomes a main activity of the data science team under the accounting model.

### [Drawbacks](#table-of-contents) {#accounting-drawbacks}

There are three main drawbacks to this model:

**a. Difficulty in attribution and closing the loop.** As mentioned above, it is near impossible to reason based on global trends. This drawback becomes particularly pronounced when there are many product teams and hence many moving parts and levers.

**b. Reorganization and the emergence of tiger teams.** It is important to have analyses and metrics which are tied to levers (product teams) so that they are actionable quickly and with less cost and reorganization needs. Reorganization happens and new <a href="https://www.lucidchart.com/blog/what-is-a-tiger-team" target="_blank">"tiger" teams</a> emerge when the data science team is unable to identify the culprit and existing product teams are unable to own and prioritize a fix.

Tiger teams rarely form a partition with existing product teams and thus disrupt the flow of the organization. The emergence of tiger teams is a drawback of all fully centralized models.

**c. Underutilizing technology.** Having monthly and quarterly reports be the only function of the data science team is failing to fully gauge product quality before reaching certain calendar milestones. If launches are leading to less usage in a particular market, the drop happens *a launch at a time*, not a quarter or a week at a time. A product opens up to misuse *a launch at a time*. Data security is breached *a launch at a time*. Identifying the launch that led to decreased usage in Japan after many launches is an impossible task; so is determining the launch that created incorrect incentives for abusive behavior.

**d. Low quality and stale data.** Every launch creates new sources of data that need to be incorporated back into existing metrics, considered in future analyses, and incorporated in existing and future models. Accountant data scientists miss all important updates, and usually rely on stale data for analyses. It is difficult to be involved in instrumentation from the sidelines. This is a drawback of all fully centralized models.

### [Benefits](#table-of-contents) {#accounting-benefits}

Reporting on quarterly trends of company metrics is valuable practice. The centralized aspect of the BI team allows for a holistic view of the SBU, inspiring decisions that lead to global optimizations that can balance and correct local decisions. This work is something that the data science team should be tackling as part of their charter, regardless of the model under practice.

## [The consultant model](#table-of-contents) {#consultant-model}

In the consultant model, the central data science team is assigned tickets or emailed with questions. Data science managers then prioritize the tickets and questions and assign them to data scientists.

### [Benefits](#table-of-contents) {#consultant-benefits}

In this model, the data science manager overrides any existing data science roadmaps to prioritize the questions and needs of stakeholders. Due to the symmetrical treatment of all members of the team, this model makes managing a data science team easy and cheap.

### [Drawbacks](#table-of-contents) {#consultant-drawbacks}

There are many drawbacks with this model:

**a. Communications overhead.** Data scientists in a consulting position usually lack the context to resolve questions effectively in a timely manner. There is communications overhead involved in gaining familiarity with data sources and their creation process. Further, if a follow-up to an analysis is needed and the original consultant data scientist has other ongoing commitments, the work will get assigned to another data scientist. This requires yet another onboarding investment—and thus the cycle continues.

**b. Unclear deadlines.** It is difficult for stakeholders to know when work would get prioritized and assigned to a consultant data scientist. Additionally, the processes affecting the volume of incoming requests are not transparent to the data science team and their managers. Even after work gets assigned and prioritized, it is difficult for the data scientist to be able to estimate the amount of time needed to answer questions due to their unfamiliarity with the limitations and nuances of the ever-changing data sources.

**c. Short-term ownership.** Innovation happens when people plan for years, not days and weeks. Having data scientists act as short-term consultants makes it difficult to incentivize focus on complex or tedious work. This work is needed to ensure quality data, quality experimentation tools, quality data manipulation and visualization tools, and quality results.

**d. Unclear ownership.** A by-product of short-term ownership is unclear ownership. When projects are one-off and seemingly random, people are more likely to step on each other's toes. This happens inadvertently but is a non-negligible source of inefficiency. It should be noted that this is a drawback of all fully centralized models.

**e. Lack of motivation and unfulfilling work.** Data scientists working under this model usually lack motivation as they are rarely involved in the product decision making process. They also usually find the work unfulfilling as they rarely see the results and impact of their work.

**f. Low data quality and recurring emergencies.** Without maintaining good data practices, products that rely on data as input fall prey to recurring bugs and emergencies. In this model, data scientists are pulled into a project in order to play detective and identify the source of the bug.

Apart from the unfamiliarity of the data scientist with the data creation process and the product's evolution, there is also the possibility of missing data due to missing instrumentation. It is impossible to find a needle in a haystack when the needle is not instrumented. It is also painful to look for a needle in a haystack that is extended to the fourth dimension (of time).

Finding the culprit is nearly impossible in these situations. As discussed in the drawbacks of the accounting model, the organization usually responds by creating a tiger team, thus inducing further distractions and costs.

**g. Unclear coverage of product areas.** There are many allocation and prioritization challenges under this model. How does work get prioritized by the data science manager? Which product teams get the most attention—the successful products or the struggling ones? Which decisions are made with data in mind, which are made without, and who would be making these global decisions when the data science team lacks visibility?

**h. No clear sizing and allocation strategy.** As with any fully centralized model, it is always difficult to determine the number of data scientists needed. Does the size of the team grow with the size of the organization or with the number of requests? If the latter, how does one estimate the number of the requests and total scope? There is no simple strategy for determining the size of a fully centralized consultant team.

## [The embedded model](#table-of-contents) {#embedded-model}

In this model, product teams hire their own data scientists. Each engineering manager is in charge of planning for data scientist headcount, hiring, allocation, and roadmap. The data scientist within each product team has the engineering team members as their peers.

### [Benefits](#table-of-contents) {#embedded-benefits}

This model brings welcome independence to the teams and relieves the SBU of the management requirements of a fully centralized data science team. It solves problems with team sizing and communications by distributing responsibility. It also solves the ownership and motivation issues that exist in fully centralized models.

### [Drawbacks](#table-of-contents) {#embedded-drawbacks}

While there are reductions in data science management costs, this model has important drawbacks:

**a. Management complexity.** Title and role diversity on the same team lead to management headaches. It is difficult for a single manager to maintain and assess multiple career ladders for different members of the team; managers rarely get it right even with a single ladder. Usually, the engineering manager is inadvertently biased towards assessment against the more common requirements—those of the standard engineering ladder. This incentivizes the data scientist to take on a role symmetrical to the other engineers on the team, undermining the original point of hiring a data scientist. Additionally, hiring data scientists, putting together the right interview panel, and on-boarding data scientists are all important challenges within this model.

**b. Mentorship deficit and difficulty in maintaining uniform data standards and best practices.** Data scientists benefit and learn from working closely with their peers, in particular during analysis reviews. An embedded model does not readily offer a path to a recurring and persistent relationship among data scientists. Further, independent data scientists on each team would design their own processes and standards. It should be noted that weak standards is a drawback of all fully decentralized models.

**c. Underutilizing technology and data science de-prioritization.** Some teams might put off hiring a data scientist due to pressing deadlines and costs. In the absence of good data, services are still deployed. This leads to important shortcomings in data quality and data products that becomes cumbersome and oftentimes impossible to fix later.

**d. Local rather than global optimization.** When there is no central ownership over metrics and key results, teams choose metrics and projects that lead to local optimization. Further, in this model, teams are incentivized to compete and ignore cannibalization effects. Local optimization is a drawback of all fully decentralized models.

## [The democratic model](#table-of-contents) {#democratic-model}

In this model, it is believed that easy and straightforward access to data by product managers, designers, engineering managers, and engineers would lessen or remove the need for a data science role. Many identify the need for data scientists to be due to the lack of proper infrastructure for fast and easy dashboard creation.

### [Benefits](#table-of-contents) {#democratic-benefits}

It is valuable to invest in data infrastructure and tooling that makes data access, processing, and visualization simpler everyday. This investment is particularly valuable to data scientists as it frees up time for proactive opportunity sizing, experiment design, metric design, model design, and general improvements in methodology.

### [Drawbacks](#table-of-contents) {#democratic-drawbacks}

While ensuring everyone has direct and easy access to data is a noble goal, there are some drawbacks to this model:

**a. Difficulty in mastering everything and maintaining data best practices.** Usually, people are mostly specialized and interested in a particular set of tasks. Being skilled at a company's engineering stack is already a big feat. It is fine to offload design work and sales work and data work. Data scientists enforce good data practices within the organization.

**b. Dashboards are not the goal of data science, they are an intermediary step in the exploration of data.**

<a href="http://attackwithnumbers.com/the-laws-of-shitty-dashboard" target="_blank">**The laws of shitty dashboards * Attack with Numbers**</a><br>
*Disclosure: I have been responsible for building shitty dashboards. I personally made most of the errors below. I…*

## [The product data science model](#table-of-contents) {#product-data-science-model}

Between the extremes of the fully centralized model (the CoE model) and the fully decentralized model (the embedded model), there exists a spectrum of *hybrid* models that take characteristics from each of the aforementioned models. Taking advantage of the strengths of both models, while actively making up for their deficiencies is what makes hybrid models successful.

The product data science (PDS) model is inspired, only in part, by the <a href="https://courses.lumenlearning.com/boundless-management/chapter/common-organizational-structures/" target="_blank">matrix structure</a>. Individuals are simultaneously members of the data science function and a product team. Data scientists—although each a member of a product team—report only to a central data science management team. Thus, unlike the matrix structure, there is <a href="https://www.mindtools.com/pages/article/henri-fayol.htm" target="_blank">unity of command</a> under the PDS model.

Revisiting the assumptions we enumerated at the beginning, in the PDS model, the cross-functional product team would include data scientists.

### [Benefits](#table-of-contents) {#pds-benefits}

**a. Clear ownership, actionable insights, and speed.** One important benefit of the PDS model is clear ownership of projects by the data scientists, due to their membership in the various product teams. Membership in each product team gives data scientists a thorough understanding of that product, its limits, and its potential. This in turn allows a straightforward mapping of analysis to proposals for action. It is difficult to move fast if newly available insight does not map into reasonable and informed actions.

**b. Quality data and quality data products.** Data scientists close collaborations with a product team improves data quality. Every single launch changes the data, and so it is important to oversee its evolution with careful instrumentation.

![Tweet about data quality](/files/pics/blog/2019/data-quality-tweet.png){: style="max-width: 600px; display: block; margin: 0 auto;"}
*<a href="https://twitter.com/peteskomoroch/status/1054142127054163969" target="_blank">Pete Skomoroch</a> on Twitter*

**c. Standardized data science processes.** Data science peers, working on different product teams, come together to establish best practices and onboarding flows within the data science team. They review one another's code and analyses. They collaborate on complex projects. They benefit from a unified career ladder, with managers who can assess their impact and can plan for their growth.

**d. Global optimization.** The direct and recurring collaboration of data science peers from various product teams has other benefits. Due to their collective birds-eye-view of the business, they are able to connect the dots, identify inconsistencies, and optimize globally. This is <a href="https://medium.com/@djpardis/q-a-with-steven-sinofsky-at-twitter-hq-a658ca5db953" target="_blank">similar to the way design teams should operate</a>.

**e. Sizing and allocation clarity.** Another benefit of the PDS model is that it simplifies the task of determining the size of the data science team. Once you figure out how to partition the SBU into product teams, and you figure out the number of cross-functional stakeholders per product, the allocation of data scientists can be determined as a proportion. More available <a href="https://medium.com/@djpardis/recommendations-for-data-science-team-sizing-and-allocation-strategy-a38f943638e5" target="_blank">here</a>.

### [Drawbacks](#table-of-contents) {#pds-drawbacks}

No model is perfect and each have their drawbacks.

> Since there is no optimal or perfect organizational structure […] then the most important thing is to know the weaknesses of your structure and to compensate for them.
>
> — Steven Sinofsky, <a href="https://medium.learningbyshipping.com/functional-versus-unit-organizations-6b82bfbaa57" target="_blank">Functional versus Unit Organizations</a>

Below are some drawbacks of the PDS model.

**a. Cost.** One of the main arguments against the PDS model is the cost of hiring at least one data scientist for every product team; and the associated cost of a centralized data science management team. This assessment does not take into account the savings stemming from the increase in product and data quality, and the more effective use of data for the business. Having said that, organizations should do what they can afford. In the beginning everyone is responsible for engineering and data and design needs. As the SBU grows, one can have specialized functions handling each set of responsibilities.

**b. Recurring conflicts due to lack of power parity.** For success on cross-functional teams, all functional leads should have similar amounts of negotiating power. Without power parity, the benefits of cross-functional collaboration are lessened due to recurring conflicts, lack of context, late delivery, and thus suboptimal results. Power parity is ensured by parity in reporting structure and compensation. Many companies, to this day, lack data science representation at the executive level of the SBU.

Note that the importance of power parity is particularly pronounced when the company is behind on Data Science investments—whether it be in data infrastructure or in people. For data, the expectations are high and the stakeholders numerous. Short-term and long-term planning for the function needs to happen by someone who not only understands the requirements and challenges but is empowered to correctly and efficiently steer the data culture of an existing company.

**c. Information overload and the data science manager.** Gaining the right amount of knowledge about all products supported by the data science team is not straightforward. However, managers need to be informed and curious about the areas under their purview to be able to build a roadmap and effectively assess contributions, investments, timelines, and tradeoffs. They also need to be able to continually communicate the contract between the data science and stakeholder teams and be mindful of the team's portfolio. This is a responsibility of the managers of every functional team—not just data science.

The drawbacks of the PDS model have relatively straightforward solutions, as described above.

## [Conclusion](#table-of-contents) {#conclusion}

Where an SBU is involved, I recommend the PDS model as the best in effectiveness and efficiency in leveraging data for the business.

The PDS model is compliant with <a href="https://www.quora.com/What-is-Groves-Law-and-What-is-the-difference-between-Moores-Law-and-Groves-Law" target="_blank">Grove's Law</a>.

> All large organizations with a common business purpose end up in a hybrid organizational form.
>
> — Andy Grove

It is also aligned with <a href="https://object.cato.org/sites/cato.org/files/articles/hayek-use-knowledge-society.pdf" target="_blank">Hayek's views on the use of knowledge in society</a>, where he motivates the need for a hybrid approach to organization and decision making. Neither end of the spectrum sufficiently meets the speed and context requirements of decision making in society.

> We cannot expect that this problem will be solved by first communicating all this knowledge to a central board which, after integrating *all* knowledge, issues its orders. We must solve it by some form of decentralization. But this answers only part of our problem. We need decentralization because only thus can we insure that the knowledge of the particular circumstances of time and place will be promptly used. But the "man on the spot" cannot decide solely on the basis of his limited but intimate knowledge of the facts of his immediate surroundings. There still remains the problem of communicating to him such further information as he needs to fit his decisions into the whole pattern of changes of the larger economic system.
>
> — F.A. Hayek

P.S. I had an easier time saying all of this in a Tweet,

> Embedded for context, relevance, communication efficiency, and to be in sync. Centralized for hiring and promotion purposes, for peer review, for sharing and maintaining best practices [, for global optimization, and to align on strategy].
>
> — @djpardis on <a href="https://twitter.com/djpard1s/status/999784577441787905?s=20&t=tTdNIhFQpuwmEcSwAujllA" target="_blank">Twitter</a>

## [References](#table-of-contents) {#references}

<a id="ref1" href="#ref1-back">[1]</a> <a href="https://medium.learningbyshipping.com/functional-versus-unit-organizations-6b82bfbaa57" target="_blank">Functional versus Unit Organizations</a> by Steven Sinofsky<br>

<a id="ref2" href="#ref2-back">[2]</a> <a href="http://www.datascienceassn.org/sites/default/files/Building%20Data%20Science%20Teams.pdf" target="_blank">Building Data Science Teams</a> by DJ Patil<br>

<a id="ref3" href="#ref3-back">[3]</a> <a href="https://www.oreilly.com/ideas/where-should-you-put-your-data-scientists" target="_blank">Where should you put your data scientists</a> by Daniel Tunkelang<br>

<a id="ref4" href="#ref4-back">[4]</a> <a href="https://www.youtube.com/watch?v=rqWnEJXnfiY" target="_blank">How to play well with others</a> by Josh Wills

## [Acknowledgements](#table-of-contents) {#acknowledgements}

Thanks to <a href="https://twitter.com/rakiwane" target="_blank">Raki Wane</a>, <a href="https://twitter.com/peteskomoroch" target="_blank">Peter Skomoroch</a>, <a href="https://twitter.com/_saysan_" target="_blank">Sayan Sanyal</a>, <a href="https://twitter.com/jrmontag" target="_blank">Josh Montague</a>, <a href="https://twitter.com/chrisalbon" target="_blank">Chris Albon</a>, Josh Silverman, and <a href="https://twitter.com/_harish_krishna" target="_blank">Harish Krishnan</a> for reviewing and providing valuable feedback.

## [Citations and coverage](#table-of-contents) {#citations-and-coverage}

[University of Virgina Data Science](https://onlinedatasciencemasters.virginia.edu/blog/need-for-interdisciplinary-data-science/), [97 Ways (Matt Wright)](https://www.97ways.com/thelist/8-sit-with-your-stakeholders), [Beyond the POC: How to Make Machine Learning Real in the Enterprise (Sam Charrington)](https://www.linkedin.com/pulse/beyond-poc-how-make-machine-learning-real-enterprise-sam-charrington/), [Projects to Know (Amplify Partners — Sarah Catanzaro)](https://us20.campaign-archive.com/?e=&u=8974b971ec317d8a98dbbf292&id=05f0f9e91a), [The Data Science Roundup (Fishtown Analytics — Tristan Handy)](http://roundup.fishtownanalytics.com/issues/survival-analysis-better-presto-pinterest-dagster-data-science-in-organizations-a-two-fer-dsr-194-193857), [Normcore Tech (Vicki Boykis)](https://vicki.substack.com/p/selling-data-science), [Femstreet (Sarah Nöckel)](https://femstreet.substack.com/p/-parenthood-and-entrepreneurship-19-08-04), [Linear Digressions](http://lineardigressions.com/episodes/2019/8/25/organizational-models-for-data-scientists), [Analytical IQ (Adam Lorton)](https://analyticaliq.com/data-science-staffing/), [Hex Blog (Hex — Barry McCardel)](https://hex.tech/blog/data-team-roi), [Full Stack Deep Learning](https://fall2019.fullstackdeeplearning.com/course-content/where-to-go-next), [The ML Times](https://www.getrevue.co/profile/shashank/issues/the-ml-times-issue-14-192472), [nibble dispatch](https://dispatch.nibble.ai/issues/nibble-ai-weekly-issue-23-making-data-science-more-useful-deploying-ai-without-technical-debt-191252), [Hiring Data Scientists and Machine Learning Engineers: A Practical Guide (Roy Keyes)](https://leanpub.com/dshiring), [Blog Cast (Sam Bail)](https://anchor.fm/blog-cast/episodes/Ep-9-Pardis-Noorzad-Models-for-integrating-data-science-teams-within-companies-e1529qu), [dbt Blog (Erin Vaughan & Janessa Lantz)](https://www.getdbt.com/data-teams/centralized-vs-decentralized/), [Building The Modern Data Team (Pedram Navid)](https://pedram.substack.com/p/modern-data-team), [Data Science Org Design for Startups (Nirant Kasliwal)](https://nirantk.com/writing/data-science-org-design.html), [On Search Leadership (Daniel Tunkelang)](https://www.linkedin.com/pulse/search-leadership-daniel-tunkelang), [Building A Data Platform From Scratch At Collectors (Sam Bail)](https://blog.collectors.com/building-a-data-platform-from-scratch-at-collectors-part-3-of-3/), [Modern Data Teams Hub (Amplify Partners — Emilie Schario)](https://amplifypartners.com/moderndatateamshub/)

<div class="crosspost-container post-container">
This post was originally published on <a href="https://medium.com/@djpardis/models-for-integrating-data-science-teams-within-organizations-7c5afa032ebd" target="_blank" rel="noopener">Medium</a> and is cross-posted here.
</div>
