---
layout: page
title: Posts
published: true
---

<!-- <h3>Archive</h3> -->

Here is the [feed](../atom.xml) for future updates.

{% for post in site.posts %}
  {{ post.date | date_to_string }} &rarr; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
