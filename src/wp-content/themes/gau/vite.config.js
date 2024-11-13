import * as path from 'path';
import fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sharedConfig } from '../../../vite.config.shared';

// (theme)
const directory = path.basename( path.resolve( __dirname ) );
const dir = `./wp-content/themes/${ directory }`;

const resources = `${ dir }/resources`;
const assets = `${ dir }/assets`;
const storage = `${ dir }/storage`;
const node_modules = './node_modules';

if ( !fs.existsSync( assets ) ) {
    fs.mkdirSync( assets, { recursive: true } );
}

// COPY
const directoriesToCopy = [
    { src: `${ storage }/fonts/fontawesome/webfonts`, dest: '' },
    { src: `${ resources }/img`, dest: '' },
    { src: `${ node_modules }/pace-js/pace.min.js`, dest: 'js' },
];

// SASS
const sassFiles = [
    // admin files
    'editor-style',
    'admin',

    // components files
    'components/swiper',
    'components/woocommerce',

    // site
    'fonts',
    'app',
];

// JS
const jsFiles = [
    // admin files
    'login',
    'admin',

    // components files
    'components/modulepreload-polyfill',
    'components/back-to-top',
    'components/load-scripts',
    'components/skip-link-focus',
    'components/social-share',
    'components/swiper',
    'components/woocommerce',

    // site files
    'app',
];

export default {
    ...sharedConfig,
    plugins: [
        ...sharedConfig.plugins,
        viteStaticCopy( {
            targets: directoriesToCopy,
        } ),
    ],
    build: {
        ...sharedConfig.build,
        outDir: `${ dir }/assets`,
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
                        return `vendor`;
                    }
                },
            },
        }
    }
}
