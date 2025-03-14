import { b as SocialShare } from "./_vendor.js";
const DEFAULT_OPTIONS = {
  layout: "v",
  intents: [
    "facebook",
    "x",
    "linkedin",
    "threads",
    "bluesky",
    "reddit",
    "mastodon",
    "quora",
    "whatsapp",
    "messenger",
    "telegram",
    "skype",
    "viber",
    "line",
    "snapchat",
    "send-email",
    "copy-link",
    "web-share",
    "print"
  ],
  onIntent: (self, event, intent, data) => {
    return intent === "print" && setTimeout(window.print, 200);
  }
};
function initSocialShare(customOptions = {}) {
  const elements = document.querySelectorAll("[data-social-share]");
  const options = {
    ...DEFAULT_OPTIONS,
    ...customOptions
  };
  elements.forEach((element) => {
    new SocialShare(element, options);
  });
}
const observer = new MutationObserver(() => {
  const printButton = document.querySelector(".share-intent-print");
  if (printButton) {
    printButton.setAttribute("title", "Print");
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
export {
  initSocialShare as i
};
//# sourceMappingURL=social-share.js.map
