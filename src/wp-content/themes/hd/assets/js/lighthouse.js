import{h as e}from"./config.js";!async function(){let t=!1;if((navigator.userAgent.includes("Lighthouse")||navigator.webdriver)&&(t=!0),!t&&void 0!==e)try{const a=await fetch(e._ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"check_lighthouse",_wpnonce:e._csrfToken})}),o=await a.json();o.success&&o.data.lighthouse&&(t=!0)}catch(a){}t&&document.documentElement.classList.add("is-lighthouse")}();
