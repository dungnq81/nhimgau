import{F as a,r as n,G as e,R as s,t as i,o,i as u,K as r,B as g,N as l,b as t,M as p,c as d,d as m,T as c,e as j,f as y,D as v,g as Q,A as T,h as M,j as f,k as b,O as w,m as E,p as h,q,s as A,u as O,v as R,E as D,I as k,w as I,a as S}from"./vendor.js";Object.assign(window,{$:jQuery,jQuery:jQuery}),Object.assign(a,{rtl:n,GetYoDigits:e,RegExpEscape:s,transitionend:i,onLoad:o,ignoreMousedisappear:u,Keyboard:r,Box:g,Nest:l,onImagesLoaded:t,MediaQuery:p,Motion:d,Move:m,Touch:c,Triggers:j,Timer:y}),c.init(jQuery),j.init(jQuery,a),p._init();[{plugin:v,name:"Dropdown"},{plugin:Q,name:"DropdownMenu"},{plugin:T,name:"Accordion"},{plugin:M,name:"AccordionMenu"},{plugin:f,name:"ResponsiveMenu"},{plugin:b,name:"ResponsiveToggle"},{plugin:w,name:"OffCanvas"},{plugin:E,name:"Reveal"},{plugin:h,name:"Tooltip"},{plugin:q,name:"SmoothScroll"},{plugin:A,name:"Magellan"},{plugin:O,name:"Sticky"},{plugin:R,name:"Toggler"},{plugin:D,name:"Equalizer"},{plugin:k,name:"Interchange"},{plugin:I,name:"Abide"}].forEach((({plugin:n,name:e})=>{a.plugin(n,e)})),a.addToJquery(jQuery),a.Abide.defaults.validators.notEqualTo=function(a,n,e){return!n||jQuery("#"+a.attr("data-notEqualTo")).val()!==a.val()},jQuery((()=>jQuery(document).foundation())),Object.assign(window,{Cookies:S});