<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import libGlowEffect from '@/lib/libGlowEffect';
import { roadmap } from '@/routes';
import type { BreadcrumbItem } from '@/types/globalType';
import PublicLayout from '@layouts/PublicLayout.vue';
import { useLayoutStore } from '@store/layoutStore';

const layout = useLayoutStore();
const events = [
    {
        id: 1,
        year: '2026',
        month: 'February',
        title: 'Inisiasi & Perencanaan',
        description:
            'Tahap ini difokuskan pada perumusan fondasi proyek secara menyeluruh. Kegiatan mencakup identifikasi permasalahan utama, analisis kebutuhan pengguna (functional dan non-functional requirements), pemetaan stakeholder, serta studi kelayakan teknis dan operasional.',
    },
    {
        id: 2,
        year: '2026',
        month: 'February',
        title: 'Pengembangan tahap awal dimulai',
        description:
            'Fase ini menandai dimulainya implementasi teknis sistem. Tim melakukan setup lingkungan pengembangan, konfigurasi repository, serta penyiapan server development dan staging. Pengembangan difokuskan pada pembangunan core system dan modul-modul prioritas seperti autentikasi, otorisasi berbasis peran (RBAC), manajemen data utama, serta integrasi database. Setiap fitur dikembangkan menggunakan pendekatan sprint dengan proses code review, unit testing, dan integrasi testing secara berkala untuk menjaga kualitas kode. Selain itu dilakukan optimalisasi struktur database, pengamanan private endpoint API, dan penyusunan dokumentasi teknis awal. Pada akhir tahap ini, sistem sudah memiliki kerangka kerja yang stabil dan fitur inti mulai dapat diuji secara internal.',
    },
];

const appInfo = usePage().props.appInfo as any;

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Roadmap', href: roadmap.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 3.1 } });
});
</script>

<template>
    <PublicLayout
        title="Roadmap"
        page-title="Roadmap"
        :page-title2="`${appInfo.appshortname} ${appInfo.appver}`"
        page-sub-title="Tahapan pengembangan sistem menuju platform pelacakan dan pengamanan digital yang terintegrasi, andal, dan siap operasional"
    >
        <div
            class="relative mx-auto max-w-4xl space-y-5 px-4 before:absolute before:inset-y-0 before:left-9 before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:left-51"
        >
            <div v-for="(ev, index) in events" :key="ev.id" class="relative">
                <div class="mb-3 flex items-center justify-between gap-3 md:justify-start md:space-x-4">
                    <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                        <div class="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow md:order-1">
                            <svg class="fill-crusoe-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                            </svg>
                        </div>
                        <time
                            :class="[
                                'font-caveat md:w-40',
                                index === 0 || events[index - 1].month !== ev.month || events[index - 1].year !== ev.year
                                    ? 'text-crusoe-500'
                                    : 'invisible',
                            ]"
                        >
                            {{ ev.month }}, {{ ev.year }}
                        </time>
                    </div>
                    <div class="dark:text-foreground flex items-start justify-start gap-2 text-start text-xl text-slate-800">
                        {{ ev.title }}
                    </div>
                </div>
                <div class="card-bg relative ml-14 rounded-lg border p-4 text-sm md:ml-56 md:max-w-2xl">
                    <libGlowEffect />
                    {{ ev.description }}
                </div>
            </div>
        </div>
    </PublicLayout>
</template>
