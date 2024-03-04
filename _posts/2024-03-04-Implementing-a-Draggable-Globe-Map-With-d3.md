---
layout: post
title: "Implementing a Draggable Globe Map With d3"
image: /resources/images/og-image.png
cover: https://r2.caponte.io/resources/images/posts/globe/cover.webp
description: A simple implementation of a draggable globe map for Sveltekit. This mobile-friendly map is build using d3 and can be easily integrated into different JavaScript frameworks.
author: Carlos Aponte
date: 2024-03-04 00:00:00
tags: ["DIY", "SvelteKit", "JS"]
---

## Context and Problem: 
For the last couple of months I have been working on the Language Map, a small side project of mine in which you can visualize the reach of the languages you speak, both in terms of speakers and countries.

The first version of the [Language Map](https://languagemap.world/) had a flat world map as main element. While this design worked well on larger screens, it was horrible on mobile devices. Thinking of how to transform the UI, a globe seemed like a better fit for the limited screen space; you still have all the countries, just not all at once. 

Refactoring the existing code to include the mobile view of a globe didn't take more than 30 minutes, 95% of the code was the same, so it was just a matter of moving the common parts to a helper class, and render the maps based on screen size. This was a small victory, but the real challenge came when adding rotation to the globe.

## Basic Solution: 
The idea is that the projection used for the map can be rotated to a set of coordinates, and that the initial and final point of the dragging action are used to calculate the new set of coordinates.

The most promising way of doing this was integrating the drag library from [d3.js](https://d3js.org/) (the same set of libraries that generates the map), which would handle the movement event and could deliver the difference in the movement coordinates.

However, even when I found some examples of this, I had some issues with them:

- Some looked awesome but lacked source code to use as reference
- Some reinvented the wheel by partially implementing complex logic to manage the coordinates and the dragging.
- Just examples just didn't seem to work consistently on mobile, having a console.log breaking the functionality.

Be it that because the examples I found were not made for [SvelteKit](https://kit.svelte.dev/) or because some other oversight on my part, I spent a couple of hours tweaking and testing without getting a stable version that worked on all devices. At the end, I started over with a fresh component and went step by step:

1. Created the basic globe.
2. Integrated the drag library and logged the movements to check that it worked.
3. Added a transparent layer over the globe and set the drag action to it. This made the entire surface draggable, and not just the globe's paths.
4. Calculated the new rotation based on the drag coordinates and re-rendered the map. 

<div>
  <video autoplay loop muted playsinline>
    <source src="https://r2.caponte.io/resources/videos/posts/globe/globe_rotation.mp4" type="video/mp4">
    Globe Rotation on Drag.
  </video>
</div>


As you can see on the video, this worked. What was the problem? What was the difference? I can not tell for sure, I believe it was the way Svelte's reactivity works and how I was updating the values. Other than that, both code before and after use the same basic building blocks and strategies.

## Code & Live Demo

Here is a minimum version of the [SvelteKit](https://kit.svelte.dev/) code, as well as a [live demo](https://svelte.dev/repl/579ef1d1610e4a4dab0ad21d31482913?version=4.1.1) that you can interact with

```javascript
<script>
	import { geoOrthographic, geoPath } from 'd3-geo';
	import { drag } from 'd3-drag';
	import { json } from 'd3-fetch';
	import { select } from 'd3-selection';
	import { onMount } from 'svelte';
	import { feature, mesh } from 'topojson-client';

	// Map setup & rendering
	let projection = geoOrthographic();
	let path = geoPath().projection(projection);
	let rotation = [0, 0, 0]; // Initial rotation
	let sphere = { type: 'Sphere' }; // Globe Outline
	let land, borders;

	// Reactive code to update on map dragging
	$: if (projection) {
		projection.rotate(rotation);
		path = geoPath().projection(projection);
	}

	/**
	* Calculates the rotation of the globe when the user drags on the map
	*
	* @param event
	*/
	function dragged(event) {
		const dx = event.dx;
		const dy = event.dy;
		const currentRotation = projection.rotate();
		const radius = projection.scale();
		const scale = 360 / (2 * Math.PI * radius);

		rotation = [
			currentRotation[0] + dx * scale,
			currentRotation[1] - dy * scale,
			currentRotation[2]
		];

		projection.rotate(rotation);
	}

	onMount(async () => {
		// Geo Data from World-Atlas
		const world = await json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
		land = feature(world, world.objects.land);
		borders = mesh(world, world.objects.countries, (a, b) => a !== b);

		const globe = select('.globe-path');

		// Define drag behavior
		const dragHandler = drag().on('drag', (event) => {
			dragged({ dx: event.dx, dy: event.dy });
		});

		// Apply the drag behavior
		dragHandler(globe);
	});
</script>

<svg width="100%" height="100%" viewBox="0 0 960 960" preserveAspectRatio="xMidYMid meet">
	
	<!-- Globe outline with transparent fill to make it completly draggable -->
	<path d={path(sphere)} fill="rgba(0,0,0,0)" stroke="#000" class="globe-path" />

	<!-- Land Outline -->
	<path d={path(land)} fill="none" stroke="#000" />

	<!--Countries' Borders -->
	<path d={path(borders)} fill="none" stroke="#000" />
</svg>
```







