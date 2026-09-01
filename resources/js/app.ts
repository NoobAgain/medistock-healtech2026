import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createNotivue } from 'notivue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';

import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';

import 'v-calendar/style.css';
import '@css/app.css';
import 'notivue/notification.css';
import 'notivue/animations.css';
import 'notivue/notification-progress.css';

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),

    async setup({ el, App, props, plugin }) {
        const { ModuleRegistry } = await import("ag-grid-community");
        const { AllEnterpriseModule, LicenseManager } = await import("ag-grid-enterprise");
        const agGridLicenseKey = import.meta.env.VITE_AGGRID_LICENSIE ?? import.meta.env.VITE_AGGRID_LICENSE;

        ModuleRegistry.registerModules([AllEnterpriseModule]);
        if (agGridLicenseKey) {
            LicenseManager.setLicenseKey(agGridLicenseKey);
        }

        const notivue = createNotivue({
            position: 'bottom-center',
            limit: 3,
            enqueue: true,
            avoidDuplicates: false,
        });
        const pinia = createPinia();
        pinia.use(piniaPluginPersistedstate);


        const app = createApp({
            methods: {},
            render: () => h(App, props),
        });

        app.use(plugin);
        app.use(notivue);
        app.use(pinia);
        app.use(setupCalendar, {});
        app.component('VCalendar', Calendar);
        app.component('VDatePicker', DatePicker);


        app.mount(el);
    },
    progress: {
        includeCSS: true,
        showSpinner: true,
        color: '#5ea500',
    },
});
