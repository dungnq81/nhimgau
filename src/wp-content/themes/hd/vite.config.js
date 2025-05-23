import * as path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
//import postcssPurgecss from '@fullhuman/postcss-purgecss';
import { sharedConfig } from '../../../../vite.config.shared';

// THEME
//const directory = path.basename(path.resolve(__dirname));
const dir = path.resolve(__dirname).replace(/\\/g, '/');
const resources = `${dir}/resources`;
const assets = `${dir}/assets`;

// COPY
const directoriesToCopy = [
    { src: `${resources}/img`, dest: '' },
];

// SASS
const sassFiles = [
    // (components)
    'components/home-css',
    'components/swiper-css',
    'components/woocommerce-css',

    // (entries)
    'admin-css',
    'editor-style-css',
    'index-css',
];

// JS
const jsFiles = [
    // (components)
    'components/home',
    'components/woocommerce',
    'components/preload-polyfill',
    'components/social-share',
    'components/swiper',
    'components/tabs',

    // (entries)
    'admin',
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
                //         standard: [ /wp-/, /is-/, /has-/, /align/, /screen-reader/ ],
                //         deep: [ /is-/, /has-/ ],
                //         greedy: [ /^menu-/, /^nav-/, /^wp-/ ],
                //     }
                // }),
            ],
        },
    },
    build: {
        ...sharedConfig.build,
        outDir: `${assets}`,
        assetsDir: '',
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
                    if (assetInfo.name && /\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
                        return 'fonts/[name].[ext]';
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
