import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify']
    },
    plugins: ['~/plugins/vuetify.ts'],
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
        '@pinia/nuxt'
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls
            }
        },
        define: {
            'process.env.DEBUG': false
        }
    },
    typescript: {
        typeCheck: true
    }
});
