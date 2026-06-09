// Render each poster node to a PNG using the system Edge/Chrome via playwright-core.
// No bundled-browser download required (channel: msedge / chrome).
const path = require('path');
const fs = require('fs');

let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { try { ({ chromium } = require('playwright')); } catch (e2) {
  console.error('NO_PLAYWRIGHT'); process.exit(2);
} }

const DIR = __dirname;
const OUT = path.join(DIR, 'output');
fs.mkdirSync(OUT, { recursive: true });

const JOBS = [
  { file: 'editorial-showcase.html', ids: ['ed-1','ed-2','ed-3','ed-4','ed-5','ed-6'] },
  { file: 'swiss-showcase.html',     ids: ['sw-1','sw-2','sw-3','sw-4'] },
];

async function launch() {
  for (const ch of ['msedge', 'chrome', null]) {
    try {
      const opts = { headless: true, args: ['--force-color-profile=srgb'] };
      if (ch) opts.channel = ch;
      const b = await chromium.launch(opts);
      console.log('launched browser:', ch || 'bundled-chromium');
      return b;
    } catch (e) { console.log('  channel unavailable:', ch, '-', String(e.message).split('\n')[0]); }
  }
  throw new Error('No Chromium/Edge/Chrome could be launched');
}

(async () => {
  const browser = await launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1200, height: 1600 } });
  const page = await ctx.newPage();
  for (const job of JOBS) {
    const url = 'file:///' + path.join(DIR, job.file).replace(/\\/g, '/');
    console.log('open', job.file);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('  goto warn:', e.message));
    await page.evaluate(() => (document.fonts && document.fonts.ready) ? document.fonts.ready : true).catch(() => {});
    await page.waitForTimeout(1500); // settle fonts + lucide icons
    for (const id of job.ids) {
      const el = page.locator('#' + id);
      const out = path.join(OUT, id + '.png');
      try { await el.screenshot({ path: out }); console.log('  saved', id + '.png'); }
      catch (e) { console.log('  FAILED', id, e.message); }
    }
  }
  await browser.close();
  console.log('DONE');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
