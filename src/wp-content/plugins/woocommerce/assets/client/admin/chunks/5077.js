"use strict";(globalThis.webpackChunk_wcAdmin_webpackJsonp=globalThis.webpackChunk_wcAdmin_webpackJsonp||[]).push([[5077],{58533:(e,o,t)=>{t.r(o),t.d(o,{Products:()=>C});var r=t(44698),c=t(98817),s=t(65736),n=t(59550),i=t(91667),a=t(58176),d=t(55609),l=t(69307),p=t(74617),m=t(14599),u=t(639),_=t(86020),h=t(81514);const k=({items:e})=>(0,h.jsx)("div",{className:"woocommerce-products-card-list",children:(0,h.jsx)(_.List,{items:e})});var v=t(83300);const g=[{key:"from-csv",title:(0,s.__)("FROM A CSV FILE","woocommerce"),content:(0,s.__)("Import all products at once by uploading a CSV file.","woocommerce"),before:(0,h.jsx)(v.Z,{}),onClick:()=>{(0,m.recordEvent)("tasklist_add_product",{method:"import"}),window.location.href=(0,p.getAdminLink)("edit.php?post_type=product&page=product_importer&wc_onboarding_active_task=products")}}];var w=t(55684),f=t(76731),b=t(43378),j=t(19987),x=t(24304),y=t(80945);const C=()=>{const[e,o]=(0,l.useState)(!1),{recordCompletionTime:t}=(0,y.Z)("products"),[r,c]=(0,l.useState)(!1),_=(0,l.useMemo)((()=>g.map((e=>({...e,onClick:()=>{e.onClick(),t()}})))),[t]),{loadSampleProduct:v,isLoadingSampleProducts:C}=(0,j.Z)({redirectUrlAfterSuccess:(0,p.getAdminLink)("edit.php?post_type=product&wc_onboarding_active_task=products")}),{productTypes:O}=(0,w.Z)((0,f.Q)(),[],{onClick:t}),Z=(0,h.jsx)(u.Z,{items:O,onClickLoadSampleProduct:()=>c(!0)});return(0,h.jsxs)("div",{className:"woocommerce-task-import-products",children:[(0,h.jsx)("h1",{children:(0,s.__)("Import your products","woocommerce")}),(0,h.jsx)(k,{items:_}),(0,h.jsxs)("div",{className:"woocommerce-task-import-products-stacks",children:[(0,h.jsxs)(d.Button,{onClick:()=>{(0,m.recordEvent)("tasklist_add_product_from_scratch_click"),o(!e)},children:[(0,s.__)("Or add your products from scratch","woocommerce"),(0,h.jsx)(n.Z,{icon:e?i.Z:a.Z})]}),e&&Z]}),C?(0,h.jsx)(b.Z,{}):r&&(0,h.jsx)(x.Z,{onCancel:()=>{c(!1),(0,m.recordEvent)("tasklist_cancel_load_sample_products_click")},onImport:()=>{c(!1),v()}})]})};(0,c.registerPlugin)("wc-admin-onboarding-task-products",{scope:"woocommerce-tasks",render:()=>(0,h.jsx)(r.WooOnboardingTask,{id:"products",children:(0,h.jsx)(C,{})})})},83300:(e,o,t)=>{o.Z=function(e){var o=e.size,t=void 0===o?24:o,r=e.onClick,i=(e.icon,e.className),a=function(e,o){if(null==e)return{};var t,r,c=function(e,o){if(null==e)return{};var t,r,c={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],0<=o.indexOf(t)||(c[t]=e[t]);return c}(e,o);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],0<=o.indexOf(t)||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}(e,s),d=["gridicon","gridicons-pages",i,!1,!1,!1].filter(Boolean).join(" ");return c.default.createElement("svg",n({className:d,height:t,width:t,onClick:r},a,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}),c.default.createElement("g",null,c.default.createElement("path",{d:"M16 8H8V6h8v2zm0 2H8v2h8v-2zm4-6v12l-6 6H6a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2zm-2 10V4H6v16h6v-4a2 2 0 012-2h4z"})))};var r,c=(r=t(99196))&&r.__esModule?r:{default:r},s=["size","onClick","icon","className"];function n(){return n=Object.assign?Object.assign.bind():function(e){for(var o,t=1;t<arguments.length;t++)for(var r in o=arguments[t])Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);return e},n.apply(this,arguments)}}}]);