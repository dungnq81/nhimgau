import{i as e,t as s,n as t,S as r}from"./_vendor.js";const a=(e,s,t)=>{if(!(e instanceof Element))return;const a=new r(s,t);return e.addEventListener("mouseover",(()=>{a.autoplay.stop()})),e.addEventListener("mouseout",(()=>{t.autoplay&&a.autoplay.start()})),a},i=()=>{const e=t(9);return{rand:e,swiperClass:"swiper-"+e,nextClass:"next-"+e,prevClass:"prev-"+e,paginationClass:"pagination-"+e,scrollbarClass:"scrollbar-"+e}},l=(e,s)=>Math.floor(Math.random()*(s-e+1))+e;document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".w-swiper").forEach(((t,r)=>{var o;const n=i();t.classList.add(n.swiperClass);let d=null==(o=t.closest(".swiper-section"))?void 0:o.querySelector(".swiper-controls");d||(d=document.createElement("div"),d.classList.add("swiper-controls"),t.after(d));const c=null==t?void 0:t.querySelector(".swiper-wrapper");let p=JSON.parse(c.dataset.options)||{};e(p)&&(p={autoview:!0,autoplay:!0,navigation:!0});let u={grabCursor:!0,allowTouchMove:!0,threshold:5,hashNavigation:!1,mousewheel:!1,wrapperClass:"swiper-wrapper",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active"};if(p.autoview?(u.slidesPerView="auto",p.gap&&(u.spaceBetween=20,u.breakpoints={768:{spaceBetween:28}})):u.breakpoints={0:p.mobile||{},768:p.tablet||{},1024:p.desktop||{}},p.observer&&(u.observer=!0,u.observeParents=!0),p.effect&&(u.effect=s(p.effect),"fade"===u.effect&&(u.fadeEffect={crossFade:!0})),p.autoheight&&(u.autoHeight=!0),p.loop&&(u.loop=!0),p.parallax&&(u.parallax=!0),p.direction&&(u.direction=s(p.direction)),p.centered&&(u.centeredSlides=!0),p.freemode&&(u.freeMode=!0),p.cssmode&&(u.cssMode=!0),u.speed=p.speed?parseInt(p.speed):l(300,900),p.autoplay&&(u.autoplay={disableOnInteraction:!1,delay:p.delay?parseInt(p.delay):l(3e3,6e3)},p.reverse&&(u.reverseDirection=!0)),p.navigation){const e=t.closest(".swiper-section");let s=null==e?void 0:e.querySelector(".swiper-button-prev"),r=null==e?void 0:e.querySelector(".swiper-button-next");s&&r?(s.classList.add(n.prevClass),r.classList.add(n.nextClass)):(s=document.createElement("div"),r=document.createElement("div"),s.classList.add("swiper-button","swiper-button-prev",n.prevClass),r.classList.add("swiper-button","swiper-button-next",n.nextClass),d.append(s,r),s.setAttribute("data-fa",""),r.setAttribute("data-fa","")),u.navigation={nextEl:"."+n.nextClass,prevEl:"."+n.prevClass}}if(p.pagination){const e=t.closest(".swiper-section");let s=null==e?void 0:e.querySelector(".swiper-pagination");s?s.classList.add(n.paginationClass):(s=document.createElement("div"),s.classList.add("swiper-pagination",n.paginationClass),d.appendChild(s));const r=p.pagination;u.pagination={el:"."+n.paginationClass,clickable:!0,..."bullets"===r&&{dynamicBullets:!1,type:"bullets"},..."fraction"===r&&{type:"fraction"},..."progressbar"===r&&{type:"progressbar"},..."custom"===r&&{renderBullet:(e,s)=>`<span class="${s}">${e+1}</span>`}}}if(p.scrollbar){const e=t.closest(".swiper-section");let s=null==e?void 0:e.querySelector(".swiper-scrollbar");s?s.classList.add(n.scrollbarClass):(s=document.createElement("div"),s.classList.add("swiper-scrollbar",n.scrollbarClass),d.appendChild(s)),u.scrollbar={el:"."+n.scrollbarClass,hide:!0,draggable:!0}}p.marquee&&(u.centeredSlides=!1,u.autoplay={delay:1,disableOnInteraction:!0},u.loop=!0,u.speed=6e3,u.allowTouchMove=!0),p.rows&&(u.direction="horizontal",u.loop=!1,u.grid={rows:parseInt(p.rows),fill:"row"}),a(t,"."+n.swiperClass,u)}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".swiper-product-gallery").forEach(((e,s)=>{const t=i();e.classList.add(t.swiperClass);const r=null==e?void 0:e.querySelector(".swiper-images"),l=null==e?void 0:e.querySelector(".swiper-thumbs");let o=!1,n=!1;if(l){null==l||l.querySelector(".swiper-button-prev").classList.add("prev-thumbs-"+t.rand),null==l||l.querySelector(".swiper-button-next").classList.add("next-thumbs-"+t.rand),l.classList.add("thumbs-"+t.rand);let e={grabCursor:!0,allowTouchMove:!0,threshold:5,hashNavigation:!1,mousewheel:!1,wrapperClass:"swiper-wrapper",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",breakpoints:{0:{spaceBetween:5,slidesPerView:4},768:{spaceBetween:10,slidesPerView:5},1024:{spaceBetween:10,slidesPerView:6}}};e.navigation={prevEl:".prev-thumbs-"+t.rand,nextEl:".next-thumbs-"+t.rand},n=a(l,".thumbs-"+t.rand,e)}if(r){null==r||r.querySelector(".swiper-button-prev").classList.add("prev-images-"+t.rand),null==r||r.querySelector(".swiper-button-next").classList.add("next-images-"+t.rand),r.classList.add("images-"+t.rand);let e={grabCursor:!0,allowTouchMove:!0,threshold:5,hashNavigation:!1,mousewheel:!1,wrapperClass:"swiper-wrapper",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slidesPerView:"auto",spaceBetween:10,watchSlidesProgress:!0};e.navigation={prevEl:".prev-images-"+t.rand,nextEl:".next-images-"+t.rand},n&&(e.thumbs={swiper:n}),o=a(r,".images-"+t.rand,e)}let d=null==r?void 0:r.querySelector(".swiper-images-first img");d.removeAttribute("srcset");let c=d.getAttribute("src"),p=null==r?void 0:r.querySelector(".swiper-images-first .image-popup"),u=!1,w=!1,v=!1;n&&(u=null==l?void 0:l.querySelector(".swiper-thumbs-first img"),u.removeAttribute("srcset"),w=u.getAttribute("src"),v=u.getAttribute("data-large_image"));const b=jQuery("form.variations_form");b&&(b.on("found_variation",(function(e,s){s.image.src&&(d.setAttribute("src",s.image.src),p.setAttribute("data-src",s.image.full_src),n&&u.setAttribute("src",s.image.gallery_thumbnail_src),o.slideTo(0))})),b.on("reset_image",(function(){d.setAttribute("src",c),p.setAttribute("data-src",v),n&&u.setAttribute("src",w),o.slideTo(0)})))}))}));
