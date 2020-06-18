---
layout: page
title: Posts
published: true
---

<!-- <h3>Archive</h3> -->

Subscribe to [feed](../atom.xml).

{% for post in site.posts %}
  {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
