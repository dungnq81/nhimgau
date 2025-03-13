import { s as select2, a as index } from "./_vendor.js";
import { B as BackToTop } from "./back-to-top.js";
import { s as scriptLoader } from "./script-loader.js";
select2();
window.ResizeObserver = index;
({ ...typeof hd !== "undefined" ? hd : {} });
document.addEventListener("DOMContentLoaded", () => {
  new BackToTop();
  scriptLoader(4e3, "script[data-type='lazy']");
  document.querySelectorAll('a._blank, a.blank, a[target="_blank"]').forEach((el) => {
    if (!el.hasAttribute("target") || el.getAttribute("target") !== "_blank") {
      el.setAttribute("target", "_blank");
    }
    const relValue = el == null ? void 0 : el.getAttribute("rel");
    if (!relValue || !relValue.includes("noopener") || !relValue.includes("nofollow")) {
      const newRelValue = (relValue ? relValue + " " : "") + "noopener noreferrer nofollow";
      el.setAttribute("rel", newRelValue);
    }
  });
});
//# sourceMappingURL=index.js.map
