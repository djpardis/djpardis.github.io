---
layout: post
title: 'Building an auth flow with AI'
subtitle: 'Introducing the data room app'
description: 'Implementing magic link authentication for a secure investor data room'
keywords: ai coding, data room, startup, investors, web app, vibe coding, user experience, next.js, mongodb, authentication, magic link, ai
image: /files/pics/blog/2025/data-room-post-vintage-stove.png
card_image: /files/pics/blog/2025/data-room-post-vintage-stove.png
---

![Vintage white Standard Electric stove with curved doors in the foreground, dining room with wooden table and chairs visible through a doorway in the background](/files/pics/blog/2025/data-room-post-vintage-stove.png)

In the [first part of this series](/blog/2025/06/20/vibe-coding-data-room-app/), I shared my experience with vibe coding to build a markdown-based data room application for General Folders. In particular, I highlighted best practices for working with AI coding assistants.

Now, in the second part, I'll focus on one of the most critical aspects of any application: secure authentication. Specifically, I'll walk through implementing magic link authentication, a passwordless approach that provides a seamless experience for investors accessing confidential documents.

![Data room app main interface](/files/pics/blog/2025/dataroom.png)
*The Data Room App ([thedataroom.app](https://thedataroom.app){:target="_blank"}) provides a clean, intuitive interface for investors to access confidential documents.*

## Solving the authentication challenge

At first, I tried to implement magic links with Windsurf. Given that auth flows are not my area of expertise, I needed more opinionated help. I then tried Replit which provided a quick and working solution.

[Replit](https://replit.com){:target="_blank"} is a browser-based IDE and hosting platform that started in 2016 as a simple code playground but has evolved into a comprehensive development environment. What drew me to it was its ability to handle full-stack applications with built-in authentication, along with serverless deployments.

## Replit vs Windsurf: technical comparison

### Authentication and session management

Replit's integrated authentication blueprints provide pre-configured [Passport.js](https://www.passportjs.org/){:target="_blank"} setups, session store integration with PostgreSQL, and automatic HTTPS for secure cookie handling. Magic link authentication was implemented in 15 minutes compared to hours of OAuth configuration debugging.

### Database integration

Replit enables instant PostgreSQL provisioning through [Neon](https://neon.tech){:target="_blank"}. Connection strings, pooling, and SSL certificates are handled automatically. [Drizzle ORM](https://drizzleorm.com){:target="_blank"} integration works seamlessly with database push deployments without migration file management.

Update (July 2025): Replit has since launched [separate development and production databases](https://blog.replit.com/introducing-a-safer-way-to-vibe-code-with-replit-databases){:target="_blank"}, which makes the platform more suitable for developing real-world applications. This feature enables safer iteration by isolating development changes from live customer data.

### Deployment infrastructure

The platform handles load balancing and scaling automatically. 

### Replit limitations

Git operations lack the intuitiveness of terminal workflows. Even basic branching and commit management feel clunky in the interface. Simple git commands in a terminal turn into vague processes with less feedback and control.

The container-based environment limits access to lower-level system functions and file operations, which can make debugging more challenging when compared to local development.

### Windsurf trade-offs

Windsurf provides control with traditional Git workflows, intuitive file system access, and familiar terminal operations. However, the setup overhead for authentication, databases, and deployment significantly slows initial development velocity compared to Replit's integrated infrastructure.

## Data room platform implementation

Here are the implementation details we narrowed in on with Replit.

### Tech stack
- React frontend with TypeScript and shadcn/ui components
- Express.js backend with PostgreSQL database
- Drizzle ORM for type-safe database operations
- JWT-based authentication with 7-day token expiration

### Architecture decisions

- **Simple content management**: Founders can organize their data room using a simple Markdown file, just like writing documentation. No clunky admin panels.

![Document sections in the data room](/files/pics/blog/2025/sections.png)
*Changes to sections.md are reflected instantly - no rebuild required.*

- **Flexible document handling**: The app supports both direct file uploads (protected by authentication) and links to existing documents in Google Drive or Dropbox.

- **Passwordless authentication**: Investors access the data room through magic links sent to their email.

- **Role-based access**: Different permissions for founders (who pay for the service) and investors (who get free access).

- **Engagement analytics**: Founders can see which documents investors have accessed and when.

- **Frictionless invitations**: Founders can invite investors with a simple email, which in turn generates secure access tokens.

## Implementation results

The platform is deployed at [thedataroom.app](https://thedataroom.app) and operates in waitlist mode for market validation. The implementation includes PostgreSQL-backed secure sessions, reliable email delivery for magic links and invitations, and robust file security with strict validation and secure storage for documents up to 50MB.

## Development timeline

Here's a summary of our development timeline.
- Week 1: Authentication and data modeling implementation
- Week 2: Document management and UI development
- Week 3: Email system integration and production deployment

## Feedback request

If you have past experience with data rooms, I'd love to hear your thoughts on the platform. If you're going to be needing a data room soon, I'd love to show you what we've built and get your feedback.

**Live platform:** [thedataroom.app](https://thedataroom.app)

**Access:** Waitlist signups receive discounted pricing; investor access remains free but you would need an invite.