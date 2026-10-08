---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["src/App.jsx","src/Projects.jsx","src/friendly.css","src/main.jsx"]
---

# Learning application

## Scope

Read mode with interactive examples, quizzes, filters, and saved checklists. Preserve the learning overview, 23 lessons, 15 project guides, and all existing routes and behavior.

## Audience and job

Learn Rust from first principles using the official Rust Book, then apply concepts in increasingly substantial builds. The site remains static, with progress stored in the browser.

## Chosen direction

The user's supplied medicine-presentation image is now the color and typography authority: white, pale sky blue, coral, periwinkle, and deep indigo. Bree Serif approximates its friendly slab-serif headings; DM Sans remains the reading/interface family and Plex Mono the code face. The exact reference font was not identified. The previous cream/sage/Nunito treatment is superseded.

## Implementation contract

Keep the current layout, content, project discoverability, and mobile drawer. Change shared palette tokens, typography, code surfaces, and browser branding consistently. No medical illustrations or decorative graph-paper background are requested. White light mode is primary; the optional dark theme adapts these colors to navy backgrounds.

## Evidence

Desktop and mobile captures are in .impeccable/review. Browser tests cover all lesson/project sidebar destinations, filters, search, history, saved progress, both themes, the loaded heading font, text contrast, and 320px enlarged-text overflow. These checks support implementation quality, not an exact reproduction of the reference.
