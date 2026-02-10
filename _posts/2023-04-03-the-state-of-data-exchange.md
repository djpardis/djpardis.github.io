---
layout: post
title: "The state of data exchange"
subtitle: "A survey of data transfer and sharing methodology"
date: 2023-04-03
categories: [data-science, data-engineering, business]
tags: [data-exchange, data-transfer, data-sharing, partnerships, infrastructure]
---

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#abstract">The abstract</a></li>
<li><a href="#talk">The talk</a>
  <ul>
    <li><a href="#business-partners">Business partners exchange data for a variety of reasons</a></li>
    <li><a href="#companies-build-solutions">Companies build solutions for data exchange today</a>
      <ul>
        <li><a href="#excel-csv-sftp">Send or receive data as an Excel file or CSV by Gmail, Slack, Dropbox, or over SFTP</a></li>
        <li><a href="#share-credentials">Transfer data by sharing AWS or database credentials</a></li>
        <li><a href="#expose-api">Make data available by exposing an API</a></li>
        <li><a href="#implement-api">Pull data by implementing an API</a></li>
        <li><a href="#send-via-api">Send data via an API</a></li>
        <li><a href="#implement-sdk">Send data by implementing an SDK</a></li>
        <li><a href="#secure-sharing">Securely share data using Snowflake, Redshift, Azure Data Share, and GCP Datashare</a></li>
        <li><a href="#marketplace">Make data available on a marketplace</a></li>
        <li><a href="#clean-rooms">Collaborate on overlapping data with data clean rooms</a></li>
      </ul>
    </li>
    <li><a href="#challenges-remain">But challenges still remain</a>
      <ul>
        <li><a href="#type-information">Data exchange via Excel or CSV loses valuable type information</a></li>
        <li><a href="#data-validation">Data validation is manual in most cases</a></li>
        <li><a href="#not-all-apis">Not all data providers expose an API</a></li>
        <li><a href="#vendor-apis">Not all vendor APIs are implemented by major integration companies</a></li>
        <li><a href="#staffing-issues">Some data consumers are not staffed adequately</a></li>
        <li><a href="#obscure-formats">Some data consumers ask for an obscure format</a></li>
        <li><a href="#pricing-complexity">Pricing an exchange is complex. Who should pay? And what amount?</a></li>
        <li><a href="#speed-challenge">Speed is a challenge</a></li>
        <li><a href="#security-compliance">Security is a challenge. So is compliance</a></li>
        <li><a href="#pipeline-maintenance">Monitoring and maintaining so many different pipelines is a challenge</a></li>
        <li><a href="#auditing-challenge">Auditing is a challenge</a></li>
        <li><a href="#decision-fatigue">Decision fatigue is real</a></li>
      </ul>
    </li>
    <li><a href="#solution-properties">What are the properties of a solution?</a></li>
  </ul>
</li>
</ul>

<ul>
<li><a href="#reactions">Reactions to the talk</a></li>
</ul>
</div>

I just got back from [Data Council](https://www.datacouncil.ai/austin){:target="_blank"}. Thanks to Pete Soderling for an excellent conference where people gather to discuss the future of data infra, AI, and analytics. It was an energizing couple of days with many valuable takeaways as I work on [General Folders](https://twitter.com/GeneralFolders){:target="_blank"}.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/Np0kTZlbRO4?list=PLAesBe-zAQmF-GpvZ3ba5YpVzoVbgzl8M" frameborder="0" allowfullscreen></iframe>
</div>
<p class="image-caption">A recording of the talk is available on YouTube.</p>

Below you can find the full transcript. I would love to hear about your experiences with data exchange. Please [reach out](https://twitter.com/GeneralFolders){:target="_blank"}!

## [The abstract](#table-of-contents) {#abstract}

Data exchange is integral to every business partnership. Yet data exchange practices are highly manual, prone to data leaks, difficult to validate, inherently impossible to monitor, and costly to audit. In this talk, we present an overview of the variety of methods enterprises use to share and transfer data. We talk about some of the challenges companies continue to face along the vectors of security, simplicity, and speed. We conclude by enumerating the properties of a good solution.

## [The talk](#table-of-contents) {#talk}

### [Business partners exchange data for a variety of reasons](#table-of-contents) {#business-partners}

It might be surprising to many, as it was for me, but they do this quite often.

One of the scenarios is SaaS vendors sending data to their customers. SaaS vendors offer some sort of service to their customer's customers. The customers' data then ends up in the vendor's warehouse, and so the vendors need to make that data available to their customers.

Another scenario is when a company is doing market research and needs to incorporate market data into their analysis. They need to talk to data vendors to purchase a particular data set. The procurement process usually involves a data exploration and assessment aspect and the transaction could be a one-time transfer or require recurring updates.

Yet another scenario is when a healthcare, transportation, or energy company is responsible for sending data to the local government on a regular basis.

For AI SaaS evaluation, companies usually want to assess whether a new tool would work for their uses cases. Before buying, they usually transfer data to the vendor's warehouse and ask that the vendor demonstrates the effectiveness of the new tool on real customer data.

In M&A, the acquirer needs to run their own diligence on the company they want to acquire. They usually ask for certain data sets and if the deal goes through, a full transfer of data assets.

Sometimes businesses need to collaborate on the intersection of their respective customers. For example, a makeup brand (i.e., the supplier) needs to share data with all retailers that carry the brand to find the marketing channels that work best in each cohort.

Yet in other cases, businesses don't even know the overlap of their customers and that's what they need to find out. We'll get into more details about these applications later.

Okay, enough about use cases — we can go on forever.

### [Companies build solutions for data exchange today](#table-of-contents) {#companies-build-solutions}

Let's go through some of these solutions and how they work. I've had a lot of conversations with companies about this topic and this list is a kind of summary of those conversations.

The goal is not to judge these methods, or even to assess whether a team made the right call to go with a certain approach — a lot of that depends on infrastructure limitations and deadlines. The goal is to enumerate some of the inevitably great many methods companies use to exchange data with their business partners.

#### [Send or receive data as an Excel file or CSV by Gmail, Slack, Dropbox, or over SFTP](#table-of-contents) {#excel-csv-sftp}

One of the most common ways to exchange data is by setting up an SFTP server, uploading a CSV file, then sharing a link. Some use [Amazon Transfer Family](https://aws.amazon.com/aws-transfer-family/){:target="_blank"} and managed workflows to move data in and out of S3 over SFTP. Others use [Airflow](https://airflow.apache.org/){:target="_blank"}, [Dagster](https://dagster.io/integrations/dagster-ssh-sftp){:target="_blank"}, or [cron jobs](https://en.wikipedia.org/wiki/Cron){:target="_blank"} to set up and manage pipelines.

![SFTP data exchange pipeline](/files/pics/blog/2023/sftp-pipeline.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*The data provider manages only half the pipeline. The rest of the pipeline is up to the data consumer.*

What happens in this scenario is that the data provider ensures that the data is securely moved from S3 to the SFTP server. It is then up to the data consumer to decide how to handle the downstream data. They need to build their own pipelines.

#### [Transfer data by sharing AWS or database credentials](#table-of-contents) {#share-credentials}

Companies use DB replication tools to implement one-time or recurring syncs to and from customer data stores. You can use [Fivetran](http://fivetran.com){:target="_blank"} or [Airbyte](https://airbyte.com/){:target="_blank"}, or even [Debezium](https://debezium.io/blog/2018/07/19/advantages-of-log-based-change-data-capture/){:target="_blank"} to build your own log-based CDC replication, should a log be available.

You might say, at this point, that sharing database credentials with business partners is not a secure solution. And this is true. But it happens quite often as businesses need to set up reliable end-to-end cross-company pipelines— particularly when one partner is short on staff.

It should be noted that AWS lets you create [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="_blank"} to securely provide a business partner read or write access to your S3 buckets. This helps avoid sharing credentials in most cases.

![Database credential sharing](/files/pics/blog/2023/db-credentials.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

#### [Make data available by exposing an API](#table-of-contents) {#expose-api}

As a SaaS vendor, when you're relatively sure you know what data a lot of your customers want access to, you can make that data available by exposing an API.

There are a lot of benefits to this: 1) consumers can pick and choose the data they need and access it when they need it, 2) there are standards for APIs that everyone can implement, like REST or GraphQL, 3) APIs are DB-independent. 4) APIs are open and not tied to a vendor, 5) the data contract is implicit in an API 6) APIs are easily testable, by both sides of the transaction. These are all properties of good data transfer technology.

#### [Pull data by implementing an API](#table-of-contents) {#implement-api}

As a SaaS vendor partner, you can implement an API to pull your data from vendors. It turns out that's a whole lot of work. APIs and schemas evolve a lot. The good news is that you can also use tools like [Fivetran](https://www.fivetran.com/){:target="_blank"}, [Airbyte](https://airbyte.com/){:target="_blank"}, [Meltano](https://meltano.com/){:target="_blank"}, or [Rudderstack](https://www.rudderstack.com/){:target="_blank"} that handle this for you.

![API data pulling](/files/pics/blog/2023/api-pulling.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

#### [Send data via an API](#table-of-contents) {#send-via-api}

Moving data out of the warehouse and into operational systems like [MailChimp](https://mailchimp.com/en-gb/){:target="_blank"} and [Braze](https://www.braze.com/){:target="_blank"} is useful. These systems provide some sort of value on top of raw data. This is made possible by implementing the API they expose to send data. Given the work involved in maintaining that code, it's simpler to use "reverse ETL" or "data activation" tools like [Census](https://www.getcensus.com/reverse-etl){:target="_blank"}, [Hightouch](https://hightouch.com/){:target="_blank"}, and [Rudderstack](https://www.rudderstack.com/){:target="_blank"}.

#### [Send data by implementing an SDK](#table-of-contents) {#implement-sdk}

You can integrate with a vendor's existing SDK to send events data. For example, [Braze](https://www.braze.com/docs/user_guide/data_and_analytics/user_data_collection/sdk_data_collection/){:target="_blank"}'s backend service calculate metrics based on the SDK data it receives. Implementing SDKs is not easy and the integrations take months, even up to an entire year. Adding new data points also means new code to be tested, deployed, and shipped. But the data from implementing SDKs is reliable.

#### [Securely share data using Snowflake, Redshift, Azure Data Share, and GCP Datashare](#table-of-contents) {#secure-sharing}

When transferring data is not necessary, sharing data is way more efficient. However, sharing works in very specific scenarios.

You can share data for *read purposes only* across accounts (which can span regions but of course needs to be on the same cloud), on both Snowflake and Redshift. The great thing about it is that it's instant access. There's no data copies or data movement. It's a view of existing data and so any changes are captured instantaneously by the view. Because data never leaves your servers, you also get straightforward access to usage metrics. You can restrict or revoke access at any time.

![AWS Redshift data sharing](/files/pics/blog/2023/redshift-sharing.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*With [AWS Redshift](https://aws.amazon.com/blogs/big-data/announcing-amazon-redshift-data-sharing-preview/){:target="_blank"}, you can create data shares and share it with internal and external customers.*

Companies like Stripe use Snowflake and Redshift data sharing capabilities to send all of their customers' up-to-date data, avoiding an API integration. Of course, the API is still available for those that need it. Salesforce CDP also uses this "zero-copy" or "zero-ETL" strategy to data sharing to make their data available to Snowflake customers.

#### [Make data available on a marketplace](#table-of-contents) {#marketplace}

With [AWS Data Exchange](https://aws.amazon.com/data-exchange/){:target="_blank"}, data vendors can provide easy and secure access to their data, with the ability to reach AWS customers. Consumers can get read access via Redshift sharing capabilities or write pipelines to export the data to S3 and use it from there.

![Marketplace at Bruges](/files/pics/blog/2023/marketplace-bruges.jpeg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*This is [Marketplace at Bruges](https://americanart.si.edu/artwork/marketplace-bruges-20270){:target="_blank"} by Samuel Prout.*

With [Snowflake Marketplace](https://www.snowflake.com/en/data-cloud/marketplace/){:target="_blank"}, data vendors can make their data available to Snowflake customers. With Snowflake data sharing, consumers get read access to the data instantly without the need for ELT integrations.

#### [Collaborate on overlapping data with data clean rooms](#table-of-contents) {#clean-rooms}

Sometimes, all that business partners want is to collaborate on overlapping data without the need to fully exchange copies of data. This makes contracts easier and the whole procurement process faster.

![Data clean room](/files/pics/blog/2023/data-clean-room.jpeg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From [here](https://www.searchenginejournal.com/data-clean-rooms/417606/){:target="_blank"}.*

Clean rooms allow business partners to collaborate on and analyze data in a secure environment, without having to share or reveal user-level data. For example, clean rooms can aid two business partners discover their shared customers. Further, clean rooms sometimes facilitate collaborations even before any sort of partnership contracts are signed.

With [AWS Clean Rooms](https://aws.amazon.com/clean-rooms/){:target="_blank"} you can invite any AWS customer to collaborate, select datasets, and configure restrictions. You can analyze data with up to 4 parties in a single collaboration. You can set minimum aggregation thresholds while allowing collaborators to run their queries.

Similarly, [Snowflake](https://www.snowflake.com/blog/data-clean-room-explained/){:target="_blank"}, [InfoSum](https://www.infosum.com/){:target="_blank"}, and [LiveRamp](https://business.pinterest.com/blog/pinterest-liveramp-pilot-data-clean-room/){:target="_blank"} all offer some flavor of clean rooms. Some companies also [implement their own](https://clearcode.cc/blog/data-clean-room/){:target="_blank"}. For example, Disney, Unilever, Hershey's have all built out their own clean rooms to be able to collaborate with marketers and retailers.

### [But challenges still remain](#table-of-contents) {#challenges-remain}

#### [Data exchange via Excel or CSV loses valuable type information](#table-of-contents) {#type-information}

CSV suppresses type information that needs to be inferred later on when data is being uploaded back to the database or warehouse.

#### [Data validation is manual in most cases](#table-of-contents) {#data-validation}

This is an issue on both sides of the transaction. This is not an issue for API-based integration. And it's one of the main areas of strength for APIs.

Everywhere else, there is always the risk that your business partner might mistakenly send you data they should not be sending. And this is usually PII (personal identifiable information) or PHI (protected health information) where you don't have the necessary contracts set into place, but also data for other parts of the business you may not need.

When you talk to data practitioners, you'll see that they've been on the receiving side of a lot of PII data that customers just send by accident.

#### [Not all data providers expose an API](#table-of-contents) {#not-all-apis}

Building and managing APIs is not easy. Keeping the API up-to-date and backwards compatible is also time consuming and requires a major commitment from the API provider. We can't expect a partner API to be available for every data set we need from a business partner.

#### [Not all vendor APIs are implemented by major integration companies](#table-of-contents) {#vendor-apis}

Connectors for all possible APIs under the sun just doesn't exist. As a data consumer, implementing APIs and keeping the integration code up-to-date is very time consuming. Hence the need for integration companies in the first place.

#### [Some data consumers are not staffed adequately](#table-of-contents) {#staffing-issues}

Data consumers are sometimes not staffed appropriately to manage the data they receive. This is especially an issue if data is sent via SFTP.

SFTP data exchange only handles one half of the transaction. Many data consumers are not savvy enough to manage the pipeline on their side. In many cases, you'll find that data is downloaded onto a laptop before being uploaded to the cloud.

![Manual data handling](/files/pics/blog/2023/manual-handling.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

At a previous company, we needed to send data on a monthly cadence instead of an hourly one, because our partner only had a single staff member to manually download the data. In the meantime, our partner wanted us to provide real time dashboards to show how they were doing before they were able to run their own analytics on the raw data they were going to receive at the end of the month.

Building SDKs and APIs, but also integrating with them to send and receive data are all time consuming and require expertise.

#### [Some data consumers ask for an obscure format](#table-of-contents) {#obscure-formats}

This adds the additional burden of obscure data transformations when building a transfer pipeline with a new business partner.

#### [Pricing an exchange is complex. Who should pay? And what amount?](#table-of-contents) {#pricing-complexity}

When setting up transfer pipelines, which side of the transaction should be paying for the pipelines, the storage, and the potential egress costs? Accounting for long-running and diverse transactions between two parties can quickly become complex.

Sharing credentials makes it even more difficult to do cost accounting.

#### [Speed is a challenge](#table-of-contents) {#speed-challenge}

How fresh do we need the data to be? How quickly do we need the data to be made available in each batch? Should speed guarantees be included in partner contracts? It's a challenge for teams to estimate what is possible right off the bat.

#### [Security is a challenge. So is compliance](#table-of-contents) {#security-compliance}

There is a lot to unroll here. Sharing credentials is not secure. Not knowing the location to which a file from SFTP is downloaded before it makes its way to the warehouse is worrisome. APIs expose backend data and are constantly a source for [data breaches](https://nordicapis.com/5-major-modern-api-data-breaches-and-what-we-can-learn-from-them/){:target="_blank"}. We also see that without a thorough testing strategy, many partners tend to send or receive PII data that was intended to be sent as part of the contract.

#### [Monitoring and maintaining so many different pipelines is a challenge](#table-of-contents) {#pipeline-maintenance}

Partnership contracts are updated all the time. It's a huge hassle to have to evolve pipelines alongside the evolving contracts.

![Pipeline maintenance](/files/pics/blog/2023/pipeline-maintenance.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

Further, schemas change, APIs change, servers fail, and so maintaining the ever-growing list of highly diverse pipelines quickly becomes a burden on the business. Businesses end up in a place where they have a different type of pipeline for each business partner, and sometimes multiple types of pipelines for the same partner.

#### [Auditing is a challenge](#table-of-contents) {#auditing-challenge}

In a world where a company must maintain all the various disparate pipelines, auditing becomes increasingly complex and time consuming.

#### [Decision fatigue is real](#table-of-contents) {#decision-fatigue}

When you start speaking to a new business partner, or an old business partner about a new use case, you need to go through the list of all possible approaches, depending on the amount of time you have, number of people they have, your infrastructure, their infrastructure, the volume of data being transferred, the direction of the transfer, the cadence, the source, the destination, the required security and speed guarantees, and so on.

![Decision matrix](/files/pics/blog/2023/decision-matrix.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

There's a lot to consider!

## [What are the properties of a solution?](#table-of-contents) {#solution-properties}

Now that we talked about all of the challenges, what are the properties of a good solution?

Here's my wishlist.

1. The solution would manage the end-to-end cross-company pipeline, such that it is not relying on either partner to be particularly experienced in data transfer.

2. The solution would be cloud- and technology agnostic. Business partners shouldn't need to consider each other's tech stack before signing a contract.

3. The solution would make it easy to monitor and test all pipelines and to manage them all in one place. Both partners need to be alerted if a critical pipeline is failing.

4. A good solution would allow an easy way to incorporate the evolving contracts. The nature of partnerships change all the time.

5. The solution would maintain a ledger of all transactions that happen with a specific partner.

6. Lastly, yet most important, is that a good solution would make it easy for companies to stay secure and compliant. That's easy to do when we have the right tools at our disposal.

![Solution properties](/files/pics/blog/2023/solution-properties.png){: style="max-width: 500px; display: block; margin: 0 auto;"}

## [Reactions to the talk](#table-of-contents) {#reactions}

Below are reactions to the talk.

![TJ Murphy shoutout](/files/pics/blog/2023/tj-murphy-shoutout.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Thanks TJ Murphy for the [shoutout](https://twitter.com/teej_m/status/1643012610433089541?s=20){:target="_blank"}.*

![Abhi Sivasailam support](/files/pics/blog/2023/abhi-sivasailam-support.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Thank you for the [support](https://twitter.com/_abhisivasailam/status/1643024564681863168?s=20){:target="_blank"} Abhi Sivasailam!*

![Matthew Mullins encouragement](/files/pics/blog/2023/matthew-mullins-encouragement.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Thank you for the [words of encouragement](https://twitter.com/mullinsms/status/1641474106653650950?s=20){:target="_blank"} Matthew Mullins!*

![Ananth Packkildurai shoutout](/files/pics/blog/2023/ananth-packkildurai-shoutout.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Thanks for the [shoutout](https://twitter.com/GeneralFolders/status/1644394291270422528?s=20){:target="_blank"} Ananth Packkildurai! Big fan of the DB comparison and of [Data Engineering Weekly](https://twitter.com/data_weekly){:target="_blank"}!*

<div class="crosspost-container post-container" style="margin-top: 2rem; margin-bottom: 1rem;">
This post was originally published on <a href="https://medium.com/@djpardis/the-state-of-data-exchange-31049fa229f0" target="_blank" rel="noopener">Medium</a> and is cross-posted here.
</div>
