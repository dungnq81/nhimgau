var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var ensembleSocialShare_min = {};
/*!
 * loltgt/ensemble.SocialShare
 *
 * @version 0.0.3
 * @link https://github.com/loltgt/ensemble-social-share
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */
(function(exports) {
  !function(e, t) {
    t(exports);
  }("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : commonjsGlobal, function(e) {
    Object.defineProperty(e, "__esModule", { value: true }), e.SocialShare = void 0;
    const t = "undefined" == typeof Symbol ? 0 : Symbol, s = /html|head|body|meta|link|style|script/i, n = /(<(html|head|body|meta|link|style|script)*>)/i;
    const i = /html|head|body|meta|link|style|script/i, o = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;
    class Compo extends class _composition {
      _renderer() {
        delete this._element, delete this._renderer;
      }
      install(e2, t2) {
        return "function" == typeof t2 && t2.call(this, this[this._ns]), !!e2.appendChild(this[this._ns]);
      }
      uninstall(e2, t2) {
        return "function" == typeof t2 && t2.call(this, this[this._ns]), !!e2.removeChild(this[this._ns]);
      }
      up(e2, t2) {
        return "function" == typeof t2 && t2.call(this, this[this._ns]), !!e2.replaceWith(this[this._ns]);
      }
      append(e2) {
        const t2 = this._ns;
        return !!this[t2].appendChild(e2[t2]);
      }
      prepend(e2) {
        const t2 = this._ns;
        return !!this[t2].prependChild(e2[t2]);
      }
      remove(e2) {
        const t2 = this._ns;
        return !!this[t2].removeChild(e2[t2]);
      }
      inject(e2) {
        if (e2 instanceof Element == 0 || s.test(e2.tagName) || n.test(e2.innerHTML)) throw new Error("ensemble.Compo error: The remote object could not be resolved into a valid node.");
        return this.empty(), !!this[this._ns].appendChild(e2);
      }
      empty() {
        for (; this.first; ) this.remove(this.first);
      }
      get children() {
        return Array.prototype.map.call(this[this._ns].children, (e2) => e2.__compo);
      }
      get first() {
        const e2 = this._ns;
        return this[e2].firstElementChild ? this[e2].firstElementChild.__compo : null;
      }
      get last() {
        const e2 = this._ns;
        return this[e2].lastElementChild ? this[e2].lastElementChild.__compo : null;
      }
    } {
      constructor(e2, t2, s2, n2, r, l) {
        if (!new.target) throw "ensemble.Compo error: Bad invocation, must be called with new.";
        super();
        const a = this._ns = "_" + e2, c = t2 ? t2.toString() : "div";
        if (i.test(t2)) throw new Error("ensemble.Compo error: The tag name provided ('".concat(c, "') is not a valid name."));
        const h = this[a] = this._element(e2, c, s2, n2, r, l);
        if (this.__Compo = true, this[a].__compo = this, n2 && "object" == typeof n2) for (const t3 in n2) {
          const s3 = t3.toString();
          if (o.test(s3)) throw new Error("ensemble.Compo error: The property name provided ('".concat(s3, "') is not a valid name."));
          if (0 === s3.indexOf("on") && n2[s3] && "function" == typeof n2[s3]) h[s3] = n2[s3].bind(this);
          else if ("object" != typeof n2[s3]) h[s3] = n2[s3];
          else if ("children" == s3 && "object" == typeof n2[s3] && n2[s3].length) for (const t4 of n2.children) {
            const s4 = t4.tag, n3 = t4.name, i2 = t4.props;
            this.append(new Compo(e2, s4, n3, i2));
          }
        }
        if (s2) {
          const t3 = h.className;
          h.className = "", "string" == typeof s2 ? h.className = e2 + "-" + s2 : "object" == typeof s2 && (h.className = s2.map((t4) => e2 + "-" + t4).join(" ")), t3 && (h.className += " " + t3);
        }
        this._renderer();
      }
      _element(e2, t2, s2, n2, i2, o2) {
        return o2 ? document.createElementNS(t2, [...o2, ...i2]) : document.createElement(t2, i2);
      }
      hasAttr(e2) {
        return this[this._ns].hasAttribute(e2);
      }
      getAttr(e2) {
        return this[this._ns].getAttribute(e2);
      }
      setAttr(e2, t2) {
        this[this._ns].setAttribute(e2, t2);
      }
      delAttr(e2) {
        this[this._ns].removeAttribute(e2);
      }
      getStyle(e2) {
        return window.getComputedStyle(this[this._ns])[e2];
      }
      show() {
        this[this._ns].hidden = false;
      }
      hide() {
        this[this._ns].hidden = true;
      }
      enable() {
        this[this._ns].disabled = false;
      }
      disable() {
        this[this._ns].disabled = true;
      }
      get node() {
        return console.warn("ensemble.Compo", "Direct access to the node is strongly discouraged."), this[this._ns];
      }
      get parent() {
        const e2 = this._ns;
        return this[e2].parentElement && "__compo" in this[e2].parentElement ? this[e2].parentElement.__compo : null;
      }
      get previous() {
        const e2 = this._ns;
        return this[e2].previousElementSibling ? this[e2].previousElementSibling.__compo : null;
      }
      get next() {
        const e2 = this._ns;
        return this[e2].nextElementSibling ? this[e2].nextElementSibling.__compo : null;
      }
      get classList() {
        return this[this._ns].classList;
      }
      static isCompo(e2) {
        return t ? t.for(e2) === t.for(Compo.prototype) : e2 && "object" == typeof e2 && "__Compo" in e2;
      }
      get [t.toStringTag]() {
        return "ensemble.Compo";
      }
    }
    class Data {
      constructor(e2, t2) {
        if (!new.target) throw "ensemble.Data error: Bad invocation, must be called with new.";
        t2 && "object" == typeof t2 && Object.assign(this, {}, t2);
        const s2 = this._ns = "_" + e2;
        this.__Data = true, this[s2] = { ns: e2 };
      }
      compo(e2, t2, s2) {
        let n2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], i2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o2 = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        const r = this[this._ns].ns;
        let l;
        return l = n2 ? { ns: r, tag: e2, name: t2, props: s2, fresh: i2, stale: o2 } : new Compo(r, e2, t2, s2), i2 && "function" == typeof i2 && (l.fresh = s2.onfresh = i2), o2 && "function" == typeof o2 && (l.stale = s2.onstale = o2), l;
      }
      async render(e2) {
        const t2 = this._ns;
        this[t2][e2] && this[t2][e2].rendered || (this[t2][e2] = { rendered: true, fresh: this[e2].fresh, stale: this[e2].stale, params: this[e2] }, this[e2] = new Compo(this[e2].ns, this[e2].tag, this[e2].name, this[e2].props)), this[t2][e2].fresh();
      }
      async stale(e2) {
        const t2 = this._ns;
        this[t2][e2] && this[t2][e2].rendered && this[t2][e2].stale();
      }
      async reflow(e2, t2) {
        const s2 = this._ns;
        t2 ? this[s2][e2] = this.compo(this[s2][e2].params.ns, this[s2][e2].params.name, this[s2][e2].params.props) : this[s2][e2] && this[s2][e2].rendered && this[s2][e2].fresh();
      }
      static isData(e2) {
        return t ? t.for(e2) === t.for(Data.prototype) : e2 && "object" == typeof e2 && "__Data" in e2;
      }
      get [t.toStringTag]() {
        return "ensemble.Data";
      }
    }
    class Event {
      constructor(e2, t2, s2) {
        if (!new.target) throw "ensemble.Event error: Bad invocation, must be called with new.";
        const n2 = this._ns = "_" + e2;
        s2 = (Compo.isCompo(s2) ? s2.node : s2) || document, this.__Event = true, this[n2] = { name: t2, node: s2 };
      }
      add(e2) {
        let t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this[this._ns].node.addEventListener(this[this._ns].name, e2, t2);
      }
      remove(e2) {
        this[this._ns].node.removeEventListener(this[this._ns].name, e2);
      }
      static isEvent(e2) {
        return t ? t.for(e2) === t.for(Event.prototype) : e2 && "object" == typeof e2 && "__Event" in e2;
      }
      get [t.toStringTag]() {
        return "ensemble.Event";
      }
    }
    e.SocialShare = class SocialShare extends class base {
      constructor() {
        const e2 = "ensemble" + (new.target && new.target.name ? "." + new.target.name : "");
        let t2, s2;
        if (arguments.length > 1 ? (t2 = arguments[0], s2 = arguments[1]) : s2 = arguments[0], s2 && "object" != typeof s2) throw new TypeError("".concat(e2, " error: The passed argument 'options' is not of type Object."));
        if (t2 && "object" != typeof t2) throw new TypeError("".concat(e2, " error: The passed argument 'element' is not of type Object."));
        this._bindings(), this.options = this.defaults(this._defaults(), s2), Object.freeze(this.options), this.element = t2;
      }
      defaults(e2, t2) {
        const s2 = {};
        for (const n2 in e2) null != e2[n2] && "object" == typeof e2[n2] ? s2[n2] = Object.assign(e2[n2], t2[n2]) : s2[n2] = void 0 !== t2[n2] ? t2[n2] : e2[n2];
        return s2;
      }
      compo(e2, t2, s2) {
        return null != e2 ? new Compo(this.options.ns, e2, t2, s2) : Compo;
      }
      data(e2) {
        return null != e2 ? new Data(this.options.ns, e2) : Data;
      }
      event(e2, t2) {
        return "string" == typeof e2 ? new Event(this.options.ns, e2, t2) : e2 ? (e2.preventDefault(), void e2.target.blur()) : Event;
      }
      selector(e2, t2) {
        return t2 = t2 || document, arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? t2.querySelectorAll(e2) : t2.querySelector(e2);
      }
      appendNode(e2, t2) {
        return !!e2.appendChild(t2);
      }
      prependNode(e2, t2) {
        return !!e2.prependChild(t2);
      }
      removeNode(e2, t2) {
        return !!e2.removeChild(t2);
      }
      cloneNode(e2) {
        let t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e2.cloneNode(t2);
      }
      hasAttr(e2, t2) {
        return e2.hasAttribute(t2);
      }
      getAttr(e2, t2) {
        return e2.getAttribute(t2);
      }
      setAttr(e2, t2, s2) {
        e2.setAttribute(t2, s2);
      }
      delAttr(e2, t2) {
        e2.removeAttribute(t2);
      }
      binds(e2) {
        const t2 = this;
        return function(s2) {
          e2.call(t2, s2, this);
        };
      }
      delay(e2, t2, s2) {
        const n2 = t2 ? this.timing(t2) : 0;
        setTimeout(e2, n2 || s2);
      }
      timing(e2) {
        let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "transitionDuration", s2 = Compo.isCompo(e2) ? e2.getStyle(t2) : window.getComputedStyle(e2)[t2];
        return s2 && (s2 = s2.indexOf("s") ? 1e3 * parseFloat(s2) : parseInt(s2)), s2 || 0;
      }
    } {
      _defaults() {
        return { ns: "share", fx: true, root: "body", className: "social-share", link: "", title: "", description: "", displays: ["facebook", "ex", "whatsapp", "messenger", "telegram", "linkedin", "send-email", "copy-link", "web-share"], intents: { facebook: 0, ex: 0, twitter: 0, whatsapp: 1, messenger: 1, telegram: 1, linkedin: 0, "send-email": 2, "copy-link": 3, "web-share": 4 }, uriform: { facebook: "https://facebook.com/sharer.php?u=%url%", ex: "https://x.com/share?url=%url%&text=%title%", twitter: "https://twitter.com/share?url=%url%&text=%title%", whatsapp: "https://api.whatsapp.com/send?text=%text%", messenger: "fb-messenger://share/?link=%url%&app_id=%app_id%", telegram: "https://telegram.me/share/url?url=%url%&text=%text%", linkedin: "https://www.linkedin.com/sharing/share-offsite?mini=true&url=%url%&title=%title%&ro=false&summary=%summary%", "send-email": "mailto:?subject=%subject%&body=%text%" }, selectorLink: { element: 'link[rel="canonical"]', attribute: "href" }, selectorTitle: null, selectorDescription: { element: 'meta[name="description"]', attribute: "content" }, label: {}, locale: { label: "Share", share: "Share on %s", send: "Send to %s", subject: "An interesting thing", text: "Hi! There is something may interesting you: %s", email: "Send via email", copy: "Copy link", copied: "Copied link!", whatsapp: "WhatsApp", linkedin: "LinkedIn", x: "X (Twitter)", "web-share": "Share" }, onInit: function() {
        }, onIntent: function() {
        } };
      }
      _bindings() {
        this.intent = this.binds(this.intent);
      }
      constructor() {
        if (!new.target) throw "ensemble.SocialShare error: Bad invocation, must be called with new.";
        super(...arguments), this.init();
      }
      generator() {
        const e2 = this.options, t2 = this.share = this.compo(false, false, { className: "object" == typeof e2.className ? e2.className.join(" ") : e2.className });
        if (t2.setAttr("data-social-share", ""), e2.label) {
          const s3 = this.compo("span", "label", e2.label);
          s3.classList.add("label"), "innerText" in e2.label == 0 && (s3.innerText = e2.locale.label), t2.append(s3);
        }
        const s2 = this.actions = this.compo("ul", "actions");
        t2.append(s2), this.built = true;
      }
      init() {
        const e2 = this.options;
        this.built || (this.root = this.selector(e2.root), this.displays = e2.displays && "object" == typeof e2.displays ? e2.displays : Object.keys(e2.intents), this.generator(), this.element && this.share.up(this.element, (function(e3) {
          this.element = e3;
        }).bind(this)), this.populate(), e2.onInit.call(this, this));
      }
      populate() {
        const e2 = this.options;
        for (const t2 in e2.intents) {
          if (-1 == this.displays.indexOf(t2)) continue;
          const s2 = t2 in e2.locale ? e2.locale[t2] : t2.replace(/\w/, (e3) => e3.toUpperCase());
          let n2;
          switch (e2.intents[t2]) {
            case 0:
              n2 = e2.locale.share.replace("%s", s2);
              break;
            case 1:
              n2 = e2.locale.send.replace("%s", s2);
              break;
            case 2:
              n2 = e2.locale.email;
              break;
            case 3:
              n2 = e2.locale.copy;
              break;
            case 4:
              if (!("share" in window.navigator) || "function" != typeof window.navigator.share) continue;
              n2 = e2.locale["web-share"];
          }
          this.action(t2, n2);
        }
      }
      action(e2, t2) {
        const s2 = this.options, n2 = this.compo("li", "action", { className: s2.ns + "-action-" + e2 }), i2 = this.compo("button", ["button", "intent"], { className: s2.ns + "-intent-" + e2, title: t2, ariaLabel: t2, onclick: this.intent });
        n2.setAttr("data-share-intent", e2), n2.append(i2);
        const o2 = this.compo("span", "icon", { className: "icon-" + e2 });
        i2.append(o2), this.actions.append(n2);
      }
      intent(e2, t2) {
        if (this.event(e2), !e2.isTrusted) return;
        const s2 = this.options;
        if (!this.compo().isCompo(t2)) return;
        const n2 = t2.parent;
        if (!n2 || !n2.hasAttr("data-share-intent")) return;
        const i2 = n2.getAttr("data-share-intent");
        if (-1 == this.displays.indexOf(i2)) return;
        let o2, r, l;
        o2 = s2.link ? s2.link : s2.selectorLink && "object" == typeof s2.selectorLink && this.selector(s2.selectorLink.element) ? this.getAttr(this.selector(s2.selectorLink.element), s2.selectorLink.attribute) : window.location.href, r = s2.title ? s2.title : s2.selectorTitle && "object" == typeof s2.selectorTitle && this.selector(s2.selectorTitle.element) ? this.getAttr(this.selector(s2.selectorTitle.element), s2.selectorTitle.attribute) : document.title, l = s2.description ? s2.description : s2.selectorDescription && "object" == typeof s2.selectorDescription && this.selector(s2.selectorDescription.element) ? this.getAttr(this.selector(s2.selectorDescription.element), s2.selectorDescription.attribute) : r;
        const c = { url: o2, title: r, text: "\r\n\r\n%title%\r\n%url%\r\n\r\n", summary: l };
        if (s2.onIntent.call(this, this, e2, i2, c), c.text = s2.locale.text.replace("%s", c.text), i2 in s2.intents) switch (i2) {
          case "send-email":
            this.sendEmail(e2, c);
            break;
          case "copy-link":
            this.copyLink(e2, c);
            break;
          case "web-share":
            this.webShare(e2, c);
            break;
          default:
            this.social(e2, c, i2, n2);
        }
      }
      text(e2) {
        return encodeURIComponent(e2.text.replace("%url%", e2.url).replace("%title%", e2.title).replace("%summary%", e2.summary));
      }
      social(e2, t2, s2, n2) {
        const i2 = this.options;
        if (s2 in i2.uriform == 0) return;
        let o2 = i2.uriform[s2].replace("%url%", encodeURIComponent(t2.url)).replace("%title%", encodeURIComponent(t2.title)).replace("%summary%", encodeURIComponent(t2.summary));
        const r = n2.getAttr("ariaLabel"), l = "toolbar=0,status=0,width=640,height=480";
        if (/%text%/.test(i2.uriform[s2]) && (o2 = o2.replace("%text%", this.text(t2))), "messenger" == s2) {
          const e3 = "messenger_app_id" in i2 ? i2.messenger_app_id : "";
          o2 = o2.replace("%app_id%", encodeURIComponent(e3));
        }
        console.log(o2, r, l), window.open(o2, r, l);
      }
      sendEmail(e2, t2) {
        const s2 = this.options, n2 = s2.uriform["send-email"].replace("%subject%", encodeURIComponent(s2.locale.subject)).replace("%text%", this.text(t2));
        console.log(n2, "_self"), window.open(n2, "_self");
      }
      copyLink(e2, t2) {
        if (!this.element) return;
        const s2 = this.options, n2 = document.createElement("textarea");
        if (n2.style = "position:absolute;width:0;height:0;opacity:0;z-index:-1;overflow:hidden", n2.value = t2.url.toString(), this.appendNode(this.element, n2), n2.focus(), n2.select(), document.execCommand("copy"), n2.remove(), s2.fx) {
          const e3 = this.root, t3 = this.compo(false, "fx-copied-link--ground", { hidden: true }), n3 = this.compo("span", "copied-link-message", { innerText: s2.locale.copied });
          e3.classList.add("share-fx-copied-link"), t3.install(e3), n3.install(e3), t3.show(), this.delay(function() {
            n3.uninstall(e3), t3.uninstall(e3), e3.classList.remove("share-fx-copied-link");
          }, t3, 800);
        }
      }
      async webShare(e2, t2) {
        try {
          await window.navigator.share({ title: t2.title, url: t2.url });
        } catch (e3) {
          e3 instanceof TypeError ? console.info("ensemble.SocialShare.webShare", "TODO fallback") : console.log("ensemble.SocialShare.webShare", e3.message);
        }
      }
    };
  });
})(ensembleSocialShare_min);
const Ensemble = /* @__PURE__ */ getDefaultExportFromCjs(ensembleSocialShare_min);
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
const _isArray = Array.isArray || function _isArray2(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}
function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
const _xfBase = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result) {
    return this.xf["@@transducer/result"](result);
  }
};
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
const _objectIs$1 = typeof Object.is === "function" ? Object.is : _objectIs;
var toString$1 = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString$1.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString$1.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }
  var typeA = type(a);
  if (typeA !== type(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
function _quote(s) {
  var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}
var XFilter = /* @__PURE__ */ function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = _xfBase.init;
  XFilter2.prototype["@@transducer/result"] = _xfBase.result;
  XFilter2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XFilter2;
}();
function _xfilter(f) {
  return function(xf) {
    return new XFilter(f, xf);
  };
}
var filter = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], _xfilter, function(pred, filterable) {
  return _isObject(filterable) ? _arrayReduce(function(acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys(filterable)) : (
    // else
    _filter(pred, filterable)
  );
}));
var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
  return filter(_complement(pred), filterable);
});
function _toString(x, seen) {
  var recur = function recur2(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
  };
  var mapPairs = function(obj, keys22) {
    return _map(function(k) {
      return _quote(k) + ": " + recur(obj[k]);
    }, keys22.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
    case "[object Array]":
      return "[" + _map(recur, x).concat(mapPairs(x, reject(function(k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ")";
    case "[object Map]":
      return "new Map(" + recur(Array.from(x)) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
    case "[object Set]":
      return "new Set(" + recur(Array.from(x).sort()) + ")";
    case "[object String]":
      return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof x.toString === "function") {
        var repr = x.toString();
        if (repr !== "[object Object]") {
          return repr;
        }
      }
      return "{" + mapPairs(x, keys(x)).join(", ") + "}";
  }
}
var toString = /* @__PURE__ */ _curry1(function toString2(val) {
  return _toString(val, []);
});
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
function _isTypedArray(val) {
  var type3 = Object.prototype.toString.call(val);
  return type3 === "[object Uint8ClampedArray]" || type3 === "[object Int8Array]" || type3 === "[object Uint8Array]" || type3 === "[object Int16Array]" || type3 === "[object Uint16Array]" || type3 === "[object Int32Array]" || type3 === "[object Uint32Array]" || type3 === "[object Float32Array]" || type3 === "[object Float64Array]" || type3 === "[object BigInt64Array]" || type3 === "[object BigUint64Array]";
}
var empty = /* @__PURE__ */ _curry1(function empty2(x) {
  return x != null && typeof x["fantasy-land/empty"] === "function" ? x["fantasy-land/empty"]() : x != null && x.constructor != null && typeof x.constructor["fantasy-land/empty"] === "function" ? x.constructor["fantasy-land/empty"]() : x != null && typeof x.empty === "function" ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === "function" ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? "" : _isObject(x) ? {} : _isArguments(x) ? /* @__PURE__ */ function() {
    return arguments;
  }() : _isTypedArray(x) ? x.constructor.from("") : void 0;
});
var isEmpty = /* @__PURE__ */ _curry1(function isEmpty2(x) {
  return x != null && equals(x, empty(x));
});
function isObject$1(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$1(target, src) {
  if (target === void 0) {
    target = {};
  }
  if (src === void 0) {
    src = {};
  }
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === "undefined") target[key] = src[key];
    else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
      extend$1(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend$1(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend$1(win, ssrWindow);
  return win;
}
function classesToTokens(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return classes2.trim().split(" ").filter((c) => !!c.trim());
}
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis) {
  if (axis === void 0) {
    axis = "x";
  }
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend() {
  const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  let {
    swiper,
    targetPosition,
    side
  } = _ref;
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime2 = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate2 = () => {
    time = (/* @__PURE__ */ new Date()).getTime();
    if (startTime2 === null) {
      startTime2 = time;
    }
    const progress = Math.max(Math.min((time - startTime2) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate2);
  };
  animate2();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector) {
  if (selector === void 0) {
    selector = "";
  }
  const children = [...element.children];
  if (element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter((el) => el.matches(selector));
}
function elementIsChildOf(el, parent) {
  const isChild = parent.contains(el);
  if (!isChild && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    return children.includes(el);
  }
  return isChild;
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
  }
}
function createElement(tag, classes2) {
  if (classes2 === void 0) {
    classes2 = [];
  }
  const el = document.createElement(tag);
  el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
  return el;
}
function elementOffset(el) {
  const window2 = getWindow();
  const document2 = getDocument();
  const box = el.getBoundingClientRect();
  const body = document2.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
  const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling;
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling;
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return void 0;
}
function elementParents(el, selector) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window2 = getWindow();
  {
    return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
}
function getRotateFix(swiper) {
  return (v) => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 1e-3;
    }
    return v;
  };
}
let support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
let deviceCached;
function calcDevice(_temp) {
  let {
    userAgent
  } = _temp === void 0 ? {} : _temp;
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
let browser;
function calcBrowser() {
  const window2 = getWindow();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize(_ref) {
  let {
    swiper,
    on,
    emit
  } = _ref;
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach((_ref2) => {
          let {
            contentBoxSize,
            contentRect,
            target
          } = _ref2;
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("orientationchange");
  };
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const observers = [];
  const window2 = getWindow();
  const attach = function(target, options) {
    if (options === void 0) {
      options = {};
    }
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init2 = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on("init", init2);
  on("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (typeof handler !== "function") return self2;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self2.eventsListeners[event2]) self2.eventsListeners[event2] = [];
      self2.eventsListeners[event2][method](handler);
    });
    return self2;
  },
  once(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (typeof handler !== "function") return self2;
    function onceHandler() {
      self2.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self2, args);
    }
    onceHandler.__emitterProxy = handler;
    return self2.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (typeof handler !== "function") return self2;
    const method = priority ? "unshift" : "push";
    if (self2.eventsAnyListeners.indexOf(handler) < 0) {
      self2.eventsAnyListeners[method](handler);
    }
    return self2;
  },
  offAny(handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (!self2.eventsAnyListeners) return self2;
    const index = self2.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self2.eventsAnyListeners.splice(index, 1);
    }
    return self2;
  },
  off(events2, handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (!self2.eventsListeners) return self2;
    events2.split(" ").forEach((event2) => {
      if (typeof handler === "undefined") {
        self2.eventsListeners[event2] = [];
      } else if (self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self2.eventsListeners[event2].splice(index, 1);
          }
        });
      }
    });
    return self2;
  },
  emit() {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed) return self2;
    if (!self2.eventsListeners) return self2;
    let events2;
    let data;
    let context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self2;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self2;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event2) => {
      if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
        self2.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event2, ...data]);
        });
      }
      if (self2.eventsListeners && self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self2;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl2,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween;
  slides.forEach((slideEl) => {
    if (rtl2) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i]) slide2 = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide2, slides);
    }
    if (slides[i] && elementStyle(slide2, "display") === "none") continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i].style[swiper.getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width") : elementOuterSize(slide2, "height");
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl2 && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl2 ? "marginLeft" : swiper.getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit("slidesUpdated");
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate2) {
  if (translate2 === void 0) {
    translate2 = this && this.translate || 0;
  }
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl2,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl2) offsetCenter = translate2;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
    slide2.progress = rtl2 ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl2 ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
const toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.filter((slideEl) => slideEl.column === activeIndex)[0];
      nextSlide = slides.filter((slideEl) => slideEl.column === activeIndex + 1)[0];
      prevSlide = slides.filter((slideEl) => slideEl.column === activeIndex - 1)[0];
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach((slideEl) => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}
const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl) lazyEl.remove();
  }
};
const unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute("loading");
};
const preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate2 >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.filter((slideEl) => slideEl.column === activeIndex)[0];
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
      if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide2 = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis) {
  if (axis === void 0) {
    axis = this.isHorizontal() ? "x" : "y";
  }
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl2,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl2 ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl2) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl2,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl2 ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
  if (translate2 === void 0) {
    translate2 = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (translateBounds === void 0) {
    translateBounds = true;
  }
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2) newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2) newTranslate = maxTranslate2;
  else newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit(_ref) {
  let {
    swiper,
    runCallbacks,
    direction,
    step
  } = _ref;
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = "next";
    else if (activeIndex < previousIndex) dir = "prev";
    else dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index, speed, runCallbacks, internal, initial) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl2,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl2 ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex) direction = "next";
  else if (slideIndex < activeIndex) direction = "prev";
  else direction = "reset";
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  if (!isInitialVirtual && (rtl2 && -translate2 === swiper.translate || !rtl2 && translate2 === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl2 ? translate2 : -translate2;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index, speed, runCallbacks, internal) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides
      } = swiper.params;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === "auto") {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (centeredSlides && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (centeredSlides) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === "next" ? swiper.realIndex : void 0
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}
function slideNext(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks, internal, threshold) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (threshold === void 0) {
    threshold = 0.5;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
    });
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = (amountOfSlides) => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else {
    initSlides();
  }
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}
function loopFix(_temp) {
  let {
    slideRealIndex,
    slideTo: slideTo2 = true,
    direction,
    setTranslate: setTranslate2,
    activeSlideIndex,
    byController,
    byMousewheel
  } = _temp === void 0 ? {} : _temp;
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides
  } = params;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === "auto") {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (centeredSlides && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides) {
    showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
  } else if (gridEnabled && params.grid.fill === "row") {
    showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
          if (slides[i2].column === colIndexToPrepend) prependSlidesIndexes.push(i2);
        }
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide2, slideIndex) => {
          if (slide2.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide2, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate2) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c) => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
      });
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = "move";
  el.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base) {
  if (base === void 0) {
    base = this;
  }
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event2, startX) {
  const window2 = getWindow();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event2.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart$1(event2) {
  const swiper = this;
  const document2 = getDocument();
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === "pointerdown") {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === "touchstart") {
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
  }
  if ("which" in e && e.which === 3) return;
  if ("button" in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e);
}
function onTouchMove$1(event2) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl2,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event2.pointerType === "mouse") return;
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === "pointermove") {
    if (data.touchId !== null) return;
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === "touchmove") {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
    document2.activeElement.blur();
  }
  if (document2.activeElement) {
    if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl2 ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl2 ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl2) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e);
  }
  let loopFixed;
  (/* @__PURE__ */ new Date()).getTime();
  if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit("sliderMove", e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd$1(event2) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
  if (!isTouchEvent) {
    if (data.touchId !== null) return;
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl2,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl2 ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad$1(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = "auto";
  }
}
const events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!el || typeof el === "string") return;
  document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]("touchstart", swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("touchmove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("touchend", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("touchcancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("contextmenu", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart$1.bind(swiper);
  swiper.onTouchMove = onTouchMove$1.bind(swiper);
  swiper.onTouchEnd = onTouchEnd$1.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad$1.bind(swiper);
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0) return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] === "undefined") return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base, containerEl) {
  if (base === void 0) {
    base = "window";
  }
  if (!breakpoints2 || base === "container" && !containerEl) return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl: rtl2,
    el,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl2
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === "string") return;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
var checkOverflow$1 = {
  checkOverflow
};
var defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: "swiper",
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj) {
    if (obj === void 0) {
      obj = {};
    }
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    extend(allModulesParams, obj);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
class Swiper {
  constructor() {
    let el;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = extend({}, params);
    if (el && !params.el) params.el = el;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend({}, defaults, allModulesParams);
    swiper.params = extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend({}, swiper.params);
    swiper.passedParams = extend({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view, exact) {
    if (view === void 0) {
      view = "current";
    }
    if (exact === void 0) {
      exact = false;
    }
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === "number") return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate2();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate) {
    if (needUpdate === void 0) {
      needUpdate = true;
    }
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;
    let el = element || swiper.params.el;
    if (typeof el === "string") {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el.append(wrapperEl);
      elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e) => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);
    swiper.initialized = true;
    preload(swiper);
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance, cleanStyles) {
    if (deleteInstance === void 0) {
      deleteInstance = true;
    }
    if (cleanStyles === void 0) {
      cleanStyles = true;
    }
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== "string") {
        el.removeAttribute("style");
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute("style");
      }
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== "string") {
        swiper.el.swiper = null;
      }
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules2 = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules2.indexOf(mod) < 0) {
      modules2.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);
function Virtual(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  let cssModeTimeout;
  const document2 = getDocument();
  swiper.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  const tempDOM = document2.createElement("div");
  function renderSlide(slide2, index) {
    const params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    let slideEl;
    if (params.renderSlide) {
      slideEl = params.renderSlide.call(swiper, slide2, index);
      if (typeof slideEl === "string") {
        tempDOM.innerHTML = slideEl;
        slideEl = tempDOM.children[0];
      }
    } else if (swiper.isElement) {
      slideEl = createElement("swiper-slide");
    } else {
      slideEl = createElement("div", swiper.params.slideClass);
    }
    slideEl.setAttribute("data-swiper-slide-index", index);
    if (!params.renderSlide) {
      slideEl.innerHTML = slide2;
    }
    if (params.cache) {
      swiper.virtual.cache[index] = slideEl;
    }
    return slideEl;
  }
  function update2(force, beforeInit) {
    const {
      slidesPerView,
      slidesPerGroup,
      centeredSlides,
      loop: isLoop,
      initialSlide
    } = swiper.params;
    if (beforeInit && !isLoop && initialSlide > 0) {
      return;
    }
    const {
      addSlidesBefore,
      addSlidesAfter
    } = swiper.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset
    } = swiper.virtual;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }
    const activeIndex = swiper.activeIndex || 0;
    let offsetProp;
    if (swiper.rtlTranslate) offsetProp = "right";
    else offsetProp = swiper.isHorizontal() ? "left" : "top";
    let slidesAfter;
    let slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
    }
    let from = activeIndex - slidesBefore;
    let to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0];
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0];
    }
    Object.assign(swiper.virtual, {
      from,
      to,
      offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore,
      slidesAfter
    });
    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit("virtualUpdate");
    }
    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach((slideEl) => {
          slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
        });
      }
      swiper.updateProgress();
      emit("virtualUpdate");
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset,
        from,
        to,
        slides: function getSlides() {
          const slidesToRender = [];
          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()
      });
      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit("virtualUpdate");
      }
      return;
    }
    const prependIndexes = [];
    const appendIndexes = [];
    const getSlideIndex = (index) => {
      let slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };
    if (force) {
      swiper.slides.filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`)).forEach((slideEl) => {
        slideEl.remove();
      });
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          const slideIndex = getSlideIndex(i);
          swiper.slides.filter((el) => el.matches(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`)).forEach((slideEl) => {
            slideEl.remove();
          });
        }
      }
    }
    const loopFrom = isLoop ? -slides.length : 0;
    const loopTo = isLoop ? slides.length * 2 : slides.length;
    for (let i = loopFrom; i < loopTo; i += 1) {
      if (i >= from && i <= to) {
        const slideIndex = getSlideIndex(i);
        if (typeof previousTo === "undefined" || force) {
          appendIndexes.push(slideIndex);
        } else {
          if (i > previousTo) appendIndexes.push(slideIndex);
          if (i < previousFrom) prependIndexes.push(slideIndex);
        }
      }
    }
    appendIndexes.forEach((index) => {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
        const index = prependIndexes[i];
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort((a, b) => b - a);
      prependIndexes.forEach((index) => {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    elementChildren(swiper.slidesEl, ".swiper-slide, swiper-slide").forEach((slideEl) => {
      slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
    });
    onRendered();
  }
  function appendSlide2(slides) {
    if (typeof slides === "object" && "length" in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update2(true);
  }
  function prependSlide2(slides) {
    const activeIndex = swiper.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      const cache = swiper.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach((cachedIndex) => {
        const cachedEl = cache[cachedIndex];
        const cachedElIndex = cachedEl.getAttribute("data-swiper-slide-index");
        if (cachedElIndex) {
          cachedEl.setAttribute("data-swiper-slide-index", parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update2(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide2(slidesIndexes) {
    if (typeof slidesIndexes === "undefined" || slidesIndexes === null) return;
    let activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
          Object.keys(swiper.virtual.cache).forEach((key) => {
            if (key > slidesIndexes) {
              swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
              swiper.virtual.cache[key - 1].setAttribute("data-swiper-slide-index", key - 1);
              delete swiper.virtual.cache[key];
            }
          });
        }
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
        Object.keys(swiper.virtual.cache).forEach((key) => {
          if (key > slidesIndexes) {
            swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
            swiper.virtual.cache[key - 1].setAttribute("data-swiper-slide-index", key - 1);
            delete swiper.virtual.cache[key];
          }
        });
      }
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update2(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides2() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update2(true);
    swiper.slideTo(0, 0);
  }
  on("beforeInit", () => {
    if (!swiper.params.virtual.enabled) return;
    let domSlidesAssigned;
    if (typeof swiper.passedParams.virtual.slides === "undefined") {
      const slides = [...swiper.slidesEl.children].filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
      if (slides && slides.length) {
        swiper.virtual.slides = [...slides];
        domSlidesAssigned = true;
        slides.forEach((slideEl, slideIndex) => {
          slideEl.setAttribute("data-swiper-slide-index", slideIndex);
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = swiper.params.virtual.slides;
    }
    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    update2(false, true);
  });
  on("setTranslate", () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update2();
      }, 100);
    } else {
      update2();
    }
  });
  on("init update resize", () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode) {
      setCSSProperty(swiper.wrapperEl, "--swiper-virtual-size", `${swiper.virtualSize}px`);
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide: appendSlide2,
    prependSlide: prependSlide2,
    removeSlide: removeSlide2,
    removeAllSlides: removeAllSlides2,
    update: update2
  });
}
function Keyboard$1(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const document2 = getDocument();
  const window2 = getWindow();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });
  function handle(event2) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtl2
    } = swiper;
    let e = event2;
    if (e.originalEvent) e = e.originalEvent;
    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return void 0;
    }
    if (document2.activeElement && document2.activeElement.nodeName && (document2.activeElement.nodeName.toLowerCase() === "input" || document2.activeElement.nodeName.toLowerCase() === "textarea")) {
      return void 0;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      let inView = false;
      if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
        return void 0;
      }
      const el = swiper.el;
      const swiperWidth = el.clientWidth;
      const swiperHeight = el.clientHeight;
      const windowWidth = window2.innerWidth;
      const windowHeight = window2.innerHeight;
      const swiperOffset = elementOffset(el);
      if (rtl2) swiperOffset.left -= el.scrollLeft;
      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue;
          inView = true;
        }
      }
      if (!inView) return void 0;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl2 || (isPageUp || isArrowLeft) && rtl2) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl2 || (isPageDown || isArrowRight) && rtl2) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    emit("keyPress", kc);
    return void 0;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document2.addEventListener("keydown", handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document2.removeEventListener("keydown", handle);
    swiper.keyboard.enabled = false;
  }
  on("init", () => {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on("destroy", () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable,
    disable
  });
}
function Mousewheel(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const window2 = getWindow();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel"
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = now();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];
  function normalize(e) {
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;
    if ("detail" in e) {
      sY = e.detail;
    }
    if ("wheelDelta" in e) {
      sY = -e.wheelDelta / 120;
    }
    if ("wheelDeltaY" in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in e) {
      sX = -e.wheelDeltaX / 120;
    }
    if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in e) {
      pY = e.deltaY;
    }
    if ("deltaX" in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      return false;
    }
    if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
      return true;
    }
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit("scroll", newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit("scroll", newEvent.raw);
    }
    lastScrollTime = new window2.Date().getTime();
    return false;
  }
  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      return true;
    }
    return false;
  }
  function handle(event2) {
    let e = event2;
    let disableParentSwiper = true;
    if (!swiper.enabled) return;
    if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
        else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
      else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event2
      };
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift();
      }
      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
      recentWheelEvents.push(newEvent);
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = void 0;
        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: newEvent.direction < 0 ? "next" : "prev",
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          clearTimeout(timeout);
          timeout = void 0;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift();
          }
          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = nextTick(() => {
              if (swiper.destroyed || !swiper.params) return;
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 0);
          }
          if (!timeout) {
            timeout = nextTick(() => {
              if (swiper.destroyed || !swiper.params) return;
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 500);
          }
        }
        if (!ignoreWheelEvents) emit("scroll", e);
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    return false;
  }
  function events2(method) {
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]("mouseenter", handleMouseEnter);
    targetEl[method]("mouseleave", handleMouseLeave);
    targetEl[method]("wheel", handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener("wheel", handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events2("addEventListener");
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events2("removeEventListener");
    swiper.mousewheel.enabled = false;
    return true;
  }
  on("init", () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on("destroy", () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  function getEl(el) {
    let res;
    if (el && typeof el === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === "string") res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      }
    });
  }
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init2() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el, dir) => {
      if (el) {
        el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el) => initButton(el, "next"));
    prevEl.forEach((el) => initButton(el, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el) => destroyButton(el, "next"));
    prevEl.forEach((el) => destroyButton(el, "prev"));
  }
  on("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init2();
      update2();
    }
  });
  on("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (swiper.enabled) {
      update2();
      return;
    }
    [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
  });
  on("click", (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init2();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init: init2,
    destroy
  });
}
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl) return;
    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function getMoveDirection(prevIndex, nextIndex, length) {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return "next";
    } else if (nextIndex === prevIndex - 1) {
      return "previous";
    }
    return;
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === "next") {
        swiper.slideNext();
      } else if (moveDirection === "previous") {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl2 = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== "undefined") {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height");
        el.forEach((subEl) => {
          subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          } else if (swiper.isElement) {
            bullet.setAttribute("part", "bullet");
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, "next");
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(" "));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
          }
          setSideBullets(firstDisplayedBullet, "prev");
          setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl2 ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === "fraction") {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === "progressbar") {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === "custom" && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0) emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0) emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el[0]);
    }
  }
  function init2() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    if (typeof params.el === "string" && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === "string") {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      if (el.length > 1) {
        el = el.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(...(params.clickableClass || "").split(" "));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === "bullets" && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === "progressbar" && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener("click", onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || "").split(" "));
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init2();
      render();
      update2();
    }
  });
  on("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on("snapIndexChange", () => {
    update2();
  });
  on("snapGridLengthChange", () => {
    render();
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on("lock unlock", () => {
    update2();
  });
  on("click", (_s, e) => {
    const targetEl = e.target;
    const el = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init2();
    render();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update: update2,
    init: init2,
    destroy
  });
}
function Scrollbar(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const document2 = getDocument();
  let isTouched = false;
  let timeout = null;
  let dragTimeout = null;
  let dragStartPos;
  let dragSize;
  let trackSize;
  let divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: `swiper-scrollbar-horizontal`,
      verticalClass: `swiper-scrollbar-vertical`
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null
  };
  function setTranslate2() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar,
      rtlTranslate: rtl2
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    const params = swiper.params.scrollbar;
    const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl2) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
      dragEl.style.width = `${newSize}px`;
    } else {
      dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
      dragEl.style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(timeout);
      el.style.opacity = 1;
      timeout = setTimeout(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = "400ms";
      }, 1e3);
    }
  }
  function setTransition2(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
  }
  function updateSize2() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    dragEl.style.width = "";
    dragEl.style.height = "";
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
    if (swiper.params.scrollbar.dragSize === "auto") {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }
    if (swiper.isHorizontal()) {
      dragEl.style.width = `${dragSize}px`;
    } else {
      dragEl.style.height = `${dragSize}px`;
    }
    if (divider >= 1) {
      el.style.display = "none";
    } else {
      el.style.display = "";
    }
    if (swiper.params.scrollbar.hide) {
      el.style.opacity = 0;
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? "add" : "remove"](swiper.params.scrollbar.lockClass);
    }
  }
  function getPointerPosition(e) {
    return swiper.isHorizontal() ? e.clientX : e.clientY;
  }
  function setDragPosition(e) {
    const {
      scrollbar,
      rtlTranslate: rtl2
    } = swiper;
    const {
      el
    } = scrollbar;
    let positionRatio;
    positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper.isHorizontal() ? "left" : "top"] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl2) {
      positionRatio = 1 - positionRatio;
    }
    const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    isTouched = true;
    dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
    e.preventDefault();
    e.stopPropagation();
    wrapperEl.style.transitionDuration = "100ms";
    dragEl.style.transitionDuration = "100ms";
    setDragPosition(e);
    clearTimeout(dragTimeout);
    el.style.transitionDuration = "0ms";
    if (params.hide) {
      el.style.opacity = 1;
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style["scroll-snap-type"] = "none";
    }
    emit("scrollbarDragStart", e);
  }
  function onDragMove(e) {
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    if (!isTouched) return;
    if (e.preventDefault && e.cancelable) e.preventDefault();
    else e.returnValue = false;
    setDragPosition(e);
    wrapperEl.style.transitionDuration = "0ms";
    el.style.transitionDuration = "0ms";
    dragEl.style.transitionDuration = "0ms";
    emit("scrollbarDragMove", e);
  }
  function onDragEnd(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el
    } = scrollbar;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style["scroll-snap-type"] = "";
      wrapperEl.style.transitionDuration = "";
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = nextTick(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = "400ms";
      }, 1e3);
    }
    emit("scrollbarDragEnd", e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events2(method) {
    const {
      scrollbar,
      params
    } = swiper;
    const el = scrollbar.el;
    if (!el) return;
    const target = el;
    const activeListener = params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    const passiveListener = params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";
    target[eventMethod]("pointerdown", onDragStart, activeListener);
    document2[eventMethod]("pointermove", onDragMove, activeListener);
    document2[eventMethod]("pointerup", onDragEnd, passiveListener);
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events2("on");
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events2("off");
  }
  function init2() {
    const {
      scrollbar,
      el: swiperEl
    } = swiper;
    swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: "swiper-scrollbar"
    });
    const params = swiper.params.scrollbar;
    if (!params.el) return;
    let el;
    if (typeof params.el === "string" && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === "string") {
      el = document2.querySelectorAll(params.el);
      if (!el.length) return;
    } else if (!el) {
      el = params.el;
    }
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
      el = swiperEl.querySelector(params.el);
    }
    if (el.length > 0) el = el[0];
    el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    let dragEl;
    if (el) {
      dragEl = el.querySelector(classesToSelector(swiper.params.scrollbar.dragClass));
      if (!dragEl) {
        dragEl = createElement("div", swiper.params.scrollbar.dragClass);
        el.append(dragEl);
      }
    }
    Object.assign(scrollbar, {
      el,
      dragEl
    });
    if (params.draggable) {
      enableDraggable();
    }
    if (el) {
      el.classList[swiper.enabled ? "remove" : "add"](...classesToTokens(swiper.params.scrollbar.lockClass));
    }
  }
  function destroy() {
    const params = swiper.params.scrollbar;
    const el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(...classesToTokens(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass));
    }
    disableDraggable();
  }
  on("changeDirection", () => {
    if (!swiper.scrollbar || !swiper.scrollbar.el) return;
    const params = swiper.params.scrollbar;
    let {
      el
    } = swiper.scrollbar;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on("init", () => {
    if (swiper.params.scrollbar.enabled === false) {
      disable();
    } else {
      init2();
      updateSize2();
      setTranslate2();
    }
  });
  on("update resize observerUpdate lock unlock changeDirection", () => {
    updateSize2();
  });
  on("setTranslate", () => {
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    setTransition2(duration);
  });
  on("enable disable", () => {
    const {
      el
    } = swiper.scrollbar;
    if (el) {
      el.classList[swiper.enabled ? "remove" : "add"](...classesToTokens(swiper.params.scrollbar.lockClass));
    }
  });
  on("destroy", () => {
    destroy();
  });
  const enable = () => {
    swiper.el.classList.remove(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    init2();
    updateSize2();
    setTranslate2();
  };
  const disable = () => {
    swiper.el.classList.add(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.scrollbar, {
    enable,
    disable,
    updateSize: updateSize2,
    setTranslate: setTranslate2,
    init: init2,
    destroy
  });
}
function Parallax(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    parallax: {
      enabled: false
    }
  });
  const elementsSelector = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]";
  const setTransform = (el, progress) => {
    const {
      rtl: rtl2
    } = swiper;
    const rtlFactor = rtl2 ? -1 : 1;
    const p = el.getAttribute("data-swiper-parallax") || "0";
    let x = el.getAttribute("data-swiper-parallax-x");
    let y = el.getAttribute("data-swiper-parallax-y");
    const scale = el.getAttribute("data-swiper-parallax-scale");
    const opacity = el.getAttribute("data-swiper-parallax-opacity");
    const rotate = el.getAttribute("data-swiper-parallax-rotate");
    if (x || y) {
      x = x || "0";
      y = y || "0";
    } else if (swiper.isHorizontal()) {
      x = p;
      y = "0";
    } else {
      y = p;
      x = "0";
    }
    if (x.indexOf("%") >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${x * progress * rtlFactor}px`;
    }
    if (y.indexOf("%") >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${y * progress}px`;
    }
    if (typeof opacity !== "undefined" && opacity !== null) {
      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      el.style.opacity = currentOpacity;
    }
    let transform = `translate3d(${x}, ${y}, 0px)`;
    if (typeof scale !== "undefined" && scale !== null) {
      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      transform += ` scale(${currentScale})`;
    }
    if (rotate && typeof rotate !== "undefined" && rotate !== null) {
      const currentRotate = rotate * progress * -1;
      transform += ` rotate(${currentRotate}deg)`;
    }
    el.style.transform = transform;
  };
  const setTranslate2 = () => {
    const {
      el,
      slides,
      progress,
      snapGrid,
      isElement
    } = swiper;
    const elements = elementChildren(el, elementsSelector);
    if (swiper.isElement) {
      elements.push(...elementChildren(swiper.hostEl, elementsSelector));
    }
    elements.forEach((subEl) => {
      setTransform(subEl, progress);
    });
    slides.forEach((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== "auto") {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl.querySelectorAll(`${elementsSelector}, [data-swiper-parallax-rotate]`).forEach((subEl) => {
        setTransform(subEl, slideProgress);
      });
    });
  };
  const setTransition2 = function(duration) {
    if (duration === void 0) {
      duration = swiper.params.speed;
    }
    const {
      el,
      hostEl
    } = swiper;
    const elements = [...el.querySelectorAll(elementsSelector)];
    if (swiper.isElement) {
      elements.push(...hostEl.querySelectorAll(elementsSelector));
    }
    elements.forEach((parallaxEl) => {
      let parallaxDuration = parseInt(parallaxEl.getAttribute("data-swiper-parallax-duration"), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
    });
  };
  on("beforeInit", () => {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on("init", () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate2();
  });
  on("setTranslate", () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate2();
  });
  on("setTransition", (_swiper, duration) => {
    if (!swiper.params.parallax.enabled) return;
    setTransition2(duration);
  });
}
function Zoom(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const window2 = getWindow();
  extendParams({
    zoom: {
      enabled: false,
      limitToOriginalSize: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: "swiper-zoom-container",
      zoomedSlideClass: "swiper-slide-zoomed"
    }
  });
  swiper.zoom = {
    enabled: false
  };
  let currentScale = 1;
  let isScaling = false;
  let fakeGestureTouched;
  let fakeGestureMoved;
  const evCache = [];
  const gesture = {
    originX: 0,
    originY: 0,
    slideEl: void 0,
    slideWidth: void 0,
    slideHeight: void 0,
    imageEl: void 0,
    imageWrapEl: void 0,
    maxRatio: 3
  };
  const image = {
    isTouched: void 0,
    isMoved: void 0,
    currentX: void 0,
    currentY: void 0,
    minX: void 0,
    minY: void 0,
    maxX: void 0,
    maxY: void 0,
    width: void 0,
    height: void 0,
    startX: void 0,
    startY: void 0,
    touchesStart: {},
    touchesCurrent: {}
  };
  const velocity = {
    x: void 0,
    y: void 0,
    prevPositionX: void 0,
    prevPositionY: void 0,
    prevTime: void 0
  };
  let scale = 1;
  Object.defineProperty(swiper.zoom, "scale", {
    get() {
      return scale;
    },
    set(value) {
      if (scale !== value) {
        const imageEl = gesture.imageEl;
        const slideEl = gesture.slideEl;
        emit("zoomChange", value, imageEl, slideEl);
      }
      scale = value;
    }
  });
  function getDistanceBetweenTouches() {
    if (evCache.length < 2) return 1;
    const x1 = evCache[0].pageX;
    const y1 = evCache[0].pageY;
    const x2 = evCache[1].pageX;
    const y2 = evCache[1].pageY;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  }
  function getMaxRatio() {
    const params = swiper.params.zoom;
    const maxRatio = gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
    if (params.limitToOriginalSize && gesture.imageEl && gesture.imageEl.naturalWidth) {
      const imageMaxRatio = gesture.imageEl.naturalWidth / gesture.imageEl.offsetWidth;
      return Math.min(imageMaxRatio, maxRatio);
    }
    return maxRatio;
  }
  function getScaleOrigin() {
    if (evCache.length < 2) return {
      x: null,
      y: null
    };
    const box = gesture.imageEl.getBoundingClientRect();
    return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x - window2.scrollX) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y - window2.scrollY) / currentScale];
  }
  function getSlideSelector() {
    return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  }
  function eventWithinSlide(e) {
    const slideSelector = getSlideSelector();
    if (e.target.matches(slideSelector)) return true;
    if (swiper.slides.filter((slideEl) => slideEl.contains(e.target)).length > 0) return true;
    return false;
  }
  function eventWithinZoomContainer(e) {
    const selector = `.${swiper.params.zoom.containerClass}`;
    if (e.target.matches(selector)) return true;
    if ([...swiper.hostEl.querySelectorAll(selector)].filter((containerEl) => containerEl.contains(e.target)).length > 0) return true;
    return false;
  }
  function onGestureStart(e) {
    if (e.pointerType === "mouse") {
      evCache.splice(0, evCache.length);
    }
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    evCache.push(e);
    if (evCache.length < 2) {
      return;
    }
    fakeGestureTouched = true;
    gesture.scaleStart = getDistanceBetweenTouches();
    if (!gesture.slideEl) {
      gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = void 0;
      }
      if (!gesture.imageWrapEl) {
        gesture.imageEl = void 0;
        return;
      }
      gesture.maxRatio = getMaxRatio();
    }
    if (gesture.imageEl) {
      const [originX, originY] = getScaleOrigin();
      gesture.originX = originX;
      gesture.originY = originY;
      gesture.imageEl.style.transitionDuration = "0ms";
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache[pointerIndex] = e;
    if (evCache.length < 2) {
      return;
    }
    fakeGestureMoved = true;
    gesture.scaleMove = getDistanceBetweenTouches();
    if (!gesture.imageEl) {
      return;
    }
    zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
    }
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function onGestureEnd(e) {
    if (!eventWithinSlide(e)) return;
    if (e.pointerType === "mouse" && e.type === "pointerout") return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
    if (!fakeGestureTouched || !fakeGestureMoved) {
      return;
    }
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!gesture.imageEl) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale > 1 && gesture.slideEl) {
      gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    } else if (zoom.scale <= 1 && gesture.slideEl) {
      gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    }
    if (zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
      gesture.slideEl = void 0;
    }
  }
  let allowTouchMoveTimeout;
  function allowTouchMove() {
    swiper.touchEventsData.preventTouchMoveFromPointerMove = false;
  }
  function preventTouchMove() {
    clearTimeout(allowTouchMoveTimeout);
    swiper.touchEventsData.preventTouchMoveFromPointerMove = true;
    allowTouchMoveTimeout = setTimeout(() => {
      if (swiper.destroyed) return;
      allowTouchMove();
    });
  }
  function onTouchStart2(e) {
    const device = swiper.device;
    if (!gesture.imageEl) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    const event2 = evCache.length > 0 ? evCache[0] : e;
    image.touchesStart.x = event2.pageX;
    image.touchesStart.y = event2.pageY;
  }
  function onTouchMove2(e) {
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) {
      return;
    }
    const zoom = swiper.zoom;
    if (!gesture.imageEl) {
      return;
    }
    if (!image.isTouched || !gesture.slideEl) {
      return;
    }
    if (!image.isMoved) {
      image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      image.startX = getTranslate(gesture.imageWrapEl, "x") || 0;
      image.startY = getTranslate(gesture.imageWrapEl, "y") || 0;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      gesture.imageWrapEl.style.transitionDuration = "0ms";
    }
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
    image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
    const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
    if (touchesDiff > 5) {
      swiper.allowClick = false;
    }
    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    preventTouchMove();
    image.isMoved = true;
    const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
    const {
      originX,
      originY
    } = gesture;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
    }
    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
    }
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTouchEnd2() {
    const zoom = swiper.zoom;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    let momentumDurationX = 300;
    let momentumDurationY = 300;
    const momentumDistanceX = velocity.x * momentumDurationX;
    const newPositionX = image.currentX + momentumDistanceX;
    const momentumDistanceY = velocity.y * momentumDurationY;
    const newPositionY = image.currentY + momentumDistanceY;
    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY;
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTransitionEnd() {
    const zoom = swiper.zoom;
    if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
      if (gesture.imageEl) {
        gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
      }
      if (gesture.imageWrapEl) {
        gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
      }
      gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
      zoom.scale = 1;
      currentScale = 1;
      gesture.slideEl = void 0;
      gesture.imageEl = void 0;
      gesture.imageWrapEl = void 0;
      gesture.originX = 0;
      gesture.originY = 0;
    }
  }
  function zoomIn(e) {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (e && e.target) {
        gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      }
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = void 0;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.touchAction = "none";
    }
    gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    let touchX;
    let touchY;
    let offsetX;
    let offsetY;
    let diffX;
    let diffY;
    let translateX;
    let translateY;
    let imageWidth;
    let imageHeight;
    let scaledWidth;
    let scaledHeight;
    let translateMinX;
    let translateMinY;
    let translateMaxX;
    let translateMaxY;
    let slideWidth;
    let slideHeight;
    if (typeof image.touchesStart.x === "undefined" && e) {
      touchX = e.pageX;
      touchY = e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }
    const forceZoomRatio = typeof e === "number" ? e : null;
    if (currentScale === 1 && forceZoomRatio) {
      touchX = void 0;
      touchY = void 0;
      image.touchesStart.x = void 0;
      image.touchesStart.y = void 0;
    }
    const maxRatio = getMaxRatio();
    zoom.scale = forceZoomRatio || maxRatio;
    currentScale = forceZoomRatio || maxRatio;
    if (e && !(currentScale === 1 && forceZoomRatio)) {
      slideWidth = gesture.slideEl.offsetWidth;
      slideHeight = gesture.slideEl.offsetHeight;
      offsetX = elementOffset(gesture.slideEl).left + window2.scrollX;
      offsetY = elementOffset(gesture.slideEl).top + window2.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      imageHeight = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;
      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }
      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    if (forceZoomRatio && zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
    }
    gesture.imageWrapEl.style.transitionDuration = "300ms";
    gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
    gesture.imageEl.style.transitionDuration = "300ms";
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function zoomOut() {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
      } else {
        gesture.slideEl = swiper.slides[swiper.activeIndex];
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = void 0;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = "";
      swiper.wrapperEl.style.touchAction = "";
    }
    zoom.scale = 1;
    currentScale = 1;
    image.touchesStart.x = void 0;
    image.touchesStart.y = void 0;
    gesture.imageWrapEl.style.transitionDuration = "300ms";
    gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
    gesture.imageEl.style.transitionDuration = "300ms";
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
    gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    gesture.slideEl = void 0;
    gesture.originX = 0;
    gesture.originY = 0;
  }
  function zoomToggle(e) {
    const zoom = swiper.zoom;
    if (zoom.scale && zoom.scale !== 1) {
      zoomOut();
    } else {
      zoomIn(e);
    }
  }
  function getListeners() {
    const passiveListener = swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    const activeListenerWithCapture = swiper.params.passiveListeners ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener,
      activeListenerWithCapture
    };
  }
  function enable() {
    const zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();
    swiper.wrapperEl.addEventListener("pointerdown", onGestureStart, passiveListener);
    swiper.wrapperEl.addEventListener("pointermove", onGestureChange, activeListenerWithCapture);
    ["pointerup", "pointercancel", "pointerout"].forEach((eventName) => {
      swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
    });
    swiper.wrapperEl.addEventListener("pointermove", onTouchMove2, activeListenerWithCapture);
  }
  function disable() {
    const zoom = swiper.zoom;
    if (!zoom.enabled) return;
    zoom.enabled = false;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();
    swiper.wrapperEl.removeEventListener("pointerdown", onGestureStart, passiveListener);
    swiper.wrapperEl.removeEventListener("pointermove", onGestureChange, activeListenerWithCapture);
    ["pointerup", "pointercancel", "pointerout"].forEach((eventName) => {
      swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
    });
    swiper.wrapperEl.removeEventListener("pointermove", onTouchMove2, activeListenerWithCapture);
  }
  on("init", () => {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on("destroy", () => {
    disable();
  });
  on("touchStart", (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchStart2(e);
  });
  on("touchEnd", (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchEnd2();
  });
  on("doubleTap", (_s, e) => {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on("transitionEnd", () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on("slideChange", () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable,
    disable,
    in: zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}
function Controller(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    controller: {
      control: void 0,
      inverse: false,
      by: "slide"
      // or 'container'
    }
  });
  swiper.controller = {
    control: void 0
  };
  function LinearSpline(x, y) {
    const binarySearch = /* @__PURE__ */ function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    let i1;
    let i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate2(_t, byController) {
    const controlled = swiper.controller.control;
    let multiplier;
    let controlledTranslate;
    const Swiper2 = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;
      const translate2 = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === "slide") {
        getInterpolateFunction(c);
        controlledTranslate = -swiper.controller.spline.interpolate(-translate2);
      }
      if (!controlledTranslate || swiper.params.controller.by === "container") {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate2 - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper2) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper2 && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition2(duration, byController) {
    const Swiper2 = swiper.constructor;
    const controlled = swiper.controller.control;
    let i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          nextTick(() => {
            c.updateAutoHeight();
          });
        }
        elementTransitionEnd(c.wrapperEl, () => {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper2) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper2 && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = void 0;
      delete swiper.controller.spline;
    }
  }
  on("beforeInit", () => {
    if (typeof window !== "undefined" && // eslint-disable-line
    (typeof swiper.params.controller.control === "string" || swiper.params.controller.control instanceof HTMLElement)) {
      const controlElements = typeof swiper.params.controller.control === "string" ? [...document.querySelectorAll(swiper.params.controller.control)] : [swiper.params.controller.control];
      controlElements.forEach((controlElement) => {
        if (!swiper.controller.control) swiper.controller.control = [];
        if (controlElement && controlElement.swiper) {
          swiper.controller.control.push(controlElement.swiper);
        } else if (controlElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onControllerSwiper = (e) => {
            swiper.controller.control.push(e.detail[0]);
            swiper.update();
            controlElement.removeEventListener(eventName, onControllerSwiper);
          };
          controlElement.addEventListener(eventName, onControllerSwiper);
        }
      });
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on("update", () => {
    removeSpline();
  });
  on("resize", () => {
    removeSpline();
  });
  on("observerUpdate", () => {
    removeSpline();
  });
  on("setTranslate", (_s, translate2, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate2, byController);
  });
  on("setTransition", (_s, duration, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate: setTranslate2,
    setTransition: setTransition2
  });
}
function A11y(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
      scrollOnFocus: true
    }
  });
  swiper.a11y = {
    clicked: false
  };
  let liveRegion = null;
  let preventFocusHandler;
  let focusTargetSlideEl;
  let visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    notification.innerHTML = "";
    notification.innerHTML = message;
  }
  function getRandomNumber(size) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("tabIndex", "0");
    });
  }
  function makeElNotFocusable(el) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("tabIndex", "-1");
    });
  }
  function addElRole(el, role) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("role", role);
    });
  }
  function addElRoleDescription(el, description) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-roledescription", description);
    });
  }
  function addElControls(el, controls) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-controls", controls);
    });
  }
  function addElLabel(el, label) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-label", label);
    });
  }
  function addElId(el, id) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("id", id);
    });
  }
  function addElLive(el, live) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-live", live);
    });
  }
  function disableEl(el) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-disabled", true);
    });
  }
  function enableEl(el) {
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.setAttribute("aria-disabled", false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y;
    const targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
      const prevEls = makeElementsArray(swiper.navigation.prevEl);
      const nextEls = makeElementsArray(swiper.navigation.nextEl);
      if (nextEls.includes(targetEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (prevEls.includes(targetEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
    }
    if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    const params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach((bulletEl) => {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, "button");
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
        }
      }
      if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute("aria-current", "true");
      } else {
        bulletEl.removeAttribute("aria-current");
      }
    });
  }
  const initNavEl = (el, wrapperId, message) => {
    makeElFocusable(el);
    if (el.tagName !== "BUTTON") {
      addElRole(el, "button");
      el.addEventListener("keydown", onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  const handlePointerDown = (e) => {
    if (focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target)) {
      preventFocusHandler = true;
    }
    swiper.a11y.clicked = true;
  };
  const handlePointerUp = () => {
    preventFocusHandler = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  const onVisibilityChange = (e) => {
    visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
  };
  const handleFocus = (e) => {
    if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus) return;
    if ((/* @__PURE__ */ new Date()).getTime() - visibilityChangedTimestamp < 100) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(parseInt(slideEl.getAttribute("data-swiper-slide-index")), 0);
      } else {
        swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
      }
      preventFocusHandler = false;
    });
  };
  const initSlides = () => {
    const params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    const slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach((slideEl, index) => {
        const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : index;
        const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  const init2 = () => {
    const params = swiper.params.a11y;
    swiper.el.append(liveRegion);
    const containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }
    if (params.containerRole) {
      addElRole(containerEl, params.containerRole);
    }
    const wrapperEl = swiper.wrapperEl;
    const wrapperId = params.id || wrapperEl.getAttribute("id") || `swiper-wrapper-${getRandomNumber(16)}`;
    const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
    addElId(wrapperEl, wrapperId);
    addElLive(wrapperEl, live);
    initSlides();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach((el) => initNavEl(el, wrapperId, params.nextSlideMessage));
    }
    if (prevEl) {
      prevEl.forEach((el) => initNavEl(el, wrapperId, params.prevSlideMessage));
    }
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach((el) => {
        el.addEventListener("keydown", onEnterOrSpaceKey);
      });
    }
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
    swiper.el.addEventListener("focus", handleFocus, true);
    swiper.el.addEventListener("focus", handleFocus, true);
    swiper.el.addEventListener("pointerdown", handlePointerDown, true);
    swiper.el.addEventListener("pointerup", handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion) liveRegion.remove();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
    }
    if (prevEl) {
      prevEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
    }
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach((el) => {
        el.removeEventListener("keydown", onEnterOrSpaceKey);
      });
    }
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
    if (swiper.el && typeof swiper.el !== "string") {
      swiper.el.removeEventListener("focus", handleFocus, true);
      swiper.el.removeEventListener("pointerdown", handlePointerDown, true);
      swiper.el.removeEventListener("pointerup", handlePointerUp, true);
    }
  }
  on("beforeInit", () => {
    liveRegion = createElement("span", swiper.params.a11y.notificationClass);
    liveRegion.setAttribute("aria-live", "assertive");
    liveRegion.setAttribute("aria-atomic", "true");
  });
  on("afterInit", () => {
    if (!swiper.params.a11y.enabled) return;
    init2();
  });
  on("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on("fromEdge toEdge afterInit lock unlock", () => {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on("paginationUpdate", () => {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on("destroy", () => {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}
function History(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    history: {
      enabled: false,
      root: "",
      replaceState: false,
      key: "slides",
      keepQuery: false
    }
  });
  let initialized = false;
  let paths = {};
  const slugify = (text) => {
    return text.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  };
  const getPathValues = (urlOverride) => {
    const window2 = getWindow();
    let location2;
    if (urlOverride) {
      location2 = new URL(urlOverride);
    } else {
      location2 = window2.location;
    }
    const pathArray = location2.pathname.slice(1).split("/").filter((part) => part !== "");
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return {
      key,
      value
    };
  };
  const setHistory = (key, index) => {
    const window2 = getWindow();
    if (!initialized || !swiper.params.history.enabled) return;
    let location2;
    if (swiper.params.url) {
      location2 = new URL(swiper.params.url);
    } else {
      location2 = window2.location;
    }
    const slide2 = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`) : swiper.slides[index];
    let value = slugify(slide2.getAttribute("data-history"));
    if (swiper.params.history.root.length > 0) {
      let root = swiper.params.history.root;
      if (root[root.length - 1] === "/") root = root.slice(0, root.length - 1);
      value = `${root}/${key ? `${key}/` : ""}${value}`;
    } else if (!location2.pathname.includes(key)) {
      value = `${key ? `${key}/` : ""}${value}`;
    }
    if (swiper.params.history.keepQuery) {
      value += location2.search;
    }
    const currentState = window2.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      window2.history.replaceState({
        value
      }, null, value);
    } else {
      window2.history.pushState({
        value
      }, null, value);
    }
  };
  const scrollToSlide = (speed, value, runCallbacks) => {
    if (value) {
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide2 = swiper.slides[i];
        const slideHistory = slugify(slide2.getAttribute("data-history"));
        if (slideHistory === value) {
          const index = swiper.getSlideIndex(slide2);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };
  const setHistoryPopState = () => {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };
  const init2 = () => {
    const window2 = getWindow();
    if (!swiper.params.history) return;
    if (!window2.history || !window2.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!swiper.params.history.replaceState) {
        window2.addEventListener("popstate", setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      window2.addEventListener("popstate", setHistoryPopState);
    }
  };
  const destroy = () => {
    const window2 = getWindow();
    if (!swiper.params.history.replaceState) {
      window2.removeEventListener("popstate", setHistoryPopState);
    }
  };
  on("init", () => {
    if (swiper.params.history.enabled) {
      init2();
    }
  });
  on("destroy", () => {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on("transitionEnd _freeModeNoMomentumRelease", () => {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on("slideChange", () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}
function HashNavigation(_ref) {
  let {
    swiper,
    extendParams,
    emit,
    on
  } = _ref;
  let initialized = false;
  const document2 = getDocument();
  const window2 = getWindow();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex(_s, hash) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          const slideWithHash = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-hash") === hash)[0];
          if (!slideWithHash) return 0;
          const index = parseInt(slideWithHash.getAttribute("data-swiper-slide-index"), 10);
          return index;
        }
        return swiper.getSlideIndex(elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
      }
    }
  });
  const onHashChange = () => {
    emit("hashChange");
    const newHash = document2.location.hash.replace("#", "");
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") : "";
    if (newHash !== activeSlideHash) {
      const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
      if (typeof newIndex === "undefined" || Number.isNaN(newIndex)) return;
      swiper.slideTo(newIndex);
    }
  };
  const setHash = () => {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") || activeSlideEl.getAttribute("data-history") : "";
    if (swiper.params.hashNavigation.replaceState && window2.history && window2.history.replaceState) {
      window2.history.replaceState(null, null, `#${activeSlideHash}` || "");
      emit("hashSet");
    } else {
      document2.location.hash = activeSlideHash || "";
      emit("hashSet");
    }
  };
  const init2 = () => {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    const hash = document2.location.hash.replace("#", "");
    if (hash) {
      const speed = 0;
      const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (swiper.params.hashNavigation.watchState) {
      window2.addEventListener("hashchange", onHashChange);
    }
  };
  const destroy = () => {
    if (swiper.params.hashNavigation.watchState) {
      window2.removeEventListener("hashchange", onHashChange);
    }
  };
  on("init", () => {
    if (swiper.params.hashNavigation.enabled) {
      init2();
    }
  });
  on("destroy", () => {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on("transitionEnd _freeModeNoMomentumRelease", () => {
    if (initialized) {
      setHash();
    }
  });
  on("slideChange", () => {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit,
    params
  } = _ref;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== "string") {
      swiper.el.removeEventListener("pointerenter", onPointerEnter);
      swiper.el.removeEventListener("pointerleave", onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("_freeModeStaticRelease", () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on("_freeModeNoMomentumRelease", () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
function Thumb(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs"
    }
  });
  let initialized = false;
  let swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init2() {
    const {
      thumbs: thumbsParams
    } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if (isObject(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on("tap", onThumbClick);
    return true;
  }
  function update2(initial) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const slidesPerView = thumbsSwiper.params.slidesPerView === "auto" ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach((slideEl) => slideEl.classList.remove(thumbActiveClass));
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach((slideEl) => {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + i]) {
          thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
        }
      }
    }
    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      const currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsSwiper.params.loop) {
        const newThumbsSlide = thumbsSwiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") === `${swiper.realIndex}`)[0];
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
      }
      if (useOffset) {
        newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
      }
    }
  }
  on("beforeInit", () => {
    const {
      thumbs
    } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === "string" || thumbs.swiper instanceof HTMLElement) {
      const document2 = getDocument();
      const getThumbsElementAndInit = () => {
        const thumbsElement = typeof thumbs.swiper === "string" ? document2.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init2();
          update2(true);
        } else if (thumbsElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onThumbsSwiper = (e) => {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener(eventName, onThumbsSwiper);
            init2();
            update2(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener(eventName, onThumbsSwiper);
        }
        return thumbsElement;
      };
      const watchForThumbsToAppear = () => {
        if (swiper.destroyed) return;
        const thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init2();
      update2(true);
    }
  });
  on("slideChange update resize observerUpdate", () => {
    update2();
  });
  on("setTransition", (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on("beforeDestroy", () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init: init2,
    update: update2
  });
}
function freeMode(_ref) {
  let {
    swiper,
    extendParams,
    emit,
    once
  } = _ref;
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchStart2() {
    if (swiper.params.cssMode) return;
    const translate2 = swiper.getTranslate();
    swiper.setTranslate(translate2);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }
  function onTouchMove2() {
    if (swiper.params.cssMode) return;
    const {
      touchEventsData: data,
      touches
    } = swiper;
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? "startX" : "startY"],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
      time: now()
    });
  }
  function onTouchEnd2(_ref2) {
    let {
      currentPos
    } = _ref2;
    if (swiper.params.cssMode) return;
    const {
      params,
      wrapperEl,
      rtlTranslate: rtl2,
      snapGrid,
      touchEventsData: data
    } = swiper;
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();
        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        }
        if (time > 150 || now() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      let momentumDuration = 1e3 * params.freeMode.momentumRatio;
      const momentumDistance = swiper.velocity * momentumDuration;
      let newPosition = swiper.translate + momentumDistance;
      if (rtl2) newPosition = -newPosition;
      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        let nextSlide;
        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === "next") {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once("transitionEnd", () => {
          swiper.loopFix();
        });
      }
      if (swiper.velocity !== 0) {
        if (rtl2) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          const moveDistance = Math.abs((rtl2 ? -newPosition : newPosition) - swiper.translate);
          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        elementTransitionEnd(wrapperEl, () => {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit("momentumBounce");
          swiper.setTransition(params.speed);
          setTimeout(() => {
            swiper.setTranslate(afterBouncePosition);
            elementTransitionEnd(wrapperEl, () => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit("_freeModeNoMomentumRelease");
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          elementTransitionEnd(wrapperEl, () => {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit("_freeModeNoMomentumRelease");
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      emit("_freeModeStaticRelease");
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchStart: onTouchStart2,
      onTouchMove: onTouchMove2,
      onTouchEnd: onTouchEnd2
    }
  });
}
function Grid(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    grid: {
      rows: 1,
      fill: "column"
    }
  });
  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;
  let wasMultiRow;
  const getSpaceBetween = () => {
    let spaceBetween = swiper.params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    return spaceBetween;
  };
  const initSlides = (slides) => {
    const {
      slidesPerView
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== "auto" && fill === "row") {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
    slidesPerRow = slidesNumberEvenToRows / rows;
  };
  const unsetSlides = () => {
    if (swiper.slides) {
      swiper.slides.forEach((slide2) => {
        if (slide2.swiperSlideGridSet) {
          slide2.style.height = "";
          slide2.style[swiper.getDirectionLabel("margin-top")] = "";
        }
      });
    }
  };
  const updateSlide = (i, slide2, slides) => {
    const {
      slidesPerGroup
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    let newSlideOrderIndex;
    let column;
    let row;
    if (fill === "row" && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide2.style.order = newSlideOrderIndex;
    } else if (fill === "column") {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide2.row = row;
    slide2.column = column;
    slide2.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
    slide2.style[swiper.getDirectionLabel("margin-top")] = row !== 0 ? spaceBetween && `${spaceBetween}px` : "";
    slide2.swiperSlideGridSet = true;
  };
  const updateWrapperSize = (slideSize, snapGrid) => {
    const {
      centeredSlides,
      roundLengths
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows
    } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push(...newSlidesGrid);
    }
  };
  const onInit = () => {
    wasMultiRow = swiper.params.grid && swiper.params.grid.rows > 1;
  };
  const onUpdate = () => {
    const {
      params,
      el
    } = swiper;
    const isMultiRow = params.grid && params.grid.rows > 1;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      numFullColumns = 1;
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    wasMultiRow = isMultiRow;
  };
  on("init", onInit);
  on("update", onUpdate);
  swiper.grid = {
    initSlides,
    unsetSlides,
    updateSlide,
    updateWrapperSize
  };
}
function appendSlide(slides) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  const appendElement = (slideEl) => {
    if (typeof slideEl === "string") {
      const tempDOM = document.createElement("div");
      tempDOM.innerHTML = slideEl;
      slidesEl.append(tempDOM.children[0]);
      tempDOM.innerHTML = "";
    } else {
      slidesEl.append(slideEl);
    }
  };
  if (typeof slides === "object" && "length" in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}
function prependSlide(slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndex + 1;
  const prependElement = (slideEl) => {
    if (typeof slideEl === "string") {
      const tempDOM = document.createElement("div");
      tempDOM.innerHTML = slideEl;
      slidesEl.prepend(tempDOM.children[0]);
      tempDOM.innerHTML = "";
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (typeof slides === "object" && "length" in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) prependElement(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}
function addSlide(index, slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  const baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  const slidesBuffer = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = swiper.slides[i];
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }
  if (typeof slides === "object" && "length" in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) slidesEl.append(slides[i]);
    }
    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }
  for (let i = 0; i < slidesBuffer.length; i += 1) {
    slidesEl.append(slidesBuffer[i]);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}
function removeSlide(slidesIndexes) {
  const swiper = this;
  const {
    params,
    activeIndex
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;
  if (typeof slidesIndexes === "object" && "length" in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}
function removeAllSlides() {
  const swiper = this;
  const slidesIndexes = [];
  for (let i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}
function Manipulation(_ref) {
  let {
    swiper
  } = _ref;
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper)
  });
}
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on("beforeInit", () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on("setTranslate", () => {
    if (swiper.params.effect !== effect) return;
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition2(duration);
  });
  on("transitionEnd", () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on("virtualUpdate", () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate2();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}
function effectVirtualTransitionEnd(_ref) {
  let {
    swiper,
    duration,
    transformElements,
    allSlides
  } = _ref;
  const {
    activeIndex
  } = swiper;
  const getSlide = (el) => {
    if (!el.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode)[0];
      return slide2;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}
function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate2 = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "fade",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
function EffectCube(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  const createSlideShadows = (slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
    let shadowAfter = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
    if (!shadowBefore) {
      shadowBefore = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "left" : "top"}`.split(" "));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}`.split(" "));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach((slideEl) => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  const setTranslate2 = () => {
    const {
      el,
      wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl2,
      size: swiperSize,
      browser: browser2
    } = swiper;
    const r = getRotateFix(swiper);
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    let cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.wrapperEl.querySelector(".swiper-cube-shadow");
        if (!cubeShadowEl) {
          cubeShadowEl = createElement("div", "swiper-cube-shadow");
          swiper.wrapperEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = `${swiperWidth}px`;
      } else {
        cubeShadowEl = el.querySelector(".swiper-cube-shadow");
        if (!cubeShadowEl) {
          cubeShadowEl = createElement("div", "swiper-cube-shadow");
          el.append(cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl2) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl2) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      const transform = `rotateX(${r(isHorizontal ? 0 : -slideAngle)}deg) rotateY(${r(isHorizontal ? slideAngle : 0)}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl2) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
    wrapperEl.style["-webkit-transform-origin"] = `50% 50% -${swiperSize / 2}px`;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${params.shadowScale})`;
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-89.99deg)`;
      }
    }
    const zFactor = (browser2.isSafari || browser2.isWebView) && browser2.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${r(swiper.isHorizontal() ? 0 : wrapperRotate)}deg) rotateY(${r(swiper.isHorizontal() ? -wrapperRotate : 0)}deg)`;
    wrapperEl.style.setProperty("--swiper-cube-translate-z", `${zFactor}px`);
  };
  const setTransition2 = (duration) => {
    const {
      el,
      slides
    } = swiper;
    slides.forEach((slideEl) => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((subEl) => {
        subEl.style.transitionDuration = `${duration}ms`;
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      const shadowEl = el.querySelector(".swiper-cube-shadow");
      if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
    }
  };
  effectInit({
    effect: "cube",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}
function createShadow(suffix, slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}${suffix ? ` swiper-slide-shadow-${suffix}` : ""}`;
  const shadowContainer = getSlideTransformEl(slideEl);
  let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(" ").join(".")}`);
  if (!shadowEl) {
    shadowEl = createElement("div", shadowClass.split(" "));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}
function EffectFlip(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  const createSlideShadows = (slideEl, progress) => {
    let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
    let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
    if (!shadowBefore) {
      shadowBefore = createShadow("flip", slideEl, swiper.isHorizontal() ? "left" : "top");
    }
    if (!shadowAfter) {
      shadowAfter = createShadow("flip", slideEl, swiper.isHorizontal() ? "right" : "bottom");
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    swiper.params.flipEffect;
    swiper.slides.forEach((slideEl) => {
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress);
    });
  };
  const setTranslate2 = () => {
    const {
      slides,
      rtlTranslate: rtl2
    } = swiper;
    const params = swiper.params.flipEffect;
    const rotateFix = getRotateFix(swiper);
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl2) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateFix(rotateX)}deg) rotateY(${rotateFix(rotateY)}deg)`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements
    });
  };
  effectInit({
    effect: "flip",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
function EffectCoverflow(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  const setTranslate2 = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate2 = params.depth;
    const r = getRotateFix(swiper);
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i];
      const slideSize = slidesSizesGrid[i];
      const slideOffset = slideEl.swiperSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier = typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      let translateZ = -translate2 * Math.abs(offsetMultiplier);
      let stretch = params.stretch;
      if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
      if (Math.abs(translateX) < 1e-3) translateX = 0;
      if (Math.abs(translateY) < 1e-3) translateY = 0;
      if (Math.abs(translateZ) < 1e-3) translateZ = 0;
      if (Math.abs(rotateY) < 1e-3) rotateY = 0;
      if (Math.abs(rotateX) < 1e-3) rotateX = 0;
      if (Math.abs(scale) < 1e-3) scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${r(rotateX)}deg) rotateY(${r(rotateY)}deg) scale(${scale})`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        let shadowBeforeEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
        let shadowAfterEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
        if (!shadowBeforeEl) {
          shadowBeforeEl = createShadow("coverflow", slideEl, isHorizontal ? "left" : "top");
        }
        if (!shadowAfterEl) {
          shadowAfterEl = createShadow("coverflow", slideEl, isHorizontal ? "right" : "bottom");
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
  };
  effectInit({
    effect: "coverflow",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}
function EffectCreative(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const getTranslateValue = (value) => {
    if (typeof value === "string") return value;
    return `${value}px`;
  };
  const setTranslate2 = () => {
    const {
      slides,
      wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;
    const rotateFix = getRotateFix(swiper);
    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      const offset = slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      });
      r.forEach((value, index) => {
        let val = data.rotate[index] * Math.abs(progress * multiplier);
        r[index] = val;
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const translateString = t.join(", ");
      const rotateString = `rotateX(${rotateFix(r[0])}deg) rotateY(${rotateFix(r[1])}deg) rotateZ(${rotateFix(r[2])}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
      if (custom && data.shadow || !custom) {
        let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
        if (!shadowEl && data.shadow) {
          shadowEl = createShadow("creative", slideEl);
        }
        if (shadowEl) {
          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "creative",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
function EffectCards(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  const setTranslate2 = () => {
    const {
      slides,
      activeIndex,
      rtlTranslate: rtl2
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = rtl2 ? -swiper.translate : swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;
      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }
      if (progress < 0) {
        tX = `calc(${tX}px ${rtl2 ? "-" : "+"} (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        tX = `calc(${tX}px ${rtl2 ? "-" : "+"} (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }
      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl2 ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
      if (params.slideShadows) {
        let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
        if (!shadowEl) {
          shadowEl = createShadow("cards", slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements
    });
  };
  effectInit({
    effect: "cards",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
const modules = [Virtual, Keyboard$1, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
Swiper.use(modules);
var jquery = { exports: {} };
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
(function(module) {
  (function(global2, factory) {
    {
      module.exports = global2.document ? factory(global2, true) : function(w) {
        if (!w.document) {
          throw new Error("jQuery requires a window with a document");
        }
        return factory(w);
      };
    }
  })(typeof window !== "undefined" ? window : commonjsGlobal, function(window2, noGlobal) {
    var arr = [];
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var flat = arr.flat ? function(array) {
      return arr.flat.call(array);
    } : function(array) {
      return arr.concat.apply([], array);
    };
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString3 = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support2 = {};
    var isFunction = function isFunction2(obj) {
      return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
    };
    var isWindow = function isWindow2(obj) {
      return obj != null && obj === obj.window;
    };
    var document2 = window2.document;
    var preservedScriptAttributes = {
      type: true,
      src: true,
      nonce: true,
      noModule: true
    };
    function DOMEval(code, node, doc) {
      doc = doc || document2;
      var i, val, script = doc.createElement("script");
      script.text = code;
      if (node) {
        for (i in preservedScriptAttributes) {
          val = node[i] || node.getAttribute && node.getAttribute(i);
          if (val) {
            script.setAttribute(i, val);
          }
        }
      }
      doc.head.appendChild(script).parentNode.removeChild(script);
    }
    function toType(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString3.call(obj)] || "object" : typeof obj;
    }
    var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
      // The current version of jQuery being used
      jquery: version,
      constructor: jQuery,
      // The default length of a jQuery object is 0
      length: 0,
      toArray: function() {
        return slice.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function(num) {
        if (num == null) {
          return slice.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function(elems) {
        var ret = jQuery.merge(this.constructor(), elems);
        ret.prevObject = this;
        return ret;
      },
      // Execute a callback for every element in the matched set.
      each: function(callback) {
        return jQuery.each(this, callback);
      },
      map: function(callback) {
        return this.pushStack(jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem);
        }));
      },
      slice: function() {
        return this.pushStack(slice.apply(this, arguments));
      },
      first: function() {
        return this.eq(0);
      },
      last: function() {
        return this.eq(-1);
      },
      even: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i) {
          return (i + 1) % 2;
        }));
      },
      odd: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i) {
          return i % 2;
        }));
      },
      eq: function(i) {
        var len = this.length, j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function() {
        return this.prevObject || this.constructor();
      },
      // For internal use only.
      // Behaves like an Array's method, not like a jQuery method.
      push,
      sort: arr.sort,
      splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
      }
      if (typeof target !== "object" && !isFunction(target)) {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            copy = options[name];
            if (name === "__proto__" || target === copy) {
              continue;
            }
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              src = target[name];
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;
              target[name] = jQuery.extend(deep, clone, copy);
            } else if (copy !== void 0) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    };
    jQuery.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
      // Assume jQuery is ready without the ready module
      isReady: true,
      error: function(msg) {
        throw new Error(msg);
      },
      noop: function() {
      },
      isPlainObject: function(obj) {
        var proto, Ctor;
        if (!obj || toString3.call(obj) !== "[object Object]") {
          return false;
        }
        proto = getProto(obj);
        if (!proto) {
          return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },
      isEmptyObject: function(obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      },
      // Evaluates a script in a provided context; falls back to the global one
      // if not specified.
      globalEval: function(code, options, doc) {
        DOMEval(code, { nonce: options && options.nonce }, doc);
      },
      each: function(obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      // Retrieve the text value of an array of DOM nodes
      text: function(elem) {
        var node, ret = "", i = 0, nodeType = elem.nodeType;
        if (!nodeType) {
          while (node = elem[i++]) {
            ret += jQuery.text(node);
          }
        }
        if (nodeType === 1 || nodeType === 11) {
          return elem.textContent;
        }
        if (nodeType === 9) {
          return elem.documentElement.textContent;
        }
        if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
        return ret;
      },
      // results is for internal usage only
      makeArray: function(arr2, results) {
        var ret = results || [];
        if (arr2 != null) {
          if (isArrayLike(Object(arr2))) {
            jQuery.merge(
              ret,
              typeof arr2 === "string" ? [arr2] : arr2
            );
          } else {
            push.call(ret, arr2);
          }
        }
        return ret;
      },
      inArray: function(elem, arr2, i) {
        return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
      },
      isXMLDoc: function(elem) {
        var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
        return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
      },
      // Support: Android <=4.0 only, PhantomJS 1 only
      // push.apply(_, arraylike) throws on ancient WebKit
      merge: function(first, second) {
        var len = +second.length, j = 0, i = first.length;
        for (; j < len; j++) {
          first[i++] = second[j];
        }
        first.length = i;
        return first;
      },
      grep: function(elems, callback, invert) {
        var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
        for (; i < length; i++) {
          callbackInverse = !callback(elems[i], i);
          if (callbackInverse !== callbackExpect) {
            matches.push(elems[i]);
          }
        }
        return matches;
      },
      // arg is for internal usage only
      map: function(elems, callback, arg) {
        var length, value, i = 0, ret = [];
        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i < length; i++) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        } else {
          for (i in elems) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        }
        return flat(ret);
      },
      // A global GUID counter for objects
      guid: 1,
      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support: support2
    });
    if (typeof Symbol === "function") {
      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
      function(_i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      }
    );
    function isArrayLike(obj) {
      var length = !!obj && "length" in obj && obj.length, type3 = toType(obj);
      if (isFunction(obj) || isWindow(obj)) {
        return false;
      }
      return type3 === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    var pop = arr.pop;
    var sort = arr.sort;
    var splice = arr.splice;
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var rtrimCSS = new RegExp(
      "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
      "g"
    );
    jQuery.contains = function(a, b) {
      var bup = b && b.parentNode;
      return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
      // IE doesn't have `contains` on SVG.
      (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
    };
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        if (ch === "\0") {
          return "�";
        }
        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      }
      return "\\" + ch;
    }
    jQuery.escapeSelector = function(sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };
    var preferredDoc = document2, pushNative = push;
    (function() {
      var i, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document22, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
      "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
        ID: new RegExp("^#(" + identifier + ")"),
        CLASS: new RegExp("^\\.(" + identifier + ")"),
        TAG: new RegExp("^(" + identifier + "|[*])"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape2, nonHex) {
        var high = "0x" + escape2.slice(1) - 65536;
        if (nonHex) {
          return nonHex;
        }
        return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      }, unloadHandler = function() {
        setDocument();
      }, inDisabledFieldset = addCombinator(
        function(elem) {
          return elem.disabled === true && nodeName(elem, "fieldset");
        },
        { dir: "parentNode", next: "legend" }
      );
      function safeActiveElement() {
        try {
          return document22.activeElement;
        } catch (err) {
        }
      }
      try {
        push2.apply(
          arr = slice.call(preferredDoc.childNodes),
          preferredDoc.childNodes
        );
        arr[preferredDoc.childNodes.length].nodeType;
      } catch (e) {
        push2 = {
          apply: function(target, els) {
            pushNative.apply(target, slice.call(els));
          },
          call: function(target) {
            pushNative.apply(target, slice.call(arguments, 1));
          }
        };
      }
      function find(selector, context, results, seed) {
        var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
        results = results || [];
        if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
          return results;
        }
        if (!seed) {
          setDocument(context);
          context = context || document22;
          if (documentIsHTML) {
            if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
              if (m = match[1]) {
                if (nodeType === 9) {
                  if (elem = context.getElementById(m)) {
                    if (elem.id === m) {
                      push2.call(results, elem);
                      return results;
                    }
                  } else {
                    return results;
                  }
                } else {
                  if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                    push2.call(results, elem);
                    return results;
                  }
                }
              } else if (match[2]) {
                push2.apply(results, context.getElementsByTagName(selector));
                return results;
              } else if ((m = match[3]) && context.getElementsByClassName) {
                push2.apply(results, context.getElementsByClassName(m));
                return results;
              }
            }
            if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
              newSelector = selector;
              newContext = context;
              if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                if (newContext != context || !support2.scope) {
                  if (nid = context.getAttribute("id")) {
                    nid = jQuery.escapeSelector(nid);
                  } else {
                    context.setAttribute("id", nid = expando);
                  }
                }
                groups = tokenize(selector);
                i2 = groups.length;
                while (i2--) {
                  groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                }
                newSelector = groups.join(",");
              }
              try {
                push2.apply(
                  results,
                  newContext.querySelectorAll(newSelector)
                );
                return results;
              } catch (qsaError) {
                nonnativeSelectorCache(selector, true);
              } finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
        return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
      }
      function createCache() {
        var keys4 = [];
        function cache(key, value) {
          if (keys4.push(key + " ") > Expr.cacheLength) {
            delete cache[keys4.shift()];
          }
          return cache[key + " "] = value;
        }
        return cache;
      }
      function markFunction(fn) {
        fn[expando] = true;
        return fn;
      }
      function assert(fn) {
        var el = document22.createElement("fieldset");
        try {
          return !!fn(el);
        } catch (e) {
          return false;
        } finally {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
          el = null;
        }
      }
      function createInputPseudo(type3) {
        return function(elem) {
          return nodeName(elem, "input") && elem.type === type3;
        };
      }
      function createButtonPseudo(type3) {
        return function(elem) {
          return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type3;
        };
      }
      function createDisabledPseudo(disabled) {
        return function(elem) {
          if ("form" in elem) {
            if (elem.parentNode && elem.disabled === false) {
              if ("label" in elem) {
                if ("label" in elem.parentNode) {
                  return elem.parentNode.disabled === disabled;
                } else {
                  return elem.disabled === disabled;
                }
              }
              return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
              elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
            }
            return elem.disabled === disabled;
          } else if ("label" in elem) {
            return elem.disabled === disabled;
          }
          return false;
        };
      }
      function createPositionalPseudo(fn) {
        return markFunction(function(argument) {
          argument = +argument;
          return markFunction(function(seed, matches2) {
            var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
            while (i2--) {
              if (seed[j = matchIndexes[i2]]) {
                seed[j] = !(matches2[j] = seed[j]);
              }
            }
          });
        });
      }
      function testContext(context) {
        return context && typeof context.getElementsByTagName !== "undefined" && context;
      }
      function setDocument(node) {
        var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
        if (doc == document22 || doc.nodeType !== 9 || !doc.documentElement) {
          return document22;
        }
        document22 = doc;
        documentElement2 = document22.documentElement;
        documentIsHTML = !jQuery.isXMLDoc(document22);
        matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
        if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        preferredDoc != document22 && (subWindow = document22.defaultView) && subWindow.top !== subWindow) {
          subWindow.addEventListener("unload", unloadHandler);
        }
        support2.getById = assert(function(el) {
          documentElement2.appendChild(el).id = jQuery.expando;
          return !document22.getElementsByName || !document22.getElementsByName(jQuery.expando).length;
        });
        support2.disconnectedMatch = assert(function(el) {
          return matches.call(el, "*");
        });
        support2.scope = assert(function() {
          return document22.querySelectorAll(":scope");
        });
        support2.cssHas = assert(function() {
          try {
            document22.querySelector(":has(*,:jqfake)");
            return false;
          } catch (e) {
            return true;
          }
        });
        if (support2.getById) {
          Expr.filter.ID = function(id) {
            var attrId = id.replace(runescape, funescape);
            return function(elem) {
              return elem.getAttribute("id") === attrId;
            };
          };
          Expr.find.ID = function(id, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var elem = context.getElementById(id);
              return elem ? [elem] : [];
            }
          };
        } else {
          Expr.filter.ID = function(id) {
            var attrId = id.replace(runescape, funescape);
            return function(elem) {
              var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
              return node2 && node2.value === attrId;
            };
          };
          Expr.find.ID = function(id, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var node2, i2, elems, elem = context.getElementById(id);
              if (elem) {
                node2 = elem.getAttributeNode("id");
                if (node2 && node2.value === id) {
                  return [elem];
                }
                elems = context.getElementsByName(id);
                i2 = 0;
                while (elem = elems[i2++]) {
                  node2 = elem.getAttributeNode("id");
                  if (node2 && node2.value === id) {
                    return [elem];
                  }
                }
              }
              return [];
            }
          };
        }
        Expr.find.TAG = function(tag, context) {
          if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);
          } else {
            return context.querySelectorAll(tag);
          }
        };
        Expr.find.CLASS = function(className, context) {
          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
            return context.getElementsByClassName(className);
          }
        };
        rbuggyQSA = [];
        assert(function(el) {
          var input;
          documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          input = document22.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D");
          documentElement2.appendChild(el).disabled = true;
          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          input = document22.createElement("input");
          input.setAttribute("name", "");
          el.appendChild(input);
          if (!el.querySelectorAll("[name='']").length) {
            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
          }
        });
        if (!support2.cssHas) {
          rbuggyQSA.push(":has");
        }
        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }
          var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
          if (compare) {
            return compare;
          }
          compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
            // Otherwise we know they are disconnected
            1
          );
          if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
            if (a === document22 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
              return -1;
            }
            if (b === document22 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
              return 1;
            }
            return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
          }
          return compare & 4 ? -1 : 1;
        };
        return document22;
      }
      find.matches = function(expr, elements) {
        return find(expr, null, null, elements);
      };
      find.matchesSelector = function(elem, expr) {
        setDocument(elem);
        if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
          try {
            var ret = matches.call(elem, expr);
            if (ret || support2.disconnectedMatch || // As well, disconnected nodes are said to be in a document
            // fragment in IE 9
            elem.document && elem.document.nodeType !== 11) {
              return ret;
            }
          } catch (e) {
            nonnativeSelectorCache(expr, true);
          }
        }
        return find(expr, document22, null, [elem]).length > 0;
      };
      find.contains = function(context, elem) {
        if ((context.ownerDocument || context) != document22) {
          setDocument(context);
        }
        return jQuery.contains(context, elem);
      };
      find.attr = function(elem, name) {
        if ((elem.ownerDocument || elem) != document22) {
          setDocument(elem);
        }
        var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
        if (val !== void 0) {
          return val;
        }
        return elem.getAttribute(name);
      };
      find.error = function(msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
      };
      jQuery.uniqueSort = function(results) {
        var elem, duplicates = [], j = 0, i2 = 0;
        hasDuplicate = !support2.sortStable;
        sortInput = !support2.sortStable && slice.call(results, 0);
        sort.call(results, sortOrder);
        if (hasDuplicate) {
          while (elem = results[i2++]) {
            if (elem === results[i2]) {
              j = duplicates.push(i2);
            }
          }
          while (j--) {
            splice.call(results, duplicates[j], 1);
          }
        }
        sortInput = null;
        return results;
      };
      jQuery.fn.uniqueSort = function() {
        return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
      };
      Expr = jQuery.expr = {
        // Can be adjusted by the user
        cacheLength: 50,
        createPseudo: markFunction,
        match: matchExpr,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: true },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: true },
          "~": { dir: "previousSibling" }
        },
        preFilter: {
          ATTR: function(match) {
            match[1] = match[1].replace(runescape, funescape);
            match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
            if (match[2] === "~=") {
              match[3] = " " + match[3] + " ";
            }
            return match.slice(0, 4);
          },
          CHILD: function(match) {
            match[1] = match[1].toLowerCase();
            if (match[1].slice(0, 3) === "nth") {
              if (!match[3]) {
                find.error(match[0]);
              }
              match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
              match[5] = +(match[7] + match[8] || match[3] === "odd");
            } else if (match[3]) {
              find.error(match[0]);
            }
            return match;
          },
          PSEUDO: function(match) {
            var excess, unquoted = !match[6] && match[2];
            if (matchExpr.CHILD.test(match[0])) {
              return null;
            }
            if (match[3]) {
              match[2] = match[4] || match[5] || "";
            } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
            (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
              match[0] = match[0].slice(0, excess);
              match[2] = unquoted.slice(0, excess);
            }
            return match.slice(0, 3);
          }
        },
        filter: {
          TAG: function(nodeNameSelector) {
            var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
            return nodeNameSelector === "*" ? function() {
              return true;
            } : function(elem) {
              return nodeName(elem, expectedNodeName);
            };
          },
          CLASS: function(className) {
            var pattern = classCache[className + " "];
            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
              return pattern.test(
                typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
              );
            });
          },
          ATTR: function(name, operator, check) {
            return function(elem) {
              var result = find.attr(elem, name);
              if (result == null) {
                return operator === "!=";
              }
              if (!operator) {
                return true;
              }
              result += "";
              if (operator === "=") {
                return result === check;
              }
              if (operator === "!=") {
                return result !== check;
              }
              if (operator === "^=") {
                return check && result.indexOf(check) === 0;
              }
              if (operator === "*=") {
                return check && result.indexOf(check) > -1;
              }
              if (operator === "$=") {
                return check && result.slice(-check.length) === check;
              }
              if (operator === "~=") {
                return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
              }
              if (operator === "|=") {
                return result === check || result.slice(0, check.length + 1) === check + "-";
              }
              return false;
            };
          },
          CHILD: function(type3, what, _argument, first, last) {
            var simple = type3.slice(0, 3) !== "nth", forward = type3.slice(-4) !== "last", ofType = what === "of-type";
            return first === 1 && last === 0 ? (
              // Shortcut for :nth-*(n)
              function(elem) {
                return !!elem.parentNode;
              }
            ) : function(elem, _context, xml) {
              var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
              if (parent) {
                if (simple) {
                  while (dir2) {
                    node = elem;
                    while (node = node[dir2]) {
                      if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                        return false;
                      }
                    }
                    start = dir2 = type3 === "only" && !start && "nextSibling";
                  }
                  return true;
                }
                start = [forward ? parent.firstChild : parent.lastChild];
                if (forward && useCache) {
                  outerCache = parent[expando] || (parent[expando] = {});
                  cache = outerCache[type3] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex && cache[2];
                  node = nodeIndex && parent.childNodes[nodeIndex];
                  while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                  (diff = nodeIndex = 0) || start.pop()) {
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      outerCache[type3] = [dirruns, nodeIndex, diff];
                      break;
                    }
                  }
                } else {
                  if (useCache) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    cache = outerCache[type3] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex;
                  }
                  if (diff === false) {
                    while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                      if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                        if (useCache) {
                          outerCache = node[expando] || (node[expando] = {});
                          outerCache[type3] = [dirruns, diff];
                        }
                        if (node === elem) {
                          break;
                        }
                      }
                    }
                  }
                }
                diff -= last;
                return diff === first || diff % first === 0 && diff / first >= 0;
              }
            };
          },
          PSEUDO: function(pseudo, argument) {
            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
            if (fn[expando]) {
              return fn(argument);
            }
            if (fn.length > 1) {
              args = [pseudo, pseudo, "", argument];
              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                var idx, matched = fn(seed, argument), i2 = matched.length;
                while (i2--) {
                  idx = indexOf.call(seed, matched[i2]);
                  seed[idx] = !(matches2[idx] = matched[i2]);
                }
              }) : function(elem) {
                return fn(elem, 0, args);
              };
            }
            return fn;
          }
        },
        pseudos: {
          // Potentially complex pseudos
          not: markFunction(function(selector) {
            var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
            return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
              var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
              while (i2--) {
                if (elem = unmatched[i2]) {
                  seed[i2] = !(matches2[i2] = elem);
                }
              }
            }) : function(elem, _context, xml) {
              input[0] = elem;
              matcher(input, null, xml, results);
              input[0] = null;
              return !results.pop();
            };
          }),
          has: markFunction(function(selector) {
            return function(elem) {
              return find(selector, elem).length > 0;
            };
          }),
          contains: markFunction(function(text) {
            text = text.replace(runescape, funescape);
            return function(elem) {
              return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
            };
          }),
          // "Whether an element is represented by a :lang() selector
          // is based solely on the element's language value
          // being equal to the identifier C,
          // or beginning with the identifier C immediately followed by "-".
          // The matching of C against the element's language value is performed case-insensitively.
          // The identifier C does not have to be a valid language name."
          // https://www.w3.org/TR/selectors/#lang-pseudo
          lang: markFunction(function(lang) {
            if (!ridentifier.test(lang || "")) {
              find.error("unsupported lang: " + lang);
            }
            lang = lang.replace(runescape, funescape).toLowerCase();
            return function(elem) {
              var elemLang;
              do {
                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                  elemLang = elemLang.toLowerCase();
                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1);
              return false;
            };
          }),
          // Miscellaneous
          target: function(elem) {
            var hash = window2.location && window2.location.hash;
            return hash && hash.slice(1) === elem.id;
          },
          root: function(elem) {
            return elem === documentElement2;
          },
          focus: function(elem) {
            return elem === safeActiveElement() && document22.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
          },
          // Boolean properties
          enabled: createDisabledPseudo(false),
          disabled: createDisabledPseudo(true),
          checked: function(elem) {
            return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
          },
          selected: function(elem) {
            if (elem.parentNode) {
              elem.parentNode.selectedIndex;
            }
            return elem.selected === true;
          },
          // Contents
          empty: function(elem) {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false;
              }
            }
            return true;
          },
          parent: function(elem) {
            return !Expr.pseudos.empty(elem);
          },
          // Element/input types
          header: function(elem) {
            return rheader.test(elem.nodeName);
          },
          input: function(elem) {
            return rinputs.test(elem.nodeName);
          },
          button: function(elem) {
            return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
          },
          text: function(elem) {
            var attr;
            return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
            // New HTML5 attribute values (e.g., "search") appear
            // with elem.type === "text"
            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
          },
          // Position-in-collection
          first: createPositionalPseudo(function() {
            return [0];
          }),
          last: createPositionalPseudo(function(_matchIndexes, length) {
            return [length - 1];
          }),
          eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument];
          }),
          even: createPositionalPseudo(function(matchIndexes, length) {
            var i2 = 0;
            for (; i2 < length; i2 += 2) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          odd: createPositionalPseudo(function(matchIndexes, length) {
            var i2 = 1;
            for (; i2 < length; i2 += 2) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          lt: createPositionalPseudo(function(matchIndexes, length, argument) {
            var i2;
            if (argument < 0) {
              i2 = argument + length;
            } else if (argument > length) {
              i2 = length;
            } else {
              i2 = argument;
            }
            for (; --i2 >= 0; ) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          gt: createPositionalPseudo(function(matchIndexes, length, argument) {
            var i2 = argument < 0 ? argument + length : argument;
            for (; ++i2 < length; ) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          })
        }
      };
      Expr.pseudos.nth = Expr.pseudos.eq;
      for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
        Expr.pseudos[i] = createInputPseudo(i);
      }
      for (i in { submit: true, reset: true }) {
        Expr.pseudos[i] = createButtonPseudo(i);
      }
      function setFilters() {
      }
      setFilters.prototype = Expr.filters = Expr.pseudos;
      Expr.setFilters = new setFilters();
      function tokenize(selector, parseOnly) {
        var matched, match, tokens, type3, soFar, groups, preFilters, cached = tokenCache[selector + " "];
        if (cached) {
          return parseOnly ? 0 : cached.slice(0);
        }
        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;
        while (soFar) {
          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {
              soFar = soFar.slice(match[0].length) || soFar;
            }
            groups.push(tokens = []);
          }
          matched = false;
          if (match = rleadingCombinator.exec(soFar)) {
            matched = match.shift();
            tokens.push({
              value: matched,
              // Cast descendant combinators to space
              type: match[0].replace(rtrimCSS, " ")
            });
            soFar = soFar.slice(matched.length);
          }
          for (type3 in Expr.filter) {
            if ((match = matchExpr[type3].exec(soFar)) && (!preFilters[type3] || (match = preFilters[type3](match)))) {
              matched = match.shift();
              tokens.push({
                value: matched,
                type: type3,
                matches: match
              });
              soFar = soFar.slice(matched.length);
            }
          }
          if (!matched) {
            break;
          }
        }
        if (parseOnly) {
          return soFar.length;
        }
        return soFar ? find.error(selector) : (
          // Cache the tokens
          tokenCache(selector, groups).slice(0)
        );
      }
      function toSelector(tokens) {
        var i2 = 0, len = tokens.length, selector = "";
        for (; i2 < len; i2++) {
          selector += tokens[i2].value;
        }
        return selector;
      }
      function addCombinator(matcher, combinator, base) {
        var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
        return combinator.first ? (
          // Check against closest ancestor/preceding element
          function(elem, context, xml) {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                return matcher(elem, context, xml);
              }
            }
            return false;
          }
        ) : (
          // Check against all ancestor/preceding elements
          function(elem, context, xml) {
            var oldCache, outerCache, newCache = [dirruns, doneName];
            if (xml) {
              while (elem = elem[dir2]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  if (matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            } else {
              while (elem = elem[dir2]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  outerCache = elem[expando] || (elem[expando] = {});
                  if (skip && nodeName(elem, skip)) {
                    elem = elem[dir2] || elem;
                  } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                    return newCache[2] = oldCache[2];
                  } else {
                    outerCache[key] = newCache;
                    if (newCache[2] = matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              }
            }
            return false;
          }
        );
      }
      function elementMatcher(matchers) {
        return matchers.length > 1 ? function(elem, context, xml) {
          var i2 = matchers.length;
          while (i2--) {
            if (!matchers[i2](elem, context, xml)) {
              return false;
            }
          }
          return true;
        } : matchers[0];
      }
      function multipleContexts(selector, contexts, results) {
        var i2 = 0, len = contexts.length;
        for (; i2 < len; i2++) {
          find(selector, contexts[i2], results);
        }
        return results;
      }
      function condense(unmatched, map, filter2, context, xml) {
        var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
        for (; i2 < len; i2++) {
          if (elem = unmatched[i2]) {
            if (!filter2 || filter2(elem, context, xml)) {
              newUnmatched.push(elem);
              if (mapped) {
                map.push(i2);
              }
            }
          }
        }
        return newUnmatched;
      }
      function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
        if (postFilter && !postFilter[expando]) {
          postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[expando]) {
          postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function(seed, results, context, xml) {
          var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
            selector || "*",
            context.nodeType ? [context] : context,
            []
          ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
          if (matcher) {
            matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
              // ...intermediate processing is necessary
              []
            ) : (
              // ...otherwise use results directly
              results
            );
            matcher(matcherIn, matcherOut, context, xml);
          } else {
            matcherOut = matcherIn;
          }
          if (postFilter) {
            temp = condense(matcherOut, postMap);
            postFilter(temp, [], context, xml);
            i2 = temp.length;
            while (i2--) {
              if (elem = temp[i2]) {
                matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
              }
            }
          }
          if (seed) {
            if (postFinder || preFilter) {
              if (postFinder) {
                temp = [];
                i2 = matcherOut.length;
                while (i2--) {
                  if (elem = matcherOut[i2]) {
                    temp.push(matcherIn[i2] = elem);
                  }
                }
                postFinder(null, matcherOut = [], temp, xml);
              }
              i2 = matcherOut.length;
              while (i2--) {
                if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                  seed[temp] = !(results[temp] = elem);
                }
              }
            }
          } else {
            matcherOut = condense(
              matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
            );
            if (postFinder) {
              postFinder(null, results, matcherOut, xml);
            } else {
              push2.apply(results, matcherOut);
            }
          }
        });
      }
      function matcherFromTokens(tokens) {
        var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function(elem, context, xml) {
          var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          checkContext = null;
          return ret;
        }];
        for (; i2 < len; i2++) {
          if (matcher = Expr.relative[tokens[i2].type]) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)];
          } else {
            matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
            if (matcher[expando]) {
              j = ++i2;
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break;
                }
              }
              return setMatcher(
                i2 > 1 && elementMatcher(matchers),
                i2 > 1 && toSelector(
                  // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                  tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                ).replace(rtrimCSS, "$1"),
                matcher,
                i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                j < len && matcherFromTokens(tokens = tokens.slice(j)),
                j < len && toSelector(tokens)
              );
            }
            matchers.push(matcher);
          }
        }
        return elementMatcher(matchers);
      }
      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
          if (outermost) {
            outermostContext = context == document22 || context || outermost;
          }
          for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument != document22) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document22, xml)) {
                  push2.call(results, elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i2;
          if (bySet && i2 !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i2--) {
                  if (!(unmatched[i2] || setMatched[i2])) {
                    setMatched[i2] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push2.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              jQuery.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
        return bySet ? markFunction(superMatcher) : superMatcher;
      }
      function compile(selector, match) {
        var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
        if (!cached) {
          if (!match) {
            match = tokenize(selector);
          }
          i2 = match.length;
          while (i2--) {
            cached = matcherFromTokens(match[i2]);
            if (cached[expando]) {
              setMatchers.push(cached);
            } else {
              elementMatchers.push(cached);
            }
          }
          cached = compilerCache(
            selector,
            matcherFromGroupMatchers(elementMatchers, setMatchers)
          );
          cached.selector = selector;
        }
        return cached;
      }
      function select(selector, context, results, seed) {
        var i2, tokens, token, type3, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
        results = results || [];
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find.ID(
              token.matches[0].replace(runescape, funescape),
              context
            ) || [])[0];
            if (!context) {
              return results;
            } else if (compiled) {
              context = context.parentNode;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
          while (i2--) {
            token = tokens[i2];
            if (Expr.relative[type3 = token.type]) {
              break;
            }
            if (find2 = Expr.find[type3]) {
              if (seed = find2(
                token.matches[0].replace(runescape, funescape),
                rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
              )) {
                tokens.splice(i2, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push2.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
        (compiled || compile(selector, match))(
          seed,
          context,
          !documentIsHTML,
          results,
          !context || rsibling.test(selector) && testContext(context.parentNode) || context
        );
        return results;
      }
      support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
      setDocument();
      support2.sortDetached = assert(function(el) {
        return el.compareDocumentPosition(document22.createElement("fieldset")) & 1;
      });
      jQuery.find = find;
      jQuery.expr[":"] = jQuery.expr.pseudos;
      jQuery.unique = jQuery.uniqueSort;
      find.compile = compile;
      find.select = select;
      find.setDocument = setDocument;
      find.tokenize = tokenize;
      find.escape = jQuery.escapeSelector;
      find.getText = jQuery.text;
      find.isXML = jQuery.isXMLDoc;
      find.selectors = jQuery.expr;
      find.support = jQuery.support;
      find.uniqueSort = jQuery.uniqueSort;
    })();
    var dir = function(elem, dir2, until) {
      var matched = [], truncate = until !== void 0;
      while ((elem = elem[dir2]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    };
    var siblings = function(n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function winnow(elements, qualifier, not) {
      if (isFunction(qualifier)) {
        return jQuery.grep(elements, function(elem, i) {
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }
      if (qualifier.nodeType) {
        return jQuery.grep(elements, function(elem) {
          return elem === qualifier !== not;
        });
      }
      if (typeof qualifier !== "string") {
        return jQuery.grep(elements, function(elem) {
          return indexOf.call(qualifier, elem) > -1 !== not;
        });
      }
      return jQuery.filter(qualifier, elements, not);
    }
    jQuery.filter = function(expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ":not(" + expr + ")";
      }
      if (elems.length === 1 && elem.nodeType === 1) {
        return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
      }
      return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
        return elem2.nodeType === 1;
      }));
    };
    jQuery.fn.extend({
      find: function(selector) {
        var i, ret, len = this.length, self2 = this;
        if (typeof selector !== "string") {
          return this.pushStack(jQuery(selector).filter(function() {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self2[i], this)) {
                return true;
              }
            }
          }));
        }
        ret = this.pushStack([]);
        for (i = 0; i < len; i++) {
          jQuery.find(selector, self2[i], ret);
        }
        return len > 1 ? jQuery.uniqueSort(ret) : ret;
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function(selector) {
        return !!winnow(
          this,
          // If this is a positional/relative selector, check membership in the returned set
          // so $("p:first").is("p:last") won't return true for a doc with two "p".
          typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
          false
        ).length;
      }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init2 = jQuery.fn.init = function(selector, context, root) {
      var match, elem;
      if (!selector) {
        return this;
      }
      root = root || rootjQuery;
      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(
              match[1],
              context && context.nodeType ? context.ownerDocument || context : document2,
              true
            ));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document2.getElementById(match[2]);
            if (elem) {
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || root).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      } else if (isFunction(selector)) {
        return root.ready !== void 0 ? root.ready(selector) : (
          // Execute immediately if ready is not present
          selector(jQuery)
        );
      }
      return jQuery.makeArray(selector, this);
    };
    init2.prototype = jQuery.fn;
    rootjQuery = jQuery(document2);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
    jQuery.fn.extend({
      has: function(target) {
        var targets = jQuery(target, this), l = targets.length;
        return this.filter(function() {
          var i = 0;
          for (; i < l; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },
      closest: function(selectors, context) {
        var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
        if (!rneedsContext.test(selectors)) {
          for (; i < l; i++) {
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                // Don't pass non-elements to jQuery#find
                cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
              ))) {
                matched.push(cur);
                break;
              }
            }
          }
        }
        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
      },
      // Determine the position of an element within the set
      index: function(elem) {
        if (!elem) {
          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }
        if (typeof elem === "string") {
          return indexOf.call(jQuery(elem), this[0]);
        }
        return indexOf.call(
          this,
          // If it receives a jQuery object, the first element is used
          elem.jquery ? elem[0] : elem
        );
      },
      add: function(selector, context) {
        return this.pushStack(
          jQuery.uniqueSort(
            jQuery.merge(this.get(), jQuery(selector, context))
          )
        );
      },
      addBack: function(selector) {
        return this.add(
          selector == null ? this.prevObject : this.prevObject.filter(selector)
        );
      }
    });
    function sibling(cur, dir2) {
      while ((cur = cur[dir2]) && cur.nodeType !== 1) {
      }
      return cur;
    }
    jQuery.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return dir(elem, "parentNode");
      },
      parentsUntil: function(elem, _i, until) {
        return dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return dir(elem, "previousSibling");
      },
      nextUntil: function(elem, _i, until) {
        return dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, _i, until) {
        return dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return siblings(elem.firstChild);
      },
      contents: function(elem) {
        if (elem.contentDocument != null && // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        getProto(elem.contentDocument)) {
          return elem.contentDocument;
        }
        if (nodeName(elem, "template")) {
          elem = elem.content || elem;
        }
        return jQuery.merge([], elem.childNodes);
      }
    }, function(name, fn) {
      jQuery.fn[name] = function(until, selector) {
        var matched = jQuery.map(this, fn, until);
        if (name.slice(-5) !== "Until") {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          matched = jQuery.filter(selector, matched);
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name]) {
            jQuery.uniqueSort(matched);
          }
          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }
        return this.pushStack(matched);
      };
    });
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    function createOptions(options) {
      var object = {};
      jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
        object[flag] = true;
      });
      return object;
    }
    jQuery.Callbacks = function(options) {
      options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
      var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
        locked = locked || options.once;
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              firingIndex = list.length;
              memory = false;
            }
          }
        }
        if (!options.memory) {
          memory = false;
        }
        firing = false;
        if (locked) {
          if (memory) {
            list = [];
          } else {
            list = "";
          }
        }
      }, self2 = {
        // Add a callback or a collection of callbacks to the list
        add: function() {
          if (list) {
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery.each(args, function(_, arg) {
                if (isFunction(arg)) {
                  if (!options.unique || !self2.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        // Remove a callback from the list
        remove: function() {
          jQuery.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
        },
        // Remove all callbacks from the list
        empty: function() {
          if (list) {
            list = [];
          }
          return this;
        },
        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function() {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function() {
          return !list;
        },
        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function() {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = "";
          }
          return this;
        },
        locked: function() {
          return !!locked;
        },
        // Call all callbacks with the given context and arguments
        fireWith: function(context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        // Call all the callbacks with the given arguments
        fire: function() {
          self2.fireWith(this, arguments);
          return this;
        },
        // To know if the callbacks have already been called at least once
        fired: function() {
          return !!fired;
        }
      };
      return self2;
    };
    function Identity(v) {
      return v;
    }
    function Thrower(ex) {
      throw ex;
    }
    function adoptValue(value, resolve, reject3, noValue) {
      var method;
      try {
        if (value && isFunction(method = value.promise)) {
          method.call(value).done(resolve).fail(reject3);
        } else if (value && isFunction(method = value.then)) {
          method.call(value, resolve, reject3);
        } else {
          resolve.apply(void 0, [value].slice(noValue));
        }
      } catch (value2) {
        reject3.apply(void 0, [value2]);
      }
    }
    jQuery.extend({
      Deferred: function(func) {
        var tuples = [
          // action, add listener, callbacks,
          // ... .then handlers, argument index, [final state]
          [
            "notify",
            "progress",
            jQuery.Callbacks("memory"),
            jQuery.Callbacks("memory"),
            2
          ],
          [
            "resolve",
            "done",
            jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"),
            0,
            "resolved"
          ],
          [
            "reject",
            "fail",
            jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"),
            1,
            "rejected"
          ]
        ], state = "pending", promise = {
          state: function() {
            return state;
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          "catch": function(fn) {
            return promise.then(null, fn);
          },
          // Keep pipe for back-compat
          pipe: function() {
            var fns = arguments;
            return jQuery.Deferred(function(newDefer) {
              jQuery.each(tuples, function(_i, tuple) {
                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && isFunction(returned.promise)) {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](
                      this,
                      fn ? [returned] : arguments
                    );
                  }
                });
              });
              fns = null;
            }).promise();
          },
          then: function(onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;
            function resolve(depth, deferred2, handler, special) {
              return function() {
                var that = this, args = arguments, mightThrow = function() {
                  var returned, then;
                  if (depth < maxDepth) {
                    return;
                  }
                  returned = handler.apply(that, args);
                  if (returned === deferred2.promise()) {
                    throw new TypeError("Thenable self-resolution");
                  }
                  then = returned && // Support: Promises/A+ section 2.3.4
                  // https://promisesaplus.com/#point-64
                  // Only check objects and functions for thenability
                  (typeof returned === "object" || typeof returned === "function") && returned.then;
                  if (isFunction(then)) {
                    if (special) {
                      then.call(
                        returned,
                        resolve(maxDepth, deferred2, Identity, special),
                        resolve(maxDepth, deferred2, Thrower, special)
                      );
                    } else {
                      maxDepth++;
                      then.call(
                        returned,
                        resolve(maxDepth, deferred2, Identity, special),
                        resolve(maxDepth, deferred2, Thrower, special),
                        resolve(
                          maxDepth,
                          deferred2,
                          Identity,
                          deferred2.notifyWith
                        )
                      );
                    }
                  } else {
                    if (handler !== Identity) {
                      that = void 0;
                      args = [returned];
                    }
                    (special || deferred2.resolveWith)(that, args);
                  }
                }, process = special ? mightThrow : function() {
                  try {
                    mightThrow();
                  } catch (e) {
                    if (jQuery.Deferred.exceptionHook) {
                      jQuery.Deferred.exceptionHook(
                        e,
                        process.error
                      );
                    }
                    if (depth + 1 >= maxDepth) {
                      if (handler !== Thrower) {
                        that = void 0;
                        args = [e];
                      }
                      deferred2.rejectWith(that, args);
                    }
                  }
                };
                if (depth) {
                  process();
                } else {
                  if (jQuery.Deferred.getErrorHook) {
                    process.error = jQuery.Deferred.getErrorHook();
                  } else if (jQuery.Deferred.getStackHook) {
                    process.error = jQuery.Deferred.getStackHook();
                  }
                  window2.setTimeout(process);
                }
              };
            }
            return jQuery.Deferred(function(newDefer) {
              tuples[0][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onProgress) ? onProgress : Identity,
                  newDefer.notifyWith
                )
              );
              tuples[1][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onFulfilled) ? onFulfilled : Identity
                )
              );
              tuples[2][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onRejected) ? onRejected : Thrower
                )
              );
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
        jQuery.each(tuples, function(i, tuple) {
          var list = tuple[2], stateString = tuple[5];
          promise[tuple[1]] = list.add;
          if (stateString) {
            list.add(
              function() {
                state = stateString;
              },
              // rejected_callbacks.disable
              // fulfilled_callbacks.disable
              tuples[3 - i][2].disable,
              // rejected_handlers.disable
              // fulfilled_handlers.disable
              tuples[3 - i][3].disable,
              // progress_callbacks.lock
              tuples[0][2].lock,
              // progress_handlers.lock
              tuples[0][3].lock
            );
          }
          list.add(tuple[3].fire);
          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
            return this;
          };
          deferred[tuple[0] + "With"] = list.fireWith;
        });
        promise.promise(deferred);
        if (func) {
          func.call(deferred, deferred);
        }
        return deferred;
      },
      // Deferred helper
      when: function(singleValue) {
        var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
          return function(value) {
            resolveContexts[i2] = this;
            resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
            if (!--remaining) {
              primary.resolveWith(resolveContexts, resolveValues);
            }
          };
        };
        if (remaining <= 1) {
          adoptValue(
            singleValue,
            primary.done(updateFunc(i)).resolve,
            primary.reject,
            !remaining
          );
          if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
            return primary.then();
          }
        }
        while (i--) {
          adoptValue(resolveValues[i], updateFunc(i), primary.reject);
        }
        return primary.promise();
      }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, asyncError) {
      if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
        window2.console.warn(
          "jQuery.Deferred exception: " + error.message,
          error.stack,
          asyncError
        );
      }
    };
    jQuery.readyException = function(error) {
      window2.setTimeout(function() {
        throw error;
      });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
      readyList.then(fn).catch(function(error) {
        jQuery.readyException(error);
      });
      return this;
    };
    jQuery.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,
      // A counter to track how many items to wait for before
      // the ready event fires. See trac-6781
      readyWait: 1,
      // Handle when the DOM is ready
      ready: function(wait) {
        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
          return;
        }
        jQuery.isReady = true;
        if (wait !== true && --jQuery.readyWait > 0) {
          return;
        }
        readyList.resolveWith(document2, [jQuery]);
      }
    });
    jQuery.ready.then = readyList.then;
    function completed() {
      document2.removeEventListener("DOMContentLoaded", completed);
      window2.removeEventListener("load", completed);
      jQuery.ready();
    }
    if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
      window2.setTimeout(jQuery.ready);
    } else {
      document2.addEventListener("DOMContentLoaded", completed);
      window2.addEventListener("load", completed);
    }
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, len = elems.length, bulk = key == null;
      if (toType(key) === "object") {
        chainable = true;
        for (i in key) {
          access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== void 0) {
        chainable = true;
        if (!isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function(elem, _key, value2) {
              return bulk.call(jQuery(elem), value2);
            };
          }
        }
        if (fn) {
          for (; i < len; i++) {
            fn(
              elems[i],
              key,
              raw ? value : value.call(elems[i], i, fn(elems[i], key))
            );
          }
        }
      }
      if (chainable) {
        return elems;
      }
      if (bulk) {
        return fn.call(elems);
      }
      return len ? fn(elems[0], key) : emptyGet;
    };
    var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
    function fcamelCase(_all, letter) {
      return letter.toUpperCase();
    }
    function camelCase(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    var acceptData = function(owner) {
      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    };
    function Data() {
      this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
      cache: function(owner) {
        var value = owner[this.expando];
        if (!value) {
          value = {};
          if (acceptData(owner)) {
            if (owner.nodeType) {
              owner[this.expando] = value;
            } else {
              Object.defineProperty(owner, this.expando, {
                value,
                configurable: true
              });
            }
          }
        }
        return value;
      },
      set: function(owner, data, value) {
        var prop, cache = this.cache(owner);
        if (typeof data === "string") {
          cache[camelCase(data)] = value;
        } else {
          for (prop in data) {
            cache[camelCase(prop)] = data[prop];
          }
        }
        return cache;
      },
      get: function(owner, key) {
        return key === void 0 ? this.cache(owner) : (
          // Always use camelCase key (gh-2257)
          owner[this.expando] && owner[this.expando][camelCase(key)]
        );
      },
      access: function(owner, key, value) {
        if (key === void 0 || key && typeof key === "string" && value === void 0) {
          return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== void 0 ? value : key;
      },
      remove: function(owner, key) {
        var i, cache = owner[this.expando];
        if (cache === void 0) {
          return;
        }
        if (key !== void 0) {
          if (Array.isArray(key)) {
            key = key.map(camelCase);
          } else {
            key = camelCase(key);
            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
          }
          i = key.length;
          while (i--) {
            delete cache[key[i]];
          }
        }
        if (key === void 0 || jQuery.isEmptyObject(cache)) {
          if (owner.nodeType) {
            owner[this.expando] = void 0;
          } else {
            delete owner[this.expando];
          }
        }
      },
      hasData: function(owner) {
        var cache = owner[this.expando];
        return cache !== void 0 && !jQuery.isEmptyObject(cache);
      }
    };
    var dataPriv = new Data();
    var dataUser = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    function getData(data) {
      if (data === "true") {
        return true;
      }
      if (data === "false") {
        return false;
      }
      if (data === "null") {
        return null;
      }
      if (data === +data + "") {
        return +data;
      }
      if (rbrace.test(data)) {
        return JSON.parse(data);
      }
      return data;
    }
    function dataAttr(elem, key, data) {
      var name;
      if (data === void 0 && elem.nodeType === 1) {
        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
        data = elem.getAttribute(name);
        if (typeof data === "string") {
          try {
            data = getData(data);
          } catch (e) {
          }
          dataUser.set(elem, key, data);
        } else {
          data = void 0;
        }
      }
      return data;
    }
    jQuery.extend({
      hasData: function(elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
      },
      data: function(elem, name, data) {
        return dataUser.access(elem, name, data);
      },
      removeData: function(elem, name) {
        dataUser.remove(elem, name);
      },
      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to dataPriv methods, these can be deprecated.
      _data: function(elem, name, data) {
        return dataPriv.access(elem, name, data);
      },
      _removeData: function(elem, name) {
        dataPriv.remove(elem, name);
      }
    });
    jQuery.fn.extend({
      data: function(key, value) {
        var i, name, data, elem = this[0], attrs = elem && elem.attributes;
        if (key === void 0) {
          if (this.length) {
            data = dataUser.get(elem);
            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
              i = attrs.length;
              while (i--) {
                if (attrs[i]) {
                  name = attrs[i].name;
                  if (name.indexOf("data-") === 0) {
                    name = camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              dataPriv.set(elem, "hasDataAttrs", true);
            }
          }
          return data;
        }
        if (typeof key === "object") {
          return this.each(function() {
            dataUser.set(this, key);
          });
        }
        return access(this, function(value2) {
          var data2;
          if (elem && value2 === void 0) {
            data2 = dataUser.get(elem, key);
            if (data2 !== void 0) {
              return data2;
            }
            data2 = dataAttr(elem, key);
            if (data2 !== void 0) {
              return data2;
            }
            return;
          }
          this.each(function() {
            dataUser.set(this, key, value2);
          });
        }, null, value, arguments.length > 1, null, true);
      },
      removeData: function(key) {
        return this.each(function() {
          dataUser.remove(this, key);
        });
      }
    });
    jQuery.extend({
      queue: function(elem, type3, data) {
        var queue;
        if (elem) {
          type3 = (type3 || "fx") + "queue";
          queue = dataPriv.get(elem, type3);
          if (data) {
            if (!queue || Array.isArray(data)) {
              queue = dataPriv.access(elem, type3, jQuery.makeArray(data));
            } else {
              queue.push(data);
            }
          }
          return queue || [];
        }
      },
      dequeue: function(elem, type3) {
        type3 = type3 || "fx";
        var queue = jQuery.queue(elem, type3), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type3), next = function() {
          jQuery.dequeue(elem, type3);
        };
        if (fn === "inprogress") {
          fn = queue.shift();
          startLength--;
        }
        if (fn) {
          if (type3 === "fx") {
            queue.unshift("inprogress");
          }
          delete hooks.stop;
          fn.call(elem, next, hooks);
        }
        if (!startLength && hooks) {
          hooks.empty.fire();
        }
      },
      // Not public - generate a queueHooks object, or return the current one
      _queueHooks: function(elem, type3) {
        var key = type3 + "queueHooks";
        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function() {
            dataPriv.remove(elem, [type3 + "queue", key]);
          })
        });
      }
    });
    jQuery.fn.extend({
      queue: function(type3, data) {
        var setter = 2;
        if (typeof type3 !== "string") {
          data = type3;
          type3 = "fx";
          setter--;
        }
        if (arguments.length < setter) {
          return jQuery.queue(this[0], type3);
        }
        return data === void 0 ? this : this.each(function() {
          var queue = jQuery.queue(this, type3, data);
          jQuery._queueHooks(this, type3);
          if (type3 === "fx" && queue[0] !== "inprogress") {
            jQuery.dequeue(this, type3);
          }
        });
      },
      dequeue: function(type3) {
        return this.each(function() {
          jQuery.dequeue(this, type3);
        });
      },
      clearQueue: function(type3) {
        return this.queue(type3 || "fx", []);
      },
      // Get a promise resolved when queues of a certain type
      // are emptied (fx is the type by default)
      promise: function(type3, obj) {
        var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
        if (typeof type3 !== "string") {
          obj = type3;
          type3 = void 0;
        }
        type3 = type3 || "fx";
        while (i--) {
          tmp = dataPriv.get(elements[i], type3 + "queueHooks");
          if (tmp && tmp.empty) {
            count++;
            tmp.empty.add(resolve);
          }
        }
        resolve();
        return defer.promise(obj);
      }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var documentElement = document2.documentElement;
    var isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem);
    }, composed = { composed: true };
    if (documentElement.getRootNode) {
      isAttached = function(elem) {
        return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
      };
    }
    var isHiddenWithinTree = function(elem, el) {
      elem = el || elem;
      return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      isAttached(elem) && jQuery.css(elem, "display") === "none";
    };
    function adjustCSS(elem, prop, valueParts, tween) {
      var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
        return tween.cur();
      } : function() {
        return jQuery.css(elem, prop, "");
      }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
      if (initialInUnit && initialInUnit[3] !== unit) {
        initial = initial / 2;
        unit = unit || initialInUnit[3];
        initialInUnit = +initial || 1;
        while (maxIterations--) {
          jQuery.style(elem, prop, initialInUnit + unit);
          if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
            maxIterations = 0;
          }
          initialInUnit = initialInUnit / scale;
        }
        initialInUnit = initialInUnit * 2;
        jQuery.style(elem, prop, initialInUnit + unit);
        valueParts = valueParts || [];
      }
      if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;
        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
        if (tween) {
          tween.unit = unit;
          tween.start = initialInUnit;
          tween.end = adjusted;
        }
      }
      return adjusted;
    }
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
      var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
      if (display) {
        return display;
      }
      temp = doc.body.appendChild(doc.createElement(nodeName2));
      display = jQuery.css(temp, "display");
      temp.parentNode.removeChild(temp);
      if (display === "none") {
        display = "block";
      }
      defaultDisplayMap[nodeName2] = display;
      return display;
    }
    function showHide(elements, show) {
      var display, elem, values = [], index = 0, length = elements.length;
      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        display = elem.style.display;
        if (show) {
          if (display === "none") {
            values[index] = dataPriv.get(elem, "display") || null;
            if (!values[index]) {
              elem.style.display = "";
            }
          }
          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
            values[index] = getDefaultDisplay(elem);
          }
        } else {
          if (display !== "none") {
            values[index] = "none";
            dataPriv.set(elem, "display", display);
          }
        }
      }
      for (index = 0; index < length; index++) {
        if (values[index] != null) {
          elements[index].style.display = values[index];
        }
      }
      return elements;
    }
    jQuery.fn.extend({
      show: function() {
        return showHide(this, true);
      },
      hide: function() {
        return showHide(this);
      },
      toggle: function(state) {
        if (typeof state === "boolean") {
          return state ? this.show() : this.hide();
        }
        return this.each(function() {
          if (isHiddenWithinTree(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });
    var rcheckableType = /^(?:checkbox|radio)$/i;
    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
    (function() {
      var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("checked", "checked");
      input.setAttribute("name", "t");
      div.appendChild(input);
      support2.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
      div.innerHTML = "<textarea>x</textarea>";
      support2.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
      div.innerHTML = "<option></option>";
      support2.option = !!div.lastChild;
    })();
    var wrapMap = {
      // XHTML parsers do not magically insert elements in the
      // same way that tag soup parsers do. So we cannot shorten
      // this by omitting <tbody> or other required elements.
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!support2.option) {
      wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
    }
    function getAll(context, tag) {
      var ret;
      if (typeof context.getElementsByTagName !== "undefined") {
        ret = context.getElementsByTagName(tag || "*");
      } else if (typeof context.querySelectorAll !== "undefined") {
        ret = context.querySelectorAll(tag || "*");
      } else {
        ret = [];
      }
      if (tag === void 0 || tag && nodeName(context, tag)) {
        return jQuery.merge([context], ret);
      }
      return ret;
    }
    function setGlobalEval(elems, refElements) {
      var i = 0, l = elems.length;
      for (; i < l; i++) {
        dataPriv.set(
          elems[i],
          "globalEval",
          !refElements || dataPriv.get(refElements[i], "globalEval")
        );
      }
    }
    var rhtml = /<|&#?\w+;/;
    function buildFragment(elems, context, scripts, selection, ignored) {
      var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (toType(elem) === "object") {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
          }
        }
      }
      fragment.textContent = "";
      i = 0;
      while (elem = nodes[i++]) {
        if (selection && jQuery.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }
        attached = isAttached(elem);
        tmp = getAll(fragment.appendChild(elem), "script");
        if (attached) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    }
    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
      return true;
    }
    function returnFalse() {
      return false;
    }
    function on(elem, types, selector, data, fn, one) {
      var origFn, type3;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data = data || selector;
          selector = void 0;
        }
        for (type3 in types) {
          on(elem, type3, selector, data, types[type3], one);
        }
        return elem;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = void 0;
      } else if (fn == null) {
        if (typeof selector === "string") {
          fn = data;
          data = void 0;
        } else {
          fn = data;
          data = selector;
          selector = void 0;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return elem;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event2) {
          jQuery().off(event2);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return elem.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
      });
    }
    jQuery.event = {
      global: {},
      add: function(elem, types, handler, data, selector) {
        var handleObjIn, eventHandle, tmp, events2, t, handleObj, special, handlers, type3, namespaces, origType, elemData = dataPriv.get(elem);
        if (!acceptData(elem)) {
          return;
        }
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (selector) {
          jQuery.find.matchesSelector(documentElement, selector);
        }
        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }
        if (!(events2 = elemData.events)) {
          events2 = elemData.events = /* @__PURE__ */ Object.create(null);
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function(e) {
            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
          };
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type3 = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type3) {
            continue;
          }
          special = jQuery.event.special[type3] || {};
          type3 = (selector ? special.delegateType : special.bindType) || type3;
          special = jQuery.event.special[type3] || {};
          handleObj = jQuery.extend({
            type: type3,
            origType,
            data,
            handler,
            guid: handler.guid,
            selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);
          if (!(handlers = events2[type3])) {
            handlers = events2[type3] = [];
            handlers.delegateCount = 0;
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type3, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          jQuery.event.global[type3] = true;
        }
      },
      // Detach an event or set of events from an element
      remove: function(elem, types, handler, selector, mappedTypes) {
        var j, origCount, tmp, events2, t, handleObj, special, handlers, type3, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
        if (!elemData || !(events2 = elemData.events)) {
          return;
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type3 = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type3) {
            for (type3 in events2) {
              jQuery.event.remove(elem, type3 + types[t], handler, selector, true);
            }
            continue;
          }
          special = jQuery.event.special[type3] || {};
          type3 = (selector ? special.delegateType : special.bindType) || type3;
          handlers = events2[type3] || [];
          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
              handlers.splice(j, 1);
              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              jQuery.removeEvent(elem, type3, elemData.handle);
            }
            delete events2[type3];
          }
        }
        if (jQuery.isEmptyObject(events2)) {
          dataPriv.remove(elem, "handle events");
        }
      },
      dispatch: function(nativeEvent) {
        var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event2 = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event2.type] || [], special = jQuery.event.special[event2.type] || {};
        args[0] = event2;
        for (i = 1; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        event2.delegateTarget = this;
        if (special.preDispatch && special.preDispatch.call(this, event2) === false) {
          return;
        }
        handlerQueue = jQuery.event.handlers.call(this, event2, handlers);
        i = 0;
        while ((matched = handlerQueue[i++]) && !event2.isPropagationStopped()) {
          event2.currentTarget = matched.elem;
          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event2.isImmediatePropagationStopped()) {
            if (!event2.rnamespace || handleObj.namespace === false || event2.rnamespace.test(handleObj.namespace)) {
              event2.handleObj = handleObj;
              event2.data = handleObj.data;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== void 0) {
                if ((event2.result = ret) === false) {
                  event2.preventDefault();
                  event2.stopPropagation();
                }
              }
            }
          }
        }
        if (special.postDispatch) {
          special.postDispatch.call(this, event2);
        }
        return event2.result;
      },
      handlers: function(event2, handlers) {
        var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event2.target;
        if (delegateCount && // Support: IE <=9
        // Black-hole SVG <use> instance trees (trac-13180)
        cur.nodeType && // Support: Firefox <=42
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11 only
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        !(event2.type === "click" && event2.button >= 1)) {
          for (; cur !== this; cur = cur.parentNode || this) {
            if (cur.nodeType === 1 && !(event2.type === "click" && cur.disabled === true)) {
              matchedHandlers = [];
              matchedSelectors = {};
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];
                sel = handleObj.selector + " ";
                if (matchedSelectors[sel] === void 0) {
                  matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                }
                if (matchedSelectors[sel]) {
                  matchedHandlers.push(handleObj);
                }
              }
              if (matchedHandlers.length) {
                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
              }
            }
          }
        }
        cur = this;
        if (delegateCount < handlers.length) {
          handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
        }
        return handlerQueue;
      },
      addProp: function(name, hook) {
        Object.defineProperty(jQuery.Event.prototype, name, {
          enumerable: true,
          configurable: true,
          get: isFunction(hook) ? function() {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function() {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },
          set: function(value) {
            Object.defineProperty(this, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value
            });
          }
        });
      },
      fix: function(originalEvent) {
        return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
      },
      special: {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: true
        },
        click: {
          // Utilize native event to ensure correct state for checkable inputs
          setup: function(data) {
            var el = this || data;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click", true);
            }
            return false;
          },
          trigger: function(data) {
            var el = this || data;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click");
            }
            return true;
          },
          // For cross-browser consistency, suppress native .click() on links
          // Also prevent it if we're currently inside a leveraged native-event stack
          _default: function(event2) {
            var target = event2.target;
            return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
          }
        },
        beforeunload: {
          postDispatch: function(event2) {
            if (event2.result !== void 0 && event2.originalEvent) {
              event2.originalEvent.returnValue = event2.result;
            }
          }
        }
      }
    };
    function leverageNative(el, type3, isSetup) {
      if (!isSetup) {
        if (dataPriv.get(el, type3) === void 0) {
          jQuery.event.add(el, type3, returnTrue);
        }
        return;
      }
      dataPriv.set(el, type3, false);
      jQuery.event.add(el, type3, {
        namespace: false,
        handler: function(event2) {
          var result, saved = dataPriv.get(this, type3);
          if (event2.isTrigger & 1 && this[type3]) {
            if (!saved) {
              saved = slice.call(arguments);
              dataPriv.set(this, type3, saved);
              this[type3]();
              result = dataPriv.get(this, type3);
              dataPriv.set(this, type3, false);
              if (saved !== result) {
                event2.stopImmediatePropagation();
                event2.preventDefault();
                return result;
              }
            } else if ((jQuery.event.special[type3] || {}).delegateType) {
              event2.stopPropagation();
            }
          } else if (saved) {
            dataPriv.set(this, type3, jQuery.event.trigger(
              saved[0],
              saved.slice(1),
              this
            ));
            event2.stopPropagation();
            event2.isImmediatePropagationStopped = returnTrue;
          }
        }
      });
    }
    jQuery.removeEvent = function(elem, type3, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type3, handle);
      }
    };
    jQuery.Event = function(src, props) {
      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
        src.returnValue === false ? returnTrue : returnFalse;
        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;
      } else {
        this.type = src;
      }
      if (props) {
        jQuery.extend(this, props);
      }
      this.timeStamp = src && src.timeStamp || Date.now();
      this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
      constructor: jQuery.Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      isSimulated: false,
      preventDefault: function() {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    jQuery.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      "char": true,
      code: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: true
    }, jQuery.event.addProp);
    jQuery.each({ focus: "focusin", blur: "focusout" }, function(type3, delegateType) {
      function focusMappedHandler(nativeEvent) {
        if (document2.documentMode) {
          var handle = dataPriv.get(this, "handle"), event2 = jQuery.event.fix(nativeEvent);
          event2.type = nativeEvent.type === "focusin" ? "focus" : "blur";
          event2.isSimulated = true;
          handle(nativeEvent);
          if (event2.target === event2.currentTarget) {
            handle(event2);
          }
        } else {
          jQuery.event.simulate(
            delegateType,
            nativeEvent.target,
            jQuery.event.fix(nativeEvent)
          );
        }
      }
      jQuery.event.special[type3] = {
        // Utilize native event if possible so blur/focus sequence is correct
        setup: function() {
          var attaches;
          leverageNative(this, type3, true);
          if (document2.documentMode) {
            attaches = dataPriv.get(this, delegateType);
            if (!attaches) {
              this.addEventListener(delegateType, focusMappedHandler);
            }
            dataPriv.set(this, delegateType, (attaches || 0) + 1);
          } else {
            return false;
          }
        },
        trigger: function() {
          leverageNative(this, type3);
          return true;
        },
        teardown: function() {
          var attaches;
          if (document2.documentMode) {
            attaches = dataPriv.get(this, delegateType) - 1;
            if (!attaches) {
              this.removeEventListener(delegateType, focusMappedHandler);
              dataPriv.remove(this, delegateType);
            } else {
              dataPriv.set(this, delegateType, attaches);
            }
          } else {
            return false;
          }
        },
        // Suppress native focus or blur if we're currently inside
        // a leveraged native-event stack
        _default: function(event2) {
          return dataPriv.get(event2.target, type3);
        },
        delegateType
      };
      jQuery.event.special[delegateType] = {
        setup: function() {
          var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
          if (!attaches) {
            if (document2.documentMode) {
              this.addEventListener(delegateType, focusMappedHandler);
            } else {
              doc.addEventListener(type3, focusMappedHandler, true);
            }
          }
          dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
          if (!attaches) {
            if (document2.documentMode) {
              this.removeEventListener(delegateType, focusMappedHandler);
            } else {
              doc.removeEventListener(type3, focusMappedHandler, true);
            }
            dataPriv.remove(dataHolder, delegateType);
          } else {
            dataPriv.set(dataHolder, delegateType, attaches);
          }
        }
      };
    });
    jQuery.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function(event2) {
          var ret, target = this, related = event2.relatedTarget, handleObj = event2.handleObj;
          if (!related || related !== target && !jQuery.contains(target, related)) {
            event2.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event2.type = fix;
          }
          return ret;
        }
      };
    });
    jQuery.fn.extend({
      on: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn);
      },
      one: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn, 1);
      },
      off: function(types, selector, fn) {
        var handleObj, type3;
        if (types && types.preventDefault && types.handleObj) {
          handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(
            handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
            handleObj.selector,
            handleObj.handler
          );
          return this;
        }
        if (typeof types === "object") {
          for (type3 in types) {
            this.off(type3, selector, types[type3]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {
          fn = selector;
          selector = void 0;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery.event.remove(this, types, fn, selector);
        });
      }
    });
    var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function manipulationTarget(elem, content) {
      if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
        return jQuery(elem).children("tbody")[0] || elem;
      }
      return elem;
    }
    function disableScript(elem) {
      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
      return elem;
    }
    function restoreScript(elem) {
      if ((elem.type || "").slice(0, 5) === "true/") {
        elem.type = elem.type.slice(5);
      } else {
        elem.removeAttribute("type");
      }
      return elem;
    }
    function cloneCopyEvent(src, dest) {
      var i, l, type3, pdataOld, udataOld, udataCur, events2;
      if (dest.nodeType !== 1) {
        return;
      }
      if (dataPriv.hasData(src)) {
        pdataOld = dataPriv.get(src);
        events2 = pdataOld.events;
        if (events2) {
          dataPriv.remove(dest, "handle events");
          for (type3 in events2) {
            for (i = 0, l = events2[type3].length; i < l; i++) {
              jQuery.event.add(dest, type3, events2[type3][i]);
            }
          }
        }
      }
      if (dataUser.hasData(src)) {
        udataOld = dataUser.access(src);
        udataCur = jQuery.extend({}, udataOld);
        dataUser.set(dest, udataCur);
      }
    }
    function fixInput(src, dest) {
      var nodeName2 = dest.nodeName.toLowerCase();
      if (nodeName2 === "input" && rcheckableType.test(src.type)) {
        dest.checked = src.checked;
      } else if (nodeName2 === "input" || nodeName2 === "textarea") {
        dest.defaultValue = src.defaultValue;
      }
    }
    function domManip(collection, args, callback, ignored) {
      args = flat(args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
      if (valueIsFunction || l > 1 && typeof value === "string" && !support2.checkClone && rchecked.test(value)) {
        return collection.each(function(index) {
          var self2 = collection.eq(index);
          if (valueIsFunction) {
            args[0] = value.call(this, index, self2.html());
          }
          domManip(self2, args, callback, ignored);
        });
      }
      if (l) {
        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first || ignored) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, "script"));
              }
            }
            callback.call(collection[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                if (node.src && (node.type || "").toLowerCase() !== "module") {
                  if (jQuery._evalUrl && !node.noModule) {
                    jQuery._evalUrl(node.src, {
                      nonce: node.nonce || node.getAttribute("nonce")
                    }, doc);
                  }
                } else {
                  DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                }
              }
            }
          }
        }
      }
      return collection;
    }
    function remove(elem, selector, keepData) {
      var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
      for (; (node = nodes[i]) != null; i++) {
        if (!keepData && node.nodeType === 1) {
          jQuery.cleanData(getAll(node));
        }
        if (node.parentNode) {
          if (keepData && isAttached(node)) {
            setGlobalEval(getAll(node, "script"));
          }
          node.parentNode.removeChild(node);
        }
      }
      return elem;
    }
    jQuery.extend({
      htmlPrefilter: function(html) {
        return html;
      },
      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
        if (!support2.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
          destElements = getAll(clone);
          srcElements = getAll(elem);
          for (i = 0, l = srcElements.length; i < l; i++) {
            fixInput(srcElements[i], destElements[i]);
          }
        }
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);
            for (i = 0, l = srcElements.length; i < l; i++) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }
        destElements = getAll(clone, "script");
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
        }
        return clone;
      },
      cleanData: function(elems) {
        var data, elem, type3, special = jQuery.event.special, i = 0;
        for (; (elem = elems[i]) !== void 0; i++) {
          if (acceptData(elem)) {
            if (data = elem[dataPriv.expando]) {
              if (data.events) {
                for (type3 in data.events) {
                  if (special[type3]) {
                    jQuery.event.remove(elem, type3);
                  } else {
                    jQuery.removeEvent(elem, type3, data.handle);
                  }
                }
              }
              elem[dataPriv.expando] = void 0;
            }
            if (elem[dataUser.expando]) {
              elem[dataUser.expando] = void 0;
            }
          }
        }
      }
    });
    jQuery.fn.extend({
      detach: function(selector) {
        return remove(this, selector, true);
      },
      remove: function(selector) {
        return remove(this, selector);
      },
      text: function(value) {
        return access(this, function(value2) {
          return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value2;
            }
          });
        }, null, value, arguments.length);
      },
      append: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },
      prepend: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },
      before: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },
      after: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },
      empty: function() {
        var elem, i = 0;
        for (; (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {
            jQuery.cleanData(getAll(elem, false));
            elem.textContent = "";
          }
        }
        return this;
      },
      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function() {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function(value) {
        return access(this, function(value2) {
          var elem = this[0] || {}, i = 0, l = this.length;
          if (value2 === void 0 && elem.nodeType === 1) {
            return elem.innerHTML;
          }
          if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
            value2 = jQuery.htmlPrefilter(value2);
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value2;
                }
              }
              elem = 0;
            } catch (e) {
            }
          }
          if (elem) {
            this.empty().append(value2);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function() {
        var ignored = [];
        return domManip(this, arguments, function(elem) {
          var parent = this.parentNode;
          if (jQuery.inArray(this, ignored) < 0) {
            jQuery.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }
        }, ignored);
      }
    });
    jQuery.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name, original) {
      jQuery.fn[name] = function(selector) {
        var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var rcustomProp = /^--/;
    var getStyles = function(elem) {
      var view = elem.ownerDocument.defaultView;
      if (!view || !view.opener) {
        view = window2;
      }
      return view.getComputedStyle(elem);
    };
    var swap = function(elem, options, callback) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.call(elem);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    };
    var rboxStyle = new RegExp(cssExpand.join("|"), "i");
    (function() {
      function computeStyleTests() {
        if (!div) {
          return;
        }
        container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
        documentElement.appendChild(container).appendChild(div);
        var divStyle = window2.getComputedStyle(div);
        pixelPositionVal = divStyle.top !== "1%";
        reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
        div.style.right = "60%";
        pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
        boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
        div.style.position = "absolute";
        scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
        documentElement.removeChild(container);
        div = null;
      }
      function roundPixelMeasures(measure) {
        return Math.round(parseFloat(measure));
      }
      var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
      if (!div.style) {
        return;
      }
      div.style.backgroundClip = "content-box";
      div.cloneNode(true).style.backgroundClip = "";
      support2.clearCloneStyle = div.style.backgroundClip === "content-box";
      jQuery.extend(support2, {
        boxSizingReliable: function() {
          computeStyleTests();
          return boxSizingReliableVal;
        },
        pixelBoxStyles: function() {
          computeStyleTests();
          return pixelBoxStylesVal;
        },
        pixelPosition: function() {
          computeStyleTests();
          return pixelPositionVal;
        },
        reliableMarginLeft: function() {
          computeStyleTests();
          return reliableMarginLeftVal;
        },
        scrollboxSize: function() {
          computeStyleTests();
          return scrollboxSizeVal;
        },
        // Support: IE 9 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Behavior in IE 9 is more subtle than in newer versions & it passes
        // some versions of this test; make sure not to make it pass there!
        //
        // Support: Firefox 70+
        // Only Firefox includes border widths
        // in computed dimensions. (gh-4529)
        reliableTrDimensions: function() {
          var table, tr, trChild, trStyle;
          if (reliableTrDimensionsVal == null) {
            table = document2.createElement("table");
            tr = document2.createElement("tr");
            trChild = document2.createElement("div");
            table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
            tr.style.cssText = "box-sizing:content-box;border:1px solid";
            tr.style.height = "1px";
            trChild.style.height = "9px";
            trChild.style.display = "block";
            documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
            trStyle = window2.getComputedStyle(tr);
            reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
            documentElement.removeChild(table);
          }
          return reliableTrDimensionsVal;
        }
      });
    })();
    function curCSS(elem, name, computed) {
      var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
      computed = computed || getStyles(elem);
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
        if (isCustomProp && ret) {
          ret = ret.replace(rtrimCSS, "$1") || void 0;
        }
        if (ret === "" && !isAttached(elem)) {
          ret = jQuery.style(elem, name);
        }
        if (!support2.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      return ret !== void 0 ? (
        // Support: IE <=9 - 11 only
        // IE returns zIndex value as an integer.
        ret + ""
      ) : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
      return {
        get: function() {
          if (conditionFn()) {
            delete this.get;
            return;
          }
          return (this.get = hookFn).apply(this, arguments);
        }
      };
    }
    var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
    function vendorPropName(name) {
      var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
      while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    }
    function finalPropName(name) {
      var final = jQuery.cssProps[name] || vendorProps[name];
      if (final) {
        return final;
      }
      if (name in emptyStyle) {
        return name;
      }
      return vendorProps[name] = vendorPropName(name) || name;
    }
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };
    function setPositiveNumber(_elem, value, subtract) {
      var matches = rcssNum.exec(value);
      return matches ? (
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
      ) : value;
    }
    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
      var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
      if (box === (isBorderBox ? "border" : "content")) {
        return 0;
      }
      for (; i < 4; i += 2) {
        if (box === "margin") {
          marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
        }
        if (!isBorderBox) {
          delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          if (box !== "padding") {
            delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          } else {
            extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        } else {
          if (box === "content") {
            delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          }
          if (box !== "margin") {
            delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        }
      }
      if (!isBorderBox && computedVal >= 0) {
        delta += Math.max(0, Math.ceil(
          elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
          // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
          // Use an explicit zero to avoid NaN (gh-3964)
        )) || 0;
      }
      return delta + marginDelta;
    }
    function getWidthOrHeight(elem, dimension, extra) {
      var styles = getStyles(elem), boxSizingNeeded = !support2.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
      if (rnumnonpx.test(val)) {
        if (!extra) {
          return val;
        }
        val = "auto";
      }
      if ((!support2.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Interestingly, in some cases IE 9 doesn't suffer from this issue.
      !support2.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
      // This happens for inline elements with no explicit setting (gh-3571)
      val === "auto" || // Support: Android <=4.1 - 4.3 only
      // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
      !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
      elem.getClientRects().length) {
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        valueIsBorderBox = offsetProp in elem;
        if (valueIsBorderBox) {
          val = elem[offsetProp];
        }
      }
      val = parseFloat(val) || 0;
      return val + boxModelAdjustment(
        elem,
        dimension,
        extra || (isBorderBox ? "border" : "content"),
        valueIsBorderBox,
        styles,
        // Provide the current computed size to request scroll gutter calculation (gh-3589)
        val
      ) + "px";
    }
    jQuery.extend({
      // Add in style property hooks for overriding the default
      // behavior of getting and setting a style property
      cssHooks: {
        opacity: {
          get: function(elem, computed) {
            if (computed) {
              var ret = curCSS(elem, "opacity");
              return ret === "" ? "1" : ret;
            }
          }
        }
      },
      // Don't automatically add "px" to these possibly-unitless properties
      cssNumber: {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageSlice: true,
        columnCount: true,
        flexGrow: true,
        flexShrink: true,
        fontWeight: true,
        gridArea: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnStart: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowStart: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        scale: true,
        widows: true,
        zIndex: true,
        zoom: true,
        // SVG-related
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeMiterlimit: true,
        strokeOpacity: true
      },
      // Add in properties whose names you wish to fix before
      // setting or getting the value
      cssProps: {},
      // Get and set the style property on a DOM Node
      style: function(elem, name, value, extra) {
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        var ret, type3, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
        if (value !== void 0) {
          type3 = typeof value;
          if (type3 === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name, ret);
            type3 = "number";
          }
          if (value == null || value !== value) {
            return;
          }
          if (type3 === "number" && !isCustomProp) {
            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
          }
          if (!support2.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
            style[name] = "inherit";
          }
          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
            if (isCustomProp) {
              style.setProperty(name, value);
            } else {
              style[name] = value;
            }
          }
        } else {
          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
            return ret;
          }
          return style[name];
        }
      },
      css: function(elem, name, extra, styles) {
        var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
        if (hooks && "get" in hooks) {
          val = hooks.get(elem, true, extra);
        }
        if (val === void 0) {
          val = curCSS(elem, name, styles);
        }
        if (val === "normal" && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }
        if (extra === "" || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }
        return val;
      }
    });
    jQuery.each(["height", "width"], function(_i, dimension) {
      jQuery.cssHooks[dimension] = {
        get: function(elem, computed, extra) {
          if (computed) {
            return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
            // Table columns in Safari have non-zero offsetWidth & zero
            // getBoundingClientRect().width unless display is changed.
            // Support: IE <=11 only
            // Running getBoundingClientRect on a disconnected node
            // in IE throws an error.
            (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
              return getWidthOrHeight(elem, dimension, extra);
            }) : getWidthOrHeight(elem, dimension, extra);
          }
        },
        set: function(elem, value, extra) {
          var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support2.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles
          ) : 0;
          if (isBorderBox && scrollboxSizeBuggy) {
            subtract -= Math.ceil(
              elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
            );
          }
          if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
            elem.style[dimension] = value;
            value = jQuery.css(elem, dimension);
          }
          return setPositiveNumber(elem, value, subtract);
        }
      };
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(
      support2.reliableMarginLeft,
      function(elem, computed) {
        if (computed) {
          return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
            return elem.getBoundingClientRect().left;
          })) + "px";
        }
      }
    );
    jQuery.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function(value) {
          var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
          }
          return expanded;
        }
      };
      if (prefix !== "margin") {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });
    jQuery.fn.extend({
      css: function(name, value) {
        return access(this, function(elem, name2, value2) {
          var styles, len, map = {}, i = 0;
          if (Array.isArray(name2)) {
            styles = getStyles(elem);
            len = name2.length;
            for (; i < len; i++) {
              map[name2[i]] = jQuery.css(elem, name2[i], false, styles);
            }
            return map;
          }
          return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
        }, name, value, arguments.length > 1);
      }
    });
    function Tween(elem, options, prop, end, easing) {
      return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
      constructor: Tween,
      init: function(elem, options, prop, end, easing, unit) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || jQuery.easing._default;
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
      },
      cur: function() {
        var hooks = Tween.propHooks[this.prop];
        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
      },
      run: function(percent) {
        var eased, hooks = Tween.propHooks[this.prop];
        if (this.options.duration) {
          this.pos = eased = jQuery.easing[this.easing](
            percent,
            this.options.duration * percent,
            0,
            1,
            this.options.duration
          );
        } else {
          this.pos = eased = percent;
        }
        this.now = (this.end - this.start) * eased + this.start;
        if (this.options.step) {
          this.options.step.call(this.elem, this.now, this);
        }
        if (hooks && hooks.set) {
          hooks.set(this);
        } else {
          Tween.propHooks._default.set(this);
        }
        return this;
      }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
      _default: {
        get: function(tween) {
          var result;
          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
            return tween.elem[tween.prop];
          }
          result = jQuery.css(tween.elem, tween.prop, "");
          return !result || result === "auto" ? 0 : result;
        },
        set: function(tween) {
          if (jQuery.fx.step[tween.prop]) {
            jQuery.fx.step[tween.prop](tween);
          } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
      set: function(tween) {
        if (tween.elem.nodeType && tween.elem.parentNode) {
          tween.elem[tween.prop] = tween.now;
        }
      }
    };
    jQuery.easing = {
      linear: function(p) {
        return p;
      },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },
      _default: "swing"
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function schedule() {
      if (inProgress) {
        if (document2.hidden === false && window2.requestAnimationFrame) {
          window2.requestAnimationFrame(schedule);
        } else {
          window2.setTimeout(schedule, jQuery.fx.interval);
        }
        jQuery.fx.tick();
      }
    }
    function createFxNow() {
      window2.setTimeout(function() {
        fxNow = void 0;
      });
      return fxNow = Date.now();
    }
    function genFx(type3, includeWidth) {
      var which, i = 0, attrs = { height: type3 };
      includeWidth = includeWidth ? 1 : 0;
      for (; i < 4; i += 2 - includeWidth) {
        which = cssExpand[i];
        attrs["margin" + which] = attrs["padding" + which] = type3;
      }
      if (includeWidth) {
        attrs.opacity = attrs.width = type3;
      }
      return attrs;
    }
    function createTween(value, prop, animation) {
      var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
      for (; index < length; index++) {
        if (tween = collection[index].call(animation, prop, value)) {
          return tween;
        }
      }
    }
    function defaultPrefilter(elem, props, opts) {
      var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
      if (!opts.queue) {
        hooks = jQuery._queueHooks(elem, "fx");
        if (hooks.unqueued == null) {
          hooks.unqueued = 0;
          oldfire = hooks.empty.fire;
          hooks.empty.fire = function() {
            if (!hooks.unqueued) {
              oldfire();
            }
          };
        }
        hooks.unqueued++;
        anim.always(function() {
          anim.always(function() {
            hooks.unqueued--;
            if (!jQuery.queue(elem, "fx").length) {
              hooks.empty.fire();
            }
          });
        });
      }
      for (prop in props) {
        value = props[prop];
        if (rfxtypes.test(value)) {
          delete props[prop];
          toggle = toggle || value === "toggle";
          if (value === (hidden ? "hide" : "show")) {
            if (value === "show" && dataShow && dataShow[prop] !== void 0) {
              hidden = true;
            } else {
              continue;
            }
          }
          orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
      }
      propTween = !jQuery.isEmptyObject(props);
      if (!propTween && jQuery.isEmptyObject(orig)) {
        return;
      }
      if (isBox && elem.nodeType === 1) {
        opts.overflow = [style.overflow, style.overflowX, style.overflowY];
        restoreDisplay = dataShow && dataShow.display;
        if (restoreDisplay == null) {
          restoreDisplay = dataPriv.get(elem, "display");
        }
        display = jQuery.css(elem, "display");
        if (display === "none") {
          if (restoreDisplay) {
            display = restoreDisplay;
          } else {
            showHide([elem], true);
            restoreDisplay = elem.style.display || restoreDisplay;
            display = jQuery.css(elem, "display");
            showHide([elem]);
          }
        }
        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
          if (jQuery.css(elem, "float") === "none") {
            if (!propTween) {
              anim.done(function() {
                style.display = restoreDisplay;
              });
              if (restoreDisplay == null) {
                display = style.display;
                restoreDisplay = display === "none" ? "" : display;
              }
            }
            style.display = "inline-block";
          }
        }
      }
      if (opts.overflow) {
        style.overflow = "hidden";
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
      propTween = false;
      for (prop in orig) {
        if (!propTween) {
          if (dataShow) {
            if ("hidden" in dataShow) {
              hidden = dataShow.hidden;
            }
          } else {
            dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
          }
          if (toggle) {
            dataShow.hidden = !hidden;
          }
          if (hidden) {
            showHide([elem], true);
          }
          anim.done(function() {
            if (!hidden) {
              showHide([elem]);
            }
            dataPriv.remove(elem, "fxshow");
            for (prop in orig) {
              jQuery.style(elem, prop, orig[prop]);
            }
          });
        }
        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = propTween.start;
          if (hidden) {
            propTween.end = propTween.start;
            propTween.start = 0;
          }
        }
      }
    }
    function propFilter(props, specialEasing) {
      var index, name, easing, value, hooks;
      for (index in props) {
        name = camelCase(index);
        easing = specialEasing[name];
        value = props[index];
        if (Array.isArray(value)) {
          easing = value[1];
          value = props[index] = value[0];
        }
        if (index !== name) {
          props[name] = value;
          delete props[index];
        }
        hooks = jQuery.cssHooks[name];
        if (hooks && "expand" in hooks) {
          value = hooks.expand(value);
          delete props[name];
          for (index in value) {
            if (!(index in props)) {
              props[index] = value[index];
              specialEasing[index] = easing;
            }
          }
        } else {
          specialEasing[name] = easing;
        }
      }
    }
    function Animation(elem, properties, options) {
      var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
        delete tick.elem;
      }), tick = function() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
        for (; index2 < length2; index2++) {
          animation.tweens[index2].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length2) {
          return remaining;
        }
        if (!length2) {
          deferred.notifyWith(elem, [animation, 1, 0]);
        }
        deferred.resolveWith(elem, [animation]);
        return false;
      }, animation = deferred.promise({
        elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(
            elem,
            animation.opts,
            prop,
            end,
            animation.opts.specialEasing[prop] || animation.opts.easing
          );
          animation.tweens.push(tween);
          return tween;
        },
        stop: function(gotoEnd) {
          var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(1);
          }
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }), props = animation.props;
      propFilter(props, animation.opts.specialEasing);
      for (; index < length; index++) {
        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
        if (result) {
          if (isFunction(result.stop)) {
            jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
          }
          return result;
        }
      }
      jQuery.map(props, createTween, animation);
      if (isFunction(animation.opts.start)) {
        animation.opts.start.call(elem, animation);
      }
      animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
      jQuery.fx.timer(
        jQuery.extend(tick, {
          elem,
          anim: animation,
          queue: animation.opts.queue
        })
      );
      return animation;
    }
    jQuery.Animation = jQuery.extend(Animation, {
      tweeners: {
        "*": [function(prop, value) {
          var tween = this.createTween(prop, value);
          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
          return tween;
        }]
      },
      tweener: function(props, callback) {
        if (isFunction(props)) {
          callback = props;
          props = ["*"];
        } else {
          props = props.match(rnothtmlwhite);
        }
        var prop, index = 0, length = props.length;
        for (; index < length; index++) {
          prop = props[index];
          Animation.tweeners[prop] = Animation.tweeners[prop] || [];
          Animation.tweeners[prop].unshift(callback);
        }
      },
      prefilters: [defaultPrefilter],
      prefilter: function(callback, prepend) {
        if (prepend) {
          Animation.prefilters.unshift(callback);
        } else {
          Animation.prefilters.push(callback);
        }
      }
    });
    jQuery.speed = function(speed, easing, fn) {
      var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !isFunction(easing) && easing
      };
      if (jQuery.fx.off) {
        opt.duration = 0;
      } else {
        if (typeof opt.duration !== "number") {
          if (opt.duration in jQuery.fx.speeds) {
            opt.duration = jQuery.fx.speeds[opt.duration];
          } else {
            opt.duration = jQuery.fx.speeds._default;
          }
        }
      }
      if (opt.queue == null || opt.queue === true) {
        opt.queue = "fx";
      }
      opt.old = opt.complete;
      opt.complete = function() {
        if (isFunction(opt.old)) {
          opt.old.call(this);
        }
        if (opt.queue) {
          jQuery.dequeue(this, opt.queue);
        }
      };
      return opt;
    };
    jQuery.fn.extend({
      fadeTo: function(speed, to, easing, callback) {
        return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
      },
      animate: function(prop, speed, easing, callback) {
        var empty3 = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty3 || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };
        doAnimation.finish = doAnimation;
        return empty3 || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
      },
      stop: function(type3, clearQueue, gotoEnd) {
        var stopQueue = function(hooks) {
          var stop = hooks.stop;
          delete hooks.stop;
          stop(gotoEnd);
        };
        if (typeof type3 !== "string") {
          gotoEnd = clearQueue;
          clearQueue = type3;
          type3 = void 0;
        }
        if (clearQueue) {
          this.queue(type3 || "fx", []);
        }
        return this.each(function() {
          var dequeue = true, index = type3 != null && type3 + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
          if (index) {
            if (data[index] && data[index].stop) {
              stopQueue(data[index]);
            }
          } else {
            for (index in data) {
              if (data[index] && data[index].stop && rrun.test(index)) {
                stopQueue(data[index]);
              }
            }
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && (type3 == null || timers[index].queue === type3)) {
              timers[index].anim.stop(gotoEnd);
              dequeue = false;
              timers.splice(index, 1);
            }
          }
          if (dequeue || !gotoEnd) {
            jQuery.dequeue(this, type3);
          }
        });
      },
      finish: function(type3) {
        if (type3 !== false) {
          type3 = type3 || "fx";
        }
        return this.each(function() {
          var index, data = dataPriv.get(this), queue = data[type3 + "queue"], hooks = data[type3 + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
          data.finish = true;
          jQuery.queue(this, type3, []);
          if (hooks && hooks.stop) {
            hooks.stop.call(this, true);
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && timers[index].queue === type3) {
              timers[index].anim.stop(true);
              timers.splice(index, 1);
            }
          }
          for (index = 0; index < length; index++) {
            if (queue[index] && queue[index].finish) {
              queue[index].finish.call(this);
            }
          }
          delete data.finish;
        });
      }
    });
    jQuery.each(["toggle", "show", "hide"], function(_i, name) {
      var cssFn = jQuery.fn[name];
      jQuery.fn[name] = function(speed, easing, callback) {
        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
      };
    });
    jQuery.each({
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    }, function(name, props) {
      jQuery.fn[name] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
      var timer, i = 0, timers = jQuery.timers;
      fxNow = Date.now();
      for (; i < timers.length; i++) {
        timer = timers[i];
        if (!timer() && timers[i] === timer) {
          timers.splice(i--, 1);
        }
      }
      if (!timers.length) {
        jQuery.fx.stop();
      }
      fxNow = void 0;
    };
    jQuery.fx.timer = function(timer) {
      jQuery.timers.push(timer);
      jQuery.fx.start();
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
      if (inProgress) {
        return;
      }
      inProgress = true;
      schedule();
    };
    jQuery.fx.stop = function() {
      inProgress = null;
    };
    jQuery.fx.speeds = {
      slow: 600,
      fast: 200,
      // Default speed
      _default: 400
    };
    jQuery.fn.delay = function(time, type3) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type3 = type3 || "fx";
      return this.queue(type3, function(next, hooks) {
        var timeout = window2.setTimeout(next, time);
        hooks.stop = function() {
          window2.clearTimeout(timeout);
        };
      });
    };
    (function() {
      var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
      input.type = "checkbox";
      support2.checkOn = input.value !== "";
      support2.optSelected = opt.selected;
      input = document2.createElement("input");
      input.value = "t";
      input.type = "radio";
      support2.radioValue = input.value === "t";
    })();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
      attr: function(name, value) {
        return access(this, jQuery.attr, name, value, arguments.length > 1);
      },
      removeAttr: function(name) {
        return this.each(function() {
          jQuery.removeAttr(this, name);
        });
      }
    });
    jQuery.extend({
      attr: function(elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (typeof elem.getAttribute === "undefined") {
          return jQuery.prop(elem, name, value);
        }
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
        }
        if (value !== void 0) {
          if (value === null) {
            jQuery.removeAttr(elem, name);
            return;
          }
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
            return ret;
          }
          elem.setAttribute(name, value + "");
          return value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        ret = jQuery.find.attr(elem, name);
        return ret == null ? void 0 : ret;
      },
      attrHooks: {
        type: {
          set: function(elem, value) {
            if (!support2.radioValue && value === "radio" && nodeName(elem, "input")) {
              var val = elem.value;
              elem.setAttribute("type", value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      },
      removeAttr: function(elem, value) {
        var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
        if (attrNames && elem.nodeType === 1) {
          while (name = attrNames[i++]) {
            elem.removeAttribute(name);
          }
        }
      }
    });
    boolHook = {
      set: function(elem, value, name) {
        if (value === false) {
          jQuery.removeAttr(elem, name);
        } else {
          elem.setAttribute(name, name);
        }
        return name;
      }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
      var getter = attrHandle[name] || jQuery.find.attr;
      attrHandle[name] = function(elem, name2, isXML) {
        var ret, handle, lowercaseName = name2.toLowerCase();
        if (!isXML) {
          handle = attrHandle[lowercaseName];
          attrHandle[lowercaseName] = ret;
          ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
          attrHandle[lowercaseName] = handle;
        }
        return ret;
      };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
      prop: function(name, value) {
        return access(this, jQuery.prop, name, value, arguments.length > 1);
      },
      removeProp: function(name) {
        return this.each(function() {
          delete this[jQuery.propFix[name] || name];
        });
      }
    });
    jQuery.extend({
      prop: function(elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          name = jQuery.propFix[name] || name;
          hooks = jQuery.propHooks[name];
        }
        if (value !== void 0) {
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
            return ret;
          }
          return elem[name] = value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        return elem[name];
      },
      propHooks: {
        tabIndex: {
          get: function(elem) {
            var tabindex = jQuery.find.attr(elem, "tabindex");
            if (tabindex) {
              return parseInt(tabindex, 10);
            }
            if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
              return 0;
            }
            return -1;
          }
        }
      },
      propFix: {
        "for": "htmlFor",
        "class": "className"
      }
    });
    if (!support2.optSelected) {
      jQuery.propHooks.selected = {
        get: function(elem) {
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }
    jQuery.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      jQuery.propFix[this.toLowerCase()] = this;
    });
    function stripAndCollapse(value) {
      var tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(" ");
    }
    function getClass(elem) {
      return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function classesToArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        return value.match(rnothtmlwhite) || [];
      }
      return [];
    }
    jQuery.fn.extend({
      addClass: function(value) {
        var classNames, cur, curValue, className, i, finalValue;
        if (isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).addClass(value.call(this, j, getClass(this)));
          });
        }
        classNames = classesToArray(value);
        if (classNames.length) {
          return this.each(function() {
            curValue = getClass(this);
            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                if (cur.indexOf(" " + className + " ") < 0) {
                  cur += className + " ";
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                this.setAttribute("class", finalValue);
              }
            }
          });
        }
        return this;
      },
      removeClass: function(value) {
        var classNames, cur, curValue, className, i, finalValue;
        if (isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).removeClass(value.call(this, j, getClass(this)));
          });
        }
        if (!arguments.length) {
          return this.attr("class", "");
        }
        classNames = classesToArray(value);
        if (classNames.length) {
          return this.each(function() {
            curValue = getClass(this);
            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                while (cur.indexOf(" " + className + " ") > -1) {
                  cur = cur.replace(" " + className + " ", " ");
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                this.setAttribute("class", finalValue);
              }
            }
          });
        }
        return this;
      },
      toggleClass: function(value, stateVal) {
        var classNames, className, i, self2, type3 = typeof value, isValidValue = type3 === "string" || Array.isArray(value);
        if (isFunction(value)) {
          return this.each(function(i2) {
            jQuery(this).toggleClass(
              value.call(this, i2, getClass(this), stateVal),
              stateVal
            );
          });
        }
        if (typeof stateVal === "boolean" && isValidValue) {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }
        classNames = classesToArray(value);
        return this.each(function() {
          if (isValidValue) {
            self2 = jQuery(this);
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              if (self2.hasClass(className)) {
                self2.removeClass(className);
              } else {
                self2.addClass(className);
              }
            }
          } else if (value === void 0 || type3 === "boolean") {
            className = getClass(this);
            if (className) {
              dataPriv.set(this, "__className__", className);
            }
            if (this.setAttribute) {
              this.setAttribute(
                "class",
                className || value === false ? "" : dataPriv.get(this, "__className__") || ""
              );
            }
          }
        });
      },
      hasClass: function(selector) {
        var className, elem, i = 0;
        className = " " + selector + " ";
        while (elem = this[i++]) {
          if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
      val: function(value) {
        var hooks, ret, valueIsFunction, elem = this[0];
        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
              return ret;
            }
            ret = elem.value;
            if (typeof ret === "string") {
              return ret.replace(rreturn, "");
            }
            return ret == null ? "" : ret;
          }
          return;
        }
        valueIsFunction = isFunction(value);
        return this.each(function(i) {
          var val;
          if (this.nodeType !== 1) {
            return;
          }
          if (valueIsFunction) {
            val = value.call(this, i, jQuery(this).val());
          } else {
            val = value;
          }
          if (val == null) {
            val = "";
          } else if (typeof val === "number") {
            val += "";
          } else if (Array.isArray(val)) {
            val = jQuery.map(val, function(value2) {
              return value2 == null ? "" : value2 + "";
            });
          }
          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
            this.value = val;
          }
        });
      }
    });
    jQuery.extend({
      valHooks: {
        option: {
          get: function(elem) {
            var val = jQuery.find.attr(elem, "value");
            return val != null ? val : (
              // Support: IE <=10 - 11 only
              // option.text throws exceptions (trac-14686, trac-14858)
              // Strip and collapse whitespace
              // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
              stripAndCollapse(jQuery.text(elem))
            );
          }
        },
        select: {
          get: function(elem) {
            var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
            if (index < 0) {
              i = max;
            } else {
              i = one ? index : 0;
            }
            for (; i < max; i++) {
              option = options[i];
              if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
              !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                value = jQuery(option).val();
                if (one) {
                  return value;
                }
                values.push(value);
              }
            }
            return values;
          },
          set: function(elem, value) {
            var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
            while (i--) {
              option = options[i];
              if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                optionSet = true;
              }
            }
            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      }
    });
    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = {
        set: function(elem, value) {
          if (Array.isArray(value)) {
            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
          }
        }
      };
      if (!support2.checkOn) {
        jQuery.valHooks[this].get = function(elem) {
          return elem.getAttribute("value") === null ? "on" : elem.value;
        };
      }
    });
    var location2 = window2.location;
    var nonce = { guid: Date.now() };
    var rquery = /\?/;
    jQuery.parseXML = function(data) {
      var xml, parserErrorElem;
      if (!data || typeof data !== "string") {
        return null;
      }
      try {
        xml = new window2.DOMParser().parseFromString(data, "text/xml");
      } catch (e) {
      }
      parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
      if (!xml || parserErrorElem) {
        jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
          return el.textContent;
        }).join("\n") : data));
      }
      return xml;
    };
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
      e.stopPropagation();
    };
    jQuery.extend(jQuery.event, {
      trigger: function(event2, data, elem, onlyHandlers) {
        var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type3 = hasOwn.call(event2, "type") ? event2.type : event2, namespaces = hasOwn.call(event2, "namespace") ? event2.namespace.split(".") : [];
        cur = lastElement = tmp = elem = elem || document2;
        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }
        if (rfocusMorph.test(type3 + jQuery.event.triggered)) {
          return;
        }
        if (type3.indexOf(".") > -1) {
          namespaces = type3.split(".");
          type3 = namespaces.shift();
          namespaces.sort();
        }
        ontype = type3.indexOf(":") < 0 && "on" + type3;
        event2 = event2[jQuery.expando] ? event2 : new jQuery.Event(type3, typeof event2 === "object" && event2);
        event2.isTrigger = onlyHandlers ? 2 : 3;
        event2.namespace = namespaces.join(".");
        event2.rnamespace = event2.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        event2.result = void 0;
        if (!event2.target) {
          event2.target = elem;
        }
        data = data == null ? [event2] : jQuery.makeArray(data, [event2]);
        special = jQuery.event.special[type3] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }
        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
          bubbleType = special.delegateType || type3;
          if (!rfocusMorph.test(bubbleType + type3)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document2)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
          }
        }
        i = 0;
        while ((cur = eventPath[i++]) && !event2.isPropagationStopped()) {
          lastElement = cur;
          event2.type = i > 1 ? bubbleType : special.bindType || type3;
          handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event2.type] && dataPriv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, data);
          }
          handle = ontype && cur[ontype];
          if (handle && handle.apply && acceptData(cur)) {
            event2.result = handle.apply(cur, data);
            if (event2.result === false) {
              event2.preventDefault();
            }
          }
        }
        event2.type = type3;
        if (!onlyHandlers && !event2.isDefaultPrevented()) {
          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
            if (ontype && isFunction(elem[type3]) && !isWindow(elem)) {
              tmp = elem[ontype];
              if (tmp) {
                elem[ontype] = null;
              }
              jQuery.event.triggered = type3;
              if (event2.isPropagationStopped()) {
                lastElement.addEventListener(type3, stopPropagationCallback);
              }
              elem[type3]();
              if (event2.isPropagationStopped()) {
                lastElement.removeEventListener(type3, stopPropagationCallback);
              }
              jQuery.event.triggered = void 0;
              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }
        return event2.result;
      },
      // Piggyback on a donor event to simulate a different one
      // Used only for `focus(in | out)` events
      simulate: function(type3, elem, event2) {
        var e = jQuery.extend(
          new jQuery.Event(),
          event2,
          {
            type: type3,
            isSimulated: true
          }
        );
        jQuery.event.trigger(e, null, elem);
      }
    });
    jQuery.fn.extend({
      trigger: function(type3, data) {
        return this.each(function() {
          jQuery.event.trigger(type3, data, this);
        });
      },
      triggerHandler: function(type3, data) {
        var elem = this[0];
        if (elem) {
          return jQuery.event.trigger(type3, data, elem, true);
        }
      }
    });
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
      var name;
      if (Array.isArray(obj)) {
        jQuery.each(obj, function(i, v) {
          if (traditional || rbracket.test(prefix)) {
            add(prefix, v);
          } else {
            buildParams(
              prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
              v,
              traditional,
              add
            );
          }
        });
      } else if (!traditional && toType(obj) === "object") {
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }
      } else {
        add(prefix, obj);
      }
    }
    jQuery.param = function(a, traditional) {
      var prefix, s = [], add = function(key, valueOrFunction) {
        var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
      };
      if (a == null) {
        return "";
      }
      if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
        jQuery.each(a, function() {
          add(this.name, this.value);
        });
      } else {
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }
      return s.join("&");
    };
    jQuery.fn.extend({
      serialize: function() {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var elements = jQuery.prop(this, "elements");
          return elements ? jQuery.makeArray(elements) : this;
        }).filter(function() {
          var type3 = this.type;
          return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type3) && (this.checked || !rcheckableType.test(type3));
        }).map(function(_i, elem) {
          var val = jQuery(this).val();
          if (val == null) {
            return null;
          }
          if (Array.isArray(val)) {
            return jQuery.map(val, function(val2) {
              return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
            });
          }
          return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        }).get();
      }
    });
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
    originAnchor.href = location2.href;
    function addToPrefiltersOrTransports(structure) {
      return function(dataTypeExpression, func) {
        if (typeof dataTypeExpression !== "string") {
          func = dataTypeExpression;
          dataTypeExpression = "*";
        }
        var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
        if (isFunction(func)) {
          while (dataType = dataTypes[i++]) {
            if (dataType[0] === "+") {
              dataType = dataType.slice(1) || "*";
              (structure[dataType] = structure[dataType] || []).unshift(func);
            } else {
              (structure[dataType] = structure[dataType] || []).push(func);
            }
          }
        }
      };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
      var inspected = {}, seekingTransport = structure === transports;
      function inspect(dataType) {
        var selected;
        inspected[dataType] = true;
        jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
            options.dataTypes.unshift(dataTypeOrTransport);
            inspect(dataTypeOrTransport);
            return false;
          } else if (seekingTransport) {
            return !(selected = dataTypeOrTransport);
          }
        });
        return selected;
      }
      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
      var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
      for (key in src) {
        if (src[key] !== void 0) {
          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
        }
      }
      if (deep) {
        jQuery.extend(true, target, deep);
      }
      return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
      var ct, type3, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
      while (dataTypes[0] === "*") {
        dataTypes.shift();
        if (ct === void 0) {
          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
      }
      if (ct) {
        for (type3 in contents) {
          if (contents[type3] && contents[type3].test(ct)) {
            dataTypes.unshift(type3);
            break;
          }
        }
      }
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        for (type3 in responses) {
          if (!dataTypes[0] || s.converters[type3 + " " + dataTypes[0]]) {
            finalDataType = type3;
            break;
          }
          if (!firstDataType) {
            firstDataType = type3;
          }
        }
        finalDataType = finalDataType || firstDataType;
      }
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
      var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
      if (dataTypes[1]) {
        for (conv in s.converters) {
          converters[conv.toLowerCase()] = s.converters[conv];
        }
      }
      current = dataTypes.shift();
      while (current) {
        if (s.responseFields[current]) {
          jqXHR[s.responseFields[current]] = response;
        }
        if (!prev && isSuccess && s.dataFilter) {
          response = s.dataFilter(response, s.dataType);
        }
        prev = current;
        current = dataTypes.shift();
        if (current) {
          if (current === "*") {
            current = prev;
          } else if (prev !== "*" && prev !== current) {
            conv = converters[prev + " " + current] || converters["* " + current];
            if (!conv) {
              for (conv2 in converters) {
                tmp = conv2.split(" ");
                if (tmp[1] === current) {
                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                  if (conv) {
                    if (conv === true) {
                      conv = converters[conv2];
                    } else if (converters[conv2] !== true) {
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                    break;
                  }
                }
              }
            }
            if (conv !== true) {
              if (conv && s.throws) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
      return { state: "success", data: response };
    }
    jQuery.extend({
      // Counter for holding the number of active queries
      active: 0,
      // Last-Modified header cache for next request
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: location2.href,
        type: "GET",
        isLocal: rlocalProtocol.test(location2.protocol),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
          "*": allTypes,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {
          // Convert anything to text
          "* text": String,
          // Text to html (true = no transformation)
          "text html": true,
          // Evaluate text as a json expression
          "text json": JSON.parse,
          // Parse text as xml
          "text xml": jQuery.parseXML
        },
        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
          url: true,
          context: true
        }
      },
      // Creates a full fledged settings object into target
      // with both ajaxSettings and settings fields.
      // If target is omitted, writes into ajaxSettings.
      ajaxSetup: function(target, settings) {
        return settings ? (
          // Building a settings object
          ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
        ) : (
          // Extending ajaxSettings
          ajaxExtend(jQuery.ajaxSettings, target)
        );
      },
      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),
      // Main method
      ajax: function(url, options) {
        if (typeof url === "object") {
          options = url;
          url = void 0;
        }
        options = options || {};
        var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function(key) {
            var match;
            if (completed2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                }
              }
              match = responseHeaders[key.toLowerCase() + " "];
            }
            return match == null ? null : match.join(", ");
          },
          // Raw string
          getAllResponseHeaders: function() {
            return completed2 ? responseHeadersString : null;
          },
          // Caches the header
          setRequestHeader: function(name, value) {
            if (completed2 == null) {
              name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          // Overrides response content-type header
          overrideMimeType: function(type3) {
            if (completed2 == null) {
              s.mimeType = type3;
            }
            return this;
          },
          // Status-dependent callbacks
          statusCode: function(map) {
            var code;
            if (map) {
              if (completed2) {
                jqXHR.always(map[jqXHR.status]);
              } else {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              }
            }
            return this;
          },
          // Cancel the request
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
        deferred.promise(jqXHR);
        s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
        s.type = options.method || options.type || s.method || s.type;
        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
        if (s.crossDomain == null) {
          urlAnchor = document2.createElement("a");
          try {
            urlAnchor.href = s.url;
            urlAnchor.href = urlAnchor.href;
            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
          } catch (e) {
            s.crossDomain = true;
          }
        }
        if (s.data && s.processData && typeof s.data !== "string") {
          s.data = jQuery.param(s.data, s.traditional);
        }
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
        if (completed2) {
          return jqXHR;
        }
        fireGlobals = jQuery.event && s.global;
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger("ajaxStart");
        }
        s.type = s.type.toUpperCase();
        s.hasContent = !rnoContent.test(s.type);
        cacheURL = s.url.replace(rhash, "");
        if (!s.hasContent) {
          uncached = s.url.slice(cacheURL.length);
          if (s.data && (s.processData || typeof s.data === "string")) {
            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
            delete s.data;
          }
          if (s.cache === false) {
            cacheURL = cacheURL.replace(rantiCache, "$1");
            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
          }
          s.url = cacheURL + uncached;
        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
          s.data = s.data.replace(r20, "+");
        }
        if (s.ifModified) {
          if (jQuery.lastModified[cacheURL]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
          }
          if (jQuery.etag[cacheURL]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
          }
        }
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader("Content-Type", s.contentType);
        }
        jqXHR.setRequestHeader(
          "Accept",
          s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
        );
        for (i in s.headers) {
          jqXHR.setRequestHeader(i, s.headers[i]);
        }
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
          return jqXHR.abort();
        }
        strAbort = "abort";
        completeDeferred.add(s.complete);
        jqXHR.done(s.success);
        jqXHR.fail(s.error);
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        if (!transport) {
          done(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          if (completed2) {
            return jqXHR;
          }
          if (s.async && s.timeout > 0) {
            timeoutTimer = window2.setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
          try {
            completed2 = false;
            transport.send(requestHeaders, done);
          } catch (e) {
            if (completed2) {
              throw e;
            }
            done(-1, e);
          }
        }
        function done(status, nativeStatusText, responses, headers) {
          var isSuccess, success, error, response, modified, statusText = nativeStatusText;
          if (completed2) {
            return;
          }
          completed2 = true;
          if (timeoutTimer) {
            window2.clearTimeout(timeoutTimer);
          }
          transport = void 0;
          responseHeadersString = headers || "";
          jqXHR.readyState = status > 0 ? 4 : 0;
          isSuccess = status >= 200 && status < 300 || status === 304;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
            s.converters["text script"] = function() {
            };
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (status === 204 || s.type === "HEAD") {
              statusText = "nocontent";
            } else if (status === 304) {
              statusText = "notmodified";
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              statusText = "error";
              if (status < 0) {
                status = 0;
              }
            }
          }
          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (fireGlobals) {
            globalEventContext.trigger(
              isSuccess ? "ajaxSuccess" : "ajaxError",
              [jqXHR, s, isSuccess ? success : error]
            );
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
        return jqXHR;
      },
      getJSON: function(url, data, callback) {
        return jQuery.get(url, data, callback, "json");
      },
      getScript: function(url, callback) {
        return jQuery.get(url, void 0, callback, "script");
      }
    });
    jQuery.each(["get", "post"], function(_i, method) {
      jQuery[method] = function(url, data, callback, type3) {
        if (isFunction(data)) {
          type3 = type3 || callback;
          callback = data;
          data = void 0;
        }
        return jQuery.ajax(jQuery.extend({
          url,
          type: method,
          dataType: type3,
          data,
          success: callback
        }, jQuery.isPlainObject(url) && url));
      };
    });
    jQuery.ajaxPrefilter(function(s) {
      var i;
      for (i in s.headers) {
        if (i.toLowerCase() === "content-type") {
          s.contentType = s.headers[i] || "";
        }
      }
    });
    jQuery._evalUrl = function(url, options, doc) {
      return jQuery.ajax({
        url,
        // Make this explicit, since user can override this through ajaxSetup (trac-11264)
        type: "GET",
        dataType: "script",
        cache: true,
        async: false,
        global: false,
        // Only evaluate the response if it is successful (gh-4126)
        // dataFilter is not invoked for failure responses, so using it instead
        // of the default converter is kludgy but it works.
        converters: {
          "text script": function() {
          }
        },
        dataFilter: function(response) {
          jQuery.globalEval(response, options, doc);
        }
      });
    };
    jQuery.fn.extend({
      wrapAll: function(html) {
        var wrap;
        if (this[0]) {
          if (isFunction(html)) {
            html = html.call(this[0]);
          }
          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }
          wrap.map(function() {
            var elem = this;
            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }
            return elem;
          }).append(this);
        }
        return this;
      },
      wrapInner: function(html) {
        if (isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }
        return this.each(function() {
          var self2 = jQuery(this), contents = self2.contents();
          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self2.append(html);
          }
        });
      },
      wrap: function(html) {
        var htmlIsFunction = isFunction(html);
        return this.each(function(i) {
          jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
        });
      },
      unwrap: function(selector) {
        this.parent(selector).not("body").each(function() {
          jQuery(this).replaceWith(this.childNodes);
        });
        return this;
      }
    });
    jQuery.expr.pseudos.hidden = function(elem) {
      return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    jQuery.ajaxSettings.xhr = function() {
      try {
        return new window2.XMLHttpRequest();
      } catch (e) {
      }
    };
    var xhrSuccessStatus = {
      // File protocol always yields status code 0, assume 200
      0: 200,
      // Support: IE <=9 only
      // trac-1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    support2.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    support2.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
      var callback, errorCallback;
      if (support2.cors || xhrSupported && !options.crossDomain) {
        return {
          send: function(headers, complete) {
            var i, xhr = options.xhr();
            xhr.open(
              options.type,
              options.url,
              options.async,
              options.username,
              options.password
            );
            if (options.xhrFields) {
              for (i in options.xhrFields) {
                xhr[i] = options.xhrFields[i];
              }
            }
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }
            if (!options.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest";
            }
            for (i in headers) {
              xhr.setRequestHeader(i, headers[i]);
            }
            callback = function(type3) {
              return function() {
                if (callback) {
                  callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                  if (type3 === "abort") {
                    xhr.abort();
                  } else if (type3 === "error") {
                    if (typeof xhr.status !== "number") {
                      complete(0, "error");
                    } else {
                      complete(
                        // File: protocol always yields status 0; see trac-8605, trac-14207
                        xhr.status,
                        xhr.statusText
                      );
                    }
                  } else {
                    complete(
                      xhrSuccessStatus[xhr.status] || xhr.status,
                      xhr.statusText,
                      // Support: IE <=9 only
                      // IE9 has no XHR2 but throws on binary (trac-11426)
                      // For XHR2 non-text, let the caller handle it (gh-2498)
                      (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                      xhr.getAllResponseHeaders()
                    );
                  }
                }
              };
            };
            xhr.onload = callback();
            errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
            if (xhr.onabort !== void 0) {
              xhr.onabort = errorCallback;
            } else {
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  window2.setTimeout(function() {
                    if (callback) {
                      errorCallback();
                    }
                  });
                }
              };
            }
            callback = callback("abort");
            try {
              xhr.send(options.hasContent && options.data || null);
            } catch (e) {
              if (callback) {
                throw e;
              }
            }
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });
    jQuery.ajaxPrefilter(function(s) {
      if (s.crossDomain) {
        s.contents.script = false;
      }
    });
    jQuery.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /\b(?:java|ecma)script\b/
      },
      converters: {
        "text script": function(text) {
          jQuery.globalEval(text);
          return text;
        }
      }
    });
    jQuery.ajaxPrefilter("script", function(s) {
      if (s.cache === void 0) {
        s.cache = false;
      }
      if (s.crossDomain) {
        s.type = "GET";
      }
    });
    jQuery.ajaxTransport("script", function(s) {
      if (s.crossDomain || s.scriptAttrs) {
        var script, callback;
        return {
          send: function(_, complete) {
            script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
              script.remove();
              callback = null;
              if (evt) {
                complete(evt.type === "error" ? 404 : 200, evt.type);
              }
            });
            document2.head.appendChild(script[0]);
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
        this[callback] = true;
        return callback;
      }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
      var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
      if (jsonProp || s.dataTypes[0] === "jsonp") {
        callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
        if (jsonProp) {
          s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
        } else if (s.jsonp !== false) {
          s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
        }
        s.converters["script json"] = function() {
          if (!responseContainer) {
            jQuery.error(callbackName + " was not called");
          }
          return responseContainer[0];
        };
        s.dataTypes[0] = "json";
        overwritten = window2[callbackName];
        window2[callbackName] = function() {
          responseContainer = arguments;
        };
        jqXHR.always(function() {
          if (overwritten === void 0) {
            jQuery(window2).removeProp(callbackName);
          } else {
            window2[callbackName] = overwritten;
          }
          if (s[callbackName]) {
            s.jsonpCallback = originalSettings.jsonpCallback;
            oldCallbacks.push(callbackName);
          }
          if (responseContainer && isFunction(overwritten)) {
            overwritten(responseContainer[0]);
          }
          responseContainer = overwritten = void 0;
        });
        return "script";
      }
    });
    support2.createHTMLDocument = function() {
      var body = document2.implementation.createHTMLDocument("").body;
      body.innerHTML = "<form></form><form></form>";
      return body.childNodes.length === 2;
    }();
    jQuery.parseHTML = function(data, context, keepScripts) {
      if (typeof data !== "string") {
        return [];
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }
      var base, parsed, scripts;
      if (!context) {
        if (support2.createHTMLDocument) {
          context = document2.implementation.createHTMLDocument("");
          base = context.createElement("base");
          base.href = document2.location.href;
          context.head.appendChild(base);
        } else {
          context = document2;
        }
      }
      parsed = rsingleTag.exec(data);
      scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = buildFragment([data], context, scripts);
      if (scripts && scripts.length) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    };
    jQuery.fn.load = function(url, params, callback) {
      var selector, type3, response, self2 = this, off = url.indexOf(" ");
      if (off > -1) {
        selector = stripAndCollapse(url.slice(off));
        url = url.slice(0, off);
      }
      if (isFunction(params)) {
        callback = params;
        params = void 0;
      } else if (params && typeof params === "object") {
        type3 = "POST";
      }
      if (self2.length > 0) {
        jQuery.ajax({
          url,
          // If "type" variable is undefined, then "GET" method will be used.
          // Make value of this field explicit since
          // user can override it through ajaxSetup method
          type: type3 || "GET",
          dataType: "html",
          data: params
        }).done(function(responseText) {
          response = arguments;
          self2.html(selector ? (
            // If a selector was specified, locate the right elements in a dummy div
            // Exclude scripts to avoid IE 'Permission Denied' errors
            jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
          ) : (
            // Otherwise use the full result
            responseText
          ));
        }).always(callback && function(jqXHR, status) {
          self2.each(function() {
            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
          });
        });
      }
      return this;
    };
    jQuery.expr.pseudos.animated = function(elem) {
      return jQuery.grep(jQuery.timers, function(fn) {
        return elem === fn.elem;
      }).length;
    };
    jQuery.offset = {
      setOffset: function(elem, options, i) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
        if (position === "static") {
          elem.style.position = "relative";
        }
        curOffset = curElem.offset();
        curCSSTop = jQuery.css(elem, "top");
        curCSSLeft = jQuery.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;
        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (isFunction(options)) {
          options = options.call(elem, i, jQuery.extend({}, curOffset));
        }
        if (options.top != null) {
          props.top = options.top - curOffset.top + curTop;
        }
        if (options.left != null) {
          props.left = options.left - curOffset.left + curLeft;
        }
        if ("using" in options) {
          options.using.call(elem, props);
        } else {
          curElem.css(props);
        }
      }
    };
    jQuery.fn.extend({
      // offset() relates an element's border box to the document origin
      offset: function(options) {
        if (arguments.length) {
          return options === void 0 ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
          });
        }
        var rect, win, elem = this[0];
        if (!elem) {
          return;
        }
        if (!elem.getClientRects().length) {
          return { top: 0, left: 0 };
        }
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
          top: rect.top + win.pageYOffset,
          left: rect.left + win.pageXOffset
        };
      },
      // position() relates an element's margin box to its offset parent's padding box
      // This corresponds to the behavior of CSS absolute positioning
      position: function() {
        if (!this[0]) {
          return;
        }
        var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
        if (jQuery.css(elem, "position") === "fixed") {
          offset = elem.getBoundingClientRect();
        } else {
          offset = this.offset();
          doc = elem.ownerDocument;
          offsetParent = elem.offsetParent || doc.documentElement;
          while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.parentNode;
          }
          if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = jQuery(offsetParent).offset();
            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
          }
        }
        return {
          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
      },
      // This method will return documentElement in the following cases:
      // 1) For the element inside the iframe without offsetParent, this method will return
      //    documentElement of the parent window
      // 2) For the hidden or detached element
      // 3) For body or html element, i.e. in case of the html node - it will return itself
      //
      // but those exceptions were never presented as a real life use-cases
      // and might be considered as more preferable results.
      //
      // This logic, however, is not guaranteed and can change at any point in the future
      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent;
          while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || documentElement;
        });
      }
    });
    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
      var top = "pageYOffset" === prop;
      jQuery.fn[method] = function(val) {
        return access(this, function(elem, method2, val2) {
          var win;
          if (isWindow(elem)) {
            win = elem;
          } else if (elem.nodeType === 9) {
            win = elem.defaultView;
          }
          if (val2 === void 0) {
            return win ? win[prop] : elem[method2];
          }
          if (win) {
            win.scrollTo(
              !top ? val2 : win.pageXOffset,
              top ? val2 : win.pageYOffset
            );
          } else {
            elem[method2] = val2;
          }
        }, method, val, arguments.length);
      };
    });
    jQuery.each(["top", "left"], function(_i, prop) {
      jQuery.cssHooks[prop] = addGetHookIf(
        support2.pixelPosition,
        function(elem, computed) {
          if (computed) {
            computed = curCSS(elem, prop);
            return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
          }
        }
      );
    });
    jQuery.each({ Height: "height", Width: "width" }, function(name, type3) {
      jQuery.each({
        padding: "inner" + name,
        content: type3,
        "": "outer" + name
      }, function(defaultExtra, funcName) {
        jQuery.fn[funcName] = function(margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
          return access(this, function(elem, type22, value2) {
            var doc;
            if (isWindow(elem)) {
              return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
            }
            if (elem.nodeType === 9) {
              doc = elem.documentElement;
              return Math.max(
                elem.body["scroll" + name],
                doc["scroll" + name],
                elem.body["offset" + name],
                doc["offset" + name],
                doc["client" + name]
              );
            }
            return value2 === void 0 ? (
              // Get width or height on the element, requesting but not forcing parseFloat
              jQuery.css(elem, type22, extra)
            ) : (
              // Set width or height on the element
              jQuery.style(elem, type22, value2, extra)
            );
          }, type3, chainable ? margin : void 0, chainable);
        };
      });
    });
    jQuery.each([
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend"
    ], function(_i, type3) {
      jQuery.fn[type3] = function(fn) {
        return this.on(type3, fn);
      };
    });
    jQuery.fn.extend({
      bind: function(types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },
      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function(selector, types, fn) {
        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
      },
      hover: function(fnOver, fnOut) {
        return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
      }
    });
    jQuery.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
      function(_i, name) {
        jQuery.fn[name] = function(data, fn) {
          return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
      }
    );
    var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    jQuery.proxy = function(fn, context) {
      var tmp, args, proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!isFunction(fn)) {
        return void 0;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    };
    jQuery.holdReady = function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;
    jQuery.now = Date.now;
    jQuery.isNumeric = function(obj) {
      var type3 = jQuery.type(obj);
      return (type3 === "number" || type3 === "string") && // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(obj - parseFloat(obj));
    };
    jQuery.trim = function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "$1");
    };
    var _jQuery = window2.jQuery, _$ = window2.$;
    jQuery.noConflict = function(deep) {
      if (window2.$ === jQuery) {
        window2.$ = _$;
      }
      if (deep && window2.jQuery === jQuery) {
        window2.jQuery = _jQuery;
      }
      return jQuery;
    };
    if (typeof noGlobal === "undefined") {
      window2.jQuery = window2.$ = jQuery;
    }
    return jQuery;
  });
})(jquery);
var jqueryExports = jquery.exports;
const $ = /* @__PURE__ */ getDefaultExportFromCjs(jqueryExports);
function rtl() {
  return $("html").attr("dir") === "rtl";
}
function GetYoDigits(length = 6, namespace) {
  let str = "";
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * charsLength)];
  }
  return namespace ? `${str}-${namespace}` : str;
}
function RegExpEscape(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function transitionend($elem) {
  var transitions = {
    "transition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd",
    "MozTransition": "transitionend",
    "OTransition": "otransitionend"
  };
  var elem = document.createElement("div"), end;
  for (let transition2 in transitions) {
    if (typeof elem.style[transition2] !== "undefined") {
      end = transitions[transition2];
    }
  }
  if (end) {
    return end;
  } else {
    setTimeout(function() {
      $elem.triggerHandler("transitionend", [$elem]);
    }, 1);
    return "transitionend";
  }
}
function onLoad($elem, handler) {
  const didLoad = document.readyState === "complete";
  const eventType = (didLoad ? "_didLoad" : "load") + ".zf.util.onLoad";
  const cb = () => $elem.triggerHandler(eventType);
  if ($elem) {
    if (handler) $elem.one(eventType, handler);
    if (didLoad)
      setTimeout(cb);
    else
      $(window).one("load", cb);
  }
  return eventType;
}
function ignoreMousedisappear(handler, { ignoreLeaveWindow = false, ignoreReappear = false } = {}) {
  return function leaveEventHandler(eLeave, ...rest) {
    const callback = handler.bind(this, eLeave, ...rest);
    if (eLeave.relatedTarget !== null) {
      return callback();
    }
    setTimeout(function leaveEventDebouncer() {
      if (!ignoreLeaveWindow && document.hasFocus && !document.hasFocus()) {
        return callback();
      }
      if (!ignoreReappear) {
        $(document).one("mouseenter", function reenterEventHandler(eReenter) {
          if (!$(eLeave.currentTarget).has(eReenter.target).length) {
            eLeave.relatedTarget = eReenter.target;
            callback();
          }
        });
      }
    }, 0);
  };
}
window.matchMedia || (window.matchMedia = function() {
  var styleMedia = window.styleMedia || window.media;
  if (!styleMedia) {
    var style = document.createElement("style"), script = document.getElementsByTagName("script")[0], info = null;
    style.type = "text/css";
    style.id = "matchmediajs-test";
    if (!script) {
      document.head.appendChild(style);
    } else {
      script.parentNode.insertBefore(style, script);
    }
    info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle;
    styleMedia = {
      matchMedium: function(media) {
        var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }
        return info.width === "1px";
      }
    };
  }
  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || "all"),
      media: media || "all"
    };
  };
}());
var MediaQuery = {
  queries: [],
  current: "",
  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init() {
    if (this.isInitialized === true) {
      return this;
    } else {
      this.isInitialized = true;
    }
    var self2 = this;
    var $meta = $("meta.foundation-mq");
    if (!$meta.length) {
      $('<meta class="foundation-mq" name="foundation-mq" content>').appendTo(document.head);
    }
    var extractedStyles = $(".foundation-mq").css("font-family");
    var namedQueries;
    namedQueries = parseStyleToObject(extractedStyles);
    self2.queries = [];
    for (var key in namedQueries) {
      if (namedQueries.hasOwnProperty(key)) {
        self2.queries.push({
          name: key,
          value: `only screen and (min-width: ${namedQueries[key]})`
        });
      }
    }
    this.current = this._getCurrentSize();
    this._watcher();
  },
  /**
   * Reinitializes the media query helper.
   * Useful if your CSS breakpoint configuration has just been loaded or has changed since the initialization.
   * @function
   * @private
   */
  _reInit() {
    this.isInitialized = false;
    this._init();
  },
  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast(size) {
    var query = this.get(size);
    if (query) {
      return window.matchMedia(query).matches;
    }
    return false;
  },
  /**
   * Checks if the screen is within the given breakpoint.
   * If smaller than the breakpoint of larger than its upper limit it returns false.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` otherwise.
   */
  only(size) {
    return size === this._getCurrentSize();
  },
  /**
   * Checks if the screen is within a breakpoint or smaller.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's larger.
   */
  upTo(size) {
    const nextSize = this.next(size);
    if (nextSize) {
      return !this.atLeast(nextSize);
    }
    return true;
  },
  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is(size) {
    const parts = size.trim().split(" ").filter((p) => !!p.length);
    const [bpSize, bpModifier = ""] = parts;
    if (bpModifier === "only") {
      return this.only(bpSize);
    }
    if (!bpModifier || bpModifier === "up") {
      return this.atLeast(bpSize);
    }
    if (bpModifier === "down") {
      return this.upTo(bpSize);
    }
    throw new Error(`
      Invalid breakpoint passed to MediaQuery.is().
      Expected a breakpoint name formatted like "<size> <modifier>", got "${size}".
    `);
  },
  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get(size) {
    for (var i in this.queries) {
      if (this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }
    return null;
  },
  /**
   * Get the breakpoint following the given breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint.
   * @returns {String|null} - The name of the following breakpoint, or `null` if the passed breakpoint was the last one.
   */
  next(size) {
    const queryIndex = this.queries.findIndex((q) => this._getQueryName(q) === size);
    if (queryIndex === -1) {
      throw new Error(`
        Unknown breakpoint "${size}" passed to MediaQuery.next().
        Ensure it is present in your Sass "$breakpoints" setting.
      `);
    }
    const nextQuery = this.queries[queryIndex + 1];
    return nextQuery ? nextQuery.name : null;
  },
  /**
   * Returns the name of the breakpoint related to the given value.
   * @function
   * @private
   * @param {String|Object} value - Breakpoint name or query object.
   * @returns {String} Name of the breakpoint.
   */
  _getQueryName(value) {
    if (typeof value === "string")
      return value;
    if (typeof value === "object")
      return value.name;
    throw new TypeError(`
      Invalid value passed to MediaQuery._getQueryName().
      Expected a breakpoint name (String) or a breakpoint query (Object), got "${value}" (${typeof value})
    `);
  },
  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize() {
    var matched;
    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];
      if (window.matchMedia(query.value).matches) {
        matched = query;
      }
    }
    return matched && this._getQueryName(matched);
  },
  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher() {
    $(window).on("resize.zf.trigger", () => {
      var newSize = this._getCurrentSize(), currentSize = this.current;
      if (newSize !== currentSize) {
        this.current = newSize;
        $(window).trigger("changed.zf.mediaquery", [newSize, currentSize]);
      }
    });
  }
};
function parseStyleToObject(str) {
  var styleObject = {};
  if (typeof str !== "string") {
    return styleObject;
  }
  str = str.trim().slice(1, -1);
  if (!str) {
    return styleObject;
  }
  styleObject = str.split("&").reduce(function(ret, param) {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);
    val = typeof val === "undefined" ? null : decodeURIComponent(val);
    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});
  return styleObject;
}
var FOUNDATION_VERSION = "6.9.0";
var Foundation = {
  version: FOUNDATION_VERSION,
  /**
   * Stores initialized plugins.
   */
  _plugins: {},
  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],
  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function(plugin, name) {
    var className = name || functionName(plugin);
    var attrName = hyphenate$1(className);
    this._plugins[attrName] = this[className] = plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function(plugin, name) {
    var pluginName = name ? hyphenate$1(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = GetYoDigits(6, pluginName);
    if (!plugin.$element.attr(`data-${pluginName}`)) {
      plugin.$element.attr(`data-${pluginName}`, plugin.uuid);
    }
    if (!plugin.$element.data("zfPlugin")) {
      plugin.$element.data("zfPlugin", plugin);
    }
    plugin.$element.trigger(`init.zf.${pluginName}`);
    this._uuids.push(plugin.uuid);
    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function(plugin) {
    var pluginName = hyphenate$1(functionName(plugin.$element.data("zfPlugin").constructor));
    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr(`data-${pluginName}`).removeData("zfPlugin").trigger(`destroyed.zf.${pluginName}`);
    for (var prop in plugin) {
      if (typeof plugin[prop] === "function") {
        plugin[prop] = null;
      }
    }
    return;
  },
  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
  reInit: function(plugins) {
    var isJQ = plugins instanceof $;
    try {
      if (isJQ) {
        plugins.each(function() {
          $(this).data("zfPlugin")._init();
        });
      } else {
        var type3 = typeof plugins, _this = this, fns = {
          "object": function(plgs) {
            plgs.forEach(function(p) {
              p = hyphenate$1(p);
              $("[data-" + p + "]").foundation("_init");
            });
          },
          "string": function() {
            plugins = hyphenate$1(plugins);
            $("[data-" + plugins + "]").foundation("_init");
          },
          "undefined": function() {
            this.object(Object.keys(_this._plugins));
          }
        };
        fns[type3](plugins);
      }
    } catch (err) {
      console.error(err);
    } finally {
      return plugins;
    }
  },
  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {
    if (typeof plugins === "undefined") {
      plugins = Object.keys(this._plugins);
    } else if (typeof plugins === "string") {
      plugins = [plugins];
    }
    var _this = this;
    $.each(plugins, function(i, name) {
      var plugin = _this._plugins[name];
      var $elem = $(elem).find("[data-" + name + "]").addBack("[data-" + name + "]").filter(function() {
        return typeof $(this).data("zfPlugin") === "undefined";
      });
      $elem.each(function() {
        var $el = $(this), opts = { reflow: true };
        if ($el.attr("data-options")) {
          $el.attr("data-options").split(";").forEach(function(option) {
            var opt = option.split(":").map(function(el) {
              return el.trim();
            });
            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try {
          $el.data("zfPlugin", new plugin($(this), opts));
        } catch (er) {
          console.error(er);
        } finally {
          return;
        }
      });
    });
  },
  getFnName: functionName,
  addToJquery: function() {
    var foundation = function(method) {
      var type3 = typeof method, $noJS = $(".no-js");
      if ($noJS.length) {
        $noJS.removeClass("no-js");
      }
      if (type3 === "undefined") {
        MediaQuery._init();
        Foundation.reflow(this);
      } else if (type3 === "string") {
        var args = Array.prototype.slice.call(arguments, 1);
        var plugClass = this.data("zfPlugin");
        if (typeof plugClass !== "undefined" && typeof plugClass[method] !== "undefined") {
          if (this.length === 1) {
            plugClass[method].apply(plugClass, args);
          } else {
            this.each(function(i, el) {
              plugClass[method].apply($(el).data("zfPlugin"), args);
            });
          }
        } else {
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : "this element") + ".");
        }
      } else {
        throw new TypeError(`We're sorry, ${type3} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
      }
      return this;
    };
    $.fn.foundation = foundation;
    return $;
  }
};
Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function(func, delay) {
    var timer = null;
    return function() {
      var context = this, args = arguments;
      if (timer === null) {
        timer = setTimeout(function() {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};
window.Foundation = Foundation;
(function() {
  if (!Date.now || !window.Date.now)
    window.Date.now = Date.now = function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
  var vendors = ["webkit", "moz"];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
      var now2 = Date.now();
      var nextTime = Math.max(lastTime + 16, now2);
      return setTimeout(
        function() {
          callback(lastTime = nextTime);
        },
        nextTime - now2
      );
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  if (!window.performance || !window.performance.now) {
    window.performance = {
      start: Date.now(),
      now: function() {
        return Date.now() - this.start;
      }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
    }, fBound = function() {
      return fToBind.apply(
        this instanceof fNOP ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };
    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
  };
}
function functionName(fn) {
  if (typeof Function.prototype.name === "undefined") {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = funcNameRegex.exec(fn.toString());
    return results && results.length > 1 ? results[1].trim() : "";
  } else if (typeof fn.prototype === "undefined") {
    return fn.constructor.name;
  } else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str) {
  if ("true" === str) return true;
  else if ("false" === str) return false;
  else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
}
function hyphenate$1(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
const keyCodes = {
  9: "TAB",
  13: "ENTER",
  27: "ESCAPE",
  32: "SPACE",
  35: "END",
  36: "HOME",
  37: "ARROW_LEFT",
  38: "ARROW_UP",
  39: "ARROW_RIGHT",
  40: "ARROW_DOWN"
};
var commands = {};
function findFocusable($element) {
  if (!$element) {
    return false;
  }
  return $element.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
    if (!$(this).is(":visible") || $(this).attr("tabindex") < 0) {
      return false;
    }
    return true;
  }).sort(function(a, b) {
    if ($(a).attr("tabindex") === $(b).attr("tabindex")) {
      return 0;
    }
    let aTabIndex = parseInt($(a).attr("tabindex"), 10), bTabIndex = parseInt($(b).attr("tabindex"), 10);
    if (typeof $(a).attr("tabindex") === "undefined" && bTabIndex > 0) {
      return 1;
    }
    if (typeof $(b).attr("tabindex") === "undefined" && aTabIndex > 0) {
      return -1;
    }
    if (aTabIndex === 0 && bTabIndex > 0) {
      return 1;
    }
    if (bTabIndex === 0 && aTabIndex > 0) {
      return -1;
    }
    if (aTabIndex < bTabIndex) {
      return -1;
    }
    if (aTabIndex > bTabIndex) {
      return 1;
    }
  });
}
function parseKey(event2) {
  var key = keyCodes[event2.which || event2.keyCode] || String.fromCharCode(event2.which).toUpperCase();
  key = key.replace(/\W+/, "");
  if (event2.shiftKey) key = `SHIFT_${key}`;
  if (event2.ctrlKey) key = `CTRL_${key}`;
  if (event2.altKey) key = `ALT_${key}`;
  key = key.replace(/_$/, "");
  return key;
}
var Keyboard = {
  keys: getKeyCodes(keyCodes),
  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey,
  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey(event2, component, functions) {
    var commandList = commands[component], keyCode = this.parseKey(event2), cmds, command, fn;
    if (!commandList) return console.warn("Component not defined!");
    if (event2.zfIsKeyHandled === true) return;
    if (typeof commandList.ltr === "undefined") {
      cmds = commandList;
    } else {
      if (rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);
      else cmds = $.extend({}, commandList.rtl, commandList.ltr);
    }
    command = cmds[keyCode];
    fn = functions[command];
    if (fn && typeof fn === "function") {
      var returnValue = fn.apply();
      event2.zfIsKeyHandled = true;
      if (functions.handled || typeof functions.handled === "function") {
        functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === "function") {
        functions.unhandled();
      }
    }
  },
  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */
  findFocusable,
  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */
  register(componentName, cmds) {
    commands[componentName] = cmds;
  },
  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //
  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus($element) {
    var $focusable = findFocusable($element), $firstFocusable = $focusable.eq(0), $lastFocusable = $focusable.eq(-1);
    $element.on("keydown.zf.trapfocus", function(event2) {
      if (event2.target === $lastFocusable[0] && parseKey(event2) === "TAB") {
        event2.preventDefault();
        $firstFocusable.focus();
      } else if (event2.target === $firstFocusable[0] && parseKey(event2) === "SHIFT_TAB") {
        event2.preventDefault();
        $lastFocusable.focus();
      }
    });
  },
  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus($element) {
    $element.off("keydown.zf.trapfocus");
  }
};
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) {
    if (kcs.hasOwnProperty(kc)) k[kcs[kc]] = kcs[kc];
  }
  return k;
}
var Box = {
  ImNotTouchingYou,
  OverlapArea,
  GetDimensions,
  GetExplicitOffsets
};
function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
}
function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
  var eleDims = GetDimensions(element), topOver, bottomOver, leftOver, rightOver;
  if (parent) {
    var parDims = GetDimensions(parent);
    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - parDims.offset.top;
    leftOver = eleDims.offset.left - parDims.offset.left;
    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
  } else {
    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
  }
  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
  topOver = Math.min(topOver, 0);
  leftOver = Math.min(leftOver, 0);
  rightOver = Math.min(rightOver, 0);
  if (lrOnly) {
    return leftOver + rightOver;
  }
  if (tbOnly) {
    return topOver + bottomOver;
  }
  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
}
function GetDimensions(elem) {
  elem = elem.length ? elem[0] : elem;
  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }
  var rect = elem.getBoundingClientRect(), parRect = elem.parentNode.getBoundingClientRect(), winRect = document.body.getBoundingClientRect(), winY = window.pageYOffset, winX = window.pageXOffset;
  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  };
}
function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element), $anchorDims = anchor ? GetDimensions(anchor) : null;
  var topVal, leftVal;
  if ($anchorDims !== null) {
    switch (position) {
      case "top":
        topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
        break;
      case "bottom":
        topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
        break;
      case "left":
        leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
        break;
      case "right":
        leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
        break;
    }
    switch (position) {
      case "top":
      case "bottom":
        switch (alignment) {
          case "left":
            leftVal = $anchorDims.offset.left + hOffset;
            break;
          case "right":
            leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
            break;
          case "center":
            leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
            break;
        }
        break;
      case "right":
      case "left":
        switch (alignment) {
          case "bottom":
            topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
            break;
          case "top":
            topVal = $anchorDims.offset.top + vOffset;
            break;
          case "center":
            topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
            break;
        }
        break;
    }
  }
  return { top: topVal, left: leftVal };
}
const Nest = {
  Feather(menu, type3 = "zf") {
    menu.attr("role", "menubar");
    menu.find("a").attr({ "role": "menuitem" });
    var items = menu.find("li").attr({ "role": "none" }), subMenuClass = `is-${type3}-submenu`, subItemClass = `${subMenuClass}-item`, hasSubClass = `is-${type3}-submenu-parent`, applyAria = type3 !== "accordion";
    items.each(function() {
      var $item = $(this), $sub = $item.children("ul");
      if ($sub.length) {
        $item.addClass(hasSubClass);
        if (applyAria) {
          const firstItem = $item.children("a:first");
          firstItem.attr({
            "aria-haspopup": true,
            "aria-label": firstItem.attr("aria-label") || firstItem.text()
          });
          if (type3 === "drilldown") {
            $item.attr({ "aria-expanded": false });
          }
        }
        $sub.addClass(`submenu ${subMenuClass}`).attr({
          "data-submenu": "",
          "role": "menubar"
        });
        if (type3 === "drilldown") {
          $sub.attr({ "aria-hidden": true });
        }
      }
      if ($item.parent("[data-submenu]").length) {
        $item.addClass(`is-submenu-item ${subItemClass}`);
      }
    });
    return;
  },
  Burn(menu, type3) {
    var subMenuClass = `is-${type3}-submenu`, subItemClass = `${subMenuClass}-item`, hasSubClass = `is-${type3}-submenu-parent`;
    menu.find(">li, > li > ul, .menu, .menu > li, [data-submenu] > li").removeClass(`${subMenuClass} ${subItemClass} ${hasSubClass} is-submenu-item submenu is-active`).removeAttr("data-submenu").css("display", "");
  }
};
var Touch = {};
var startPosX, startTime, elapsedTime, startEvent, isMoving = false, didMoved = false;
function onTouchEnd(e) {
  this.removeEventListener("touchmove", onTouchMove);
  this.removeEventListener("touchend", onTouchEnd);
  if (!didMoved) {
    var tapEvent = $.Event("tap", startEvent || e);
    $(this).trigger(tapEvent);
  }
  startEvent = null;
  isMoving = false;
  didMoved = false;
}
function onTouchMove(e) {
  if (true === $.spotSwipe.preventDefault) {
    e.preventDefault();
  }
  if (isMoving) {
    var x = e.touches[0].pageX;
    var dx = startPosX - x;
    var dir;
    didMoved = true;
    elapsedTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
    if (Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
      dir = dx > 0 ? "left" : "right";
    }
    if (dir) {
      e.preventDefault();
      onTouchEnd.apply(this, arguments);
      $(this).trigger($.Event("swipe", Object.assign({}, e)), dir).trigger($.Event(`swipe${dir}`, Object.assign({}, e)));
    }
  }
}
function onTouchStart(e) {
  if (e.touches.length === 1) {
    startPosX = e.touches[0].pageX;
    startEvent = e;
    isMoving = true;
    didMoved = false;
    startTime = (/* @__PURE__ */ new Date()).getTime();
    this.addEventListener("touchmove", onTouchMove, { passive: true === $.spotSwipe.preventDefault });
    this.addEventListener("touchend", onTouchEnd, false);
  }
}
function init$1() {
  this.addEventListener && this.addEventListener("touchstart", onTouchStart, { passive: true });
}
class SpotSwipe {
  constructor() {
    this.version = "1.0.0";
    this.enabled = "ontouchstart" in document.documentElement;
    this.preventDefault = false;
    this.moveThreshold = 75;
    this.timeThreshold = 200;
    this._init();
  }
  _init() {
    $.event.special.swipe = { setup: init$1 };
    $.event.special.tap = { setup: init$1 };
    $.each(["left", "up", "down", "right"], function() {
      $.event.special[`swipe${this}`] = { setup: function() {
        $(this).on("swipe", $.noop);
      } };
    });
  }
}
Touch.setupSpotSwipe = function() {
  $.spotSwipe = new SpotSwipe($);
};
Touch.setupTouchHandler = function() {
  $.fn.addTouch = function() {
    this.each(function(i, el) {
      $(el).bind("touchstart touchmove touchend touchcancel", function(event2) {
        handleTouch(event2);
      });
    });
    var handleTouch = function(event2) {
      var touches = event2.changedTouches, first = touches[0], eventTypes = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
      }, type3 = eventTypes[event2.type], simulatedEvent;
      if ("MouseEvent" in window && typeof window.MouseEvent === "function") {
        simulatedEvent = new window.MouseEvent(type3, {
          "bubbles": true,
          "cancelable": true,
          "screenX": first.screenX,
          "screenY": first.screenY,
          "clientX": first.clientX,
          "clientY": first.clientY
        });
      } else {
        simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type3, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
      }
      first.target.dispatchEvent(simulatedEvent);
    };
  };
};
Touch.init = function() {
  if (typeof $.spotSwipe === "undefined") {
    Touch.setupSpotSwipe($);
    Touch.setupTouchHandler($);
  }
};
const initClasses = ["mui-enter", "mui-leave"];
const activeClasses = ["mui-enter-active", "mui-leave-active"];
const Motion = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },
  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};
function Move(duration, elem, fn) {
  var anim, prog, start = null;
  if (duration === 0) {
    fn.apply(elem);
    elem.trigger("finished.zf.animate", [elem]).triggerHandler("finished.zf.animate", [elem]);
    return;
  }
  function move(ts) {
    if (!start) start = ts;
    prog = ts - start;
    fn.apply(elem);
    if (prog < duration) {
      anim = window.requestAnimationFrame(move, elem);
    } else {
      window.cancelAnimationFrame(anim);
      elem.trigger("finished.zf.animate", [elem]).triggerHandler("finished.zf.animate", [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
}
function animate(isIn, element, animation, cb) {
  element = $(element).eq(0);
  if (!element.length) return;
  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];
  reset();
  element.addClass(animation).css("transition", "none");
  requestAnimationFrame(() => {
    element.addClass(initClass);
    if (isIn) element.show();
  });
  requestAnimationFrame(() => {
    element[0].offsetWidth;
    element.css("transition", "").addClass(activeClass);
  });
  element.one(transitionend(element), finish);
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(`${initClass} ${activeClass} ${animation}`);
  }
}
const MutationObserver = function() {
  var prefixes = ["WebKit", "Moz", "O", "Ms", ""];
  for (var i = 0; i < prefixes.length; i++) {
    if (`${prefixes[i]}MutationObserver` in window) {
      return window[`${prefixes[i]}MutationObserver`];
    }
  }
  return false;
}();
const triggers = (el, type3) => {
  el.data(type3).split(" ").forEach((id) => {
    $(`#${id}`)[type3 === "close" ? "trigger" : "triggerHandler"](`${type3}.zf.trigger`, [el]);
  });
};
var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
};
Triggers.Listeners.Basic = {
  openListener: function() {
    triggers($(this), "open");
  },
  closeListener: function() {
    let id = $(this).data("close");
    if (id) {
      triggers($(this), "close");
    } else {
      $(this).trigger("close.zf.trigger");
    }
  },
  toggleListener: function() {
    let id = $(this).data("toggle");
    if (id) {
      triggers($(this), "toggle");
    } else {
      $(this).trigger("toggle.zf.trigger");
    }
  },
  closeableListener: function(e) {
    let animation = $(this).data("closable");
    e.stopPropagation();
    if (animation !== "") {
      Motion.animateOut($(this), animation, function() {
        $(this).trigger("closed.zf");
      });
    } else {
      $(this).fadeOut().trigger("closed.zf");
    }
  },
  toggleFocusListener: function() {
    let id = $(this).data("toggle-focus");
    $(`#${id}`).triggerHandler("toggle.zf.trigger", [$(this)]);
  }
};
Triggers.Initializers.addOpenListener = ($elem) => {
  $elem.off("click.zf.trigger", Triggers.Listeners.Basic.openListener);
  $elem.on("click.zf.trigger", "[data-open]", Triggers.Listeners.Basic.openListener);
};
Triggers.Initializers.addCloseListener = ($elem) => {
  $elem.off("click.zf.trigger", Triggers.Listeners.Basic.closeListener);
  $elem.on("click.zf.trigger", "[data-close]", Triggers.Listeners.Basic.closeListener);
};
Triggers.Initializers.addToggleListener = ($elem) => {
  $elem.off("click.zf.trigger", Triggers.Listeners.Basic.toggleListener);
  $elem.on("click.zf.trigger", "[data-toggle]", Triggers.Listeners.Basic.toggleListener);
};
Triggers.Initializers.addCloseableListener = ($elem) => {
  $elem.off("close.zf.trigger", Triggers.Listeners.Basic.closeableListener);
  $elem.on("close.zf.trigger", "[data-closeable], [data-closable]", Triggers.Listeners.Basic.closeableListener);
};
Triggers.Initializers.addToggleFocusListener = ($elem) => {
  $elem.off("focus.zf.trigger blur.zf.trigger", Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", Triggers.Listeners.Basic.toggleFocusListener);
};
Triggers.Listeners.Global = {
  resizeListener: function($nodes) {
    if (!MutationObserver) {
      $nodes.each(function() {
        $(this).triggerHandler("resizeme.zf.trigger");
      });
    }
    $nodes.attr("data-events", "resize");
  },
  scrollListener: function($nodes) {
    if (!MutationObserver) {
      $nodes.each(function() {
        $(this).triggerHandler("scrollme.zf.trigger");
      });
    }
    $nodes.attr("data-events", "scroll");
  },
  closeMeListener: function(e, pluginId) {
    let plugin = e.namespace.split(".")[0];
    let plugins = $(`[data-${plugin}]`).not(`[data-yeti-box="${pluginId}"]`);
    plugins.each(function() {
      let _this = $(this);
      _this.triggerHandler("close.zf.trigger", [_this]);
    });
  }
};
Triggers.Initializers.addClosemeListener = function(pluginName) {
  var yetiBoxes = $("[data-yeti-box]"), plugNames = ["dropdown", "tooltip", "reveal"];
  if (pluginName) {
    if (typeof pluginName === "string") {
      plugNames.push(pluginName);
    } else if (typeof pluginName === "object" && typeof pluginName[0] === "string") {
      plugNames = plugNames.concat(pluginName);
    } else {
      console.error("Plugin names must be strings");
    }
  }
  if (yetiBoxes.length) {
    let listeners = plugNames.map((name) => {
      return `closeme.zf.${name}`;
    }).join(" ");
    $(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
};
function debounceGlobalListener(debounce, trigger, listener) {
  let timer, args = Array.prototype.slice.call(arguments, 3);
  $(window).on(trigger, function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      listener.apply(null, args);
    }, debounce || 10);
  });
}
Triggers.Initializers.addResizeListener = function(debounce) {
  let $nodes = $("[data-resize]");
  if ($nodes.length) {
    debounceGlobalListener(debounce, "resize.zf.trigger", Triggers.Listeners.Global.resizeListener, $nodes);
  }
};
Triggers.Initializers.addScrollListener = function(debounce) {
  let $nodes = $("[data-scroll]");
  if ($nodes.length) {
    debounceGlobalListener(debounce, "scroll.zf.trigger", Triggers.Listeners.Global.scrollListener, $nodes);
  }
};
Triggers.Initializers.addMutationEventsListener = function($elem) {
  if (!MutationObserver) {
    return false;
  }
  let $nodes = $elem.find("[data-resize], [data-scroll], [data-mutate]");
  var listeningElementsMutation = function(mutationRecordsList) {
    var $target = $(mutationRecordsList[0].target);
    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler("scrollme.zf.trigger", [$target, window.pageYOffset]);
        }
        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler("resizeme.zf.trigger", [$target]);
        }
        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events", "mutate");
          $target.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [$target.closest("[data-mutate]")]);
        }
        break;
      case "childList":
        $target.closest("[data-mutate]").attr("data-events", "mutate");
        $target.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [$target.closest("[data-mutate]")]);
        break;
      default:
        return false;
    }
  };
  if ($nodes.length) {
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
    }
  }
};
Triggers.Initializers.addSimpleListeners = function() {
  let $document = $(document);
  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);
};
Triggers.Initializers.addGlobalListeners = function() {
  let $document = $(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener(250);
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
};
Triggers.init = function(__, Foundation2) {
  onLoad($(window), function() {
    if ($.triggersInitialized !== true) {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
      $.triggersInitialized = true;
    }
  });
  if (Foundation2) {
    Foundation2.Triggers = Triggers;
    Foundation2.IHearYou = Triggers.Initializers.addGlobalListeners;
  }
};
function onImagesLoaded(images, callback) {
  var unloaded = images.length;
  if (unloaded === 0) {
    callback();
  }
  images.each(function() {
    if (this.complete && typeof this.naturalWidth !== "undefined") {
      singleImageLoaded();
    } else {
      var image = new Image();
      var events2 = "load.zf.images error.zf.images";
      $(image).one(events2, function me() {
        $(this).off(events2, me);
        singleImageLoaded();
      });
      image.src = $(this).attr("src");
    }
  });
  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}
function Timer(elem, options, cb) {
  var _this = this, duration = options.duration, nameSpace = Object.keys(elem.data())[0] || "timer", remain = -1, start, timer;
  this.isPaused = false;
  this.restart = function() {
    remain = -1;
    clearTimeout(timer);
    this.start();
  };
  this.start = function() {
    this.isPaused = false;
    clearTimeout(timer);
    remain = remain <= 0 ? duration : remain;
    elem.data("paused", false);
    start = Date.now();
    timer = setTimeout(function() {
      if (options.infinite) {
        _this.restart();
      }
      if (cb && typeof cb === "function") {
        cb();
      }
    }, remain);
    elem.trigger(`timerstart.zf.${nameSpace}`);
  };
  this.pause = function() {
    this.isPaused = true;
    clearTimeout(timer);
    elem.data("paused", true);
    var end = Date.now();
    remain = remain - (end - start);
    elem.trigger(`timerpaused.zf.${nameSpace}`);
  };
}
class Plugin {
  constructor(element, options) {
    this._setup(element, options);
    var pluginName = getPluginName(this);
    this.uuid = GetYoDigits(6, pluginName);
    if (!this.$element.attr(`data-${pluginName}`)) {
      this.$element.attr(`data-${pluginName}`, this.uuid);
    }
    if (!this.$element.data("zfPlugin")) {
      this.$element.data("zfPlugin", this);
    }
    this.$element.trigger(`init.zf.${pluginName}`);
  }
  destroy() {
    this._destroy();
    var pluginName = getPluginName(this);
    this.$element.removeAttr(`data-${pluginName}`).removeData("zfPlugin").trigger(`destroyed.zf.${pluginName}`);
    for (var prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = null;
      }
    }
  }
}
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function getPluginName(obj) {
  return hyphenate(obj.className);
}
const POSITIONS = ["left", "right", "top", "bottom"];
const VERTICAL_ALIGNMENTS = ["top", "bottom", "center"];
const HORIZONTAL_ALIGNMENTS = ["left", "right", "center"];
const ALIGNMENTS = {
  "left": VERTICAL_ALIGNMENTS,
  "right": VERTICAL_ALIGNMENTS,
  "top": HORIZONTAL_ALIGNMENTS,
  "bottom": HORIZONTAL_ALIGNMENTS
};
function nextItem(item, array) {
  var currentIdx = array.indexOf(item);
  if (currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}
class Positionable extends Plugin {
  /**
   * Abstract class encapsulating the tether-like explicit positioning logic
   * including repositioning based on overlap.
   * Expects classes to define defaults for vOffset, hOffset, position,
   * alignment, allowOverlap, and allowBottomOverlap. They can do this by
   * extending the defaults, or (for now recommended due to the way docs are
   * generated) by explicitly declaring them.
   *
   **/
  _init() {
    this.triedPositions = {};
    this.position = this.options.position === "auto" ? this._getDefaultPosition() : this.options.position;
    this.alignment = this.options.alignment === "auto" ? this._getDefaultAlignment() : this.options.alignment;
    this.originalPosition = this.position;
    this.originalAlignment = this.alignment;
  }
  _getDefaultPosition() {
    return "bottom";
  }
  _getDefaultAlignment() {
    switch (this.position) {
      case "bottom":
      case "top":
        return rtl() ? "right" : "left";
      case "left":
      case "right":
        return "bottom";
    }
  }
  /**
   * Adjusts the positionable possible positions by iterating through alignments
   * and positions.
   * @function
   * @private
   */
  _reposition() {
    if (this._alignmentsExhausted(this.position)) {
      this.position = nextItem(this.position, POSITIONS);
      this.alignment = ALIGNMENTS[this.position][0];
    } else {
      this._realign();
    }
  }
  /**
   * Adjusts the dropdown pane possible positions by iterating through alignments
   * on the current position.
   * @function
   * @private
   */
  _realign() {
    this._addTriedPosition(this.position, this.alignment);
    this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
  }
  _addTriedPosition(position, alignment) {
    this.triedPositions[position] = this.triedPositions[position] || [];
    this.triedPositions[position].push(alignment);
  }
  _positionsExhausted() {
    var isExhausted = true;
    for (var i = 0; i < POSITIONS.length; i++) {
      isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
    }
    return isExhausted;
  }
  _alignmentsExhausted(position) {
    return this.triedPositions[position] && this.triedPositions[position].length === ALIGNMENTS[position].length;
  }
  // When we're trying to center, we don't want to apply offset that's going to
  // take us just off center, so wrap around to return 0 for the appropriate
  // offset in those alignments.  TODO: Figure out if we want to make this
  // configurable behavior... it feels more intuitive, especially for tooltips, but
  // it's possible someone might actually want to start from center and then nudge
  // slightly off.
  _getVOffset() {
    return this.options.vOffset;
  }
  _getHOffset() {
    return this.options.hOffset;
  }
  _setPosition($anchor, $element, $parent) {
    if ($anchor.attr("aria-expanded") === "false") {
      return false;
    }
    if (!this.options.allowOverlap) {
      this.position = this.originalPosition;
      this.alignment = this.originalAlignment;
    }
    $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
    if (!this.options.allowOverlap) {
      var minOverlap = 1e8;
      var minCoordinates = { position: this.position, alignment: this.alignment };
      while (!this._positionsExhausted()) {
        let overlap = Box.OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);
        if (overlap === 0) {
          return;
        }
        if (overlap < minOverlap) {
          minOverlap = overlap;
          minCoordinates = { position: this.position, alignment: this.alignment };
        }
        this._reposition();
        $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
      }
      this.position = minCoordinates.position;
      this.alignment = minCoordinates.alignment;
      $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
    }
  }
}
Positionable.defaults = {
  /**
   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: "auto",
  /**
   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: "auto",
  /**
   * Allow overlap of container/window. If false, dropdown positionable first
   * try to position as defined by data-position and data-alignment, but
   * reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Number of pixels the positionable should be separated vertically from anchor
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels the positionable should be separated horizontally from anchor
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0
};
class Dropdown extends Positionable {
  /**
   * Creates a new instance of a dropdown.
   * @class
   * @name Dropdown
   * @param {jQuery} element - jQuery object to make into a dropdown.
   *        Object should be of the dropdown panel, rather than its anchor.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);
    this.className = "Dropdown";
    Touch.init($);
    Triggers.init($);
    this._init();
    Keyboard.register("Dropdown", {
      "ENTER": "toggle",
      "SPACE": "toggle",
      "ESCAPE": "close"
    });
  }
  /**
   * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
   * @function
   * @private
   */
  _init() {
    var $id = this.$element.attr("id");
    this.$anchors = $(`[data-toggle="${$id}"]`).length ? $(`[data-toggle="${$id}"]`) : $(`[data-open="${$id}"]`);
    this.$anchors.attr({
      "aria-controls": $id,
      "data-is-focus": false,
      "data-yeti-box": $id,
      "aria-haspopup": true,
      "aria-expanded": false
    });
    this._setCurrentAnchor(this.$anchors.first());
    if (this.options.parentClass) {
      this.$parent = this.$element.parents("." + this.options.parentClass);
    } else {
      this.$parent = null;
    }
    if (typeof this.$element.attr("aria-labelledby") === "undefined") {
      if (typeof this.$currentAnchor.attr("id") === "undefined") {
        this.$currentAnchor.attr("id", GetYoDigits(6, "dd-anchor"));
      }
      this.$element.attr("aria-labelledby", this.$currentAnchor.attr("id"));
    }
    this.$element.attr({
      "aria-hidden": "true",
      "data-yeti-box": $id,
      "data-resize": $id
    });
    super._init();
    this._events();
  }
  _getDefaultPosition() {
    var position = this.$element[0].className.match(/(top|left|right|bottom)/g);
    if (position) {
      return position[0];
    } else {
      return "bottom";
    }
  }
  _getDefaultAlignment() {
    var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.attr("class"));
    if (horizontalPosition) {
      return horizontalPosition[1];
    }
    return super._getDefaultAlignment();
  }
  /**
   * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
   * Recursively calls itself if a collision is detected, with a new position class.
   * @function
   * @private
   */
  _setPosition() {
    this.$element.removeClass(`has-position-${this.position} has-alignment-${this.alignment}`);
    super._setPosition(this.$currentAnchor, this.$element, this.$parent);
    this.$element.addClass(`has-position-${this.position} has-alignment-${this.alignment}`);
  }
  /**
   * Make it a current anchor.
   * Current anchor as the reference for the position of Dropdown panes.
   * @param {HTML} el - DOM element of the anchor.
   * @function
   * @private
   */
  _setCurrentAnchor(el) {
    this.$currentAnchor = $(el);
  }
  /**
   * Adds event listeners to the element utilizing the triggers utility library.
   * @function
   * @private
   */
  _events() {
    var _this = this, hasTouch = "ontouchstart" in window || typeof window.ontouchstart !== "undefined";
    this.$element.on({
      "open.zf.trigger": this.open.bind(this),
      "close.zf.trigger": this.close.bind(this),
      "toggle.zf.trigger": this.toggle.bind(this),
      "resizeme.zf.trigger": this._setPosition.bind(this)
    });
    this.$anchors.off("click.zf.trigger").on("click.zf.trigger", function(e) {
      _this._setCurrentAnchor(this);
      if (
        // if forceFollow false, always prevent default action
        _this.options.forceFollow === false || // if forceFollow true and hover option true, only prevent default action on 1st click
        // on 2nd click (dropown opened) the default action (e.g. follow a href) gets executed
        hasTouch && _this.options.hover && _this.$element.hasClass("is-open") === false
      ) {
        e.preventDefault();
      }
    });
    if (this.options.hover) {
      this.$anchors.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
        _this._setCurrentAnchor(this);
        var bodyData = $("body").data();
        if (typeof bodyData.whatinput === "undefined" || bodyData.whatinput === "mouse") {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function() {
            _this.open();
            _this.$anchors.data("hover", true);
          }, _this.options.hoverDelay);
        }
      }).on("mouseleave.zf.dropdown", ignoreMousedisappear(function() {
        clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function() {
          _this.close();
          _this.$anchors.data("hover", false);
        }, _this.options.hoverDelay);
      }));
      if (this.options.hoverPane) {
        this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
          clearTimeout(_this.timeout);
        }).on("mouseleave.zf.dropdown", ignoreMousedisappear(function() {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function() {
            _this.close();
            _this.$anchors.data("hover", false);
          }, _this.options.hoverDelay);
        }));
      }
    }
    this.$anchors.add(this.$element).on("keydown.zf.dropdown", function(e) {
      var $target = $(this);
      Keyboard.handleKey(e, "Dropdown", {
        open: function() {
          if ($target.is(_this.$anchors) && !$target.is("input, textarea")) {
            _this.open();
            _this.$element.attr("tabindex", -1).focus();
            e.preventDefault();
          }
        },
        close: function() {
          _this.close();
          _this.$anchors.focus();
        }
      });
    });
  }
  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  _addBodyHandler() {
    var $body = $(document.body).not(this.$element), _this = this;
    $body.off("click.zf.dropdown tap.zf.dropdown").on("click.zf.dropdown tap.zf.dropdown", function(e) {
      if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
        return;
      }
      if (_this.$element.is(e.target) || _this.$element.find(e.target).length) {
        return;
      }
      _this.close();
      $body.off("click.zf.dropdown tap.zf.dropdown");
    });
  }
  /**
   * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
   * @function
   * @fires Dropdown#closeme
   * @fires Dropdown#show
   */
  open() {
    this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id"));
    this.$anchors.addClass("hover").attr({ "aria-expanded": true });
    this.$element.addClass("is-opening");
    this._setPosition();
    this.$element.removeClass("is-opening").addClass("is-open").attr({ "aria-hidden": false });
    if (this.options.autoFocus) {
      var $focusable = Keyboard.findFocusable(this.$element);
      if ($focusable.length) {
        $focusable.eq(0).focus();
      }
    }
    if (this.options.closeOnClick) {
      this._addBodyHandler();
    }
    if (this.options.trapFocus) {
      Keyboard.trapFocus(this.$element);
    }
    this.$element.trigger("show.zf.dropdown", [this.$element]);
  }
  /**
   * Closes the open dropdown pane.
   * @function
   * @fires Dropdown#hide
   */
  close() {
    if (!this.$element.hasClass("is-open")) {
      return false;
    }
    this.$element.removeClass("is-open").attr({ "aria-hidden": true });
    this.$anchors.removeClass("hover").attr("aria-expanded", false);
    this.$element.trigger("hide.zf.dropdown", [this.$element]);
    if (this.options.trapFocus) {
      Keyboard.releaseFocus(this.$element);
    }
  }
  /**
   * Toggles the dropdown pane's visibility.
   * @function
   */
  toggle() {
    if (this.$element.hasClass("is-open")) {
      if (this.$anchors.data("hover")) return;
      this.close();
    } else {
      this.open();
    }
  }
  /**
   * Destroys the dropdown.
   * @function
   */
  _destroy() {
    this.$element.off(".zf.trigger").hide();
    this.$anchors.off(".zf.dropdown");
    $(document.body).off("click.zf.dropdown tap.zf.dropdown");
  }
}
Dropdown.defaults = {
  /**
   * Class that designates bounding container of Dropdown (default: window)
   * @option
   * @type {?string}
   * @default null
   */
  parentClass: null,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 250
   */
  hoverDelay: 250,
  /**
   * Allow submenus to open on hover events
   * @option
   * @type {boolean}
   * @default false
   */
  hover: false,
  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @type {boolean}
   * @default false
   */
  hoverPane: false,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * Position of dropdown. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: "auto",
  /**
   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: "auto",
  /**
   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false,
  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,
  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,
  /**
   * If true the default action of the toggle (e.g. follow a link with href) gets executed on click. If hover option is also true the default action gets prevented on first click for mobile / touch devices and executed on second click.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};
class DropdownMenu extends Plugin {
  /**
   * Creates a new instance of DropdownMenu.
   * @class
   * @name DropdownMenu
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);
    this.className = "DropdownMenu";
    Touch.init($);
    this._init();
    Keyboard.register("DropdownMenu", {
      "ENTER": "open",
      "SPACE": "open",
      "ARROW_RIGHT": "next",
      "ARROW_UP": "up",
      "ARROW_DOWN": "down",
      "ARROW_LEFT": "previous",
      "ESCAPE": "close"
    });
  }
  /**
   * Initializes the plugin, and calls _prepareMenu
   * @private
   * @function
   */
  _init() {
    Nest.Feather(this.$element, "dropdown");
    var subs = this.$element.find("li.is-dropdown-submenu-parent");
    this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub");
    this.$menuItems = this.$element.find('li[role="none"]');
    this.$tabs = this.$element.children('li[role="none"]');
    this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass);
    if (this.options.alignment === "auto") {
      if (this.$element.hasClass(this.options.rightClass) || rtl() || this.$element.parents(".top-bar-right").is("*")) {
        this.options.alignment = "right";
        subs.addClass("opens-left");
      } else {
        this.options.alignment = "left";
        subs.addClass("opens-right");
      }
    } else {
      if (this.options.alignment === "right") {
        subs.addClass("opens-left");
      } else {
        subs.addClass("opens-right");
      }
    }
    this.changed = false;
    this._events();
  }
  _isVertical() {
    return this.$tabs.css("display") === "block" || this.$element.css("flex-direction") === "column";
  }
  _isRtl() {
    return this.$element.hasClass("align-right") || rtl() && !this.$element.hasClass("align-left");
  }
  /**
   * Adds event listeners to elements within the menu
   * @private
   * @function
   */
  _events() {
    var _this = this, hasTouch = "ontouchstart" in window || typeof window.ontouchstart !== "undefined", parClass = "is-dropdown-submenu-parent";
    var handleClickFn = function(e) {
      var $elem = $(e.target).parentsUntil("ul", `.${parClass}`), hasSub = $elem.hasClass(parClass), hasClicked = $elem.attr("data-is-click") === "true", $sub = $elem.children(".is-dropdown-submenu");
      if (hasSub) {
        if (hasClicked) {
          if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
            return;
          }
          e.stopImmediatePropagation();
          e.preventDefault();
          _this._hide($elem);
        } else {
          e.stopImmediatePropagation();
          e.preventDefault();
          _this._show($sub);
          $elem.add($elem.parentsUntil(_this.$element, `.${parClass}`)).attr("data-is-click", true);
        }
      }
    };
    if (this.options.clickOpen || hasTouch) {
      this.$menuItems.on("click.zf.dropdownMenu touchstart.zf.dropdownMenu", handleClickFn);
    }
    if (_this.options.closeOnClickInside) {
      this.$menuItems.on("click.zf.dropdownMenu", function() {
        var $elem = $(this), hasSub = $elem.hasClass(parClass);
        if (!hasSub) {
          _this._hide();
        }
      });
    }
    if (hasTouch && this.options.disableHoverOnTouch) this.options.disableHover = true;
    if (!this.options.disableHover) {
      this.$menuItems.on("mouseenter.zf.dropdownMenu", function() {
        var $elem = $(this), hasSub = $elem.hasClass(parClass);
        if (hasSub) {
          clearTimeout($elem.data("_delay"));
          $elem.data("_delay", setTimeout(function() {
            _this._show($elem.children(".is-dropdown-submenu"));
          }, _this.options.hoverDelay));
        }
      }).on("mouseleave.zf.dropdownMenu", ignoreMousedisappear(function() {
        var $elem = $(this), hasSub = $elem.hasClass(parClass);
        if (hasSub && _this.options.autoclose) {
          if ($elem.attr("data-is-click") === "true" && _this.options.clickOpen) {
            return false;
          }
          clearTimeout($elem.data("_delay"));
          $elem.data("_delay", setTimeout(function() {
            _this._hide($elem);
          }, _this.options.closingTime));
        }
      }));
    }
    this.$menuItems.on("keydown.zf.dropdownMenu", function(e) {
      var $element = $(e.target).parentsUntil("ul", '[role="none"]'), isTab = _this.$tabs.index($element) > -1, $elements = isTab ? _this.$tabs : $element.siblings("li").add($element), $prevElement, $nextElement;
      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(i - 1);
          $nextElement = $elements.eq(i + 1);
          return;
        }
      });
      var nextSibling = function() {
        $nextElement.children("a:first").focus();
        e.preventDefault();
      }, prevSibling = function() {
        $prevElement.children("a:first").focus();
        e.preventDefault();
      }, openSub = function() {
        var $sub = $element.children("ul.is-dropdown-submenu");
        if ($sub.length) {
          _this._show($sub);
          $element.find("li > a:first").focus();
          e.preventDefault();
        } else {
          return;
        }
      }, closeSub = function() {
        var close = $element.parent("ul").parent("li");
        close.children("a:first").focus();
        _this._hide(close);
        e.preventDefault();
      };
      var functions = {
        open: openSub,
        close: function() {
          _this._hide(_this.$element);
          _this.$menuItems.eq(0).children("a").focus();
          e.preventDefault();
        }
      };
      if (isTab) {
        if (_this._isVertical()) {
          if (_this._isRtl()) {
            $.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: closeSub,
              previous: openSub
            });
          } else {
            $.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: openSub,
              previous: closeSub
            });
          }
        } else {
          if (_this._isRtl()) {
            $.extend(functions, {
              next: prevSibling,
              previous: nextSibling,
              down: openSub,
              up: closeSub
            });
          } else {
            $.extend(functions, {
              next: nextSibling,
              previous: prevSibling,
              down: openSub,
              up: closeSub
            });
          }
        }
      } else {
        if (_this._isRtl()) {
          $.extend(functions, {
            next: closeSub,
            previous: openSub,
            down: nextSibling,
            up: prevSibling
          });
        } else {
          $.extend(functions, {
            next: openSub,
            previous: closeSub,
            down: nextSibling,
            up: prevSibling
          });
        }
      }
      Keyboard.handleKey(e, "DropdownMenu", functions);
    });
  }
  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  _addBodyHandler() {
    const $body = $(document.body);
    this._removeBodyHandler();
    $body.on("click.zf.dropdownMenu tap.zf.dropdownMenu", (e) => {
      var isItself = !!$(e.target).closest(this.$element).length;
      if (isItself) return;
      this._hide();
      this._removeBodyHandler();
    });
  }
  /**
   * Remove the body event handler. See `_addBodyHandler`.
   * @function
   * @private
   */
  _removeBodyHandler() {
    $(document.body).off("click.zf.dropdownMenu tap.zf.dropdownMenu");
  }
  /**
   * Opens a dropdown pane, and checks for collisions first.
   * @param {jQuery} $sub - ul element that is a submenu to show
   * @function
   * @private
   * @fires DropdownMenu#show
   */
  _show($sub) {
    var idx = this.$tabs.index(this.$tabs.filter(function(i, el) {
      return $(el).find($sub).length > 0;
    }));
    var $sibs = $sub.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
    this._hide($sibs, idx);
    $sub.css("visibility", "hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");
    var clear = Box.ImNotTouchingYou($sub, null, true);
    if (!clear) {
      var oldClass = this.options.alignment === "left" ? "-right" : "-left", $parentLi = $sub.parent(".is-dropdown-submenu-parent");
      $parentLi.removeClass(`opens${oldClass}`).addClass(`opens-${this.options.alignment}`);
      clear = Box.ImNotTouchingYou($sub, null, true);
      if (!clear) {
        $parentLi.removeClass(`opens-${this.options.alignment}`).addClass("opens-inner");
      }
      this.changed = true;
    }
    $sub.css("visibility", "");
    if (this.options.closeOnClick) {
      this._addBodyHandler();
    }
    this.$element.trigger("show.zf.dropdownMenu", [$sub]);
  }
  /**
   * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
   * @function
   * @param {jQuery} $elem - element with a submenu to hide
   * @param {Number} idx - index of the $tabs collection to hide
   * @fires DropdownMenu#hide
   * @private
   */
  _hide($elem, idx) {
    var $toClose;
    if ($elem && $elem.length) {
      $toClose = $elem;
    } else if (typeof idx !== "undefined") {
      $toClose = this.$tabs.not(function(i) {
        return i === idx;
      });
    } else {
      $toClose = this.$element;
    }
    var somethingToClose = $toClose.hasClass("is-active") || $toClose.find(".is-active").length > 0;
    if (somethingToClose) {
      var $activeItem = $toClose.find("li.is-active");
      $activeItem.add($toClose).attr({
        "data-is-click": false
      }).removeClass("is-active");
      $toClose.find("ul.js-dropdown-active").removeClass("js-dropdown-active");
      if (this.changed || $toClose.find("opens-inner").length) {
        var oldClass = this.options.alignment === "left" ? "right" : "left";
        $toClose.find("li.is-dropdown-submenu-parent").add($toClose).removeClass(`opens-inner opens-${this.options.alignment}`).addClass(`opens-${oldClass}`);
        this.changed = false;
      }
      clearTimeout($activeItem.data("_delay"));
      this._removeBodyHandler();
      this.$element.trigger("hide.zf.dropdownMenu", [$toClose]);
    }
  }
  /**
   * Destroys the plugin.
   * @function
   */
  _destroy() {
    this.$menuItems.off(".zf.dropdownMenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner");
    $(document.body).off(".zf.dropdownMenu");
    Nest.Burn(this.$element, "dropdown");
  }
}
DropdownMenu.defaults = {
  /**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Disallows hover on touch devices
   * @option
   * @type {boolean}
   * @default true
   */
  disableHoverOnTouch: true,
  /**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
  autoclose: true,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
  hoverDelay: 50,
  /**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
  clickOpen: false,
  /**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */
  closingTime: 500,
  /**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: "auto",
  /**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClickInside: true,
  /**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
  verticalClass: "vertical",
  /**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
  rightClass: "align-right",
  /**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};
class Accordion extends Plugin {
  /**
   * Creates a new instance of an accordion.
   * @class
   * @name Accordion
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - a plain object with settings to override the default options.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);
    this.className = "Accordion";
    this._init();
    Keyboard.register("Accordion", {
      "ENTER": "toggle",
      "SPACE": "toggle",
      "ARROW_DOWN": "next",
      "ARROW_UP": "previous",
      "HOME": "first",
      "END": "last"
    });
  }
  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  _init() {
    this._isInitializing = true;
    this.$tabs = this.$element.children("[data-accordion-item]");
    this.$tabs.each(function(idx, el) {
      var $el = $(el), $content = $el.children("[data-tab-content]"), id = $content[0].id || GetYoDigits(6, "accordion"), linkId = el.id ? `${el.id}-label` : `${id}-label`;
      $el.find("a:first").attr({
        "aria-controls": id,
        "id": linkId,
        "aria-expanded": false
      });
      $content.attr({ "role": "region", "aria-labelledby": linkId, "aria-hidden": true, "id": id });
    });
    var $initActive = this.$element.find(".is-active").children("[data-tab-content]");
    if ($initActive.length) {
      this._initialAnchor = $initActive.prev("a").attr("href");
      this._openSingleTab($initActive);
    }
    this._checkDeepLink = () => {
      var anchor = window.location.hash;
      if (!anchor.length) {
        if (this._isInitializing) return;
        if (this._initialAnchor) anchor = this._initialAnchor;
      }
      var $anchor = anchor && $(anchor);
      var $link = anchor && this.$element.find(`[href$="${anchor}"]`);
      var isOwnAnchor = !!($anchor.length && $link.length);
      if (isOwnAnchor) {
        if ($anchor && $link && $link.length) {
          if (!$link.parent("[data-accordion-item]").hasClass("is-active")) {
            this._openSingleTab($anchor);
          }
        } else {
          this._closeAllTabs();
        }
        if (this.options.deepLinkSmudge) {
          onLoad($(window), () => {
            var offset = this.$element.offset();
            $("html, body").animate({ scrollTop: offset.top - this.options.deepLinkSmudgeOffset }, this.options.deepLinkSmudgeDelay);
          });
        }
        this.$element.trigger("deeplink.zf.accordion", [$link, $anchor]);
      }
    };
    if (this.options.deepLink) {
      this._checkDeepLink();
    }
    this._events();
    this._isInitializing = false;
  }
  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  _events() {
    var _this = this;
    this.$tabs.each(function() {
      var $elem = $(this);
      var $tabContent = $elem.children("[data-tab-content]");
      if ($tabContent.length) {
        $elem.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(e) {
          e.preventDefault();
          _this.toggle($tabContent);
        }).on("keydown.zf.accordion", function(e) {
          Keyboard.handleKey(e, "Accordion", {
            toggle: function() {
              _this.toggle($tabContent);
            },
            next: function() {
              var $a = $elem.next().find("a").focus();
              if (!_this.options.multiExpand) {
                $a.trigger("click.zf.accordion");
              }
            },
            previous: function() {
              var $a = $elem.prev().find("a").focus();
              if (!_this.options.multiExpand) {
                $a.trigger("click.zf.accordion");
              }
            },
            first: function() {
              var $a = _this.$tabs.first().find(".accordion-title").focus();
              if (!_this.options.multiExpand) {
                $a.trigger("click.zf.accordion");
              }
            },
            last: function() {
              var $a = _this.$tabs.last().find(".accordion-title").focus();
              if (!_this.options.multiExpand) {
                $a.trigger("click.zf.accordion");
              }
            },
            handled: function() {
              e.preventDefault();
            }
          });
        });
      }
    });
    if (this.options.deepLink) {
      $(window).on("hashchange", this._checkDeepLink);
    }
  }
  /**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
   * @function
   */
  toggle($target) {
    if ($target.closest("[data-accordion]").is("[disabled]")) {
      console.info("Cannot toggle an accordion that is disabled.");
      return;
    }
    if ($target.parent().hasClass("is-active")) {
      this.up($target);
    } else {
      this.down($target);
    }
    if (this.options.deepLink) {
      var anchor = $target.prev("a").attr("href");
      if (this.options.updateHistory) {
        history.pushState({}, "", anchor);
      } else {
        history.replaceState({}, "", anchor);
      }
    }
  }
  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
   * @fires Accordion#down
   * @function
   */
  down($target) {
    if ($target.closest("[data-accordion]").is("[disabled]")) {
      console.info("Cannot call down on an accordion that is disabled.");
      return;
    }
    if (this.options.multiExpand)
      this._openTab($target);
    else
      this._openSingleTab($target);
  }
  /**
   * Closes the tab defined by `$target`.
   * It may be ignored if the Accordion options don't allow it.
   *
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   */
  up($target) {
    if (this.$element.is("[disabled]")) {
      console.info("Cannot call up on an accordion that is disabled.");
      return;
    }
    const $targetItem = $target.parent();
    if (!$targetItem.hasClass("is-active")) return;
    const $othersItems = $targetItem.siblings();
    if (!this.options.allowAllClosed && !$othersItems.hasClass("is-active")) return;
    this._closeTab($target);
  }
  /**
   * Make the tab defined by `$target` the only opened tab, closing all others tabs.
   * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
   * @function
   * @private
   */
  _openSingleTab($target) {
    const $activeContents = this.$element.children(".is-active").children("[data-tab-content]");
    if ($activeContents.length) {
      this._closeTab($activeContents.not($target));
    }
    this._openTab($target);
  }
  /**
   * Opens the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
   * @fires Accordion#down
   * @function
   * @private
   */
  _openTab($target) {
    const $targetItem = $target.parent();
    const targetContentId = $target.attr("aria-labelledby");
    $target.attr("aria-hidden", false);
    $targetItem.addClass("is-active");
    $(`#${targetContentId}`).attr({
      "aria-expanded": true
    });
    $target.finish().slideDown(this.options.slideSpeed, () => {
      this.$element.trigger("down.zf.accordion", [$target]);
    });
  }
  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   * @private
   */
  _closeTab($target) {
    const $targetItem = $target.parent();
    const targetContentId = $target.attr("aria-labelledby");
    $target.attr("aria-hidden", true);
    $targetItem.removeClass("is-active");
    $(`#${targetContentId}`).attr({
      "aria-expanded": false
    });
    $target.finish().slideUp(this.options.slideSpeed, () => {
      this.$element.trigger("up.zf.accordion", [$target]);
    });
  }
  /**
   * Closes all active tabs
   * @fires Accordion#up
   * @function
   * @private
   */
  _closeAllTabs() {
    var $activeTabs = this.$element.children(".is-active").children("[data-tab-content]");
    if ($activeTabs.length) {
      this._closeTab($activeTabs);
    }
  }
  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */
  _destroy() {
    this.$element.find("[data-tab-content]").stop(true).slideUp(0).css("display", "");
    this.$element.find("a").off(".zf.accordion");
    if (this.options.deepLink) {
      $(window).off("hashchange", this._checkDeepLink);
    }
  }
}
Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,
  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,
  /**
   * Link the location hash to the open pane.
   * Set the location hash when the opened pane changes, and open and scroll to the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,
  /**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,
  /**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,
  /**
   * If `deepLinkSmudge` is enabled, the offset for scrollToTtop to prevent overlap by a sticky element at the top of the page
   * @option
   * @type {number}
   * @default 0
   */
  deepLinkSmudgeOffset: 0,
  /**
   * If `deepLink` is enabled, update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false
};
class AccordionMenu extends Plugin {
  /**
   * Creates a new instance of an accordion menu.
   * @class
   * @name AccordionMenu
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);
    this.className = "AccordionMenu";
    this._init();
    Keyboard.register("AccordionMenu", {
      "ENTER": "toggle",
      "SPACE": "toggle",
      "ARROW_RIGHT": "open",
      "ARROW_UP": "up",
      "ARROW_DOWN": "down",
      "ARROW_LEFT": "close",
      "ESCAPE": "closeAll"
    });
  }
  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  _init() {
    Nest.Feather(this.$element, "accordion");
    var _this = this;
    this.$element.find("[data-submenu]").not(".is-active").slideUp(0);
    this.$element.attr({
      "aria-multiselectable": this.options.multiOpen
    });
    this.$menuLinks = this.$element.find(".is-accordion-submenu-parent");
    this.$menuLinks.each(function() {
      var linkId = this.id || GetYoDigits(6, "acc-menu-link"), $elem = $(this), $sub = $elem.children("[data-submenu]"), subId = $sub[0].id || GetYoDigits(6, "acc-menu"), isActive = $sub.hasClass("is-active");
      if (_this.options.parentLink) {
        let $anchor = $elem.children("a");
        $anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
      }
      if (_this.options.submenuToggle) {
        $elem.addClass("has-submenu-toggle");
        $elem.children("a").after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + "</span></button>");
      } else {
        $elem.attr({
          "aria-controls": subId,
          "aria-expanded": isActive,
          "id": linkId
        });
      }
      $sub.attr({
        "aria-labelledby": linkId,
        "aria-hidden": !isActive,
        "role": "group",
        "id": subId
      });
    });
    var initPanes = this.$element.find(".is-active");
    if (initPanes.length) {
      initPanes.each(function() {
        _this.down($(this));
      });
    }
    this._events();
  }
  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  _events() {
    var _this = this;
    this.$element.find("li").each(function() {
      var $submenu = $(this).children("[data-submenu]");
      if ($submenu.length) {
        if (_this.options.submenuToggle) {
          $(this).children(".submenu-toggle").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function() {
            _this.toggle($submenu);
          });
        } else {
          $(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function(e) {
            e.preventDefault();
            _this.toggle($submenu);
          });
        }
      }
    }).on("keydown.zf.accordionMenu", function(e) {
      var $element = $(this), $elements = $element.parent("ul").children("li"), $prevElement, $nextElement, $target = $element.children("[data-submenu]");
      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i - 1)).find("a").first();
          $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find("a").first();
          if ($(this).children("[data-submenu]:visible").length) {
            $nextElement = $element.find("li:first-child").find("a").first();
          }
          if ($(this).is(":first-child")) {
            $prevElement = $element.parents("li").first().find("a").first();
          } else if ($prevElement.parents("li").first().children("[data-submenu]:visible").length) {
            $prevElement = $prevElement.parents("li").find("li:last-child").find("a").first();
          }
          if ($(this).is(":last-child")) {
            $nextElement = $element.parents("li").first().next("li").find("a").first();
          }
          return;
        }
      });
      Keyboard.handleKey(e, "AccordionMenu", {
        open: function() {
          if ($target.is(":hidden")) {
            _this.down($target);
            $target.find("li").first().find("a").first().focus();
          }
        },
        close: function() {
          if ($target.length && !$target.is(":hidden")) {
            _this.up($target);
          } else if ($element.parent("[data-submenu]").length) {
            _this.up($element.parent("[data-submenu]"));
            $element.parents("li").first().find("a").first().focus();
          }
        },
        up: function() {
          $prevElement.focus();
          return true;
        },
        down: function() {
          $nextElement.focus();
          return true;
        },
        toggle: function() {
          if (_this.options.submenuToggle) {
            return false;
          }
          if ($element.children("[data-submenu]").length) {
            _this.toggle($element.children("[data-submenu]"));
            return true;
          }
        },
        closeAll: function() {
          _this.hideAll();
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
        }
      });
    });
  }
  /**
   * Closes all panes of the menu.
   * @function
   */
  hideAll() {
    this.up(this.$element.find("[data-submenu]"));
  }
  /**
   * Opens all panes of the menu.
   * @function
   */
  showAll() {
    this.down(this.$element.find("[data-submenu]"));
  }
  /**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */
  toggle($target) {
    if (!$target.is(":animated")) {
      if (!$target.is(":hidden")) {
        this.up($target);
      } else {
        this.down($target);
      }
    }
  }
  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  down($target) {
    if (!this.options.multiOpen) {
      const $targetBranch = $target.parentsUntil(this.$element).add($target).add($target.find(".is-active"));
      const $othersActiveSubmenus = this.$element.find(".is-active").not($targetBranch);
      this.up($othersActiveSubmenus);
    }
    $target.addClass("is-active").attr({ "aria-hidden": false });
    if (this.options.submenuToggle) {
      $target.prev(".submenu-toggle").attr({ "aria-expanded": true });
    } else {
      $target.parent(".is-accordion-submenu-parent").attr({ "aria-expanded": true });
    }
    $target.slideDown(this.options.slideSpeed, () => {
      this.$element.trigger("down.zf.accordionMenu", [$target]);
    });
  }
  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  up($target) {
    const $submenus = $target.find("[data-submenu]");
    const $allmenus = $target.add($submenus);
    $submenus.slideUp(0);
    $allmenus.removeClass("is-active").attr("aria-hidden", true);
    if (this.options.submenuToggle) {
      $allmenus.prev(".submenu-toggle").attr("aria-expanded", false);
    } else {
      $allmenus.parent(".is-accordion-submenu-parent").attr("aria-expanded", false);
    }
    $target.slideUp(this.options.slideSpeed, () => {
      this.$element.trigger("up.zf.accordionMenu", [$target]);
    });
  }
  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  _destroy() {
    this.$element.find("[data-submenu]").slideDown(0).css("display", "");
    this.$element.find("a").off("click.zf.accordionMenu");
    this.$element.find("[data-is-parent-link]").detach();
    if (this.options.submenuToggle) {
      this.$element.find(".has-submenu-toggle").removeClass("has-submenu-toggle");
      this.$element.find(".submenu-toggle").remove();
    }
    Nest.Burn(this.$element, "accordion");
  }
}
AccordionMenu.defaults = {
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
  submenuToggle: false,
  /**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
  submenuToggleText: "Toggle menu",
  /**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
  multiOpen: true
};
class Drilldown extends Plugin {
  /**
   * Creates a new instance of a drilldown menu.
   * @class
   * @name Drilldown
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);
    this.className = "Drilldown";
    this._init();
    Keyboard.register("Drilldown", {
      "ENTER": "open",
      "SPACE": "open",
      "ARROW_RIGHT": "next",
      "ARROW_UP": "up",
      "ARROW_DOWN": "down",
      "ARROW_LEFT": "previous",
      "ESCAPE": "close"
    });
  }
  /**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */
  _init() {
    Nest.Feather(this.$element, "drilldown");
    if (this.options.autoApplyClass) {
      this.$element.addClass("drilldown");
    }
    this.$element.attr({
      "aria-multiselectable": false
    });
    this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a");
    this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]").attr("role", "group");
    this.$menuItems = this.$element.find("li").not(".js-drilldown-back").find("a");
    this.$currentMenu = this.$element;
    this.$element.attr("data-mutate", this.$element.attr("data-drilldown") || GetYoDigits(6, "drilldown"));
    this._prepareMenu();
    this._registerEvents();
    this._keyboardEvents();
  }
  /**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */
  _prepareMenu() {
    var _this = this;
    this.$submenuAnchors.each(function() {
      var $link = $(this);
      var $sub = $link.parent();
      if (_this.options.parentLink) {
        $link.clone().prependTo($sub.children("[data-submenu]")).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="none"></li>');
      }
      $link.data("savedHref", $link.attr("href")).removeAttr("href").attr("tabindex", 0);
      $link.children("[data-submenu]").attr({
        "aria-hidden": true,
        "tabindex": 0,
        "role": "group"
      });
      _this._events($link);
    });
    this.$submenus.each(function() {
      var $menu = $(this), $back = $menu.find(".js-drilldown-back");
      if (!$back.length) {
        switch (_this.options.backButtonPosition) {
          case "bottom":
            $menu.append(_this.options.backButton);
            break;
          case "top":
            $menu.prepend(_this.options.backButton);
            break;
          default:
            console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
        }
      }
      _this._back($menu);
    });
    this.$submenus.addClass("invisible");
    if (!this.options.autoHeight) {
      this.$submenus.addClass("drilldown-submenu-cover-previous");
    }
    if (!this.$element.parent().hasClass("is-drilldown")) {
      this.$wrapper = $(this.options.wrapper).addClass("is-drilldown");
      if (this.options.animateHeight) this.$wrapper.addClass("animate-height");
      this.$element.wrap(this.$wrapper);
    }
    this.$wrapper = this.$element.parent();
    this.$wrapper.css(this._getMaxDims());
  }
  _resize() {
    this.$wrapper.css({ "max-width": "none", "min-height": "none" });
    this.$wrapper.css(this._getMaxDims());
  }
  /**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */
  _events($elem) {
    var _this = this;
    $elem.off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
      if ($(e.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent")) {
        e.preventDefault();
      }
      _this._show($elem.parent("li"));
      if (_this.options.closeOnClick) {
        var $body = $("body");
        $body.off(".zf.drilldown").on("click.zf.drilldown", function(ev) {
          if (ev.target === _this.$element[0] || $.contains(_this.$element[0], ev.target)) {
            return;
          }
          ev.preventDefault();
          _this._hideAll();
          $body.off(".zf.drilldown");
        });
      }
    });
  }
  /**
   * Adds event handlers to the menu element.
   * @function
   * @private
   */
  _registerEvents() {
    if (this.options.scrollTop) {
      this._bindHandler = this._scrollTop.bind(this);
      this.$element.on("open.zf.drilldown hide.zf.drilldown close.zf.drilldown closed.zf.drilldown", this._bindHandler);
    }
    this.$element.on("mutateme.zf.trigger", this._resize.bind(this));
  }
  /**
   * Scroll to Top of Element or data-scroll-top-element
   * @function
   * @fires Drilldown#scrollme
   */
  _scrollTop() {
    var _this = this;
    var $scrollTopElement = _this.options.scrollTopElement !== "" ? $(_this.options.scrollTopElement) : _this.$element, scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
    $("html, body").stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing, function() {
      if (this === $("html")[0]) _this.$element.trigger("scrollme.zf.drilldown");
    });
  }
  /**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */
  _keyboardEvents() {
    var _this = this;
    this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown", function(e) {
      var $element = $(this), $elements = $element.parent("li").parent("ul").children("li").children("a"), $prevElement, $nextElement;
      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i - 1));
          $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
          return;
        }
      });
      Keyboard.handleKey(e, "Drilldown", {
        next: function() {
          if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent("li"));
            $element.parent("li").one(transitionend($element), function() {
              $element.parent("li").find("ul li a").not(".js-drilldown-back a").first().focus();
            });
            return true;
          }
        },
        previous: function() {
          _this._hide($element.parent("li").parent("ul"));
          $element.parent("li").parent("ul").one(transitionend($element), function() {
            setTimeout(function() {
              $element.parent("li").parent("ul").parent("li").children("a").first().focus();
            }, 1);
          });
          return true;
        },
        up: function() {
          $prevElement.focus();
          return !$element.is(_this.$element.find("> li:first-child > a"));
        },
        down: function() {
          $nextElement.focus();
          return !$element.is(_this.$element.find("> li:last-child > a"));
        },
        close: function() {
          if (!$element.is(_this.$element.find("> li > a"))) {
            _this._hide($element.parent().parent());
            $element.parent().parent().siblings("a").focus();
          }
        },
        open: function() {
          if (_this.options.parentLink && $element.attr("href")) {
            return false;
          } else if (!$element.is(_this.$menuItems)) {
            _this._hide($element.parent("li").parent("ul"));
            $element.parent("li").parent("ul").one(transitionend($element), function() {
              setTimeout(function() {
                $element.parent("li").parent("ul").parent("li").children("a").first().focus();
              }, 1);
            });
            return true;
          } else if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent("li"));
            $element.parent("li").one(transitionend($element), function() {
              $element.parent("li").find("ul li a").not(".js-drilldown-back a").first().focus();
            });
            return true;
          }
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
        }
      });
    });
  }
  /**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#close
   * @fires Drilldown#closed
   */
  _hideAll() {
    var $elem = this.$element.find(".is-drilldown-submenu.is-active");
    $elem.addClass("is-closing");
    $elem.parent().closest("ul").removeClass("invisible");
    if (this.options.autoHeight) {
      const calcHeight = $elem.parent().closest("ul").data("calcHeight");
      this.$wrapper.css({ height: calcHeight });
    }
    this.$element.trigger("close.zf.drilldown");
    $elem.one(transitionend($elem), () => {
      $elem.removeClass("is-active is-closing");
      this.$element.trigger("closed.zf.drilldown");
    });
  }
  /**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */
  _back($elem) {
    var _this = this;
    $elem.off("click.zf.drilldown");
    $elem.children(".js-drilldown-back").on("click.zf.drilldown", function() {
      _this._hide($elem);
      let parentSubMenu = $elem.parent("li").parent("ul").parent("li");
      if (parentSubMenu.length) {
        _this._show(parentSubMenu);
      } else {
        _this.$currentMenu = _this.$element;
      }
    });
  }
  /**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */
  _menuLinkEvents() {
    var _this = this;
    this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", function() {
      setTimeout(function() {
        _this._hideAll();
      }, 0);
    });
  }
  /**
   * Sets the CSS classes for submenu to show it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */
  _setShowSubMenuClasses($elem, trigger) {
    $elem.addClass("is-active").removeClass("invisible").attr("aria-hidden", false);
    $elem.parent("li").attr("aria-expanded", true);
    if (trigger === true) {
      this.$element.trigger("open.zf.drilldown", [$elem]);
    }
  }
  /**
   * Sets the CSS classes for submenu to hide it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */
  _setHideSubMenuClasses($elem, trigger) {
    $elem.removeClass("is-active").addClass("invisible").attr("aria-hidden", true);
    $elem.parent("li").attr("aria-expanded", false);
    if (trigger === true) {
      $elem.trigger("hide.zf.drilldown", [$elem]);
    }
  }
  /**
   * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
   * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
   * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
   */
  _showMenu($elem, autoFocus) {
    var _this = this;
    var $expandedSubmenus = this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
    $expandedSubmenus.each(function() {
      _this._setHideSubMenuClasses($(this));
    });
    this.$currentMenu = $elem;
    if ($elem.is("[data-drilldown]")) {
      if (autoFocus === true) $elem.find("li > a").first().focus();
      if (this.options.autoHeight) this.$wrapper.css("height", $elem.data("calcHeight"));
      return;
    }
    var $submenus = $elem.children().first().parentsUntil("[data-drilldown]", "[data-submenu]");
    $submenus.each(function(index) {
      if (index === 0 && _this.options.autoHeight) {
        _this.$wrapper.css("height", $(this).data("calcHeight"));
      }
      var isLastChild = index === $submenus.length - 1;
      if (isLastChild === true) {
        $(this).one(transitionend($(this)), () => {
          if (autoFocus === true) {
            $elem.find("li > a").first().focus();
          }
        });
      }
      _this._setShowSubMenuClasses($(this), isLastChild);
    });
  }
  /**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
   */
  _show($elem) {
    const $submenu = $elem.children("[data-submenu]");
    $elem.attr("aria-expanded", true);
    this.$currentMenu = $submenu;
    $elem.parent().closest("ul").addClass("invisible");
    $submenu.addClass("is-active visible").removeClass("invisible").attr("aria-hidden", false);
    if (this.options.autoHeight) {
      this.$wrapper.css({ height: $submenu.data("calcHeight") });
    }
    this.$element.trigger("open.zf.drilldown", [$elem]);
  }
  /**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
   */
  _hide($elem) {
    if (this.options.autoHeight) this.$wrapper.css({ height: $elem.parent().closest("ul").data("calcHeight") });
    $elem.parent().closest("ul").removeClass("invisible");
    $elem.parent("li").attr("aria-expanded", false);
    $elem.attr("aria-hidden", true);
    $elem.addClass("is-closing").one(transitionend($elem), function() {
      $elem.removeClass("is-active is-closing visible");
      $elem.blur().addClass("invisible");
    });
    $elem.trigger("hide.zf.drilldown", [$elem]);
  }
  /**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */
  _getMaxDims() {
    var maxHeight = 0, result = {}, _this = this;
    this.$submenus.add(this.$element).each(function() {
      var height = Box.GetDimensions(this).height;
      maxHeight = height > maxHeight ? height : maxHeight;
      if (_this.options.autoHeight) {
        $(this).data("calcHeight", height);
      }
    });
    if (this.options.autoHeight)
      result.height = this.$currentMenu.data("calcHeight");
    else
      result["min-height"] = `${maxHeight}px`;
    result["max-width"] = `${this.$element[0].getBoundingClientRect().width}px`;
    return result;
  }
  /**
   * Destroys the Drilldown Menu
   * @function
   */
  _destroy() {
    $("body").off(".zf.drilldown");
    if (this.options.scrollTop) this.$element.off(".zf.drilldown", this._bindHandler);
    this._hideAll();
    this.$element.off("mutateme.zf.trigger");
    Nest.Burn(this.$element, "drilldown");
    this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").off("transitionend otransitionend webkitTransitionEnd").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role");
    this.$submenuAnchors.each(function() {
      $(this).off(".zf.drilldown");
    });
    this.$element.find("[data-is-parent-link]").detach();
    this.$submenus.removeClass("drilldown-submenu-cover-previous invisible");
    this.$element.find("a").each(function() {
      var $link = $(this);
      $link.removeAttr("tabindex");
      if ($link.data("savedHref")) {
        $link.attr("href", $link.data("savedHref")).removeData("savedHref");
      } else {
        return;
      }
    });
  }
}
Drilldown.defaults = {
  /**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolean}
   * @default true
   */
  autoApplyClass: true,
  /**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
  /**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
  backButtonPosition: "top",
  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
  wrapper: "<div></div>",
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,
  /**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  autoHeight: false,
  /**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  animateHeight: false,
  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
  scrollTop: false,
  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
  scrollTopElement: "",
  /**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
  scrollTopOffset: 0,
  /**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
  animationEasing: "swing"
  // holdOpen: false
};
let MenuPlugins = {
  dropdown: {
    cssClass: "dropdown",
    plugin: DropdownMenu
  },
  drilldown: {
    cssClass: "drilldown",
    plugin: Drilldown
  },
  accordion: {
    cssClass: "accordion-menu",
    plugin: AccordionMenu
  }
};
class ResponsiveMenu extends Plugin {
  /**
   * Creates a new instance of a responsive menu.
   * @class
   * @name ResponsiveMenu
   * @fires ResponsiveMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element) {
    this.$element = $(element);
    this.rules = this.$element.data("responsive-menu");
    this.currentMq = null;
    this.currentPlugin = null;
    this.className = "ResponsiveMenu";
    this._init();
    this._events();
  }
  /**
   * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
   * @function
   * @private
   */
  _init() {
    MediaQuery._init();
    if (typeof this.rules === "string") {
      let rulesTree = {};
      let rules = this.rules.split(" ");
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i].split("-");
        let ruleSize = rule.length > 1 ? rule[0] : "small";
        let rulePlugin = rule.length > 1 ? rule[1] : rule[0];
        if (MenuPlugins[rulePlugin] !== null) {
          rulesTree[ruleSize] = MenuPlugins[rulePlugin];
        }
      }
      this.rules = rulesTree;
    }
    if (!$.isEmptyObject(this.rules)) {
      this._checkMediaQueries();
    }
    this.$element.attr("data-mutate", this.$element.attr("data-mutate") || GetYoDigits(6, "responsive-menu"));
  }
  /**
   * Initializes events for the Menu.
   * @function
   * @private
   */
  _events() {
    var _this = this;
    $(window).on("changed.zf.mediaquery", function() {
      _this._checkMediaQueries();
    });
  }
  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  _checkMediaQueries() {
    var matchedMq, _this = this;
    $.each(this.rules, function(key) {
      if (MediaQuery.atLeast(key)) {
        matchedMq = key;
      }
    });
    if (!matchedMq) return;
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;
    $.each(MenuPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });
    this.$element.addClass(this.rules[matchedMq].cssClass);
    if (this.currentPlugin) this.currentPlugin.destroy();
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
  }
  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  _destroy() {
    this.currentPlugin.destroy();
    $(window).off(".zf.ResponsiveMenu");
  }
}
ResponsiveMenu.defaults = {};
class ResponsiveToggle extends Plugin {
  /**
   * Creates a new instance of Tab Bar.
   * @class
   * @name ResponsiveToggle
   * @fires ResponsiveToggle#init
   * @param {jQuery} element - jQuery object to attach tab bar functionality to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
    this.className = "ResponsiveToggle";
    this._init();
    this._events();
  }
  /**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */
  _init() {
    MediaQuery._init();
    var targetID = this.$element.data("responsive-toggle");
    if (!targetID) {
      console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar.");
    }
    this.$targetMenu = $(`#${targetID}`);
    this.$toggler = this.$element.find("[data-toggle]").filter(function() {
      var target = $(this).data("toggle");
      return target === targetID || target === "";
    });
    this.options = $.extend({}, this.options, this.$targetMenu.data());
    if (this.options.animate) {
      let input = this.options.animate.split(" ");
      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }
    this._update();
  }
  /**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */
  _events() {
    this._updateMqHandler = this._update.bind(this);
    $(window).on("changed.zf.mediaquery", this._updateMqHandler);
    this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this));
  }
  /**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */
  _update() {
    if (!MediaQuery.atLeast(this.options.hideFor)) {
      this.$element.show();
      this.$targetMenu.hide();
    } else {
      this.$element.hide();
      this.$targetMenu.show();
    }
  }
  /**
   * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
   * @function
   * @fires ResponsiveToggle#toggled
   */
  toggleMenu() {
    if (!MediaQuery.atLeast(this.options.hideFor)) {
      if (this.options.animate) {
        if (this.$targetMenu.is(":hidden")) {
          Motion.animateIn(this.$targetMenu, this.animationIn, () => {
            this.$element.trigger("toggled.zf.responsiveToggle");
            this.$targetMenu.find("[data-mutate]").triggerHandler("mutateme.zf.trigger");
          });
        } else {
          Motion.animateOut(this.$targetMenu, this.animationOut, () => {
            this.$element.trigger("toggled.zf.responsiveToggle");
          });
        }
      } else {
        this.$targetMenu.toggle(0);
        this.$targetMenu.find("[data-mutate]").trigger("mutateme.zf.trigger");
        this.$element.trigger("toggled.zf.responsiveToggle");
      }
    }
  }
  _destroy() {
    this.$element.off(".zf.responsiveToggle");
    this.$toggler.off(".zf.responsiveToggle");
    $(window).off("changed.zf.mediaquery", this._updateMqHandler);
  }
}
ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: "medium",
  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};
class OffCanvas extends Plugin {
  /**
   * Creates a new instance of an off-canvas wrapper.
   * @class
   * @name OffCanvas
   * @fires OffCanvas#init
   * @param {Object} element - jQuery object to initialize.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.className = "OffCanvas";
    this.$element = element;
    this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
    this.contentClasses = { base: [], reveal: [] };
    this.$lastTrigger = $();
    this.$triggers = $();
    this.position = "left";
    this.$content = $();
    this.nested = !!this.options.nested;
    this.$sticky = $();
    this.isInCanvas = false;
    $(["push", "overlap"]).each((index, val) => {
      this.contentClasses.base.push("has-transition-" + val);
    });
    $(["left", "right", "top", "bottom"]).each((index, val) => {
      this.contentClasses.base.push("has-position-" + val);
      this.contentClasses.reveal.push("has-reveal-" + val);
    });
    Triggers.init($);
    MediaQuery._init();
    this._init();
    this._events();
    Keyboard.register("OffCanvas", {
      "ESCAPE": "close"
    });
  }
  /**
   * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
   * @function
   * @private
   */
  _init() {
    var id = this.$element.attr("id");
    this.$element.attr("aria-hidden", "true");
    if (this.options.contentId) {
      this.$content = $("#" + this.options.contentId);
    } else if (this.$element.siblings("[data-off-canvas-content]").length) {
      this.$content = this.$element.siblings("[data-off-canvas-content]").first();
    } else {
      this.$content = this.$element.closest("[data-off-canvas-content]").first();
    }
    if (!this.options.contentId) {
      this.nested = this.$element.siblings("[data-off-canvas-content]").length === 0;
    } else if (this.options.contentId && this.options.nested === null) {
      console.warn("Remember to use the nested option if using the content ID option!");
    }
    if (this.nested === true) {
      this.options.transition = "overlap";
      this.$element.removeClass("is-transition-push");
    }
    this.$element.addClass(`is-transition-${this.options.transition} is-closed`);
    this.$triggers = $(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-expanded", "false").attr("aria-controls", id);
    this.position = this.$element.is(".position-left, .position-top, .position-right, .position-bottom") ? this.$element.attr("class").match(/position\-(left|top|right|bottom)/)[1] : this.position;
    if (this.options.contentOverlay === true) {
      var overlay = document.createElement("div");
      var overlayPosition = $(this.$element).css("position") === "fixed" ? "is-overlay-fixed" : "is-overlay-absolute";
      overlay.setAttribute("class", "js-off-canvas-overlay " + overlayPosition);
      this.$overlay = $(overlay);
      if (overlayPosition === "is-overlay-fixed") {
        $(this.$overlay).insertAfter(this.$element);
      } else {
        this.$content.append(this.$overlay);
      }
    }
    var revealOnRegExp = new RegExp(RegExpEscape(this.options.revealClass) + "([^\\s]+)", "g");
    var revealOnClass = revealOnRegExp.exec(this.$element[0].className);
    if (revealOnClass) {
      this.options.isRevealed = true;
      this.options.revealOn = this.options.revealOn || revealOnClass[1];
    }
    if (this.options.isRevealed === true && this.options.revealOn) {
      this.$element.first().addClass(`${this.options.revealClass}${this.options.revealOn}`);
      this._setMQChecker();
    }
    if (this.options.transitionTime) {
      this.$element.css("transition-duration", this.options.transitionTime);
    }
    this.$sticky = this.$content.find("[data-off-canvas-sticky]");
    if (this.$sticky.length > 0 && this.options.transition === "push") {
      this.options.contentScroll = false;
    }
    let inCanvasFor = this.$element.attr("class").match(/\bin-canvas-for-(\w+)/);
    if (inCanvasFor && inCanvasFor.length === 2) {
      this.options.inCanvasOn = inCanvasFor[1];
    } else if (this.options.inCanvasOn) {
      this.$element.addClass(`in-canvas-for-${this.options.inCanvasOn}`);
    }
    if (this.options.inCanvasOn) {
      this._checkInCanvas();
    }
    this._removeContentClasses();
  }
  /**
   * Adds event handlers to the off-canvas wrapper and the exit overlay.
   * @function
   * @private
   */
  _events() {
    this.$element.off(".zf.trigger .zf.offCanvas").on({
      "open.zf.trigger": this.open.bind(this),
      "close.zf.trigger": this.close.bind(this),
      "toggle.zf.trigger": this.toggle.bind(this),
      "keydown.zf.offCanvas": this._handleKeyboard.bind(this)
    });
    if (this.options.closeOnClick === true) {
      var $target = this.options.contentOverlay ? this.$overlay : this.$content;
      $target.on({ "click.zf.offCanvas": this.close.bind(this) });
    }
    if (this.options.inCanvasOn) {
      $(window).on("changed.zf.mediaquery", () => {
        this._checkInCanvas();
      });
    }
  }
  /**
   * Applies event listener for elements that will reveal at certain breakpoints.
   * @private
   */
  _setMQChecker() {
    var _this = this;
    this.onLoadListener = onLoad($(window), function() {
      if (MediaQuery.atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      }
    });
    $(window).on("changed.zf.mediaquery", function() {
      if (MediaQuery.atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      } else {
        _this.reveal(false);
      }
    });
  }
  /**
   * Checks if InCanvas on current breakpoint and adjust off-canvas accordingly
   * @private
   */
  _checkInCanvas() {
    this.isInCanvas = MediaQuery.atLeast(this.options.inCanvasOn);
    if (this.isInCanvas === true) {
      this.close();
    }
  }
  /**
   * Removes the CSS transition/position classes of the off-canvas content container.
   * Removing the classes is important when another off-canvas gets opened that uses the same content container.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  _removeContentClasses(hasReveal) {
    if (typeof hasReveal !== "boolean") {
      this.$content.removeClass(this.contentClasses.base.join(" "));
    } else if (hasReveal === false) {
      this.$content.removeClass(`has-reveal-${this.position}`);
    }
  }
  /**
   * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
   * Beforehand any transition/position class gets removed.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  _addContentClasses(hasReveal) {
    this._removeContentClasses(hasReveal);
    if (typeof hasReveal !== "boolean") {
      this.$content.addClass(`has-transition-${this.options.transition} has-position-${this.position}`);
    } else if (hasReveal === true) {
      this.$content.addClass(`has-reveal-${this.position}`);
    }
  }
  /**
   * Preserves the fixed behavior of sticky elements on opening an off-canvas with push transition.
   * Since the off-canvas container has got a transform scope in such a case, it is done by calculating position absolute values.
   * @private
   */
  _fixStickyElements() {
    this.$sticky.each((_, el) => {
      const $el = $(el);
      if ($el.css("position") === "fixed") {
        let topVal = parseInt($el.css("top"), 10);
        $el.data("offCanvasSticky", { top: topVal });
        let absoluteTopVal = $(document).scrollTop() + topVal;
        $el.css({ top: `${absoluteTopVal}px`, width: "100%", transition: "none" });
      }
    });
  }
  /**
   * Restores the original fixed styling of sticky elements after having closed an off-canvas that got pseudo fixed beforehand.
   * This reverts the changes of _fixStickyElements()
   * @private
   */
  _unfixStickyElements() {
    this.$sticky.each((_, el) => {
      const $el = $(el);
      let stickyData = $el.data("offCanvasSticky");
      if (typeof stickyData === "object") {
        $el.css({ top: `${stickyData.top}px`, width: "", transition: "" });
        $el.data("offCanvasSticky", "");
      }
    });
  }
  /**
   * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
   * @param {Boolean} isRevealed - true if element should be revealed.
   * @function
   */
  reveal(isRevealed) {
    if (isRevealed) {
      this.close();
      this.isRevealed = true;
      this.$element.attr("aria-hidden", "false");
      this.$element.off("open.zf.trigger toggle.zf.trigger");
      this.$element.removeClass("is-closed");
    } else {
      this.isRevealed = false;
      this.$element.attr("aria-hidden", "true");
      this.$element.off("open.zf.trigger toggle.zf.trigger").on({
        "open.zf.trigger": this.open.bind(this),
        "toggle.zf.trigger": this.toggle.bind(this)
      });
      this.$element.addClass("is-closed");
    }
    this._addContentClasses(isRevealed);
  }
  /**
   * Stops scrolling of the body when OffCanvas is open on mobile Safari and other troublesome browsers.
   * @function
   * @private
   */
  _stopScrolling() {
    return false;
  }
  /**
   * Save current finger y-position
   * @param event
   * @private
   */
  _recordScrollable(event2) {
    const elem = this;
    elem.lastY = event2.touches[0].pageY;
  }
  /**
   * Prevent further scrolling when it hits the edges
   * @param event
   * @private
   */
  _preventDefaultAtEdges(event2) {
    const elem = this;
    const _this = event2.data;
    const delta = elem.lastY - event2.touches[0].pageY;
    elem.lastY = event2.touches[0].pageY;
    if (!_this._canScroll(delta, elem)) {
      event2.preventDefault();
    }
  }
  /**
   * Handle continuous scrolling of scrollbox
   * Don't bubble up to _preventDefaultAtEdges
   * @param event
   * @private
   */
  _scrollboxTouchMoved(event2) {
    const elem = this;
    const _this = event2.data;
    const parent = elem.closest("[data-off-canvas], [data-off-canvas-scrollbox-outer]");
    const delta = elem.lastY - event2.touches[0].pageY;
    parent.lastY = elem.lastY = event2.touches[0].pageY;
    event2.stopPropagation();
    if (!_this._canScroll(delta, elem)) {
      if (!_this._canScroll(delta, parent)) {
        event2.preventDefault();
      } else {
        parent.scrollTop += delta;
      }
    }
  }
  /**
   * Detect possibility of scrolling
   * @param delta
   * @param elem
   * @returns boolean
   * @private
   */
  _canScroll(delta, elem) {
    const up = delta < 0;
    const down = delta > 0;
    const allowUp = elem.scrollTop > 0;
    const allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
    return up && allowUp || down && allowDown;
  }
  /**
   * Opens the off-canvas menu.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   * @fires OffCanvas#opened
   * @todo also trigger 'open' event?
   */
  open(event2, trigger) {
    if (this.$element.hasClass("is-open") || this.isRevealed || this.isInCanvas) {
      return;
    }
    var _this = this;
    if (trigger) {
      this.$lastTrigger = trigger;
    }
    if (this.options.forceTo === "top") {
      window.scrollTo(0, 0);
    } else if (this.options.forceTo === "bottom") {
      window.scrollTo(0, document.body.scrollHeight);
    }
    if (this.options.transitionTime && this.options.transition !== "overlap") {
      this.$element.siblings("[data-off-canvas-content]").css("transition-duration", this.options.transitionTime);
    } else {
      this.$element.siblings("[data-off-canvas-content]").css("transition-duration", "");
    }
    this.$element.addClass("is-open").removeClass("is-closed");
    this.$triggers.attr("aria-expanded", "true");
    this.$element.attr("aria-hidden", "false");
    this.$content.addClass("is-open-" + this.position);
    if (this.options.contentScroll === false) {
      $("body").addClass("is-off-canvas-open").on("touchmove", this._stopScrolling);
      this.$element.on("touchstart", this._recordScrollable);
      this.$element.on("touchmove", this, this._preventDefaultAtEdges);
      this.$element.on("touchstart", "[data-off-canvas-scrollbox]", this._recordScrollable);
      this.$element.on("touchmove", "[data-off-canvas-scrollbox]", this, this._scrollboxTouchMoved);
    }
    if (this.options.contentOverlay === true) {
      this.$overlay.addClass("is-visible");
    }
    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.addClass("is-closable");
    }
    if (this.options.autoFocus === true) {
      this.$element.one(transitionend(this.$element), function() {
        if (!_this.$element.hasClass("is-open")) {
          return;
        }
        var canvasFocus = _this.$element.find("[data-autofocus]");
        if (canvasFocus.length) {
          canvasFocus.eq(0).focus();
        } else {
          _this.$element.find("a, button").eq(0).focus();
        }
      });
    }
    if (this.options.trapFocus === true) {
      this.$content.attr("tabindex", "-1");
      Keyboard.trapFocus(this.$element);
    }
    if (this.options.transition === "push") {
      this._fixStickyElements();
    }
    this._addContentClasses();
    this.$element.trigger("opened.zf.offCanvas");
    this.$element.one(transitionend(this.$element), () => {
      this.$element.trigger("openedEnd.zf.offCanvas");
    });
  }
  /**
   * Closes the off-canvas menu.
   * @function
   * @param {Function} cb - optional cb to fire after closure.
   * @fires OffCanvas#close
   * @fires OffCanvas#closed
   */
  close() {
    if (!this.$element.hasClass("is-open") || this.isRevealed) {
      return;
    }
    this.$element.trigger("close.zf.offCanvas");
    this.$element.removeClass("is-open");
    this.$element.attr("aria-hidden", "true");
    this.$content.removeClass("is-open-left is-open-top is-open-right is-open-bottom");
    if (this.options.contentOverlay === true) {
      this.$overlay.removeClass("is-visible");
    }
    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.removeClass("is-closable");
    }
    this.$triggers.attr("aria-expanded", "false");
    this.$element.one(transitionend(this.$element), () => {
      this.$element.addClass("is-closed");
      this._removeContentClasses();
      if (this.options.transition === "push") {
        this._unfixStickyElements();
      }
      if (this.options.contentScroll === false) {
        $("body").removeClass("is-off-canvas-open").off("touchmove", this._stopScrolling);
        this.$element.off("touchstart", this._recordScrollable);
        this.$element.off("touchmove", this._preventDefaultAtEdges);
        this.$element.off("touchstart", "[data-off-canvas-scrollbox]", this._recordScrollable);
        this.$element.off("touchmove", "[data-off-canvas-scrollbox]", this._scrollboxTouchMoved);
      }
      if (this.options.trapFocus === true) {
        this.$content.removeAttr("tabindex");
        Keyboard.releaseFocus(this.$element);
      }
      this.$element.trigger("closed.zf.offCanvas");
    });
  }
  /**
   * Toggles the off-canvas menu open or closed.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   */
  toggle(event2, trigger) {
    if (this.$element.hasClass("is-open")) {
      this.close(event2, trigger);
    } else {
      this.open(event2, trigger);
    }
  }
  /**
   * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
   * @function
   * @private
   */
  _handleKeyboard(e) {
    Keyboard.handleKey(e, "OffCanvas", {
      close: () => {
        this.close();
        this.$lastTrigger.focus();
        return true;
      },
      handled: () => {
        e.preventDefault();
      }
    });
  }
  /**
   * Destroys the OffCanvas plugin.
   * @function
   */
  _destroy() {
    this.close();
    this.$element.off(".zf.trigger .zf.offCanvas");
    this.$overlay.off(".zf.offCanvas");
    if (this.onLoadListener) $(window).off(this.onLoadListener);
  }
}
OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,
  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,
  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,
  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,
  /**
   * Amount of time the open and close transition requires, including the appropriate milliseconds (`ms`) or seconds (`s`) unit (e.g. `500ms`, `.75s`) If none selected, pulls from body style.
   * @option
   * @type {string}
   * @default null
   */
  transitionTime: null,
  /**
   * Type of transition for the OffCanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: "push",
  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,
  /**
   * Allow the OffCanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,
  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,
  /**
   * Breakpoint at which the off-canvas gets moved into canvas content and acts as regular page element.
   * @option
   * @type {?string}
   * @default null
   */
  inCanvasOn: null,
  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,
  /**
   * Class used to force an OffCanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: "reveal-for-",
  /**
   * Triggers optional focus trapping when opening an OffCanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
};
class Reveal extends Plugin {
  /**
   * Creates a new instance of Reveal.
   * @class
   * @name Reveal
   * @param {jQuery} element - jQuery object to use for the modal.
   * @param {Object} options - optional parameters.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);
    this.className = "Reveal";
    this._init();
    Touch.init($);
    Triggers.init($);
    Keyboard.register("Reveal", {
      "ESCAPE": "close"
    });
  }
  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
  _init() {
    MediaQuery._init();
    this.id = this.$element.attr("id");
    this.isActive = false;
    this.cached = { mq: MediaQuery.current };
    this.$anchor = $(`[data-open="${this.id}"]`).length ? $(`[data-open="${this.id}"]`) : $(`[data-toggle="${this.id}"]`);
    this.$anchor.attr({
      "aria-controls": this.id,
      "aria-haspopup": "dialog",
      "tabindex": 0
    });
    if (this.options.fullScreen || this.$element.hasClass("full")) {
      this.options.fullScreen = true;
      this.options.overlay = false;
    }
    if (this.options.overlay && !this.$overlay) {
      this.$overlay = this._makeOverlay(this.id);
    }
    this.$element.attr({
      "role": "dialog",
      "aria-hidden": true,
      "data-yeti-box": this.id,
      "data-resize": this.id
    });
    if (this.$overlay) {
      this.$element.detach().appendTo(this.$overlay);
    } else {
      this.$element.detach().appendTo($(this.options.appendTo));
      this.$element.addClass("without-overlay");
    }
    this._events();
    if (this.options.deepLink && window.location.hash === `#${this.id}`) {
      this.onLoadListener = onLoad($(window), () => this.open());
    }
  }
  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  _makeOverlay() {
    var additionalOverlayClasses = "";
    if (this.options.additionalOverlayClasses) {
      additionalOverlayClasses = " " + this.options.additionalOverlayClasses;
    }
    return $("<div></div>").addClass("reveal-overlay" + additionalOverlayClasses).appendTo(this.options.appendTo);
  }
  /**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */
  _updatePosition() {
    var width = this.$element.outerWidth();
    var outerWidth = $(window).width();
    var height = this.$element.outerHeight();
    var outerHeight = $(window).height();
    var left, top = null;
    if (this.options.hOffset === "auto") {
      left = parseInt((outerWidth - width) / 2, 10);
    } else {
      left = parseInt(this.options.hOffset, 10);
    }
    if (this.options.vOffset === "auto") {
      if (height > outerHeight) {
        top = parseInt(Math.min(100, outerHeight / 10), 10);
      } else {
        top = parseInt((outerHeight - height) / 4, 10);
      }
    } else if (this.options.vOffset !== null) {
      top = parseInt(this.options.vOffset, 10);
    }
    if (top !== null) {
      this.$element.css({ top: top + "px" });
    }
    if (!this.$overlay || this.options.hOffset !== "auto") {
      this.$element.css({ left: left + "px" });
      this.$element.css({ margin: "0px" });
    }
  }
  /**
   * Adds event handlers for the modal.
   * @private
   */
  _events() {
    var _this = this;
    this.$element.on({
      "open.zf.trigger": this.open.bind(this),
      "close.zf.trigger": (event2, $element) => {
        if (event2.target === _this.$element[0] || $(event2.target).parents("[data-closable]")[0] === $element) {
          return this.close.apply(this);
        }
      },
      "toggle.zf.trigger": this.toggle.bind(this),
      "resizeme.zf.trigger": function() {
        _this._updatePosition();
      }
    });
    if (this.options.closeOnClick && this.options.overlay) {
      this.$overlay.off(".zf.reveal").on("click.zf.dropdown tap.zf.dropdown", function(e) {
        if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
          return;
        }
        _this.close();
      });
    }
    if (this.options.deepLink) {
      $(window).on(`hashchange.zf.reveal:${this.id}`, this._handleState.bind(this));
    }
  }
  /**
   * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.
   * @private
   */
  _handleState() {
    if (window.location.hash === "#" + this.id && !this.isActive) {
      this.open();
    } else {
      this.close();
    }
  }
  /**
  * Disables the scroll when Reveal is shown to prevent the background from shifting
  * @param {number} scrollTop - Scroll to visually apply, window current scroll by default
  */
  _disableScroll(scrollTop) {
    scrollTop = scrollTop || $(window).scrollTop();
    if ($(document).height() > $(window).height()) {
      $("html").css("top", -scrollTop);
    }
  }
  /**
  * Reenables the scroll when Reveal closes
  * @param {number} scrollTop - Scroll to restore, html "top" property by default (as set by `_disableScroll`)
  */
  _enableScroll(scrollTop) {
    scrollTop = scrollTop || parseInt($("html").css("top"), 10);
    if ($(document).height() > $(window).height()) {
      $("html").css("top", "");
      $(window).scrollTop(-scrollTop);
    }
  }
  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */
  open() {
    const hash = `#${this.id}`;
    if (this.options.deepLink && window.location.hash !== hash) {
      if (window.history.pushState) {
        if (this.options.updateHistory) {
          window.history.pushState({}, "", hash);
        } else {
          window.history.replaceState({}, "", hash);
        }
      } else {
        window.location.hash = hash;
      }
    }
    this.$activeAnchor = $(document.activeElement).is(this.$anchor) ? $(document.activeElement) : this.$anchor;
    this.isActive = true;
    this.$element.css({ "visibility": "hidden" }).show().scrollTop(0);
    if (this.options.overlay) {
      this.$overlay.css({ "visibility": "hidden" }).show();
    }
    this._updatePosition();
    this.$element.hide().css({ "visibility": "" });
    if (this.$overlay) {
      this.$overlay.css({ "visibility": "" }).hide();
      if (this.$element.hasClass("fast")) {
        this.$overlay.addClass("fast");
      } else if (this.$element.hasClass("slow")) {
        this.$overlay.addClass("slow");
      }
    }
    if (!this.options.multipleOpened) {
      this.$element.trigger("closeme.zf.reveal", this.id);
    }
    if ($(".reveal:visible").length === 0) {
      this._disableScroll();
    }
    var _this = this;
    if (this.options.animationIn) {
      let afterAnimation = function() {
        _this.$element.attr({
          "aria-hidden": false,
          "tabindex": -1
        }).focus();
        _this._addGlobalClasses();
        Keyboard.trapFocus(_this.$element);
      };
      if (this.options.overlay) {
        Motion.animateIn(this.$overlay, "fade-in");
      }
      Motion.animateIn(this.$element, this.options.animationIn, () => {
        if (this.$element) {
          this.focusableElements = Keyboard.findFocusable(this.$element);
          afterAnimation();
        }
      });
    } else {
      if (this.options.overlay) {
        this.$overlay.show(0);
      }
      this.$element.show(this.options.showDelay);
    }
    this.$element.attr({
      "aria-hidden": false,
      "tabindex": -1
    }).focus();
    Keyboard.trapFocus(this.$element);
    this._addGlobalClasses();
    this._addGlobalListeners();
    this.$element.trigger("open.zf.reveal");
  }
  /**
   * Adds classes and listeners on document required by open modals.
   *
   * The following classes are added and updated:
   * - `.is-reveal-open` - Prevents the scroll on document
   * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the
   *                       scroll was not disabled. This prevent a "shift" of the page content due
   *                       the scrollbar disappearing when the modal opens.
   *
   * @private
   */
  _addGlobalClasses() {
    const updateScrollbarClass = () => {
      $("html").toggleClass("zf-has-scroll", !!($(document).height() > $(window).height()));
    };
    this.$element.on("resizeme.zf.trigger.revealScrollbarListener", () => updateScrollbarClass());
    updateScrollbarClass();
    $("html").addClass("is-reveal-open");
  }
  /**
   * Removes classes and listeners on document that were required by open modals.
   * @private
   */
  _removeGlobalClasses() {
    this.$element.off("resizeme.zf.trigger.revealScrollbarListener");
    $("html").removeClass("is-reveal-open");
    $("html").removeClass("zf-has-scroll");
  }
  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  _addGlobalListeners() {
    var _this = this;
    if (!this.$element) {
      return;
    }
    this.focusableElements = Keyboard.findFocusable(this.$element);
    if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
      $("body").on("click.zf.dropdown tap.zf.dropdown", function(e) {
        if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
          return;
        }
        _this.close();
      });
    }
    if (this.options.closeOnEsc) {
      $(window).on("keydown.zf.reveal", function(e) {
        Keyboard.handleKey(e, "Reveal", {
          close: function() {
            if (_this.options.closeOnEsc) {
              _this.close();
            }
          }
        });
      });
    }
  }
  /**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */
  close() {
    if (!this.isActive || !this.$element.is(":visible")) {
      return false;
    }
    var _this = this;
    if (this.options.animationOut) {
      if (this.options.overlay) {
        Motion.animateOut(this.$overlay, "fade-out");
      }
      Motion.animateOut(this.$element, this.options.animationOut, finishUp);
    } else {
      this.$element.hide(this.options.hideDelay);
      if (this.options.overlay) {
        this.$overlay.hide(0, finishUp);
      } else {
        finishUp();
      }
    }
    if (this.options.closeOnEsc) {
      $(window).off("keydown.zf.reveal");
    }
    if (!this.options.overlay && this.options.closeOnClick) {
      $("body").off("click.zf.dropdown tap.zf.dropdown");
    }
    this.$element.off("keydown.zf.reveal");
    function finishUp() {
      var scrollTop = parseInt($("html").css("top"), 10);
      if ($(".reveal:visible").length === 0) {
        _this._removeGlobalClasses();
      }
      Keyboard.releaseFocus(_this.$element);
      _this.$element.attr("aria-hidden", true);
      if ($(".reveal:visible").length === 0) {
        _this._enableScroll(scrollTop);
      }
      _this.$element.trigger("closed.zf.reveal");
    }
    if (this.options.resetOnClose) {
      this.$element.html(this.$element.html());
    }
    this.isActive = false;
    if (_this.options.deepLink && window.location.hash === `#${this.id}`) {
      if (window.history.replaceState) {
        const urlWithoutHash = window.location.pathname + window.location.search;
        if (this.options.updateHistory) {
          window.history.pushState({}, "", urlWithoutHash);
        } else {
          window.history.replaceState("", document.title, urlWithoutHash);
        }
      } else {
        window.location.hash = "";
      }
    }
    this.$activeAnchor.focus();
  }
  /**
   * Toggles the open/closed state of a modal.
   * @function
   */
  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }
  /**
   * Destroys an instance of a modal.
   * @function
   */
  _destroy() {
    if (this.options.overlay) {
      this.$element.appendTo($(this.options.appendTo));
      this.$overlay.hide().off().remove();
    }
    this.$element.hide().off();
    this.$anchor.off(".zf");
    $(window).off(`.zf.reveal:${this.id}`);
    if (this.onLoadListener) $(window).off(this.onLoadListener);
    if ($(".reveal:visible").length === 0) {
      this._removeGlobalClasses();
    }
  }
}
Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationIn: "",
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationOut: "",
  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  showDelay: 0,
  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  hideDelay: 0,
  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnEsc: true,
  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
  multipleOpened: false,
  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  vOffset: "auto",
  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  hOffset: "auto",
  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
  fullScreen: false,
  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
  overlay: true,
  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
  resetOnClose: false,
  /**
   * Link the location hash to the modal.
   * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,
  /**
   * If `deepLink` is enabled, update the browser history with the open modal
   * @option
   * @default false
   */
  updateHistory: false,
  /**
  * Allows the modal to append to custom div.
  * @option
  * @type {string}
  * @default "body"
  */
  appendTo: "body",
  /**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
  additionalOverlayClasses: ""
};
class Tooltip extends Positionable {
  /**
   * Creates a new instance of a Tooltip.
   * @class
   * @name Tooltip
   * @fires Tooltip#init
   * @param {jQuery} element - jQuery object to attach a tooltip to.
   * @param {Object} options - object to extend the default configuration.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options);
    this.className = "Tooltip";
    this.isActive = false;
    this.isClick = false;
    Triggers.init($);
    this._init();
  }
  /**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */
  _init() {
    MediaQuery._init();
    var elemId = this.$element.attr("aria-describedby") || GetYoDigits(6, "tooltip");
    this.options.tipText = this.options.tipText || this.$element.attr("title");
    this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId);
    if (this.options.allowHtml) {
      this.template.appendTo(document.body).html(this.options.tipText).hide();
    } else {
      this.template.appendTo(document.body).text(this.options.tipText).hide();
    }
    this.$element.attr({
      "title": "",
      "aria-describedby": elemId,
      "data-yeti-box": elemId,
      "data-toggle": elemId,
      "data-resize": elemId
    }).addClass(this.options.triggerClass);
    super._init();
    this._events();
  }
  _getDefaultPosition() {
    var elementClassName = this.$element[0].className;
    if (this.$element[0] instanceof SVGElement) {
      elementClassName = elementClassName.baseVal;
    }
    var position = elementClassName.match(/\b(top|left|right|bottom)\b/g);
    return position ? position[0] : "top";
  }
  _getDefaultAlignment() {
    return "center";
  }
  _getHOffset() {
    if (this.position === "left" || this.position === "right") {
      return this.options.hOffset + this.options.tooltipWidth;
    } else {
      return this.options.hOffset;
    }
  }
  _getVOffset() {
    if (this.position === "top" || this.position === "bottom") {
      return this.options.vOffset + this.options.tooltipHeight;
    } else {
      return this.options.vOffset;
    }
  }
  /**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */
  _buildTemplate(id) {
    var templateClasses = `${this.options.tooltipClass} ${this.options.templateClasses}`.trim();
    var $template = $("<div></div>").addClass(templateClasses).attr({
      "role": "tooltip",
      "aria-hidden": true,
      "data-is-active": false,
      "data-is-focus": false,
      "id": id
    });
    return $template;
  }
  /**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */
  _setPosition() {
    super._setPosition(this.$element, this.template);
  }
  /**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Tooltip#closeme
   * @fires Tooltip#show
   * @function
   */
  show() {
    if (this.options.showOn !== "all" && !MediaQuery.is(this.options.showOn)) {
      return false;
    }
    var _this = this;
    this.template.css("visibility", "hidden").show();
    this._setPosition();
    this.template.removeClass("top bottom left right").addClass(this.position);
    this.template.removeClass("align-top align-bottom align-left align-right align-center").addClass("align-" + this.alignment);
    this.$element.trigger("closeme.zf.tooltip", this.template.attr("id"));
    this.template.attr({
      "data-is-active": true,
      "aria-hidden": false
    });
    _this.isActive = true;
    this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {
    });
    this.$element.trigger("show.zf.tooltip");
  }
  /**
   * Hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @function
   */
  hide() {
    var _this = this;
    this.template.stop().attr({
      "aria-hidden": true,
      "data-is-active": false
    }).fadeOut(this.options.fadeOutDuration, function() {
      _this.isActive = false;
      _this.isClick = false;
    });
    this.$element.trigger("hide.zf.tooltip");
  }
  /**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */
  _events() {
    const _this = this;
    const hasTouch = "ontouchstart" in window || typeof window.ontouchstart !== "undefined";
    var isFocus = false;
    if (hasTouch && this.options.disableForTouch) return;
    if (!this.options.disableHover) {
      this.$element.on("mouseenter.zf.tooltip", function() {
        if (!_this.isActive) {
          _this.timeout = setTimeout(function() {
            _this.show();
          }, _this.options.hoverDelay);
        }
      }).on("mouseleave.zf.tooltip", ignoreMousedisappear(function() {
        clearTimeout(_this.timeout);
        if (!isFocus || _this.isClick && !_this.options.clickOpen) {
          _this.hide();
        }
      }));
    }
    if (hasTouch) {
      this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function() {
        _this.isActive ? _this.hide() : _this.show();
      });
    }
    if (this.options.clickOpen) {
      this.$element.on("mousedown.zf.tooltip", function() {
        if (_this.isClick) ;
        else {
          _this.isClick = true;
          if ((_this.options.disableHover || !_this.$element.attr("tabindex")) && !_this.isActive) {
            _this.show();
          }
        }
      });
    } else {
      this.$element.on("mousedown.zf.tooltip", function() {
        _this.isClick = true;
      });
    }
    this.$element.on({
      // 'toggle.zf.trigger': this.toggle.bind(this),
      // 'close.zf.trigger': this.hide.bind(this)
      "close.zf.trigger": this.hide.bind(this)
    });
    this.$element.on("focus.zf.tooltip", function() {
      isFocus = true;
      if (_this.isClick) {
        if (!_this.options.clickOpen) {
          isFocus = false;
        }
        return false;
      } else {
        _this.show();
      }
    }).on("focusout.zf.tooltip", function() {
      isFocus = false;
      _this.isClick = false;
      _this.hide();
    }).on("resizeme.zf.trigger", function() {
      if (_this.isActive) {
        _this._setPosition();
      }
    });
  }
  /**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @function
   */
  toggle() {
    if (this.isActive) {
      this.hide();
    } else {
      this.show();
    }
  }
  /**
   * Destroys an instance of tooltip, removes template element from the view.
   * @function
   */
  _destroy() {
    this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tooltip").removeClass(this.options.triggerClass).removeClass("top right left bottom").removeAttr("aria-describedby data-disable-hover data-resize data-toggle data-tooltip data-yeti-box");
    this.template.remove();
  }
}
Tooltip.defaults = {
  /**
   * Time, in ms, before a tooltip should open on hover.
   * @option
   * @type {number}
   * @default 200
   */
  hoverDelay: 200,
  /**
   * Time, in ms, a tooltip should take to fade into view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeInDuration: 150,
  /**
   * Time, in ms, a tooltip should take to fade out of view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeOutDuration: 150,
  /**
   * Disables hover events from opening the tooltip if set to true
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Disable the tooltip for touch devices.
   * This can be useful to make elements with a tooltip on it trigger their
   * action on the first tap instead of displaying the tooltip.
   * @option
   * @type {booelan}
   * @default false
   */
  disableForTouch: false,
  /**
   * Optional addtional classes to apply to the tooltip template on init.
   * @option
   * @type {string}
   * @default ''
   */
  templateClasses: "",
  /**
   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
   * @option
   * @type {string}
   * @default 'tooltip'
   */
  tooltipClass: "tooltip",
  /**
   * Class applied to the tooltip anchor element.
   * @option
   * @type {string}
   * @default 'has-tip'
   */
  triggerClass: "has-tip",
  /**
   * Minimum breakpoint size at which to open the tooltip.
   * @option
   * @type {string}
   * @default 'small'
   */
  showOn: "small",
  /**
   * Custom template to be used to generate markup for tooltip.
   * @option
   * @type {string}
   * @default ''
   */
  template: "",
  /**
   * Text displayed in the tooltip template on open.
   * @option
   * @type {string}
   * @default ''
   */
  tipText: "",
  touchCloseText: "Tap to close.",
  /**
   * Allows the tooltip to remain open if triggered with a click or touch event.
   * @option
   * @type {boolean}
   * @default true
   */
  clickOpen: true,
  /**
   * Position of tooltip. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: "auto",
  /**
   * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: "auto",
  /**
   * Allow overlap of container/window. If false, tooltip will first try to
   * position as defined by data-position and data-alignment, but reposition if
   * it would cause an overflow.  @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * Less common for tooltips.
   * @option
   * @type {boolean}
   * @default false
   */
  allowBottomOverlap: false,
  /**
   * Distance, in pixels, the template should push away from the anchor on the Y axis.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Distance, in pixels, the template should push away from the anchor on the X axis
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
   * @option
   * @type {number}
   * @default 14
   */
  tooltipHeight: 14,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
   * @option
   * @type {number}
   * @default 12
   */
  tooltipWidth: 12,
  /**
  * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
  * allowing HTML may open yourself up to XSS attacks.
  * @option
  * @type {boolean}
  * @default false
  */
  allowHtml: false
};
class SmoothScroll extends Plugin {
  /**
   * Creates a new instance of SmoothScroll.
   * @class
   * @name SmoothScroll
   * @fires SmoothScroll#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, SmoothScroll.defaults, this.$element.data(), options);
    this.className = "SmoothScroll";
    this._init();
  }
  /**
   * Initialize the SmoothScroll plugin
   * @private
   */
  _init() {
    const id = this.$element[0].id || GetYoDigits(6, "smooth-scroll");
    this.$element.attr({ id });
    this._events();
  }
  /**
   * Initializes events for SmoothScroll.
   * @private
   */
  _events() {
    this._linkClickListener = this._handleLinkClick.bind(this);
    this.$element.on("click.zf.smoothScroll", this._linkClickListener);
    this.$element.on("click.zf.smoothScroll", 'a[href^="#"]', this._linkClickListener);
  }
  /**
   * Handle the given event to smoothly scroll to the anchor pointed by the event target.
   * @param {*} e - event
   * @function
   * @private
   */
  _handleLinkClick(e) {
    if (!$(e.currentTarget).is('a[href^="#"]')) return;
    const arrival = e.currentTarget.getAttribute("href");
    this._inTransition = true;
    SmoothScroll.scrollToLoc(arrival, this.options, () => {
      this._inTransition = false;
    });
    e.preventDefault();
  }
  /**
   * Function to scroll to a given location on the page.
   * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
   * @param {Object} options - The options to use.
   * @param {Function} callback - The callback function.
   * @static
   * @function
   */
  static scrollToLoc(loc, options = SmoothScroll.defaults, callback) {
    const $loc = $(loc);
    if (!$loc.length) return false;
    var scrollPos = Math.round($loc.offset().top - options.threshold / 2 - options.offset);
    $("html, body").stop(true).animate(
      { scrollTop: scrollPos },
      options.animationDuration,
      options.animationEasing,
      () => {
        if (typeof callback === "function") {
          callback();
        }
      }
    );
  }
  /**
   * Destroys the SmoothScroll instance.
   * @function
   */
  _destroy() {
    this.$element.off("click.zf.smoothScroll", this._linkClickListener);
    this.$element.off("click.zf.smoothScroll", 'a[href^="#"]', this._linkClickListener);
  }
}
SmoothScroll.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: "linear",
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
};
class Magellan extends Plugin {
  /**
   * Creates a new instance of Magellan.
   * @class
   * @name Magellan
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Magellan.defaults, this.$element.data(), options);
    this.className = "Magellan";
    Triggers.init($);
    this._init();
    this.calcPoints();
  }
  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  _init() {
    var id = this.$element[0].id || GetYoDigits(6, "magellan");
    this.$targets = $("[data-magellan-target]");
    this.$links = this.$element.find("a");
    this.$element.attr({
      "data-resize": id,
      "data-scroll": id,
      "id": id
    });
    this.$active = $();
    this.scrollPos = parseInt(window.pageYOffset, 10);
    this._events();
  }
  /**
   * Calculates an array of pixel values that are the demarcation lines between locations on the page.
   * Can be invoked if new elements are added or the size of a location changes.
   * @function
   */
  calcPoints() {
    var _this = this, body = document.body, html = document.documentElement;
    this.points = [];
    this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
    this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
    this.$targets.each(function() {
      var $tar = $(this), pt = Math.round($tar.offset().top - _this.options.threshold);
      $tar.targetPoint = pt;
      _this.points.push(pt);
    });
  }
  /**
   * Initializes events for Magellan.
   * @private
   */
  _events() {
    var _this = this;
    $(window).one("load", function() {
      if (_this.options.deepLinking) {
        if (location.hash) {
          _this.scrollToLoc(location.hash);
        }
      }
      _this.calcPoints();
      _this._updateActive();
    });
    _this.onLoadListener = onLoad($(window), function() {
      _this.$element.on({
        "resizeme.zf.trigger": _this.reflow.bind(_this),
        "scrollme.zf.trigger": _this._updateActive.bind(_this)
      }).on("click.zf.magellan", 'a[href^="#"]', function(e) {
        e.preventDefault();
        var arrival = this.getAttribute("href");
        _this.scrollToLoc(arrival);
      });
    });
    this._deepLinkScroll = function() {
      if (_this.options.deepLinking) {
        _this.scrollToLoc(window.location.hash);
      }
    };
    $(window).on("hashchange", this._deepLinkScroll);
  }
  /**
   * Function to scroll to a given location on the page.
   * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
   * @function
   */
  scrollToLoc(loc) {
    this._inTransition = true;
    var _this = this;
    var options = {
      animationEasing: this.options.animationEasing,
      animationDuration: this.options.animationDuration,
      threshold: this.options.threshold,
      offset: this.options.offset
    };
    SmoothScroll.scrollToLoc(loc, options, function() {
      _this._inTransition = false;
    });
  }
  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @function
   */
  reflow() {
    this.calcPoints();
    this._updateActive();
  }
  /**
   * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
   * @private
   * @function
   * @fires Magellan#update
   */
  _updateActive() {
    if (this._inTransition) return;
    const newScrollPos = parseInt(window.pageYOffset, 10);
    const isScrollingUp = this.scrollPos > newScrollPos;
    this.scrollPos = newScrollPos;
    let activeIdx;
    if (newScrollPos < this.points[0] - this.options.offset - (isScrollingUp ? this.options.threshold : 0)) ;
    else if (newScrollPos + this.winHeight === this.docHeight) {
      activeIdx = this.points.length - 1;
    } else {
      const visibleLinks = this.points.filter((p) => {
        return p - this.options.offset - (isScrollingUp ? this.options.threshold : 0) <= newScrollPos;
      });
      activeIdx = visibleLinks.length ? visibleLinks.length - 1 : 0;
    }
    const $oldActive = this.$active;
    let activeHash = "";
    if (typeof activeIdx !== "undefined") {
      this.$active = this.$links.filter('[href="#' + this.$targets.eq(activeIdx).data("magellan-target") + '"]');
      if (this.$active.length) activeHash = this.$active[0].getAttribute("href");
    } else {
      this.$active = $();
    }
    const isNewActive = !(!this.$active.length && !$oldActive.length) && !this.$active.is($oldActive);
    const isNewHash = activeHash !== window.location.hash;
    if (isNewActive) {
      $oldActive.removeClass(this.options.activeClass);
      this.$active.addClass(this.options.activeClass);
    }
    if (this.options.deepLinking && isNewHash) {
      if (window.history.pushState) {
        const url = activeHash ? activeHash : window.location.pathname + window.location.search;
        if (this.options.updateHistory) {
          window.history.pushState({}, "", url);
        } else {
          window.history.replaceState({}, "", url);
        }
      } else {
        window.location.hash = activeHash;
      }
    }
    if (isNewActive) {
      this.$element.trigger("update.zf.magellan", [this.$active]);
    }
  }
  /**
   * Destroys an instance of Magellan and resets the url of the window.
   * @function
   */
  _destroy() {
    this.$element.off(".zf.trigger .zf.magellan").find(`.${this.options.activeClass}`).removeClass(this.options.activeClass);
    if (this.options.deepLinking) {
      var hash = this.$active[0].getAttribute("href");
      window.location.hash.replace(hash, "");
    }
    $(window).off("hashchange", this._deepLinkScroll);
    if (this.onLoadListener) $(window).off(this.onLoadListener);
  }
}
Magellan.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: "linear",
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  activeClass: "is-active",
  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinking: false,
  /**
   * Update the browser history with the active link, if deep linking is enabled.
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
};
class Sticky extends Plugin {
  /**
   * Creates a new instance of a sticky thing.
   * @class
   * @name Sticky
   * @param {jQuery} element - jQuery object to make sticky.
   * @param {Object} options - options object passed when creating the element programmatically.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);
    this.className = "Sticky";
    Triggers.init($);
    this._init();
  }
  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @function
   * @private
   */
  _init() {
    MediaQuery._init();
    var $parent = this.$element.parent("[data-sticky-container]"), id = this.$element[0].id || GetYoDigits(6, "sticky"), _this = this;
    if ($parent.length) {
      this.$container = $parent;
    } else {
      this.wasWrapped = true;
      this.$element.wrap(this.options.container);
      this.$container = this.$element.parent();
    }
    this.$container.addClass(this.options.containerClass);
    this.$element.addClass(this.options.stickyClass).attr({ "data-resize": id, "data-mutate": id });
    if (this.options.anchor !== "") {
      $("#" + _this.options.anchor).attr({ "data-mutate": id });
    }
    this.scrollCount = this.options.checkEvery;
    this.isStuck = false;
    this.onLoadListener = onLoad($(window), function() {
      _this.containerHeight = _this.$element.css("display") === "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
      _this.$container.css("height", _this.containerHeight);
      _this.elemHeight = _this.containerHeight;
      if (_this.options.anchor !== "") {
        _this.$anchor = $("#" + _this.options.anchor);
      } else {
        _this._parsePoints();
      }
      _this._setSizes(function() {
        var scroll = window.pageYOffset;
        _this._calc(false, scroll);
        if (!_this.isStuck) {
          _this._removeSticky(scroll >= _this.topPoint ? false : true);
        }
      });
      _this._events(id.split("-").reverse().join("-"));
    });
  }
  /**
   * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
   * @function
   * @private
   */
  _parsePoints() {
    var top = this.options.topAnchor === "" ? 1 : this.options.topAnchor, btm = this.options.btmAnchor === "" ? document.documentElement.scrollHeight : this.options.btmAnchor, pts = [top, btm], breaks = {};
    for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
      var pt;
      if (typeof pts[i] === "number") {
        pt = pts[i];
      } else {
        var place = pts[i].split(":"), anchor = $(`#${place[0]}`);
        pt = anchor.offset().top;
        if (place[1] && place[1].toLowerCase() === "bottom") {
          pt += anchor[0].getBoundingClientRect().height;
        }
      }
      breaks[i] = pt;
    }
    this.points = breaks;
    return;
  }
  /**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  _events(id) {
    var _this = this, scrollListener = this.scrollListener = `scroll.zf.${id}`;
    if (this.isOn) {
      return;
    }
    if (this.canStick) {
      this.isOn = true;
      $(window).off(scrollListener).on(scrollListener, function() {
        if (_this.scrollCount === 0) {
          _this.scrollCount = _this.options.checkEvery;
          _this._setSizes(function() {
            _this._calc(false, window.pageYOffset);
          });
        } else {
          _this.scrollCount--;
          _this._calc(false, window.pageYOffset);
        }
      });
    }
    this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function() {
      _this._eventsHandler(id);
    });
    this.$element.on("mutateme.zf.trigger", function() {
      _this._eventsHandler(id);
    });
    if (this.$anchor) {
      this.$anchor.on("mutateme.zf.trigger", function() {
        _this._eventsHandler(id);
      });
    }
  }
  /**
   * Handler for events.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  _eventsHandler(id) {
    var _this = this, scrollListener = this.scrollListener = `scroll.zf.${id}`;
    _this._setSizes(function() {
      _this._calc(false);
      if (_this.canStick) {
        if (!_this.isOn) {
          _this._events(id);
        }
      } else if (_this.isOn) {
        _this._pauseListeners(scrollListener);
      }
    });
  }
  /**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */
  _pauseListeners(scrollListener) {
    this.isOn = false;
    $(window).off(scrollListener);
    this.$element.trigger("pause.zf.sticky");
  }
  /**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
   */
  _calc(checkSizes, scroll) {
    if (checkSizes) {
      this._setSizes();
    }
    if (!this.canStick) {
      if (this.isStuck) {
        this._removeSticky(true);
      }
      return false;
    }
    if (!scroll) {
      scroll = window.pageYOffset;
    }
    if (scroll >= this.topPoint) {
      if (scroll <= this.bottomPoint) {
        if (!this.isStuck) {
          this._setSticky();
        }
      } else {
        if (this.isStuck) {
          this._removeSticky(false);
        }
      }
    } else {
      if (this.isStuck) {
        this._removeSticky(true);
      }
    }
  }
  /**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   * @function
   * @private
   */
  _setSticky() {
    var _this = this, stickTo = this.options.stickTo, mrgn = stickTo === "top" ? "marginTop" : "marginBottom", notStuckTo = stickTo === "top" ? "bottom" : "top", css = {};
    css[mrgn] = `${this.options[mrgn]}em`;
    css[stickTo] = 0;
    css[notStuckTo] = "auto";
    this.isStuck = true;
    this.$element.removeClass(`is-anchored is-at-${notStuckTo}`).addClass(`is-stuck is-at-${stickTo}`).css(css).trigger(`sticky.zf.stuckto:${stickTo}`);
    this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
      _this._setSizes();
    });
  }
  /**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   * @private
   */
  _removeSticky(isTop) {
    var stickTo = this.options.stickTo, stickToTop = stickTo === "top", css = {}, anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight, mrgn = stickToTop ? "marginTop" : "marginBottom", topOrBottom = isTop ? "top" : "bottom";
    css[mrgn] = 0;
    css.bottom = "auto";
    if (isTop) {
      css.top = 0;
    } else {
      css.top = anchorPt;
    }
    this.isStuck = false;
    this.$element.removeClass(`is-stuck is-at-${stickTo}`).addClass(`is-anchored is-at-${topOrBottom}`).css(css).trigger(`sticky.zf.unstuckfrom:${topOrBottom}`);
  }
  /**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   * @private
   */
  _setSizes(cb) {
    this.canStick = MediaQuery.is(this.options.stickyOn);
    if (!this.canStick) {
      if (cb && typeof cb === "function") {
        cb();
      }
    }
    var newElemWidth = this.$container[0].getBoundingClientRect().width, comp = window.getComputedStyle(this.$container[0]), pdngl = parseInt(comp["padding-left"], 10), pdngr = parseInt(comp["padding-right"], 10);
    if (this.$anchor && this.$anchor.length) {
      this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
    } else {
      this._parsePoints();
    }
    this.$element.css({
      "max-width": `${newElemWidth - pdngl - pdngr}px`
    });
    if (this.options.dynamicHeight || !this.containerHeight) {
      var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
      newContainerHeight = this.$element.css("display") === "none" ? 0 : newContainerHeight;
      this.$container.css("height", newContainerHeight);
      this.containerHeight = newContainerHeight;
    }
    this.elemHeight = this.containerHeight;
    if (!this.isStuck) {
      if (this.$element.hasClass("is-at-bottom")) {
        var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
        this.$element.css("top", anchorPt);
      }
    }
    this._setBreakPoints(this.containerHeight, function() {
      if (cb && typeof cb === "function") {
        cb();
      }
    });
  }
  /**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */
  _setBreakPoints(elemHeight, cb) {
    if (!this.canStick) {
      if (cb && typeof cb === "function") {
        cb();
      } else {
        return false;
      }
    }
    var mTop = emCalc(this.options.marginTop), mBtm = emCalc(this.options.marginBottom), topPoint = this.points ? this.points[0] : this.$anchor.offset().top, bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight, winHeight = window.innerHeight;
    if (this.options.stickTo === "top") {
      topPoint -= mTop;
      bottomPoint -= elemHeight + mTop;
    } else if (this.options.stickTo === "bottom") {
      topPoint -= winHeight - (elemHeight + mBtm);
      bottomPoint -= winHeight - mBtm;
    } else ;
    this.topPoint = topPoint;
    this.bottomPoint = bottomPoint;
    if (cb && typeof cb === "function") {
      cb();
    }
  }
  /**
   * Destroys the current sticky element.
   * Resets the element to the top position first.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   * @function
   */
  _destroy() {
    this._removeSticky(true);
    this.$element.removeClass(`${this.options.stickyClass} is-anchored is-at-top`).css({
      height: "",
      top: "",
      bottom: "",
      "max-width": ""
    }).off("resizeme.zf.trigger").off("mutateme.zf.trigger");
    if (this.$anchor && this.$anchor.length) {
      this.$anchor.off("change.zf.sticky");
    }
    if (this.scrollListener) $(window).off(this.scrollListener);
    if (this.onLoadListener) $(window).off(this.onLoadListener);
    if (this.wasWrapped) {
      this.$element.unwrap();
    } else {
      this.$container.removeClass(this.options.containerClass).css({
        height: ""
      });
    }
  }
}
Sticky.defaults = {
  /**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @type {string}
   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
   */
  container: "<div data-sticky-container></div>",
  /**
   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
   * @option
   * @type {string}
   * @default 'top'
   */
  stickTo: "top",
  /**
   * If anchored to a single element, the id of that element.
   * @option
   * @type {string}
   * @default ''
   */
  anchor: "",
  /**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @type {string}
   * @default ''
   */
  topAnchor: "",
  /**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @type {string}
   * @default ''
   */
  btmAnchor: "",
  /**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginTop: 1,
  /**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginBottom: 1,
  /**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @type {string}
   * @default 'medium'
   */
  stickyOn: "medium",
  /**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @type {string}
   * @default 'sticky'
   */
  stickyClass: "sticky",
  /**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @type {string}
   * @default 'sticky-container'
   */
  containerClass: "sticky-container",
  /**
   * If true (by default), keep the sticky container the same height as the element. Otherwise, the container height is set once and does not change.
   * @option
   * @type {boolean}
   * @default true
   */
  dynamicHeight: true,
  /**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @type {number}
   * @default -1
   */
  checkEvery: -1
};
function emCalc(em) {
  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
}
class Toggler extends Plugin {
  /**
   * Creates a new instance of Toggler.
   * @class
   * @name Toggler
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Toggler.defaults, element.data(), options);
    this.className = "";
    this.className = "Toggler";
    Triggers.init($);
    this._init();
    this._events();
  }
  /**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */
  _init() {
    var id = this.$element[0].id, $triggers = $(`[data-open~="${id}"], [data-close~="${id}"], [data-toggle~="${id}"]`);
    var input;
    if (this.options.animate) {
      input = this.options.animate.split(" ");
      this.animationIn = input[0];
      this.animationOut = input[1] || null;
      $triggers.attr("aria-expanded", !this.$element.is(":hidden"));
    } else {
      input = this.options.toggler;
      if (typeof input !== "string" || !input.length) {
        throw new Error(`The 'toggler' option containing the target class is required, got "${input}"`);
      }
      this.className = input[0] === "." ? input.slice(1) : input;
      $triggers.attr("aria-expanded", this.$element.hasClass(this.className));
    }
    $triggers.each((index, trigger) => {
      const $trigger = $(trigger);
      const controls = $trigger.attr("aria-controls") || "";
      const containsId = new RegExp(`\\b${RegExpEscape(id)}\\b`).test(controls);
      if (!containsId) $trigger.attr("aria-controls", controls ? `${controls} ${id}` : id);
    });
  }
  /**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */
  _events() {
    this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this));
  }
  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  toggle() {
    this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]();
  }
  _toggleClass() {
    this.$element.toggleClass(this.className);
    var isOn = this.$element.hasClass(this.className);
    if (isOn) {
      this.$element.trigger("on.zf.toggler");
    } else {
      this.$element.trigger("off.zf.toggler");
    }
    this._updateARIA(isOn);
    this.$element.find("[data-mutate]").trigger("mutateme.zf.trigger");
  }
  _toggleAnimate() {
    var _this = this;
    if (this.$element.is(":hidden")) {
      Motion.animateIn(this.$element, this.animationIn, function() {
        _this._updateARIA(true);
        this.trigger("on.zf.toggler");
        this.find("[data-mutate]").trigger("mutateme.zf.trigger");
      });
    } else {
      Motion.animateOut(this.$element, this.animationOut, function() {
        _this._updateARIA(false);
        this.trigger("off.zf.toggler");
        this.find("[data-mutate]").trigger("mutateme.zf.trigger");
      });
    }
  }
  _updateARIA(isOn) {
    var id = this.$element[0].id;
    $(`[data-open="${id}"], [data-close="${id}"], [data-toggle="${id}"]`).attr({
      "aria-expanded": isOn ? true : false
    });
  }
  /**
   * Destroys the instance of Toggler on the element.
   * @function
   */
  _destroy() {
    this.$element.off(".zf.toggler");
  }
}
Toggler.defaults = {
  /**
   * Class of the element to toggle. It can be provided with or without "."
   * @option
   * @type {string}
   */
  toggler: void 0,
  /**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};
class Equalizer extends Plugin {
  /**
   * Creates a new instance of Equalizer.
   * @class
   * @name Equalizer
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);
    this.className = "Equalizer";
    this._init();
  }
  /**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  _init() {
    var eqId = this.$element.attr("data-equalizer") || "";
    var $watched = this.$element.find(`[data-equalizer-watch="${eqId}"]`);
    MediaQuery._init();
    this.$watched = $watched.length ? $watched : this.$element.find("[data-equalizer-watch]");
    this.$element.attr("data-resize", eqId || GetYoDigits(6, "eq"));
    this.$element.attr("data-mutate", eqId || GetYoDigits(6, "eq"));
    this.hasNested = this.$element.find("[data-equalizer]").length > 0;
    this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0;
    this.isOn = false;
    this._bindHandler = {
      onResizeMeBound: this._onResizeMe.bind(this),
      onPostEqualizedBound: this._onPostEqualized.bind(this)
    };
    var imgs = this.$element.find("img");
    var tooSmall;
    if (this.options.equalizeOn) {
      tooSmall = this._checkMQ();
      $(window).on("changed.zf.mediaquery", this._checkMQ.bind(this));
    } else {
      this._events();
    }
    if (typeof tooSmall !== "undefined" && tooSmall === false || typeof tooSmall === "undefined") {
      if (imgs.length) {
        onImagesLoaded(imgs, this._reflow.bind(this));
      } else {
        this._reflow();
      }
    }
  }
  /**
   * Removes event listeners if the breakpoint is too small.
   * @private
   */
  _pauseEvents() {
    this.isOn = false;
    this.$element.off({
      ".zf.equalizer": this._bindHandler.onPostEqualizedBound,
      "resizeme.zf.trigger": this._bindHandler.onResizeMeBound,
      "mutateme.zf.trigger": this._bindHandler.onResizeMeBound
    });
  }
  /**
   * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
   * @private
   */
  _onResizeMe() {
    this._reflow();
  }
  /**
   * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
   * @private
   */
  _onPostEqualized(e) {
    if (e.target !== this.$element[0]) {
      this._reflow();
    }
  }
  /**
   * Initializes events for Equalizer.
   * @private
   */
  _events() {
    this._pauseEvents();
    if (this.hasNested) {
      this.$element.on("postequalized.zf.equalizer", this._bindHandler.onPostEqualizedBound);
    } else {
      this.$element.on("resizeme.zf.trigger", this._bindHandler.onResizeMeBound);
      this.$element.on("mutateme.zf.trigger", this._bindHandler.onResizeMeBound);
    }
    this.isOn = true;
  }
  /**
   * Checks the current breakpoint to the minimum required size.
   * @private
   */
  _checkMQ() {
    var tooSmall = !MediaQuery.is(this.options.equalizeOn);
    if (tooSmall) {
      if (this.isOn) {
        this._pauseEvents();
        this.$watched.css("height", "auto");
      }
    } else {
      if (!this.isOn) {
        this._events();
      }
    }
    return tooSmall;
  }
  /**
   * A noop version for the plugin
   * @private
   */
  _killswitch() {
    return;
  }
  /**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */
  _reflow() {
    if (!this.options.equalizeOnStack) {
      if (this._isStacked()) {
        this.$watched.css("height", "auto");
        return false;
      }
    }
    if (this.options.equalizeByRow) {
      this.getHeightsByRow(this.applyHeightByRow.bind(this));
    } else {
      this.getHeights(this.applyHeight.bind(this));
    }
  }
  /**
   * Manually determines if the first 2 elements are *NOT* stacked.
   * @private
   */
  _isStacked() {
    if (!this.$watched[0] || !this.$watched[1]) {
      return true;
    }
    return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
  }
  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} heights - An array of heights of children within Equalizer container
   */
  getHeights(cb) {
    var heights = [];
    for (var i = 0, len = this.$watched.length; i < len; i++) {
      this.$watched[i].style.height = "auto";
      heights.push(this.$watched[i].offsetHeight);
    }
    cb(heights);
  }
  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   */
  getHeightsByRow(cb) {
    var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0, groups = [], group = 0;
    groups[group] = [];
    for (var i = 0, len = this.$watched.length; i < len; i++) {
      this.$watched[i].style.height = "auto";
      var elOffsetTop = $(this.$watched[i]).offset().top;
      if (elOffsetTop !== lastElTopOffset) {
        group++;
        groups[group] = [];
        lastElTopOffset = elOffsetTop;
      }
      groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
    }
    for (var j = 0, ln = groups.length; j < ln; j++) {
      var heights = $(groups[j]).map(function() {
        return this[1];
      }).get();
      var max = Math.max.apply(null, heights);
      groups[j].push(max);
    }
    cb(groups);
  }
  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */
  applyHeight(heights) {
    var max = Math.max.apply(null, heights);
    this.$element.trigger("preequalized.zf.equalizer");
    this.$watched.css("height", max);
    this.$element.trigger("postequalized.zf.equalizer");
  }
  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedrow
   * @fires Equalizer#postequalizedrow
   * @fires Equalizer#postequalized
   */
  applyHeightByRow(groups) {
    this.$element.trigger("preequalized.zf.equalizer");
    for (var i = 0, len = groups.length; i < len; i++) {
      var groupsILength = groups[i].length, max = groups[i][groupsILength - 1];
      if (groupsILength <= 2) {
        $(groups[i][0][0]).css({ "height": "auto" });
        continue;
      }
      this.$element.trigger("preequalizedrow.zf.equalizer");
      for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
        $(groups[i][j][0]).css({ "height": max });
      }
      this.$element.trigger("postequalizedrow.zf.equalizer");
    }
    this.$element.trigger("postequalized.zf.equalizer");
  }
  /**
   * Destroys an instance of Equalizer.
   * @function
   */
  _destroy() {
    this._pauseEvents();
    this.$watched.css("height", "auto");
  }
}
Equalizer.defaults = {
  /**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeOnStack: false,
  /**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeByRow: false,
  /**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
  equalizeOn: ""
};
class Interchange extends Plugin {
  /**
   * Creates a new instance of Interchange.
   * @class
   * @name Interchange
   * @fires Interchange#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Interchange.defaults, this.$element.data(), options);
    this.rules = [];
    this.currentPath = "";
    this.className = "Interchange";
    Triggers.init($);
    this._init();
    this._events();
  }
  /**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @function
   * @private
   */
  _init() {
    MediaQuery._init();
    var id = this.$element[0].id || GetYoDigits(6, "interchange");
    this.$element.attr({
      "data-resize": id,
      "id": id
    });
    this._parseOptions();
    this._addBreakpoints();
    this._generateRules();
    this._reflow();
  }
  /**
   * Initializes events for Interchange.
   * @function
   * @private
   */
  _events() {
    this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", () => this._reflow());
  }
  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @function
   * @private
   */
  _reflow() {
    var match;
    for (var i in this.rules) {
      if (this.rules.hasOwnProperty(i)) {
        var rule = this.rules[i];
        if (window.matchMedia(rule.query).matches) {
          match = rule;
        }
      }
    }
    if (match) {
      this.replace(match.path);
    }
  }
  /**
   * Check options valifity and set defaults for:
   * - `data-interchange-type`: if set, enforce the type of replacement (auto, src, background or html)
   * @function
   * @private
   */
  _parseOptions() {
    var types = ["auto", "src", "background", "html"];
    if (typeof this.options.type === "undefined")
      this.options.type = "auto";
    else if (types.indexOf(this.options.type) === -1) {
      console.warn(`Warning: invalid value "${this.options.type}" for Interchange option "type"`);
      this.options.type = "auto";
    }
  }
  /**
   * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
   * @function
   * @private
   */
  _addBreakpoints() {
    for (var i in MediaQuery.queries) {
      if (MediaQuery.queries.hasOwnProperty(i)) {
        var query = MediaQuery.queries[i];
        Interchange.SPECIAL_QUERIES[query.name] = query.value;
      }
    }
  }
  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @function
   * @private
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  _generateRules() {
    var rulesList = [];
    var rules;
    if (this.options.rules) {
      rules = this.options.rules;
    } else {
      rules = this.$element.data("interchange");
    }
    rules = typeof rules === "string" ? rules.match(/\[.*?, .*?\]/g) : rules;
    for (var i in rules) {
      if (rules.hasOwnProperty(i)) {
        var rule = rules[i].slice(1, -1).split(", ");
        var path = rule.slice(0, -1).join("");
        var query = rule[rule.length - 1];
        if (Interchange.SPECIAL_QUERIES[query]) {
          query = Interchange.SPECIAL_QUERIES[query];
        }
        rulesList.push({
          path,
          query
        });
      }
    }
    this.rules = rulesList;
  }
  /**
   * Update the `src` property of an image, or change the HTML of a container, to the specified path.
   * @function
   * @param {String} path - Path to the image or HTML partial.
   * @fires Interchange#replaced
   */
  replace(path) {
    if (this.currentPath === path) return;
    var trigger = "replaced.zf.interchange";
    var type3 = this.options.type;
    if (type3 === "auto") {
      if (this.$element[0].nodeName === "IMG")
        type3 = "src";
      else if (path.match(/\.(gif|jpe?g|png|svg|tiff)([?#].*)?/i))
        type3 = "background";
      else
        type3 = "html";
    }
    if (type3 === "src") {
      this.$element.attr("src", path).on("load", () => {
        this.currentPath = path;
      }).trigger(trigger);
    } else if (type3 === "background") {
      path = path.replace(/\(/g, "%28").replace(/\)/g, "%29");
      this.$element.css({ "background-image": "url(" + path + ")" }).trigger(trigger);
    } else if (type3 === "html") {
      $.get(path, (response) => {
        this.$element.html(response).trigger(trigger);
        $(response).foundation();
        this.currentPath = path;
      });
    }
  }
  /**
   * Destroys an instance of interchange.
   * @function
   */
  _destroy() {
    this.$element.off("resizeme.zf.trigger");
  }
}
Interchange.defaults = {
  /**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   * @type {?array}
   * @default null
   */
  rules: null,
  /**
   * Type of the responsive ressource to replace. It can take the following options:
   * - `auto` (default): choose the type according to the element tag or the ressource extension,
   * - `src`: replace the `[src]` attribute, recommended for images `<img>`.
   * - `background`: replace the `background-image` CSS property.
   * - `html`: replace the element content.
   * @option
   * @type {string}
   * @default 'auto'
   */
  type: "auto"
};
Interchange.SPECIAL_QUERIES = {
  "landscape": "screen and (orientation: landscape)",
  "portrait": "screen and (orientation: portrait)",
  "retina": "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
};
class Abide extends Plugin {
  /**
   * Creates a new instance of Abide.
   * @class
   * @name Abide
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options = {}) {
    this.$element = element;
    this.options = $.extend(true, {}, Abide.defaults, this.$element.data(), options);
    this.isEnabled = true;
    this.formnovalidate = null;
    this.className = "Abide";
    this._init();
  }
  /**
   * Initializes the Abide plugin and calls functions to get Abide functioning on load.
   * @private
   */
  _init() {
    this.$inputs = $.merge(
      // Consider as input to validate:
      this.$element.find("input").not('[type="submit"]'),
      // * all input fields expect submit
      this.$element.find("textarea, select")
      // * all textareas and select fields
    );
    this.$submits = this.$element.find('[type="submit"]');
    const $globalErrors = this.$element.find("[data-abide-error]");
    if (this.options.a11yAttributes) {
      this.$inputs.each((i, input) => this.addA11yAttributes($(input)));
      $globalErrors.each((i, error) => this.addGlobalErrorA11yAttributes($(error)));
    }
    this._events();
  }
  /**
   * Initializes events for Abide.
   * @private
   */
  _events() {
    this.$element.off(".abide").on("reset.zf.abide", () => {
      this.resetForm();
    }).on("submit.zf.abide", () => {
      return this.validateForm();
    });
    this.$submits.off("click.zf.abide keydown.zf.abide").on("click.zf.abide keydown.zf.abide", (e) => {
      if (!e.key || (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        this.formnovalidate = e.target.getAttribute("formnovalidate") !== null;
        this.$element.submit();
      }
    });
    if (this.options.validateOn === "fieldChange") {
      this.$inputs.off("change.zf.abide").on("change.zf.abide", (e) => {
        this.validateInput($(e.target));
      });
    }
    if (this.options.liveValidate) {
      this.$inputs.off("input.zf.abide").on("input.zf.abide", (e) => {
        this.validateInput($(e.target));
      });
    }
    if (this.options.validateOnBlur) {
      this.$inputs.off("blur.zf.abide").on("blur.zf.abide", (e) => {
        this.validateInput($(e.target));
      });
    }
  }
  /**
   * Calls necessary functions to update Abide upon DOM change
   * @private
   */
  _reflow() {
    this._init();
  }
  /**
   * Checks whether the submitted form should be validated or not, consodering formnovalidate and isEnabled
   * @returns {Boolean}
   * @private
   */
  _validationIsDisabled() {
    if (this.isEnabled === false) {
      return true;
    } else if (typeof this.formnovalidate === "boolean") {
      return this.formnovalidate;
    }
    return this.$submits.length ? this.$submits[0].getAttribute("formnovalidate") !== null : false;
  }
  /**
   * Enables the whole validation
   */
  enableValidation() {
    this.isEnabled = true;
  }
  /**
   * Disables the whole validation
   */
  disableValidation() {
    this.isEnabled = false;
  }
  /**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  requiredCheck($el) {
    if (!$el.attr("required")) return true;
    var isGood = true;
    switch ($el[0].type) {
      case "checkbox":
        isGood = $el[0].checked;
        break;
      case "select":
      case "select-one":
      case "select-multiple":
        var opt = $el.find("option:selected");
        if (!opt.length || !opt.val()) isGood = false;
        break;
      default:
        if (!$el.val() || !$el.val().length) isGood = false;
    }
    return isGood;
  }
  /**
   * Get:
   * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
   *   1. The element's direct sibling('s).
   *   2. The element's parent's children.
   * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
   *
   * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
   *
   * @param {Object} $el - jQuery object to use as reference to find the form error selector.
   * @param {String[]} [failedValidators] - List of failed validators.
   * @returns {Object} jQuery object with the selector.
   */
  findFormError($el, failedValidators) {
    var id = $el.length ? $el[0].id : "";
    var $error = $el.siblings(this.options.formErrorSelector);
    if (!$error.length) {
      $error = $el.parent().find(this.options.formErrorSelector);
    }
    if (id) {
      $error = $error.add(this.$element.find(`[data-form-error-for="${id}"]`));
    }
    if (!!failedValidators) {
      $error = $error.not("[data-form-error-on]");
      failedValidators.forEach((v) => {
        $error = $error.add($el.siblings(`[data-form-error-on="${v}"]`));
        $error = $error.add(this.$element.find(`[data-form-error-for="${id}"][data-form-error-on="${v}"]`));
      });
    }
    return $error;
  }
  /**
   * Get the first element in this order:
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  findLabel($el) {
    var id = $el[0].id;
    var $label = this.$element.find(`label[for="${id}"]`);
    if (!$label.length) {
      return $el.closest("label");
    }
    return $label;
  }
  /**
   * Get the set of labels associated with a set of radio els in this order
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  findRadioLabels($els) {
    var labels = $els.map((i, el) => {
      var id = el.id;
      var $label = this.$element.find(`label[for="${id}"]`);
      if (!$label.length) {
        $label = $(el).closest("label");
      }
      return $label[0];
    });
    return $(labels);
  }
  /**
   * Get the set of labels associated with a set of checkbox els in this order
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  findCheckboxLabels($els) {
    var labels = $els.map((i, el) => {
      var id = el.id;
      var $label = this.$element.find(`label[for="${id}"]`);
      if (!$label.length) {
        $label = $(el).closest("label");
      }
      return $label[0];
    });
    return $(labels);
  }
  /**
   * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
   * @param {Object} $el - jQuery object to add the class to
   * @param {String[]} [failedValidators] - List of failed validators.
   */
  addErrorClasses($el, failedValidators) {
    var $label = this.findLabel($el);
    var $formError = this.findFormError($el, failedValidators);
    if ($label.length) {
      $label.addClass(this.options.labelErrorClass);
    }
    if ($formError.length) {
      $formError.addClass(this.options.formErrorClass);
    }
    $el.addClass(this.options.inputErrorClass).attr({
      "data-invalid": "",
      "aria-invalid": true
    });
    if ($formError.filter(":visible").length) {
      this.addA11yErrorDescribe($el, $formError);
    }
  }
  /**
   * Adds [for] and [role=alert] attributes to all form error targetting $el,
   * and [aria-describedby] attribute to $el toward the first form error.
   * @param {Object} $el - jQuery object
   */
  addA11yAttributes($el) {
    let $errors = this.findFormError($el);
    let $labels = $errors.filter("label");
    if (!$errors.length) return;
    let $error = $errors.filter(":visible").first();
    if ($error.length) {
      this.addA11yErrorDescribe($el, $error);
    }
    if ($labels.filter("[for]").length < $labels.length) {
      let elemId = $el.attr("id");
      if (typeof elemId === "undefined") {
        elemId = GetYoDigits(6, "abide-input");
        $el.attr("id", elemId);
      }
      $labels.each((i, label) => {
        const $label = $(label);
        if (typeof $label.attr("for") === "undefined")
          $label.attr("for", elemId);
      });
    }
    $errors.each((i, label) => {
      const $label = $(label);
      if (typeof $label.attr("role") === "undefined")
        $label.attr("role", "alert");
    }).end();
  }
  addA11yErrorDescribe($el, $error) {
    if ($el.attr("type") === "hidden") return;
    if (typeof $el.attr("aria-describedby") !== "undefined") return;
    let errorId = $error.attr("id");
    if (typeof errorId === "undefined") {
      errorId = GetYoDigits(6, "abide-error");
      $error.attr("id", errorId);
    }
    $el.attr("aria-describedby", errorId).data("abide-describedby", true);
  }
  /**
   * Adds [aria-live] attribute to the given global form error $el.
   * @param {Object} $el - jQuery object to add the attribute to
   */
  addGlobalErrorA11yAttributes($el) {
    if (typeof $el.attr("aria-live") === "undefined")
      $el.attr("aria-live", this.options.a11yErrorLevel);
  }
  /**
   * Remove CSS error classes etc from an entire radio button group
   * @param {String} groupName - A string that specifies the name of a radio button group
   *
   */
  removeRadioErrorClasses(groupName) {
    var $els = this.$element.find(`:radio[name="${groupName}"]`);
    var $labels = this.findRadioLabels($els);
    var $formErrors = this.findFormError($els);
    if ($labels.length) {
      $labels.removeClass(this.options.labelErrorClass);
    }
    if ($formErrors.length) {
      $formErrors.removeClass(this.options.formErrorClass);
    }
    $els.removeClass(this.options.inputErrorClass).attr({
      "data-invalid": null,
      "aria-invalid": null
    });
  }
  /**
   * Remove CSS error classes etc from an entire checkbox group
   * @param {String} groupName - A string that specifies the name of a checkbox group
   *
   */
  removeCheckboxErrorClasses(groupName) {
    var $els = this.$element.find(`:checkbox[name="${groupName}"]`);
    var $labels = this.findCheckboxLabels($els);
    var $formErrors = this.findFormError($els);
    if ($labels.length) {
      $labels.removeClass(this.options.labelErrorClass);
    }
    if ($formErrors.length) {
      $formErrors.removeClass(this.options.formErrorClass);
    }
    $els.removeClass(this.options.inputErrorClass).attr({
      "data-invalid": null,
      "aria-invalid": null
    });
  }
  /**
   * Removes CSS error class as specified by the Abide settings from the label, input, and the form
   * @param {Object} $el - jQuery object to remove the class from
   */
  removeErrorClasses($el) {
    if ($el[0].type === "radio") {
      return this.removeRadioErrorClasses($el.attr("name"));
    } else if ($el[0].type === "checkbox") {
      return this.removeCheckboxErrorClasses($el.attr("name"));
    }
    var $label = this.findLabel($el);
    var $formError = this.findFormError($el);
    if ($label.length) {
      $label.removeClass(this.options.labelErrorClass);
    }
    if ($formError.length) {
      $formError.removeClass(this.options.formErrorClass);
    }
    $el.removeClass(this.options.inputErrorClass).attr({
      "data-invalid": null,
      "aria-invalid": null
    });
    if ($el.data("abide-describedby")) {
      $el.removeAttr("aria-describedby").removeData("abide-describedby");
    }
  }
  /**
   * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
   * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
   * @fires Abide#invalid
   * @fires Abide#valid
   * @param {Object} element - jQuery object to validate, should be an HTML input
   * @returns {Boolean} goodToGo - If the input is valid or not.
   */
  validateInput($el) {
    var clearRequire = this.requiredCheck($el), validator = $el.attr("data-validator"), failedValidators = [], manageErrorClasses = true;
    if (this._validationIsDisabled()) {
      return true;
    }
    if ($el.is("[data-abide-ignore]") || $el.is('[type="hidden"]') || $el.is("[disabled]")) {
      return true;
    }
    switch ($el[0].type) {
      case "radio":
        this.validateRadio($el.attr("name")) || failedValidators.push("required");
        break;
      case "checkbox":
        this.validateCheckbox($el.attr("name")) || failedValidators.push("required");
        manageErrorClasses = false;
        break;
      case "select":
      case "select-one":
      case "select-multiple":
        clearRequire || failedValidators.push("required");
        break;
      default:
        clearRequire || failedValidators.push("required");
        this.validateText($el) || failedValidators.push("pattern");
    }
    if (validator) {
      const required = $el.attr("required") ? true : false;
      validator.split(" ").forEach((v) => {
        this.options.validators[v]($el, required, $el.parent()) || failedValidators.push(v);
      });
    }
    if ($el.attr("data-equalto")) {
      this.options.validators.equalTo($el) || failedValidators.push("equalTo");
    }
    var goodToGo = failedValidators.length === 0;
    var message = (goodToGo ? "valid" : "invalid") + ".zf.abide";
    if (goodToGo) {
      const dependentElements = this.$element.find(`[data-equalto="${$el.attr("id")}"]`);
      if (dependentElements.length) {
        let _this = this;
        dependentElements.each(function() {
          if ($(this).val()) {
            _this.validateInput($(this));
          }
        });
      }
    }
    if (manageErrorClasses) {
      this.removeErrorClasses($el);
      if (!goodToGo) {
        this.addErrorClasses($el, failedValidators);
      }
    }
    $el.trigger(message, [$el]);
    return goodToGo;
  }
  /**
   * Goes through a form and if there are any invalid inputs, it will display the form error element
   * @returns {Boolean} noError - true if no errors were detected...
   * @fires Abide#formvalid
   * @fires Abide#forminvalid
   */
  validateForm() {
    var acc = [];
    var _this = this;
    var checkboxGroupName;
    if (!this.initialized) {
      this.initialized = true;
    }
    if (this._validationIsDisabled()) {
      this.formnovalidate = null;
      return true;
    }
    this.$inputs.each(function() {
      if ($(this)[0].type === "checkbox") {
        if ($(this).attr("name") === checkboxGroupName) return true;
        checkboxGroupName = $(this).attr("name");
      }
      acc.push(_this.validateInput($(this)));
    });
    var noError = acc.indexOf(false) === -1;
    this.$element.find("[data-abide-error]").each((i, elem) => {
      const $elem = $(elem);
      if (this.options.a11yAttributes) this.addGlobalErrorA11yAttributes($elem);
      $elem.css("display", noError ? "none" : "block");
    });
    this.$element.trigger((noError ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]);
    return noError;
  }
  /**
   * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
   * @param {Object} $el - jQuery object to validate, should be a text input HTML element
   * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
   * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
   */
  validateText($el, pattern) {
    pattern = pattern || $el.attr("data-pattern") || $el.attr("pattern") || $el.attr("type");
    var inputText = $el.val();
    var valid = true;
    if (inputText.length) {
      if (this.options.patterns.hasOwnProperty(pattern)) {
        valid = this.options.patterns[pattern].test(inputText);
      } else if (pattern !== $el.attr("type")) {
        valid = new RegExp(pattern).test(inputText);
      }
    }
    return valid;
  }
  /**
   * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
   * @param {String} groupName - A string that specifies the name of a radio button group
   * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
   */
  validateRadio(groupName) {
    var $group = this.$element.find(`:radio[name="${groupName}"]`);
    var valid = false, required = false;
    $group.each((i, e) => {
      if ($(e).attr("required")) {
        required = true;
      }
    });
    if (!required) valid = true;
    if (!valid) {
      $group.each((i, e) => {
        if ($(e).prop("checked")) {
          valid = true;
        }
      });
    }
    return valid;
  }
  /**
   * Determines whether or a not a checkbox input is valid based on whether or not it is required and checked. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all checkboxes in its group.
   * @param {String} groupName - A string that specifies the name of a checkbox group
   * @returns {Boolean} Boolean value depends on whether or not at least one checkbox input has been checked (if it's required)
   */
  validateCheckbox(groupName) {
    var $group = this.$element.find(`:checkbox[name="${groupName}"]`);
    var valid = false, required = false, minRequired = 1, checked = 0;
    $group.each((i, e) => {
      if ($(e).attr("required")) {
        required = true;
      }
    });
    if (!required) valid = true;
    if (!valid) {
      $group.each((i, e) => {
        if ($(e).prop("checked")) {
          checked++;
        }
        if (typeof $(e).attr("data-min-required") !== "undefined") {
          minRequired = parseInt($(e).attr("data-min-required"), 10);
        }
      });
      if (checked >= minRequired) {
        valid = true;
      }
    }
    if (this.initialized !== true && minRequired > 1) {
      return true;
    }
    $group.each((i, e) => {
      if (!valid) {
        this.addErrorClasses($(e), ["required"]);
      } else {
        this.removeErrorClasses($(e));
      }
    });
    return valid;
  }
  /**
   * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
   * @param {Object} $el - jQuery input element.
   * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
   * @param {Boolean} required - self explanatory?
   * @returns {Boolean} - true if validations passed.
   */
  matchValidation($el, validators, required) {
    required = required ? true : false;
    var clear = validators.split(" ").map((v) => {
      return this.options.validators[v]($el, required, $el.parent());
    });
    return clear.indexOf(false) === -1;
  }
  /**
   * Resets form inputs and styles
   * @fires Abide#formreset
   */
  resetForm() {
    var $form = this.$element, opts = this.options;
    $(`.${opts.labelErrorClass}`, $form).not("small").removeClass(opts.labelErrorClass);
    $(`.${opts.inputErrorClass}`, $form).not("small").removeClass(opts.inputErrorClass);
    $(`${opts.formErrorSelector}.${opts.formErrorClass}`).removeClass(opts.formErrorClass);
    $form.find("[data-abide-error]").css("display", "none");
    $(":input", $form).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").attr({
      "data-invalid": null,
      "aria-invalid": null
    });
    $(":input:radio", $form).not("[data-abide-ignore]").prop("checked", false).attr({
      "data-invalid": null,
      "aria-invalid": null
    });
    $(":input:checkbox", $form).not("[data-abide-ignore]").prop("checked", false).attr({
      "data-invalid": null,
      "aria-invalid": null
    });
    $form.trigger("formreset.zf.abide", [$form]);
  }
  /**
   * Destroys an instance of Abide.
   * Removes error styles and classes from elements, without resetting their values.
   */
  _destroy() {
    var _this = this;
    this.$element.off(".abide").find("[data-abide-error]").css("display", "none");
    this.$inputs.off(".abide").each(function() {
      _this.removeErrorClasses($(this));
    });
    this.$submits.off(".abide");
  }
}
Abide.defaults = {
  /**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @type {?string}
   * @default 'fieldChange'
   */
  validateOn: "fieldChange",
  /**
   * Class to be applied to input labels on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-label'
   */
  labelErrorClass: "is-invalid-label",
  /**
   * Class to be applied to inputs on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-input'
   */
  inputErrorClass: "is-invalid-input",
  /**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @type {string}
   * @default '.form-error'
   */
  formErrorSelector: ".form-error",
  /**
   * Class added to Form Errors on failed validation.
   * @option
   * @type {string}
   * @default 'is-visible'
   */
  formErrorClass: "is-visible",
  /**
   * If true, automatically insert when possible:
   * - `[aria-describedby]` on fields
   * - `[role=alert]` on form errors and `[for]` on form error labels
   * - `[aria-live]` on global errors `[data-abide-error]` (see option `a11yErrorLevel`).
   * @option
   * @type {boolean}
   * @default true
   */
  a11yAttributes: true,
  /**
   * [aria-live] attribute value to be applied on global errors `[data-abide-error]`.
   * Options are: 'assertive', 'polite' and 'off'/null
   * @option
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
   * @type {string}
   * @default 'assertive'
   */
  a11yErrorLevel: "assertive",
  /**
   * Set to true to validate text inputs on any value change.
   * @option
   * @type {boolean}
   * @default false
   */
  liveValidate: false,
  /**
   * Set to true to validate inputs on blur.
   * @option
   * @type {boolean}
   * @default false
   */
  validateOnBlur: false,
  patterns: {
    alpha: /^[a-zA-Z]+$/,
    // eslint-disable-next-line camelcase
    alpha_numeric: /^[a-zA-Z0-9]+$/,
    integer: /^[-+]?\d+$/,
    number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
    // amex, visa, diners
    card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv: /^([0-9]){3,4}$/,
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    // From CommonRegexJS (@talyssonoc)
    // https://github.com/talyssonoc/CommonRegexJS/blob/e2901b9f57222bc14069dc8f0598d5f412555411/lib/commonregex.js#L76
    // For more restrictive URL Regexs, see https://mathiasbynens.be/demo/url-regex.
    url: /^((?:(https?|ftps?|file|ssh|sftp):\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))$/,
    // abc.de
    domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
    datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
    // YYYY-MM-DD
    date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
    // HH:MM:SS
    time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
    dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
    // MM/DD/YYYY
    // eslint-disable-next-line camelcase
    month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
    // DD/MM/YYYY
    // eslint-disable-next-line camelcase
    day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
    // #FFF or #FFFFFF
    color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    // Domain || URL
    website: {
      test: (text) => {
        return Abide.defaults.patterns.domain.test(text) || Abide.defaults.patterns.url.test(text);
      }
    }
  },
  /**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * @option
   */
  validators: {
    equalTo: function(el) {
      return $(`#${el.attr("data-equalto")}`).val() === el.val();
    }
  }
};
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });
export {
  Accordion as A,
  Box as B,
  Dropdown as D,
  Equalizer as E,
  Foundation as F,
  GetYoDigits as G,
  Interchange as I,
  Keyboard as K,
  MediaQuery as M,
  Nest as N,
  OffCanvas as O,
  RegExpEscape as R,
  Swiper as S,
  Touch as T,
  transitionend as a,
  ignoreMousedisappear as b,
  onImagesLoaded as c,
  Motion as d,
  Move as e,
  Triggers as f,
  Timer as g,
  DropdownMenu as h,
  isEmpty as i,
  AccordionMenu as j,
  ResponsiveMenu as k,
  ResponsiveToggle as l,
  Reveal as m,
  nanoid as n,
  onLoad as o,
  Tooltip as p,
  SmoothScroll as q,
  rtl as r,
  Magellan as s,
  toString as t,
  Sticky as u,
  Toggler as v,
  Abide as w,
  api as x,
  Ensemble as y
};
//# sourceMappingURL=_vendor.js.map
