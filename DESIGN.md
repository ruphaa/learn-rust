---
name: "Rust Field Notes"
description: "Sky blue, coral, and indigo Rust learning with friendly serif headings."
colors:
  ink: "#42445f"
  ink-strong: "#44446e"
  muted: "#555a75"
  faint: "#60657e"
  ground: "#ffffff"
  ground-deep: "#f2f8fc"
  leaf: "#ffffff"
  leaf-raised: "#e9effa"
  line: "#dce1ed"
  line-strong: "#9babc8"
  rust: "#a63e51"
  rust-dark: "#8c3043"
  sage: "#454b7c"
  sage-deep: "#34395f"
  mint: "#d9f0f7"
  peach: "#fce3e5"
  lavender: "#e3eafa"
  yellow: "#f0f1f7"
  bad: "#a63e51"
  sky: "#b5e2ee"
  coral: "#f18489"
  periwinkle: "#8da6d4"
  action: "#f18489"
  action-hover: "#ee979c"
  action-text: "#343454"
  dark-ink: "#e5e8f4"
  dark-ink-strong: "#f2f3fd"
  dark-muted: "#c0c7df"
  dark-faint: "#aeb8d2"
  dark-ground: "#202136"
  dark-ground-deep: "#25273e"
  dark-leaf: "#2c2e48"
  dark-leaf-raised: "#383d5d"
  dark-line: "#484e6c"
  dark-line-strong: "#7c88ae"
  dark-rust: "#ffaab1"
  dark-rust-dark: "#ffc2c7"
  dark-sage: "#b5ddec"
  dark-sage-deep: "#d4eef8"
  dark-mint: "#2d4659"
  dark-peach: "#513647"
  dark-lavender: "#393e62"
  dark-yellow: "#37394e"
  dark-bad: "#ffaab1"
  dark-sky: "#35576b"
  code-ground: "#30314e"
  code-text: "#f1f3ff"
  code-line: "#636a91"
  code-hover: "#444b70"
  code-muted: "#c5cde6"
  result-action: "#b5e2ee"
  result-action-text: "#343454"
typography:
  display:
    fontFamily: "Bree Serif, Georgia, serif"
    fontSize: "clamp(2.7rem,4vw,4.4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.01em"
  lesson-title:
    fontFamily: "Bree Serif, Georgia, serif"
    fontSize: "clamp(2.3rem,4vw,3.65rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-.01em"
  headline:
    fontFamily: "Bree Serif, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: "Bree Serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: ".75rem"
    fontWeight: 650
    lineHeight: 1.7
  code:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: ".85rem"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  inline-code: "4px"
  badge: "6px"
  field: "8px"
  action: "9px"
  control: "10px"
  note: "12px"
  card: "14px"
  panel: "16px"
spacing:
  small: "8px"
  control: "12px"
  comfortable: "16px"
  grid: "20px"
  card: "24px"
  lesson-gutter: "40px"
  guide-gutter: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-complete:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
  button-complete-selected:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.sage}"
  icon-button:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: "44px"
  project-search:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    width: "185px"
  navigation-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.field}"
    padding: "9px 10px"
  navigation-item-selected:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.sage}"
  level-badge:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.badge}"
    padding: "4px 9px"
  project-card:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  answer-option:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  field-note:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.note}"
    padding: "20px"
  code-workbench:
    backgroundColor: "{colors.code-ground}"
    textColor: "{colors.code-text}"
    typography: "{typography.code}"
    rounded: "{rounded.note}"
  ownership-trace:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "26px"
---

# Design System: Rust Field Notes

## Overview

**Creative North Star: "Sky-blue Field Notes"**

The supplied medicine-presentation reference sets the theme: white ground, pale sky blue, coral, periwinkle, and deep indigo lettering. Bree Serif gives headings the same rounded slab-serif character; DM Sans keeps navigation and reading copy clear. This is a visual match in spirit, not a claim that the reference font was identified exactly. Layout, Rust content, and behavior remain unchanged.

**Key Characteristics:**

- White canvas with sky-blue learning surfaces and coral primary actions.
- Indigo serif headings, clear sans-serif body copy, and monospace code.
- Existing rounded controls, responsive navigation, lessons, and project guides.

## Colors

Indigo is the reading, link, focus, and selection color. Sky blue owns the project starting prompt; lighter blue groups ownership traces and acceptance checks. Coral identifies primary build/completion actions. Periwinkle tints advanced badges and supporting surfaces. Code panes use fixed dark indigo in both themes. Dark mode uses navy surfaces and pale blue links, retaining coral actions with dark text.

Legacy CSS names remain stable for compatibility: sage means the indigo/link role, mint means pale blue information surfaces, peach means coral-tinted feedback, and yellow means the cool neutral note surface. They no longer prescribe green, mint, peach, or yellow hues.

## Typography

Bree Serif is self-hosted in Latin at its sole 400 weight, with Georgia and serif fallbacks. Headings disable font synthesis; do not simulate a heavier weight. Main titles use -.01em tracking; smaller headings use normal tracking. DM Sans Variable supplies body text, navigation, metadata, and branding. IBM Plex Mono supplies code.

The existing size hierarchy remains: lesson titles scale from 2.3rem to 3.65rem; library titles from 2.7rem to 4.4rem with 1.1 line height. Section headings are 1.6rem; project titles are 1.4rem. Body text is 1rem/1.7. Reading prose stays near 63–68ch. At mobile widths library titles use 2.8rem. Text-size preferences remain supported.

## Layout

Preserve the fixed 270px desktop sidebar and 72px top bar. Lessons cap at 1230px; libraries and guides at 1220px. Project cards use two columns and a 20px gap. Existing breakpoints remain 1200px, 900px, 760px, and 360px. At 760px the top bar is 66px, content has 22px gutters, and navigation becomes a visibility-hidden drawer when closed.

## Elevation & Depth

Flat colored surfaces and fine borders provide hierarchy. Only the search dialog has a shadow: 0 24px 70px #23244138. Search and drawer scrims use translucent indigo. Existing 160–200ms transitions respect reduced motion.

## Shapes

Preserve the established 4–16px corner scale and 1px rules. No medicine graphics or decorative notebook grid is added: the request concerns color and type.

## Components

Primary buttons use coral with dark indigo text; hover is a lighter coral. Links, focus rings, active filters, and selected trace steps use the theme’s indigo/blue accent. Inputs and cards stay white in light mode. Beginner badges use pale blue, Intermediate cool neutral, Advanced periwinkle, and Production coral tint. Correct/incorrect feedback retains visible labels and icons.

Code panels remain horizontally scrollable with pale monospace text and a sky-blue result action. Lesson results are predefined, not a browser compiler. Project copy, download, milestones, and saved progress are unchanged.

## Do's and Don'ts

### Do:

- Do keep Bree Serif at its real 400 weight with font synthesis disabled.
- Do use dark indigo text on pale accents and coral actions.
- Do preserve the learning content, route behavior, and visible Projects navigation.

### Don't:

- Don’t use white text on coral buttons; the dark action text is intentional.
- Don’t restore the superseded cream-and-sage palette or Nunito headings.
- Don’t infer medical illustrations or copy from a palette-and-type reference.
