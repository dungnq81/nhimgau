import"./_vendor.js";import"./config.js";import"./lighthouse.js";import"./back-to-top.js";import"./script-loader.js";import{i as e}from"./menu.js";import{i as t}from"./social-share.js";document.addEventListener("DOMContentLoaded",(()=>{e("nav.nav",".main-nav"),t("[data-social-share]",{intents:["facebook","x","print","send-email","copy-link","web-share"]}),document.querySelectorAll('a._blank, a.blank, a[target="_blank"]').forEach((e=>{e.hasAttribute("target")&&"_blank"===e.getAttribute("target")||e.setAttribute("target","_blank");const t=null==e?void 0:e.getAttribute("rel");if(!t||!t.includes("noopener")||!t.includes("nofollow")){const r=(t?t+" ":"")+"noopener noreferrer nofollow";e.setAttribute("rel",r)}})),new MutationObserver((()=>{document.querySelectorAll('ul.sub-menu[role="menubar"]').forEach((e=>{e.setAttribute("role","menu")})),document.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] button').forEach((e=>{e.setAttribute("tabindex","-1")}))})).observe(document.body,{childList:!0,subtree:!0})}));
