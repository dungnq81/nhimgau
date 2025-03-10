import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const isProduction = process.env.NODE_ENV === 'production';

export const sharedConfig = {
    base: './',
    plugins: [],
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
        emptyOutDir: true, // Clear the contents of the 'assets' directory before building.
        terserOptions: {
            compress: {
                drop_console: true,
                toplevel: true,
                passes: 2,
            },
            format: {
                comments: false,
            },
        },
    },
};
