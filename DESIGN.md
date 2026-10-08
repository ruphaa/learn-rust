---
name: "Rust Field Notes"
description: "A friendly, cream-and-pastel learning workspace for Rust lessons and guided projects."
colors:
  ink: "#334742"
  ink-strong: "#213e37"
  muted: "#536760"
  faint: "#60706a"
  ground: "#faf8f2"
  ground-deep: "#f1f4ec"
  leaf: "#ffffff"
  leaf-raised: "#e5eee6"
  line: "#dce3d8"
  line-strong: "#acbeb2"
  rust: "#aa4935"
  sage: "#276c59"
  mint: "#e4f0e8"
  peach: "#fbe6db"
  lavender: "#eee8f5"
  yellow: "#f7efcf"
  dark-ink: "#e1e9e2"
  dark-ink-strong: "#f0f5ec"
  dark-muted: "#b9cabe"
  dark-faint: "#acbdb1"
  dark-ground: "#1b2925"
  dark-ground-deep: "#20322b"
  dark-leaf: "#253831"
  dark-leaf-raised: "#304b3f"
  dark-line: "#40564a"
  dark-line-strong: "#6d8777"
  dark-rust: "#ffac90"
  dark-sage: "#a0d6bb"
  dark-mint: "#304b3f"
  dark-peach: "#503a31"
  dark-lavender: "#42394e"
  dark-yellow: "#49472f"
  action: "#2c6b57"
  action-hover: "#235543"
  action-text: "#fff"
  code-ground: "#223b36"
  code-text: "#e5f0e7"
  code-line: "#456258"
  code-hover: "#36544a"
  code-muted: "#c0d4c7"
  result-action: "#d9eee1"
  result-action-text: "#234a3c"
typography:
  display:
    fontFamily: "Nunito Sans Variable, sans-serif"
    fontSize: "clamp(2.7rem,4vw,4.4rem)"
    fontWeight: 850
    lineHeight: 1.1
    letterSpacing: "-.025em"
  lesson-title:
    fontFamily: "Nunito Sans Variable, sans-serif"
    fontSize: "clamp(2.3rem,4vw,3.65rem)"
    fontWeight: 850
    lineHeight: 1.2
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Nunito Sans Variable, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "Nunito Sans Variable, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-.025em"
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

**Creative North Star: "Friendly Field Notes"**

Rust Field Notes is a welcoming learning workspace: warm cream surrounds white reading surfaces, pastel notes, and rounded controls. Strong green text and generously spaced explanations keep the interface readable while the learner moves between concepts and practical builds.

This document records the implemented replacement palette and typography authorized by the user's latest direction. The descriptive north star names that implementation; it is not an approved visual comp or an exact match to the unavailable reference image. Values are extracted from `src/friendly.css`, loaded by `src/main.jsx`. Light is the default appearance, with an optional dark theme carrying the same hierarchy and component shapes.

**Key Characteristics:**

- Warm cream, white surfaces, sage actions, and mint, peach, lavender, and yellow accents.
- Rounded containers, fine borders, and quiet tonal grouping.
- Nunito Sans headings, DM Sans reading text, and IBM Plex Mono code.
- Persistent desktop navigation with direct access to lessons and projects.
- Visible code, explanations, progress, and next steps.

## Colors

Sage establishes the action language; pastel surfaces distinguish learning levels and supporting notes. The frontmatter owns the default palette and its `dark-` counterparts. CSS swaps the semantic properties when dark mode is selected.

### Primary

- **Sage** (`sage`): links, selected navigation, progress, focus, and completion text.
- **Action green** (`action`, `action-hover`): primary links and completion buttons, with white action text. These fills stay fixed in both themes.

### Secondary

- **Mint** (`mint`): beginner badges, start prompts, ownership demonstrations, acceptance checks, and selected navigation.
- **Peach** (`peach`): production badges, lesson-to-project prompts, and incorrect-answer feedback.

### Tertiary

- **Lavender** (`lavender`): advanced badges.
- **Soft yellow** (`yellow`): intermediate badges, compiler notes, selected trace lines, and stretch goals.
- **Rust** (`rust`): the brand mark and incorrect-answer borders.

### Neutral

- **Cream ground** (`ground`) and **quiet navigation ground** (`ground-deep`): the page and fixed course rail.
- **White leaf** (`leaf`) and **tinted leaf** (`leaf-raised`): cards, fields, controls, and inline code.
- **Green ink** (`ink`, `ink-strong`, `muted`, `faint`): reading text, headings, supporting prose, and metadata.
- **Soft rules** (`line`, `line-strong`): borders, dividers, and control edges.
- **Code colors** (`code-ground` through `result-action-text`): stable dark code surfaces and readable controls, independent of the page theme.

**The Readable Pastel Rule.** Use pastel colors as surfaces behind strong text, and keep the level name or feedback message visible alongside the color.

## Typography

Headings use self-hosted Nunito Sans Variable, body and interface copy use self-hosted DM Sans Variable, and code uses self-hosted IBM Plex Mono at weights 400 and 500. Sans-serif and monospace fallbacks are defined in the frontmatter. Rounded, heavy headings give the page warmth; reading copy stays open and practical.

The `display` role belongs to learning and project-library introductions; lesson and guide titles use `lesson-title`. Section headings use `headline`; ordinary subheadings use `title`. Project-card titles override that size to 1.4rem. The label role describes badges; other interface metadata stays in the body family.

Continuous lesson prose is constrained to 68ch, lesson leads to 65ch, and library/guide introduction copy to 63ch. Root text scales from 0.9× to 1.2× through desktop text controls. At the narrow layout, display introductions use 2.8rem and code uses .8rem.

**The Three Roles Rule.** Use Nunito Sans for headings, DM Sans for reading and interface copy, and IBM Plex Mono for code and compact source indices.

## Layout

The desktop shell uses a fixed course rail (270px) below a fixed top bar (72px). The course list scrolls independently; progress, section shortcuts, and the source footer stay in the rail. Main content offsets match those dimensions.

Lessons cap at 1230px with 48px horizontal padding, a flexible article, a 190px notes margin, and a 40px gap. Libraries and guides cap at 1220px with 52px horizontal padding. Project cards form two equal columns with a 20px gap. Guides pair a flexible article with a 215px aside and a 48px gap.

- At 1200px and below, lesson notes and text-size controls hide, lesson content caps at 880px, and library gutters become 36px. Guide prerequisites and progress move above the article in two columns.
- At 900px and below, the rail narrows to 245px, project cards form one column, and search becomes a 44px icon control.
- At 760px and below, the top bar becomes 66px and the sidebar becomes a drawer capped at 330px and 90vw. Content loses its left offset and uses 22px page gutters. Answers and guide-aside content stack; project search spans the available width.
- At 360px and below, the brand mark hides to preserve navigation space.

**The Persistent Route Rule.** Keep Learn and Projects available in the top navigation, with the course and project rail visible on desktop and accessible through the mobile menu.

## Elevation & Depth

Routine content uses borders, whitespace, and colored surfaces without shadows. The search dialog alone uses a shadow (`0 24px 70px #10261f38`) over its green scrim. The mobile rail sits above its own scrim.

Motion is limited to card border/background transitions (160ms ease), the mobile drawer transform (180ms ease), and progress transforms (200ms ease). Reduced-motion preferences remove transitions and animations and restore automatic scrolling behavior.

## Shapes

Soft rectangular corners vary by use. The frontmatter records the observed radius scale for inline code, badges, fields, actions, controls, notes, cards, and panels. Borders are generally one pixel. Small circular metadata separators are an exception to the rectangular form.

## Components

### Buttons

Primary links use action green, white text, action-radius corners, 12px by 20px padding, and a 46px minimum height. Hover uses `action-hover`. Completion buttons use 12px by 16px padding and switch to a leaf background with sage text after completion. Icon controls are 44px squares with control-radius corners and a mint hover fill. Secondary links are unfilled, weight 600, with 12px by 4px padding.

Interactive elements inherit a 3px sage focus outline with a 3px offset. Disabled buttons reduce opacity to .45. The explicit action-green hover change belongs to primary links; other controls have their own states.

### Chips and Filters

Static level badges pair names with mint for Beginner, yellow for Intermediate, lavender for Advanced, and peach for Production. Filters are separate buttons: transparent by default, mint on hover, and leaf-filled with a strong border and sage text when `aria-pressed` is true. Filters have a 42px minimum height.

### Cards and Containers

Project cards use the card radius and a fine border. Hover changes the border to sage and blends 30% mint into leaf. Cards show the level, time estimate, title, summary, concepts, and milestone count. Start prompts and ownership demonstrations use mint; compiler notes and stretch prompts use yellow; lesson-to-project prompts use peach.

### Inputs and Search

Project search uses a leaf surface, fine border, field radius, green caret, and faint placeholder. Its 185px desktop width becomes full width on mobile. Course search opens a dialog capped at 680px, with panel corners, a 42px input, a 44px close control, and results capped at 65vh. It searches lessons and projects, traps focus, and restores prior focus on close.

### Navigation

Lesson rows have a 43px minimum height, field-radius corners, and a compact mono index. Active rows use mint and sage; the active index uses sage with leaf-colored text. Completed indices use a check mark. Project links share the rounded navigation language. Learn and Projects remain direct links in the top bar and rail shortcuts.

### Lesson Workbench and Ownership Trace

Code uses the fixed dark palette in both themes, with horizontal overflow. Lesson tools say “Show result” because they reveal an expected result; local Cargo or the Rust Playground supplies real compilation. The ownership trace synchronizes a step, a yellow source-line highlight, explanatory copy, and a binding-to-heap diagram.

Answer buttons have a strong border and a 62px minimum height. Correct answers use mint with a sage border; incorrect answers use peach with a rust border. Text and icons explain the result.

### Project Guide

Guides connect a goal and numbered application flow to setup instructions, standard-library starter code, and an ordered build plan. Copy, download, and collapse controls occupy the code toolbar. Each milestone has a labeled checkbox, task, and mint acceptance check. Completion updates a count, progress bar, and message; progress persists in the browser. The aside links prerequisite lessons. Starter code isolates an initial working piece; it is not presented as the completed final application.

## Do's and Don'ts

### Do:

- Do use cream and pastel surfaces with strong, readable green text.
- Do preserve the heading, reading, and code font roles.
- Do keep lessons, projects, progress, and next steps easy to find.
- Do pair color states with visible text, icons, or selected-control semantics.
- Do preserve keyboard focus, readable code overflow, both themes, and reduced-motion behavior.

### Don't:

- Don't restore the obsolete dark-first serif and square-container direction.
- Don't hide project guides behind lesson pages or replace their build plans with lesson redirects.
- Don't imply that revealing an expected result compiles Rust in the browser.
- Don't claim an exact match to the unavailable reference image or an approved visual comp.
