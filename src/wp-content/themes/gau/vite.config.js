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
    { src: `${ storage }/fonts/SVN-Poppins`, dest: 'fonts' },
    { src: `${ resources }/img`, dest: '' },
    { src: `${ node_modules }/pace-js/pace.min.js`, dest: 'js' },
];

// SASS
const sassFiles = [
    // admin
    'editor-style',
    'admin',

    // components
    'components/swiper',
    'components/woocommerce',

    // site
    'fonts',
    'app',
];

// JS
const jsFiles = [
    // admin
    'login',
    'admin2',

    // components
    'components/modulepreload-polyfill',
    'components/back-to-top',
    'components/lazy-loader',
    'components/skip-link-focus',
    'components/social-share',
    'components/swiper2',
    'components/woocommerce2',

    // site
    'app2',
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
                        return '_vendor';
                    }
                },
            },
        }
    }
}
