---
layout: page
title: Posts
---

<!-- <h3>Archive</h3> -->

{% for post in site.posts %}
  {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
