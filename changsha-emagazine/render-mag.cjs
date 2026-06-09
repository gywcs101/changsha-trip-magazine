// Screenshot each full-viewport page of the magazine for visual QA.
const path=require('path'),fs=require('fs');
let chromium; try{({chromium}=require('playwright-core'));}catch(e){try{({chromium}=require('playwright'));}catch(e2){console.error('NO_PLAYWRIGHT');process.exit(2);}}
const DIR=__dirname, OUT=path.join(DIR,'shots'); fs.mkdirSync(OUT,{recursive:true});
(async()=>{
  let browser;
  for(const ch of ['msedge','chrome',null]){try{const o={headless:true,args:['--force-color-profile=srgb']};if(ch)o.channel=ch;browser=await chromium.launch(o);console.log('launched',ch||'bundled');break;}catch(e){console.log('  x',ch,String(e.message).split('\n')[0]);}}
  if(!browser){console.error('NO_BROWSER');process.exit(3);}
  const ctx=await browser.newContext({viewport:{width:1512,height:982},deviceScaleFactor:1.25});
  const page=await ctx.newPage();
  page.on('pageerror',e=>console.log('  PAGEERR',e.message));
  await page.goto('file:///'+path.join(DIR,'index.html').replace(/\\/g,'/'),{waitUntil:'load',timeout:60000}).catch(e=>console.log('goto',e.message));
  await page.evaluate(()=>document.fonts&&document.fonts.ready?document.fonts.ready:true).catch(()=>{});
  await page.waitForTimeout(1800);
  const n=await page.$$eval('.page',ps=>ps.length);
  console.log('pages',n);
  for(let i=0;i<n;i++){
    await page.evaluate(i=>{const ps=document.querySelectorAll('.page');document.getElementById('deck').scrollTo({top:ps[i].offsetTop});},i);
    await page.waitForTimeout(1500);
    await page.screenshot({path:path.join(OUT,'p'+(i+1).toString().padStart(2,'0')+'.png')});
    console.log('  shot',i+1);
  }
  await browser.close();console.log('DONE');
})().catch(e=>{console.error('FATAL',e);process.exit(1);});
