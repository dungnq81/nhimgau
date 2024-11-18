import {
    F as a,
    T as e,
    b as n,
    c as s,
    M as o,
    d as i,
    e as r,
    o as l,
    N as t,
    B as u,
    K as p,
    f as g,
    g as m,
    h as d,
    R as c,
    G as y,
    r as j,
    D as f,
    j as v,
    A as M,
    k as Q,
    l as T,
    m as b,
    O as h,
    p as w,
    q as E,
    s as k,
    u as q,
    v as A,
    w as D,
    E as O,
    I as R,
    x
} from "./_vendor.js";
import { B as L } from "./back-to-top.js";
import { l as z } from "./lazy-loader.js";
import { i as B } from "./social-share.js";

Object.assign( window, { $: jQuery, jQuery: jQuery } ), Object.assign( a, {
    rtl: j,
    GetYoDigits: y,
    RegExpEscape: c,
    transitionend: d,
    onLoad: m,
    ignoreMousedisappear: g,
    Keyboard: p,
    Box: u,
    Nest: t,
    onImagesLoaded: l,
    MediaQuery: r,
    Motion: i,
    Move: o,
    Touch: s,
    Triggers: n,
    Timer: e
} ), s.init( jQuery ), n.init( jQuery, a ), r._init();
[ { plugin: f, name: "Dropdown" }, { plugin: v, name: "DropdownMenu" }, { plugin: M, name: "Accordion" }, {
    plugin: Q,
    name: "AccordionMenu"
}, { plugin: T, name: "ResponsiveMenu" }, { plugin: b, name: "ResponsiveToggle" }, {
    plugin: h,
    name: "OffCanvas"
}, { plugin: w, name: "Reveal" }, { plugin: E, name: "Tooltip" }, { plugin: k, name: "SmoothScroll" }, {
    plugin: q,
    name: "Magellan"
}, { plugin: A, name: "Sticky" }, { plugin: D, name: "Toggler" }, { plugin: O, name: "Equalizer" }, {
    plugin: R,
    name: "Interchange"
}, { plugin: x, name: "Abide" } ].forEach( ( ( { plugin: e, name: n } ) => {
    a.plugin( e, n )
} ) ), a.addToJquery( jQuery ), a.Abide.defaults.validators.notEqualTo = function ( a, e, n ) {
    return !e || jQuery( "#" + a.attr( "data-notEqualTo" ) ).val() !== a.val()
}, jQuery( ( () => jQuery( document ).foundation() ) ), z( 4e3, "script[data-type='lazy']" );
const I = { displays: [ "facebook", "ex", "whatsapp", "messenger", "telegram", "linkedin", "send-email", "copy-link", "web-share" ] };
document.addEventListener( "DOMContentLoaded", ( function () {
    new L, B( "social-share", I )
} ) );
