<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Notivue, Notification, NotificationProgress, NotivueSwipe, pastelTheme } from 'notivue';
import { onMounted, watch } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { usePermissionStore } from '@/store/permissionStore';
import AppSidebar from '@components/AppSidebar.vue';
import SiteHeader from '@components/SiteHeader.vue';
import SidebarInset from '@components/ui/sidebar/SidebarInset.vue';
import SidebarProvider from '@components/ui/sidebar/SidebarProvider.vue';

const props = withDefaults(
    defineProps<{
        title?: string;
        pageTitle?: string;
        pageTitle2?: string;
        pageSubTitle?: string;
    }>(),
    {
        title: '',
        pageTitle: '',
        pageTitle2: '',
        pageSubTitle: '',
    },
);

const { title, pageTitle, pageTitle2, pageSubTitle } = props;
const page = usePage();
const appInfo = (page.props.appInfo ?? {}) as any;
const titles = `${title} | ${appInfo.appshortname} ${appInfo.appver}`;
const auth = usePermissionStore();
const theme = {
    ...pastelTheme,
    '--nv-z': '9999',
    '--nv-shadow': '0px 0rem 2.5rem 10px rgba(0, 0, 0, 0.15)',
} as const;

watch(
    () => page.url,
    async () => {
        // TODO: Force Load Permission in Frontend
        await auth.loadPermission(true);
        // console.log('Permissions:', auth.permissions);
    },
    { immediate: true },
);

onMounted(async () => {
    document.body.style.overflow = 'hidden';
    const el = document.querySelector('.page-transition');
    if (el) {
        el.addEventListener('animationend', () => {
            document.body.style.overflow = 'auto';
        });
    }
});
</script>

<template>
    <Head :title="titles">
        <meta name="description" content="Deskripsi halaman" />
        <meta name="csrf-token" :content="usePage().props?.csrf_token as string" />
    </Head>

    <div style="z-index: 2147483647 !important">
        <Notivue v-slot="item">
            <NotivueSwipe :item="item">
                <Notification :item="item" :theme="theme">
                    <NotificationProgress :item="item" />
                </Notification>
            </NotivueSwipe>
        </Notivue>
    </div>

    <SidebarProvider
        :style="{
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
        }"
        :class="'from-crusoe-50 bg-linear-25! to-gray-300 dark:bg-linear-100! dark:from-gray-800 dark:to-gray-600'"
    >
        <AppSidebar variant="inset" />
        <SidebarInset class="page-transition dark:bg-gray-900">
            <SiteHeader />
            <div class="flex min-h-0 flex-1 flex-col">
                <div class="@container/main flex min-h-0 flex-1 flex-col gap-2">
                    <div class="flex min-h-0 flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div class="grid min-h-0 grid-cols-1 gap-4 px-4 lg:px-6">
                            <div v-if="pageTitle && pageSubTitle" class="flex flex-col">
                                <p
                                    class="flex flex-wrap items-center justify-start gap-2 text-2xl font-bold text-neutral-400 md:text-2xl dark:text-white"
                                >
                                    <span class="text-crusoe-500">{{ pageTitle }}</span>
                                    <small class="text-2xl">{{ pageTitle2 }}</small>
                                </p>

                                <p class="text-sm text-gray-500">
                                    {{ pageSubTitle }}
                                </p>
                                <hr class="my-2 pb-0" />
                            </div>
                            <main class="flex min-h-0 flex-1 flex-col">
                                <slot />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </SidebarInset>
    </SidebarProvider>
</template>
