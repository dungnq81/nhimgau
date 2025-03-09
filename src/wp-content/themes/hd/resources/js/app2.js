import Foundation from './3rd/_zf';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';

Object.assign(window, { Cookies });

import BackToTop from './components/back-to-top';
import lazyLoader from './components/script-loader';
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

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
    lazyLoader(4000, 'script[data-type=\'lazy\']');
    initializeSocialShare('social-share', customOptions);
});
