import * as path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import postcssPurgecss from '@fullhuman/postcss-purgecss';
import { sharedConfig } from '../../../vite.config.shared';

// THEME
const directory = path.basename(path.resolve(__dirname));
const dir = `./wp-content/themes/${directory}`;
const node_modules = './node_modules';

const resources = `${dir}/resources`;
const assets = `${dir}/assets`;

// COPY
const directoriesToCopy = [
    { src: `${resources}/fonts/fontawesome/webfonts`, dest: '' },
    { src: `${resources}/img`, dest: '' },
];

// SASS
const sassFiles = [
    // (admin)
    'admin-css',
    'editor-style-css',

    // (site)
    'swiper-css',
    'woocommerce-css',
    'index-css',
];

// JS
const jsFiles = [
    // (admin)
    'login',
    'admin',

    // (components)
    'components/modulepreload-polyfill',
    'components/back-to-top',
    'components/script-loader',
    'components/social-share',

    // (site)
    'swiper',
    'woocommerce',
    'index',
];

const isProduction = process.env.NODE_ENV === 'production';

export default {
    ...sharedConfig,
    plugins: [
        ...sharedConfig.plugins,
        viteStaticCopy({
            targets: directoriesToCopy,
        }),
    ],
    css: {
        ...sharedConfig.css,
        postcss: {
            ...sharedConfig.css.postcss,
            plugins: [
                ...sharedConfig.css.postcss.plugins,
                // postcssPurgecss({
                //     content: [
                //         './**/*.php',
                //         './**/*.html',
                //         './assets/js/**/*.js',
                //     ],
                //     safelist: {
                //         standard: [ /wp-/ ],
                //         deep: [ /is-/ ],
                //         greedy: [ /^menu-/, /^nav-/ ],
                //     },
                // }),
            ],
        },
    },
    build: {
        ...sharedConfig.build,
        outDir: `${assets}`,
        rollupOptions: {
            input: [
                ...sassFiles.map((file) => `${resources}/sass/${file}.scss`),
                ...jsFiles.map((file) => `${resources}/js/${file}.js`),
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
                    if (id.includes('node_modules') || id.includes('js/3rd') || id.includes('sass/3rd')) {
                        return '_vendor';
                    }
                },
            },
        },
    },
};
