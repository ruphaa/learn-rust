import { useEffect, useMemo, useRef, useState } from "react";
import { allLessons, lessonById, lessonMeta, tracks } from "./course";
import { projects, projectById, suggestedProject } from "./projects";
import { parseRoute } from "./routes";
import { ProjectLibrary, ProjectGuide, CourseOverview } from "./Projects.jsx";

const STORAGE_KEY = "rust-field-notes:v1";
const defaultState = { completed: [], answers: {}, projectSteps: {}, theme: "light", fontScale: 1, appearanceVersion: 2 };

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...defaultState, ...saved, completed: Array.isArray(saved.completed) ? saved.completed.filter(id => lessonById[id]) : [], answers: saved.answers || {}, projectSteps: saved.projectSteps || {}, theme: saved.appearanceVersion === 2 && saved.theme === 'dark' ? 'dark' : 'light', appearanceVersion: 2 };
  } catch {
    return defaultState;
  }
}

function Icon({ name, size = 18 }) {
  const paths = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    moon: <path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    copy: <><rect x="8" y="8" width="11" height="11" rx="1" /><path d="M16 8V5H5v11h3" /></>,
    play: <path d="m9 6 9 6-9 6Z" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22Z" /><path d="M4 5.5V22" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    external: <><path d="M14 5h5v5M13 11l6-6" /><path d="M19 13v6H5V5h6" /></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const currentId = route.type === 'lesson' ? route.id : 'why-rust';
  const [store, setStore] = useState(loadState);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [traceStep, setTraceStep] = useState(0);
  const [runState, setRunState] = useState("idle");
  const [copied, setCopied] = useState(false);
  const mainRef = useRef(null);
  const navTriggerRef = useRef(null);
  const closeNav = () => { setNavOpen(false); navTriggerRef.current?.focus(); };
  const [storageError, setStorageError] = useState(false);
  const [copyError, setCopyError] = useState('');

  const lesson = lessonById[currentId];
  const meta = lessonMeta(currentId);
  const completed = new Set(store.completed);
  const progress = Math.round((completed.size / allLessons.length) * 100);

  useEffect(() => {
    const onHash = () => {
      const nextRoute = parseRoute(window.location.hash);
      setRoute(nextRoute);
      setTraceStep(0);
      setRunState("idle");
      setCopied(false);
      setCopyError('');
      setNavOpen(false);
      setSearchOpen(false);
      if (nextRoute.type === 'lesson') setStore(previous => ({ ...previous, lastLesson: nextRoute.id }));
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        mainRef.current?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); setStorageError(false); }
    catch { setStorageError(true); }
    document.documentElement.dataset.theme = store.theme;
    document.documentElement.style.setProperty("--font-scale", store.fontScale);
  }, [store]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName)) {
        event.preventDefault(); setSearchOpen(true);
      }
      if (event.key === "Escape") { setSearchOpen(false); if (document.querySelector('.sidebar.is-open')) closeNav(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    const lessonResults = allLessons.filter((item) => {
      const detail = lessonById[item.id];
      return [item.title, item.trackLabel, detail.lead, detail.concept].join(" ").toLowerCase().includes(term);
    }).map(item => ({ ...item, href: `#/lesson/${item.id}` }));
    const projectResults = projects.filter(item => `${item.title} ${item.summary} ${item.concepts.join(' ')}`.toLowerCase().includes(term)).map(item => ({ ...item, trackLabel: `${item.stage} project`, href: `#/project/${item.id}` }));
    return term ? [...lessonResults, ...projectResults] : [...lessonResults.slice(0, 4), ...projectResults.slice(0, 3)];
  }, [query]);

  const updateStore = (patch) => setStore((previous) => ({ ...previous, ...patch }));
  const toggleComplete = () => {
    const next = completed.has(currentId)
      ? store.completed.filter((id) => id !== currentId)
      : [...store.completed, currentId];
    updateStore({ completed: next });
  };

  const answerQuestion = (index) => updateStore({ answers: { ...store.answers, [currentId]: index } });
  const chosen = store.answers[currentId];
  const answerCorrect = chosen === lesson.answer;
  const currentIndex = allLessons.findIndex((item) => item.id === currentId);
  const nextLesson = allLessons[currentIndex + 1];

  const runCode = () => {
    setRunState("done");
  };

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(lesson.code); setCopied(true); setCopyError(''); }
    catch { setCopyError('Clipboard access is unavailable. Select and copy the code directly.'); }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button ref={navTriggerRef} className="icon-button nav-toggle" type="button" aria-label="Open course navigation" aria-expanded={navOpen} onClick={() => setNavOpen(true)}><Icon name="menu" /></button>
        <a className="brand" href="#/learn" aria-label="Rust Field Notes home">
          <span className="brand-mark" aria-hidden="true"><span>R</span></span>
          <span><b>Rust</b> Field Notes</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation"><a href="#/learn" aria-current={route.type === 'learn' || route.type === 'lesson' ? 'page' : undefined}>Learn</a><a href="#/projects" aria-current={route.type === 'projects' || route.type === 'project' ? 'page' : undefined}>Projects <span>{projects.length}</span></a></nav>
        <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)}>
          <Icon name="search" /><span>Find a concept</span><kbd>/</kbd>
        </button>
        <div className="top-actions">
          <div className="progress-readout" aria-label={`${progress}% course complete`}><span>{String(completed.size).padStart(2, "0")}</span><i style={{ "--progress": `${progress}%` }} /></div>
          <div className="type-controls" role="group" aria-label="Text size">
            <button type="button" aria-label="Decrease text size" disabled={store.fontScale <= 0.9} onClick={() => updateStore({ fontScale: Math.max(0.9, store.fontScale - 0.1) })}>A−</button>
            <button type="button" aria-label="Increase text size" disabled={store.fontScale >= 1.2} onClick={() => updateStore({ fontScale: Math.min(1.2, store.fontScale + 0.1) })}>A+</button>
          </div>
          <button className="icon-button" type="button" aria-label={`Use ${store.theme === "dark" ? "light" : "dark"} theme`} onClick={() => updateStore({ theme: store.theme === "dark" ? "light" : "dark" })}><Icon name={store.theme === "dark" ? "sun" : "moon"} /></button>
        </div>
      </header>

      <Sidebar route={route} currentId={route.type === 'lesson' ? currentId : null} completed={completed} progress={progress} open={navOpen} onClose={closeNav} />
      {navOpen && <button className="nav-scrim" aria-label="Close course navigation" onClick={closeNav} />}

      <main className="lesson-main" id="lesson-content" tabIndex="-1" ref={mainRef}>
        {storageError && <p className="storage-warning" role="status">Browser storage is unavailable. Your progress will last for this session only.</p>}
        {route.type === 'learn' && <CourseOverview completed={completed} lastLesson={store.lastLesson} />}
        {route.type === 'projects' && <ProjectLibrary projectSteps={store.projectSteps} />}
        {route.type === 'project' && <ProjectGuide key={route.id} project={projectById[route.id]} completedSteps={store.projectSteps[route.id] || []} onToggleStep={index => setStore(previous => { const done = previous.projectSteps[route.id] || []; return { ...previous, projectSteps: { ...previous.projectSteps, [route.id]: done.includes(index) ? done.filter(i => i !== index) : [...done, index] } }; })} />}
        {route.type === 'missing' && <div className="library-page empty-state"><h1>That page isn’t here.</h1><p>Pick a lesson or project to get back on track.</p><a href="#/learn">Explore lessons</a><a href="#/projects">Browse projects</a></div>}
        {route.type === 'lesson' && <div className="lesson-grid">
          <article className="lesson-article">
            <nav className="crumbs" aria-label="Breadcrumb"><span>{meta.trackLabel}</span><Icon name="arrow" size={14} /><span>{meta.time}</span></nav>
            <h1>{meta.title}</h1>
            <p className="lesson-lead">{lesson.lead}</p>

            {currentId === "why-rust" && <OwnershipTrace step={traceStep} onStep={setTraceStep} />}

            <section className="reading-section">
              <h2>The plain-English version</h2>
              <p>{lesson.simple}</p>
              <aside className="field-note"><span>Compiler note</span><p>{lesson.concept}</p></aside>
            </section>

            <section className="reading-section">
              <div className="section-title-row"><h2>See it in code</h2><span>worked example</span></div>
              <CodeWorkbench code={lesson.code} output={lesson.output} state={runState} onRun={runCode} onCopy={copyCode} copied={copied} />
              {copyError && <p role="status">{copyError}</p>}
              <p className="workbench-note">Reveal the expected result below. To compile Rust yourself, copy the example into the Rust Playground or your local Cargo project.</p>
              <a className="text-link" href="https://play.rust-lang.org/" target="_blank" rel="noreferrer">Open Rust Playground <Icon name="external" size={15} /></a>
            </section>

            <section className="reading-section checkpoint">
              <span className="margin-label">Check your model</span>
              <h2>{lesson.question}</h2>
              <div className="answer-list" role="radiogroup" aria-label="Choose an answer">
                {lesson.options.map((option, index) => {
                  const selected = chosen === index;
                  const resultClass = selected ? (index === lesson.answer ? "correct" : "incorrect") : "";
                  return <button key={option} type="button" role="radio" aria-checked={selected} className={`answer ${resultClass}`} onClick={() => answerQuestion(index)}><span>{String.fromCharCode(65 + index)}</span>{option}{selected && <Icon name={index === lesson.answer ? "check" : "close"} />}</button>;
                })}
              </div>
              {chosen !== undefined && <div className={`answer-explanation ${answerCorrect ? "success" : "retry"}`} role="status"><b>{answerCorrect ? "Your model holds." : "Not quite—adjust the model."}</b><p>{lesson.explain}</p></div>}
            </section>

            <section className="build-strip">
              <div><h2>Put it into practice</h2><p>Use this idea in a project with a guide and a saved checklist.</p><a className="text-link" href={`#/project/${suggestedProject(currentId).id}`}>{suggestedProject(currentId).title} →</a></div>
              <button className={`complete-button ${completed.has(currentId) ? "is-complete" : ""}`} type="button" onClick={toggleComplete}><Icon name="check" />{completed.has(currentId) ? "Lesson complete" : "Mark lesson complete"}</button>
            </section>

            <footer className="lesson-footer">
              <a href={lesson.href} target="_blank" rel="noreferrer"><Icon name="book" />Source of truth: The Rust Book, {lesson.chapter}<Icon name="external" size={14} /></a>
              {nextLesson && <a className="next-lesson" href={`#/lesson/${nextLesson.id}`}><span>Next field note</span><b>{nextLesson.title}</b><Icon name="arrow" /></a>}
            </footer>
          </article>
          <LessonMargin lesson={lesson} meta={meta} traceStep={traceStep} />
        </div>}
      </main>

      {searchOpen && <SearchPanel query={query} setQuery={setQuery} results={searchResults} onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

function Sidebar({ route, currentId, completed, progress, open, onClose }) {
  const [expanded, setExpanded] = useState(() => new Set([lessonMeta(currentId).track]));
  useEffect(() => { if (currentId) setExpanded(previous => new Set([...previous, lessonMeta(currentId).track])); }, [currentId]);
  const toggle = id => setExpanded(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  return <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Course navigation">
    <div className="sidebar-head"><div><span>Your progress</span><b>{progress}% complete</b></div><button className="icon-button close-nav" type="button" onClick={onClose} aria-label="Close course navigation"><Icon name="close" /></button><div className="progress-line"><i style={{ "--progress-ratio": progress / 100 }} /></div></div>
    <nav className="sidebar-shortcuts" aria-label="Course sections"><a href="#/learn" onClick={onClose} aria-current={route.type === 'learn' ? 'page' : undefined}><Icon name="book" />Learning path</a><a href="#/projects" onClick={onClose} aria-current={route.type === 'projects' ? 'page' : undefined}><Icon name="play" />Project library <span>{projects.length}</span></a></nav>
    <nav className="course-nav" onClick={event => { if (event.target.closest('a')) onClose(); }}>
      {tracks.map((track) => <section className={`nav-track track-${track.id}`} key={track.id}><button type="button" className="track-heading" aria-expanded={expanded.has(track.id)} onClick={() => toggle(track.id)}><span>{track.label}</span><small>{track.lessons.length} lessons</small><Icon name="arrow" size={14} /></button><div hidden={!expanded.has(track.id)}>{track.lessons.map(([id, title], index) => <a key={id} aria-current={currentId === id ? 'page' : undefined} className={`lesson-link ${currentId === id ? "active" : ""} ${completed.has(id) ? "done" : ""}`} href={`#/lesson/${id}`}><i>{completed.has(id) ? <Icon name="check" size={13} /> : index + 1}</i><span>{title}</span></a>)}</div></section>)}
      <section className="nav-track projects-track"><div className="track-heading"><span>Projects</span><small>{projects.length} builds</small></div>{projects.map(project => <a className={`project-link ${route.type === 'project' && route.id === project.id ? 'active' : ''}`} aria-current={route.type === 'project' && route.id === project.id ? 'page' : undefined} href={`#/project/${project.id}`} key={project.id}><span>{project.title}</span></a>)}</section>
    </nav>
    <div className="sidebar-foot"><span>Based on the official Rust Book</span><a href="https://doc.rust-lang.org/book/" target="_blank" rel="noreferrer">Read the source <Icon name="external" size={13} /></a></div>
  </aside>;
}

const trace = [
  { line: 1, title: "Create", owner: "note", note: "A String allocates its text on the heap. `note` owns that allocation." },
  { line: 2, title: "Move", owner: "moved", note: "Ownership moves to `moved`. The bytes are not copied." },
  { line: 3, title: "Use", owner: "moved", note: "The current owner may read the value. Cleanup happens once, when `moved` leaves scope." },
];

function OwnershipTrace({ step, onStep }) {
  const item = trace[step];
  return <section className="ownership-lab" aria-label="Interactive ownership trace">
    <div className="lab-copy"><span className="margin-label">The idea Rust is built around</span><h2>Watch one value change hands.</h2><p>Step through three lines. Nothing mysterious happens to the data—only the right to use and clean it up changes.</p><div className="trace-controls" role="group" aria-label="Ownership trace steps">{trace.map((entry, index) => <button key={entry.title} className={step === index ? "active" : ""} type="button" onClick={() => onStep(index)} aria-pressed={step === index}><span>{index + 1}</span>{entry.title}</button>)}</div></div>
    <div className="memory-sheet">
      <div className="trace-editor-head"><span>trace.rs</span><small>click a line to inspect it</small></div>
      <div className="code-lines" role="group" aria-label="Choose a source line to trace">{trace.map((entry, index) => <div className={item.line === entry.line ? "active" : ""} key={entry.line}><button type="button" onClick={() => onStep(index)} aria-pressed={step === index}><span>{entry.line}</span><code>{entry.line === 1 ? 'let note = String::from("hello");' : entry.line === 2 ? "let moved = note;" : 'println!("{moved}");'}</code></button>{item.line === entry.line && <div className="compiler-annotation"><span>line {item.line}</span><p>{item.note}</p></div>}</div>)}</div>
      <div className="ownership-diagram"><div className="name-stack"><span>binding</span><b key={item.owner}>{item.owner}</b></div><div className="ownership-rule" aria-hidden="true"><i /></div><div className="heap-stack"><span>heap</span><b>h e l l o</b></div></div>
    </div>
  </section>;
}

function CodeWorkbench({ code, output, state, onRun, onCopy, copied }) {
  return <div className="code-workbench">
    <div className="code-toolbar"><span>Example</span><div><button type="button" onClick={onCopy}><Icon name={copied ? "check" : "copy"} size={16} />{copied ? "Copied" : "Copy"}</button><button className="run-button" type="button" onClick={onRun}><Icon name="play" size={16} />Show result</button></div></div>
    <pre tabIndex="0"><code>{code}</code></pre>
    <div className={`output-drawer ${state === "idle" ? "waiting" : ""}`} aria-live="polite"><span>Result</span><code>{state === "done" ? output : "Predict what happens, then reveal the result."}</code></div>
  </div>;
}

function LessonMargin({ lesson, meta, traceStep }) {
  return <aside className="lesson-margin" aria-label="Lesson notes">
    <div className="margin-rule"><span>FIELD NOTE</span></div>
    <div className="margin-block"><small>In one sentence</small><p>{lesson.concept}</p></div>
    {meta.id === "why-rust" && <div className="margin-block live-note"><small>Trace state</small><b>{trace[traceStep].title}</b><p>{trace[traceStep].owner} owns the allocation.</p></div>}
    <div className="margin-block"><small>Book map</small><b>{lesson.chapter}</b><p>Terminology and behavior follow the official text.</p></div>
    <div className="margin-block rule-card"><small>Keep this</small><p>Compiler errors are evidence about the model—not a verdict on you.</p></div>
  </aside>;
}

function SearchPanel({ query, setQuery, results, onClose }) {
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    inputRef.current?.focus();
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...panelRef.current.querySelectorAll('a[href], button:not(:disabled), input')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => { document.removeEventListener("keydown", trapFocus); previousFocus?.focus(); };
  }, []);
  return <div className="search-layer" role="dialog" aria-modal="true" aria-label="Search the course" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="search-panel" ref={panelRef}><div className="search-input"><Icon name="search" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ownership, chat, APIs…" aria-label="Search lessons and projects" /><button type="button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></div><div className="search-results"><span>{query ? `${results.length} matching lessons & projects` : "Start anywhere"}</span>{results.length ? results.map((result) => <a href={result.href} key={result.href} onClick={onClose}><div><small>{result.trackLabel}</small><b>{result.title}</b></div><span>{result.time}</span><Icon name="arrow" /></a>) : <p>No matches. Try a broader concept or project name.</p>}</div></div>
  </div>;
}

export default App;
