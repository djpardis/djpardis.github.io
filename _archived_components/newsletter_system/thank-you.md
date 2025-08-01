---
layout: page
title: Thank You!
subtitle: Welcome to the newsletter
description: Thank you for subscribing to djpardis's newsletter
permalink: /thank-you/
noindex: true
robots: noindex
sitemap: false
---

# 🎉 Thank you for subscribing!

Thank you for subscribing to my newsletter! You should receive a **confirmation email** shortly.

## What happens next?

1. **Check your email** for a confirmation message from djpardis via Buttondown
2. **Click the confirmation link** to verify your subscription
3. **You're all set!** You'll get notified when I publish new posts

## While you're here

Feel free to explore my latest posts:

{% assign recent_posts = site.posts | limit: 3 %}
{% for post in recent_posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

## Questions?

If you have any questions or don't receive the confirmation email, feel free to [contact me]({{ site.baseurl }}/contact/).

---

[← Back to Blog]({{ site.baseurl }}/blog/) 