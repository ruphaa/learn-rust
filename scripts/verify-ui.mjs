import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { allLessons, tracks } from '../src/course.js';
import { projects } from '../src/projects.js';

const url = process.env.LEARNING_SITE_URL || 'http://127.0.0.1:5174/';
const output = new URL('../.impeccable/review/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [];
const page = await browser.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
async function heading(title) { await page.waitForFunction(expected => document.querySelector('h1')?.textContent === expected, {}, title); await settle(); }
async function capture(name) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
  await settle();
  const dimensions = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  assert.ok(dimensions[0] <= dimensions[1], `${name}: horizontal overflow ${dimensions}`);
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, output)), fullPage: true });
}

try {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${url}#/lesson/why-rust`, { waitUntil: 'networkidle0' });
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'light');
  for (const track of tracks) {
    const toggle = `.track-${track.id} button.track-heading`;
    if (await page.$eval(toggle, el => el.getAttribute('aria-expanded')) !== 'true') await page.locator(toggle).click();
    for (const [id, title] of track.lessons) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.locator(`.course-nav a[href='#/lesson/${id}']`).click();
      await heading(title);
      // Same-page links do not change the hash; all other navigations reset reading position.
      if (id !== 'why-rust') assert.equal(await page.evaluate(() => window.scrollY), 0, `${id} did not reset scroll`);
      assert.equal(await page.$eval(`.course-nav a[href='#/lesson/${id}']`, el => el.getAttribute('aria-current')), 'page');
    }
  }
  for (const project of projects) {
    await page.locator(`.course-nav a[href='#/project/${project.id}']`).click();
    await heading(project.title);
    assert.equal(await page.$$eval('.milestone', nodes => nodes.length), project.milestones.length);
    assert.equal(await page.evaluate(() => window.scrollY), 0);
  }
  await page.locator(".top-nav a[href='#/projects']").click();
  await page.waitForSelector('.project-card');
  assert.equal(await page.$$eval('.project-card', nodes => nodes.length), projects.length);
  await capture('projects-desktop');
  await page.locator('.level-filters button:nth-child(5)').click();
  assert.equal(await page.$$eval('.project-card', nodes => nodes.length), 4);
  await page.locator('.project-search input').fill('no-such-project');
  await page.waitForSelector('.empty-state');
  await page.locator('.empty-state button').click();
  assert.equal(await page.$$eval('.project-card', nodes => nodes.length), 15);
  await page.locator(".project-card[href='#/project/minigrep']").click();
  await heading('Minigrep: your own search tool');
  await page.locator('#step-minigrep-0').click();
  await page.reload({ waitUntil: 'networkidle0' });
  assert.equal(await page.$eval('#step-minigrep-0', el => el.checked), true);
  await capture('guide-desktop');
  await page.locator(".guide-aside a[href='#/lesson/errors']").click();
  await heading('Result, panic & the ? operator');
  await page.goBack(); await heading('Minigrep: your own search tool');
  await page.goForward(); await heading('Result, panic & the ? operator');
  await page.locator('.search-trigger').click();
  await page.locator('.search-input input').fill('chat');
  await page.waitForSelector(".search-results a[href='#/project/chat']");
  await page.locator(".search-results a[href='#/project/chat']").click();
  await heading('A real-time chat room');
  await page.goto(`${url}#/lesson/why-rust`, { waitUntil: 'networkidle0' });
  await page.locator('.trace-controls button:nth-child(2)').click();
  assert.equal(await page.$eval('.name-stack b', el => el.textContent), 'moved');
  await page.locator('.run-button').click();
  assert.equal(await page.$eval('.output-drawer code', el => el.textContent), 'hello');
  await capture('lesson-desktop');

  await page.setViewport({ width: 390, height: 844 });
  await capture('lesson-mobile');
  assert.equal(await page.$eval('.sidebar', el => getComputedStyle(el).visibility), 'hidden');
  await page.$eval('.sidebar a', el => el.focus());
  assert.equal(await page.evaluate(() => Boolean(document.activeElement.closest('.sidebar'))), false);
  await page.locator('.nav-toggle').click();
  assert.equal(await page.$eval('.sidebar', el => getComputedStyle(el).visibility), 'visible');
  await page.locator('.close-nav').click();
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('nav-toggle')), true);
  await page.locator('.nav-toggle').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('nav-toggle')), true);
  await page.locator('.nav-toggle').click();
  await page.locator(".sidebar-shortcuts a[href='#/projects']").click();
  await page.waitForSelector('.project-card');
  assert.equal(await page.$eval('.sidebar', el => el.classList.contains('is-open')), false);
  await capture('projects-mobile');
  await page.locator(".project-card[href='#/project/minigrep']").click();
  await heading('Minigrep: your own search tool');
  await capture('guide-mobile');
  await page.locator('.top-actions .icon-button').click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await capture('guide-mobile-dark');
  assert.equal(await page.$$eval('.project-guide svg', nodes => nodes.length > 0), true);
  await page.goto(`${url}#/project/missing`, { waitUntil: 'networkidle0' });
  await heading('That page isn’t here.');
  assert.deepEqual(errors, [], 'Browser errors');
  console.log(`PASS: all ${allLessons.length} lesson and ${projects.length} project sidebar links, scroll reset, history, filters, search, saved checklist, theme, mobile drawer, missing routes, and screenshot overflow checks.`);
} finally { await browser.close(); }
