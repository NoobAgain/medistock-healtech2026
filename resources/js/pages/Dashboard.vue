<script setup lang="ts">
import {
    AlertTriangle,
    Box,
    CheckCircle2,
    History,
    Lock,
    PackageCheck,
    RefreshCw,
    Search,
    ShieldAlert,
    Truck,
    TriangleAlert,
    User2,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import CardAction from '@/components/ui/card/CardAction.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { formatDate, isResponseSuccess } from '@/lib/libUtils';
import {
    dashboard,
    dashboardActions,
    dashboardBottleneck,
    dashboardDistribusiTrend,
    dashboardExecutiveSummary,
    dashboardPeriodeOptions,
    dashboardRedFlag,
    dashboardTrace,
    monitoring,
    monitoringAlokasi,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const auth = usePermissionStore();

const canPengajuan = computed(() => auth.can('menu.alokasi'));
const canDistribusi = computed(
    () => auth.can('menu.pengiriman.monitoring') || auth.can('menu.pengiriman') || auth.can('menu.distribusi') || auth.can('menu.konfirmasi'),
);
const canPencarian = computed(() => auth.can('menu.pencarian'));
const canAdmin = computed(() => auth.can('menu.dataakun') || auth.can('menu.datarole') || auth.can('menu.tenaga_medis'));

// ─── Props (from Inertia) ───────────────────────────────────────────────────
const props = defineProps<{ defaultPeriode: { id: number; nama: string } }>();

type PeriodeItem = { id: number; nama: string };

type ExecutiveSummary = {
    periode: { id: number; nama: string };
    lastUpdatedAt: { pengajuan: string; distribusi: string };
    pengajuan: {
        total: number;
        menunggu: number;
        disetujuiInduk: number;
        disetujuiPusbekangad: number;
        validasiBerhasil: number;
    };
    distribusi: {
        total: number;
        siap: number;
        dalamPengiriman: number;
        tiba: number;
        diterima: number;
        dikembalikan: number;
        anomali: { total: number; lock: number; flag: number };
    };
};

type ActionsData = {
    pendingAlokasi: Array<{ id: number; nan: string; unit_rawat: string; updatedAt: string }>;
    overdueTransit: Array<{ id: number; uid: string; nan: string; unit_rawat: string; lokasiTerakhir: string; updatedAt: string }>;
};

const periodeItems = ref<PeriodeItem[]>([]);
const selectedPeriodeId = ref<number>(props.defaultPeriode?.id ?? 0);
const isLoadingPeriode = ref(false);

const executive = ref<ExecutiveSummary | null>(null);
const isLoadingExecutive = ref(false);

const actionsData = ref<ActionsData | null>(null);
const isLoadingActions = ref(false);

type DistribusiTrendPoint = { tanggal: string; jumlah: number };
type DistribusiTrend = { start: string; end: string; series: DistribusiTrendPoint[] };

const distribusiTrend = ref<DistribusiTrend | null>(null);
const isLoadingDistribusiTrend = ref(false);

type BottleneckMode = 'transit' | 'lock' | 'flag';
type BottleneckItem = { unit_rawatId: number; unit_rawat: string; jumlah: number };

const bottleneckMode = ref<BottleneckMode>('transit');
const bottleneckItems = ref<BottleneckItem[]>([]);
const isLoadingBottleneck = ref(false);

// ─── Red Flags ───────────────────────────────────────────────────────────────
interface RedFlagRow {
    type: string;
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    lastStatus: number;
    lastStatusLabel: string;
    note: string;
    updatedAt: string;
}

interface RedFlagsData {
    flag: RedFlagRow[];
    lock: RedFlagRow[];
    returned: RedFlagRow[];
}

const redFlagsData = ref<RedFlagsData | null>(null);
const isLoadingRedFlags = ref(false);

const totalRedFlags = computed(
    () =>
        (redFlagsData.value?.flag.length ?? 0) +
        (redFlagsData.value?.lock.length ?? 0) +
        (redFlagsData.value?.returned.length ?? 0),
);

// ─── Event Trace ─────────────────────────────────────────────────────────────
interface TraceEvent {
    id: number;
    status: number;
    statusLabel: string;
    note: string;
    lokasi: string;
    createdBy: string;
    createdAt: string;
}

interface TracePod {
    itemId: number;
    itemHash: string;
    nsn: string;
    penerimaNama: string;
    penerimaNrp: string;
    penerimaPangkat: string;
    createdAt: string;
}

interface TracePenerima {
    nama: string;
    nrp: string;
    pangkat: string;
    createdAt: string;
}

interface TracePengirimanInfo {
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    createdBy: string;
    createdAt: string;
}

interface TraceResultBox {
    type: 'box';
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    createdBy: string;
    createdAt: string;
    events: TraceEvent[];
    pods: TracePod[];
}

interface TraceResultItem {
    type: 'item';
    id: number;
    nsn: string;
    hash: string;
    itemStatus: number;
    pengiriman: TracePengirimanInfo | null;
    events: TraceEvent[];
    penerima: TracePenerima | null;
}

type TraceResult = TraceResultBox | TraceResultItem;

const traceQuery = ref('');
const traceResult = ref<TraceResult | null>(null);
const traceError = ref('');
const isLoadingTrace = ref(false);

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Dashboard', href: dashboard.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.1 } });

    void auth.loadPermission(true).then(() => {
        void loadPeriodeOptions().then(() => {
        // Jika default periode tidak valid, fallback ke periode pertama yang tersedia.
        if (!selectedPeriodeId.value && periodeItems.value.length > 0) {
            selectedPeriodeId.value = periodeItems.value[0]!.id;
        }
        void refreshAll();
        });
    });
});

// ─── Data Loaders ─────────────────────────────────────────────────────────────
const loadPeriodeOptions = async (): Promise<void> => {
    isLoadingPeriode.value = true;
    try {
        const response = await axiosJS.post(dashboardPeriodeOptions.url(), {}, { encrypt: true });
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status)) {
            periodeItems.value = [];
            return;
        }
        const rows = Array.isArray(payload.data) ? payload.data : [];
        periodeItems.value = rows
            .map((row: Record<string, unknown>) => ({
                id: Number(row.id ?? 0),
                nama: String(row.nama ?? '-'),
            }))
            .filter((row) => Number.isFinite(row.id) && row.id > 0);
    } catch {
        periodeItems.value = [];
    } finally {
        isLoadingPeriode.value = false;
    }
};

const refreshAll = async (): Promise<void> => {
    await Promise.all([
        loadExecutive(),
        loadActions(),
        canDistribusi.value ? loadRedFlags() : Promise.resolve(),
        canDistribusi.value ? loadDistribusiTrend() : Promise.resolve(),
        canDistribusi.value ? loadBottleneck() : Promise.resolve(),
    ]);
};

const onChangePeriode = async (id: number): Promise<void> => {
    selectedPeriodeId.value = id;
    await refreshAll();
};

const loadExecutive = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    if (!auth.loaded) return;
    isLoadingExecutive.value = true;
    try {
        const response = await axiosJS.post(
            dashboardExecutiveSummary.url(),
            { periode_id: selectedPeriodeId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        executive.value = isResponseSuccess(payload.status) ? (payload.data as ExecutiveSummary) : null;
    } catch {
        executive.value = null;
    } finally {
        isLoadingExecutive.value = false;
    }
};

const loadActions = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    if (!auth.loaded) return;
    isLoadingActions.value = true;
    try {
        const response = await axiosJS.post(
            dashboardActions.url(),
            { periode_id: selectedPeriodeId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        actionsData.value = isResponseSuccess(payload.status) ? (payload.data as ActionsData) : null;
    } catch {
        actionsData.value = null;
    } finally {
        isLoadingActions.value = false;
    }
};

const loadDistribusiTrend = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    if (!auth.loaded) return;
    isLoadingDistribusiTrend.value = true;
    try {
        const response = await axiosJS.post(
            dashboardDistribusiTrend.url(),
            { periode_id: selectedPeriodeId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        distribusiTrend.value = isResponseSuccess(payload.status) ? (payload.data as DistribusiTrend) : null;
    } catch {
        distribusiTrend.value = null;
    } finally {
        isLoadingDistribusiTrend.value = false;
    }
};

const loadBottleneck = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    if (!auth.loaded) return;
    if (!canDistribusi.value && !canAdmin.value) return;

    isLoadingBottleneck.value = true;
    try {
        const response = await axiosJS.post(
            dashboardBottleneck.url(),
            { periode_id: selectedPeriodeId.value, mode: bottleneckMode.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status) || !payload.data) {
            bottleneckItems.value = [];
            return;
        }
        bottleneckItems.value = Array.isArray(payload.data.items) ? (payload.data.items as BottleneckItem[]) : [];
    } catch {
        bottleneckItems.value = [];
    } finally {
        isLoadingBottleneck.value = false;
    }
};

watch(
    () => bottleneckMode.value,
    async () => {
        await loadBottleneck();
    },
);

const loadRedFlags = async (): Promise<void> => {
    isLoadingRedFlags.value = true;
    try {
        if (!auth.loaded) return;
        const response = await axiosJS.post(dashboardRedFlag.url(), { periode_id: selectedPeriodeId.value }, { encrypt: true });
        const payload = response.data ?? {};
        if (isResponseSuccess(payload.status)) {
            redFlagsData.value = payload.data;
        }
    } catch {
        // silent
    } finally {
        isLoadingRedFlags.value = false;
    }
};

const doTrace = async (): Promise<void> => {
    if (!traceQuery.value.trim()) return;
    isLoadingTrace.value = true;
    traceResult.value = null;
    traceError.value = '';
    try {
        const response = await axiosJS.post(dashboardTrace.url(), { query: traceQuery.value.trim() }, { encrypt: true });
        const payload = response.data ?? {};
        if (isResponseSuccess(payload.status)) {
            traceResult.value = payload.data;
        } else {
            traceError.value = payload.message ?? 'Data tidak ditemukan.';
        }
    } catch {
        traceError.value = 'Terjadi kesalahan saat mencari data.';
    } finally {
        isLoadingTrace.value = false;
    }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusColorClass = (status: number): string => {
    if (status === 9) return 'bg-red-500/10 text-red-600 border-red-300';
    if (status === 4) return 'bg-green-500/10 text-green-600 border-green-300';
    if (status === 3) return 'bg-amber-500/10 text-amber-600 border-amber-300';
    if (status === 2) return 'bg-blue-500/10 text-blue-600 border-blue-300';
    return 'bg-gray-500/10 text-gray-600 border-gray-300';
};

const traceEventStatusClass = (status: number): string => {
    if (status === 9) return 'border-red-400 bg-red-500/10';
    if (status === 4) return 'border-green-400 bg-green-500/10';
    if (status === 3) return 'border-amber-400 bg-amber-500/10';
    if (status === 2) return 'border-blue-400 bg-blue-500/10';
    return 'border-gray-300 bg-gray-500/10';
};

const getRedFlagNote = (note: string | undefined): string => {
    if (!note) return '';
    if (note.includes('(LOCK)')) {
        return 'mismatch item (ketidaksesuaian) — perlu ditindaklanjuti';
    }
    if (note.includes('(FLAG)') || note.includes('[FLAG]')) {
        return 'anomali saat transit — perlu pengecekan';
    }
    return note.trim();
};

/**
 * Extract event flag information (LOCK or FLAG)
 * Returns object with flag type and description
 */
const extractEventFlagInfo = (note: string | undefined): { type: 'LOCK' | 'FLAG' | null; description: string } => {
    if (!note) return { type: null, description: '' };

    if (note.includes('(LOCK)')) {
        return {
            type: 'LOCK',
            description: 'Pengiriman terkunci - data telah diverifikasi dan tidak dapat diubah',
        };
    }

    if (note.includes('(FLAG)')) {
        return {
            type: 'FLAG',
            description: 'Pengiriman ditandai - Ada anomali: item dilewati, perubahan unit_rawat transit, atau flag sebelumnya',
        };
    }

    return { type: null, description: '' };
};

/**
 * Get detailed description for trace event
 */
const getEventStatusInfo = (
    note: string | undefined,
    status: number,
): { hasFlagInfo: boolean; flagType: 'LOCK' | 'FLAG' | null; description: string } => {
    const flagInfo = extractEventFlagInfo(note);
    return {
        hasFlagInfo: flagInfo.type !== null,
        flagType: flagInfo.type,
        description: flagInfo.description,
    };
};

const kpiPengajuan = computed(() => {
    const p = executive.value?.pengajuan;
    return [
        { title: 'Total Pengajuan', value: p?.total ?? 0, info: 'Total pengajuan pada periode terpilih.', icon: Box, tone: 'default', href: monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId.value } }) },
        { title: 'Menunggu Validasi', value: p?.menunggu ?? 0, info: 'Pengajuan belum diproses.', icon: History, tone: 'muted', href: monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId.value } }) },
        { title: 'Disetujui UnitRawat Induk', value: p?.disetujuiInduk ?? 0, info: 'Sudah disetujui tingkat unit_rawat induk.', icon: CheckCircle2, tone: 'amber', href: monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId.value } }) },
        { title: 'Disetujui Pusbekangad', value: p?.disetujuiPusbekangad ?? 0, info: 'Sudah disetujui tingkat Pusbekangad.', icon: CheckCircle2, tone: 'blue', href: monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId.value } }) },
        { title: 'Validasi Berhasil', value: p?.validasiBerhasil ?? 0, info: 'Pengajuan sudah final (terkunci).', icon: Lock, tone: 'green', href: monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId.value } }) },
    ] as const;
});

const kpiDistribusi = computed(() => {
    const d = executive.value?.distribusi;
    return [
        { title: 'Dalam Pengiriman', value: d?.dalamPengiriman ?? 0, info: 'Sedang dalam proses pengiriman.', icon: Truck, tone: 'blue', href: monitoring.url({ query: { periode_id: selectedPeriodeId.value, status: 2 } }) },
        { title: 'Tiba & Diverifikasi', value: d?.tiba ?? 0, info: 'Sudah tiba dan diverifikasi.', icon: CheckCircle2, tone: 'amber', href: monitoring.url({ query: { periode_id: selectedPeriodeId.value, status: 3 } }) },
        { title: 'Diterima Nakes (PoD)', value: d?.diterima ?? 0, info: 'Selesai diterima (PoD tercatat).', icon: PackageCheck, tone: 'green', href: monitoring.url({ query: { periode_id: selectedPeriodeId.value, status: 4 } }) },
        { title: 'Anomali/Red Flag', value: d?.anomali.total ?? 0, info: `LOCK: ${d?.anomali.lock ?? 0} · FLAG: ${d?.anomali.flag ?? 0} · Kembali: ${d?.dikembalikan ?? 0}`, icon: ShieldAlert, tone: 'red', href: '#red-flag' },
    ] as const;
});

type DonutSegment = {
    key: string;
    label: string;
    value: number;
    color: string;
    dashArray: string;
    dashOffset: string;
};

const distribusiDonut = computed(() => {
    const d = executive.value?.distribusi;
    const total = Number(d?.total ?? 0);

    const rawSegments = [
        { key: '1', label: 'Siap', value: Number(d?.siap ?? 0), color: '#64748B' }, // slate
        { key: '2', label: 'Dikirim', value: Number(d?.dalamPengiriman ?? 0), color: '#2563EB' }, // blue
        { key: '3', label: 'Tiba', value: Number(d?.tiba ?? 0), color: '#D97706' }, // amber
        { key: '4', label: 'Diterima', value: Number(d?.diterima ?? 0), color: '#16A34A' }, // green
        { key: '9', label: 'Kembali', value: Number(d?.dikembalikan ?? 0), color: '#DC2626' }, // red
    ].filter((s) => s.value > 0);

    const r = 46;
    const c = 2 * Math.PI * r;
    const gap = 2; // gap kecil antar segmen (lebih rapi)

    let acc = 0;
    const segments: DonutSegment[] = rawSegments.map((s) => {
        const len = total > 0 ? (s.value / total) * c : 0;
        const adjusted = Math.max(len - gap, 0);
        const dashArray = `${adjusted} ${c}`;
        const dashOffset = `${-acc}`;
        acc += len;

        return {
            ...s,
            dashArray,
            dashOffset,
        };
    });

    return {
        total,
        segments,
        circumference: c,
        radius: r,
    };
});

const distribusiSpark = computed(() => {
    const series = distribusiTrend.value?.series ?? [];
    if (!series.length) {
        return { points: '', max: 0 };
    }
    const w = 180;
    const h = 46;
    const padX = 6;
    const padY = 6;
    const max = Math.max(...series.map((p) => p.jumlah), 0);
    const denom = max === 0 ? 1 : max;

    const step = series.length > 1 ? (w - padX * 2) / (series.length - 1) : 0;
    const pts = series
        .map((p, i) => {
            const x = padX + i * step;
            const y = h - padY - (p.jumlah / denom) * (h - padY * 2);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(' ');
    return { points: pts, max };
});

const bottleneckMax = computed(() => {
    return Math.max(...bottleneckItems.value.map((x) => Number(x.jumlah ?? 0)), 0);
});

const getBottleneckLabel = computed(() => {
    if (bottleneckMode.value === 'lock') return 'LOCK (Mismatch)';
    if (bottleneckMode.value === 'flag') return 'FLAG (Transit)';
    return 'Dalam Pengiriman';
});
</script>

<template>
    <PublicLayout
        title="Dashboard"
        page-title="Dashboard Executive"
        page-sub-title="Ringkasan indikator pengajuan dan distribusi untuk mendukung pemantauan dan pengambilan keputusan."
    >
        <div class="space-y-6 px-4 lg:px-6">
            <!-- ── Executive Header / Filter ───────────────────────────── -->
            <Card>
                <CardContent class="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                    <div class="min-w-0">
                        <div class="text-muted-foreground text-xs">Periode Aktif</div>
                        <div class="mt-1 flex flex-wrap items-center gap-2">
                            <label class="text-sm font-medium" for="periode-dashboard">Periode</label>
                            <select
                                id="periode-dashboard"
                                name="periode-dashboard"
                                class="bg-background ring-offset-background focus-visible:ring-ring h-10 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                :disabled="isLoadingPeriode"
                                :value="selectedPeriodeId"
                                @change="(e) => void onChangePeriode(Number((e.target as HTMLSelectElement).value))"
                            >
                                <option v-if="isLoadingPeriode" :value="0">Memuat…</option>
                                <option v-for="p in periodeItems" :key="p.id" :value="p.id">{{ p.nama }}</option>
                            </select>
                            <span v-if="isLoadingExecutive" class="text-muted-foreground text-xs">Memuat ringkasan…</span>
                        </div>
                        <div class="text-muted-foreground mt-2 grid gap-1 text-xs sm:grid-cols-2 sm:gap-2">
                            <div class="flex items-center gap-1.5">
                                <span class="inline-block h-2 w-2 rounded-full bg-emerald-500/70" />
                                <span>Pengajuan:</span>
                                <span class="font-medium">
                                    {{ executive?.lastUpdatedAt?.pengajuan ? formatDate(executive.lastUpdatedAt.pengajuan) : '-' }}
                                </span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="inline-block h-2 w-2 rounded-full bg-blue-500/70" />
                                <span>Distribusi:</span>
                                <span class="font-medium">
                                    {{ executive?.lastUpdatedAt?.distribusi ? formatDate(executive.lastUpdatedAt.distribusi) : '-' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <a
                            v-if="canPengajuan || canAdmin"
                            class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition disabled:opacity-50"
                            :href="monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId } })"
                        >
                            Buka Pemantauan Pengajuan
                        </a>
                        <a
                            v-if="canDistribusi || canAdmin"
                            class="bg-secondary text-foreground hover:bg-secondary/80 inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition disabled:opacity-50"
                            :href="monitoring.url({ query: { periode_id: selectedPeriodeId } })"
                        >
                            Buka Monitoring Distribusi
                        </a>
                    </div>
                </CardContent>
            </Card>

            <!-- ── KPI Pengajuan ───────────────────────────────────────── -->
            <div v-if="canPengajuan || canAdmin">
                <div class="mb-2 flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold">Ringkasan Pengajuan Alokasi</div>
                        <div class="text-muted-foreground text-xs">Indikator proses pengajuan pada periode aktif.</div>
                    </div>
                    <a class="text-muted-foreground hover:text-foreground text-xs font-medium underline" :href="monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId } })">
                        Lihat detail
                    </a>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <a
                        v-for="card in kpiPengajuan"
                        :key="card.title"
                        :href="card.href"
                        class="focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none"
                    >
                        <Card class="@container/card relative h-full transition hover:-translate-y-0.5 hover:shadow-sm">
                            <CardHeader>
                                <CardDescription>{{ card.title }}</CardDescription>
                                <CardTitle class="text-2xl font-semibold tabular-nums">{{ card.value }}</CardTitle>
                                <CardAction class="text-muted-foreground">
                                    <component :is="card.icon" class="size-5" />
                                </CardAction>
                            </CardHeader>
                            <CardFooter class="text-muted-foreground text-xs">{{ card.info }}</CardFooter>
                        </Card>
                    </a>
                </div>
            </div>

            <!-- ── KPI Distribusi ──────────────────────────────────────── -->
            <div v-if="canDistribusi || canAdmin">
                <div class="mb-2 flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold">Ringkasan Distribusi</div>
                        <div class="text-muted-foreground text-xs">Indikator proses pengiriman pada periode aktif.</div>
                    </div>
                    <a class="text-muted-foreground hover:text-foreground text-xs font-medium underline" :href="monitoring.url({ query: { periode_id: selectedPeriodeId } })">
                        Lihat detail
                    </a>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
                    <!-- Donut komposisi distribusi (menggantikan kartu total agar tidak redundant) -->
                    <Card class="xl:col-span-4">
                        <CardHeader class="pb-2">
                            <CardTitle class="text-base font-semibold">Komposisi Status</CardTitle>
                            <CardDescription>Proporsi status pengiriman dan tren PoD (14 hari).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="flex items-center gap-4">
                                <div class="relative h-28 w-28">
                                    <svg class="h-28 w-28" viewBox="0 0 120 120" role="img" aria-label="Komposisi status distribusi">
                                        <circle cx="60" cy="60" :r="distribusiDonut.radius" fill="none" stroke="hsl(var(--muted))" stroke-width="10" />
                                        <g transform="rotate(-90 60 60)">
                                            <circle
                                                v-for="seg in distribusiDonut.segments"
                                                :key="seg.key"
                                                cx="60"
                                                cy="60"
                                                :r="distribusiDonut.radius"
                                                fill="none"
                                                :stroke="seg.color"
                                                stroke-width="10"
                                                :stroke-dasharray="seg.dashArray"
                                                :stroke-dashoffset="seg.dashOffset"
                                                stroke-linecap="butt"
                                            >
                                                <title>{{ seg.label }}: {{ seg.value }}</title>
                                            </circle>
                                        </g>
                                    </svg>
                                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Total</div>
                                        <div class="text-xl font-semibold tabular-nums">{{ distribusiDonut.total }}</div>
                                    </div>
                                </div>

                                <div class="min-w-0 flex-1">
                                    <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                        <a
                                            v-for="seg in distribusiDonut.segments"
                                            :key="`legend-${seg.key}`"
                                            class="hover:bg-muted/40 focus-visible:ring-ring flex items-center gap-2 rounded px-1 py-0.5 focus-visible:ring-2 focus-visible:outline-none"
                                            :href="
                                                monitoring.url({
                                                    query: {
                                                        periode_id: selectedPeriodeId,
                                                        status: Number(seg.key),
                                                    },
                                                })
                                            "
                                        >
                                            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: seg.color }" />
                                            <span class="min-w-0 truncate">{{ seg.label }}</span>
                                            <span class="ml-auto font-medium tabular-nums">{{ seg.value }}</span>
                                        </a>
                                        <div v-if="distribusiDonut.total === 0" class="text-muted-foreground col-span-2">
                                            Belum ada data pengiriman pada periode ini.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 border-t pt-3">
                                <div class="flex items-center justify-between">
                                    <div class="text-muted-foreground text-xs">Tren PoD (14 hari)</div>
                                    <div v-if="isLoadingDistribusiTrend" class="text-muted-foreground text-xs">Memuat…</div>
                                </div>
                                <div class="mt-2 flex items-center gap-3">
                                    <svg class="h-12 w-full" viewBox="0 0 180 46" role="img" aria-label="Tren PoD 14 hari">
                                        <polyline
                                            v-if="distribusiSpark.points"
                                            :points="distribusiSpark.points"
                                            fill="none"
                                            stroke="#16A34A"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <polyline
                                            v-if="!distribusiSpark.points"
                                            points="6,40 174,40"
                                            fill="none"
                                            stroke="hsl(var(--muted-foreground))"
                                            stroke-width="1"
                                            stroke-opacity="0.35"
                                        />
                                    </svg>
                                    <div class="shrink-0 text-right">
                                        <div class="text-muted-foreground text-[11px]">Puncak</div>
                                        <div class="text-sm font-semibold tabular-nums">{{ distribusiSpark.max }}</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter class="pt-0">
                            <a
                                class="text-muted-foreground hover:text-foreground text-xs font-medium underline"
                                :href="monitoring.url({ query: { periode_id: selectedPeriodeId } })"
                            >
                                Buka Monitoring Distribusi
                            </a>
                        </CardFooter>
                    </Card>

                    <a
                        v-for="card in kpiDistribusi"
                        :key="card.title"
                        :href="card.href"
                        class="focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none xl:col-span-2"
                    >
                        <Card class="@container/card relative h-full transition hover:-translate-y-0.5 hover:shadow-sm">
                            <CardHeader>
                                <CardDescription>{{ card.title }}</CardDescription>
                                <CardTitle class="text-2xl font-semibold tabular-nums">{{ card.value }}</CardTitle>
                                <CardAction class="text-muted-foreground">
                                    <component :is="card.icon" class="size-5" />
                                </CardAction>
                            </CardHeader>
                            <CardFooter class="text-muted-foreground text-xs">{{ card.info }}</CardFooter>
                        </Card>
                    </a>
                </div>

                <!-- Bottleneck (Top 5) — dibuat ringkas, tidak memperpanjang halaman -->
                <Card class="mt-4">
                    <CardHeader class="pb-2">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <CardTitle class="text-base font-semibold">Bottleneck</CardTitle>
                                <CardDescription>Top 5 unit_rawat berdasarkan: {{ getBottleneckLabel }}</CardDescription>
                            </div>

                            <div class="bg-muted/30 inline-flex items-center rounded-md border p-1">
                                <button
                                    type="button"
                                    class="rounded px-3 py-1.5 text-xs font-medium transition"
                                    :class="bottleneckMode === 'transit' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                                    :aria-pressed="bottleneckMode === 'transit'"
                                    @click="bottleneckMode = 'transit'"
                                >
                                    Dalam Pengiriman
                                </button>
                                <button
                                    type="button"
                                    class="rounded px-3 py-1.5 text-xs font-medium transition"
                                    :class="bottleneckMode === 'lock' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                                    :aria-pressed="bottleneckMode === 'lock'"
                                    @click="bottleneckMode = 'lock'"
                                >
                                    LOCK
                                </button>
                                <button
                                    type="button"
                                    class="rounded px-3 py-1.5 text-xs font-medium transition"
                                    :class="bottleneckMode === 'flag' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                                    :aria-pressed="bottleneckMode === 'flag'"
                                    @click="bottleneckMode = 'flag'"
                                >
                                    FLAG
                                </button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div v-if="isLoadingBottleneck" class="space-y-2">
                            <div v-for="i in 5" :key="i" class="bg-muted h-10 animate-pulse rounded" />
                        </div>

                        <div v-else-if="bottleneckItems.length" class="space-y-2">
                            <a
                                v-for="row in bottleneckItems"
                                :key="row.unit_rawatId"
                                class="hover:bg-muted/20 focus-visible:ring-ring block rounded-lg border px-3 py-2 focus-visible:ring-2 focus-visible:outline-none"
                                :href="
                                    monitoring.url({
                                        query: {
                                            periode_id: selectedPeriodeId,
                                            unit_rawat_id: row.unit_rawatId,
                                            status: bottleneckMode === 'lock' ? 3 : 2,
                                        },
                                    })
                                "
                            >
                                <div class="min-w-0">
                                    <div class="flex items-center justify-between gap-3">
                                        <div class="truncate text-sm font-medium">{{ row.unit_rawat }}</div>
                                        <div class="shrink-0 text-sm font-semibold tabular-nums">{{ row.jumlah }}</div>
                                    </div>
                                    <div class="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                                        <div
                                            class="h-full rounded-full bg-crusoe-500 transition-[width] duration-500"
                                            :style="{ width: bottleneckMax > 0 ? `${Math.round((row.jumlah / bottleneckMax) * 100)}%` : '0%' }"
                                        />
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div v-else class="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                            Tidak ada data bottleneck pada periode ini.
                        </div>
                    </CardContent>

                    <CardFooter class="pt-0">
                        <a
                            class="text-muted-foreground hover:text-foreground text-xs font-medium underline"
                            :href="
                                monitoring.url({
                                    query: {
                                        periode_id: selectedPeriodeId,
                                        status: bottleneckMode === 'lock' ? 3 : 2,
                                    },
                                })
                            "
                        >
                            Buka Monitoring Distribusi
                        </a>
                    </CardFooter>
                </Card>
            </div>

            <!-- ── Perlu Tindakan ──────────────────────────────────────── -->
            <div v-if="canPengajuan || canDistribusi || canAdmin" class="grid gap-4 md:grid-cols-2">
                <Card v-if="canPengajuan || canAdmin" class="flex flex-col">
                    <CardHeader class="pb-2">
                        <CardTitle class="text-base font-semibold">Perlu Tindakan</CardTitle>
                        <CardDescription>Pengajuan menunggu validasi (Top 10)</CardDescription>
                    </CardHeader>
                    <CardContent class="flex-1">
                        <div v-if="isLoadingActions" class="space-y-2">
                            <div v-for="i in 5" :key="i" class="bg-muted h-10 animate-pulse rounded" />
                        </div>
                        <div v-else-if="actionsData?.pendingAlokasi?.length" class="space-y-2">
                            <div
                                v-for="row in actionsData.pendingAlokasi"
                                :key="row.id"
                                class="hover:bg-muted/30 flex items-center justify-between gap-3 rounded-lg border p-3"
                            >
                                <div class="min-w-0">
                                    <div class="text-sm font-medium">NAN: {{ row.nan }}</div>
                                    <div class="text-muted-foreground truncate text-xs">{{ row.unit_rawat }}</div>
                                </div>
                                <div class="text-muted-foreground shrink-0 text-xs">{{ row.updatedAt ? formatDate(row.updatedAt) : '-' }}</div>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                            Tidak ada pengajuan yang menunggu validasi.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <a class="text-muted-foreground hover:text-foreground text-xs font-medium underline" :href="monitoringAlokasi.url({ query: { periode_id: selectedPeriodeId } })">
                            Buka Pemantauan Pengajuan
                        </a>
                    </CardFooter>
                </Card>

                <Card v-if="canDistribusi || canAdmin" class="flex flex-col">
                    <CardHeader class="pb-2">
                        <CardTitle class="text-base font-semibold">Perlu Tindakan</CardTitle>
                        <CardDescription>Pengiriman terlalu lama dalam pengiriman (Top 10)</CardDescription>
                    </CardHeader>
                    <CardContent class="flex-1">
                        <div v-if="isLoadingActions" class="space-y-2">
                            <div v-for="i in 5" :key="i" class="bg-muted h-10 animate-pulse rounded" />
                        </div>
                        <div v-else-if="actionsData?.overdueTransit?.length" class="space-y-2">
                            <div
                                v-for="row in actionsData.overdueTransit"
                                :key="row.id"
                                class="hover:bg-muted/30 flex items-center justify-between gap-3 rounded-lg border p-3"
                            >
                                <div class="min-w-0">
                                    <div class="text-sm font-medium">UID: {{ row.uid }}</div>
                                    <div class="text-muted-foreground truncate text-xs">
                                        {{ row.unit_rawat }} · Lokasi terakhir: {{ row.lokasiTerakhir }}
                                    </div>
                                </div>
                                <div class="text-muted-foreground shrink-0 text-xs">{{ row.updatedAt ? formatDate(row.updatedAt) : '-' }}</div>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                            Tidak ada pengiriman yang melewati ambang batas.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <a class="text-muted-foreground hover:text-foreground text-xs font-medium underline" :href="monitoring.url({ query: { periode_id: selectedPeriodeId, status: 2 } })">
                            Buka Monitoring Distribusi (Dalam Pengiriman)
                        </a>
                    </CardFooter>
                </Card>
            </div>

            <!-- ── Red Flags ───────────────────────────────────────────── -->
            <div v-if="canDistribusi || canAdmin" id="red-flag">
                <Card class="flex flex-col">
                    <CardHeader class="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle class="flex items-center gap-2 text-base font-semibold">
                                <AlertTriangle class="size-4 text-red-500" />
                                Red Flag
                                <Badge v-if="totalRedFlags > 0" class="bg-red-500 text-white hover:bg-red-500">
                                    {{ totalRedFlags }}
                                </Badge>
                            </CardTitle>
                            <CardDescription>FLAG (Transit) · LOCK (Mismatch) · Dikembalikan</CardDescription>
                        </div>
                        <button
                            aria-label="Muat ulang daftar red flag"
                            class="text-muted-foreground hover:bg-muted rounded-md p-1.5 transition"
                            :class="{ 'animate-spin': isLoadingRedFlags }"
                            :disabled="isLoadingRedFlags"
                            @click="loadRedFlags"
                        >
                            <RefreshCw class="size-4" />
                        </button>
                    </CardHeader>
                    <CardContent class="flex-1">
                        <div v-if="isLoadingRedFlags" class="space-y-2">
                            <div v-for="i in 4" :key="i" class="bg-muted h-12 animate-pulse rounded" />
                        </div>

                        <template v-else-if="redFlagsData">
                            <div v-if="totalRedFlags === 0" class="text-muted-foreground py-8 text-center text-sm">Tidak ada red flag saat ini.</div>

                            <div v-else class="max-h-72 space-y-2 overflow-y-auto pr-1">
                                <!-- FLAG (Transit) -->
                                <template v-if="redFlagsData.flag.length > 0">
                                    <div class="mb-1 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                                        <TriangleAlert class="size-3" />
                                        FLAG (Transit) ({{ redFlagsData.flag.length }})
                                    </div>
                                    <div
                                        v-for="row in redFlagsData.flag"
                                        :key="`flag-${row.id}`"
                                        class="rounded-lg border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-800 dark:bg-amber-950/30"
                                    >
                                        <div class="flex items-start justify-between gap-2">
                                            <div>
                                                <div class="text-sm font-medium">UID: {{ row.uid }}</div>
                                                <div class="text-muted-foreground text-xs">{{ row.unit_rawat }} · {{ row.periode }}</div>
                                            </div>
                                            <Badge variant="outline" class="shrink-0 border-amber-300 text-amber-700"> FLAG </Badge>
                                        </div>
                                        <div v-if="row.note" class="text-muted-foreground mt-1 truncate text-xs">
                                            {{ getRedFlagNote(row.note) }}
                                        </div>
                                        <div class="text-muted-foreground mt-1 text-xs">
                                            {{ formatDate(row.updatedAt) }}
                                        </div>
                                    </div>
                                </template>

                                <!-- LOCK (Mismatch) -->
                                <template v-if="redFlagsData.lock.length > 0">
                                    <div class="mt-3 mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                        <Lock class="size-3" />
                                        LOCK (Mismatch) ({{ redFlagsData.lock.length }})
                                    </div>
                                    <div
                                        v-for="row in redFlagsData.lock"
                                        :key="`lock-${row.id}`"
                                        class="rounded-lg border border-red-200 bg-red-50/60 p-3 dark:border-red-800 dark:bg-red-950/30"
                                    >
                                        <div class="flex items-start justify-between gap-2">
                                            <div>
                                                <div class="text-sm font-medium">UID: {{ row.uid }}</div>
                                                <div class="text-muted-foreground text-xs">{{ row.unit_rawat }} · {{ row.periode }}</div>
                                            </div>
                                            <Badge variant="outline" class="shrink-0 border-red-300 text-red-600"> LOCK </Badge>
                                        </div>
                                        <div v-if="row.note" class="text-muted-foreground mt-1 truncate text-xs">
                                            {{ getRedFlagNote(row.note) }}
                                        </div>
                                        <div class="text-muted-foreground mt-1 text-xs">
                                            {{ formatDate(row.updatedAt) }}
                                        </div>
                                    </div>
                                </template>

                                <!-- Dikembalikan -->
                                <template v-if="redFlagsData.returned.length > 0">
                                    <div class="mt-3 mb-1 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                                        <AlertTriangle class="size-3" />
                                        Dikembalikan ({{ redFlagsData.returned.length }})
                                    </div>
                                    <div
                                        v-for="row in redFlagsData.returned"
                                        :key="`ret-${row.id}`"
                                        class="rounded-lg border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-700 dark:bg-gray-900/30"
                                    >
                                        <div class="flex items-start justify-between gap-2">
                                            <div>
                                                <div class="text-sm font-medium">UID: {{ row.uid }}</div>
                                                <div class="text-muted-foreground text-xs">{{ row.unit_rawat }} · {{ row.periode }}</div>
                                            </div>
                                            <Badge variant="outline" class="shrink-0 border-gray-300 text-gray-700"> Kembali </Badge>
                                        </div>
                                        <div class="text-muted-foreground mt-1 text-xs">
                                            {{ formatDate(row.updatedAt) }}
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>

                        <div v-else class="text-muted-foreground py-6 text-center text-sm">Gagal memuat data red flag.</div>
                    </CardContent>
                </Card>
            </div>

            <!-- ── Event Trace ─────────────────────────────────────────── -->
            <Card v-if="canPencarian || canAdmin" id="trace">
                <CardHeader class="pb-2">
                    <CardTitle class="flex items-center gap-2 text-base font-semibold">
                        <History class="size-4" />
                        Penelusuran Riwayat Event
                    </CardTitle>
                    <CardDescription>Lacak riwayat pengiriman berdasarkan UID Box atau hash Item</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <!-- Search input -->
                    <div class="flex gap-2">
                        <div class="relative flex-1">
                            <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                            <input
                                v-model="traceQuery"
                                type="text"
                                name="trace-query"
                                aria-label="Cari UID Box atau hash item"
                                placeholder="Masukkan UID Box (angka) atau hash Item…"
                                class="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border pr-4 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                @keydown.enter="doTrace"
                            />
                        </div>
                        <button
                            class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:opacity-50"
                            :disabled="isLoadingTrace || !traceQuery.trim()"
                            @click="doTrace"
                        >
                            <RefreshCw v-if="isLoadingTrace" class="size-4 animate-spin" />
                            <Search v-else class="size-4" />
                            Lacak
                        </button>
                    </div>

                    <!-- Error state -->
                    <div v-if="traceError" class="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border px-4 py-3 text-sm">
                        {{ traceError }}
                    </div>

                    <!-- Loading skeleton -->
                    <div v-if="isLoadingTrace" class="space-y-3">
                        <div class="bg-muted h-6 w-1/3 animate-pulse rounded" />
                        <div v-for="i in 3" :key="i" class="bg-muted h-14 animate-pulse rounded" />
                    </div>

                    <!-- Trace Result: BOX -->
                    <div v-else-if="traceResult?.type === 'box'" class="space-y-4">
                        <!-- Box header -->
                        <div class="bg-muted/40 rounded-lg border p-4">
                            <div class="mb-2 flex items-center gap-2">
                                <Box class="text-primary size-4" />
                                <span class="font-semibold">Box / Pengiriman</span>
                            </div>
                            <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-4">
                                <div>
                                    <span class="text-muted-foreground">UID:</span> <span class="font-medium">{{ traceResult.uid }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">NAN:</span> <span class="font-medium">{{ traceResult.nan }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">UnitRawat:</span> <span class="font-medium">{{ traceResult.unit_rawat }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Periode:</span> <span class="font-medium">{{ traceResult.periode }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Dibuat oleh:</span>
                                    <span class="font-medium">{{ traceResult.createdBy }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Tanggal:</span>
                                    <span class="font-medium">{{ formatDate(traceResult.createdAt) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Timeline events -->
                        <div>
                            <div class="text-muted-foreground mb-2 text-sm font-semibold">Riwayat Event ({{ traceResult.events.length }})</div>
                            <div class="relative space-y-0">
                                <div v-for="(evt, idx) in traceResult.events" :key="evt.id" class="flex gap-3">
                                    <!-- timeline line -->
                                    <div class="flex flex-col items-center">
                                        <div :class="['mt-1 size-3 shrink-0 rounded-full border-2', traceEventStatusClass(evt.status)]" />
                                        <div v-if="idx < traceResult.events.length - 1" class="bg-border w-px flex-1" />
                                    </div>
                                    <!-- event content -->
                                    <div class="mb-3 flex-1 rounded-lg border p-3 text-sm">
                                        <div class="flex items-center justify-between gap-2">
                                            <Badge variant="outline" :class="statusColorClass(evt.status)">
                                                {{ evt.statusLabel }}
                                            </Badge>
                                            <span class="text-muted-foreground text-xs">{{ formatDate(evt.createdAt) }}</span>
                                        </div>
                                        <div class="text-muted-foreground mt-1.5 grid grid-cols-2 gap-x-4 text-xs">
                                            <div v-if="evt.lokasi !== '-'">
                                                Lokasi: <span class="text-foreground font-medium">{{ evt.lokasi }}</span>
                                            </div>
                                            <div v-if="evt.createdBy !== '-'">
                                                Oleh: <span class="text-foreground font-medium">{{ evt.createdBy }}</span>
                                            </div>
                                            <div v-if="evt.note" class="col-span-2">Catatan: {{ evt.note }}</div>
                                        </div>

                                        <!-- LOCK/FLAG Information -->
                                        <div
                                            v-if="getEventStatusInfo(evt.note, evt.status).hasFlagInfo"
                                            class="mt-2.5 flex items-start gap-2 rounded-md bg-amber-50 p-2 dark:bg-amber-950/20"
                                        >
                                            <TriangleAlert
                                                v-if="getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG'"
                                                class="mt-0.5 size-3.5 flex-shrink-0 text-amber-600 dark:text-amber-500"
                                            />
                                            <Lock
                                                v-else-if="getEventStatusInfo(evt.note, evt.status).flagType === 'LOCK'"
                                                class="mt-0.5 size-3.5 flex-shrink-0 text-amber-600 dark:text-amber-500"
                                            />
                                            <div class="flex-1">
                                                <Badge
                                                    :variant="getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG' ? 'default' : 'secondary'"
                                                    :class="
                                                        getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG'
                                                            ? 'mb-1 bg-amber-600 text-white dark:bg-amber-500'
                                                            : 'mb-1 bg-orange-600 text-white dark:bg-orange-500'
                                                    "
                                                >
                                                    {{ getEventStatusInfo(evt.note, evt.status).flagType }}
                                                </Badge>
                                                <div class="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                                                    {{ getEventStatusInfo(evt.note, evt.status).description }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- PoD Recipients -->
                        <div v-if="traceResult.pods.length > 0">
                            <div class="text-muted-foreground mb-2 text-sm font-semibold">
                                <User2 class="mr-1 inline size-3.5" />
                                Item Penerima ({{ traceResult.pods.length }})
                            </div>
                            <div class="max-h-60 overflow-y-auto rounded-lg border">
                                <table class="w-full text-sm">
                                    <thead class="bg-muted/60 sticky top-0 text-xs">
                                        <tr>
                                            <th class="px-3 py-2 text-left font-medium">NSN</th>
                                            <th class="px-3 py-2 text-left font-medium">Hash</th>
                                            <th class="px-3 py-2 text-left font-medium">Penerima</th>
                                            <th class="px-3 py-2 text-left font-medium">NRP</th>
                                            <th class="px-3 py-2 text-left font-medium">Pangkat</th>
                                            <th class="px-3 py-2 text-left font-medium">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="pod in traceResult.pods" :key="pod.itemId" class="hover:bg-muted/30 border-t">
                                            <td class="px-3 py-2 font-mono text-xs">{{ pod.nsn }}</td>
                                            <td class="px-3 py-2 font-mono text-xs">{{ pod.itemHash }}</td>
                                            <td class="px-3 py-2">{{ pod.penerimaNama }}</td>
                                            <td class="px-3 py-2 font-mono text-xs">{{ pod.penerimaNrp }}</td>
                                            <td class="px-3 py-2">{{ pod.penerimaPangkat }}</td>
                                            <td class="text-muted-foreground px-3 py-2 text-xs">{{ formatDate(pod.createdAt) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                            Belum ada data PoD untuk box ini.
                        </div>
                    </div>

                    <!-- Trace Result: ITEM -->
                    <div v-else-if="traceResult?.type === 'item'" class="space-y-4">
                        <!-- Item header -->
                        <div class="bg-muted/40 rounded-lg border p-4">
                            <div class="mb-2 flex items-center gap-2">
                                <PackageCheck class="text-primary size-4" />
                                <span class="font-semibold">Detail Item</span>
                            </div>
                            <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                                <div>
                                    <span class="text-muted-foreground">NSN:</span> <span class="font-mono font-medium">{{ traceResult.nsn }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Hash:</span> <span class="font-mono font-medium">{{ traceResult.hash }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Linked pengiriman -->
                        <div v-if="traceResult.pengiriman" class="bg-muted/40 rounded-lg border p-4">
                            <div class="mb-2 flex items-center gap-2">
                                <Box class="text-muted-foreground size-4" />
                                <span class="text-sm font-semibold">Pengiriman Terkait</span>
                            </div>
                            <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-3">
                                <div>
                                    <span class="text-muted-foreground">UID:</span> <span class="font-medium">{{ traceResult.pengiriman.uid }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">NAN:</span> <span class="font-medium">{{ traceResult.pengiriman.nan }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">UnitRawat:</span>
                                    <span class="font-medium">{{ traceResult.pengiriman.unit_rawat }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Periode:</span>
                                    <span class="font-medium">{{ traceResult.pengiriman.periode }}</span>
                                </div>
                                <div>
                                    <span class="text-muted-foreground">Dibuat:</span>
                                    <span class="font-medium">{{ formatDate(traceResult.pengiriman.createdAt) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Timeline events -->
                        <div v-if="traceResult.events.length > 0">
                            <div class="text-muted-foreground mb-2 text-sm font-semibold">Riwayat Event ({{ traceResult.events.length }})</div>
                            <div class="space-y-0">
                                <div v-for="(evt, idx) in traceResult.events" :key="evt.id" class="flex gap-3">
                                    <div class="flex flex-col items-center">
                                        <div :class="['mt-1 size-3 shrink-0 rounded-full border-2', traceEventStatusClass(evt.status)]" />
                                        <div v-if="idx < traceResult.events.length - 1" class="bg-border w-px flex-1" />
                                    </div>
                                    <div class="mb-3 flex-1 rounded-lg border p-3 text-sm">
                                        <div class="flex items-center justify-between gap-2">
                                            <Badge variant="outline" :class="statusColorClass(evt.status)">
                                                {{ evt.statusLabel }}
                                            </Badge>
                                            <span class="text-muted-foreground text-xs">{{ formatDate(evt.createdAt) }}</span>
                                        </div>
                                        <div class="text-muted-foreground mt-1.5 grid grid-cols-2 gap-x-4 text-xs">
                                            <div v-if="evt.lokasi !== '-'">
                                                Lokasi: <span class="text-foreground font-medium">{{ evt.lokasi }}</span>
                                            </div>
                                            <div v-if="evt.createdBy !== '-'">
                                                Oleh: <span class="text-foreground font-medium">{{ evt.createdBy }}</span>
                                            </div>
                                            <div v-if="evt.note" class="col-span-2">Catatan: {{ evt.note }}</div>
                                        </div>

                                        <!-- LOCK/FLAG Information -->
                                        <div
                                            v-if="getEventStatusInfo(evt.note, evt.status).hasFlagInfo"
                                            class="mt-2.5 flex items-start gap-2 rounded-md bg-amber-50 p-2 dark:bg-amber-950/20"
                                        >
                                            <TriangleAlert
                                                v-if="getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG'"
                                                class="mt-0.5 size-3.5 flex-shrink-0 text-amber-600 dark:text-amber-500"
                                            />
                                            <Lock
                                                v-else-if="getEventStatusInfo(evt.note, evt.status).flagType === 'LOCK'"
                                                class="mt-0.5 size-3.5 flex-shrink-0 text-amber-600 dark:text-amber-500"
                                            />
                                            <div class="flex-1">
                                                <Badge
                                                    :variant="getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG' ? 'default' : 'secondary'"
                                                    :class="
                                                        getEventStatusInfo(evt.note, evt.status).flagType === 'FLAG'
                                                            ? 'mb-1 bg-amber-600 text-white dark:bg-amber-500'
                                                            : 'mb-1 bg-orange-600 text-white dark:bg-orange-500'
                                                    "
                                                >
                                                    {{ getEventStatusInfo(evt.note, evt.status).flagType }}
                                                </Badge>
                                                <div class="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                                                    {{ getEventStatusInfo(evt.note, evt.status).description }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Penerima (PoD) -->
                        <div v-if="traceResult.penerima">
                            <div class="text-muted-foreground mb-2 text-sm font-semibold">
                                <CheckCircle2 class="mr-1 inline size-3.5 text-green-500" />
                                Penerima Akhir
                            </div>
                            <div class="rounded-lg border border-green-200 bg-green-50/40 p-4 dark:border-green-800 dark:bg-green-950/20">
                                <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-3">
                                    <div>
                                        <span class="text-muted-foreground">Nama:</span>
                                        <span class="font-medium">{{ traceResult.penerima.nama }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted-foreground">NRP:</span>
                                        <span class="font-mono font-medium">{{ traceResult.penerima.nrp }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted-foreground">Pangkat:</span>
                                        <span class="font-medium">{{ traceResult.penerima.pangkat }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted-foreground">Tanggal PoD:</span>
                                        <span class="font-medium">{{ formatDate(traceResult.penerima.createdAt) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                            Item belum memiliki penerima (PoD belum dicatat).
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </PublicLayout>
</template>
