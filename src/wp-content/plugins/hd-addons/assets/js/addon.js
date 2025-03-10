import{s as t}from"./_vendor.js";t(),jQuery((function(t){if(t(".addon-color-field").wpColorPicker(),"undefined"!=typeof codemirror_settings){let t=function(t,e,o){t.forEach((t=>{if(!t.CodeMirror){let o=e?{...e}:{};o.codemirror={...o.codemirror,indentUnit:3,tabSize:3,autoRefresh:!0},t.CodeMirror=wp.codeEditor.initialize(t,o)}}))};const e=document.querySelectorAll(".codemirror_css"),o=document.querySelectorAll(".codemirror_html");t(e,codemirror_settings.codemirror_css),t(o,codemirror_settings.codemirror_html)}t.fn.fadeOutAndRemove=function(e){return this.fadeOut(e,(function(){t(this).remove()}))},t.fn.serializeObject=function(){let e={},o=this.serializeArray();return t.each(o,(function(){let t=this.name,o=this.value||"";t.indexOf("[]")>-1?(t=t.replace("[]",""),e[t]||(e[t]=[]),e[t].push(o)):void 0!==e[t]?(Array.isArray(e[t])||(e[t]=[e[t]]),e[t].push(o)):e[t]=o})),e},t(document).on("click",".notice-dismiss",(function(e){var o;null==(o=t(this).closest(".notice.is-dismissible"))||o.fadeOutAndRemove(500)})),t(document).on("submit","#_settings_form",(function(e){e.preventDefault();let o=t(this),n=o.serializeObject(),i=o.find('button[name="_submit_settings"]'),r=i.html();i.prop("disabled",!0).html('<span class="ajax-loader">&nbsp;</span>'),t.ajax({type:"POST",url:ajaxurl,data:{action:"submit_settings",_data:n,_ajax_nonce:o.find('input[name="_wpnonce"]').val(),_wp_http_referer:o.find('input[name="_wp_http_referer"]').val()}}).done((function(t){i.prop("disabled",!1).html(r),o.find("#_content").prepend(t),(!window.location.hash||"#global_setting_settings"===window.location.hash||"#custom_css_settings"===window.location.hash||"#custom_script_settings"===window.location.hash||"#custom_sorting_settings"===window.location.hash&&void 0!==n.order_reset||"#base_slug_settings"===window.location.hash&&void 0!==n.base_slug_reset)&&window.location.reload(),setTimeout((()=>{var t,e;null==(e=null==(t=o.find("#_content"))?void 0:t.find(".dismissible-auto"))||e.fadeOutAndRemove(400)}),4e3)})).fail((function(t,e,o){i.prop("disabled",!1).html(r)}))})),t(".filter-tabs").each((function(){const e=t(this),o=e.find(".tabs-nav"),n=e.find(".tabs-content"),i=o.find("a"),r=window.location.hash,d=e=>{const r=o.find(`a[href="${e}"]`);o.find("a").removeClass("current"),n.find(".tabs-panel").hide(),r.length?(r.addClass("current"),t(e).show()):(i.first().addClass("current"),n.find(".tabs-panel").first().show(),window.history.replaceState(null,null,window.location.pathname+window.location.search))};d(r||i.first().attr("href")),o.on("click","a",(function(o){o.preventDefault();const n=t(this).attr("href");window.location.hash=n,d(n),t("html, body").animate({scrollTop:e.offset().top-t("header").outerHeight()},300)})),t(window).on("hashchange",(function(){d(window.location.hash||i.first().attr("href"))}))}));const e=t(".select2-multiple");t.each(e,(function(e,o){t(o).select2({multiple:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(o).attr("placeholder")})}));const o=t(".select2-tags");t.each(o,(function(e,o){t(o).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(o).attr("placeholder")})}));const n=t(".select2-ips");t.each(n,(function(e,o){t(o).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(o).attr("placeholder"),createTag:function(e){let o=t.trim(e.term);return function(t){if(/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/.test(t))return!0;if(/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})-(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(t)){const[e,o]=t.split("-"),n=e.split(".").slice(0,3).join(".")+"."+o;return function(t,e){const o=t.split(".").map(Number),n=e.split(".").map(Number);for(let i=0;i<4;i++){if(o[i]<n[i])return-1;if(o[i]>n[i])return 1}return 0}(e,n)<0}return/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\/(\d|[1-2]\d|3[0-2])$/.test(t)}(o)?{id:o,text:o}:null}})}));const i=t(".select2-emails");t.each(i,(function(e,o){t(o).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(o).attr("placeholder"),createTag:function(e){let o=t.trim(e.term);return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)?{id:o,text:o}:null}})}))}));
