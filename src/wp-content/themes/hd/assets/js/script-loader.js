const t=(t=4e3,e="script[data-type='lazy']")=>{const o=setTimeout(c,t);function r(){c(),clearTimeout(o)}function c(){document.querySelectorAll(e).forEach((t=>{const e=t.getAttribute("data-src");e&&(t.setAttribute("src",e),t.removeAttribute("data-src"),t.removeAttribute("data-type"))}))}["mouseover","keydown","touchstart","touchmove","wheel"].forEach((t=>{window.addEventListener(t,r,{once:!0,passive:!0})}))};export{t as s};
