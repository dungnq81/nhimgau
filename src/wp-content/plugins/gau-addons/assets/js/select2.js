jQuery((function(t){const e=t(".select2-multiple");t.each(e,(function(e,d){t(d).select2({multiple:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(d).attr("placeholder")})}));const d=t(".select2-tags");t.each(d,(function(e,d){t(d).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(d).attr("placeholder")})}));const l=t(".select2-ips");t.each(l,(function(e,d){t(d).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(d).attr("placeholder"),createTag:function(e){let d=t.trim(e.term);return function(t){const e=/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})-(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,d=/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\/(\d|[1-2]\d|3[0-2])$/;if(/^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/.test(t))return!0;if(e.test(t)){const[e,d]=t.split("-"),l=e.split(".").slice(0,3).join(".")+"."+d;return function(t,e){const d=t.split(".").map(Number),l=e.split(".").map(Number);for(let r=0;r<4;r++){if(d[r]<l[r])return-1;if(d[r]>l[r])return 1}return 0}(e,l)<0}return d.test(t)}(d)?{id:d,text:d}:null}})}));const r=t(".select2-emails");t.each(r,(function(e,d){t(d).select2({multiple:!0,tags:!0,allowClear:!0,width:"resolve",dropdownAutoWidth:!0,placeholder:t(d).attr("placeholder"),createTag:function(e){let d=t.trim(e.term);return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d)?{id:d,text:d}:null}})}))}));