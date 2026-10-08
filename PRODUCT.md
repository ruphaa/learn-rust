# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: React with Vite, selected for a static browser-only build that deploys cleanly to Vercel or GitHub Pages.

## Users

People learning Rust from first principles, including beginners who need plain language and working examples before formal terminology. They should be able to grow from their first variable to production-oriented Rust without switching learning environments.

## Product Purpose

Teach Rust engagingly through short explanations, concrete mental models, editable examples, checks for understanding, and progressively larger builds. Success means the learner can explain why Rust code works, repair common compiler errors, and apply the language in complete projects.

## Positioning

The course treats the compiler as a teaching partner: abstract rules—especially ownership, borrowing, lifetimes, and concurrency—are made visible through interactive state changes and small predictions before the formal explanation.

## Operating Context

Learners move through Beginner, Intermediate, Advanced, and Production tracks. They can search the curriculum, read a lesson, manipulate examples, answer checks, mark progress, and resume later on the same device.

## Capabilities and Constraints

- Static hosting only; no backend is required.
- Progress, theme, text size, and exercise state persist in browser storage.
- The official Rust Programming Language book is the technical source of truth.
- Course language should be simpler and more direct than a reference manual while preserving technical accuracy.
- The curriculum must connect concepts to examples and build projects rather than presenting isolated syntax.
- Browser exercises provide deterministic feedback without pretending to be a full Rust compiler; runnable examples may link to the official Rust Playground.

## Brand Commitments

The user's latest direction replaces the previous dark-first presentation with a friendly palette and new typography. The implemented default uses warm cream, sage green, peach, lavender, and soft yellow, with Nunito Sans headings and DM Sans reading text. An optional dark theme remains. Preserve the clarity, visible projects, and beginner-to-production breadth of the shared Go learning site.

## Evidence on Hand

- Official source: The Rust Programming Language at https://doc.rust-lang.org/book/
- Interaction and curriculum reference: https://go-learn-app-seven.vercel.app/#/m/what-is-go
- The user referenced a local palette at http://127.0.0.1:4173/#/lesson/why-rust, but that server was not running during implementation, so exact color sampling was unavailable.
- The latest request referenced an image that was not available to inspect. The cream/pastel interpretation was disclosed as a starting point, not an exact image match.

## Product Principles

1. Show the machine model before naming the rule.
2. Make every lesson produce a visible result.
3. Let compiler errors teach, then translate them into plain language.
4. Revisit concepts inside increasingly realistic projects.
5. Keep progress calm, legible, and locally owned by the learner.

## Accessibility & Inclusion

The experience must be fully keyboard navigable, responsive, readable with increased text size, compatible with reduced-motion preferences, and maintain strong color contrast in both themes.
