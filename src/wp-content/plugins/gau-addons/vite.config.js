import * as path from 'path';
import fs from 'fs';
import autoprefixer from 'autoprefixer';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

const directory = path.basename( path.resolve( __dirname ) );
const dir = `./wp-content/plugins/${ directory }`;
const resources = `${ dir }/resources`;
const assets = `${ dir }/assets`;
const node_modules = './node_modules';

if ( !fs.existsSync( assets ) ) {
    fs.mkdirSync( assets, { recursive: true } );
}

// COPY
const directoriesToCopy = [
    { src: `${ resources }/img`, dest: '' },
    { src: `${ node_modules }/select2/dist/js/select2.full.min.js`, dest: 'js' },
    { src: `${ node_modules }/select2/dist/css/select2.min.css`, dest: 'css' },
];

// SASS
const sassFiles = [
    'admin_addons'
];

// JS
const jsFiles = [
    'custom_sorting',
    'lazyload',
    'recaptcha',
    'select2',
    'admin_addons2',
];

export default {
    base: './',
    resolve: {
        alias: {
            '@': path.resolve( __dirname ),
            '~': path.resolve( __dirname ),
        },
    },
    plugins: [
        viteImagemin( {
            plugins: {
                jpg: imageminMozjpeg( {
                    quality: 85,
                } ),
                png: imageminPngquant( {
                    strip: true,
                    quality: [ 0.7, 0.9 ],
                } ),
            },
        } ),
        viteStaticCopy( {
            targets: directoriesToCopy,
        } ),
    ],
    css: {
        preprocessorOptions: {
            sass: {
                quietDeps: true,
            },
        },
        postcss: {
            plugins: [
                autoprefixer( {
                    remove: false,
                    flexbox: 'no-2009',
                } ),
            ],
        },
    },
    optimizeDeps: {
        include: [ 'jQuery' ],
    },
    define: {
        $: 'jQuery',
        jQuery: 'jQuery',
    },
    build: {
        target: 'modules',
        manifest: true,
        minify: 'terser',
        cssCodeSplit: true,
        terserOptions: {
            compress: {
                drop_console: true,
                toplevel: true,
            },
            format: {
                comments: false,
            },
        },
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