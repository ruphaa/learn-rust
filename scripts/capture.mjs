import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const output = new URL("../.impeccable/review/", import.meta.url);
await mkdir(output, { recursive: true });

async function capture(name, viewport) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewport(viewport);
  await page.goto("http://127.0.0.1:5173/#/lesson/why-rust", { waitUntil: "networkidle0" });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, output)), fullPage: true });

  const layout = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelector("h1")?.textContent,
    lessons: document.querySelectorAll(".lesson-link").length,
  }));

  if (layout.scrollWidth > layout.width) throw new Error(`${name}: horizontal overflow ${layout.scrollWidth} > ${layout.width}`);
  if (layout.lessons !== 23) throw new Error(`${name}: expected 23 lessons, found ${layout.lessons}`);
  if (errors.length) throw new Error(`${name}: browser errors: ${errors.join(" | ")}`);

  if (name === "desktop") {
    await page.click(".trace-controls button:nth-child(2)");
    await page.click(".run-button");
    await new Promise((resolve) => setTimeout(resolve, 650));
    const state = await page.evaluate(() => ({
      owner: document.querySelector(".name-stack b")?.textContent,
      output: document.querySelector(".output-drawer code")?.textContent,
    }));
    if (state.owner !== "moved" || state.output !== "hello") throw new Error(`interaction failed: ${JSON.stringify(state)}`);
  }

  await page.close();
  return layout;
}

const desktop = await capture("desktop", { width: 1440, height: 1100, deviceScaleFactor: 1 });
const mobile = await capture("mobile", { width: 390, height: 844, deviceScaleFactor: 1 });
console.log(JSON.stringify({ desktop, mobile }, null, 2));
await browser.close();
