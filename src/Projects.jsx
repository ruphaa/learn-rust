import { useState } from 'react';
import { projects, suggestedProject } from './projects';
import { allLessons, tracks, lessonMeta } from './course';

function ProjectArrow({ back = false, external = false }) {
  return <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{external ? <><path d="M14 5h5v5M13 11l6-6" /><path d="M19 13v6H5V5h6" /></> : <path d={back ? 'M19 12H5m6 6-6-6 6-6' : 'M5 12h14m-6-6 6 6-6 6'} />}</svg>;
}

export function ProjectLibrary({ projectSteps }) {
  const [level, setLevel] = useState('All projects');
  const [query, setQuery] = useState('');
  const visible = projects.filter(p => (level === 'All projects' || p.stage === level) && `${p.title} ${p.summary} ${p.concepts.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="library-page">
    <header className="page-intro"><h1>Learn it. Build it.<br /><em>Make it yours.</em></h1><p>Start with a tiny program that works. Keep adding one new idea until you’re building tools, apps, and services you understand.</p><div className="intro-meta"><span>15 guided projects</span><span>Beginner to production</span><span>Progress saved here</span></div></header>
    <section className="start-here"><div><h2>A good place to start</h2><p>No Rust experience yet? Make a temperature converter, then work up to your first game.</p></div><a className="primary-link" href="#/project/temperature">Build your first project <span aria-hidden="true"><ProjectArrow /></span></a></section>
    <div className="project-tools"><div className="level-filters" role="group" aria-label="Filter projects by level">{['All projects', ...tracks.map(t => t.label)].map(value => <button key={value} type="button" aria-pressed={level === value} onClick={() => setLevel(value)}>{value}</button>)}</div><label className="project-search"><span className="sr-only">Search projects</span><input type="search" placeholder="Find a project…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <p className="result-count" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'} to explore</p>
    {visible.length === 0 && <div className="empty-state"><h2>No projects match yet</h2><p>Try a different word or another level.</p><button onClick={() => { setLevel('All projects'); setQuery(''); }}>Clear filters</button></div>}
    {tracks.map(track => {
      const group = visible.filter(p => p.stage === track.label);
      return group.length ? <section className="project-level" key={track.id}><div className="project-level-heading"><h2>{track.label}</h2><p>{track.description}</p></div><div className="project-grid">{group.map(project => {
        const done = project.milestones.filter((_, i) => projectSteps[project.id]?.includes(i)).length;
        return <a className={`project-card level-${track.id}`} href={`#/project/${project.id}`} key={project.id}><div className="project-card-top"><span className={`level-badge ${track.id}`}>{project.stage}</span><span>{project.time}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-tags">{project.concepts.map(c => <span key={c}>{c}</span>)}</div><div className="project-card-footer"><span>{done ? `${done}/${project.milestones.length} milestones complete` : `${project.milestones.length} milestones · ${project.kind}`}</span><span aria-hidden="true"><ProjectArrow /></span></div></a>;
      })}</div></section> : null;
    })}
    <aside className="source-note"><h2>Built on the Rust Book</h2><p>The Book supplies the language foundations and its own projects. Our additional practice guides apply those ideas to real applications. Framework-specific steps link to official library docs.</p><a href="https://doc.rust-lang.org/book/" target="_blank" rel="noreferrer">Read The Rust Programming Language <ProjectArrow external /></a></aside>
  </div>;
}

export function ProjectGuide({ project, completedSteps, onToggleStep }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [showCode, setShowCode] = useState(true);
  const done = project.milestones.filter((_, i) => completedSteps.includes(i)).length;
  const index = projects.findIndex(p => p.id === project.id);
  const next = projects[index + 1];
  const crate = project.id.replaceAll('-', '_');
  async function copy() {
    try { await navigator.clipboard.writeText(project.code); setCopied(true); setCopyError(''); }
    catch { setCopyError('Clipboard access is unavailable. Select the code below or download main.rs.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([project.code], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = 'main.rs'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="project-guide">
    <a className="back-link" href="#/projects"><ProjectArrow back /> All projects</a>
    <header className="guide-intro"><h1>{project.title}</h1><p>{project.summary}</p><div className="intro-meta"><span className={`level-badge ${project.stage.toLowerCase()}`}>{project.stage}</span><span>{project.time}</span><span>{project.kind}</span></div></header>
    <div className="guide-columns"><article>
      <section className="guide-section"><h2>What you’ll build</h2><p>{project.goal}</p><ol className="architecture-flow" aria-label="How the application works">{project.flow.map(item => <li key={item}>{item}</li>)}</ol></section>
      <section className="guide-section"><h2>Start with something that works</h2><p>This starter isolates the first useful piece of your project. Run it locally, change it, then build out the milestones below. It uses only Rust’s standard library.</p><ol className="setup-steps"><li>Create a project: <code>cargo new {crate}</code></li><li>Open <code>{crate}/src/main.rs</code> and replace its contents with the starter.</li><li>In the project folder, run <code>cargo run</code>, then <code>cargo test</code>.</li></ol><div className="guide-code"><div className="guide-code-toolbar"><button type="button" aria-expanded={showCode} onClick={() => setShowCode(!showCode)}>{showCode ? 'Hide' : 'Show'} main.rs</button><div><button type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy code'}</button><button type="button" onClick={download}>Download</button></div></div>{showCode && <pre tabIndex="0"><code>{project.code}</code></pre>}</div>{copyError && <p role="status">{copyError}</p>}</section>
      <section className="guide-section"><div className="milestone-heading"><h2>Your build plan</h2><span role="status">{done} of {project.milestones.length} complete</span></div><p>Work through these in order. Check a milestone when its acceptance check passes. Your checklist is saved in this browser.</p><div className="milestones">{project.milestones.map((milestone, i) => <section key={milestone.title} className={`milestone ${completedSteps.includes(i) ? 'finished' : ''}`}><div className="milestone-title"><input type="checkbox" id={`step-${project.id}-${i}`} checked={completedSteps.includes(i)} onChange={() => onToggleStep(i)} /><h3><label htmlFor={`step-${project.id}-${i}`}>{i + 1}. {milestone.title}</label></h3></div><p>{milestone.task}</p><div className="acceptance"><strong>You’re done when</strong><p>{milestone.check}</p></div></section>)}</div>{done === project.milestones.length && <div className="completion-message" role="status"><h3>You built it.</h3><p>Save a commit, write down what surprised you, and try the stretch goal when you’re ready.</p></div>}</section>
      <section className="stretch-section"><h2>Make it your own</h2><p>{project.stretch}</p></section>
      <section className="guide-section"><h2>Read alongside your build</h2><p className="source-origin">{project.origin}</p><ul className="source-list">{project.sources.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label} <ProjectArrow external /></a></li>)}</ul></section>
      <nav className="guide-bottom"><a href="#/projects"><ProjectArrow back /> Choose another project</a>{next && <a href={`#/project/${next.id}`}>Next: {next.title} <ProjectArrow /></a>}</nav>
    </article><aside className="guide-aside"><h2>Before you start</h2><p>These lessons give you the building blocks.</p><nav aria-label="Prerequisite lessons">{project.lessons.map(id => <a key={id} href={`#/lesson/${id}`}>{lessonMeta(id).title}<span aria-hidden="true"><ProjectArrow /></span></a>)}</nav><h2>You’ll practice</h2><ul>{project.concepts.map(c => <li key={c}>{c}</li>)}</ul><div className="project-progress"><strong>{done}/{project.milestones.length} milestones</strong><progress value={done} max={project.milestones.length} aria-label="Project completion" /><p>Small steps count. Come back whenever you’re ready.</p></div></aside></div>
  </div>;
}

export function CourseOverview({ completed, lastLesson }) {
  const next = allLessons.find(l => !completed.has(l.id)) || allLessons[0];
  const resume = lastLesson ? lessonMeta(lastLesson) : next;
  return <div className="library-page course-overview"><header className="page-intro"><h1>A little Rust.<br /><em>A lot of possibility.</em></h1><p>Learn one idea, play with an example, then build something with it. Your path from your first variable to your first service starts here.</p><div className="overview-actions"><a className="primary-link" href={`#/lesson/${resume.id}`}>{completed.size || lastLesson ? 'Continue learning' : 'Start with the basics'} <ProjectArrow /></a><a className="secondary-link" href="#/projects">Explore 15 projects <ProjectArrow /></a></div></header><section className="curriculum-map"><h2>Your learning path</h2>{tracks.map(track => <section key={track.id} className="overview-track"><header><span className={`level-badge ${track.id}`}>{track.label}</span><h3>{track.description}</h3></header><div>{track.lessons.map(([id, title, time]) => <a key={id} href={`#/lesson/${id}`}><span>{title}</span><small>{completed.has(id) ? 'Complete' : time}</small><span aria-hidden="true"><ProjectArrow /></span></a>)}</div><a className="track-project" href={`#/project/${suggestedProject(track.lessons[0][0]).id}`}>Put it into practice: {suggestedProject(track.lessons[0][0]).title} <ProjectArrow /></a></section>)}</section></div>;
}
