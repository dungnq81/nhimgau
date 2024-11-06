const mix = require( 'laravel-mix' );

const path = require( 'path' );
const directory = path.basename( path.resolve( __dirname ) );

const dir = './wp-content/themes/' + directory;

const resources = dir + '/resources';
const assets = dir + '/assets';
const storage = dir + '/storage';
const node_modules = './node_modules';

const dist_dir = '../html/frontend/dist';
const root_dir = '..';

// Directories to copy
const directoriesToCopy = [
    { from: `${ storage }/fonts/fontawesome/webfonts`, to: `${ assets }/webfonts` },
    { from: `${ resources }/img`, to: `${ assets }/img` },
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
    'admin',

    // components
    'components/back-to-top',
    'components/load-scripts',
    'components/skip-link-focus',
    'components/social-share',
    'components/swiper',
    'components/woocommerce',

    // site
    'app',
];

// Process SASS
sassFiles.forEach( ( file ) => {
    let outputDir = file.includes( '/' ) ? file.split( '/' )[0] : '';
    mix.sass( `${ resources }/sass/${ file }.scss`, `${ assets }/css${ outputDir ? '/' + outputDir : '' }` );
} );

// Process JS
jsFiles.forEach( ( file ) => {
    let outputDir = file.includes( '/' ) ? file.split( '/' )[0] : '';
    mix.js( `${ resources }/js/${ file }.js`, `${ assets }/js${ outputDir ? '/' + outputDir : '' }` );
} );

// Copy directories
directoriesToCopy.forEach( ( dir ) => mix.copyDirectory( dir.from, dir.to ) );

// Additional JS file
mix.copy( `${ node_modules }/select2/dist/css/select2.min.css`, `${ assets }/css/components` );
mix.copy( `${ node_modules }/select2/dist/js/select2.full.min.js`, `${ assets }/js/components` );

mix
    .copy( `${ node_modules }/pace-js/pace.min.js`, `${ assets }/js/components` );
