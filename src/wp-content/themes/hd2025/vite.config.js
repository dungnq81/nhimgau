import * as path from 'path';
import PluginCritical from 'rollup-plugin-critical';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sharedConfig } from '../../../vite.config.shared';

// THEME
const directory = path.basename(path.resolve(__dirname));
const dir = `./wp-content/themes/${directory}`;

const resources = `${dir}/resources`;
const assets = `${dir}/assets`;
const storage = `${dir}/storage`;
const node_modules = './node_modules';

// COPY
const directoriesToCopy = [
    { src: `${storage}/fonts/fontawesome/webfonts`, dest: '' },
    { src: `${resources}/img`, dest: '' },
    { src: `${node_modules}/pace-js/pace.min.js`, dest: 'js' },
];

// SASS
const sassFiles = [
    // (admin)
    'editor-style',
    'admin',

    // (site)
    'fonts',
    'swiper',
    'woocommerce',
    'app',
];

// JS
const jsFiles = [
    // (admin)
    'login',
    'admin2',

    // (components)
    'components/modulepreload-polyfill',
    'components/back-to-top',
    'components/lazy-loader',
    'components/skip-link-focus',
    'components/social-share',
    'components/fonts',

    // (site)
    'swiper2',
    'swiper2',
    'woocommerce2',
    'app2',
    'workbox',
];

const isProduction = process.env.NODE_ENV === 'production';

export default {
    ...sharedConfig,
    plugins: [
        ...sharedConfig.plugins,
        viteStaticCopy({
            targets: directoriesToCopy,
        }),
        isProduction ? PluginCritical({
            criticalUrl: process.env.CRITICAL_URL || 'https://nhimgau.test',
            criticalBase: `${dir}/assets/css`,
            css: [ `${dir}/assets/css/app.css` ],
            criticalPages: [ { uri: '/', template: 'index' } ],
            criticalConfig: {
                inline: false,
                strict: false,
                //width: 1024,
                //height: 768,
                penthouse: {
                    blockJSRequests: true,
                },
            },
        }) : '',
    ],
    build: {
        ...sharedConfig.build,
        outDir: `${assets}`,
        rollupOptions: {
            input: [
                ...sassFiles.map((file) => path.resolve(`${resources}/sass/${file}.scss`)),
                ...jsFiles.map((file) => path.resolve(`${resources}/js/${file}.js`)),
            ],
            output: {
                entryFileNames: `js/[name].js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return `css/[name].[ext]`;
                    }
                    return `img/[name].[ext]`;
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return '_vendor';
                    }
                },
            },
        },
    },
};
