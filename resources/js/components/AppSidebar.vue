<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { Barrel, ChartBarIncreasing, PrinterCheck, ScanSearch, ScrollText, ShieldCheck, TableRowsSplit, Users, UserStar } from 'lucide-vue-next';
import { House, BookOpen, Bot, Settings2 } from 'lucide-vue-next';
import { computed } from 'vue';
import {
    dashboard,
    dataakun,
    dataAlokasi,
    dataPenerimaan,
    dataPengiriman,
    datapersonil,
    dataPod,
    datarole,
    monitoring,
    monitoringAlokasi,
    pelacakanItem,
    pengirimanBaru,
    penyaluranManifest,
    receivedPengiriman,
    regItem,
    roadmap,
    testReader,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';

import { usePermissionStore } from '@/store/permissionStore';
import type { User } from '@/types';
import NavMain from '@components/NavMain.vue';
import NavMaster from '@components/NavMaster.vue';
import NavUser from '@components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@components/ui/sidebar';
import logo from '@images/LogoOnlyGreen.svg';
import NavSecondary from './NavSecondary.vue';
import SidebarSeparator from './ui/sidebar/SidebarSeparator.vue';

const auth = usePermissionStore();
const appInfo = usePage().props.appInfo as any;
const layout = useLayoutStore();
const userData = computed<User | null>(() => {
    return usePage().props.user ?? null;
});

// NOTE: Proses Distribusi Obat & Alkes Application / Sidebar
const navMain = computed(() => [
    {
        id: 1.1,
        title: 'Dashboard',
        url: dashboard.url(),
        isActive: layout.activeMenu?.id === 1.1,
        icon: House,
        isEnable: true,
        items: [],
    },
    {
        id: 1.6,
        title: 'Pelacakan',
        url: pelacakanItem.url(),
        isActive: layout.activeMenu?.id === 1.6,
        icon: ScanSearch,
        isEnable: auth.can('menu.pencarian'),
        items: [],
    },

    {
        id: 1.2,
        title: 'Data Obat & Alkes',
        url: regItem.url(),
        icon: Barrel,
        isActive: layout.activeMenu?.id === 1.2,
        isEnable: auth.can('menu.inventory'),
        items: [],
    },
    {
        id: 1.3,
        title: 'Pengiriman Barang',
        url: '#',
        icon: Bot,
        isActive: layout.activeMenu?.id === 1.3,
        isEnable: auth.can('menu.pengiriman'),
        items: [
            {
                title: 'Buat Pengiriman',
                url: pengirimanBaru.url(),
                isActive: layout.activeMenu?.id === 1.31,
                isEnable: auth.can('menu.pengiriman.baru'),
            },
            {
                title: 'Data pengiriman',
                url: dataPengiriman.url(),
                isActive: layout.activeMenu?.id === 1.32,
                isEnable: auth.can('menu.pengiriman.dataitem'),
            },
            {
                title: 'Monitoring Distribusi',
                url: monitoring.url(),
                isActive: layout.activeMenu?.id === 1.33,
                isEnable: auth.can('menu.pengiriman.monitoring'),
            },
        ],
    },
    {
        id: 1.4,
        title: 'Penerimaan & Pencocokan',
        url: '#',
        icon: BookOpen,
        isEnable: auth.can('menu.konfirmasi'),
        items: [
            {
                title: 'Konfirmasi Penerimaan',
                url: receivedPengiriman.url(),
                isActive: layout.activeMenu?.id === 1.41,
                isEnable: true,
            },
            {
                title: 'Data Penerimaan',
                url: dataPenerimaan.url(),
                isActive: layout.activeMenu?.id === 1.42,
                isEnable: auth.can('menu.konfirmasi.dataitem'),
            },
        ],
    },
    {
        id: 1.5,
        title: 'Distribusi Final',
        url: '#',
        icon: Settings2,
        isEnable: auth.can('menu.distribusi'),
        items: [
            {
                title: 'Serah Terima ke Unit Rawat',
                url: penyaluranManifest.url(),
                isActive: layout.activeMenu?.id === 1.51,
                isEnable: true,
            },
            {
                title: 'Data Penyaluran',
                url: dataPod.url(),
                isActive: layout.activeMenu?.id === 1.52,
                isEnable: true,
            },
        ],
    },
]);
const navMaster = computed(() => [
    {
        id: 2.1,
        name: 'Data Rencana Penyaluran',
        url: dataAlokasi.url(),
        icon: ScrollText,
        isActive: layout.activeMenu?.id === 2.1,
        isEnable: auth.can('menu.alokasi'),
    },
    {
        id: 2.11,
        name: 'Pemantauan Pengajuan',
        url: monitoringAlokasi.url(),
        icon: ScrollText,
        isActive: layout.activeMenu?.id === 2.11,
        isEnable: auth.can('menu.alokasi'),
    },
    {
        id: 2.2,
        name: 'Data Nakes',
        url: datapersonil.url(),
        icon: Users,
        isActive: layout.activeMenu?.id === 2.2,
        isEnable: auth.can('menu.tenaga_medis'),
    },
    { id: 2.3, name: 'Cetak Pelaporan', url: '#', icon: PrinterCheck, isActive: layout.activeMenu?.id === 2.3, isEnable: false },
    { isDivider: true, isEnable: true },
    {
        id: 2.4,
        name: 'Akun Pengguna',
        url: dataakun.url(),
        icon: UserStar,
        isActive: layout.activeMenu?.id === 2.4,
        isEnable: auth.can('menu.dataakun'),
    },
    {
        id: 2.5,
        name: 'Hak Akses',
        url: datarole.url(),
        icon: ShieldCheck,
        isActive: layout.activeMenu?.id === 2.5,
        isEnable: auth.can('menu.datarole'),
    },
    { isDivider: true, isEnable: true },
    {
        id: 2.6,
        name: 'Pembacaan Reader',
        url: testReader.url(),
        icon: TableRowsSplit,
        isActive: layout.activeMenu?.id === 2.6,
        isEnable: auth.can('menu.reader'),
    },
]);
const navSecond = computed(() => [
    { id: 3.1, title: 'Roadmap', url: roadmap.url(), icon: ChartBarIncreasing, isActive: layout.activeMenu?.id === 3.1 },
]);
</script>

<template>
    <Sidebar collapsible="offcanvas">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div class="flex items-center justify-center gap-3">
                        <div class="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                            <img :src="logo" alt="Application Logo" />
                        </div>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="text-crusoe-500 truncate text-xl font-medium">{{ appInfo.appshortname }}</span>
                            <span class="text-xs">{{ appInfo.appname }}</span>
                            <!-- <span class="text-xs">Tepat Ukuran, Tepat Guna dan Tepat UnitRawat</span> -->
                        </div>
                    </div>
                    <!-- <hr class="border-t-0.5 mt-3 h-0.5 bg-gray-300 dark:bg-white/10" /> -->
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator class="m-0 mt-2" />
        <SidebarContent>
            <NavMain :items="navMain" />
            <NavMaster :projects="navMaster" />
            <NavSecondary :items="navSecond" class="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser :user="userData" />
        </SidebarFooter>
    </Sidebar>
</template>
