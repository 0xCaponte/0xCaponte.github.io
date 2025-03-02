---
layout: post
title: 'AppSec - Integrating Security into Software Development'
image: /resources/images/og-image.png
cover: https://r2.caponte.io/resources/images/posts/appsecintro/cover.webp
description: Over the past three years, I have integrated Application Security (AppSec) practices into my development process. This brief overview covers key concepts I have learned and how anyone can implement them in their organization with minimal resources.
author: Carlos Aponte
date: 2025-03-02 00:00:00
tags: ['Career', 'AppSec', 'Cybersecurity']
---

Over the past three years, I have been exploring and have started to implement Application Security (AppSec) practices in my work. AppSec integrates security into the development process, helping developers identify, understand, fix, and prevent vulnerabilities in their code. It ensures security is a planned part of the application, rather than a poorly implemented afterthought for compliance's sake.

Personally, I have found this to be the most approachable way to actively work in the IT security area that I am passionate about while improving the quality of my software development work.

## Understanding The Attack Surface

The first step is understanding your attack surface and vectors. Understanding by attack surface the sum of all possible entry points an attacker could use, and by attack vectors  the specific methods they might employ. 

You can't protect what you don't know is there, and it is easier to protect against threats you are aware of. 

The easiest way to familiarize yourself with potential threats is by checking the [OWASP Top 10](https://owasp.org/www-project-top-ten/), or with the Top 10 specific to your area. These lists cover the most critical and common security risks that an application can face. Just by going over the list, you can get an idea of what areas need to be checked or improved, and how to test them better.

Going even further and approaching this in a more structured way, we can look into threat modeling. This offers a systematic approach to identifying, assessing the impact, and mitigating potential security threats. Frameworks like STRIDE, DREAD, and PASTA can guide us in better securing our applications, anticipating attack scenarios, and building more resilient systems.

But lets remember that not everything is worth defending, especially when the damage or the likelihood is minimal. Think of this as how home insurance covers fire but not meteors, they can happen but how likely is that?

##  Leveraging Automation

Automation can simplify our lives and play a crucial role in maintaining consistency. The two main areas where we can start automating our security practices are Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST).

SAST analyzes the source code itself, identifying errors and vulnerabilities before the application is even running. Tools like [SonarQube](https://www.sonarsource.com/products/sonarqube/) can be integrated into our IDE or CI/CD pipeline to enforce secure coding practices and track code quality. Also, Software Composition Analysis (SCA) tools such as Dependabot, Snyk, and OWASP Dependency-Check help detect known vulnerabilities in your dependencies, which become our vulnerabilities if we are using them. The Log4J incident at the end of 2021 is a good example of this.

DAST focuses on what happens when the app is running. Tools like OWASP ZAP, Burp Suite and Acunetix can simulate real-world attacks, throwing structured and random inputs at our application to see how it responds and to identify possible vulnerabilities, misconfigurations or errors in logic.

## Defense in Depth

There is no magic tool or solution that can solve all your security problems. Instead, we need to layer multiple solutions, each tailored and focused on its own domain. This layering makes it much more difficult for a vulnerability or an attack to be successful because if it is missed in one place, it will likely be caught in another. 

In this sense, code is also a layer. You can have all the firewalls and antivirus you want, but if you leave a test account open, there is nothing those can do about it.

## Final Thoughts & Actionable Advice

Integrating security into the development process doesn't need to cost millions or require a whole specialized team. It is about knowing the basics of your own code and how to mitigate most of the usual problems. Integrating tools to automate checks is also recommended because it helps avoid overlooking important aspects and having repetitive tasks in autopilot.

If you are going to do only one thing, I suggest familiarizing yourself with the OWASP Top 10, understand what each entry means, how and why it works. This alone puts you ahead of a significant portion of software developers when it comes to security awareness.

