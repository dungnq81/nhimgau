import $ from 'jquery';
import Foundation from './3rd/_zf.js';

//import './utils/global.js';
import * as utils from './utils/global.js';
import './utils/back-to-top.js';
import './utils/script-loader.js';
import { initMenu } from './utils/menu.js';

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
});
