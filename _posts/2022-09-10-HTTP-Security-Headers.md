---
layout: post
title: "Setting HTTP Security Headers With Cloudflare"
image: /resources/images/posts/http-security-headers/cover.webp
description: GitHub Pages offers free hosting for static sites; however, it doesn't provide any way to control the HTTP headers. This limitation directly affects multiple configuration options, and opens the door to potential vulnerabilities. With that in mind, I decided to work around it and add extra security to my website by using Cloudflare’s to control my HTTP Security Headers.
author: Carlos Aponte
date: 2022-09-10 00:00:00
tags: ["AppSec", "HTTP-Headers"]
---

<!-- # Setting HTTP Security Headers With Cloudflare -->

Setting the right security-oriented HTTP headers can partially protect a website from protocol downgrades, side-channel attacks, cross-site scripting or man in the middle attacks, etc. 

That is why, even when I am aware that a static website has reduced exposure to these vulnerabilities, I decided to secure my website as much as reasonably possible by applying an adequate HTTP security header configuration.

The approach, tools, and configurations presented in this post can also be taken, and with case-specific modifications, be used to protect other websites, being them static or dynamic ones.

For this, the main references were: [OWASP’s Secure Headers Project](https://owasp.org/www-project-secure-headers), [Mozilla's MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), and [Tanya Janca's book Alice And Bob Learn Application Security](https://shehackspurple.ca/books/). Parallel to this, the way to measure progress was to test the website after each significant change using [Scott Helme’s security headers tests](https://securityheaders.com).


![score_baseline](/resources/images/posts/http-security-headers/score_baseline.webp)
<figcaption align = "center">Baseline - "F" score after fresh GitHub + Cloudflare deployment.</figcaption>


## Setting-Up the Security Headers

Cloudflare acts as my DNS and CDN provider, giving me a point where I can reach and change the requests and responses that go through their network. 

In my case, these changes take two forms. First, an easy security win in the form of HTTPS, and second, the application of Transform Rules to the HTTP headers.

### 1 - Strict Transport Security (HSTS)  
 
The Strict Transport Security header or HSTS forces the user agent to use HTTPS and ignore any HTTP request. 

This configuration is easily applicable as it is found on the website's dashboard in both GitHub and Cloudflare.

In Cloudflare, go to:

	Website’s dashboard -> SSL / TLS ->  Edge Certificates

Here, there are two actions to be taken:

1. Activate “Always Use HTTPS”, which will automatically redirect all HTTP requests to HTTPS. 

2. Go into the detailed "HSTS Settings", activate it, and include all subdomains for at least 1 year. Here, we can also activate [preloading](https://scotthelme.co.uk/hsts-preloading/) and the extra header X-Content-Type-Options.

Two comments about these two last points in the HSTS settings:

- Preloading is risky because taking the website off the preload list can take a long time. However, as my website implements HTTPS from the get-go and this is unlikely to change in the future, I decided to activate this option and added my website to [Google’s preloading list]([https://hstspreload.org).

- By setting **X-Content-Type-Options: No-Sniff** we help prevent security concerns related to MIME-Sniffing. In other words, by instructing the user agent to trust the MIME type that we say the resource has, and not try to guess what they are.



![hsts_final_configuration](/resources/images/posts/http-security-headers/hsts_final_configuration.webp)
<figcaption align = "center">Final HSTS configuration.</figcaption>


As we can see, with these two HTTPS changes retesting of the website already gave an improved score.

![score_hsts](/resources/images/posts/http-security-headers/score_hsts.webp)
<figcaption align = "center">"D" Score after HSTS configuration.</figcaption>

### 2 - Transform Rules For The Security Headers

Following the ideas from [Cloudflare]([https://blog.cloudflare.com/transform-http-response-headers) and [Paramdeo Singh](https://paramdeo.com/blog/enforcing-security-headers-with-cloudflare-transform-rules), I used Transform Rules to change the HTTP response headers of my website.

In Cloudflare, go to:

	Website’s dashboard -> Rules -> Transform Rules 

All HTTP Security Headers are to be changed in one Transform Rule, one that changes response headers.

![create_transform_rules](/resources/images/posts/http-security-headers/create_transform_rules.webp)
<figcaption align = "center">Creating a Transform Rule to change response headers.</figcaption>

Inside the rule definition give it a name and specify how to match the responses that it should be applied to. In this case, I wanted to secure all responses, so the broad criteria of matching all responses that contain the website's hostname was enough.

![rule_name_and_match](/resources/images/posts/http-security-headers/rule_name_and_match.webp)
<figcaption align = "center">Matching transform rule.</figcaption>

Having taken care of that I created a new **Set Static** rule for each header to be set or changed. As mentioned at the beginning, I retested the website as I was setting each header, which allowed me to see how the score slowly improved with each change.

Here, I won't go over each of the headers as the [OWASP’s Secure Headers Project](https://owasp.org/www-project-secure-headers) lists and explains most of them. Instead, I will just cover the ones whose functions weren't clear to me or whose values weren't so straightforward to set. These headers were:

**- Expect-CT** 

This header is deprecated and obsolete but Cloudflare still adds it to the responses based on my certificate. I looked into this and decided to let it be as [according to the IETF](https://datatracker.ietf.org/doc/rfc9163/) this can still provide information about insecure connections.

**- Permissions-Policy** 

This header is not covered by [OWASP’s Secure Headers Project](https://owasp.org/www-project-secure-headers) but was brought to my attention by the suggestions made by [Scott Helme’s security headers tests](https://securityheaders.com), [his post about it](https://scotthelme.co.uk/goodbye-feature-policy-and-hello-permissions-policy/), and [this W3C's explanation.](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md)

In summary, this header allows us to enable or disable access to browser features and APIs, for example, the accelerometer, keyboard-map or the microphone. As you can imagine, this is very use case specific but can be customized by using the [Permissions-Policy header generator made by Todd Wiggins Software](https://www.permissionspolicy.com/).

**- Referrer-Policy**

	Referrer-Policy: strict-origin-when-cross-origin

Grants more privacy to the users as it will just send the site's main URL as referrer and not exactly where the user was. Furthermore, if the redirection goes to an HTTP website (downgrading security) this setting won't set any referrer information. For example:

| Origin                        | Referrer            |
| ----------------------------- | ------------------- |
| https://caponte.io/blog/post1 | https://caponte.io/ |

**- X-Frame-Options**

	X-Frame-Options: deny

Prevents the website to be loaded into frames. 

This could make sense or be problematic depending on your use cases. In my case, the only issue that I faced was that using online tools to test the website's appearance on mobile devices was no longer possible as most of them render the website inside frames. As a workaround, I just removed this header while testing the website and re-enabled it later on.

**- Content Security Policy (CSP)** 

This header controls what sources can be loaded on the website and which ones can not. In practice, this means that a misconfiguration on the side of too strict a policy can break the website's functionalities, while a too flexible configuration can open the door to XSS vulnerabilities. 

This level of detailed configuration is what made it the most complicated header to set and I decided to describe my approach on [a separe post about Content-Security-Policy](https://caponte.io/blog/Content-Security-Policy/). 

### Final Transform Rule and Score
Having explained these five specific cases, here is the final transform rule that was created:

![rule_final](/resources/images/posts/http-security-headers/rule_final.webp)
<figcaption align = "center">Final transform rule.</figcaption>


After activating the transform rule retesting the website finally gave an "A" score.

![score_final](/resources/images/posts/http-security-headers/score_final.webp)
<figcaption align = "center">Final "A" score.</figcaption>

While in theory there is the "A+" grade, "A" is a pretty good one too, as even the [testing website](https://securityheaders.com), [Black Hills](blackhillsinfosec.com/) or [OWASP](owasp.org/) don't reach "A+". The reason, as mentioned before, is that it is not easy to achieve an air-tight Content-Security-Policy that does not rely on: 
	
	unsafe-inline
	

## Final Notes

**- Workers Instead of Transform Rules**

Both [Cloudflare](https://developers.cloudflare.com/workers/examples/security-headers) and [Black Hills]([https://www.blackhillsinfosec.com/fixing-content-security-policies-with-cloudflare-workers) talk about using workers to set the security headers. I looked into this as a more programming-oriented solution but as the worker needs to run with each request, this translates into potential extra costs.

**- Cloudflare's Managed Transform Rule for Security Headers**

If you go to:
	
	Transform Rules -> Managed Transforms
	
you will see that there is already a pre-defined rule that addresses security headers. However, [the values used by this rule](https://developers.cloudflare.com/rules/transform/managed-transforms/reference) are in my opinion inadequate or obsolete, for which I skipped this and addressed all security headers in my own defined rules.

**- Hosting Alternatives**

Some other free hosting providers like [Netlify](https://www.netlify.com/) or even [Cloudflare Pages](https://pages.cloudflare.com/) allow you to take control over the HTTP headers through the **_headers** file. This would have been another interesting approach but as I am happy with hosting my website on GitHub Pages, I didn't look further into this.


## Edits

### 12.10.2022 - New A+ Score
While writing the [post about how I set my Content-Security-Policy](https://caponte.io/blog/Content-Security-Policy/) I noticed that in my case it was easy to get rid of the

	unsafe-inline

And after doing these changes my website's grade became "A+".

![new_score](/resources/images/posts/http-security-headers/new_score.webp)
<figcaption align = "center">New "A+" score.</figcaption>
