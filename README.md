# Rust Field Notes

An interactive, static Rust course built from the progression in [The Rust Programming Language](https://doc.rust-lang.org/book/). It teaches from first principles through plain-language explanations, compiler-guided mental models, examples, knowledge checks, and build prompts.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

To compile, run, and test all 15 project starters (requires `rustc`):

```bash
npm run verify:starters
```

To check all lesson/project links, navigation, filters, saved progress, and mobile layouts against a running dev server:

```bash
LEARNING_SITE_URL=http://127.0.0.1:5173/ npm run verify:ui
```

The browser test uses installed Google Chrome on macOS. Set `CHROME_PATH` to your Chrome/Chromium executable on other systems. Screenshots are saved under `.impeccable/review/`.

## Deploy

The app uses hash routing and Vite's relative asset base, so the generated `dist/` directory works on both Vercel and GitHub Pages.

- Vercel: import the repository, use `npm run build`, and publish `dist`.
- GitHub Pages: use the included workflow described below.

No backend or deployment environment variables are required. Lesson progress, answers, project checklists, theme, and text-size preferences stay in the learner's browser.

### GitHub Pages setup

1. Open [repository Settings → Pages](https://github.com/ruphaa/learn-rust/settings/pages).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open **Actions → Deploy GitHub Pages → Run workflow**, choose `main`, and run it.
4. Wait for the build and deploy jobs to succeed. The site will be at **https://ruphaa.github.io/learn-rust/**.

The included `.github/workflows/pages.yml` installs the locked dependencies, runs the tests, builds with `/learn-rust/` as the asset base, and publishes `dist`. It uses GitHub's built-in token; no personal access token is needed. The default local/Vercel build keeps its relative asset base.

Deployment is manual: after pushing updates, run the same workflow again. To enable automatic publishing later, add a `push` trigger for `main` alongside `workflow_dispatch` in `pages.yml`.

If Pages is unavailable for a private repository on your plan, use an eligible GitHub plan or deliberately make the repository public. A Pages deployment may be publicly accessible even when its source repository is private; review the repository's Pages visibility before publishing.

References: [Vite deployment guide](https://vite.dev/guide/static-deploy.html#github-pages) and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Curriculum

- Beginner: Cargo, variables, control flow, ownership, borrowing, and slices
- Intermediate: structs, enums, modules, collections, error handling, and tests
- Advanced: traits, lifetimes, iterators, smart pointers, concurrency, async, and unsafe Rust
- Production: CLI architecture, workspaces, release profiles, web servers, thread pools, graceful shutdown, and shipping checks
- Beginner builds: temperature converter, guessing game, word explorer
- Intermediate builds: minigrep, persistent task CLI, URL shortener, blog workflow
- Advanced builds: bounded worker pool, key-value store, crawler, chat room
- Production-oriented builds: Book web-server capstone, database-backed API, durable job queue, API gateway

## Learning and building

`#/learn` is the learning path; `#/projects` is the searchable, filterable library. Every project has a separate `#/project/<id>` page with prerequisites, an architecture outline, a downloadable `main.rs`, milestones, acceptance checks, and official source links.

Project code is a working **starter**, not a finished application. Follow the milestones to grow it into the described project. Book projects are distinguished from extra practice guides; framework-specific extensions link to official library documentation. The Book's handmade HTTP server is educational, not a hardened production server.

Lesson “Show result” reveals expected output; it does not compile arbitrary Rust in the browser. Use the Rust Playground or local Cargo tooling to modify and run examples.
