---
title: "From Figma to production without losing the soul"
date: "2026-04-08"
excerpt: "A practical handoff workflow I've refined over two years of shipping web interfaces."
cover: "/images/work1.jpg"
tags: ["frontend", "figma"]
---

## The gap nobody talks about

There's a moment in every project where a beautiful Figma file meets the realities of the browser. Spacing snaps to
the nearest 4. Fonts subset differently. The hero image is suddenly 2.3MB. Designs lose their soul not in one big
collapse, but in a hundred tiny compromises.

Here's the workflow I use to keep the soul intact.

### 1. Build tokens first, screens second

Before I implement a single screen, I translate the Figma styles into CSS variables — colors, type scale, radii,
shadows. If something can't be reduced to a token, it's probably a one-off and I flag it.

### 2. One component, every state

I refuse to ship a component without hover, focus, disabled, and loading states. If the design didn't include them, I
make them up — and send the screenshots back to the designer for approval.

### 3. Motion as a system, not a sprinkle

Three durations, two easings, max. Everything else inherits from them. Boring? Yes. Coherent? Also yes.

> Constraints aren't the enemy of craft — they're the scaffolding.
