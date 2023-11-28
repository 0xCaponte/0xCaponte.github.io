---
layout: post
title: "My Take on Advent of Cyber 2022 - 24 Days of Cybersecurity"
image: /resources/images/og-image.png
cover: https://r2.caponte.io/resources/images/posts/advent-of-cyber-2022/cover.webp
description: "It has been a couple of weeks since Advent of Cyber 2022 ended. However, I still wanted to write a short review of my experience as a first-timer and the challenges that I enjoyed the most. Overall, a great learning, hands-on, and beginner-friendly experience covering multiple areas of cybersecurity."
author: Carlos Aponte
date: 2023-01-18 00:00:00
tags: ["AppSec", "Cybersecurity"]
---

<!-- # My Take on Advent of Cyber 2022 - 24 Days of Cyber -->

### What is Advent of Cyber?

[Advent of Cyber 2022](https://tryhackme.com/room/adventofcyber4), organized by [Try Hack Me (THM)](https://tryhackme.com), followed the format of an advent calendar, providing daily security challenges from December 1st to December 24th. During these 24 days, we worked alongside Santa's team of security elves to save Christmas after an unknown attacker compromised their systems. These challenges came in various forms and covered a wide range of topics, including Packet Analysis, Scanning, Forensics, Open-Source Intelligence (OSINT), and AppSec.

### What I Liked

- It was a great beginner-friendly opportunity to gain hands-on experience and basic understanding in multiple cybersecurity areas.

- Each day began with an update on the story and an overview of the main concepts and tools needed to tackle the challenge. The story, while simple, was still amusing. I read it all, but I can imagine that some participants may have skipped it to focus on problem-solving.

- Following the same principles as THM's usual rooms, all necessary infrastructure was provided and easily accessible, including attack and target machines, websites, tools, and mini-games. Which allowed us to concentrate on the new concepts we were learning.

- The challenges were accompanied by walkthrough videos created in collaboration with industry professionals. Personally, I only watched one of them when struggling with the UI of a task's mini-game.

- At the end of each task, suggestions were provided for other THM rooms and modules to go deeper into the topics covered that day.

### What I Didn't Like

- For the final day, I was expecting a grand finale but was instead presented with a feedback form.

- There is no one size fit all, so it is normal that there were some topics and challenges that were not particularly interesting to me. In these cases, I simply completed the task and moved on.

### The Days I Liked the Most

**Day 3 - OSINT - Nothing escapes detective McRed**
- Using OSINT techniques, such as Google Dorking, Robots.txt, WHOIS lookups, and GitHub analysis, we figured out how Santa's website was compromised.

- **Takeaway:** pushing sensitive information to Public repositories is very bad and difficult to clean up. Check this [DZone article](https://dzone.com/articles/git-secrets-api-keys) for more info.

**Day 6 - Email Analysis - It's beginning to look a lot like phishing**
- Having the Email that started the compromise, we learned about the structure of an email, header analysis, and about tools like [emlAnalyzer](https://github.com/wahlflo/eml_analyzer), [emailrep](https://emailrep.io/), [VirusTotal](https://www.virustotal.com/gui/home/upload) and [InQuest](https://labs.inquest.net/) to further inspect suspicious emails.

- **Takeaway:** always do a quick analysis of any suspicious email and if a deeper look is needed, do it in a sandbox.

**Days 14 to 17 - Web Applications and Secure Coding**
- These days covered multiple web application vulnerabilities, most of them, present in one way or another in the [OWASP Top 10](https://owasp.org/Top10/). For example: SQL injection (SQLi), Insecure Direct Object Reference (IDOR), unrestricted file uploads, input validation, etc. 

- **Takeaway:** developers should be aware of the OWASP Top 10 and use it as a minimum security check for their applications.

**Day 22 - Attack Surface Reduction -  Threats are failing all around me**
- We analyzed the possible points of attack that Santa's infrastructure had and saw how we could tighten things down to leave as few weaknesses as possible. For example: closing unnecessary ports, improving password security, extra phishing protection, etc.

- **Takeaway:** the most secure computer is one shutdown, but as this brings little usability, the best option is to minimize the possible attack vectors and attack surface of ours systems.

**Day 23 - Defense in Depth - Mission ELFPossible: Abominable for a Day**
- We played a mini-game of physical pentesting against Santa's workshop. With each level, new layers of security were added, and it became more difficulty to achieve our objectives.

- **Takeaway:** there is no magic solutions to prevent all possible attacks, however, a great way is to build multiple layers of defense and detection, securing everything on the way from the door to our valuables.


### Some other days that I found interesting and will look into in the future are:

**Day 5 - Brute-Forcing - He knows when you're awake**: 
- Attacking passwords and brute-forcing with Hydra.

**Day 7 - CyberChef - Maldocs roasting on an open fire**

- A Swiss army knife for data analysis and manipulation, encryption, decryption, hashing, etc.

## Final Notes

[Advent of Cyber 2022](https://tryhackme.com/room/adventofcyber4) was a great way to get insight and basic hands-on experience in many topics to which I have not been giving much thought before. I would recommend this kind of activity to anyone looking to get into cybersecurity.