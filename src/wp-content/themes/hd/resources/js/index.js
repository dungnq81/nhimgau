import $ from 'jquery';
import Foundation from './3rd/_zf';
//import select2 from 'select2';

//select2();

import BackToTop from './components/back-to-top';
import { initMenu } from './components/menu.js';
import scriptLoader from './components/script-loader';
import { initSocialShare } from './components/social-share';
//import SimpleBar from 'simplebar';
//import ResizeObserver from 'resize-observer-polyfill';
//import { Fancybox } from '@fancyapps/ui';

//window.ResizeObserver = ResizeObserver;

// Styles
import '../sass/3rd/_index.scss';
//import 'simplebar/dist/simplebar.css';
//import '@fancyapps/ui/dist/fancybox/fancybox.css';

// Global variables
const hdDefaults = {
    _ajaxUrl: '/wp-admin/admin-ajax.php',
    _baseUrl: 'http://localhost:8080/',
    _themeUrl: 'http://localhost:8080/wp-content/themes/hd/',
    _csrfToken: '***',
    _restToken: '***',
    _lang: 'vi',
};

const {
    _ajaxUrl: ajaxUrl,
    _baseUrl: baseUrl,
    _themeUrl: themeUrl,
    _csrfToken: csrfToken,
    _restToken: restToken,
    _lang: lang,
} = { ...hdDefaults, ...(typeof hd !== 'undefined' ? hd : {}) };

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
    initMenu('nav.nav', '.main-nav');
    scriptLoader(4000, 'script[data-type=\'lazy\']');
    initSocialShare('[data-social-share]', { intents: [ 'facebook', 'x', 'print', 'send-email', 'copy-link', 'web-share' ] });

    // auto rel
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
