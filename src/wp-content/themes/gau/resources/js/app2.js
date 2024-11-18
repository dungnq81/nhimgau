// Comment out this line if not using the ZF framework.
import './components/_zf';

//import { nanoid } from 'nanoid';
//import device from 'current-device';
//import Cookies from 'js-cookie';

//Object.assign( window, { Cookies } );

import BackToTop from './components/back-to-top.js';
import lazyLoader from './components/lazy-loader.js';

lazyLoader( 4000, "script[data-type='lazy']" );

import { initializeSocialShare } from './components/social-share.js';

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
        'web-share'
    ]
};

// Initialize
function init() {
    new BackToTop();
    initializeSocialShare( 'social-share', customOptions );
}

// Document ready
document.addEventListener( 'DOMContentLoaded', function () {
    // Initialize
    init();
} );
