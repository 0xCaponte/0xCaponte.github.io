---
layout: post
title: "Flag Emojis in Windows Browsers"
image: /resources/images/og-image.png
cover: https://r2.caponte.io/resources/images/posts/flags/cover.webp
description: Rendering flag emojis in the browser should be straightforward. However, Windows deliberately omits flag emojis from its default fonts, causing browsers to fallback to two-letter country codes instead. Here's an easy and elegant workaround for this issue.
author: Carlos Aponte
date: 2024-01-25 00:00:00
tags: ["DIY", "Svelte"]
---

<!-- Flag Emojis in Windows Browsers -->




## Problem

Windows, as it turns out, does not include Flag emojis in its default fonts. 

![non_rendering_flags](https://r2.caponte.io/resources/images/posts/flags/non_rendering_flags.webp)
<figcaption align = "center">Initial Flag Emoji Rendering as 2-Letter Country Code.</figcaption>

It took me some time to pinpoint the exact reason for the missing emojis, as other emojis were rendering correctly, and country flags are standard in most use-cases. Initially, I was testing only in Chrome, where some other emojis were rendering correctly. I suspected a CSS or a SvelteKit issue, but when I tested with Firefox and saw the flags, I knew that the problem was somewhere else.

Googling for more specific combinations along the lines of: flags + chrome + windows, produced multiple pages referring to this being a Windows 10+ issue, a problem for which Firefox had a workaround but that other browsers overlooked.

## Basic Solution

The main solution suggested is to use PNG images instead of emojis, relying only on basic HTML and CSS. Another suggestion, which I find simple and elegant, came from this [post by Frank Prins](https://prinsfrank.nl/2021/01/25/Non-existing-flag-emojis-on-windows). Here he proposes the use of custom fonts with emojis for only the flag codes.

Following his explanation this worked just fine. I got to see nice flags everywhere. However, I also got to download 10 MB of fonts, something that could surely be improved.

## My Take - Solution Improvements:

Instead of using the whole font file, which is approximately 10 MB, I decided to subset it, which brought the size down to around 830 KB. This subset contains only the flag emojis, which are between the Unicode 1F1E6 and1F1FF.

### Here is how

1. Get the complete font from [Noto Emoji](https://github.com/googlefonts/noto-emoji)

2. Install the needed python libraries 

	    pip install fonttools brotli zopfli

3. Create the font sub-set. I am only producing Woff2 as it has [97.8% support rate.](https://caniuse.com/?search=woff2)

	    pyftsubset ./NotoColorEmoji.ttf --unicodes=1F1E6-1F1FF --output-file=Flags.woff2 --flavor=woff2

And that is it, now we just add the new font to our project and use it as a font-face.

![rendering_flags](https://r2.caponte.io/resources/images/posts/flags/rendering_flags.webp)
<figcaption align = "center">Final Flag Emoji Rendering</figcaption>

### Final code 

**Global CSS:**
```css
@font-face {
  font-family: 'FlagEmoji';
  unicode-range: U+1F1E6-1F1FF; /* Range for flag emojis */
  src: url("/fonts/Flags.woff2") format('woff2');
}
```

**Example Usage in a SvelteKit Component:**
```html
<script>
    let flags = ['🇦🇺', '🇧🇷', '🇨🇦', '🇩🇪', '🇯🇵', '🇮🇳', '🇫🇷', '🇿🇦', '🇪🇸', '🇺🇸'];
</script>

{#each flags as flag, index}

    <span class="emoji-flag" style="font-family: 'FlagEmoji';">{flag}</span>{index < flags.length - 1 ? ' - ' : ''}
{/each}
```
