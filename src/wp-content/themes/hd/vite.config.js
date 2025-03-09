import * as path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sharedConfig } from '../../../vite.config.shared';

// THEME
const directory = path.basename(path.resolve(__dirname));
const dir = `./wp-content/themes/${directory}`;
const node_modules = './node_modules';

const resources = `${dir}/resources`;
const assets = `${dir}/assets`;
const storage = `${dir}/storage`;

// COPY
const directoriesToCopy = [
    { src: `${storage}/fonts/fontawesome/webfonts`, dest: '' },
    { src: `${resources}/img`, dest: '' },
];

// SASS
const sassFiles = [
    // (admin)
    'editor-style',
    'awesome_font',
    'admin',

    // (site)
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
    'components/script-loader',
    'components/social-share',

    // (site)
    'swiper2',
    'woocommerce2',
    'app2',
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
                    if (id.includes('node_modules') ||
                        id.includes('js/3rd') ||
                        id.includes('sass/3rd') ||
                        id.includes('sass/components/_awesome_font.scss')
                    ) {
                        return '_vendor';
                    }
                },
            },
        },
    },
};
