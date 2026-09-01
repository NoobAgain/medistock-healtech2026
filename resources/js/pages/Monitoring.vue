<script setup lang="ts">
import { CircleCheck, Check, Info, Loader2, Package, Truck, UserCheck } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import PublicLayout from '@/layouts/PublicLayout.vue';
import type { RowPengiriman } from '@/lib/libDataPengiriman';
import { formatDateShort, isResponseSuccess } from '@/lib/libUtils';
import {
    monitoring,
    monitoringDetail,
    monitoringListdata,
    monitoringPeriodeOptions,
    monitoringSummary,
    monitoringSatuanBawahOptions,
    monitoringSatuanIndukOptions,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();

type PengirimanCommandItem = {
    id: number;
    uid: string;
    nan: string;
    label: string;
    unit_rawat: string;
    status: number;
    statusLabel: string;
    updatedAt: string;
    lokasiTerakhir: string;
};

type MonitoringEventItem = {
    uid: string;
    status: number;
    statusLabel: string;
    lokasi: string;
    validator: string;
    note: string;
    createdAt: string;
};

type MonitoringDetailRow = RowPengiriman & {
    eventHistory?: MonitoringEventItem[];
};

const selectedPengirimanId = ref<number | null>(null);
const items = ref<PengirimanCommandItem[]>([]);
const monitoringItem = ref<MonitoringDetailRow | null>(null);
const isLoadingItems = ref(false);
const isLoadingDetail = ref(false);
const latestDetailRequestToken = ref(0);

type PeriodeItem = { id: number; nama: string };
type UnitRawatItem = { id: number; nama: string };

const periodeItems = ref<PeriodeItem[]>([]);
const selectedPeriodeId = ref<number | null>(null);
const isLoadingPeriode = ref(false);

const unit_rawatIndukItems = ref<UnitRawatItem[]>([]);
const selectedUnitRawatIndukId = ref<number | null>(null);
const isLoadingUnitRawatInduk = ref(false);

const unit_rawatBawahItems = ref<UnitRawatItem[]>([]);
const selectedUnitRawatId = ref<number | null>(null);
const isLoadingUnitRawatBawah = ref(false);

const statusOptions = [
    { id: 0, nama: 'Semua Status' },
    { id: 1, nama: 'Siap Dikirim' },
    { id: 2, nama: 'Dalam Pengiriman' },
    { id: 3, nama: 'Tiba & Diverifikasi' },
    { id: 4, nama: 'Diterima Nakes (PoD)' },
    { id: 9, nama: 'Dikembalikan' },
] as const;

const selectedStatus = ref<number>(0);

const summaryStats = ref<{
    total: number;
    byStatus: Record<string, number>;
} | null>(null);
const isLoadingSummary = ref(false);

const statusSteps = [
    {
        step: 1,
        title: 'Siap Dikirim',
        description: 'Barang sudah siap untuk proses pengiriman',
        icon: Package,
        color: 'gray',
    },
    {
        step: 2,
        title: 'Dalam Pengiriman',
        description: 'Barang sedang dikirim (melalui simpul transit)',
        icon: Truck,
        color: 'blue',
    },
    {
        step: 3,
        title: 'Tiba & Diverifikasi',
        description: 'Barang sudah tiba di unit_rawat dan diverifikasi',
        icon: CircleCheck,
        color: 'amber',
    },
    {
        step: 4,
        title: 'Diterima Nakes (PoD)',
        description: 'Barang sudah diterima nakes (PoD tercatat)',
        icon: UserCheck,
        color: 'green',
    },
] as const;

const getCurrentStepIndex = computed(() => {
    if (!monitoringItem.value) {
        return 0;
    }

    const status = monitoringItem.value.status;

    if (status === 9) {
        return -1;
    }

    return Math.max(0, status - 1);
});

const monitoringHistory = computed<MonitoringEventItem[]>(() => {
    return Array.isArray(monitoringItem.value?.eventHistory) ? monitoringItem.value.eventHistory : [];
});

const stepIndicatorColorMap: Record<string, string> = {
    gray: 'bg-gray-500 text-white',
    blue: 'bg-blue-500 text-white',
    amber: 'bg-amber-500 text-white',
    green: 'bg-green-500 text-white',
};

const stepSeparatorColorMap: Record<string, string> = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-400',
    amber: 'bg-amber-400',
    green: 'bg-green-400',
};

const getStepIndicatorClass = (step: (typeof statusSteps)[number]): string => {
    if (step.step <= getCurrentStepIndex.value + 1) {
        return stepIndicatorColorMap[step.color] ?? 'bg-gray-500 text-white';
    }

    return 'bg-gray-200 text-gray-400 dark:bg-gray-700';
};

const getStepSeparatorClass = (step: (typeof statusSteps)[number]): string => {
    const nextStep = statusSteps.find((item) => item.step === step.step + 1);

    if (step.step <= getCurrentStepIndex.value) {
        return stepSeparatorColorMap[nextStep?.color ?? 'gray'] ?? 'bg-gray-400';
    }

    return 'bg-gray-200 dark:bg-gray-700';
};

const statusBadgeClass = computed(() => {
    const status = Number(monitoringItem.value?.status ?? 0);
    if (status === 9) return 'bg-red-500 text-white hover:bg-red-500';
    if (status === 4) return 'bg-green-500 text-white hover:bg-green-500';
    if (status === 3) return 'bg-amber-500 text-white hover:bg-amber-500';
    if (status === 2) return 'bg-blue-500 text-white hover:bg-blue-500';
    return 'bg-gray-500 text-white hover:bg-gray-500';
});

const hasAppliedQuery = ref(false);
const initialQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const qPeriodeId = initialQuery ? Number(initialQuery.get('periode_id') ?? 0) : 0;
const qUnitRawatIndukId = initialQuery ? Number(initialQuery.get('unit_rawat_induk_id') ?? 0) : 0;
const qUnitRawatId = initialQuery ? Number(initialQuery.get('unit_rawat_id') ?? 0) : 0;
const qStatus = initialQuery ? Number(initialQuery.get('status') ?? 0) : 0;

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Pengiriman Barang', href: '' },
        { label: 'Monitoring Distribusi', href: monitoring.url() },
    ];

    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.33 } });

    void loadPeriodeOptions();
});

const applyQueryIfAny = async (): Promise<void> => {
    if (hasAppliedQuery.value) return;
    if (!qPeriodeId) return;

    const periode = periodeItems.value.find((p) => p.id === qPeriodeId);
    if (!periode) return;

    hasAppliedQuery.value = true;

    await onSelectPeriode(periode);

    // Apply optional filters and reload
    if (qUnitRawatIndukId > 0) {
        selectedUnitRawatIndukId.value = qUnitRawatIndukId;
        await loadUnitRawatBawahOptions();
    }
    if (qUnitRawatId > 0) {
        selectedUnitRawatId.value = qUnitRawatId;
    }
    if (qStatus > 0) {
        selectedStatus.value = qStatus;
    }

    await loadSummaryStats();
    await loadPengirimanItems();
};

const loadPeriodeOptions = async (): Promise<void> => {
    isLoadingPeriode.value = true;
    try {
        const response = await axiosJS.post(monitoringPeriodeOptions.url(), {}, { encrypt: true });
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
    } catch (e) {
        console.error(e);
        periodeItems.value = [];
    } finally {
        isLoadingPeriode.value = false;
    }

    // Deep-link dari dashboard (periode/status/unit_rawat) — tidak mengubah URL, hanya membaca.
    void applyQueryIfAny();
};

const loadUnitRawatIndukOptions = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    isLoadingUnitRawatInduk.value = true;
    try {
        const response = await axiosJS.post(
            monitoringSatuanIndukOptions.url(),
            { periode_id: selectedPeriodeId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status)) {
            unit_rawatIndukItems.value = [];
            return;
        }
        const rows = Array.isArray(payload.data) ? payload.data : [];
        unit_rawatIndukItems.value = rows
            .map((row: Record<string, unknown>) => ({
                id: Number(row.id ?? 0),
                nama: String(row.nama ?? '-'),
            }))
            .filter((row) => Number.isFinite(row.id) && row.id > 0);
    } catch (e) {
        console.error(e);
        unit_rawatIndukItems.value = [];
    } finally {
        isLoadingUnitRawatInduk.value = false;
    }
};

const loadUnitRawatBawahOptions = async (): Promise<void> => {
    if (!selectedPeriodeId.value || !selectedUnitRawatIndukId.value) {
        unit_rawatBawahItems.value = [];
        return;
    }
    isLoadingUnitRawatBawah.value = true;
    try {
        const response = await axiosJS.post(
            monitoringSatuanBawahOptions.url(),
            { periode_id: selectedPeriodeId.value, unit_rawat_induk_id: selectedUnitRawatIndukId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status)) {
            unit_rawatBawahItems.value = [];
            return;
        }
        const rows = Array.isArray(payload.data) ? payload.data : [];
        unit_rawatBawahItems.value = rows
            .map((row: Record<string, unknown>) => ({
                id: Number(row.id ?? 0),
                nama: String(row.nama ?? '-'),
            }))
            .filter((row) => Number.isFinite(row.id) && row.id > 0);
    } catch (e) {
        console.error(e);
        unit_rawatBawahItems.value = [];
    } finally {
        isLoadingUnitRawatBawah.value = false;
    }
};

const onSelectPeriode = async (periode: PeriodeItem): Promise<void> => {
    if (selectedPeriodeId.value === periode.id) {
        selectedPeriodeId.value = null;
        selectedUnitRawatIndukId.value = null;
        selectedUnitRawatId.value = null;
        selectedStatus.value = 0;
        unit_rawatIndukItems.value = [];
        unit_rawatBawahItems.value = [];
        items.value = [];
        selectedPengirimanId.value = null;
        monitoringItem.value = null;
        latestDetailRequestToken.value += 1;
        return;
    }

    selectedPeriodeId.value = periode.id;
    selectedUnitRawatIndukId.value = null;
    selectedUnitRawatId.value = null;
    selectedPengirimanId.value = null;
    monitoringItem.value = null;
    latestDetailRequestToken.value += 1;

    await loadUnitRawatIndukOptions();
    await loadSummaryStats();
    await loadPengirimanItems();
};

const toggleUnitRawatInduk = async (id: number): Promise<void> => {
    selectedUnitRawatIndukId.value = selectedUnitRawatIndukId.value === id ? null : id;
    selectedUnitRawatId.value = null;
    unit_rawatBawahItems.value = [];
    items.value = [];
    selectedPengirimanId.value = null;
    monitoringItem.value = null;
    latestDetailRequestToken.value += 1;

    if (selectedUnitRawatIndukId.value) {
        await loadUnitRawatBawahOptions();
    }
    await loadSummaryStats();
    await loadPengirimanItems();
};

const toggleUnitRawatBawah = async (id: number): Promise<void> => {
    selectedUnitRawatId.value = selectedUnitRawatId.value === id ? null : id;
    items.value = [];
    selectedPengirimanId.value = null;
    monitoringItem.value = null;
    latestDetailRequestToken.value += 1;
    await loadSummaryStats();
    await loadPengirimanItems();
};

const toggleStatus = async (id: number): Promise<void> => {
    selectedStatus.value = selectedStatus.value === id ? 0 : id;
    items.value = [];
    selectedPengirimanId.value = null;
    monitoringItem.value = null;
    latestDetailRequestToken.value += 1;
    await loadSummaryStats();
    await loadPengirimanItems();
};

const loadSummaryStats = async (): Promise<void> => {
    if (!selectedPeriodeId.value) {
        summaryStats.value = null;
        return;
    }

    isLoadingSummary.value = true;
    try {
        const payloadReq: Record<string, unknown> = { periode_id: selectedPeriodeId.value };
        if (selectedUnitRawatId.value) payloadReq.unit_rawat_id = selectedUnitRawatId.value;
        else if (selectedUnitRawatIndukId.value) payloadReq.unit_rawat_induk_id = selectedUnitRawatIndukId.value;

        const response = await axiosJS.post(monitoringSummary.url(), payloadReq, { encrypt: true });
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status) || !payload.data) {
            summaryStats.value = null;
            return;
        }

        summaryStats.value = {
            total: Number(payload.data.total ?? 0),
            byStatus: (payload.data.byStatus ?? {}) as Record<string, number>,
        };
    } catch (e) {
        console.error(e);
        summaryStats.value = null;
    } finally {
        isLoadingSummary.value = false;
    }
};

const onSelectPengiriman = async (item: PengirimanCommandItem): Promise<void> => {
    if (selectedPengirimanId.value === item.id) {
        selectedPengirimanId.value = null;
        monitoringItem.value = null;
        latestDetailRequestToken.value += 1;
        return;
    }

    selectedPengirimanId.value = item.id;
    await loadMonitoringDetail(item.id);
};

const loadPengirimanItems = async (): Promise<void> => {
    isLoadingItems.value = true;

    try {
        if (!selectedPeriodeId.value) {
            items.value = [];
            return;
        }

        const payloadReq: Record<string, unknown> = {
            periode_id: selectedPeriodeId.value,
            page: 1,
            perPage: 100,
            sortField: 'created_at',
            sortDirection: 'desc',
        };

        if (selectedUnitRawatId.value) payloadReq.unit_rawat_id = selectedUnitRawatId.value;
        else if (selectedUnitRawatIndukId.value) payloadReq.unit_rawat_induk_id = selectedUnitRawatIndukId.value;
        if (selectedStatus.value) payloadReq.status = selectedStatus.value;

        const response = await axiosJS.post(
            monitoringListdata.url(),
            payloadReq,
            { encrypt: true },
        );

        const payload = response.data ?? {};

        if (!isResponseSuccess(payload.status)) {
            items.value = [];
            selectedPengirimanId.value = null;
            monitoringItem.value = null;
            return;
        }

        const rows = Array.isArray(payload.data) ? payload.data : [];
        items.value = rows
            .map((row: Record<string, unknown>) => {
                const id = Number(row.id ?? 0);
                const uid = String(row.uid ?? '-');
                const nan = String(row.nan ?? '-');
                const unit_rawat = String(row.unit_rawat ?? '-');
                const status = Number(row.status ?? 0);
                const statusLabel = String(row.statusLabel ?? '-');
                const updatedAt = String(row.updatedAt ?? '');
                const lokasiTerakhir = String(row.lokasiTerakhir ?? '-');

                return {
                    id,
                    uid,
                    nan,
                    // untuk pencarian di Command: uid + unit_rawat + nan + lokasi
                    label: `${uid} ${unit_rawat} ${nan} ${lokasiTerakhir}`,
                    unit_rawat,
                    status,
                    statusLabel,
                    updatedAt,
                    lokasiTerakhir,
                };
            })
            .filter((row: { id: number }) => Number.isFinite(row.id) && row.id > 0);

        if (!items.value.some((item) => item.id === selectedPengirimanId.value)) {
            selectedPengirimanId.value = null;
            monitoringItem.value = null;
        }
    } catch (error) {
        console.error(error);
        items.value = [];
        selectedPengirimanId.value = null;
        monitoringItem.value = null;
    } finally {
        isLoadingItems.value = false;
    }
};

const loadMonitoringDetail = async (id: number): Promise<void> => {
    const requestToken = latestDetailRequestToken.value + 1;
    latestDetailRequestToken.value = requestToken;
    isLoadingDetail.value = true;
    monitoringItem.value = null;

    try {
        const response = await axiosJS.post(monitoringDetail.url(), { id }, { encrypt: true });

        if (requestToken !== latestDetailRequestToken.value) {
            return;
        }

        const payload = response.data ?? {};

        if (!isResponseSuccess(payload.status) || !payload.data || typeof payload.data !== 'object') {
            monitoringItem.value = null;
            return;
        }

        monitoringItem.value = payload.data as MonitoringDetailRow;
    } catch (error) {
        if (requestToken === latestDetailRequestToken.value) {
            monitoringItem.value = null;
        }

        console.error(error);
    } finally {
        if (requestToken === latestDetailRequestToken.value) {
            isLoadingDetail.value = false;
        }
    }
};
</script>

<template>
    <PublicLayout
        title="Monitoring Distribusi"
        page-title="Monitoring Distribusi"
        page-sub-title="Pemantauan status dan pergerakan pengiriman barang pada setiap simpul distribusi."
    >
        <div class="bg-background mb-4 rounded-lg border px-4 py-3">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="min-w-0">
                    <p class="text-muted-foreground text-xs">Ringkasan (sesuai filter)</p>
                    <div class="mt-1 flex items-end gap-2">
                        <span class="text-2xl font-semibold tabular-nums">{{ summaryStats?.total ?? 0 }}</span>
                        <span class="text-muted-foreground text-xs">total pengiriman</span>
                        <span v-if="isLoadingSummary" class="text-muted-foreground ml-2 text-xs">Memuat…</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    <div class="rounded-md border px-3 py-2">
                        <p class="text-muted-foreground text-[11px]">Siap</p>
                        <p class="text-base font-semibold tabular-nums">{{ summaryStats?.byStatus?.['1'] ?? 0 }}</p>
                    </div>
                    <div class="rounded-md border px-3 py-2">
                        <p class="text-muted-foreground text-[11px]">Dikirim</p>
                        <p class="text-base font-semibold tabular-nums">{{ summaryStats?.byStatus?.['2'] ?? 0 }}</p>
                    </div>
                    <div class="rounded-md border px-3 py-2">
                        <p class="text-muted-foreground text-[11px]">Tiba</p>
                        <p class="text-base font-semibold tabular-nums">{{ summaryStats?.byStatus?.['3'] ?? 0 }}</p>
                    </div>
                    <div class="rounded-md border px-3 py-2">
                        <p class="text-muted-foreground text-[11px]">Diterima</p>
                        <p class="text-base font-semibold tabular-nums">{{ summaryStats?.byStatus?.['4'] ?? 0 }}</p>
                    </div>
                    <div class="rounded-md border px-3 py-2">
                        <p class="text-muted-foreground text-[11px]">Kembali</p>
                        <p class="text-base font-semibold tabular-nums">{{ summaryStats?.byStatus?.['9'] ?? 0 }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid flex-1 grid-cols-1 content-start gap-4 lg:grid-cols-4 lg:content-normal">
            <div class="lg:col-span-1 lg:flex lg:flex-col">
                <div class="bg-background mb-4 rounded-lg border p-4">
                    <h3 class="mb-2 text-sm font-semibold">Filter Monitoring</h3>

                    <div class="space-y-3">
                        <div>
                            <p class="mb-2 text-xs font-semibold">1) Periode</p>
                            <Command class="rounded-lg border">
                                <CommandInput aria-label="Cari periode" placeholder="Cari periode…" />
                                <CommandList>
                                    <CommandEmpty>Tidak ada periode.</CommandEmpty>
                                    <CommandGroup v-if="isLoadingPeriode" heading="Memuat Periode">
                                        <CommandItem value="loading" disabled>
                                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                            Memuat periode…
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else heading="Daftar Periode">
                                        <CommandItem
                                            v-for="p in periodeItems"
                                            :key="p.id"
                                            :value="p.nama"
                                            :class="[
                                                'cursor-pointer',
                                                'bg-white! text-gray-900!',
                                                selectedPeriodeId === p.id ? '!bg-crusoe-400 !text-white' : '',
                                            ]"
                                            @select="() => void onSelectPeriode(p)"
                                        >
                                            <span>{{ p.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedPeriodeId === p.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                        <div>
                            <p class="mb-2 text-xs font-semibold">2) UnitRawat Induk</p>
                            <Command class="rounded-lg border">
                                <CommandInput aria-label="Cari unit_rawat induk" placeholder="Cari unit_rawat induk…" />
                                <CommandList>
                                    <CommandEmpty>Tidak ada unit_rawat induk.</CommandEmpty>
                                    <CommandGroup v-if="!selectedPeriodeId" heading="Pilih periode dulu">
                                        <CommandItem value="info" disabled> Pilih periode terlebih dahulu. </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else-if="isLoadingUnitRawatInduk" heading="Memuat unit_rawat induk">
                                        <CommandItem value="loading" disabled>
                                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                            Memuat unit_rawat induk…
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else heading="Daftar UnitRawat Induk">
                                        <CommandItem
                                            v-for="s in unit_rawatIndukItems"
                                            :key="s.id"
                                            :value="s.nama"
                                            :class="[
                                                'cursor-pointer',
                                                'bg-white! text-gray-900!',
                                                selectedUnitRawatIndukId === s.id ? '!bg-crusoe-400 !text-white' : '',
                                            ]"
                                            @select="() => void toggleUnitRawatInduk(s.id)"
                                        >
                                            <span>{{ s.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedUnitRawatIndukId === s.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                        <div>
                            <p class="mb-2 text-xs font-semibold">3) UnitRawat Bawah</p>
                            <Command class="rounded-lg border">
                                <CommandInput aria-label="Cari unit_rawat bawah" placeholder="Cari unit_rawat bawah…" />
                                <CommandList>
                                    <CommandEmpty>Tidak ada unit_rawat bawah.</CommandEmpty>
                                    <CommandGroup v-if="!selectedUnitRawatIndukId" heading="Pilih unit_rawat induk dulu">
                                        <CommandItem value="info" disabled> Pilih unit_rawat induk terlebih dahulu. </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else-if="isLoadingUnitRawatBawah" heading="Memuat unit_rawat bawah">
                                        <CommandItem value="loading" disabled>
                                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                            Memuat unit_rawat bawah…
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else heading="Daftar UnitRawat Bawah">
                                        <CommandItem
                                            v-for="s in unit_rawatBawahItems"
                                            :key="s.id"
                                            :value="s.nama"
                                            :class="[
                                                'cursor-pointer',
                                                'bg-white! text-gray-900!',
                                                selectedUnitRawatId === s.id ? '!bg-crusoe-400 !text-white' : '',
                                            ]"
                                            @select="() => void toggleUnitRawatBawah(s.id)"
                                        >
                                            <span>{{ s.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedUnitRawatId === s.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                        <div>
                            <p class="mb-2 text-xs font-semibold">4) Status</p>
                            <Command class="rounded-lg border">
                                <CommandInput aria-label="Cari status" placeholder="Cari status…" />
                                <CommandList>
                                    <CommandEmpty>Tidak ada status.</CommandEmpty>
                                    <CommandGroup heading="Pilih Status">
                                        <CommandItem
                                            v-for="st in statusOptions"
                                            :key="st.id"
                                            :value="st.nama"
                                            :class="[
                                                'cursor-pointer',
                                                'bg-white! text-gray-900!',
                                                selectedStatus === st.id ? '!bg-crusoe-400 !text-white' : '',
                                            ]"
                                            @select="() => void toggleStatus(st.id)"
                                        >
                                            <span>{{ st.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedStatus === st.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                    </div>
                </div>

                <Command class="rounded-lg border shadow-md lg:flex-1">
                    <CommandInput aria-label="Cari pengiriman" placeholder="Cari pengiriman (UID / UnitRawat / NAN / Lokasi)…" />
                    <CommandList>
                        <CommandEmpty>Tidak ada data.</CommandEmpty>
                        <CommandGroup v-if="isLoadingItems" heading="Memuat Data">
                            <CommandItem value="loading" disabled>
                                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                Memuat data pengiriman…
                            </CommandItem>
                        </CommandGroup>
                        <CommandGroup v-else heading="Daftar Pengiriman">
                            <CommandItem
                                v-for="item in items"
                                :key="item.id"
                                :value="item.label"
                                :class="[
                                    'cursor-pointer',
                                    'bg-white! text-gray-900!', // ← force default, override shadcn
                                    selectedPengirimanId === item.id ? '!bg-crusoe-400 !text-white' : '',
                                ]"
                                @select="() => void onSelectPengiriman(item)"
                            >
                                <div class="flex w-full items-start justify-between gap-3">
                                    <div class="min-w-0">
                                        <div class="truncate text-sm font-medium">
                                            {{ item.uid }} - {{ item.unit_rawat }}
                                        </div>
                                        <div class="text-muted-foreground mt-1 text-xs">
                                            Lokasi terakhir: {{ item.lokasiTerakhir || '-' }}
                                        </div>
                                        <div class="text-muted-foreground mt-1 text-xs">
                                            Terakhir diperbarui: {{ item.updatedAt ? formatDateShort(item.updatedAt) : '-' }}
                                        </div>
                                    </div>
                                    <Badge
                                        class="shrink-0"
                                        :class="[
                                            item.status === 9 ? 'bg-red-500 text-white hover:bg-red-500'
                                            : item.status === 4 ? 'bg-green-500 text-white hover:bg-green-500'
                                            : item.status === 3 ? 'bg-amber-500 text-white hover:bg-amber-500'
                                            : item.status === 2 ? 'bg-blue-500 text-white hover:bg-blue-500'
                                            : 'bg-gray-500 text-white hover:bg-gray-500',
                                        ]"
                                    >
                                        {{ item.statusLabel }}
                                    </Badge>
                                </div>
                                <Check class="ml-auto h-4 w-4" :class="selectedPengirimanId === item.id ? 'opacity-100' : 'opacity-0'" />
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>

            <div class="flex flex-col lg:col-span-3">
                <Transition
                    enter-active-class="transition-opacity transition-transform duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-opacity transition-transform duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2"
                    mode="out-in"
                >
                    <div v-if="selectedPengirimanId" class="bg-background rounded-lg border">
                        <div v-if="isLoadingDetail" class="flex min-h-112 items-center justify-center p-6">
                            <div class="text-muted-foreground flex items-center gap-3 text-sm">
                                <Loader2 class="h-5 w-5 animate-spin" />
                                Memuat detail monitoring pengiriman…
                            </div>
                        </div>

                        <div v-else-if="monitoringItem">
                            <div class="mb-6 p-4 pb-0">
                                <Stepper class="flex w-full items-center gap-2">
                                    <StepperItem
                                        v-for="item in statusSteps"
                                        :key="item.step"
                                        :step="item.step"
                                        class="relative flex w-full flex-col items-center justify-center"
                                    >
                                        <StepperTrigger :disabled="item.step !== getCurrentStepIndex + 1">
                                            <StepperIndicator :class="['rounded-full', getStepIndicatorClass(item)]">
                                                <component :is="item.icon" class="h-5 w-5" />
                                            </StepperIndicator>
                                        </StepperTrigger>
                                        <StepperSeparator
                                            v-if="item.step !== statusSteps[statusSteps.length - 1]?.step"
                                            :class="[
                                                'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full',
                                                getStepSeparatorClass(item),
                                            ]"
                                        />
                                        <div class="flex flex-col items-center gap-1">
                                            <StepperTitle class="text-center text-xs font-medium">{{ item.title }}</StepperTitle>
                                            <StepperDescription class="text-center text-xs">{{ item.description }}</StepperDescription>
                                        </div>
                                    </StepperItem>
                                </Stepper>
                            </div>

                            <div class="space-y-4 p-4">
                                <!-- <ScrollArea class="flex h-100"> -->
                                <div class="space-y-3 pe-3">
                                    <div class="rounded-lg border p-4">
                                        <h3 class="mb-3 text-sm font-semibold">Posisi Pengiriman Saat Ini</h3>
                                        <div class="space-y-2">
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Box UID</span>
                                                <span class="text-right font-medium">{{ monitoringItem.uid }}</span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                                <Badge :class="['capitalize', statusBadgeClass]">{{ monitoringItem.statusLabel }}</Badge>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Lokasi Terakhir</span>
                                                <span class="text-right font-medium">{{ monitoringHistory[0]?.lokasi ?? '-' }}</span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat Penerima</span>
                                                <span class="text-right font-medium">{{ monitoringItem.unit_rawat }}</span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Nomor Alokasi</span>
                                                <span class="text-right font-medium">{{ monitoringItem.nan }}</span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Periode Alokasi</span>
                                                <span class="text-right font-medium">{{ monitoringItem.periode }}</span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Dibuat Oleh</span>
                                                <span class="text-right font-medium">{{ monitoringItem.createdBy }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-lg border p-4">
                                        <h3 class="mb-3 text-sm font-semibold">Riwayat Waktu</h3>
                                        <div class="space-y-2">
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Dibuat</span>
                                                <span class="text-right text-sm">
                                                    {{ monitoringItem.createdAt ? formatDateShort(monitoringItem.createdAt) : '-' }}
                                                </span>
                                            </div>
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Diperbarui</span>
                                                <span class="text-right text-sm font-medium">
                                                    {{ monitoringItem.updatedAt ? formatDateShort(monitoringItem.updatedAt) : '-' }}
                                                </span>
                                            </div>

                                            <!-- <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Catatan</span>
                                                <span class="text-right text-sm">
                                                    {{ monitoringItem.note }}
                                                </span>
                                            </div> -->
                                        </div>
                                    </div>

                                    <div class="rounded-lg border p-4">
                                        <h3 class="mb-3 text-sm font-semibold">Riwayat Pergerakan (Siapa & Kapan)</h3>
                                        <div v-if="monitoringHistory.length > 0" class="space-y-2">
                                            <div
                                                class="bg-muted/30 grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-xs font-semibold tracking-wide uppercase"
                                            >
                                                <span class="col-span-3">Waktu</span>
                                                <span class="col-span-3">Status</span>
                                                <span class="col-span-3">Lokasi</span>
                                                <span class="col-span-3">Petugas/Validator</span>
                                            </div>
                                            <div class="space-y-3 rounded-md border px-3 py-2 text-sm">
                                                <div
                                                    v-for="(eventItem, index) in monitoringHistory"
                                                    :key="`${eventItem.uid}-${eventItem.createdAt}-${eventItem.status}-${index}`"
                                                    :class="[
                                                        'grid grid-cols-12 gap-x-2 gap-y-3',
                                                        index > 0 ? 'text-gray-400 dark:text-gray-500' : '',
                                                    ]"
                                                >
                                                    <span
                                                        :class="['col-span-3 space-y-2', { 'font-medium': index <= 0 }, { 'font-light': index > 0 }]"
                                                    >
                                                        {{ eventItem.createdAt ? formatDateShort(eventItem.createdAt) : '-' }}
                                                    </span>
                                                    <span :class="['col-span-3', { 'font-medium': index <= 0 }, { 'font-light': index > 0 }]">{{
                                                        eventItem.statusLabel
                                                    }}</span>
                                                    <span :class="['col-span-3', { 'font-medium': index <= 0 }, { 'font-light': index > 0 }]">{{
                                                        eventItem.lokasi
                                                    }}</span>
                                                    <span :class="['col-span-3', { 'font-medium': index <= 0 }, { 'font-light': index > 0 }]">{{
                                                        eventItem.validator || '-'
                                                    }}</span>
                                                    <span
                                                        v-if="eventItem.note"
                                                        class="col-span-12 -mt-2 text-xs text-gray-500 dark:text-gray-400"
                                                    >
                                                        Catatan: {{ eventItem.note }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p v-else class="text-sm text-gray-400 italic">Belum ada riwayat event pengiriman.</p>
                                    </div>
                                </div>
                                <!-- </ScrollArea> -->
                            </div>
                        </div>

                        <div v-else class="flex min-h-112 items-center justify-center p-6">
                            <Empty class="gap-2 border-0 py-0">
                                <div class="max-w-md">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon" class="bg-secondary text-yellow-500">
                                            <Info />
                                        </EmptyMedia>
                                    </EmptyHeader>
                                    <EmptyTitle>Detail Monitoring Tidak Tersedia</EmptyTitle>
                                    <EmptyDescription>
                                        Data monitoring untuk pengiriman yang dipilih belum bisa dimuat. Coba pilih ulang data pengiriman lain.
                                    </EmptyDescription>
                                </div>
                            </Empty>
                        </div>
                    </div>

                    <div v-else>
                        <Empty class="flex-1 gap-2 border border-dashed py-50!">
                            <div class="w-100">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" class="bg-secondary text-yellow-500">
                                        <Info />
                                    </EmptyMedia>
                                </EmptyHeader>
                                <EmptyTitle>Tidak Ada Data</EmptyTitle>
                                <EmptyDescription>
                                    <span v-if="!selectedPeriodeId">
                                        Silahkan pilih periode terlebih dahulu, lalu pilih pengiriman yang ingin dipantau.
                                    </span>
                                    <span v-else>
                                        Belum terdapat data yang dipilih untuk ditampilkan. Silahkan pilih salah satu data pada daftar pengiriman.
                                    </span>
                                </EmptyDescription>
                            </div>
                        </Empty>
                    </div>
                </Transition>
            </div>
        </div>
    </PublicLayout>
</template>
