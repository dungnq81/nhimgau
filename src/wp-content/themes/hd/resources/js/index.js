import $ from 'jquery';
import Foundation from './3rd/_zf.js';

const hd = typeof hd === 'object' && hd !== null ? hd : {};
const hdObject = {
    _ajaxUrl: hd._ajaxUrl ?? '/wp-admin/admin-ajax.php',
    _baseUrl: hd._baseUrl ?? window.location.origin + '/',
    _themeUrl: hd._themeUrl ?? '',
    _csrfToken: hd._csrfToken ?? '',
    _restToken: hd._restToken ?? '',
    _lang: hd._lang ?? 'vi',
};

import './components/lighthouse.js';
import './components/back-to-top.js';
import './components/script-loader.js';
import { initMenu } from './components/menu.js';
import { initSocialShare } from './components/social-share.js';
//import SimpleBar from 'simplebar';
//import ResizeObserver from 'resize-observer-polyfill';
//import { Fancybox } from '@fancyapps/ui';
//import select2 from 'select2';

//window.ResizeObserver = ResizeObserver;
//select2();

// Styles
import '../sass/3rd/_index.scss';
//import 'simplebar/dist/simplebar.css';
//import '@fancyapps/ui/dist/fancybox/fancybox.css';

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initMenu('nav.nav', '.main-nav');
    initSocialShare('[data-social-share]', { intents: [ 'facebook', 'x', 'print', 'send-email', 'copy-link', 'web-share' ] });

    // update rel
    document.querySelectorAll('a._blank, a.blank, a[target="_blank"]').forEach((el) => {
        if (!el.hasAttribute('target') || el.getAttribute('target') !== '_blank') {
            el.setAttribute('target', '_blank');
        }

        const relValue = el?.getAttribute('rel');
        if (!relValue || !relValue.includes('noopener') || !relValue.includes('nofollow')) {
            const newRelValue = (relValue ? relValue + ' ' : '') + 'noopener noreferrer nofollow';
            el.setAttribute('rel', newRelValue);
        }
    });

    // MutationObserver
    const observer = new MutationObserver(() => {
        document.querySelectorAll('ul.sub-menu[role="menubar"]').forEach(menu => {
            menu.setAttribute('role', 'menu');
        });

        document.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] button').forEach(el => {
            el.setAttribute('tabindex', '-1');
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
