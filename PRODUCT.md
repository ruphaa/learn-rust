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

The user's supplied medicine-presentation image now defines the theme: white, pale sky blue, coral, periwinkle, and deep indigo lettering. Bree Serif headings approximate its rounded slab-serif character; DM Sans supplies reading and interface text. Exact reference-font identity is unconfirmed. The former cream/sage/Nunito interpretation is superseded. Preserve the existing learning layout, visible projects, and beginner-to-production breadth. An optional navy-based dark theme remains.

## Evidence on Hand

- Official source: The Rust Programming Language at https://doc.rust-lang.org/book/
- Interaction and curriculum reference: https://go-learn-app-seven.vercel.app/#/m/what-is-go
- The user referenced a local palette at http://127.0.0.1:4173/#/lesson/why-rust, but that server was not running during implementation, so exact color sampling was unavailable.
- The user subsequently supplied the actual reference: a white medicine-presentation design with pale blue and coral graphics, periwinkle accents, indigo serif headings, and sans-serif labels. Apply its color/type character, not its medical subject matter.

## Product Principles

1. Show the machine model before naming the rule.
2. Make every lesson produce a visible result.
3. Let compiler errors teach, then translate them into plain language.
4. Revisit concepts inside increasingly realistic projects.
5. Keep progress calm, legible, and locally owned by the learner.

## Accessibility & Inclusion

The experience must be fully keyboard navigable, responsive, readable with increased text size, compatible with reduced-motion preferences, and maintain strong color contrast in both themes.
