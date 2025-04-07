import './_vendor.js';
import './back-to-top.js';
import { i as e } from './social-share.js';

document.querySelectorAll('a._blank, a.blank, a[target="_blank"]').forEach((e => {
    e.hasAttribute('target') && '_blank' === e.getAttribute('target') || e.setAttribute('target', '_blank');
    const t = null == e ? void 0 : e.getAttribute('rel');
    if (!t || !t.includes('noopener') || !t.includes('nofollow')) {
        const o = (t ? t + ' ' : '') + 'noopener noreferrer nofollow';
        e.setAttribute('rel', o);
    }
})), new MutationObserver((() => {
    document.querySelectorAll('ul.sub-menu[role="menubar"]').forEach((e => {
        e.setAttribute('role', 'menu');
    })), document.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] button').forEach((e => {
        e.setAttribute('tabindex', '-1');
    }));
})).observe(document.body, { childList: !0, subtree: !0 }), ((e = 3e3, t = 'script[data-type="lazy"]') => {
    const o = setTimeout(r, e);

    function n() {
        r(), clearTimeout(o);
    }

    function r() {
        document.querySelectorAll(t).forEach((e => {
            const t = e.getAttribute('data-src');
            t && (e.setAttribute('src', t), e.removeAttribute('data-src'), e.removeAttribute('data-type'));
        }));
    }

    [ 'mouseover', 'keydown', 'touchstart', 'touchmove', 'wheel' ].forEach((e => {
        window.addEventListener(e, n, { once: !0, passive: !0 });
    }));
})(), document.addEventListener('DOMContentLoaded', (() => {
    (function(e, t) {
        const o = document.querySelector(e), n = document.querySelector(t);
        if (!o || !n) return;

        function r() {
            let e = n.querySelector('.more');
            e || (e = document.createElement('li'), e.classList.add('menu-item', 'more'), e.innerHTML = '<a href="#"></a><ul class="sub-menu dropdown"></ul>', n.appendChild(e));
            const t = e.querySelector('.dropdown');
            t.innerHTML = '', e.style.display = 'none';
            let r = [ ...n.children ].filter((t => t !== e));
            if (r.forEach((e => e.style.display = 'block')), n.scrollWidth <= o.clientWidth) return void l();
            let i = [];
            for (let l = r.length - 1; l >= 0 && n.scrollWidth > o.clientWidth; l--) i.unshift(r[l]), r[l].style.display = 'none';
            i.length > 0 && (i.forEach((e => {
                let o = e.cloneNode(!0);
                o.style.display = 'block', t.appendChild(o);
            })), e.style.display = 'block'), l();
        }

        function l() {
            o.style.overflow = 'visible';
        }

        let i;
        window.addEventListener('resize', (function() {
            o.style.overflow = 'hidden', clearTimeout(i), i = setTimeout((() => {
                r(), function() {
                    if ('undefined' != typeof Foundation) {
                        let e = $(t);
                        e.length && new Foundation.DropdownMenu(e);
                    }
                }();
            }), 100);
        })), r();
    })('nav.nav', '.main-nav'), e('[data-social-share]', { intents: [ 'facebook', 'x', 'print', 'send-email', 'copy-link', 'web-share' ] });
}));
