---
layout: post
title: 'Hourly mentions of a word on Twitter'
description: 'A guide to tracking and visualizing hourly Twitter mentions using Tweepy and the ELK stack'
keywords: twitter api, elk stack, logstash, elasticsearch, kibana, data visualization
---

Some time ago (ok a month ago—time ✈️s), I saw this tweet:

> Need a simple tool to track mentions of a keyword on Twitter by hour. Don't need a bunch of bells and whistles. Thoughts?
> 
> — Kaegan Donnelly ([@kaequan](https://twitter.com/kaequan/status/591359379431104513)) • April 23, 2015

I thought, "should be easy, lmgt." However, results for the query "hourly mentions of a word on twitter" didn't offer clear solutions.
Days later I came across two relatively simple approaches to tackling the problem. The first is [Tweepy](https://github.com/tweepy/tweepy). The other is [Logstash](https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html).

Tweepy is an [open source Python library](http://www.tweepy.org/) for accessing the Twitter API, including the Twitter Streaming API.

Logstash is an open source tool for [collecting, processing, and forwarding events](https://wikitech.wikimedia.org/wiki/Logstash). Logstash can read events from the Twitter Streaming API using [its `twitter` plugin](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-twitter.html).

Having tried both, I recommend Logstash over Tweepy for two main reasons:

1. it [deals](https://github.com/logstash-plugins/logstash-input-twitter/blob/master/lib/logstash/inputs/twitter.rb) with the Twitter API rate limits by default
2. it offers Elasticsearch and Kibana integration—simplifying the aggregation and visualization steps, respectively, that naturally follow the data (tweet) collection step

For both Tweepy and Logstash you need access to Twitter's streaming API. Follow steps 2 and 3 [here](https://www.digitalocean.com/community/tutorials/how-to-authenticate-a-python-application-with-twitter-using-tweepy-on-ubuntu-14-04) to create a Twitter app and obtain your _Consumer Key_, _Consumer Key Secret_, _Access Token_, and _Access Token Secret_.

### The ELK solution

Download and install [Elasticsearch](https://www.elastic.co/downloads/past-releases/elasticsearch-1-4-4), [Logstash](https://www.elastic.co/downloads/logstash), and [Kibana](https://www.elastic.co/downloads/kibana). If you are on a Mac, you can
{% highlight bash %}
brew install elasticsearch
brew install logstash
{% endhighlight %}

Make sure you have Elasticsearch and Kibana running. Before running Logstash, you need to prepare a configuration file. Below is a sample configuration file to collect tweets containing the word `ireland` (call it `ireland.conf`)
{% highlight apacheconf %}# a logstash config file has three sections:
# input{}, output{}, and (optional) filter{}; add plugins
# to specify how events should be handled in each section

input {
    twitter {
        # set key and token values from the previous step
        consumer_key => ""
        consumer_secret => ""
        oauth_token => ""
        oauth_token_secret => ""
        # assume we are interested in tracking all
        # mentions of the word "ireland"
        keywords => ["ireland"]
        # no need for all fields to get hourly counts
        full_tweet => false
    }
}

output {
	stdout {
		# include this to pretty-print the event's json to stdout
		codec => rubydebug
  	}
}
{% endhighlight %}

To start streaming tweets, run
{% highlight apacheconf %}
logstash -f ireland.conf
{% endhighlight %}

At this point, tweets are written to `stdout`. In order to visualize tweet counts using Kibana, you need to save the tweets to Elasticsearch.

Add the `elasticsearch` plugin to the `output` section of the configuration

{% highlight apacheconf %}
output {
    elasticsearch {
        protocol => "http"
        host => "localhost"
        index => "irelandtweets"
    }

	stdout {
		# include this to pretty-print the event's json to stdout
		codec => rubydebug
  	}
}

{% endhighlight %}


Run Logstash again and have a look at:

{% highlight bash %}
http://localhost:9200/irelandtweets/_search/?pretty
{% endhighlight %}


Below is a sample of the output format. You can see, for example, that `65235` documents (tweets) have been stored in the `irelandtweets`