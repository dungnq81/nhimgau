import { F as Foundation, r as rtl, G as GetYoDigits, R as RegExpEscape, a as transitionend, o as onLoad, b as ignoreMousedisappear, K as Keyboard, B as Box, N as Nest, c as onImagesLoaded, M as MediaQuery, d as Motion, e as Move, T as Touch, f as Triggers, g as Timer, D as Dropdown, h as DropdownMenu, A as Accordion, j as AccordionMenu, k as ResponsiveMenu, l as ResponsiveToggle, O as OffCanvas, m as Reveal, p as Tooltip, q as SmoothScroll, s as Magellan, u as Sticky, v as Toggler, E as Equalizer, I as Interchange, w as Abide, x as api } from "./_vendor.js";
import { B as BackToTop } from "./back-to-top.js";
import { l as lazyLoader } from "./lazy-loader.js";
import { i as initializeSocialShare } from "./social-share.js";
Object.assign(window, { $: jQuery, jQuery });
Object.assign(Foundation, {
  rtl,
  GetYoDigits,
  RegExpEscape,
  transitionend,
  onLoad,
  ignoreMousedisappear,
  Keyboard,
  Box,
  Nest,
  onImagesLoaded,
  MediaQuery,
  Motion,
  Move,
  Touch,
  Triggers,
  Timer
});
Touch.init(jQuery);
Triggers.init(jQuery, Foundation);
MediaQuery._init();
const plugins = [
  { plugin: Dropdown, name: "Dropdown" },
  { plugin: DropdownMenu, name: "DropdownMenu" },
  { plugin: Accordion, name: "Accordion" },
  { plugin: AccordionMenu, name: "AccordionMenu" },
  { plugin: ResponsiveMenu, name: "ResponsiveMenu" },
  { plugin: ResponsiveToggle, name: "ResponsiveToggle" },
  { plugin: OffCanvas, name: "OffCanvas" },
  { plugin: Reveal, name: "Reveal" },
  { plugin: Tooltip, name: "Tooltip" },
  { plugin: SmoothScroll, name: "SmoothScroll" },
  { plugin: Magellan, name: "Magellan" },
  { plugin: Sticky, name: "Sticky" },
  { plugin: Toggler, name: "Toggler" },
  { plugin: Equalizer, name: "Equalizer" },
  { plugin: Interchange, name: "Interchange" },
  { plugin: Abide, name: "Abide" }
];
plugins.forEach(({ plugin, name }) => {
  Foundation.plugin(plugin, name);
});
Foundation.addToJquery(jQuery);
function notEqualToValidator($el, required, parent) {
  if (!required) return true;
  let input1Value = jQuery("#" + $el.attr("data-notEqualTo")).val(), input2Value = $el.val();
  return input1Value !== input2Value;
}
Foundation.Abide.defaults.validators["notEqualTo"] = notEqualToValidator;
jQuery(() => jQuery(document).foundation());
Object.assign(window, { Cookies: api });
lazyLoader(4e3, "script[data-type='lazy']");
const customOptions = {
  displays: [
    "facebook",
    "ex",
    "whatsapp",
    "messenger",
    "telegram",
    "linkedin",
    "send-email",
    "copy-link",
    "web-share"
  ]
};
function init() {
  new BackToTop();
  initializeSocialShare("social-share", customOptions);
}
document.addEventListener("DOMContentLoaded", function() {
  init();
});
//# sourceMappingURL=app2.js.map
