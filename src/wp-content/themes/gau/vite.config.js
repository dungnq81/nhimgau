import * as path from 'path';
import PluginCritical from 'rollup-plugin-critical';
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sharedConfig } from '../../../vite.config.shared';

// THEME
const directory = path.basename( path.resolve( __dirname ) );
const dir = `./wp-content/themes/${ directory }`;

const resources = `${ dir }/resources`;
const assets = `${ dir }/assets`;
const storage = `${ dir }/storage`;
const node_modules = './node_modules';

// COPY
const directoriesToCopy = [
    { src: `${ storage }/fonts/fontawesome/webfonts`, dest: '' },
    { src: `${ storage }/fonts/SVN-Poppins`, dest: 'fonts' },
    { src: `${ resources }/img`, dest: '' },
    { src: `${ node_modules }/pace-js/pace.min.js`, dest: 'js' },
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

    // (site)
    'swiper2',
    'woocommerce2',
    'app2',
];

const isProduction = process.env.NODE_ENV !== 'development';

export default {
    ...sharedConfig,
    plugins: [
        ...sharedConfig.plugins,
        viteStaticCopy( {
            targets: directoriesToCopy,
        } ),

        isProduction ? pluginPurgeCss( {
            content: [
                `${ dir }/**/*.php`,
                `${ resources }/js/**/*.js`,
            ],
            css: [
                `${ assets }/css/app.css`,
                `${ assets }/css/fonts.css`,
                `${ assets }/css/swiper.css`,
                `${ assets }/css/woocommerce.css`,
            ],
            variables: true,
            safelist: {
                standard: [],
                deep: [ /^grid-/, /^flex-/ ],
            },
            keyframes: true,
            fontFace: true,
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        } ) : '',

        isProduction ? PluginCritical( {
            criticalUrl: 'http://localhost:8080',
            criticalBase: path.resolve( `${ assets }/css/critical` ),
            criticalPages: [
                { uri: '', template: 'index' }
            ],
            criticalConfig: {
                inline: false,
                strict: true,
                width: 1920,
                height: 1080,
                penthouse: {
                    blockJSRequests: true,
                },
            },
        } ) : '',
    ],
    build: {
        ...sharedConfig.build,
        outDir: `${ assets }`,
        rollupOptions: {
            input: [
                ...sassFiles.map( ( file ) => path.resolve( `${ resources }/sass/${ file }.scss` ) ),
                ...jsFiles.map( ( file ) => path.resolve( `${ resources }/js/${ file }.js` ) ),
            ],
            output: {
                entryFileNames: `js/[name].js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: ( assetInfo ) => {
                    if ( assetInfo.name.endsWith( '.css' ) ) {
                        return `css/[name].[ext]`;
                    }
                    return `img/[name].[ext]`;
                },
                manualChunks( id ) {
                    if ( id.includes( 'node_modules' ) || id.includes( '3rd' ) ) {
                        return '_vendor';
                    }
                },
            },
        }
    }
}
