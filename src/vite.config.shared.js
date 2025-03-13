import autoprefixer from 'autoprefixer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';

import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSVGO from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';

const isProduction = process.env.NODE_ENV === 'production';

export const sharedConfig = {
    base: './',
    plugins: [
        viteImagemin({
            plugins: {
                jpg: imageminMozjpeg({ quality: 80 }),
                png: imageminPngquant({ strip: true, quality: [ 0.7, 0.9 ], dithering: 0.1 }),
                svg: imageminSVGO({
                    plugins: [
                        {
                            name: 'preset-default',
                            params: { overrides: { removeViewBox: false, cleanupIDs: false } },
                        },
                    ],
                }),
                gif: imageminGifsicle({ optimizationLevel: 3, interlaced: true }),
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                sourceMap: !isProduction,
                api: 'modern-compiler',
                quietDeps: true,
            },
        },
        postcss: {
            plugins: [
                autoprefixer({
                    remove: false,
                    flexbox: 'no-2009',
                }),
            ],
        },
        devSourcemap: !isProduction,
    },
    build: {
        sourcemap: !isProduction,
        target: 'modules',
        manifest: true,
        minify: isProduction ? 'terser' : false,
        watch: isProduction ? false : { exclude: 'node_modules/**' },
        cssCodeSplit: true,
        emptyOutDir: true,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                toplevel: true,
                passes: 2,
            },
            format: {
                comments: false,
            },
        },
    },
};
