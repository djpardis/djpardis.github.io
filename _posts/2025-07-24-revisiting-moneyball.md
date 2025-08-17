---
layout: post
title: "Revisiting Moneyball"
subtitle: "Data, sports, payrolls, and memes"
description: "Data, sports, payrolls, and memes - examining the enduring fascination with Oakland's 2002 season and the analytics revolution in baseball"
keywords: moneyball, baseball analytics, sabermetrics, oakland athletics, billy beane, data science, sports analytics
date: 2024-12-24
image: /files/pics/blog/2025/moneyball.jpg
---

<div class="crosspost-container post-container" style="margin-bottom: 1rem; font-style: italic;">
This post was originally published on <a href="https://djpardis.medium.com/revisiting-moneyball-074fc2435b07" target="_blank">Medium</a> and is cross-posted here.
</div>

<div class="update-container post-container" style="margin-bottom: 1rem; font-style: italic;">
Update, July 25, 2025<br><br>
1. The piece made it to the <a href="https://news.ycombinator.com/item?id=44676348" target="_blank">HN</a> front page. Thank you <a href="https://x.com/matsonj" target="_blank">@matsonj</a> and <a href="https://x.com/akm" target="_blank">@akm</a>!<br>
2. <a href="https://x.com/WiLuisE/status/1948550390397763759" target="_blank">My friend Luis</a> used <a href="https://notebooklm.google.com/notebook/a28919ba-fc09-43e6-8fa6-491365e8525a?artifactId=e9345839-0370-471a-83b1-99cd10227847" target="_blank">NotebookLM</a> to create a podcast discussion of this post.<br><br>
<div style="position: relative; width: 100%; height: 140px; max-width: 100%; overflow: hidden;">
  <iframe src="https://jumpshare.com/share/chrIh55BD3L7dXfrQDjw" width="100%" height="140" frameborder="0" scrolling="no" style="position: absolute; top: 0; left: 0; width: 100%; height: 140px !important; max-height: 140px !important; aspect-ratio: unset !important; overflow: hidden;"></iframe>
</div>
</div>

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#understanding-moneyball">Understanding Moneyball</a>
  <ul>
    <li><a href="#the-2001-as-lost-significant-talent">The 2001 A's lost significant talent.</a></li>
    <li><a href="#analytics-unlocks-transparent-decision-making">Analytics unlocks transparent decision-making.</a></li>
    <li><a href="#getting-on-base-was-undervalued">Getting on base was undervalued.</a></li>
    <li><a href="#scott-hatteberg-was-undervalued">Scott Hatteberg was undervalued.</a></li>
    <li><a href="#the-streak-was-historic-and-remarkable">The streak was historic and remarkable.</a></li>
    <li><a href="#you-can-build-a-player-in-aggregate">You can build a player in aggregate.</a></li>
    <li><a href="#the-playoffs-are-a-crapshoot">The playoffs are a crapshoot.</a></li>
    <li><a href="#its-hard-not-to-be-romantic-about-baseball">It's hard not to be romantic about baseball.</a></li>
  </ul>
</li>
<li><a href="#critiquing-moneyball">Critiquing Moneyball</a>
  <ul>
    <li><a href="#moneyball-overlooks-existing-talent">Moneyball overlooks existing talent on the 2002 roster.</a></li>
    <li><a href="#moneyball-promotes-low-payrolls">Moneyball promotes low payrolls in baseball, thus ruining the game.</a></li>
    <li><a href="#moneyball-promotes-analytics">Moneyball promotes the use of analytics in baseball, thus ruining the sport.</a></li>
    <li><a href="#moneyball-suggests-baseball-is-unfair">Moneyball suggests baseball is unfair, even though it's not that unfair, comparatively speaking.</a></li>
  </ul>
</li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>
</div>

![Oakland Coliseum](/files/pics/blog/2025/oakland1.jpg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Oakland Coliseum, September 2022.*

## [Introduction](#table-of-contents) {#introduction}

Why are we still talking about Moneyball? Why am I talking about Moneyball?

For one, I've been meaning to write this post since 2019. [2018](https://x.com/djpardis/status/1089264609305911296){:target="_blank"} even.

![My friends are the best](/files/pics/blog/2025/friendsarethebest.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*My friends are the best. From [here](https://twitter.com/djpardis/status/1316095842434134017){:target="_blank"}.*

The book was published in 2003, and the movie was released in 2011. It feels silly to rehash, except the whole thing fascinates fans two decades later. Why? On the one hand, it is loved because it tells the classic underdog story while suggesting that nerdy analytics contributed to the wins; on the other, and especially as the A's leave Oakland, it is blamed for encouraging low payrolls and critiqued for overstating the impact of analytics on the 2002 season and beyond.

<div class="image-row">
  <div class="image-container">
    <img src="/files/pics/blog/2025/moneytweets1.png" alt="Moneyball tweet 1">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2025/moneytweets2.png" alt="Moneyball tweet 2">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2025/moneytweets3.png" alt="Moneyball tweet 3">
  </div>
</div>
*From [here](https://twitter.com/djpardis/status/1316095842434134017){:target="_blank"}, [here](https://twitter.com/djpardis/status/1316095842434134017){:target="_blank"}, and [here](https://twitter.com/djpardis/status/1316095842434134017){:target="_blank"}.*

In this post, I'll go over the author's intentions for writing the book, followed by popular critiques of Moneyball. The goal is to address some of the recurring debates as we cover the main themes and provide historical context for each.

## [Understanding Moneyball](#table-of-contents) {#understanding-moneyball}

Let's begin by discussing the book's central themes and what the author found intriguing about the A's in 2002. Moneyball has been so influential that many of these themes have since become memes.

![Oakland Coliseum](/files/pics/blog/2025/oakland2.jpg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Oakland Coliseum, September 2022.*

### [The 2001 A's lost significant talent.](#table-of-contents) {#the-2001-as-lost-significant-talent}

After losing MVP **Jason Giambi** (7-year, $120M), **Johnny Damon** (4-year, $31M), and closer **Jason Isringhausen** (4-year, $27M), totaling $31.6 million in annual value ($17.1M + $7.75M + $6.75M), the cash-strapped A's faced an impossible challenge with just a $41 million payroll. This is what made the season irresistible to **Michael Lewis** as he watched the A's replace these stars not with expensive equivalents, but with undervalued players.

### [Analytics unlocks transparent decision-making.](#table-of-contents) {#analytics-unlocks-transparent-decision-making}

The A's GM, **Billy Beane**, working with statistician **Paul DePodesta**, used sabermetrics to challenge traditional scouting methods that relied on more subjective evaluations.

This transparency allowed decisions regarding players to be justified through objective metrics. When the A's signed **Scott Hatteberg** or traded for **David Justice**, they could point to specific evidence, like on-base percentage (OBP) or plate discipline, to justify their decision. This approach also aimed to make decision makers accountable for outcomes by establishing a decision-making framework that could be communicated, replicated, and thus improved upon.

### [Getting on base was undervalued.](#table-of-contents) {#getting-on-base-was-undervalued}

While scouts focused on batting average, home runs, and RBIs, Beane recognized that OBP had a stronger correlation with run production than any of the traditional metrics <a href="#ref1">[1]</a><a href="#ref2">[2]</a>. 

The math was simple. Teams that get on base more frequently score more runs, and teams that score more runs win more games. Yet in 2002, players with high OBP were available at below-market prices. Players like Scott Hatteberg (.374 OBP in 2002) and David Justice (.370 OBP) were affordable because their most valuable skill, i.e., getting on base, wasn't appreciated sufficiently by the market.

The strategy worked. The 2002 A's ranked 2nd in the American League (AL) in OBP (.339) despite having the third-lowest payroll in baseball.

<div class="image-row">
  <div class="image-container">
    <img src="/files/pics/blog/2025/obp1.png" alt="2002 A's OBP stats">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2025/obp2.png" alt="2002 A's payroll stats">
  </div>
</div>
*In 2002, the A's achieved 4th highest OBP (.349) with 3rd lowest payroll ($40M) <a href="#ref3">[3]</a><a href="#ref4">[4]</a>.*

### [Scott Hatteberg was undervalued.](#table-of-contents) {#scott-hatteberg-was-undervalued}

Scott Hatteberg was available at a below-market price due to perceived limitations. The former Boston Red Sox catcher developed nerve damage in his throwing elbow, making catching nearly impossible and leaving him without a clear defensive position.

Oakland signed Hatteberg to first base for $950K on a one-year contract after Colorado declined salary arbitration. The A's saw past the injury to identify his core value: exceptional plate discipline and on-base skills. His .367 OBP in 2000 and .410 OBP in 1999 demonstrated an ability to get on base that strongly correlated with offensive production.

The position switch to first base was unprecedented; he had never played the position professionally. He learned first base during spring training with infield coach Ron Washington.

Hatteberg's 2002 performance validated the analytical approach: .280/.374/.433 slash line, 68 walks versus 56 strikeouts, and 4.15 pitches per plate appearance (3rd in AL). His defining moment came on September 4, 2002, when his walk-off home run against Kansas City secured the A's 20th consecutive victory and set an AL record.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          src="https://www.youtube.com/embed/qWMwo_qEQW8" 
          frameborder="0" 
          allowfullscreen>
  </iframe>
</div>
<p class="image-caption">Hatteberg's historic walk-off home run that gave the A's a 12–11 win and a then-AL record 20-game winning streak.</p>

### [The streak was historic and remarkable.](#table-of-contents) {#the-streak-was-historic-and-remarkable}

The 20-game winning streak (August 13 - September 4, 2002) became the dramatic centerpiece of the Moneyball story.

During the historic run, **Billy Koch** (acquired December 7, 2001) recorded wins or saves in 12 of the 20 games, while **Cory Lidle** (acquired January 8, 2001), who was arguably the streak's MVP, posted a microscopic 0.20 ERA in August with 32 consecutive scoreless innings.

The streak's climactic finish, Oakland blowing an 11–0 lead to Kansas City before Hatteberg's walk-off home run, provided Hollywood-worthy drama that helped make the analytical approach culturally compelling.

More importantly, the streak occurred during a season where the A's won 103 games despite having one of baseball's lowest payrolls.

<div class="image-row">
  <div class="image-container">
    <img src="/files/pics/blog/2025/wins1.png" alt="2002 A's wins stats">
  </div>
  <div class="image-container">
    <img src="/files/pics/blog/2025/wins2.png" alt="2002 MLB payroll stats">
  </div>
</div>
*The A's achieved 103 wins (tied for MLB lead) with the 3rd lowest payroll ($40M) <a href="#ref4">[4]</a><a href="#ref5">[5]</a>.*

### [You can build a player in aggregate.](#table-of-contents) {#you-can-build-a-player-in-aggregate}

The A's discovered they could construct effective offensive production by combining players with complementary skills rather than seeking complete players. This insight challenged the traditional scouting preference for "five-tool players" who could hit for average, hit for power, run, field, and throw.

Instead of expensive superstars, the A's assembled a roster where different players contributed specific, undervalued skills:

- **Scott Hatteberg**: Exceptional plate discipline and OBP despite injuries
- **David Justice**: Power and veteran clutch experience despite declining speed
- **Jeremy Giambi**: High OBP despite defensive limitations
- **Chad Bradford**: Unique submarine delivery that produced results

This aggregate approach allowed Oakland to compete with teams spending three times their payroll. Rather than paying premium prices for complete players, they constructed a competitive roster through strategic combinations to produce runs and wins.

![Building a player in aggregate](/files/pics/blog/2025/buildinagg.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From [here](https://bsky.app/profile/foolishbb.bsky.social/post/3lawoaoavhc2y){:target="_blank"}.*

### [The playoffs are a crapshoot.](#table-of-contents) {#the-playoffs-are-a-crapshoot}

Billy Beane famously told Michael Lewis, "My shit doesn't work in the playoffs," acknowledging that his analytical approach, while dominant over 162 games, couldn't overcome October's inherent randomness. It's a "crapshoot" because the best regular season team frequently loses due to small sample sizes and variance inherent in short series <a href="#ref6">[6]</a>.

The statistical evidence supports this theory. Since the Wild Card era began in 1995, the team with the best regular season record has won the World Series only 8 out of 29 times (a 28% success rate).

![World Series winners](/files/pics/blog/2025/wswinners.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*World Series winners with best regular season record since 1995 and their win-loss records.*

The Oakland A's themselves became the perfect case study for this phenomenon. From 2000 to 2003, they averaged 98 wins per season, yet lost in the Division Series (first round of the playoffs) each of the four years, with each series going the full five games.

Academic analysis by Stanford <a href="#ref6">[6]</a> found no correlation between regular season and postseason performance (p-value: 0.6201), while a comprehensive Braves Journal study concluded that playoffs are "90% crapshoot, 10% skill" <a href="#ref7">[7]</a>.

The small sample size problem is a fundamental issue in the playoffs. While batting statistics require 200+ plate appearances to stabilize, playoff series provide players with only 15–30 plate appearances, resulting in massive variance. Even Oakland's signature OBP- the cornerstone of their analytical advantage - declined 11% in playoffs (.305 vs .341 regular season), demonstrating how short series neutralize statistical edges.

This randomness explains why sabermetricians often view regular-season performance as a more reliable indicator of a team's true quality than its playoff results.

### [It's hard not to be romantic about baseball.](#table-of-contents) {#its-hard-not-to-be-romantic-about-baseball}

The A's story resonated because it featured underdogs using intelligence and creativity to compete against overwhelming financial disadvantages. The story showed ordinary players achieving extraordinary things when given proper opportunity. The analytics enhanced rather than detracted from the game with moments like Bradford's submarine delivery, Hatteberg's transformation from injured catcher to first baseman, or the electricity of the 20-game streak.

![Baseball romance](/files/pics/blog/2025/romantic.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From [here](https://x.com/MLB/status/1914109400413016515){:target="_blank"}.*

Now that we've gone through the book's central themes, let's discuss how they hold up. In particular, let's examine them through the lens of criticisms of Moneyball.

## [Critiquing Moneyball](#table-of-contents) {#critiquing-moneyball}

### [Moneyball overlooks existing talent on the 2002 roster.](#table-of-contents) {#moneyball-overlooks-existing-talent}

The most substantial criticism of Moneyball, both the book and especially the film, is that it ignored the exceptional talent on the 2002 Oakland roster. The narrative focused so heavily on the undervalued acquisitions that it obscured the presence of conventional superstars.

The A's were excellent at drafting talent. And their lineup in 2002 was made up of more than just underdogs.

**The Big Three**. Tim Hudson (6th round, 1997), Mark Mulder (2nd overall, 1998), and Barry Zito (9th overall, 1999) were all top-10 picks. By 2002, this trio anchored Oakland's rotation with elite performance.

**Miguel Tejada** (international signing, 1993) and **Eric Chavez** (10th overall, 1996) provided MVP-caliber offense and Gold Glove defense. Both were premium draft investments that matured into franchise cornerstones.

Miguel Tejada won the 2002 AL MVP award, hitting .308 with 34 home runs and 131 RBIs while providing leadership throughout the season. Barry Zito won the AL Cy Young Award with a 23–5 record and 2.75 ERA. These weren't marginal players elevated by analytics; they were elite performers by any standard.

Oakland executives Billy Beane, David Forst, and scout Ron Washington later acknowledged that "there's no way the A's make the playoffs every year from 2000 through 2003, and no way a best-selling book and Brad Pitt movie ever happen, if not for the efforts of the Big Three" <a href="#ref8">[8]</a>. The Big Three compiled a collective 261–131 record from 1999–2006, providing the foundation that allowed Beane's analytical approach to flourish.

### [Moneyball promotes low payrolls in baseball, thus ruining the game.](#table-of-contents) {#moneyball-promotes-low-payrolls}

The lesson of Moneyball is not "cheap is good." In fact, the most successful application of Moneyball principles came from the Boston Red Sox, who were anything but frugal.

After the 2002 season, Red Sox ownership (led by **John W. Henry**) tried to hire Billy Beane as a GM with a five-year, $12.5M contract that would have made him the highest paid GM in baseball history. The offer was a testament to how highly Henry and then-CEO **Larry Lucchino** regarded Beane's analytical approach.

Although Beane declined, the Red Sox promoted **Theo Epstein** to GM in November 2002. Under Epstein, they adopted a more data-driven approach, complemented by their substantial financial resources. In 2004, only two years after the attempt to hire Beane, the Red Sox broke their 86-year Curse of the Bambino by winning the World Series, and again in 2007.

When DePodesta left Oakland in 2004 to become the Dodgers' GM, he was replaced by **Farhan Zaidi**. Zaidi carried forward the analytical tradition through the Dodgers (2014–2018) before joining the San Francisco Giants, where his 2021 team achieved a franchise-record 107 wins, demonstrating how Moneyball principles scale effectively when combined with greater financial resources.

Fast forward to today, the Dodgers won the 2024 World Series while employing one of baseball's largest analytics departments (with over 47 personnel, compared to 3 in 1988) and maintaining one of MLB's highest payrolls. Their championship validated that analytics enables more effective spending rather than reduced spending.

The 2024 season saw a record nine teams exceed the luxury tax threshold, resulting in $311 million in penalties. The Mets, under **Steve Cohen**, topped the league with a $333 million payroll, while the A's payroll of $66.5 million represents ownership decisions rather than analytical ones.

It turns out that Moneyball is about money. Billy Beane's Oakland A's succeeded not because they rejected the importance of money, but because they maximized every dollar's impact when competing against teams with three times their budget. The book's enduring relevance lies in demonstrating how intelligence and efficiency can overcome - though not eliminate - financial disadvantage.

Rather than promoting frugality, Moneyball's lasting impact has been to make teams more analytical. Every MLB franchise now employs statisticians and data scientists. The result has been more informed decision making at all spending levels, not a reduction in overall spending. Moneyball's impact, short-term or long-term, has not been frugality.

The criticisms tend to confuse cause and effect. The analytical methods were in response to frugality, not the cause of it. The cost-cutting was already occurring due to economic pressures unrelated to analytics or the impact of Moneyball.

### [Moneyball promotes the use of analytics in baseball, thus ruining the sport.](#table-of-contents) {#moneyball-promotes-analytics}

The analytics revolution was already underway before Moneyball - the book brought it into mainstream consciousness rather than creating it. Allan Roth served as baseball's first team statistician with the Brooklyn Dodgers from 1947–1964, tracking advanced metrics like OBP and developing situational statistics. Earnshaw Cook's 1964 book "Percentage Baseball" was the first full-length sabermetrics work, while Bill James began publishing Baseball Abstracts in 1977, coining "sabermetrics" in 1980.

To understand baseball’s numerical history, you can go back even further. **Henry Chadwick**, an English cricket lover enchanted by the new American sport, created the first box score for a Brooklyn Excelsiors game in 1859, establishing the systematic tracking that made all future analytics possible.

![A vintage 1876 baseball box score showing detailed game statistics in handwritten format](/files/pics/blog/2025/1876boxscore.jpg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From <a href="https://upload.wikimedia.org/wikipedia/commons/c/cc/1876boxscore.jpg" target="_blank">1876</a>.*

Analytics has improved baseball in measurable ways:

**Player development**. Teams now use personalized training programs based on biomechanical analysis, injury prevention through wearable technology, and real-time feedback systems.

**Strategic decision making**. Real-time analytics enable managers to optimize defensive positioning, make data-driven pitching changes, and predict injury risks before they occur. Front offices can identify undervalued talent and make smarter roster construction decisions.

However, the use of analytics has not been without downsides:

**The "Three True Outcomes" problem**. Home runs, walks, and strikeouts now dominate baseball, with 35% of plate appearances ending without involving seven defensive players. This has reduced balls in play by 20% since 1980, creating longer games with less action.

**Entertainment decline**. As Theo Epstein admitted, "executives like me who have spent a lot of time using analytics…have unwittingly had a negative impact on the aesthetic value of the game." Even Bill James acknowledged the game's aesthetics "went to hell in a dump truck" due to excessive strikeouts and endless pitching changes.

Analytics improved baseball's efficiency but arguably damaged its entertainment value - a trade-off MLB addressed with 2023 rule changes, including pitch clocks and shift bans.

### [Moneyball suggests baseball is unfair, even though it's not that unfair, comparatively speaking.](#table-of-contents) {#moneyball-suggests-baseball-is-unfair}

Despite conventional wisdom linking salary caps to competitive balance, the data shows that MLB's luxury tax system has produced championship diversity equal to hard-cap league. Since 1995, counting 30 championship years, 16 different winners each in MLB, NFL, and NHL, with only the NBA lagging at 13 unique champions. This challenges the assumption that financial constraints alone determine competitive outcomes.


However, recent trends suggest MLB's historical parity may be eroding under financial pressure. From 2015–2024, eight of ten World Series champions ranked in the top 10 for payroll, with only the 2015 Royals and 2017 Astros winning from outside the top half of spending teams <a href="#ref9">[9]</a>. Meanwhile, in 2024, all six highest-spending teams made the playoffs, while the Dodgers' $327 million payroll advantage over Miami represents the largest spending gap in modern baseball history.

Despite this, playoff access remains remarkably broad: 28 of 30 MLB teams (93.3%) have made the playoffs since 2015, compared to 28 of 32 NFL teams (87.5%).

While the NBA currently enjoys unprecedented parity, seven different champions in seven years (2019–2025), this represents a dramatic shift from its historically dynasty-heavy nature where superstars concentrated championships among elite teams.

The NFL's "National Parity League" reputation may be an overstatement: just five AFC teams (Broncos, Ravens, Patriots, Steelers, Colts) represented the conference in 13 consecutive Super Bowls, while the Chiefs have reached more Super Bowls in six years than any MLB team has World Series appearances in the 21st century <a href="#ref10">[10]</a>.

This suggests that playoff format, season length, and sport-specific factors matter more than financial structures alone.

## [Conclusion](#table-of-contents) {#conclusion}

Whether the 2002 A's succeeded primarily through analytics or traditional talent is less important than the broader principle they demonstrated: analytics can reveal value that conventional wisdom misses. They also showed the power of intelligence, creativity, and sheer persistence in overcoming financial disadvantage.

Ultimately, it's hard to overlook the attention that Moneyball has brought to baseball, as it continues to capture the imagination of fans, bandwagoners, and Jonah Hill admirers.

![DJ Pardis tweet](/files/pics/blog/2025/djpardistwete.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From [here](https://x.com/djpardis/status/1188636997557993472){:target="_blank"}.*

![Billy Beane](/files/pics/blog/2025/billybeane.jpg){: style="max-width: 500px; display: block; margin: 0 auto;"}
*Proud to finally meet Brad Pitt back in October 2019. He gave one of the best talks I ever heard.*

![Dating Moneyball](/files/pics/blog/2025/datingmoneyball.png){: style="max-width: 500px; display: block; margin: 0 auto;"}
*From [here](https://x.com/MoneyballMemes/status/1859314869972902336){:target="_blank"}.*


## [References](#table-of-contents) {#references}

<a id="ref1" href="#ref1-back">[1]</a> Bucknell University Baseball Statistics Research (1996–2000). "Runs Scored Correlations." Available at: <a href="https://www.eg.bucknell.edu/~bvollmay/baseball/runs1.html" target="_blank">https://www.eg.bucknell.edu/~bvollmay/baseball/runs1.html</a>

<a id="ref2" href="#ref2-back">[2]</a> FanGraphs Community Research (2014–2017). "Relationship Between OBP and Runs Scored in College Baseball." Available at: <a href="https://community.fangraphs.com/relationship-between-obp-and-runs-scored-in-college-baseball/" target="_blank">https://community.fangraphs.com/relationship-between-obp-and-runs-scored-in-college-baseball/</a>

<a id="ref3" href="#ref3-back">[3]</a> Baseball Almanac - 2002 AL OBP Leaders <a href="https://www.baseball-almanac.com/yearly/top25.php?s=OBP&l=AL&y=2002" target="_blank">https://www.baseball-almanac.com/yearly/top25.php?s=OBP&l=AL&y=2002</a>

<a id="ref4" href="#ref4-back">[4]</a> The Baseball Cube - 2002 MLB Team Payrolls <a href="https://www.thebaseballcube.com/content/payroll_year/2002/" target="_blank">https://www.thebaseballcube.com/content/payroll_year/2002/</a>

<a id="ref5" href="#ref5-back">[5]</a> Baseball-Reference - 2002 MLB Standings <a href="https://www.baseball-reference.com/leagues/majors/2002-standings.shtml" target="_blank">https://www.baseball-reference.com/leagues/majors/2002-standings.shtml</a>

<a id="ref6" href="#ref6-back">[6]</a> Stanford Sports Analytics Club - "Examining MLB Postseason Cluster Luck: or, Why the Playoffs Might Be a Crapshoot" <a href="https://stanfordsportsanalytics.wordpress.com/2015/03/24/examining-mlb-postseason-cluster-luck-or-why-the-playoffs-might-be-a-crapshoot/" target="_blank">https://stanfordsportsanalytics.wordpress.com/2015/03/24/examining-mlb-postseason-cluster-luck-or-why-the-playoffs-might-be-a-crapshoot/</a>

<a id="ref7" href="#ref7-back">[7]</a> Braves Journal - "The Playoffs are a Crapshoot" <a href="https://bravesjournal.com/2019/12/30/the-playoffs-are-a-crapshoot-a-5-part-series-introduction/" target="_blank">https://bravesjournal.com/2019/12/30/the-playoffs-are-a-crapshoot-a-5-part-series-introduction/</a>

<a id="ref8" href="#ref8-back">[8]</a> Grantland - "Baseball's Big Three: A Look Back at Tim Hudson, Mark Mulder, and Barry Zito in Oakland" <a href="https://grantland.com/the-triangle/mlb-oakland-as-big-three-tim-hudson-barry-zito-mark-mulder-billy-beane-moneyball/" target="_blank">https://grantland.com/the-triangle/mlb-oakland-as-big-three-tim-hudson-barry-zito-mark-mulder-billy-beane-moneyball/</a>

<a id="ref9" href="#ref9-back">[9]</a> Cronkite News - "How big MLB payrolls affect postseason success" <a href="https://cronkitenews.azpbs.org/2024/11/12/big-mlb-payrolls-affect-postseason-success/" target="_blank">https://cronkitenews.azpbs.org/2024/11/12/big-mlb-payrolls-affect-postseason-success/</a>

<a id="ref10" href="#ref10-back">[10]</a> The Athletic - "NFL is the parity league? MLB would like a word" <a href="https://www.nytimes.com/athletic/6116536/2025/02/06/mlb-nfl-parity-super-bowl-world-series/" target="_blank">https://www.nytimes.com/athletic/6116536/2025/02/06/mlb-nfl-parity-super-bowl-world-series/</a> 