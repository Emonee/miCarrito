if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),d={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.35116076.js",revision:null},{url:"assets/index.eb33b7b0.css",revision:null},{url:"index.html",revision:"792c9daa2376af2856fd3c5dd1a72b54"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"3cb1c04fe67319a3039d9a176f7e0d27"},{url:"apple-touch-icon.png",revision:"f333ef23f431d4de348bb3cc87d6975f"},{url:"app-icon-192x192.png",revision:"5c3fea7d0c055903918f39827f534d36"},{url:"app-icon-512x512.png",revision:"cdc3a87882315df7c06e50be740f783c"},{url:"manifest.webmanifest",revision:"6e3b6cacf9fcad4c781407b20011e921"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
