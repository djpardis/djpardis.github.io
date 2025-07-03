---
layout: post
title: 'Introducing The Data Room App: WIP'
description: 'Implementing magic link authentication for a secure investor data room'
keywords: data room, startup, investors, web app, vibe coding, user experience, next.js, mongodb, authentication, magic link, replit
image: /files/pics/profile_pic.jpg
sitemap:
  priority: 0.7
  changefreq: yearly
  lastmod: 2025-07-02
og:
  title: "Introducing The Data Room App: WIP - Pardis Noorzad"
  description: "Implementing magic link authentication for a secure investor data room"
  type: article
twitter:
  card: summary_large_image
  title: "Introducing The Data Room App: WIP - Pardis Noorzad"
  description: "Implementing magic link authentication for a secure investor data room"
---

In [the first part](/blog/2025/06/20/vibe-coding-data-room-app/){:target="_blank"} of this series, I shared my experience with _vibe coding_ using Windsurf to build a custom data room application for startups. I discussed why existing data room solutions didn't meet my needs and also highlighted best practices for working with AI coding assistants.

Now, in the second part, I'll focus on one of the most critical aspects of any application: secure authentication. Specifically, I'll walk through implementing magic link authentication with Replit, a passwordless approach that enhances security while providing a seamless user experience for investors accessing confidential documents.



## Why Replit

I tried initially to implement magic links with Windsurf. Given that I'm not an expert, I wasn't able to fully build a magic link authentication flow and needed more opinionated help. I tried [Replit](https://replit.com){:target="_blank"} which provided a quick and working solution.

[Replit](https://replit.com){:target="_blank"} is a browser-based IDE and hosting platform that started in 2016 as a simple code playground but has evolved into a comprehensive development environment. Founded by Amjad Masad, Haya Odeh, and Faris Masad, it's now focused on making software development more accessible and collaborative. What drew me to it was its ability to handle full-stack applications with built-in authentication systems and serverless deployments, all without requiring complex DevOps knowledge.

Unlike more complex authentication providers that require extensive configuration, Replit's approach is straightforward: create a project, implement authentication with their SDK, and deploy with a single click. For someone who needs a working solution quickly without becoming an auth expert, it's ideal. Their [documentation](https://docs.replit.com){:target="_blank"} is also refreshingly clear and to the point.

When I need granular control over the different parts of the website and product, I'm going back to Windsurf.


## Try it out

As promised in the first part, you can now try out the data room application yourself. Visit [thedataroom.app](https://thedataroom.app){:target="_blank"} and enter your email to request access.

*If you have any feedback or questions about the implementation, please reach out via [X](https://x.com/djpardis){:target="_blank"}, [Bluesky](https://bsky.app/profile/djpardis.com){:target="_blank"}, or [Medium](https://djpardis.medium.com/){:target="_blank"}.*

### References
