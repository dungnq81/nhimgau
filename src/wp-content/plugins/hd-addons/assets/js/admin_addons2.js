import{a as t}from"./_vendor.js";Object.assign(window,{Cookies:t}),jQuery((function(t){if("undefined"!=typeof codemirror_settings){let t=function(t,e,n){t.forEach((t=>{if(!t.CodeMirror){let n=e?{...e}:{};n.codemirror={...n.codemirror,indentUnit:3,tabSize:3,autoRefresh:!0},t.CodeMirror=wp.codeEditor.initialize(t,n)}}))};const e=document.querySelectorAll(".codemirror_css"),n=document.querySelectorAll(".codemirror_html");t(e,codemirror_settings.codemirror_css),t(n,codemirror_settings.codemirror_html)}t.fn.fadeOutAndRemove=function(e){return this.fadeOut(e,(function(){t(this).remove()}))},t.fn.serializeObject=function(){let e={},n=this.serializeArray();return t.each(n,(function(){let t=this.name,n=this.value||"";t.indexOf("[]")>-1?(t=t.replace("[]",""),e[t]||(e[t]=[]),e[t].push(n)):void 0!==e[t]?(Array.isArray(e[t])||(e[t]=[e[t]]),e[t].push(n)):e[t]=n})),e},t(document).on("click",".notice-dismiss",(function(e){var n;null==(n=t(this).closest(".notice.is-dismissible"))||n.fadeOutAndRemove(500)})),t(document).on("submit","#_settings_form",(function(e){e.preventDefault();let n=t(this),i=n.serializeObject(),o=n.find('button[name="_submit_settings"]'),s=o.html();o.prop("disabled",!0).html('<span class="ajax-loader">&nbsp;</span>'),t.ajax({type:"POST",url:ajaxurl,data:{action:"submit_settings",_data:i,_ajax_nonce:n.find('input[name="_wpnonce"]').val(),_wp_http_referer:n.find('input[name="_wp_http_referer"]').val()}}).done((function(t){o.prop("disabled",!1).html(s),n.find("#_content").prepend(t),(!window.location.hash||"#global_setting_settings"===window.location.hash||"#custom_css_settings"===window.location.hash||"#custom_script_settings"===window.location.hash||"#custom_sorting_settings"===window.location.hash&&void 0!==i.order_reset||"#base_slug_settings"===window.location.hash&&void 0!==i.base_slug_reset)&&window.location.reload(),setTimeout((()=>{var t,e;null==(e=null==(t=n.find("#_content"))?void 0:t.find(".dismissible-auto"))||e.fadeOutAndRemove(400)}),4e3)})).fail((function(t,e,n){o.prop("disabled",!1).html(s)}))}));t(".filter-tabs").each((function(){const e=t(this),n=e.find(".tabs-nav"),i=e.find(".tabs-content"),o=n.find("a"),s=window.location.hash,r=e=>{const s=n.find(`a[href="${e}"]`);n.find("a").removeClass("current"),i.find(".tabs-panel").hide(),s.length?(s.addClass("current"),t(e).show()):(o.first().addClass("current"),i.find(".tabs-panel").first().show(),window.history.replaceState(null,null,window.location.pathname+window.location.search))};r(s||o.first().attr("href")),n.on("click","a",(function(n){n.preventDefault();const i=t(this).attr("href");window.location.hash=i,r(i),t("html, body").animate({scrollTop:e.offset().top-t("header").outerHeight()},300)})),t(window).on("hashchange",(function(){r(window.location.hash||o.first().attr("href"))}))}))}));
