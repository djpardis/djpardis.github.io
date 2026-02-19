---
layout: post
title: "The evolution of software engineering from FORTRAN to LLMs"
subtitle: "With an in-depth look at major AI coding milestones"
description: "Tracing the evolution of software engineering from FORTRAN to modern LLM-assisted development, including an in-depth look at AI coding milestones"
keywords: software engineering, programming evolution, FORTRAN, LLMs, AI coding, code generation, programming milestones
date: 2026-02-10
image: /files/pics/blog/2026/camera%20obscura.jpg
---

<div class="toc-container post-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#introduction">Introduction</a></li>
<li class="toc-era">
  <details class="collapsible-section">
    <summary><a href="#foundations">Foundations</a></summary>
    <ul>
      <li><a href="#fortran-1957">1957. FORTRAN eliminates the need for scientists to understand computer hardware</a></li>
      <li><a href="#structured-1968">1968. Structured programming makes programs comprehensible by constraining control flow</a></li>
      <li><a href="#relational-1970">1970. Relational databases enable declarative data access independent of storage implementation</a></li>
      <li><a href="#unix-1971">1971. Unix establishes the operating system as a portable hardware abstraction layer</a></li>
      <li><a href="#c-1973">1973. C made systems software like Unix portable across different computer architectures</a></li>
      <li><a href="#oop-1970s">1970s–1980s. Object-oriented programming enforces encapsulation to manage large system complexity</a></li>
    </ul>
  </details>
</li>
<li class="toc-era">
  <details class="collapsible-section">
    <summary><a href="#internet-and-web">Internet and Web</a></summary>
    <ul>
      <li><a href="#tcpip-1983">1983. TCP/IP makes the Internet a universal network layer</a></li>
      <li><a href="#web-1989">1989–1993. The World Wide Web enables universal software distribution through browsers</a></li>
      <li><a href="#python-1991">1991. Python becomes the default for scripting, automation, and data science</a></li>
      <li><a href="#stdlib-1994">1994–1998. Standard algorithm libraries make common algorithms and data structures reusable</a></li>
      <li><a href="#gc-1995">1995. Garbage collection makes entire categories of memory errors impossible</a></li>
      <li><a href="#package-managers-1995">1995–2010. Package managers make dependency management automatic</a></li>
      <li><a href="#opensource-1998">1998. Open source makes collaborative, publicly developed software the default</a></li>
      <li><a href="#rest-2000">2000. REST APIs standardize how web services communicate</a></li>
      <li><a href="#ides-2001">2001. IDEs automate the mechanical scaffolding of programming, an early step toward code generation</a></li>
      <li><a href="#di-2002">2002. Dependency injection frees enterprise programmers from framework boilerplate</a></li>
    </ul>
  </details>
</li>
<li class="toc-era">
  <details class="collapsible-section">
    <summary><a href="#cloud-and-infrastructure">Cloud and infrastructure</a></summary>
    <ul>
      <li><a href="#mapreduce-2004">2004–2009. MapReduce and Hadoop make processing massive datasets accessible</a></li>
      <li><a href="#git-2005">2005. Git enables distributed collaboration at global scale</a></li>
      <li><a href="#cloud-2006">2006. Cloud platforms transform infrastructure into elastic, pay-per-use resources</a></li>
      <li><a href="#mobile-2007">2007. Mobile platforms turn the phone into a general-purpose computer with app ecosystems</a></li>
      <li><a href="#microservices-2008">2008–2012. Microservices replace monoliths as the architecture for large-scale applications</a></li>
      <li><a href="#nosql-2009">2009. NoSQL databases trade consistency for scale and flexibility</a></li>
      <li><a href="#nodejs-2009">2009. Node.js makes JavaScript full-stack and enables the npm ecosystem</a></li>
      <li><a href="#language-tooling-2010">2010–2015. Modern language features and ecosystem tooling bring structure and safer concurrency to mainstream development</a></li>
      <li><a href="#containers-2013">2013–2014. Containers and orchestration make deployment portable and scalable</a></li>
      <li><a href="#serverless-2014">2014. Serverless computing shifts the unit of deployment from servers to functions</a></li>
      <li><a href="#ml-frameworks-2015">2015–2016. ML frameworks democratize machine learning without research-level expertise</a></li>
    </ul>
  </details>
</li>
<li class="toc-era">
  <details class="collapsible-section">
    <summary><a href="#ai-coding">AI coding</a></summary>
    <ul>
      <li><a href="#ai-transformers-2017">2017. Transformers replace recurrence with self-attention</a></li>
      <li><a href="#ai-llm-2020">2020. Large language models demonstrate in-context learning</a></li>
      <li><a href="#ai-copilot-2021">2021. Copilot and Codex bring AI code generation to mainstream development</a></li>
      <li><a href="#ai-benchmarks-2021">2021–2024. Code evals establish how the field measures progress and reveal the gap between algorithmic and real-world tasks</a></li>
      <li><a href="#ai-rlhf-2022">2022. RLHF aligns code models to programmer intent</a></li>
      <li><a href="#ai-rag-2022">2023. RAG grounds code generation in the codebase</a></li>
      <li><a href="#ai-agentic-2023">2023–2024. Long-context and agentic interfaces expand scope</a></li>
      <li><a href="#ai-reasoning-2024">2024. Extended reasoning and enterprise fine-tuning complete the AI coding assistant stack</a></li>
      <li><a href="#ai-discussion">Discussion. The impact of AI coding in software engineering has yet to unfold</a></li>
    </ul>
  </details>
</li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>
</div>

<div class="post-hero-image">
<img src="/files/pics/blog/2026/camera%20obscura.jpg" alt="Camera obscura">
</div>
*Built by Floyd Jennings in 1946, a rotating mirror projects the outside world through lenses onto a horizontal viewing table. A decade later the building was modified to look as if it were a camera left behind by visitors. More [here](https://noehill.com/sf/landmarks/nat2001000522.asp).*

## [Introduction](#table-of-contents) {#introduction}

Back in college I found myself taking a couple of AI courses. At the time, we believed that achieving what AI promised meant we would not merely write ordinary software but rather software that could generate software. Of course, code generation was already underway in many forms. Compilers turned high-level code into machine code. Parser generators like yacc turned a grammar into a parser. But that was all purpose-built and deterministic. AI code generation is different. 

The discourse about AI today is almost ritualistic. "<a href="https://www.techradar.com/pro/nvidia-ceo-ai-could-be-the-largest-technological-leap-weve-ever-seen" target="_blank" rel="noopener">It's the largest technological leap we've seen.</a>" "<a href="https://www.businessinsider.com/ben-horowitz-says-ai-is-bigger-than-internet-not-bubble-2026-1" target="_blank" rel="noopener">It's bigger than the internet.</a>" "<a href="https://www.pcmag.com/news/apple-ceo-ai-is-as-big-or-bigger-than-the-internet-smartphones" target="_blank" rel="noopener">It's as big as smartphones.</a>" "<a href="https://youtu.be/Gnl833wXRz0?t=3435" target="_blank" rel="noopener">SaaS is so over.</a>" This article examines seven decades of software engineering evolution, from FORTRAN to LLMs. We draw on this history to analyze where today’s AI tools fit. What changed when new paradigms arrived? What stayed the same? And what can the economic patterns of previous breakthroughs reveal about this one? To kick off our analysis, let's go all the way back and start our journey in 1957.

<h2 id="foundations" class="era-heading"><a href="#table-of-contents">Foundations</a></h2>

This era established the core abstractions that programming would build on for decades. The following milestones are presented in roughly chronological order.

## [1957. FORTRAN eliminates the need for scientists to understand computer hardware](#table-of-contents) {#fortran-1957}

<!-- ### Problem. Scientists need specialized programmers to translate equations into machine code -->

**Problem.** In the mid-1950s, scientific computing required programming in assembly language. The IBM 704 had 36-bit words and three 15-bit index registers. A programmer writing code to solve differential equations needed to understand both the mathematical method and the hardware details. These included which registers to use, instruction timing, and minimizing the instruction count in inner loops.

This dual expertise created a bottleneck. Universities employed small numbers of programmers who understood both scientific problems and machine architecture. A physicist at Los Alamos might wait weeks for a programmer to translate equations into code <a href="#ref-Met59" id="ref-Met59-back">[Met59]</a>. The programmer might not understand the scientific context, causing errors.

In addition, programs were non-portable. Code for the IBM 704 would not run on UNIVAC. Each new machine required complete reimplementation. 

<!-- ### Solution. FORTRAN automates translation from mathematical notation to machine code -->

**Solution.** In 1956, John Backus was able to convince IBM executives to fund FORTRAN. He  estimated that in 1954, more than half of operating costs were programming costs, despite computers being enormously expensive. He argued that automating translation would reduce programming costs. The first FORTRAN compiler shipped in 1957 <a href="#ref-Bac57" id="ref-Bac57-back">[Bac57]</a>. 

FORTRAN (Formula Translation) let scientists write mathematical expressions in notation close to standard syntax. The statement `Y = A * X + B` directly expressed the computation without registers or memory addresses. The compiler performed register allocation, instruction selection, and optimization.

Many believed compilers could never match skilled assembly programmers. But Backus demonstrated the compiler often generated faster code than hand-written assembly by performing tedious optimizations systematically. 

Within five years, most scientific computing moved from assembly to FORTRAN. Scientists became programmers. Computational fluid dynamics, molecular modeling, weather forecasting, and financial modeling all benefited. FORTRAN did not merely accelerate existing work. It made feasible work that had been almost impossible to undertake.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Bac57" href="#ref-Bac57-back">[Bac57]</a> Backus, J. 1957. "The FORTRAN Automatic Coding System." <em>Western Joint Computer Conference</em>. ACM. Available at <a href="https://dl.acm.org/doi/10.1145/1455567.1455599" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Met59" href="#ref-Met59-back">[Met59]</a> Metropolis, N. et al. 1959. "Early Computing at Los Alamos." <em>Annals of the History of Computing</em> 1(1):23-34. Available at <a href="https://ieeexplore.ieee.org/document/4640758" target="_blank">ieeexplore.ieee.org</a></div>
</div>

## [1968. Structured programming makes programs comprehensible by constraining control flow](#table-of-contents) {#structured-1968}

<!-- ### Problem. Unrestricted GOTO statements make programs impossible to understand -->

**Problem.** By 1968, program size had outpaced human comprehension. FORTRAN, COBOL, and assembly relied heavily on GOTO statements that could transfer control to any labeled statement. A program might contain hundreds of GOTOs jumping to labels scattered throughout thousands of lines.

GOTO statements made local reasoning impossible. Understanding what a program did at any point required tracing all possible execution paths from anywhere. A label on line 500 might be reached by GOTOs from lines 100, 250, 780, and 1200. The number of paths grew combinatorially with program size.

Dijkstra called this "spaghetti code" where control flow wove like tangled strands <a href="#ref-Dij68" id="ref-Dij68-back">[Dij68]</a>. By the late 1960s, commercial systems exceeded 50,000 lines and operating systems approached 100,000 lines. NATO convened a conference in 1968 to address "the software crisis" <a href="#ref-NR69" id="ref-NR69-back">[NR69]</a>. Programs had become too complex to understand.

<!-- ### Solution. Three control flow constructs prove sufficient and enable local reasoning -->

**Solution.** Dijkstra's "Go To Statement Considered Harmful" argued that GOTOs should be eliminated entirely <a href="#ref-Dij68" id="ref-Dij68-back">[Dij68]</a>. He proposed restricting control flow to three constructs. These were sequential execution, conditional execution (if-then-else), and iteration (while loops).

Böhm and Jacopini proved these three constructs were sufficient to express any algorithm expressible with GOTOs <a href="#ref-Böh66" id="ref-Böh66-back">[Böh66]</a>. The restriction did not reduce expressive power. Floyd and Hoare had shown that structured constructs admitted formal reasoning (preconditions, postconditions), whereas arbitrary GOTOs did not <a href="#ref-Flo67" id="ref-Flo67-back">[Flo67]</a> <a href="#ref-Hoa69" id="ref-Hoa69-back">[Hoa69]</a>. Niklaus Wirth designed Pascal <a href="#ref-Wir71" id="ref-Wir71-back">[Wir71]</a> to enforce structured programming through syntax. The language had no GOTO statement. Programs could be understood by reading top to bottom, following nested control flow. 

The practical effect was that software could grow. Before structured programming, systems above a certain size simply could not be understood or maintained. After it, teams could build operating systems, banking platforms, and airline reservation systems. The improvement in maintainability was consequential. Programs hundreds of thousands of lines long became possible.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Böh66" href="#ref-Böh66-back">[Böh66]</a> Böhm, C. & Jacopini, G. 1966. "Flow Diagrams, Turing Machines and Languages with Only Two Formation Rules." <em>Communications of the ACM</em> 9(5):366-371. Available at <a href="https://dl.acm.org/doi/10.1145/355592.365646" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Dij68" href="#ref-Dij68-back">[Dij68]</a> Dijkstra, E. W. 1968. "Go To Statement Considered Harmful." <em>Communications of the ACM</em> 11(3):147-148. Available at <a href="https://dl.acm.org/doi/10.1145/362929.362947" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Flo67" href="#ref-Flo67-back">[Flo67]</a> Floyd, R. W. 1967. "Assigning Meanings to Programs." <em>Proceedings of Symposium in Applied Mathematics</em> 19:19-32. Available at <a href="https://people.eecs.berkeley.edu/~necula/Papers/FloydMeaning.pdf" target="_blank">berkeley.edu</a></div>
<div class="ref-item"><a id="ref-Hoa69" href="#ref-Hoa69-back">[Hoa69]</a> Hoare, C. A. R. 1969. "An Axiomatic Basis for Computer Programming." <em>Communications of the ACM</em> 12(10):576-580. Available at <a href="https://dl.acm.org/doi/10.1145/363235.363259" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-NR69" href="#ref-NR69-back">[NR69]</a> Naur, P. & Randell, B. 1969. <em>Software Engineering: Report on NATO Conference</em>. NATO Science Committee. Available at <a href="https://eprints.ncl.ac.uk/158767" target="_blank">Newcastle ePrints</a></div>
<div class="ref-item"><a id="ref-Wir71" href="#ref-Wir71-back">[Wir71]</a> Wirth, N. 1971. "The Programming Language Pascal." <em>Acta Informatica</em> 1(1):35-63. Available at <a href="https://link.springer.com/article/10.1007/BF00264291" target="_blank">link.springer.com</a></div>
</div>

## [1970. Relational databases separate logical data organization from physical storage implementation](#table-of-contents) {#relational-1970}

<!-- ### Problem. Application code is tightly coupled to data storage formats -->

**Problem.** Through the 1960s, programs stored data in flat files with application-specific formats. Each program defined its own file structure and wrote custom parsing code. This worked for isolated applications but created problems as organizations accumulated data and needed to share it.

The fundamental issue was tight coupling. Every program accessing a customer file needed to understand the exact byte layout, and adding a new field required modifying every program that touched that data, even those not using the new field.

IBM's Information Management System (IMS), introduced in 1966, provided hierarchical organization. But accessing data required manual navigation. To find all orders for a customer, a program traversed pointers to child records. There was no declarative way to express access patterns. Different applications wrote redundant filtering logic. When business rules changed, organizations faced updating inconsistent code across dozens of programs.

<!-- ### Solution. Relational model separates logical data organization from physical storage -->

**Solution.** Codd's 1970 paper "A Relational Model of Data for Large Shared Data Banks" <a href="#ref-Cod70" id="ref-Cod70-back">[Cod70]</a> proposed organizing data as mathematical relations, that is, tables with rows and columns. Each table represented an entity type, each row an instance, each column an attribute.

Codd grounded the model in set theory and predicate logic. Relational algebra and calculus were equivalent, so systems could accept declarative queries and automatically generate efficient procedural execution plans.

SQL <a href="#ref-Cha74" id="ref-Cha74-back">[Cha74]</a> provided the practical implementation of these ideas. This single statement replaced hundreds of lines of code. The database optimizer analyzed the query and generated an execution plan.

```sql
SELECT customer_name, SUM(order_amount)
FROM customers JOIN orders ON customers.customer_id = orders.customer_id
WHERE customers.state = 'CA' AND orders.order_date >= '2026-01-01'
GROUP BY customer_name HAVING SUM(order_amount) > 1000
```

Later, relational databases made ACID transactions <a href="#ref-HR83" id="ref-HR83-back">[HR83]</a> (atomicity, consistency, isolation, durability) standard. Applications could focus on business logic rather than implementing concurrency control and crash recovery.

The crucial innovation was separating logical organization from physical storage. Users worked with tables conceptually; the database system decided how to store them, what indexes to maintain, and how to organize bytes. Changing storage layout did not require modifying applications. That data independence made possible a single, shared source of truth. Multiple applications and users could read and update the same data with consistent results. These are the systems we take for granted today, from banking and reservations to inventory and ERP, where many programs depend on the same records.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Cha74" href="#ref-Cha74-back">[Cha74]</a> Chamberlin, D. D. & Boyce, R. F. 1974. "SEQUEL: A Structured English Query Language." <em>Proceedings of ACM SIGFIDET Workshop on Data Description, Access and Control</em>, 249-264. Available at <a href="https://dl.acm.org/doi/10.1145/800296.811515" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Cod70" href="#ref-Cod70-back">[Cod70]</a> Codd, E. F. 1970. "A Relational Model of Data for Large Shared Data Banks." <em>Communications of the ACM</em> 13(6):377-387. Available at <a href="https://dl.acm.org/doi/10.1145/362384.362685" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-HR83" href="#ref-HR83-back">[HR83]</a> Härder, T. & Reuter, A. 1983. "Principles of Transaction-Oriented Database Recovery." <em>ACM Computing Surveys</em> 15(4):287-315. Available at <a href="https://dl.acm.org/doi/10.1145/289.291" target="_blank">dl.acm.org</a></div>
</div>

## [1971. Unix establishes the operating system as a portable hardware abstraction layer](#table-of-contents) {#unix-1971}

<!-- ### Problem. Every machine requires programmers to understand its specific hardware and system calls -->

**Problem.** Before Unix, operating systems were tightly coupled to their hardware. Software written for an IBM mainframe could not run on a DEC minicomputer. The problem was not just different instruction sets. The ways programs interacted with the system (file I/O, process creation, inter-process communication), together with device drivers, memory management, and scheduling, were all machine-specific. Moving software to new hardware meant rewriting it for a new operating environment, not just recompiling.

<!-- ### Solution. A minimal, composable operating system provides a uniform interface -->

**Solution.** Thompson and Ritchie built Unix at Bell Labs between 1969 and 1971 <a href="#ref-RT74" id="ref-RT74-back">[RT74]</a>. Unix exposed a single interface instead of vendor-specific system calls. Programs ran as processes. The same read and write operations applied to files on disk, terminals, and devices. "Everything is a file" meant that one abstraction covered all I/O. The kernel implemented the interface in privileged mode and mediated access to hardware. Programs invoked it through system calls, so the kernel hid the details of any particular device.

That interface had two consequences. Software written to it could run on any machine running Unix, so organizations could change hardware without abandoning software. The abstraction also allowed an interpreted shell. Thompson added one that read command sequences from the terminal or from scripts and executed them. The shell turns command strings into system calls the same as any other process. Programmers could orchestrate tools with a short script instead of compiled software. For example, the following runs two compressions at once. A trailing `&` runs a command in the background so the next one starts right away; `wait` pauses until all background commands finish.

```sh
gzip file1.log & gzip file2.log & wait
```

Software portability and orchestration efficiency gave organizations incentive to adopt Unix and to port the kernel to new architectures. Linux, BSD, and macOS implemented the same interface and became the principal Unix-like systems. The shell established scripted tool chains as the standard approach to orchestration. Unix-like systems dominate servers, mobile devices, and cloud infrastructure. 

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-RT74" href="#ref-RT74-back">[RT74]</a> Ritchie, D. M. & Thompson, K. 1974. "The UNIX Time-Sharing System." <em>Communications of the ACM</em> 17(7):365-375. Available at <a href="https://dl.acm.org/doi/10.1145/361011.361061" target="_blank">dl.acm.org</a></div>
</div>

## [1973. C made systems software like Unix portable across different computer architectures](#table-of-contents) {#c-1973}

<!-- ### Problem. Systems code is still written in assembly, and no one believes that can change -->

**Problem.** Unix had made application software portable across machines that ran Unix. However, systems software such as kernels, device drivers, and system utilities was not portable. It was written in assembly for performance via control over memory layout, interrupts, and registers. No high-level language had shown it could match assembly for that workload. Different machines (IBM, DEC, CDC, and others) came with different instruction sets and architectures. Assembly code for one did not run on another. Porting a Unix kernel or systems stack meant a full rewrite in that machine's assembly. Thus portability and performance seemed to be in conflict.

<!-- ### Solution. C balances hardware control with abstraction to achieve portable performance -->

**Solution.** Dennis Ritchie developed C between 1969 and 1973 at Bell Labs to achieve portability without sacrificing performance <a href="#ref-Rit93" id="ref-Rit93-back">[Rit93]</a>. C provided pointers and low-level operations while abstracting machine-specific details. Data types such as `int` and `char` had no fixed size, so compilers could map them to each architecture. Programmers confined machine-dependent code to a small amount of assembly or conditional code. The rest was portable C. The same source could be compiled for different CPUs with minimal changes.

A program written to the Unix interface could run on any machine that ran Unix. But porting Unix to a new machine meant rewriting the kernel and utilities in that machine's assembly. C provided a portable language for systems programming. In 1973 Thompson and Ritchie rewrote Unix in C <a href="#ref-RT74" id="ref-RT74-back-2">[RT74]</a>. Porting the Unix kernel to a new architecture was as easy as recompiling the C source and adapting a small amount of assembly, not rewriting the entire system. 

Unix had made programs portable across machines that ran Unix. C made Unix portable across architectures, and made systems software written in C portable by recompilation. C performance stayed close to assembly. It became and remains the standard language for operating systems, databases, and network stacks.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Rit93" href="#ref-Rit93-back">[Rit93]</a> Ritchie, D. M. 1993. "The Development of the C Language." <em>ACM SIGPLAN Conference on History of Programming Languages</em>, 201-208. Available at <a href="https://dl.acm.org/doi/10.1145/155360.155580" target="_blank">dl.acm.org</a></div>
</div>

## [1970s–1980s. Object-oriented programming enforces encapsulation to manage complexity](#table-of-contents) {#oop-1970s}

<!-- ### Problem. Procedural languages cannot enforce architectural boundaries in large systems -->

**Problem.** By the late 1970s, software systems had grown to hundreds of thousands of lines. Procedural programs organized code as functions operating on global or parameter-passed data. That structure worked for small programs but failed at scale. The central issue was that data structures lived as global variables or parameters, and any function could read or modify their internals. Verifying that an invariant held, such as that account balances never went negative, required checking every function that touched the relevant data. Changing the representation of a type, such as dates, forced updates across every function that used it. With all functions in a single namespace, naming conflicts and unintended coupling were common. Architectural boundaries existed only by convention. Programmers under pressure could bypass them, and large systems tended to degrade.

<!-- ### Solution. Classes enforce encapsulation through the type system -->

**Solution.** Object-oriented languages such as C++ <a href="#ref-Str85" id="ref-Str85-back">[Str85]</a>, Smalltalk, and Java addressed the encapsulation problem by making boundaries enforceable in the type system. Classes bundled data with the operations that could act on that data. Callers could use only the exposed methods. Invariants could be enforced in one place instead of by auditing every function. Inheritance and polymorphism supported reuse and abstraction without breaking encapsulation. Design patterns <a href="#ref-GHJV94" id="ref-GHJV94-back">[GHJV94]</a> codified recurring designs. Before OOP, keeping a large system coherent depended on every programmer respecting boundaries by discipline. After, the language enforced those boundaries. Teams could own classes, change internals without breaking callers, and build systems that could grow to millions of lines without the same collapse into unmaintainability. OOP became and remains the dominant basis for enterprise and systems software.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-GHJV94" href="#ref-GHJV94-back">[GHJV94]</a> Gamma, E., Helm, R., Johnson, R., & Vlissides, J. 1994. <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>. Addison-Wesley.</div>
<div class="ref-item"><a id="ref-Str85" href="#ref-Str85-back">[Str85]</a> Stroustrup, B. 1985. <em>The C++ Programming Language</em>. Addison-Wesley.</div>
</div>

<h2 id="internet-and-web" class="era-heading"><a href="#table-of-contents">Internet and Web</a></h2>

This era saw the Internet become a universal substrate and the Web the primary way software reached users. The following milestones are presented in roughly chronological order.

## [1983. TCP/IP makes the Internet a universal network layer](#table-of-contents) {#tcpip-1983}

<!-- ### Problem. Networks are incompatible, with different protocols and different assumptions -->

**Problem.** Through the 1970s, computer networks had proliferated in isolation. ARPANET used its Network Control Protocol (NCP). The Xerox PARC Ethernet had different conventions. Packet radio networks, satellite networks, and local area networks each had distinct protocols for addressing, routing, and reliability. Interconnecting them required understanding each network's quirks. A program written for one could not simply talk to another. Programmers building distributed systems had to implement compatibility layers or choose a single network and accept its limitations.

<!-- ### Solution. A single standard makes the Internet the universal substrate -->

**Solution** Vint Cerf and Bob Kahn had laid the theoretical foundation in 1974 with "A Protocol for Packet Network Intercommunication" <a href="#ref-CK74" id="ref-CK74-back">[CK74]</a>, which described how to interconnect dissimilar networks through gateways. The protocol split into two layers. IP (Internet Protocol) handled addressing and routing packets across networks, and TCP (Transmission Control Protocol) handled reliable, ordered delivery on top. The design was deliberately minimal. Networks kept their internal structure, and the Internet layer handled only what was necessary to pass packets between them.

On January 1, 1983, ARPANET completed the transition from NCP to TCP/IP <a href="#ref-Pos81" id="ref-Pos81-back">[Pos81]</a>. Every host on the network switched to the new protocol. The "flag day" created a single, interoperable network.

The abstraction was profound. Programmers no longer needed to understand packet switching, routing algorithms, or the differences between Ethernet and satellite links. They wrote to sockets, a simple API for sending and receiving byte streams, and the network handled the rest. TCP guaranteed delivery and ordering. IP handled addressing across any connected network. Applications could be built once and run anywhere the Internet reached.

File transfer (FTP/SFTP), email (SMTP), naming (DNS), the Web (HTTP), and every subsequent Internet application built on this foundation. TCP/IP eliminated the need to understand the network layer. 

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-CK74" href="#ref-CK74-back">[CK74]</a> Cerf, V. G. & Kahn, R. E. 1974. "A Protocol for Packet Network Intercommunication." <em>IEEE Transactions on Communications</em> 22(5):637-648. Available at <a href="https://ieeexplore.ieee.org/document/1092259" target="_blank">ieeexplore.ieee.org</a></div>
<div class="ref-item"><a id="ref-Pos81" href="#ref-Pos81-back">[Pos81]</a> Postel, J. 1981. "NCP/TCP Transition Plan." RFC 801. Available at <a href="https://www.rfc-editor.org/rfc/rfc801" target="_blank">rfc-editor.org</a></div>
</div>

## [1989–1993. The World Wide Web enables universal software distribution through browsers](#table-of-contents) {#web-1989}

<!-- ### Problem. Reaching users requires physical media and per-machine installation -->

**Problem.** In the 1980s, getting software to people was a logistics problem. Applications like WordPerfect and Lotus 1-2-3 were sold in boxes of floppy disks, each compiled for a specific operating system. A program for MS-DOS would not run on Mac OS or Unix. Updates required mailing new physical media to every user. Business applications accessed by multiple users followed a client-server model that required installing and maintaining software on every client machine independently. Distribution was slow, updates were painful, and every new operating system meant recompiling and repackaging from scratch.

<!-- ### Solution. The Web starts as a document-sharing tool, then becomes the platform for all software -->

**Solution.** Tim Berners-Lee proposed the Web at CERN in 1989 <a href="#ref-BL89" id="ref-BL89-back">[BL89]</a> as a way to share documents and files across the Internet. Its original motivation had nothing to do with software delivery. CERN's scientific documentation was scattered across hundreds of incompatible computers. Researchers spent significant time just locating information that existed somewhere on the network. Berners-Lee wanted to link documents through hypertext so people could navigate between them without knowing where they were physically stored. By 1990, he had built the first HTTP server, the first browser, and defined HTML and URLs. Hostnames in URLs were resolved by DNS, the same naming layer the rest of the Internet already used. CERN released the protocol royalty-free in 1993 <a href="#ref-CERN93" id="ref-CERN93-back">[CERN93]</a>.

The insight that made the Web transformative was universality. Any computer with a browser could access any server, regardless of operating system. Marc Andreessen and Eric Bina built Mosaic <a href="#ref-AB93" id="ref-AB93-back">[AB93]</a> at the National Center for Supercomputing Applications, the first graphical browser. As adoption grew, programmers saw the implication. Applications could be hosted on a server rather than shipping floppy disks. You put the new version on the server once. Every user could get it. No more mailing new disks to every customer. Initially that meant downloading software from the Web. Netscape Navigator was distributed that way, as were Winamp, RealPlayer, and countless early desktop applications. The pattern persists today. Zoom, VS Code, and most desktop and mobile installers are still distributed by download from a website or app store. 

Making software run inside the browser, not just be downloaded from it, took two more steps. JavaScript, created by Brendan Eich at Netscape, was the next necessary piece. Static HTML pages couldn't respond to user input without sending a request back to the server and reloading the entire page. JavaScript ran directly in the browser, so a form could validate input before submission, a button could trigger an action, a page could change without disappearing and reappearing. Web pages started feeling less like documents and more like applications. The shift completed with AJAX. Jesse James Garrett named the pattern <a href="#ref-Gar05" id="ref-Gar05-back">[Gar05]</a> that programmers had already begun using. Applications sent requests in the background and updated only the changed parts of the page instead of reloading. Gmail (2004) proved this worked at scale. An entire productivity application ran in the browser, feeling as responsive as desktop software. The Web had evolved from a tool for sharing scientific documents into the primary platform for delivering software to users.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-AB93" href="#ref-AB93-back">[AB93]</a> Andreessen, M. & Bina, E. 1993. "NCSA Mosaic: A Global Hypermedia System." <em>Internet Research</em> 3(1). Available at <a href="https://www.emerald.com/insight/content/doi/10.1108/10662249410798803/full/html" target="_blank">emerald.com</a></div>
<div class="ref-item"><a id="ref-BL89" href="#ref-BL89-back">[BL89]</a> Berners-Lee, T. 1989. "Information Management: A Proposal." CERN. Available at <a href="https://www.w3.org/History/1989/proposal.html" target="_blank">w3.org</a></div>
<div class="ref-item"><a id="ref-CERN93" href="#ref-CERN93-back">[CERN93]</a> CERN. 1993. "CERN Puts Web into Public Domain." Available at <a href="https://home.cern/science/computing/birth-web/licensing-web" target="_blank">cern.ch</a></div>
<div class="ref-item"><a id="ref-Gar05" href="#ref-Gar05-back">[Gar05]</a> Garrett, J. J. 2005. "Ajax: A New Approach to Web Applications." Available at <a href="https://web.archive.org/web/20060207160552/https://adaptivepath.com/ideas/ajax-a-new-approach-to-web-applications/" target="_blank">Wayback Machine</a> (original: adaptivepath.com). See also <a href="https://jessejamesgarrett.com/2025/02/18/ajax-at-20/" target="_blank">Garrett's 2025 reflection</a>.</div>
</div>

## [1991. Python becomes the default for scripting, automation, and data science](#table-of-contents) {#python-1991}

<!-- ### Problem. Programmer time is the bottleneck, not machine time -->

**Problem.** The dominant assumption at the time was that runtime performance mattered most. C and FORTRAN optimized for execution speed. The opposite insight was that programmer time is more expensive than machine time. Most code runs once or rarely (scripts, glue code, prototypes). The cost of writing, debugging, and maintaining it dwarfs execution time. A language that made the common case fast to write, even if slow to run, would win.

<!-- ### Solution. Optimize for readability and productivity. Use C when speed is needed -->

**Solution.** Guido van Rossum released Python in 1991 <a href="#ref-Pyt91" id="ref-Pyt91-back">[Pyt91]</a>. Python prioritized readability and ease of use over raw performance. It required no compile step, used clear syntax, and would become "batteries included" as its standard library grew. The crucial design choice was extensibility. When a hot path needed speed, programmers could drop into C. NumPy (2006) demonstrated the pattern. Python for glue code and control flow, C (via extensions) for the numerical inner loops. Programmers got productivity for the 95% of code that wasn't performance-critical, and C-level speed where it mattered. pandas, Django, TensorFlow, and PyTorch followed the same model. Python became the default for data science, ML, and glue code because it optimized for the right variable (programmer time).

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Pyt91" href="#ref-Pyt91-back">[Pyt91]</a> Python Software Foundation. "History of Python." Available at <a href="https://www.python.org/doc/essays/blurb/" target="_blank">python.org</a></div>
</div>

## [1994–1998. Standard algorithm libraries make common algorithms and data structures reusable](#table-of-contents) {#stdlib-1994}

<!-- ### Problem. Implementing algorithms and data structures from scratch is error-prone and duplicates effort -->

**Problem.** Programmers implementing a sorted collection had to build their own balanced tree or settle for a slower linked list. Those needing O(log n) lookup implemented a red-black tree. Those needing to sort implemented quicksort or merge sort. These implementations were subtle. Off-by-one errors, edge cases with empty collections, and incorrect handling of equal elements were common. Every team duplicated the same work, and bugs in algorithm implementations were hard to detect because the logic was buried in application code.

Algorithm theory (Big O notation, complexity analysis) had given programmers a vocabulary for reasoning about performance, but it did not eliminate the need to implement. The gap between theory and practice remained.

<!-- ### Solution. STL and Java Collections provide battle-tested implementations as standard components -->

**Solution.** Alexander Stepanov and Meng Lee developed the Standard Template Library (STL) for C++ at Hewlett-Packard in 1994 <a href="#ref-Step94" id="ref-Step94-back">[Step94]</a>. The design separated containers, iterators, algorithms, and functors. The key insight was generic programming. Algorithms were written once in terms of iterators and worked with any container. `std::sort` worked on a vector, a queue, or a custom container, as long as it provided random-access iterators. HP released the STL freely. It was incorporated into the C++ standard and shipped with every C++ compiler.

In 1998, Java followed with the Collections Framework in JDK 1.2 <a href="#ref-Bloch01" id="ref-Bloch01-back">[Bloch01]</a>. List, Set, Map, and their implementations (ArrayList, HashMap, TreeMap) became part of the standard library, with interfaces for sorting, searching, and bulk operations. Like the STL, it provided complexity guarantees. Donald Knuth had established the theoretical basis in <em>The Art of Computer Programming</em>, from 1968 onwards <a href="#ref-Knuth68" id="ref-Knuth68-back">[Knuth68]</a>. The STL and Java Collections made those guarantees practical. Programmers chose by need (sorted, O(1) lookup, ordered iteration) and the library supplied a correct implementation. The pattern spread to Python's `list`, `dict`, and `set`, C#'s `System.Collections`, and Rust's `std::collections`. Algorithms and data structures became part of the standard toolkit. Programmers used them without implementing them.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Step94" href="#ref-Step94-back">[Step94]</a> Stepanov, A. & Lee, M. 1994. "The Standard Template Library." Hewlett-Packard. Available at <a href="https://www.stepanovpapers.com/Stepanov-The_Standard_Template_Library-1994.pdf" target="_blank">stepanovpapers.com</a></div>
<div class="ref-item"><a id="ref-Bloch01" href="#ref-Bloch01-back">[Bloch01]</a> Oracle. 1998. "Java Collections Framework." JDK 1.2. Design by J. Bloch. See <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/designfaq.html" target="_blank">Java Collections Design FAQ</a>.</div>
<div class="ref-item"><a id="ref-Knuth68" href="#ref-Knuth68-back">[Knuth68]</a> Knuth, D. E. 1968. <em>The Art of Computer Programming, Volume 1. Fundamental Algorithms</em>. Addison-Wesley. Subsequent volumes from 1969 onwards.</div>
</div>

## [1995. Garbage collection makes entire categories of memory errors impossible](#table-of-contents) {#gc-1995}

<!-- ### Problem. Manual memory management causes memory leaks, corruption, and security vulnerabilities -->

**Problem.** Through the early 1990s, most commercial software was written in C and C++ requiring manual memory management. Programmers explicitly allocated memory with `malloc()` or `new` and deallocated with `free()` or `delete`. Getting the pairing wrong led to memory leaks, use-after-free, double-free, and corruption. Memory leaks consumed all available memory in long-running programs. Use-after-free errors occurred when code freed memory but later accessed it through a dangling pointer, often causing data corruption. Double-free errors corrupted the allocator's internal structures. These bugs were insidious because they might not manifest during testing but caused failures only after days of production operation.

The consequences were real. BlueKeep (2019), a use-after-free in Windows RDP, let attackers execute arbitrary code with kernel privileges over the network without authentication. The NSA issued a rare advisory. Microsoft patched even end-of-life systems. Microsoft estimated 70% of their 2006–2018 security vulnerabilities were memory-safety issues <a href="#ref-MSRC19" id="ref-MSRC19-back">[MSRC19]</a>.

<!-- ### Solution. Automatic memory reclamation eliminates entire categories of errors by construction -->

**Solution.** Java, released in 1995 <a href="#ref-Gos96" id="ref-Gos96-back">[Gos96]</a>, popularized garbage collection for mainstream commercial development. Java's innovation was demonstrating that automatic memory management was practical despite performance overhead.

Java eliminated manual deallocation. Programmers allocated objects with `new` but never freed them. The garbage collector, a background process that ran as part of the Java runtime during program execution, periodically scanned the heap to identify objects that were no longer reachable from any live variable or reference, and reclaimed their memory. Because this happened automatically at runtime, programmers could not introduce use-after-free or double-free bugs. The entire class of dangling pointer errors disappeared by construction.

The idea of automatic memory reclamation was not new. John McCarthy's Lisp in 1960 <a href="#ref-McC60" id="ref-McC60-back">[McC60]</a> included the first garbage collector. But early collectors were too slow for commercial systems. The breakthrough was generational collection, developed in the 1980s <a href="#ref-Lie83" id="ref-Lie83-back">[Lie83]</a>. Most objects die young, so collecting younger generations frequently and older ones rarely reduced overhead enough that GC became viable for production. That made Java's approach credible when it launched.

The performance overhead was non-zero but acceptable. Early collectors had pause times of seconds. Improvements reduced pauses to milliseconds for typical applications. An entire category of serious bugs disappeared. Garbage collection also simplified concurrent programming. Threads could share object references without complex deallocation coordination.

Following Java's success, garbage collection became standard in new languages. C#, Go, JavaScript, Python, and Ruby all adopted it. Rust (2015) took a different approach. Its ownership and borrowing model, a zero-cost abstraction, enforces memory safety at compile time with no runtime overhead or GC pauses <a href="#ref-Jun18" id="ref-Jun18-back">[Jun18]</a>.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Gos96" href="#ref-Gos96-back">[Gos96]</a> Gosling, J., Joy, B., & Steele, G. 1996. <em>The Java Language Specification</em>. Addison-Wesley. Available at <a href="https://docs.oracle.com/javase/specs/" target="_blank">docs.oracle.com</a></div>
<div class="ref-item"><a id="ref-Jun18" href="#ref-Jun18-back">[Jun18]</a> Jung, R., et al. 2018. "RustBelt: Securing the Foundations of the Rust Programming Language." <em>Proceedings of POPL</em>, 66:1-66:34. Available at <a href="https://dl.acm.org/doi/10.1145/3158154" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Lie83" href="#ref-Lie83-back">[Lie83]</a> Lieberman, H. & Hewitt, C. 1983. "A Real-Time Garbage Collector Based on the Lifetimes of Objects." <em>Communications of the ACM</em> 26(6):419-429. Available at <a href="https://dl.acm.org/doi/10.1145/358141.358147" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-McC60" href="#ref-McC60-back">[McC60]</a> McCarthy, J. 1960. "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I." <em>Communications of the ACM</em> 3(4):184-195. Available at <a href="https://dl.acm.org/doi/10.1145/367177.367199" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-MSRC19" href="#ref-MSRC19-back">[MSRC19]</a> Microsoft Security Response Center. 2019. "A Proactive Approach to More Secure Code." Available at <a href="https://msrc-blog.microsoft.com/2019/07/16/a-proactive-approach-to-more-secure-code/" target="_blank">msrc-blog.microsoft.com</a></div>
</div>

## [1995–2010. Package managers make dependency management automatic](#table-of-contents) {#package-managers-1995}

<!-- ### Problem. Reusing code requires manual copying, version tracking, and integration work -->

**Problem.** Before package managers, reusing code meant finding it, downloading it, manually placing it in your project, and ensuring it worked with other dependencies. Version conflicts were discovered only when builds failed. There was no central registry, no automated resolution. Dependency management was manual and error-prone.

<!-- ### Solution. Centralized registries with declarative dependencies automate fetching and resolution -->

**Solution.** CPAN, launched in 1995 for Perl, established the pattern. It provided a central archive, a standard layout for how modules were packaged, and a tool that installed modules and dependencies with a single command. Maven, released in 2004, brought the same approach to Java with declarative `pom.xml` files. npm, launched in 2010, did the same for Node and became the largest package ecosystem in history. The abstraction was declarative. Programmers specified what they needed, not how to get it. The same pattern spread to Python (pip), Ruby (RubyGems), and virtually every language. Dependency management became part of the standard toolkit.

## [1998. Open source makes collaborative, publicly developed software the default](#table-of-contents) {#opensource-1998}

<!-- ### Problem. Every company reinvents the wheel. Code is proprietary and reuse means licensing or rewriting -->

**Problem.** Through the 1990s, most software was proprietary. Companies kept source code secret to protect competitive advantage. Reusing code meant licensing it or rewriting it. Richard Stallman had founded the free software movement (GNU, GPL) and framed it as "free as in free speech, not free beer." That established legal and ethical foundations, but "free" carried political baggage that made businesses hesitant. Linux and Apache had proven that open collaboration could produce production-grade software, yet there was no neutral term that invited broad adoption. Programmers who wanted to share code faced a fragmented landscape of licenses and ideologies.

<!-- ### Solution. The Open Source Initiative gives the movement a business-friendly identity and formalizes the model -->

**Solution.** In 1998, Christine Peterson coined the term "open source," and Bruce Perens and Eric S. Raymond founded the Open Source Initiative (OSI) <a href="#ref-OSI98" id="ref-OSI98-back">[OSI98]</a>. The shift from "free software" to "open source" was deliberate. It emphasized practical benefits (peer review, faster iteration, no vendor lock-in) over the freedom-first stance that Stallman had championed. The OSI defined criteria for open source licenses and certified them. Apache, MIT, and GPL became mainstream choices rather than ideological statements.

The model proved itself. Linux, Apache, MySQL, PHP (LAMP) powered the early web. Firefox challenged Internet Explorer. Android was built on Linux. Companies from Google to Microsoft adopted open source as strategy. GitHub (2008) reduced contribution friction (fork, change, pull request). By the 2010s, open source was the default for infrastructure, frameworks, and tools. Programmers no longer needed to build or buy everything. They could adopt, adapt, and contribute back. The abstraction was organizational. The efficiency gain was communal. The best software in the world was built collaboratively, in public, by anyone who cared to participate.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-OSI98" href="#ref-OSI98-back">[OSI98]</a> Open Source Initiative. "History of the OSI." Available at <a href="https://opensource.org/history" target="_blank">opensource.org</a></div>
</div>

## [2000. REST APIs standardize how web services communicate](#table-of-contents) {#rest-2000}

<!-- ### Problem. Machines need to talk to each other across the web, but there is no good way to do it -->

**Problem.** Business-to-business commerce and supply-chain integration required one organization's applications to talk to another's over the Internet. Existing distributed computing (CORBA, DCOM, Java RMI) was vendor-specific, complex, and did not work across organizational boundaries. HTTP could carry requests and XML could encode data. What was missing was an agreed way to structure a call. How should one program ask another for a record or submit an update? Without a standard, every service invented its own. SOAP (Microsoft, IBM, W3C 2000) proposed one approach. It was heavyweight (XML envelopes, WSDL, WS-*). No lightweight alternative existed.

<!-- ### Solution. Roy Fielding formalizes the architectural principles the Web is built on -->

**Solution.** Roy Fielding <a href="#ref-Fie00" id="ref-Fie00-back">[Fie00]</a>, a co-author of HTTP/1.1, had helped design the Web's protocol. In his 2000 doctoral dissertation he named and formalized the architectural style already present in the Web. Resources were identified by URLs. The interface was the HTTP methods (`GET`, `POST`, `PUT`, `DELETE`). Requests were stateless. He called this style REST. He was not inventing a new protocol. He was documenting what had made the Web scale. That gave programmers a clear model for designing application programming interfaces (APIs). To get a customer, use `GET` on a URL. To create one, use `POST`. No XML envelope, no WSDL. When JSON replaced XML as the preferred format, REST with JSON was easy to use and to test in a browser. Public APIs that let external developers access a site's data (Amazon, Google, and others) adopted REST. By the 2010s, REST had become the default way machines talked to each other on the Web.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Fie00" href="#ref-Fie00-back">[Fie00]</a> Fielding, R. T. 2000. "Architectural Styles and the Design of Network-based Software Architectures." Doctoral dissertation, University of California, Irvine. Available at <a href="https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm" target="_blank">ics.uci.edu</a></div>
</div>

## [2001. IDEs automate the mechanical scaffolding of programming, an early step toward code generation](#table-of-contents) {#ides-2001}

<!-- ### Problem. Navigating, refactoring, and wiring code in large projects is tedious manual work -->

**Problem.** As Java and enterprise applications grew into systems of hundreds of thousands of lines, the mechanical overhead of programming became a significant drag on productivity. Adding a new method to a class meant manually hunting through dozens of files to find every call site that needed updating. Renaming a class required running `grep` across the entire codebase and editing each hit by hand. Finding where a method was actually defined meant navigating through directories of source files. These tasks required no deep thought. They were purely mechanical, but they consumed hours each day.

<!-- ### Solution. IDEs provide intelligent navigation, completion, and refactoring powered by static analysis -->

**Solution.** IntelliJ IDEA (2001) <a href="#ref-Jet01" id="ref-Jet01-back">[Jet01]</a> and Eclipse (2001, first release 2004) <a href="#ref-Ecl01" id="ref-Ecl01-back">[Ecl01]</a> represented a generational leap in development tools. They parsed entire codebases and built an internal model of every class, method, and reference. This let them provide intelligent code completion. As a programmer typed, the IDE suggested valid method names and parameter types. Automated refactoring made operations like renaming a class or extracting a method into a single action that propagated correctly across the entire project. Integrated debugging let programmers step through code without leaving the editor. Visual Studio provided similar capabilities for C# and .NET development. Design patterns (Gamma et al., 1994) <a href="#ref-GHJV94" id="ref-GHJV94-back-2">[GHJV94]</a> had codified common OOP solutions. Refactoring (1999) <a href="#ref-Fow99" id="ref-Fow99-back">[Fow99]</a>, JUnit (1997) <a href="#ref-Jun97" id="ref-Jun97-back">[Jun97]</a>, and test-driven development (TDD) made restructuring and automated testing mainstream practices.

The productivity gains were substantial. Operations that previously required manual searching and editing across a codebase became instantaneous. By the mid-2010s, IDEs had become so essential that programmers who worked without one felt as disadvantaged as those without version control.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Ecl01" href="#ref-Ecl01-back">[Ecl01]</a> Eclipse. 2001. "Eclipse IDE." Available at <a href="https://www.eclipse.org/" target="_blank">eclipse.org</a></div>
<div class="ref-item"><a id="ref-Fow99" href="#ref-Fow99-back">[Fow99]</a> Fowler, M., Beck, K., Brant, J., Opdyke, W., & Roberts, D. 1999. <em>Refactoring: Improving the Design of Existing Code</em>. Addison-Wesley. Available at <a href="https://martinfowler.com/books/refactoring.html" target="_blank">martinfowler.com</a></div>
<div class="ref-item"><a id="ref-Jet01" href="#ref-Jet01-back">[Jet01]</a> JetBrains. 2001. "IntelliJ IDEA." Available at <a href="https://www.jetbrains.com/idea/" target="_blank">jetbrains.com</a></div>
<div class="ref-item"><a id="ref-Jun97" href="#ref-Jun97-back">[Jun97]</a> Beck, K. & Gamma, E. 1997. JUnit. Available at <a href="https://junit.org" target="_blank">junit.org</a></div>
</div>

## [2002. Dependency injection frees enterprise programmers from framework boilerplate](#table-of-contents) {#di-2002}

<!-- ### Problem. Programmer time is spent on wiring, not business logic -->

**Problem.** Java 2 Enterprise Edition (J2EE) and Enterprise JavaBeans (EJBs) were the standard platform for enterprise Java in the early 2000s. J2EE was the platform. EJBs were the component model for server-side business logic, objects that ran in a container and handled transactions and persistence. In practice it required extensive XML, deployment descriptors, and boilerplate just to wire objects together. A simple database service might need dozens of config files and hundreds of lines of scaffolding. Objects created their own dependencies. Testing and swapping implementations required rewriting wiring code throughout. Programmer time went to infrastructure, not features.

<!-- ### Solution. Inversion of control containers wire dependencies automatically -->

**Solution.** Spring (2003) <a href="#ref-Spr03" id="ref-Spr03-back">[Spr03]</a> replaced J2EE's heavy wiring with dependency injection. Rod Johnson's 2002 book <a href="#ref-Joh02" id="ref-Joh02-back">[Joh02]</a> had argued that Plain Old Java Objects (POJOs) and a lightweight container could replace EJBs, and Spring implemented that idea. Instead of objects creating their own dependencies, a container created and injected them, so a class that needed a database connection could simply declare the dependency and Spring would provide it. Testing became straightforward because tests could inject mocks. Wiring became explicit and centralized rather than scattered throughout the codebase.

J2EE had established the enterprise Java market but created the complexity Spring addressed. Practitioner-built frameworks could outcompete committee-designed standards. Spring Boot (2014) took the next step by providing sensible defaults and auto-configuration, so programmers could start a Spring application with minimal or no config files. By the mid-2010s, dependency injection had become standard across languages and frameworks.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Joh02" href="#ref-Joh02-back">[Joh02]</a> Johnson, R. 2002. <em>Expert One-on-One J2EE Design and Development</em>. Wrox. Available at <a href="https://www.wiley.com/en-us/Expert+One+on+One+J2EE+Design+and+Development-p-9780764543852" target="_blank">wiley.com</a></div>
<div class="ref-item"><a id="ref-Spr03" href="#ref-Spr03-back">[Spr03]</a> Spring. 2003. "Spring Framework." Available at <a href="https://spring.io" target="_blank">spring.io</a></div>
</div>

<h2 id="cloud-and-infrastructure" class="era-heading"><a href="#table-of-contents">Cloud and infrastructure</a></h2>

This era saw cloud computing, mobile, big data, and the commoditization of previously specialized infrastructure. The following milestones are presented in roughly chronological order.

## [2004–2009. MapReduce and Hadoop make processing massive datasets accessible](#table-of-contents) {#mapreduce-2004}

<!-- ### Problem. Big data is a Google monopoly. No one else has the engineering to build equivalent systems -->

**Problem.** By the early 2000s, companies like Google were crawling and indexing billions of web pages. The sheer volume of data dwarfed what any single machine could store or process. Google solved this internally by building the Google File System (GFS) in 2003 <a href="#ref-GGL03" id="ref-GGL03-back">[GGL03]</a>, a distributed file system that spread data across hundreds or thousands of commodity servers, and MapReduce in 2004 <a href="#ref-DG04" id="ref-DG04-back">[DG04]</a>. MapReduce was a programming model that let programmers express massively parallel computation in a simple way. A Map function processed individual records and a Reduce function aggregated results. The framework handled distributing work, shuffling data, and recovering from failures. Google published papers but did not release the code. 

<!-- ### Solution. Yahoo funds the open-source implementation that democratizes big data -->

**Solution.** Doug Cutting and Mike Cafarella had started Nutch, an open-source web crawler, in 2002. When Google's GFS and MapReduce papers appeared, they implemented the techniques in Nutch but needed institutional backing. Yahoo hired Cutting in 2006 to build distributed data processing for its search engine. He extracted the distributed file system and MapReduce implementation from Nutch into a new project, Hadoop. Hadoop comprised HDFS (the file system) and MapReduce (the processing framework). The same name, MapReduce, was intentional. It implemented the same model from the Google papers. Yahoo dedicated a large team to developing it. By 2007, Yahoo was running Hadoop on a 1,000-node cluster.

Yahoo open-sourced its Hadoop work in 2009, ran Hadoop at scale, and adoption followed quickly. Facebook ran Hadoop and built Presto for interactive SQL, Twitter built Scalding (a Scala API on Cascading and Hadoop MapReduce), and LinkedIn built Kafka for event streaming <a href="#ref-KNR11" id="ref-KNR11-back">[KNR11]</a>. eBay and others adopted the ecosystem, and eventually more than half of the Fortune 500 ran big data pipelines on open-source tools. Spark emerged in 2009 <a href="#ref-Zah10" id="ref-Zah10-back">[Zah10]</a> as an alternative to MapReduce that kept intermediate data in memory rather than writing it to disk, improving performance for iterative workloads while requiring more memory. Kafka became the de facto standard for event streaming, Flink (2014) <a href="#ref-Car15" id="ref-Car15-back">[Car15]</a> offered true stream processing at lower latency than Spark's micro-batch model, and Tez optimized batch DAGs for Hadoop. Big data processing went from out of reach to something any company could run.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Car15" href="#ref-Car15-back">[Car15]</a> Carbone, P., et al. 2015. "Apache Flink: Stream and Batch Processing in a Single Engine." <em>IEEE Data Engineering Bulletin</em> 36(4):28-38. Available at <a href="https://arxiv.org/abs/1506.08603" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-DG04" href="#ref-DG04-back">[DG04]</a> Dean, J. & Ghemawat, S. 2004. "MapReduce: Simplified Data Processing on Large Clusters." <em>Proceedings of OSDI</em>, 137-150. Available at <a href="https://www.usenix.org/legacy/publications/library/proceedings/osdi04/tech/full_papers/dean/dean_html/" target="_blank">usenix.org</a></div>
<div class="ref-item"><a id="ref-GGL03" href="#ref-GGL03-back">[GGL03]</a> Ghemawat, S., Gobioff, H., & Leung, S.-T. 2003. "The Google File System." <em>Proceedings of SOSP</em>, 29-43. Available at <a href="https://research.google/pubs/the-google-file-system/" target="_blank">research.google</a></div>
<div class="ref-item"><a id="ref-KNR11" href="#ref-KNR11-back">[KNR11]</a> Kreps, J., Narkhede, N., & Rao, J. 2011. "Kafka: A Distributed Messaging System for Log Processing." <em>Proceedings of NetDB</em>. Available at <a href="https://engineering.linkedin.com/27/project-kafka-distributed-publish-subscribe-messaging-system-reaches-v06" target="_blank">engineering.linkedin.com</a></div>
<div class="ref-item"><a id="ref-Zah10" href="#ref-Zah10-back">[Zah10]</a> Zaharia, M., et al. 2010. "Spark: Cluster Computing with Working Sets." <em>Proceedings of HotCloud</em>. Available at <a href="https://www.usenix.org/legacy/events/hotcloud10/tech/full_papers/Zaharia.pdf" target="_blank">usenix.org</a></div>
</div>

## [2005. Git enables distributed collaboration at global scale](#table-of-contents) {#git-2005}

<!-- ### Problem. The Linux kernel outgrows every version control system available -->

**Problem.** For the first decade of Linux kernel development (1991–2002), there was no formal version control at all. Contributors emailed patches to mailing lists, and Linus Torvalds manually applied them to his own source tree before cutting releases. This worked when the project was small, but Linux had grown into the most important open-source project in the world, with thousands of contributors. The manual process became a serious bottleneck.

In 2002, Torvalds adopted BitKeeper, a proprietary distributed system that was far ahead of CVS or Subversion. In early 2005, BitMover revoked the free license and the kernel community lost its version control overnight.

<!-- ### Solution. Torvalds builds a replacement in 10 days that redefines the category -->

**Solution.** Torvalds had spent months considering what kernel development required. CVS and Subversion were centralized, which made cheap branching and offline work impossible, and no open-source alternative was mature. He began writing Git on April 3, 2005, and had a working system within roughly 10 days. The design was fully distributed. Every clone contained the complete repository history, which allowed programmers to commit, branch, and merge locally without network access. Branching became a lightweight operation, a pointer to a commit that made it essentially free. The Linux kernel 2.6.12 release in June 2005 was the first managed entirely by Git.

Git-based workflows later enabled continuous integration and deployment. Jenkins (2011) and Travis CI (2011) automated testing and deployment pipelines. Programmers pushed code to Git repositories, triggering automated builds, tests, and deployments. GitHub launched in 2008 <a href="#ref-Dab12" id="ref-Dab12-back">[Dab12]</a>, adding pull requests and code review workflows that made open-source collaboration frictionless. The model enabled global collaboration at unprecedented scale. Projects like Linux, with thousands of contributors across continents, could coordinate effectively. This DevOps movement reduced the time between writing code and running it in production from weeks to minutes.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Dab12" href="#ref-Dab12-back">[Dab12]</a> Dabbish, L., et al. 2012. "Social Coding in GitHub." <em>Proceedings of CSCW</em>, 1277-1286. Available at <a href="https://dl.acm.org/doi/10.1145/2145204.2145396" target="_blank">dl.acm.org</a></div>
</div>

## [2006. Cloud platforms transform infrastructure into elastic, pay-per-use resources](#table-of-contents) {#cloud-2006}

<!-- ### Problem. Capital requirements and capacity guessing block startups and punish spiky workloads -->

**Problem.** Before 2006, running applications meant purchasing servers, networking equipment, and storage, renting rack space and power in a data center, and hiring system administrators to maintain all of it. For a startup launching a web service, the upfront capital was substantial. Ordering, installing, and configuring new hardware took weeks or months. Capacity planning made this worse. Organizations had to forecast future demand and either overprovision and pay for idle capacity or underprovision and risk outages. Spiky workloads, such as retail at holidays or tax software in filing season, made the tradeoff brutal.

<!-- ### Solution. API-driven virtual servers with pay-per-use pricing enable elastic scaling -->

**Solution.** Amazon Web Services launched Elastic Compute Cloud (EC2) in August 2006 <a href="#ref-AWS06" id="ref-AWS06-back">[AWS06]</a>, providing virtual servers provisionable through an API in minutes with pay-per-hour billing. This transformed infrastructure from capital expenditure (CapEx) to operational expense (OpEx) and from static to elastic. EC2 is the foundational example of what the industry came to call Infrastructure as a Service (IaaS). The cloud provider manages physical hardware, networking, and virtualization, while the customer retains responsibility for operating systems, applications, and data. The customer rents compute, storage, and network capacity rather than purchasing it.

This transformed capacity planning. Organizations could scale elastically to match current demand. The cloud model expanded in layers. PaaS (Heroku, Google App Engine, Elastic Beanstalk) shifted OS and runtime management to the provider, so programmers could deploy applications without configuring servers. SaaS (Salesforce, Gmail, Dropbox) delivered entirely managed applications. Infrastructure as code (Chef, Puppet, Terraform) automated the provisioning of IaaS resources through version-controlled scripts, replacing weeks of manual setup. AWS operated data centers worldwide. Startups could deploy globally with the same API calls. Following AWS's success, Azure and Google Cloud emerged. Cloud computing became the dominant deployment model.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-AWS06" href="#ref-AWS06-back">[AWS06]</a> Amazon Web Services. 2006. "Announcing Amazon Elastic Compute Cloud (Amazon EC2)." Available at <a href="https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta/" target="_blank">aws.amazon.com</a></div>
</div>

## [2007. Mobile platforms turn the phone into a general-purpose computer with app ecosystems](#table-of-contents) {#mobile-2007}

<!-- ### Problem. Mobile phones are closed appliances, not programmable computers -->

**Problem.** At its peak, Nokia controlled over 40% of the global mobile phone market. Within six years, that share had collapsed to under 5%. Hardware was not the issue. Nokia's model treated phones as closed appliances. SDKs were fragmented (J2ME on some devices, proprietary on others), there was no unified channel for programmers to distribute software to users, and Symbian was not built for a phone as a general-purpose computer running third-party software.

<!-- ### Solution. Apple reframes the phone as a pocket computer, and opens it to programmers -->

**Solution.** Apple released the iPhone in June 2007. The multitouch screen and full web browser were significant, but the deeper change was conceptual. The iPhone was positioned as a general-purpose computing device that also made calls, with a browser that rendered full web pages rather than a stripped-down mobile experience. The iPhone SDK launched in March 2008 <a href="#ref-App08" id="ref-App08-back">[App08]</a> and the App Store opened in July 2008. For software distribution, Apple provided a single channel. Programmers could submit apps and reach millions of devices without going through carriers or OEMs. Google followed with Android in September 2008 <a href="#ref-And08" id="ref-And08-back">[And08]</a> and the Android Market, with a more permissive review process. Both platforms provided high-level APIs and enabled instant global distribution. By the mid-2010s, mobile had created new categories such as ridesharing, mobile payments, and social photography, and changed how software was discovered, distributed, and monetized.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-App08" href="#ref-App08-back">[App08]</a> Apple. 2008. "iPhone SDK Announcement." Available at <a href="https://www.apple.com/newsroom/2008/03/06/Apple-Announces-iPhone-2-0-Software-Beta/" target="_blank">apple.com</a></div>
<div class="ref-item"><a id="ref-And08" href="#ref-And08-back">[And08]</a> Android Open Source Project. 2008. "Android Platform Overview." Available at <a href="https://source.android.com" target="_blank">source.android.com</a></div>
</div>

## [2008–2012. Microservices replace monoliths as the architecture for large-scale applications](#table-of-contents) {#microservices-2008}

<!-- ### Problem. Monolithic applications become fragile, slow to develop, and impossible to scale selectively -->

**Problem.** Large web companies in the late 2000s built their platforms as monolithic applications, that is, large codebases deployed as one unit. Early Netflix illustrates the pattern. Its core system was a Java application backed by an Oracle database. In August 2008, a hardware failure took the entire service down for three days. The cause was initially suspected to be database corruption. Every part of the system depended on the same database, so a failure in one place propagated everywhere. Such failures are inherent to monolithic architecture.

Beyond availability, monoliths created organizational bottlenecks. Because the application was a single deployment unit, teams working on different features, such as recommendations, billing, and streaming playback, had to deploy together. A bug in one component could take down the whole process and break unrelated features. Because the codebase had no service boundaries, adding a feature required understanding and testing the entire application. Because all components ran in the same process, scaling meant adding more copies of the entire application. Provisioning more compute for one component required scaling everything, wasting capacity on components that needed none. As the codebase grew, development slowed and onboarding became increasingly difficult.

<!-- ### Solution. Decomposing applications into independently deployable services, each owning its own data -->

**Solution.** Amazon arrived at the architecture first <a href="#ref-Vog22" id="ref-Vog22-back">[Vog22]</a>. Its monolithic e-commerce platform became unmanageable as it expanded. Architects required every internal capability to be exposed as an independent service. That restructuring produced the infrastructure that became AWS. Netflix began migrating to that model on AWS in 2009, a seven-year process. The core idea was to break the monolith into small, independently deployable services, each owning its own database. A failure in one service no longer took down the whole platform. Netflix eventually decomposed into over 700 microservices. At that scale, services must find each other, handle failures gracefully, and distribute load across instances. Netflix open-sourced its operational tooling as Eureka (service discovery), Hystrix (circuit breaker), and Ribbon (load balancing) <a href="#ref-Net12" id="ref-Net12-back">[Net12]</a>. Fowler and Lewis gave the pattern its name and a widely cited reference in 2014 <a href="#ref-Mar14" id="ref-Mar14-back">[Mar14]</a>. By the 2020s microservices had become the dominant architecture for large-scale web applications, adopted by most large enterprises.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Mar14" href="#ref-Mar14-back">[Mar14]</a> Fowler, M. & Lewis, J. 2014. "Microservices." Available at <a href="https://martinfowler.com/microservices/" target="_blank">martinfowler.com</a></div>
<div class="ref-item"><a id="ref-Net12" href="#ref-Net12-back">[Net12]</a> Netflix. 2012. "Netflix Shares Cloud Load Balancing And Failover Tool: Eureka!" Available at <a href="https://netflixtechblog.com/netflix-shares-cloud-load-balancing-and-failover-tool-eureka-c10647ef95e5" target="_blank">netflixtechblog.com</a></div>
<div class="ref-item"><a id="ref-Vog22" href="#ref-Vog22-back">[Vog22]</a> Vogels, W. 2022. "The Distributed Computing Manifesto." <em>All Things Distributed</em>. Available at <a href="https://www.allthingsdistributed.com/2022/11/amazon-1998-distributed-computing-manifesto.html" target="_blank">allthingsdistributed.com</a></div>
</div>

## [2009. NoSQL databases trade consistency for scale and flexibility](#table-of-contents) {#nosql-2009}

<!-- ### Problem. Relational databases cannot scale horizontally for massive web applications -->

**Problem.** By the late 2000s, web-scale data and traffic exceeded what relational databases could handle. Horizontal scaling required ACID across partitions and two-phase commit, which did not scale. The CAP theorem <a href="#ref-Bre00" id="ref-Bre00-back">[Bre00]</a> formalized the tradeoff. Relational databases chose consistency and became unavailable during partitions. Fixed schemas forced sparse tables or many joins for heterogeneous data. Schema changes required migrations that locked tables. Row-oriented storage made analytical scans expensive. Relational full-text search did not scale.

<!-- ### Solution. NoSQL databases optimize for different data models and scale-out architectures -->

**Solution.** NoSQL databases relax relational constraints in exchange for scale. Different designs addressed different constraints.

Relational databases had required two-phase commit across partitions and went offline when partitions occurred. Two designs from 2006–2007 showed that abandoning ACID across partitions enabled horizontal scaling. They chose opposite sides of the CAP tradeoff.

BigTable <a href="#ref-CDG06" id="ref-CDG06-back">[CDG+06]</a> (Google, 2006) chose consistency. It used a sparse, multi-dimensional sorted map. Data was organized in column families, groups of columns stored together within each row, so each row could have different columns. Heterogeneous data such as web crawl records with varying fields per URL no longer required sparse tables or many joins. It offered strong consistency within a row and suited read-heavy workloads such as Google's search index and Google Maps. That consistency required a central coordinator, at the cost of availability. BigTable's design was adopted in the open-source Apache HBase.

Dynamo <a href="#ref-DHJ07" id="ref-DHJ07-back">[DHJ+07]</a> (Amazon, 2007) chose availability. It stayed writable during partitions when relational systems went offline. Its key-value model had no central coordinator. It suited shopping carts and session data, where availability mattered more than immediate consistency. Dynamo's design was adopted in Amazon's DynamoDB (commercial) and Riak (open-source).

Document stores addressed sparse data and schema evolution. Fixed schemas had forced migrations that locked tables. MongoDB (2009) <a href="#ref-Mon09" id="ref-Mon09-back">[Mon09]</a> and CouchDB stored JSON-like documents. Applications could add fields without migrations. The model suited user profiles with varying attributes, product catalogs with nested specifications, and content with arbitrary metadata. The tradeoff was eventual consistency and no ACID across documents. Cassandra (2008) <a href="#ref-LM10" id="ref-LM10-back">[LM10]</a> combined BigTable's column-family model with Dynamo's decentralized distribution. It handled sparse data, scaled horizontally, and offered tunable consistency. Use cases included activity feeds and time-series data. The cost was eventual consistency by default.

Columnar stores and search engines addressed analytical scans and full-text search. Row-oriented storage had made broad aggregations slow. Vertica and ClickHouse stored each column separately, so scans could read only the columns needed for aggregations. They suited analytical dashboards, sales reports, and click analytics (OLAP) but were poor for transactional point updates (OLTP). Elasticsearch (2010) <a href="#ref-Ban10" id="ref-Ban10-back">[Ban10]</a> and Solr, built on Lucene, provided full-text search over HTTP for product search, log analysis, and site search. NoSQL made web-scale storage reachable without purpose-built hardware or specialist teams.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Bre00" href="#ref-Bre00-back">[Bre00]</a> Brewer, E. 2000. "Towards Robust Distributed Systems." <em>Proceedings of ACM PODC</em>. Available at <a href="https://www.researchgate.net/publication/221343719_Towards_robust_distributed_systems" target="_blank">researchgate.net</a></div>
<div class="ref-item"><a id="ref-CDG06" href="#ref-CDG06-back">[CDG+06]</a> Chang, F., Dean, J., Ghemawat, S., et al. 2006. "Bigtable: A Distributed Storage System for Structured Data." <em>Proceedings of OSDI</em>, 205-218. Available at <a href="https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/" target="_blank">research.google</a></div>
<div class="ref-item"><a id="ref-DHJ07" href="#ref-DHJ07-back">[DHJ+07]</a> DeCandia, G., Hastorun, D., Jampani, M., et al. 2007. "Dynamo: Amazon's Highly Available Key-value Store." <em>Proceedings of ACM SOSP</em>, 205-220. Available at <a href="https://dl.acm.org/doi/10.1145/1294261.1294281" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-LM10" href="#ref-LM10-back">[LM10]</a> Lakshman, A. & Malik, P. 2010. "Cassandra: A Decentralized Structured Storage System." <em>ACM SIGOPS Operating Systems Review</em> 44(2):35-40. Available at <a href="https://dl.acm.org/doi/10.1145/1773912.1773922" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Ban10" href="#ref-Ban10-back">[Ban10]</a> Banon, S. 2010. "You Know, for Search." Elasticsearch. Available at <a href="https://www.elastic.co/guide/en/elasticsearch/guide/current/intro.html" target="_blank">elastic.co</a></div>
<div class="ref-item"><a id="ref-Mon09" href="#ref-Mon09-back">[Mon09]</a> Chodorow, K. & Dirolf, M. 2010. <em>MongoDB: The Definitive Guide</em>. O'Reilly Media. Available at <a href="https://www.oreilly.com/library/view/mongodb-the-definitive/9781449381578/" target="_blank">oreilly.com</a></div>
</div>

## [2009. Node.js makes JavaScript full-stack and enables the npm ecosystem](#table-of-contents) {#nodejs-2009}

<!-- ### Problem. Full-stack means two languages, two toolchains, and constant context-switching -->

**Problem.** By the late 2000s, web applications had a split identity. The browser ran JavaScript. The server ran Java, PHP, Python, or Ruby. Programmers wrote frontend and backend in different languages, with different runtimes and toolchains. Building a real-time feature meant WebSockets on the server and JavaScript in the browser. Full-stack development meant context-switching between languages, deployment targets, and debugging environments. Programmer time was spent on integration friction, not features. There was no way to share code reliably between client and server.

<!-- ### Solution. A JavaScript runtime on V8 brings the browser language to the server -->

**Solution.** Ryan Dahl released Node.js in 2009 <a href="#ref-Dah09" id="ref-Dah09-back">[Dah09]</a>. Node.js ran JavaScript on the server using Google's V8 engine, the same one powering Chrome. The key innovation was non-blocking I/O. Instead of threads, it used an event loop. A single process could handle thousands of concurrent connections. This suited I/O-bound workloads such as APIs, proxies, and real-time applications that had dominated server-side scaling challenges.

Node.js made JavaScript full-stack. Programmers could write client and server in the same language. npm, launched in 2010, became the package registry for Node and the browser. The same `require` or `import` worked on both sides. Rails (2004) and Django (2005) had popularized convention-over-configuration, relying on sensible defaults (e.g. a `Post` model maps to a `posts` table) instead of explicit configuration for every detail. Node.js and frameworks like Express (2010) brought the same model to JavaScript. The ecosystem expanded rapidly. By the mid-2010s, Node.js powered Netflix, LinkedIn, Uber, and PayPal. JavaScript went from a browser scripting language to the most widely used language for web development. One language and one ecosystem spanned the stack from end to end.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Dah09" href="#ref-Dah09-back">[Dah09]</a> Node.js. "About Node.js." Available at <a href="https://nodejs.org/en/about" target="_blank">nodejs.org</a></div>
</div>

## [2010–2015. Type safety, component architecture, and safer concurrency reach mainstream development](#table-of-contents) {#language-tooling-2010}

<!-- ### Problem. JavaScript lacks structure. Concurrency with mutable state is a correctness trap -->

**Problem.** Dynamic languages such as JavaScript, Python, and Ruby had become central to web and backend development, but type checking and clear separation of concerns lagged. Dynamic typing deferred errors to runtime that static typing would have caught at compile time. In JavaScript, jQuery-based applications entangled DOM manipulation, business logic, and data fetching with no clear separation. 

Concurrent programming in Java, C++, and similar languages faced a separate set of challenges. Mutable shared state and race conditions produced bugs that were difficult to reproduce and debug. Locks offered a remedy but introduced deadlocks and contention, and correctness depended on precise lock ordering that most programmers found impractical to maintain.

<!-- ### Solution. The JavaScript ecosystem matures. Functional concepts enter mainstream languages -->

**Solution.** TypeScript (2012) <a href="#ref-Mic12" id="ref-Mic12-back">[Mic12]</a> and React (2013) <a href="#ref-Fac13" id="ref-Fac13-back">[Fac13]</a> added type checking and component architecture to JavaScript, transforming jQuery spaghetti into structured development. 

Functional concepts entered mainstream languages. Scala bridged object-oriented and functional programming on the JVM, making functional ideas accessible to Java programmers. Twitter's adoption of Scala for high-concurrency systems <a href="#ref-Eri12" id="ref-Eri12-back">[Eri12]</a> demonstrated that type-safe functional programming could handle production scale. Java 8 (2014) <a href="#ref-Ora14" id="ref-Ora14-back">[Ora14]</a> followed with lambdas and streams, bringing functional patterns to the mainstream. Immutable data and pure functions addressed concurrency without locks.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Eri12" href="#ref-Eri12-back">[Eri12]</a> Eriksen, M. et al. 2012. "Effective Scala." Twitter Engineering. Available at <a href="https://twitter.github.io/effectivescala/" target="_blank">twitter.github.io/effectivescala</a></div>
<div class="ref-item"><a id="ref-Fac13" href="#ref-Fac13-back">[Fac13]</a> Facebook. 2013. "React: A JavaScript Library for Building User Interfaces." Available at <a href="https://react.dev" target="_blank">react.dev</a></div>
<div class="ref-item"><a id="ref-Mic12" href="#ref-Mic12-back">[Mic12]</a> Microsoft. 2012. "Introducing TypeScript." Available at <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/" target="_blank">devblogs.microsoft.com</a></div>
<div class="ref-item"><a id="ref-Ora14" href="#ref-Ora14-back">[Ora14]</a> Oracle. 2014. "What's New in Java SE 8." Available at <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/whats-new/java-se-8.html" target="_blank">docs.oracle.com</a></div>
</div>

## [2013–2014. Containers and orchestration make deployment portable and scalable](#table-of-contents) {#containers-2013}

<!-- ### Problem. Applications behave differently across environments, and scaling deployment doesn't scale -->

**Problem.** Two constraints slowed deployment. The first was environment inconsistency. Applications ran in development but crashed in production due to different library versions, missing dependencies, or configuration drift. Virtual machines provided isolation but were heavyweight. Each VM required a full OS and consumed gigabytes. Manual configuration and documentation were brittle. 

The second constraint was orchestration at scale. Distributing workloads across clusters required placement decisions, failure handling, traffic routing, and elastic scaling. Manual coordination did not scale. Cluster managers such as Apache Mesos offered resource scheduling but did not provide declarative desired-state configuration, automated rollouts and rollbacks, integrated service discovery, or self-healing of failed workloads.

**Solution.** Docker (2013) <a href="#ref-Mer14" id="ref-Mer14-back">[Mer14]</a> addressed environment inconsistency. Linux containers packaged applications into images that ran identically anywhere. A Dockerfile replaced manual setup. Containers were lightweight compared to VMs and required no full OS per instance. 

Kubernetes (2014) <a href="#ref-Bur16" id="ref-Bur16-back">[Bur+16]</a>, based on Google's Borg, addressed orchestration at scale. Programmers declared desired state in YAML, for example `replicas: 10` and `containerPort: 80`, and Kubernetes reconciled the cluster to match. The system restarted crashed instances, scaled in response to load, and exposed infrastructure as declarative YAML stored in version control. Cloud providers offered managed Kubernetes. Within a decade, containers and Kubernetes had become the standard for cloud-native deployment that scales and recovers across many machines.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Mer14" href="#ref-Mer14-back">[Mer14]</a> Merkel, D. 2014. "Docker: Lightweight Linux Containers for Consistent Development and Deployment." <em>Linux Journal</em> 2014(239):2. Available at <a href="https://www.linuxjournal.com/content/docker-lightweight-linux-containers-consistent-development-and-deployment" target="_blank">linuxjournal.com</a></div>
<div class="ref-item"><a id="ref-Bur16" href="#ref-Bur16-back">[Bur+16]</a> Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J. 2016. "Borg, Omega, and Kubernetes." <em>ACM Queue</em> 14(1):70-93. Available at <a href="https://dl.acm.org/doi/10.1145/2898442.2898444" target="_blank">dl.acm.org</a></div>
</div>

## [2014. Serverless computing shifts the unit of deployment from servers to functions](#table-of-contents) {#serverless-2014}

<!-- ### Problem. Container-based architectures still require programmers to reason about infrastructure -->

**Problem.** Containers and orchestration made deployment portable and scalable, but containers were always-on. A workload handling one request per hour still required a running container and continuous compute cost. For bursty or infrequent workloads, organizations paid for idle capacity, the same inefficiency that cloud computing had aimed to eliminate.

<!-- ### Solution. Function-as-a-Service abstracts the unit of deployment from a long-running process to a single, ephemeral function invocation -->

**Solution.** AWS Lambda, launched in November 2014 <a href="#ref-AWS14" id="ref-AWS14-back">[AWS14]</a>, introduced Function-as-a-Service, or serverless. The platform invoked functions only when triggered by events such as HTTP requests, file uploads, queue messages, or scheduled jobs. Each execution was ephemeral. The runtime was torn down afterward, so no compute was allocated between runs and pricing was per-invocation and per-duration. Cost aligned with actual usage rather than provisioned capacity, eliminating idle cost for bursty or infrequent workloads. Lambda scaled automatically from zero to thousands of concurrent executions. 

The stateless model imposed constraints. Cold starts introduced latency after inactivity, and execution time was capped, so serverless suited event-driven workloads such as APIs, background processing, data pipelines, and scheduled tasks but was not a universal replacement for containers. Google Cloud Functions and Azure Functions followed. Serverless became a standard deployment option alongside IaaS and containers, selected by workload characteristics.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-AWS14" href="#ref-AWS14-back">[AWS14]</a> Amazon Web Services. 2014. "Announcing AWS Lambda." Available at <a href="https://aws.amazon.com/blogs/aws/run-code-cloud/" target="_blank">aws.amazon.com</a></div>
</div>

## [2015–2016. ML frameworks democratize machine learning without research-level expertise](#table-of-contents) {#ml-frameworks-2015}

<!-- ### Problem. ML is locked in research labs. Implementing from papers or hiring PhDs is the only path -->

**Problem.** Before 2015, applying machine learning meant implementing algorithms from academic papers and using tools like R and Python that required statistical expertise. Deep learning had emerged as a research direction, but implementing backpropagation, designing architectures, and training at scale demanded deep knowledge of linear algebra, optimization, and distributed systems. Google, Facebook, Twitter, and a few labs built their ow internal frameworks. They either had to hire PhDs or stay out. The gap between "research breakthrough" and "programmer can use it" was enormous. The bottleneck was expertise, not compute.

<!-- ### Solution. High-level frameworks with automatic differentiation and GPU support make ML accessible -->

**Solution.** TensorFlow (2015) <a href="#ref-Aba15" id="ref-Aba15-back">[Aba+15]</a> and PyTorch (2016) <a href="#ref-Pas17" id="ref-Pas17-back">[Pas+17]</a> made deep learning tractable for programmers without research-level expertise. Both provided backpropagation, GPU acceleration, and a high-level API. Programmers defined computation as a graph or in imperative code; the frameworks handled the math, learning-rate tuning, and distributed training across GPUs. Both integrated with NumPy, pandas, and Jupyter. Transfer learning allowed fine-tuning of pretrained models with minimal data. Scikit-learn had already made classical ML such as regression, classification, and clustering accessible. TensorFlow and PyTorch did the same for deep learning, and the language models behind AI coding assistants such as Copilot and Codex were trained with these frameworks <a href="#ref-CKB21-ml" id="ref-CKB21-back-ml">[CKB+21]</a>.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Aba15" href="#ref-Aba15-back">[Aba+15]</a> Abadi, M., et al. 2016. "TensorFlow: A System for Large-Scale Machine Learning." <em>Proceedings of OSDI</em>, 265-283. (Released 2015.) Available at <a href="https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi" target="_blank">usenix.org</a></div>
<div class="ref-item"><a id="ref-Pas17" href="#ref-Pas17-back">[Pas+17]</a> Paszke, A., et al. 2019. "PyTorch: An Imperative Style, High-Performance Deep Learning Library." <em>Advances in NeurIPS</em> 32. (Released 2016.) Available at <a href="https://arxiv.org/abs/1912.01703" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-CKB21-ml" href="#ref-CKB21-back-ml">[CKB+21]</a> Chen, M., Tworek, J., Jun, H., et al. 2021. "Evaluating Large Language Models Trained on Code." <em>arXiv:2107.03374</em>. Available at <a href="https://arxiv.org/abs/2107.03374" target="_blank">arxiv.org</a></div>
</div>

<h2 id="ai-coding" class="era-heading"><a href="#table-of-contents">AI coding</a></h2>

AI coding assistants depend on language models that map input sequences to output sequences. Code generation is one such task, given a specification or context, produce code. The following milestones trace the architectural and scaling developments that made those models possible.

## [2017. Transformers replace recurrence with self-attention](#table-of-contents) {#ai-transformers-2017}

**Problem.** By 2017, neural networks had replaced rule-based systems, count-based n-grams, phrase tables, and hand-engineered features for tasks like machine translation, language modeling, and question answering. The dominant architecture was the encoder-decoder, implemented with recurrent neural networks (typically LSTMs). It mapped an input sequence to an output sequence, for example one sentence to another or a natural language description to code. The encoder processed the input token by token and produced a fixed-length vector (the final hidden state). The decoder consumed that vector and generated the output token by token, autoregressively. The limitation was recurrence. At each step $t$, the hidden state $h_t$ depended on the previous hidden state $h_{t-1}$ and the current input $x_t$, so computation was strictly sequential.

$$h_t = f(h_{t-1}, x_t)$$

Because $h_t$ depends on $h_{t-1}$, the forward pass required $n$ sequential steps and could not be parallelized. Information from position $t$ to $t+k$ propagated through $k$ steps. During backpropagation, the gradient was multiplied by $\partial h_t / \partial h_{t-1}$ at each step. The product of $k$ Jacobians often had spectral norm below one, so the gradient decayed exponentially and long-range dependencies received negligible signal. An architecture that allowed parallel computation and direct flow between arbitrary positions was needed.

<!-- ### Solution. Self-attention enables parallel computation and captures long-range dependencies -->

**Solution.** Vaswani et al. <a href="#ref-VSP17" id="ref-VSP17-back">[VSP+17]</a> introduced the Transformer, an encoder-decoder that dispenses with recurrence. Instead of the recurrent update above, each layer uses self-attention. Let $i$ and $j$ denote sequence indices (positions). At each layer, the representation at position $i$ is computed as a weighted sum over all positions $j$,

$$
\begin{aligned}
h_i &= \sum_j \alpha_{ij} V_j \\
\alpha_{ij} &= \mathrm{softmax}\bigl( q_i \cdot k_j \big/ \sqrt{d} \bigr)
\end{aligned}
$$

The query $q_i$, key $k_j$, and value $V_j$ are learned linear projections of the input representations. Unlike recurrence, $h_i$ depends on all $h_j$ in one step, with no sequential dependency. All positions are updated in parallel, and information between any two positions flows in one layer regardless of their distance in the sequence. This design yields three effects. Training is fully parallelizable over the sequence. Long-range dependencies avoid vanishing gradients because the gradient between any two positions traverses one layer, not many. The architecture scales to very large models and datasets. Transformers underpin BERT (2018), GPT-2 (2019), GPT-3 (2020), Codex (2021), and all subsequent code-capable language models.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-VSP17" href="#ref-VSP17-back">[VSP+17]</a> Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. 2017. "Attention Is All You Need." <em>Advances in Neural Information Processing Systems</em> 30. Available at <a href="https://arxiv.org/abs/1706.03762" target="_blank">arxiv.org</a></div>
</div>

## [2020. Large language models demonstrate in-context learning](#table-of-contents) {#ai-llm-2020}

<!-- ### Problem. Adapting models to new tasks requires fine-tuning with labeled data -->

**Problem.** By 2019, Transformer-based language models such as BERT and GPT-2 had been pretrained on large text corpora. The standard way to apply these models to a specific task was supervised fine-tuning. A practitioner took a pretrained model, collected labeled examples for the target task, and trained the model on those examples. Translation required labeled translation pairs. Sentiment analysis required labeled sentences. Code generation required labeled specification-code pairs. Each task demanded its own dataset and its own training run. Deploying a new capability meant fine-tuning, validating, and shipping a new model variant. The cost of data collection and the expertise required for training and deployment limited adoption to organizations with dedicated ML infrastructure.

<!-- ### Solution. Scale enables few-shot learning from examples in the prompt -->

**Solution.** Brown et al. <a href="#ref-BMR20" id="ref-BMR20-back">[BMR+20]</a> showed that the problem could be solved by training on general text and then conditioning at inference time. The model is pretrained once on a large corpus of general text (web, books, code), which already contains many input–output style sequences. No task-specific labels are used in pretraining. At inference, the user conditions the model on a prompt that consists of a few demonstration input–output pairs followed by a new query input. The model completes the sequence with the appropriate output. The demonstrations are not training data and do not update the model; they specify which pattern the model should follow by making the prompt match the format of sequences seen during pretraining. This is in-context learning, so called because the task is specified only in the prompt context at inference, with no parameter update.

For example, a translation prompt might look like:

"Hello, world." → "Bonjour, le monde."  
"Good morning." → "Bonjour."  
"See you tomorrow." → ?

The model produces the target-language continuation.

Technically, the model outputs $P(\text{next token} \mid \text{prefix})$; the prompt is the prefix. The few demos in the prompt disambiguate which pre-learned pattern to use. One forward pass, no backward pass or parameter update. A single model serves many tasks, with the task fixed by the prompt at inference time. Brown et al. found that larger models achieved higher few-shot accuracy on the same benchmarks.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-BMR20" href="#ref-BMR20-back">[BMR+20]</a> Brown, T. B., Mann, B., Ryder, N., et al. 2020. "Language Models are Few-Shot Learners." <em>Advances in Neural Information Processing Systems</em> 33:1877-1901. Available at <a href="https://arxiv.org/abs/2005.14165" target="_blank">arxiv.org</a></div>
</div>

## [2021. Copilot and Codex bring AI code generation to mainstream development](#table-of-contents) {#ai-copilot-2021}

### Problem. Programmers spend significant time on mechanical tasks that do not require deep expertise

Before AI assistants, software development faced persistent productivity bottlenecks. Significant time went to mechanical tasks (writing boilerplate such as REST endpoints, validation, and error handling, consulting documentation for API signatures and examples, navigating codebases to find patterns, translating between formats such as schemas to API objects and specs to function signatures, and writing tests with predictable arrange-call-assert patterns). Empirical studies found these activities consumed substantial development time without requiring deep expertise.

### Solution. AI assistants generate code from context but require expert verification

Codex <a href="#ref-CKB21" id="ref-CKB21-back">[CKB+21]</a> showed that models pretrained on GitHub code outperformed general-purpose models. GitHub Copilot <a href="#ref-Git21" id="ref-Git21-back">[Git21]</a> (June 2021) was the first mainstream assistant, with 55% faster task completion <a href="#ref-Git22" id="ref-Git22-back">[Git22]</a>. The model completed code as programmers typed, trained on public code. The abstraction was autocomplete at the level of functions and blocks. Verification remained necessary. Output was statistically plausible, not formally correct.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-CKB21" href="#ref-CKB21-back">[CKB+21]</a> Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. D. O., Kaplan, J., et al. 2021. "Evaluating Large Language Models Trained on Code." <em>arXiv:2107.03374</em>. Available at <a href="https://arxiv.org/abs/2107.03374" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-Git21" href="#ref-Git21-back">[Git21]</a> GitHub. 2021. "Introducing GitHub Copilot: Your AI pair programmer." Available at <a href="https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/" target="_blank">github.blog</a></div>
<div class="ref-item"><a id="ref-Git22" href="#ref-Git22-back">[Git22]</a> GitHub. 2022. "Research: Quantifying GitHub Copilot's impact on developer productivity and happiness." Available at <a href="https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" target="_blank">github.blog</a></div>
</div>

## [2021–2024. Code evals establish how the field measures progress and reveal the gap between algorithmic and real-world tasks](#table-of-contents) {#ai-benchmarks-2021}

### Problem. We lack objective measures of what AI coding assistants can and cannot do

Evaluations (evals) are standardized test suites that measure how well models perform on defined tasks. They drive research priorities and product development. Without evals, claims about AI coding capabilities varied widely. Different tasks required different skills. Isolated function generation was not the same as modifying a large, unfamiliar codebase.

### Solution. HumanEval and SWE-bench establish the gap between isolated algorithms and real-world codebases

HumanEval <a href="#ref-CKB21" id="ref-CKB21-back-2">[CKB+21]</a>, introduced alongside Codex in 2021, tests function-level code generation. Each problem provides a docstring specifying desired behavior. The tasks are algorithmic and self-contained. Claude 3.5 Sonnet (June 2024) reached 93% <a href="#ref-Ant24" id="ref-Ant24-back">[Ant24]</a>.

SWE-bench <a href="#ref-JYW24" id="ref-JYW24-back">[JYW+24]</a>, introduced in 2024, tests on real-world tasks (fixing actual bugs from open-source repositories such as Django, Flask, Matplotlib, and Scikit-learn). Each task provides a GitHub issue description, often ambiguous, and expects a code patch that resolves the issue and passes existing test suites. This requires understanding an existing codebase, navigating its architecture, inferring undocumented invariants, and ensuring changes do not introduce regressions. GPT-4 achieved 1.74% in early 2024 and Claude 3.5 Sonnet reached 33.5% in June (both on the original SWE-bench) <a href="#ref-Ant24" id="ref-Ant24-back-2">[Ant24]</a>. OpenAI's o1 achieved 48.9% on SWE-bench Verified in December 2024 <a href="#ref-Ope24" id="ref-Ope24-back-2">[Ope24]</a>, and Claude 4 reached 72.5% in May 2025 <a href="#ref-Ant25" id="ref-Ant25-back">[Ant25]</a>.

The gap between 93% on HumanEval and 72.5% on SWE-bench Verified is the most informative metric. (Leaderboards at <a href="https://www.swebench.com/" target="_blank">swebench.com</a> track current results.) The gap reveals what remains hard (interpreting ambiguous requirements, navigating complex codebases, understanding implicit architectural context, and making design tradeoffs). These are the skills that differentiate novice from expert programmers.

### What the gap reveals

That gap is not a small implementation detail. It reveals which skills remain hard for AI and which differentiate expert from novice programmers.

HumanEval tests algorithmic problem-solving with clear specifications. The model receives a docstring like "Write a function that returns the nth Fibonacci number" with explicit input/output examples. The task is self-contained. There's no ambiguity about what "correct" means. The output either passes the test suite or it doesn't. This mirrors coding interview questions or LeetCode problems.

SWE-bench tests real-world software engineering. The model receives a GitHub issue description, often ambiguous or incomplete ("The chart legend overlaps with data points at certain window sizes"), and must produce a patch that fixes the issue without breaking existing functionality. This requires:

**Codebase archaeology.** Understanding how an unfamiliar 50,000-line codebase is organized, which modules own which responsibilities, and where the relevant code likely lives. Programmers learn this through experience and pattern recognition.

**Ambiguity resolution.** Inferring what "at certain window sizes" means, whether the fix should adjust the legend or the layout engine, and what tradeoffs are acceptable. Real-world requirements are underspecified.

**Architectural context.** Recognizing that a "simple" fix in the rendering code might violate assumptions elsewhere, that the codebase uses a particular design pattern consistently, or that a seemingly unrelated module depends on current behavior.

**Regression avoidance.** Ensuring changes don't break any of the 2,000 existing tests or introduce subtle bugs in edge cases. Expert programmers build mental models of which changes are safe and which are risky.

The gap between 93% and 72.5% measures exactly these skills (the ones that take programmers years to develop and that don't appear in textbooks or interview questions). As the gap closes, AI moves from "autocomplete" to "junior engineer" to "experienced contributor." But the final 10–20% may be the hardest, because it requires judgment that comes from understanding not just code, but the people and organizations the code serves.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Ant24" href="#ref-Ant24-back">[Ant24]</a> Anthropic. 2024. "Claude 3.5 Sonnet." Available at <a href="https://www.anthropic.com/claude/sonnet" target="_blank">anthropic.com</a></div>
<div class="ref-item"><a id="ref-Ant25" href="#ref-Ant25-back">[Ant25]</a> Anthropic. 2025. "Introducing Claude 4." Available at <a href="https://www.anthropic.com/news/claude-4" target="_blank">anthropic.com</a></div>
<div class="ref-item"><a id="ref-Ope24" href="#ref-Ope24-back">[Ope24]</a> OpenAI. 2024. "Introducing OpenAI o1." Available at <a href="https://openai.com/o1/" target="_blank">openai.com</a></div>
<div class="ref-item"><a id="ref-JYW24" href="#ref-JYW24-back">[JYW+24]</a> Jimenez, C. E., Yang, J., Wettig, A., Yao, S., Pei, K., Press, O., & Narasimhan, K. 2024. "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" <em>ICLR 2024</em>. Available at <a href="https://arxiv.org/abs/2310.06770" target="_blank">arxiv.org</a></div>
</div>

## [2022. RLHF aligns code models to programmer intent](#table-of-contents) {#ai-rlhf-2022}

### Problem. Base models generate plausible code that often misses intent

Models optimized for next-token prediction did not reliably follow instructions or match user preference. A programmer asking to "add error handling" might receive technically valid code that didn't match their error-handling conventions. Early Copilot and Codex produced code that was statistically plausible but often misaligned with intent.

### Solution. Reward models trained on human preferences align output to what programmers want

RLHF (reinforcement learning from human feedback) trained reward models on human preferences and used reinforcement learning to favor outputs humans rated higher. InstructGPT (March 2022) <a href="#ref-Ouy22" id="ref-Ouy22-back">[Ouy+22]</a> demonstrated the approach. ChatGPT (November 2022) applied it at scale. The same technique improved code assistants. Models became better at following instructions and matching programmer intent.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Ouy22" href="#ref-Ouy22-back">[Ouy+22]</a> Ouyang, L., et al. 2022. "Training language models to follow instructions with human feedback." <em>Advances in NeurIPS</em> 35. Available at <a href="https://arxiv.org/abs/2203.02155" target="_blank">arxiv.org</a></div>
</div>

## [2023. RAG grounds code generation in the codebase](#table-of-contents) {#ai-rag-2022}

### Problem. Context windows are too small to encompass real codebases

Early models had 2k–8k token context windows, insufficient for real codebases. A programmer fixing a bug needed relevant files, but the 4k–8k token limits of 2021 could not hold them. A programmer debugging a service that spanned 15 files across 20,000 lines couldn't fit the relevant context.

### Solution. Retrieval augments the prompt with relevant files and documentation

RAG (retrieval-augmented generation) retrieved relevant files, documentation, or code snippets and injected them into the prompt. The model's output was grounded in actual codebase structure rather than generic patterns. Instead of relying only on pretrained knowledge, tools could pull from the repository. Cursor, GitHub Copilot Chat, and others adopted RAG for codebase search. Programmers could point the assistant at a repo and get answers grounded in its structure and contents.

## [2023–2024. Long-context and agentic interfaces expand scope](#table-of-contents) {#ai-agentic-2023}

### Problem. RAG is a workaround. Assistants are reactive, not proactive

RAG addressed context limits by retrieving a subset of the codebase, but it was a workaround. Assistants were reactive. They completed what the programmer typed. They did not search the codebase, run tests, or iterate on feedback. A single request like "fix the failing tests" required the programmer to run tests, read errors, and re-prompt by hand.

### Solution. Native long context and agentic tool use let the assistant plan, act, and iterate

By 2024, models supported 100k–200k tokens natively. Entire moderate-sized repositories could fit in context. The model could reason about architectural patterns, cross-file dependencies, and project-wide conventions without retrieval heuristics. Agentic interfaces went further. Cursor, Devin, and Claude with computer use could execute commands, run tests, read error messages, edit files, and iterate. The assistant could plan ("I need to understand this API"), act (search docs, read implementation), observe (parse results), and replan. A single request like "fix the failing tests" could trigger a multi-step workflow (run tests, read failures, locate relevant code, generate fixes, rerun tests, iterate). Multi-agent systems (MetaGPT, Devin) assigned roles to collaborating agents.

## [2024. Extended reasoning and enterprise fine-tuning complete the AI coding assistant stack](#table-of-contents) {#ai-reasoning-2024}

### Problem. Standard models commit to each token before seeing the consequences

Standard models generated tokens left-to-right, committing to each token before seeing the consequences. For complex debugging or architectural decisions, this limited quality. Separately, general-purpose models did not reflect an organization's codebase conventions or proprietary patterns.

### Solution. Extended-reasoning models and enterprise fine-tuning complete the stack

Extended-reasoning models like o1 spent more inference compute on internal chain-of-thought before outputting code. For complex tasks, this produced substantially better results. Enterprise fine-tuning (Copilot Enterprise 2024) <a href="#ref-Git24" id="ref-Git24-back">[Git24]</a> let organizations customize on proprietary codebases. These layers (RLHF, RAG, long context, agentic tool use, extended reasoning, and enterprise fine-tuning) compound. A programmer using Claude 4 or o1 by 2025 works with a fundamentally different system than Copilot in 2021, not because the base model is bigger, but because the entire stack around it evolved.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-Git24" href="#ref-Git24-back">[Git24]</a> GitHub. 2024. "Fine-tuned models are now in limited public beta for GitHub Copilot Enterprise." Available at <a href="https://github.blog/news-insights/product-news/fine-tuned-models-are-now-in-limited-public-beta-for-github-copilot-enterprise" target="_blank">github.blog</a></div>
</div>

## [Discussion. The impact of AI coding in software engineering has yet to unfold](#table-of-contents) {#ai-discussion}

### English is not a programming language

One obstacle persists regardless of how good AI gets at testing and verification. English is not a programming language. Programming languages exist for two reasons. They eliminate ambiguity for machines, and they organize human thought.

Natural language is inherently ambiguous. Berry and Kamsties note that ambiguity in natural language requirements is inescapable; different readers may understand different things from the same text <a href="#ref-BK04" id="ref-BK04-back">[BK04]</a>. Consider "sort the list of customers by priority." Does that mean sort by a priority field ascending? Descending? Filter to show high-priority first, then medium, then low? The English is underspecified. A compiler produces the same output for the same source every time. The same English prompt yields different code from an LLM on different runs. As Meyer argues, programmers save the source code, not the prompts, because prompts cannot serve as reproducible specification <a href="#ref-Mey25" id="ref-Mey25-back">[Mey25]</a>.

But precision for machines is only half of it. Programming languages force precision in human thinking. Writing `customers.sort(key=lambda x: x.priority, reverse=True)` forces the programmer to answer. What is the data structure? What field holds priority? What does "higher" mean? The language demands answers. Without it, we remain vague. The discipline of expressing logic in code makes the logic itself clearer.

Work underway addresses both problems. DSLs and declarative languages reduce ambiguity by narrowing the gap between domain intent and executable code. PDL (Prompt Declaration Language) applies a typed approach to orchestrating LLM applications <a href="#ref-VMH24" id="ref-VMH24-back">[VMH+24]</a>. SpecGen uses LLMs to generate formal specifications that can be verified <a href="#ref-Spe24" id="ref-Spe24-back">[Spe24]</a>. These treat the LLM as a bridge to formal specification, not a replacement. The formal artifact remains the source of truth.

Intentional Software, Molybdenum, and generations of research aimed to let humans specify intent without writing code. The dream persists. So does the gap.

### What are we optimizing for?

The history in this article suggests that programming languages were designed for different priorities at different times. FORTRAN optimized for machine efficiency. Python optimized for programmer time and readability. Rust optimizes for memory safety without garbage collection. A question the AI era raises is what we optimize for now. Readability? Raw performance? Security? And for AI assistants themselves, which languages should they generate? The answer may not align with human preferences. Models are trained on what exists. The languages with the most data (JavaScript, Python, Java, C++) are the ones models know best. That favors the languages that dominate open source and Stack Overflow, not necessarily the languages best suited to a given task. Whether AI will reinforce the popularity of data-rich languages or eventually learn to generate lesser-known ones well is an open question.

### The language landscape

Programming languages are not consolidating into fewer options. Python rose to the top in 2024, driven by AI and data science <a href="#ref-Git24oct" id="ref-Git24oct-back">[Git24oct]</a>. Rust and Go continue to grow. TypeScript extends JavaScript. The AI era favors specialization by use case. Python for ML pipelines, Rust for systems components, JavaScript for the web. Different tasks demand different tools. The infrastructure stack is multilayered rather than unified.

### Code quality, security, and adoption

Other trends deserve attention. Studies report that code churn is projected to double in AI-assisted codebases compared to pre-AI baselines, with more copy-pasted code and patterns resembling work from less experienced contributors <a href="#ref-Har24" id="ref-Har24-back">[Har24]</a>. Copilot and similar tools have been found to generate vulnerable code in a substantial fraction of security-sensitive scenarios <a href="#ref-PPL22" id="ref-PPL22-back">[PPL22]</a>. Adoption is high. So is the need for rigorous review. The tool is not the process.

### Where AI fits: internet, cloud, and SaaS

The introductory claims, that AI is "the best thing since the internet," "as big as cloud," or that "SaaS is dead," can be assessed against the transitions documented above. The internet (TCP/IP, 1983) became a universal substrate. Cloud computing (AWS EC2, 2006) transformed infrastructure from capital expenditure to operational expense and enabled elastic scaling. Both altered what could be built and how software reached users. AI coding assistants operate at a different layer. They change how code is produced, not the substrate or platform itself. Whether that remains a productivity tool for programmers or extends to non-programmers writing their own software is an empirical question. The economic logic of SaaS is instructive. SaaS exists because the cost of building, maintaining, and operating software in-house has historically exceeded the cost of subscribing. Vendors amortize development, maintenance, security, and compliance across many customers. AI may lower the cost of initial construction, but it does not by itself reduce the cost of ongoing maintenance, integration across systems, or compliance. Whether end users can free themselves from SaaS depends on whether the total cost of AI-assisted in-house development falls below the cost of subscription for a given use case. Bacchelli and Bird <a href="#ref-BB13" id="ref-BB13-back">[BB13]</a> find that the expertise to verify code closely matches the expertise to write it, which implies that verification costs remain nontrivial. The framework does not settle whether AI is "as big as" the internet or cloud. It provides a lens for comparing the kind of change each represents and for reasoning about the conditions under which SaaS remains economically viable.

### Open source and AI

Empirical work on open source suggests both creation and maintenance benefit from AI. Hoffmann et al. find that maintainers with access to GitHub Copilot increase coding activity and reduce project management load; effects persist for at least two years <a href="#ref-HBB24" id="ref-HBB24-back">[HBB24]</a>. Yeverechyahu et al., using the rollout of Copilot support for Python but not R, show that maintenance-related contributions (iterative work on others' code) rise more than origination contributions (new code) <a href="#ref-YMO24" id="ref-YMO24-back">[YMO24]</a>. AI appears to lower the cost of both creation and maintenance, with a larger effect on maintenance. Whether that pattern holds as models evolve is an empirical question.

### AI and past abstraction layers

A distinct question is whether AI can improve the abstraction layers described in this article. Learned query optimizers have been shown to outperform classical optimizers on some workloads; GenJoin consistently outperforms PostgreSQL on standard benchmarks <a href="#ref-Gen24" id="ref-Gen24-back">[Gen24]</a>. In compilers, models trained on LLVM IR and assembly reach a substantial fraction of autotuning search potential <a href="#ref-Met24" id="ref-Met24-back">[Met24]</a>. In cloud infrastructure, methods combining demand prediction with reinforcement learning for resource allocation report utilization gains and cost improvements compared to rule-based autoscaling. These results demonstrate incremental improvements within existing abstractions. Whether AI will yield qualitatively new abstractions (e.g., new models of concurrency, persistence, or distribution) is unresolved. Past transitions such as relational algebra, garbage collection, or TCP/IP required conceptual shifts. The literature does not yet demonstrate AI producing such shifts. The cost framework implies that new abstractions emerge when the cost of the incumbent exceeds the cost of the alternative. AI may lower the cost of exploring new designs, but whether that leads to meaningfully better cloud, databases, or languages is an empirical question for which the evidence is currently limited.

### Knowledge that was eliminated

Looking back at the history, each abstraction eliminated entire areas of knowledge that programmers no longer needed. FORTRAN eliminated the need to understand instruction timing, register allocation, and machine-specific assembly. Structured programming eliminated the need to reason about arbitrary control flow and spaghetti GOTO. Relational databases eliminated the need to know physical storage layout and file structures. Unix eliminated the need to understand vendor-specific system calls and device interfaces. C eliminated the need to write per-architecture assembly for kernels and drivers. Garbage collection eliminated manual memory management and whole categories of memory errors. TCP/IP eliminated the need to understand packet switching, routing algorithms, and network topology. The Web eliminated the need to reason about distribution logistics, physical media, and per-machine installation. In each case, the abstraction was sound. Programmers could assume it worked. They did not need to verify the layer below. How does that change with the AI revolution? AI coding assistants reduce the effort of writing code, but the output still requires verification. The expertise to verify, as Bacchelli and Bird found, matches the expertise to write. Past abstractions eliminated knowledge. AI may accelerate production without eliminating the knowledge required to judge the result. Whether that distinction holds as tools evolve is an open question.

<div class="section-references">
<strong>References</strong>
<div class="ref-item"><a id="ref-BK04" href="#ref-BK04-back">[BK04]</a> Berry, D. M. & Kamsties, E. 2004. "Ambiguity in Requirements Specification." In <em>Perspectives on Software Requirements</em>, Springer, 7-44. Available at <a href="https://link.springer.com/chapter/10.1007/978-1-4615-0465-8_2" target="_blank">link.springer.com</a></div>
<div class="ref-item"><a id="ref-Mey25" href="#ref-Mey25-back">[Mey25]</a> Meyer, C. 2025. "English Isn't a Programming Language." <em>Substack</em>. Available at <a href="https://csmeyer.substack.com/p/english-isnt-a-programming-language" target="_blank">csmeyer.substack.com</a></div>
<div class="ref-item"><a id="ref-VMH24" href="#ref-VMH24-back">[VMH+24]</a> Vaziri, M., Mandel, L., Spiess, C., & Hirzel, M. 2024. "PDL: A Declarative Prompt Programming Language." <em>arXiv:2410.19135</em>. Available at <a href="https://arxiv.org/abs/2410.19135" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-Spe24" href="#ref-Spe24-back">[Spe24]</a> Ma, L., Liu, S., Li, Y., Xie, X., & Bu, L. 2024. "SpecGen: Automated Generation of Formal Program Specifications via Large Language Models." <em>arXiv:2401.08807</em>. Available at <a href="https://arxiv.org/abs/2401.08807" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-Git24oct" href="#ref-Git24oct-back">[Git24oct]</a> GitHub. 2024. "Octoverse 2024: AI leads Python to top language." Available at <a href="https://github.blog/news-insights/octoverse/octoverse-2024" target="_blank">github.blog</a></div>
<div class="ref-item"><a id="ref-Har24" href="#ref-Har24-back">[Har24]</a> Harding, W. & GitClear. 2024. "Coding on Copilot: 2023 Data Suggests Downward Pressure on Code Quality." Available at <a href="https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality" target="_blank">gitclear.com</a></div>
<div class="ref-item"><a id="ref-PPL22" href="#ref-PPL22-back">[PPL22]</a> Pearce, H., Ahmad, B., Tan, B., Dolan-Gavitt, B., & Karri, R. 2022. "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions." <em>2022 IEEE Symposium on Security and Privacy</em>. Available at <a href="https://arxiv.org/abs/2108.09293" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-BB13" href="#ref-BB13-back">[BB13]</a> Bacchelli, A. & Bird, C. 2013. "Expectations, Outcomes, and Challenges of Modern Code Review." <em>Proceedings of ICSE</em>, 712-721. Available at <a href="https://dl.acm.org/doi/10.1109/ICSE.2013.6606617" target="_blank">dl.acm.org</a></div>
<div class="ref-item"><a id="ref-Gen24" href="#ref-Gen24-back">[Gen24]</a> Sulimov, P., Lehmann, C., & Stockinger, K. 2024. "GenJoin: Conditional Generative Plan-to-Plan Query Optimizer." <em>arXiv:2411.04525</em>. Available at <a href="https://arxiv.org/abs/2411.04525" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-HBB24" href="#ref-HBB24-back">[HBB24]</a> Hoffmann, M., Boysel, S., et al. 2024. "Generative AI and the Nature of Work." <em>SSRN</em>. Available at <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5007084" target="_blank">papers.ssrn.com</a></div>
<div class="ref-item"><a id="ref-Met24" href="#ref-Met24-back">[Met24]</a> Meta. 2024. "LLM Compiler: Foundation Models of Compiler Optimization." <em>arXiv:2407.02524</em>. Available at <a href="https://arxiv.org/abs/2407.02524" target="_blank">arxiv.org</a></div>
<div class="ref-item"><a id="ref-YMO24" href="#ref-YMO24-back">[YMO24]</a> Yeverechyahu, D., Mayya, R., & Oestreicher-Singer, G. 2024. "The Impact of Large Language Models on Open-source Innovation." <em>SSRN</em>. Available at <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4684662" target="_blank">papers.ssrn.com</a></div>
</div>

## [Conclusion](#table-of-contents) {#conclusion}

Seven decades of software engineering followed consistent economic logic. When the cost of manual work exceeded the cost of automation, the abstraction won. The motivations varied, but each was a form of that cost.

Programmer time drove most of it (FORTRAN when programmers were scarce, IDEs when mechanical refactoring consumed hours, package managers when dependency management was manual, Spring when J2EE boilerplate dominated, Node.js when context-switching cost time, REST when SOAP required thousands of lines of configuration, AI assistants when boilerplate and documentation lookup consumed programmer time). And sometimes even performance didn't matter as much as programmer productivity (Python, Rails, Django).

Portability mattered when rewriting for each platform cost too much (Unix, C). Human error mattered when bugs cost more than prevention (structured programming, garbage collection, STL, TypeScript). Cost mattered when capital blocked adoption (Cloud, Serverless, ML frameworks). Scale mattered when the manual approach couldn't reach it (NoSQL, MapReduce). Sometimes the abstraction delivered better performance than hand-written code (compilers, SQL optimizers, generational GC).

These motivations produced abstractions that were complete and sound by construction. Programmers didn't need to verify them. The achievements were eliminating entire categories of errors, increasing development speed, and making software feasible at scale. The layers below became infrastructure that programmers could assume rather than verify.

AI coding assistants share that motivation but differ in one characteristic. They reduce programmer time on mechanical tasks (boilerplate, documentation lookup, navigating codebases). The tradeoff is that output requires verification. Language models predict plausible code from statistical patterns, not formal correctness reasoning. Unlike compilers or SQL optimizers, the abstraction is not sound by construction.

Given that verification is required, the question "what happens at 90% or 95% accuracy?" misunderstands what the remaining percentage represents. Problems solved first have clear specifications and objective correctness criteria. The problems that remain are fundamentally different. There is also the risk of automation complacency. When a system is correct 90% of the time, humans stop scrutinizing carefully. A 90% accurate AI might paradoxically lead to worse outcomes than a 50% accurate one. The critical skill becomes knowing when to trust AI output and when to verify deeply.

As Bacchelli and Bird found, the expertise to verify code closely matches the expertise to write it <a href="#ref-BB13" id="ref-BB13-back-2">[BB13]</a>. Education must evolve without abandoning fundamentals. Algorithms, data structures, system design, and debugging remain essential for verification. Pedagogy may emphasize code review, architectural thinking, and specification clarity.

The next decade will see rapid AI improvement alongside persistent verification challenges. Generation can be automated. Verification requires human judgment grounded in expertise. Software engineering will focus more on problems that automation has not yet addressed (ambiguity, tradeoffs, and judgment in novel situations). Better formal methods combined with LLMs may eventually alter this balance, but for the foreseeable future verification remains central.

<div class="note-container post-container"> 
<strong>Published version.</strong> We're planning a published edition and would be grateful for your help. If you'd like to be a reviewer, please <a href="/reviewer-signup/">sign up here</a>.
</div>

<div class="crosspost-container post-container">
This article has been cross-posted to <a href="https://djpardis.medium.com/" target="_blank" rel="noopener">Medium</a>.
</div>