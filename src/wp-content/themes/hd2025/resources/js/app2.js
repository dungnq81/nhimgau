// Comment on this line if not using the ZF framework.
import Foundation from './3rd/_zf';

import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';

Object.assign(window, { Cookies });

import BackToTop from './components/back-to-top';
import lazyLoader from './components/lazy-loader';
import { initializeSocialShare } from './components/social-share';

// Global variables
const hdDefaults = {
    _ajaxUrl: '/wp-admin/admin-ajax.php',
    _baseUrl: 'https://nhimgau.test/',
    _themeUrl: 'https://nhimgau.test/wp-content/themes/hd2025/',
};

const {
    _ajaxUrl: ajaxUrl,
    _baseUrl: baseUrl,
    _themeUrl: themeUrl,
} = { ...hdDefaults, ...(typeof hd !== 'undefined' ? hd : {}) };

const customOptions = {
    displays: [
        'facebook',
        'ex',
        'whatsapp',
        'messenger',
        'telegram',
        'linkedin',
        'send-email',
        'copy-link',
        'web-share',
    ],
};

// Service worker
'serviceWorker' in navigator && window.addEventListener('load', function() {
    navigator.serviceWorker.register(themeUrl + 'assets/js/workbox.js').then(
        function(e) {
            console.log('ServiceWorker registration successful with scope: ', e.scope);
        },
        function(e) {
            console.log('ServiceWorker registration failed: ', e);
        },
    );
});

// Initialize
function init() {
    new BackToTop();
    lazyLoader(4000, 'script[data-type=\'lazy\']');
    initializeSocialShare('social-share', customOptions);
}

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    init();
});
