!async function(){let e=!1;if((navigator.userAgent.includes("Lighthouse")||navigator.webdriver)&&(e=!0),!e&&void 0!==window.hdConfig)try{let n=await fetch(window.hdConfig._ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"check_lighthouse",_wpnonce:window.hdConfig._csrfToken})}),t=await n.json();t.success&&t.data.detected&&(e=!0)}catch(n){}e&&document.documentElement.classList.add("is-lighthouse")}();
