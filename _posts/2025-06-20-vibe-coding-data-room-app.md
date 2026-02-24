---
layout: post
title: 'Lessons in AI coding'
subtitle: 'Building a data room app'
description: 'Lessons learned in using AI coding to build an intuitive data room app'
keywords: ai coding, windsurf, cursor, data rooms, startup, investors, vibe coding, user experience, next.js, mongodb, authentication
image: /files/pics/blog/2025/fancy-pooh.jpg
card_image: /files/pics/blog/2025/fancy-pooh-card.jpg
---

This is part 1 of a 2-part post. This first part is about my experience with [vibe coding](https://twitter.com/karpathy/status/1886192184808149383){:target="_blank"}, or rather, [AI-assisted programming](https://simonwillison.net/2025/Mar/19/vibe-coding/){:target="_blank"} with [Windsurf](https://windsurf.com){:target="_blank"}. The [second part]({{ site.baseurl }}{% post_url 2025-07-20-introducing-the-data-room-app %}) is about how I set up the magic link authentication flow.

![A cute bear saying 'oh bother'](/files/pics/blog/2025/fancy-pooh.jpg)
*It's different.*

## The problem

To put these cool tools to use, I've been working on a couple of side projects. The one we'll discuss here is a custom data room app for [General Folders](https://generalfolders.com){:target="_blank"}. 

I evaluated several popular data room solutions to understand their strengths and limitations before deciding to work on a new one. Here's how they compare:

<div class="table-responsive" markdown="1">

| Tool | Features | Limitations | Strengths |
|------|-----------|-------------|----------|
| DocSend | Document analytics, granular access control | Limited customization, corporate aesthetic | Tracking investor engagement |
| Notion | Flexible organization, modern interface | Weak access controls, limited analytics | Early-stage startups with simple needs |
| Google Drive | Familiar interface, real-time collaboration | Poor presentation layer, generic experience | Teams already in Google ecosystem |
| Dropbox | Simple file sharing, version history | Limited structure for investor narrative | Basic file sharing needs |

</div>

For a more thorough comparison of tools and features see Papermark <a href="#ref1">[1]</a> and FirmRoom <a href="#ref1b">[1b]</a>. 

None of these tools fully meet my needs. DocSend's tracking features often [discourage investor engagement](https://bothsidesofthetable.com/i-know-everybody-told-you-to-send-your-fund-raising-decks-as-a-link-d5b4409886af){:target="_blank"}, while its templated approach limits storytelling. It's also [not cheap](https://www.docsend.com/pricing/){:target="_blank"} for cost-sensitive early stage startups. While a tool like Notion allows for customizations that are consistent with your brand, it doesn't allow for the global control of the look and feel of pages in a project. Over time, it's easy to have pages that look very different. We're looking for an affordable solution that balances security with brand customization while preserving investor preferences.

## The solution

Given that context, our goal is to build a secure platform, with a brand-consistent look and feel, for startups to share links to confidential documents with authenticated investors. 

What we're envisioning is one flavor of a file explorer for the browser. In addition to the file explorer, we can add on a file viewer, like a slide viewer or a doc viewer, and replicate the logic that DocSend or Google Workspace have built. However, apart from enabling for granular tracking it's hard to justify the effort that goes into building a file viewer given the affordable price tag on Google Workspace products and the familiarity of the experience.  

As a sidenote, this exercise made me realize that GitHub, Dropbox, and Box, are all file explorers at the core which is quite beautiful.

### The tools

Now we get to the topic of vibe coding. I believe the tools have finally reached that critical threshold where they're not just fun demos but genuinely practical for everyday use. And it looks like others feel the same!

> Last time I felt as giddy as I do when vibe coding was my first ever visual basic app. Seismic shifts afoot people, seismic.
> 
> — Harry Brundage ([@harrybrundage](https://x.com/harrybrundage/status/1928812963085070585)) • May 31, 2024

> Programming with AI is what you thought programming would be like prior to learning it.
>
> — Martin Casado ([@martin_casado](https://x.com/martin_casado/status/1929390376185405743)) • June 1, 2024

To build this data room app, I used [Windsurf](https://windsurf.com){:target="_blank"}, an AI-assisted development platform founded in June 2021 by Varun Mohan and Douglas Chen. Originally launched as Exafunction (focusing on GPU optimization), the company pivoted to developer tools and rebranded as Codeium in 2022, before becoming Windsurf in April 2025. 

For a comparison of coding agents, see Yogesh's head-to-head comparison <a href="#ref2">[2]</a>, C# Corner's top AI tools <a href="#ref3">[3]</a>, Kingy AI's agent analysis <a href="#ref4">[4]</a>, and BrightCoding's technical benchmarks <a href="#ref5">[5]</a>. To understand how they work, see Sourcegraph's anatomy of coding assistants <a href="#ref6">[6]</a>.

## Observations and best practices

Now let's get to the main point of this post. Below I share some observations I've made while using these tools over the past few months. 

### Observations

**IDE interface.** Interacting with LLMs directly inside an IDE is what makes the programming use case for LLMs so successful. Fast feedback loops while iterating on a project is key.

**Skill issue.** These tools increase the surface area of projects that I would take on. I know I can rely on them where I lack skills. This means I can take on brand new projects with more confidence. 

### Best practices

**Version control.** Version control is good in any situation, but specifically when working with agents that have write access to your codebase. This is not disimlar to how collaborating with a colleague is made practical via version control. 

The agent sometimes changes already functional files and modules that are not relevant to your prompt. Sometimes it hallucinates and makes updates that are all wrong. Some say to lock a page you're sure about; but practically, you rarely want to lock a file in an evolving project, so the best bet is to have meaningful commits that you can revert to.

I would go so far to recommend you manage your git workflow manually. That way you can be sure you have meaningful commits and ways to correct big mistakes and hallucinations. Otherwise you end up resetting a full day's worth of work.

**Local vs global solutions.** The agent sometimes does a local hacky solution rather than fixing the root cause. For example, instead of fixing a css issue globally, it might fix it locally for a specific part of the website, or separately for every part. On those occasions it requires nudging about best practices, for example, about _separation of concerns_. Otherwise, you'll end up with unmaintainable code.

**Code review.** As I went deep into a couple of projects, spending more and more time on Windsurf, it had me wondering, am I getting good at anything? What skills, if any, am I gaining? When I program, absent an agent, I get better at programming. When I write, I get better at writing. When I vibe code, especially in a domain I'm not familiar with, am I actually learning anything? This is where I'd recommend reviewing every commit. This way, you'll not only have better command over your codebase but also learn from your robot friend.

**Imprecise details.** Being imprecise can be the source of a lot of pain. Be as clear as possible. _English is code._ I wasted a full half day due to imprecisely describing the folder structure in a project only to realize that it was _my_ prompt and not the agent's dumbness that was leading the project astray.

**Technical details.** I've found that the more accurate I can explain what I want and the more technical context I can provide, the faster and smoother things go. 

**Planning file (plan.md).** Aside from technically detailed prompts, it helps to have a well-defined project definition at the outset. The project goes smoother if there is a clear roadmap. Windsurf's [Planning Mode](https://docs.windsurf.com/windsurf/cascade/planning-mode#planning-mode){:target="_blank"} not only helps keep track of tasks but can also serve as a reference to past prompts instead of the alternative of "as per my tenth to last prompt."

**Cold starts.** Starting from a template is a great idea, when available. Starting from scratch can be challenging especially if you don't know what the project structure should look like. Lack of templates isn't necessarily a blocker but templates make the experience smoother; they steer the agent towards best practices in domains where you are not as opinionated.

**Debugging.** Debugging works easier when you understand the codebase. For example, if I can identify the root cause of a bug, it's easier to write a prompt and fix the problem. Otherwise, it's just an endless loop of the blind leading the blind; which can still work but can take forever.

**Work estimates.** One thing I've struggled with is trying to estimate how long something takes. Is it easier or harder to provide work estimates when working with an agent? I'd say it's harder. Imagine working with someone without having visibility into their strengths and weaknesses. In my experience I've found the agent is not great at auth flows, but really good at CSS, for example, but I wouldn't have known that until I got deep into the project. 

**Pure vibes.** If it's a small, short-term project, it makes sense to let the agent take the wheel. All you need to do is to nudge it in the right direction once in while but little involvement is necessary. However, for a bigger project, or one that's meant to be revised later, or one that is shared with other collaborators, it's different. In this case it's easier if you know the codebase and review every commit, just as you would if you were working with a colleague who might move to another project at any point. Additionally, if your project is one where performance or security matters then you need to be more alert and involved. 

**Memories and rules.** A new chat window doesn't always remember how we did things before and will find a new way of doing things, that while probably correct, is not consistent with the rest of the codebase. In these settings it makes sense to create a [memory or a rule](https://docs.windsurf.com/windsurf/cascade/memories){:target="_blank"} to guide the agent.

### Advice from Windsurf itself

I asked Windsurf directly what advice it would give to someone starting with AI-assisted programming. Here are some key insights from the tool itself.

**Context windows.** Be mindful of the AI's context window limitations. For large codebases, focus the AI on specific files or components rather than expecting it to understand the entire system at once. This improves response quality and reduces confusion.

**Documentation-first approach.** Ask the AI to document its implementation strategy before writing code. This forces clarity of thought and gives you a chance to course-correct before any code is written.

**Tool complementarity.** AI coding tools work best when complemented with traditional development tools like linters, type checkers, and test suites that can catch issues the AI might miss.

### Elsewhere on the web

Check out the Windsurf documentation <a href="#ref7">[7]</a> and Windsurf rules at UI Bakery <a href="#ref8">[8]</a> for general Windsurf best practices. Also see David Crawshaw's blog post <a href="#ref9">[9]</a> for an interesting look at programming with agents. For more on vibe coding, check out 12 Rules to Vibe Code Without Frustration <a href="#ref10">[10]</a>.

That's it for now. I'll add to this list as I learn more.

## Next steps

In the [second part]({{ site.baseurl }}{% post_url 2025-07-20-introducing-the-data-room-app %}) I explain the login flow with magic link authentication. I've also published a link for you to try out the data room app. 

Next up, stay tuned as I share some of my [explorations](https://github.com/djpardis/mcp-code-qna){:target="_blank"} into MCP servers and agents.

*If you have any feedback or advice, please let me know via [X](https://x.com/djpardis){:target="_blank"}, [Bluesky](https://bsky.app/profile/djpardis.com){:target="_blank"}, or [Medium](https://djpardis.medium.com/vibe-coding-a-data-room-app-2858246857e9){:target="_blank"}. I'm looking forward to hearing from you.*

### References

<a id="ref1" href="#ref1-back">[1]</a> Papermark. (2023). ["Best virtual data room providers comparison"](https://www.papermark.com/virtual-data-room-providers).

<a id="ref1b" href="#ref1-back">[1b]</a> FirmRoom. (2023). ["11 best data room providers you need in 2024: Comparison"](https://firmroom.com/vdr-providers).

<a id="ref2" href="#ref2-back">[2]</a> Yogesh, B. (2025). ["AI coding tools: A developer's head-to-head comparison"](https://medium.com/@b.yogesh565/comparison-of-ai-coding-tools-a-developers-perspective-cbde8005a7dd). A technical comparison of Cursor, GitHub Copilot, Replit, Cline, and Claude Code from an engineer's perspective.

<a id="ref3" href="#ref3-back">[3]</a> C# Corner. (2025). ["Top 7 AI tools for software developers"](https://www.c-sharpcorner.com/article/top-7-ai-tools-for-software-developers/). Comprehensive analysis of GitHub Copilot, ChatGPT, Replit AI, Windsurf, Tabnine, Cursor AI, and V0 by Vercel.

<a id="ref4" href="#ref4-back">[4]</a> Kingy AI. (2025). ["AI coding agents in 2025: Cursor vs. Windsurf vs. Copilot vs. Claude vs. VS Code AI"](https://kingy.ai/blog/ai-coding-agents-in-2025-cursor-vs-windsurf-vs-copilot-vs-claude-vs-vs-code-ai/). In-depth analysis of strengths and weaknesses across code generation, debugging, refactoring, and large-codebase support.

<a id="ref5" href="#ref5-back">[5]</a> BrightCoding. (2025). ["AI coding assistants compared: technical benchmarks"](https://www.blog.brightcoding.dev/2025/03/22/cursor-vs-windsurf-vs-github-copilot-the-ai-coding-assistant-showdown/). Technical analysis showing Windsurf processes 180 tokens/second with Llama 3.1 405B model, Cursor averages 220 tokens/second with GPT-4o, and GitHub Copilot processes 150 tokens/second with standard models. Engineers prefer Cursor (42%) for refactoring, Windsurf (38%) for speed and privacy, and Copilot (36%) for reliability.

<a id="ref6" href="#ref6-back">[6]</a> Sourcegraph Engineering. (2024). ["The anatomy of an AI coding assistant"](https://sourcegraph.com/blog/anatomy-of-a-coding-assistant). Technical blog explaining how modern AI coding assistants work under the hood, detailing the vector embedding techniques (using OpenAI's text-embedding-ada-002 or custom models), context fetching mechanisms, and how different features (autocomplete, chat, test generation) use specialized retrieval methods optimized for latency (76ms) or accuracy depending on the use case.

<a id="ref7" href="#ref7-back">[7]</a> Windsurf. (2025). ["Getting Started with Windsurf"](https://docs.windsurf.com/windsurf/getting-started). Official documentation on getting started with the Windsurf VSCode fork.

<a id="ref8" href="#ref8-back">[8]</a> UI Bakery. (2025). ["Windsurf AI Rules"](https://uibakery.io/blog/windsurf-ai-rules). Best practices for working with Windsurf AI and optimizing its performance.

<a id="ref9" href="#ref9-back">[9]</a> Crawshaw, D. (2025). ["Programming with Agents"](https://crawshaw.io/blog/programming-with-agents). An in-depth look at the paradigm shift of programming with AI agents.

<a id="ref10" href="#ref10-back">[10]</a> Creator Economy. (2025). ["12 Rules to Vibe Code Without Frustration"](https://creatoreconomy.so/p/12-rules-to-vibe-code-without-frustration). A practical guide to effective AI-assisted programming techniques and best practices.
