import"./_vendor.js";import{i as t}from"./social-share.js";document.querySelectorAll('a._blank, a.blank, a[target="_blank"]').forEach((t=>{t.hasAttribute("target")&&"_blank"===t.getAttribute("target")||t.setAttribute("target","_blank");const e=null==t?void 0:t.getAttribute("rel");if(!e||!e.includes("noopener")||!e.includes("nofollow")){const o=(e?e+" ":"")+"noopener noreferrer nofollow";t.setAttribute("rel",o)}})),new MutationObserver((()=>{document.querySelectorAll('ul.sub-menu[role="menubar"]').forEach((t=>{t.setAttribute("role","menu")})),document.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] button').forEach((t=>{t.setAttribute("tabindex","-1")}))})).observe(document.body,{childList:!0,subtree:!0});class e{constructor(t=".back-to-top",e=!0,o=400){this.buttonSelector=t,this.smoothScrollEnabled=e,this.defaultScrollSpeed=o,this.init()}init(){"querySelector"in document&&"addEventListener"in window&&(this.goTopBtn=document.querySelector(this.buttonSelector),this.goTopBtn&&(this.scrollThreshold=parseInt(this.goTopBtn.getAttribute("data-scroll-start"),10)||300,window.addEventListener("scroll",this.trackScroll.bind(this)),this.goTopBtn.addEventListener("click",this.scrollToTop.bind(this),!1)))}trackScroll(){window.scrollY>this.scrollThreshold?this.goTopBtn.classList.add("back-to-top__show"):this.goTopBtn.classList.remove("back-to-top__show")}scrollToTop(t){if(t.preventDefault(),this.smoothScrollEnabled){const t=parseInt(this.goTopBtn.getAttribute("data-scroll-speed"),10)||this.defaultScrollSpeed;this.smoothScroll(t)}else window.scrollTo(0,0)}smoothScroll(t){const e=window.scrollY,o=-e;let n=null;const r=l=>{n||(n=l);const i=l-n,s=this.easeInOutQuad(i,e,o,t);window.scrollTo(0,s),i<t&&requestAnimationFrame(r)};requestAnimationFrame(r)}easeInOutQuad(t,e,o,n){return(t/=n/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e}}setTimeout((()=>{new e}),100),((t=3e3,e='script[data-type="lazy"]')=>{const o=setTimeout(r,t);function n(){r(),clearTimeout(o)}function r(){document.querySelectorAll(e).forEach((t=>{const e=t.getAttribute("data-src");e&&(t.setAttribute("src",e),t.removeAttribute("data-src"),t.removeAttribute("data-type"))}))}["mouseover","keydown","touchstart","touchmove","wheel"].forEach((t=>{window.addEventListener(t,n,{once:!0,passive:!0})}))})(),document.addEventListener("DOMContentLoaded",(()=>{(function(t,e){const o=document.querySelector(t),n=document.querySelector(e);if(!o||!n)return;function r(){let t=n.querySelector(".more");t||(t=document.createElement("li"),t.classList.add("menu-item","more"),t.innerHTML='<a href="#"></a><ul class="sub-menu dropdown"></ul>',n.appendChild(t));const e=t.querySelector(".dropdown");e.innerHTML="",t.style.display="none";let r=[...n.children].filter((e=>e!==t));if(r.forEach((t=>t.style.display="block")),n.scrollWidth<=o.clientWidth)return void l();let i=[];for(let l=r.length-1;l>=0&&n.scrollWidth>o.clientWidth;l--)i.unshift(r[l]),r[l].style.display="none";i.length>0&&(i.forEach((t=>{let o=t.cloneNode(!0);o.style.display="block",e.appendChild(o)})),t.style.display="block"),l()}function l(){o.style.overflow="visible"}let i;window.addEventListener("resize",(function(){o.style.overflow="hidden",clearTimeout(i),i=setTimeout((()=>{r(),function(){if("undefined"!=typeof Foundation){let t=$(e);t.length&&new Foundation.DropdownMenu(t)}}()}),100)})),r()})("nav.nav",".main-nav"),t("[data-social-share]",{intents:["facebook","x","print","send-email","copy-link","web-share"]})}));
