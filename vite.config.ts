import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url'

const shouldGenerateWayfinder = process.env.WAYFINDER_GENERATE !== 'false';

export default defineConfig({
    server: {
        watch: {
            ignored: ['**/node_modules/**', '**/vendor/**'],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
            '@css': fileURLToPath(new URL('./resources/css/', import.meta.url)),
            '@lib': fileURLToPath(new URL('./resources/js/lib/', import.meta.url)),
            '@images': fileURLToPath(new URL('./resources/images/', import.meta.url)),
            '@components': fileURLToPath(new URL('./resources/js/components', import.meta.url)),
            '@store': fileURLToPath(new URL('./resources/js/store', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./resources/js/layouts', import.meta.url)),
            '@types': fileURLToPath(new URL('./resources/js/types', import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/app.ts', 'resources/images/LogoOnlyGreen.svg'],
            ssr: 'resources/js/ssr.ts',
            refresh: false,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        ...[],
    ],
    build: {
        minify: "esbuild",
        cssMinify: "esbuild",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/js/[name]-[hash].js',
                chunkFileNames: 'assets/js/[name]-[hash].js',
                manualChunks: {
                    euv: ['vue'],
                    gridc: ['ag-grid-community'],
                    gride: ['ag-grid-enterprise'],
                    gridv: ['ag-grid-vue3'],
                },
                assetFileNames: (assetInfo) => {
                    const ext = assetInfo.name?.split('.').pop()?.toLowerCase();
                    if (!ext) return 'assets/[name]-[hash][extname]';
                    if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext)) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }
                    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
                        return 'assets/images/[name]-[hash][extname]';
                    }
                    if (ext === 'css') {
                        return 'assets/css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
});
