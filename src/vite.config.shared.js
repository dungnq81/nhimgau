import * as path from 'path';
import autoprefixer from 'autoprefixer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

export const sharedConfig = {
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
            makeWebp: {
                plugins: {
                    jpg: imageminWebp(),
                    png: imageminWebp(),
                },
            },
        } ),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
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
        devSourcemap: process.env.NODE_ENV === 'development',
    },
    optimizeDeps: {
        include: [ 'jQuery' ],
    },
    define: {
        $: 'jQuery',
        jQuery: 'jQuery',
    },
    build: {
        sourcemap: process.env.NODE_ENV === 'development',
        target: 'modules',
        manifest: true,
        minify: process.env.NODE_ENV === 'development' ? false : 'terser',
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
        watch: process.env.NODE_ENV === 'development' ? { exclude: 'node_modules/**' } : false,
    }
}
