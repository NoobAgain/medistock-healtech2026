<script setup lang="ts">
import { Check, Loader2, Lock, ScrollText, ShieldCheck, UserCheck } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { formatDateShort, isResponseSuccess } from '@/lib/libUtils';
import {
    monitoringAlokasiDetail,
    monitoringAlokasiListnan,
    monitoringAlokasiPeriodeOptions,
    monitoringAlokasiSatuanIndukOptions,
    monitoringAlokasiSatuanBawahOptions,
    monitoringAlokasiSummary,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();

type PeriodeItem = {
    id: number;
    nama: string;
};

type SummaryRow = {
    unit_rawatId: number;
    unit_rawatNama: string;
    totalPengajuan: number;
    open: number;
    acc: number;
    acc2: number;
    lock: number;
    terakhirDiperbarui: string;
};

type NanItem = {
    id: number;
    nan: string;
    unit_rawatId: number;
    unit_rawat: string;
    status: string; // 1 / 100 / 110 / 2(lock)
    label: string;
};

type HistoryRow = {
    id: number;
    validator: string;
    lokasi: string;
    dari: string;
    ke: string;
    keterangan: string;
    waktu: string;
};

type MonitoringDetail = {
    id: number;
    nan: string;
    periode: string;
    unit_rawat: string;
    createdBy: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    history: HistoryRow[];
};

const periodeItems = ref<PeriodeItem[]>([]);
const selectedPeriodeId = ref<number | null>(null);
const isLoadingPeriode = ref(false);

const summaryRows = ref<SummaryRow[]>([]);
const isLoadingSummary = ref(false);

const unit_rawatIndukItems = ref<Array<{ id: number; nama: string }>>([]);
const selectedUnitRawatIndukId = ref<number | null>(null);
const isLoadingUnitRawatInduk = ref(false);

const unit_rawatBawahItems = ref<Array<{ id: number; nama: string }>>([]);
const selectedUnitRawatId = ref<number | null>(null);
const isLoadingUnitRawatBawah = ref(false);

const nanItems = ref<NanItem[]>([]);
const isLoadingNan = ref(false);

const selectedAlokasiId = ref<number | null>(null);
const detailItem = ref<MonitoringDetail | null>(null);
const isLoadingDetail = ref(false);
const latestDetailRequestToken = ref(0);

const statusSteps = [
    {
        step: 1,
        title: 'Menunggu Validasi',
        description: 'Pengajuan belum diproses',
        icon: ScrollText,
        color: 'gray',
    },
    {
        step: 2,
        title: 'Disetujui UnitRawat Induk',
        description: 'Persetujuan tingkat unit_rawat induk',
        icon: ShieldCheck,
        color: 'amber',
    },
    {
        step: 3,
        title: 'Disetujui Pusbekangad',
        description: 'Persetujuan tingkat Pusbekangad',
        icon: UserCheck,
        color: 'blue',
    },
    {
        step: 4,
        title: 'Validasi Berhasil',
        description: 'Data sudah final (terkunci)',
        icon: Lock,
        color: 'green',
    },
] as const;

const getCurrentStepIndex = computed(() => {
    const status = String(detailItem.value?.status ?? '');
    if (status === '2') return 3; // LOCK
    if (status === '110') return 2;
    if (status === '100') return 1;
    return 0; // default OPEN
});

const stepIndicatorColorMap: Record<string, string> = {
    gray: 'bg-gray-500 text-white',
    amber: 'bg-amber-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
};

const stepSeparatorColorMap: Record<string, string> = {
    gray: 'bg-gray-400',
    amber: 'bg-amber-400',
    blue: 'bg-blue-400',
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

const statusLabel = computed(() => {
    const status = String(detailItem.value?.status ?? '');
    if (status === '2') return 'Validasi Berhasil';
    if (status === '110') return 'Disetujui Pusbekangad';
    if (status === '100') return 'Disetujui UnitRawat Induk';
    return 'Menunggu Validasi';
});

const statusBadgeClass = computed(() => {
    const status = String(detailItem.value?.status ?? '');
    if (status === '2') return 'bg-green-600 text-white hover:bg-green-600';
    if (status === '110') return 'bg-blue-500 text-white hover:bg-blue-500';
    if (status === '100') return 'bg-amber-500 text-white hover:bg-amber-500';
    return 'bg-gray-500 text-white hover:bg-gray-500';
});

const filteredNanItems = computed(() => {
    if (selectedUnitRawatId.value) {
        return nanItems.value.filter((row) => row.unit_rawatId === selectedUnitRawatId.value);
    }
    if (selectedUnitRawatIndukId.value) {
        // listNan sudah bisa difilter dari BE, tapi ini tetap menjaga UX bila data campur.
        return nanItems.value;
    }
    return nanItems.value;
});

const hasAppliedQuery = ref(false);
const initialQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const qPeriodeId = initialQuery ? Number(initialQuery.get('periode_id') ?? 0) : 0;
const qUnitRawatIndukId = initialQuery ? Number(initialQuery.get('unit_rawat_induk_id') ?? 0) : 0;
const qUnitRawatId = initialQuery ? Number(initialQuery.get('unit_rawat_id') ?? 0) : 0;

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Master Data', href: '' },
        { label: 'Pemantauan Pengajuan Alokasi', href: '' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.11 } });

    void loadPeriodeOptions();
});

const applyQueryIfAny = async (): Promise<void> => {
    if (hasAppliedQuery.value) return;
    if (!qPeriodeId) return;

    const periode = periodeItems.value.find((p) => p.id === qPeriodeId);
    if (!periode) return;

    hasAppliedQuery.value = true;

    await onSelectPeriode(periode);

    if (qUnitRawatIndukId > 0) {
        selectedUnitRawatIndukId.value = qUnitRawatIndukId;
        await loadUnitRawatBawahOptions();
    }
    if (qUnitRawatId > 0) {
        selectedUnitRawatId.value = qUnitRawatId;
    }

    // Muat daftar pengajuan sesuai filter awal
    await loadNanList();
};

const loadPeriodeOptions = async (): Promise<void> => {
    isLoadingPeriode.value = true;
    try {
        const response = await axiosJS.post(monitoringAlokasiPeriodeOptions.url(), {}, { encrypt: true });
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

    void applyQueryIfAny();
};

const onSelectPeriode = async (periode: PeriodeItem): Promise<void> => {
    if (selectedPeriodeId.value === periode.id) {
        selectedPeriodeId.value = null;
        selectedUnitRawatIndukId.value = null;
        selectedUnitRawatId.value = null;
        summaryRows.value = [];
        unit_rawatIndukItems.value = [];
        unit_rawatBawahItems.value = [];
        nanItems.value = [];
        selectedAlokasiId.value = null;
        detailItem.value = null;
        latestDetailRequestToken.value += 1;
        return;
    }

    selectedPeriodeId.value = periode.id;
    selectedUnitRawatIndukId.value = null;
    selectedUnitRawatId.value = null;
    selectedAlokasiId.value = null;
    detailItem.value = null;
    latestDetailRequestToken.value += 1;

    await Promise.all([loadSummary(), loadUnitRawatIndukOptions()]);
};

const loadSummary = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    isLoadingSummary.value = true;
    try {
        const response = await axiosJS.post(
            monitoringAlokasiSummary.url(),
            { periode_id: selectedPeriodeId.value },
            { encrypt: true },
        );
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status)) {
            summaryRows.value = [];
            return;
        }
        summaryRows.value = (Array.isArray(payload.data) ? payload.data : []) as SummaryRow[];
    } catch (e) {
        console.error(e);
        summaryRows.value = [];
    } finally {
        isLoadingSummary.value = false;
    }
};

const loadUnitRawatIndukOptions = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    isLoadingUnitRawatInduk.value = true;
    try {
        const response = await axiosJS.post(
            monitoringAlokasiSatuanIndukOptions.url(),
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
            monitoringAlokasiSatuanBawahOptions.url(),
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

const loadNanList = async (): Promise<void> => {
    if (!selectedPeriodeId.value) return;
    isLoadingNan.value = true;
    try {
        const payloadReq: Record<string, unknown> = { periode_id: selectedPeriodeId.value };
        if (selectedUnitRawatId.value) payloadReq.unit_rawat_id = selectedUnitRawatId.value;
        else if (selectedUnitRawatIndukId.value) payloadReq.unit_rawat_induk_id = selectedUnitRawatIndukId.value;

        const response = await axiosJS.post(
            monitoringAlokasiListnan.url(),
            payloadReq,
            { encrypt: true },
        );
        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status)) {
            nanItems.value = [];
            return;
        }
        const rows = Array.isArray(payload.data) ? payload.data : [];
        nanItems.value = rows
            .map((row: Record<string, unknown>) => ({
                id: Number(row.id ?? 0),
                nan: String(row.nan ?? '-'),
                unit_rawatId: Number(row.unit_rawatId ?? 0),
                unit_rawat: String(row.unit_rawat ?? '-'),
                status: String(row.status ?? ''),
                label: String(row.label ?? '-'),
            }))
            .filter((row) => Number.isFinite(row.id) && row.id > 0);
    } catch (e) {
        console.error(e);
        nanItems.value = [];
    } finally {
        isLoadingNan.value = false;
    }
};

const toggleUnitRawatFilter = (unit_rawatId: number): void => {
    selectedUnitRawatId.value = selectedUnitRawatId.value === unit_rawatId ? null : unit_rawatId;
    selectedAlokasiId.value = null;
    detailItem.value = null;
    latestDetailRequestToken.value += 1;
};

const toggleUnitRawatIndukFilter = (indukId: number): void => {
    selectedUnitRawatIndukId.value = selectedUnitRawatIndukId.value === indukId ? null : indukId;
    selectedUnitRawatId.value = null;
    unit_rawatBawahItems.value = [];
    nanItems.value = [];
    selectedAlokasiId.value = null;
    detailItem.value = null;
    latestDetailRequestToken.value += 1;

    if (selectedUnitRawatIndukId.value) {
        void loadUnitRawatBawahOptions().then(() => loadNanList());
    }
};

const toggleUnitRawatBawahFilter = (unit_rawatId: number): void => {
    selectedUnitRawatId.value = selectedUnitRawatId.value === unit_rawatId ? null : unit_rawatId;
    nanItems.value = [];
    selectedAlokasiId.value = null;
    detailItem.value = null;
    latestDetailRequestToken.value += 1;

    if (selectedUnitRawatId.value || selectedUnitRawatIndukId.value) {
        void loadNanList();
    }
};

const onSelectUnitRawat = (row: SummaryRow): void => {
    // klik ringkasan UnitRawat Induk
    if (selectedUnitRawatIndukId.value === row.unit_rawatId) {
        selectedUnitRawatIndukId.value = null;
        selectedUnitRawatId.value = null;
        unit_rawatBawahItems.value = [];
        nanItems.value = [];
        selectedAlokasiId.value = null;
        detailItem.value = null;
        latestDetailRequestToken.value += 1;
        return;
    }
    selectedUnitRawatIndukId.value = row.unit_rawatId;
    selectedUnitRawatId.value = null;
    unit_rawatBawahItems.value = [];
    selectedAlokasiId.value = null;
    detailItem.value = null;
    latestDetailRequestToken.value += 1;

    void loadUnitRawatBawahOptions().then(() => loadNanList());
};

const onSelectNan = async (item: NanItem): Promise<void> => {
    if (selectedAlokasiId.value === item.id) {
        selectedAlokasiId.value = null;
        detailItem.value = null;
        latestDetailRequestToken.value += 1;
        return;
    }

    selectedAlokasiId.value = item.id;
    await loadDetail(item.id);
};

const loadDetail = async (id: number): Promise<void> => {
    const requestToken = latestDetailRequestToken.value + 1;
    latestDetailRequestToken.value = requestToken;
    isLoadingDetail.value = true;
    detailItem.value = null;

    try {
        const response = await axiosJS.post(monitoringAlokasiDetail.url(), { id }, { encrypt: true });
        if (requestToken !== latestDetailRequestToken.value) return;

        const payload = response.data ?? {};
        if (!isResponseSuccess(payload.status) || !payload.data || typeof payload.data !== 'object') {
            detailItem.value = null;
            return;
        }
        detailItem.value = payload.data as MonitoringDetail;
    } catch (e) {
        console.error(e);
        if (requestToken === latestDetailRequestToken.value) {
            detailItem.value = null;
        }
    } finally {
        if (requestToken === latestDetailRequestToken.value) {
            isLoadingDetail.value = false;
        }
    }
};
</script>

<template>
    <PublicLayout
        title="Pemantauan Pengajuan Alokasi"
        page-title="Pemantauan Pengajuan Alokasi"
        page-sub-title="Memantau proses pengajuan dari unit_rawat hingga persetujuan Pusbekangad (Menunggu → Disetujui UnitRawat Induk → Disetujui Pusbekangad → Validasi Berhasil)"
    >
        <div class="grid gap-4 lg:grid-cols-12">
            <!-- Periode selector (wajib) + Rekap -->
            <div class="flex flex-col gap-4 lg:col-span-5">
                <div class="bg-background rounded-lg border p-4">
                    <h3 class="mb-2 text-sm font-semibold">1) Pilih Periode</h3>
                    <Command class="rounded-lg border">
                        <CommandInput placeholder="Cari periode..." />
                        <CommandList>
                            <CommandEmpty>Tidak ada periode.</CommandEmpty>
                            <CommandGroup v-if="isLoadingPeriode" heading="Memuat Periode">
                                <CommandItem value="loading" disabled>
                                    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                    Memuat periode...
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
                    <p class="text-muted-foreground mt-2 text-xs">
                        Data rekap dan detail baru akan muncul setelah periode dipilih.
                    </p>
                </div>

                <div class="bg-background rounded-lg border p-4">
                    <h3 class="mb-3 text-sm font-semibold">2) Ringkasan Status per UnitRawat</h3>

                    <div v-if="!selectedPeriodeId" class="py-6">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>Pilih periode dulu</EmptyTitle>
                                <EmptyDescription>Rekap akan tampil setelah periode dipilih.</EmptyDescription>
                            </EmptyHeader>
                            <EmptyMedia />
                        </Empty>
                    </div>

                    <div v-else-if="isLoadingSummary" class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Loader2 class="h-5 w-5 animate-spin" />
                        Memuat rekap...
                    </div>

                    <div v-else class="overflow-auto">
                        <table class="w-full text-sm">
                            <thead class="text-muted-foreground border-b text-xs uppercase">
                                <tr>
                                    <th class="px-2 py-2 text-left">UnitRawat Induk</th>
                                    <th class="px-2 py-2 text-right">Total</th>
                                    <th class="px-2 py-2 text-right">Menunggu</th>
                                    <th class="px-2 py-2 text-right">Disetujui Induk</th>
                                    <th class="px-2 py-2 text-right">Disetujui Pusbekangad</th>
                                    <th class="px-2 py-2 text-right">Berhasil</th>
                                    <th class="px-2 py-2 text-right">Terakhir Diperbarui</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in summaryRows"
                                    :key="row.unit_rawatId"
                                    class="hover:bg-muted/30 cursor-pointer border-b last:border-b-0"
                                    :class="selectedUnitRawatIndukId === row.unit_rawatId ? 'bg-crusoe-50 dark:bg-white/5' : ''"
                                    @click="() => onSelectUnitRawat(row)"
                                >
                                    <td class="px-2 py-2 font-medium">{{ row.unit_rawatNama }}</td>
                                    <td class="px-2 py-2 text-right">{{ row.totalPengajuan }}</td>
                                    <td class="px-2 py-2 text-right">{{ row.open }}</td>
                                    <td class="px-2 py-2 text-right">{{ row.acc }}</td>
                                    <td class="px-2 py-2 text-right">{{ row.acc2 }}</td>
                                    <td class="px-2 py-2 text-right">{{ row.lock }}</td>
                                    <td class="px-2 py-2 text-right text-xs">
                                        {{ row.terakhirDiperbarui ? formatDateShort(row.terakhirDiperbarui) : '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="text-muted-foreground mt-2 text-xs">
                            Klik unit_rawat induk untuk menampilkan unit_rawat bawah dan daftar pengajuan.
                        </p>
                    </div>
                </div>
            </div>

            <!-- NAN list + Detail -->
            <div class="flex flex-col gap-4 lg:col-span-7">
                <div class="bg-background rounded-lg border p-4">
                    <h3 class="mb-2 text-sm font-semibold">3) Pilih Pengajuan</h3>
                    <div v-if="!selectedPeriodeId" class="py-6">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>Pilih periode dulu</EmptyTitle>
                                <EmptyDescription>Daftar pengajuan akan tampil setelah periode dipilih.</EmptyDescription>
                            </EmptyHeader>
                            <EmptyMedia />
                        </Empty>
                    </div>
                    <div v-else>
                        <div class="mb-3">
                            <p class="mb-2 text-sm font-medium">Pilih UnitRawat Induk</p>
                            <Command class="rounded-lg border">
                                <CommandInput placeholder="Cari unit_rawat induk..." />
                                <CommandList>
                                    <CommandEmpty>Tidak ada unit_rawat induk.</CommandEmpty>
                                    <CommandGroup v-if="isLoadingUnitRawatInduk" heading="Memuat unit_rawat induk">
                                        <CommandItem value="loading" disabled>
                                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                            Memuat unit_rawat induk...
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
                                            @select="() => toggleUnitRawatIndukFilter(s.id)"
                                        >
                                            <span>{{ s.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedUnitRawatIndukId === s.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>

                        <div class="mb-3">
                            <p class="mb-2 text-sm font-medium">Pilih UnitRawat Bawah</p>
                            <Command class="rounded-lg border">
                                <CommandInput placeholder="Cari unit_rawat bawah..." />
                                <CommandList>
                                    <CommandEmpty>Tidak ada unit_rawat bawah.</CommandEmpty>
                                    <CommandGroup v-if="!selectedUnitRawatIndukId" heading="Pilih unit_rawat induk dulu">
                                        <CommandItem value="info" disabled>
                                            Pilih unit_rawat induk terlebih dahulu.
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup v-else-if="isLoadingUnitRawatBawah" heading="Memuat unit_rawat bawah">
                                        <CommandItem value="loading" disabled>
                                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                            Memuat unit_rawat bawah...
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
                                            @select="() => toggleUnitRawatBawahFilter(s.id)"
                                        >
                                            <span>{{ s.nama }}</span>
                                            <Check class="ml-auto h-4 w-4" :class="selectedUnitRawatId === s.id ? 'opacity-100' : 'opacity-0'" />
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            <p class="text-muted-foreground mt-2 text-xs">
                                Catatan: “UnitRawat Induk” pada aplikasi ini mengikuti data induk yang tersimpan di data tenaga_medis.
                            </p>
                        </div>

                        <Command class="rounded-lg border">
                            <CommandInput placeholder="Cari pengajuan (NAN)..." />
                            <CommandList>
                                <CommandEmpty>Tidak ada data.</CommandEmpty>
                                <CommandGroup v-if="isLoadingNan" heading="Memuat pengajuan">
                                    <CommandItem value="loading" disabled>
                                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                        Memuat daftar pengajuan...
                                    </CommandItem>
                                </CommandGroup>
                                <CommandGroup v-else heading="Daftar Pengajuan (NAN)">
                                    <CommandItem
                                        v-for="item in filteredNanItems"
                                        :key="item.id"
                                        :value="item.label"
                                        :class="[
                                            'cursor-pointer',
                                            'bg-white! text-gray-900!',
                                            selectedAlokasiId === item.id ? '!bg-crusoe-400 !text-white' : '',
                                        ]"
                                        @select="() => void onSelectNan(item)"
                                    >
                                        <span>{{ item.label }}</span>
                                        <Check class="ml-auto h-4 w-4" :class="selectedAlokasiId === item.id ? 'opacity-100' : 'opacity-0'" />
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </div>

                <div class="bg-background rounded-lg border">
                    <div v-if="!selectedAlokasiId" class="p-6">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>Belum ada detail</EmptyTitle>
                                <EmptyDescription>Pilih pengajuan untuk melihat status dan riwayat persetujuan.</EmptyDescription>
                            </EmptyHeader>
                            <EmptyMedia />
                        </Empty>
                    </div>

                    <div v-else-if="isLoadingDetail" class="flex min-h-112 items-center justify-center p-6">
                        <div class="text-muted-foreground flex items-center gap-3 text-sm">
                            <Loader2 class="h-5 w-5 animate-spin" />
                            Memuat detail monitoring alokasi...
                        </div>
                    </div>

                    <div v-else-if="detailItem" class="p-4">
                        <div class="mb-6">
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

                        <div class="grid gap-4 lg:grid-cols-2">
                            <div class="rounded-lg border p-4">
                                <h3 class="mb-3 text-sm font-semibold">Posisi Pengajuan Saat Ini</h3>
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">NAN</span>
                                        <span class="text-right font-medium">{{ detailItem.nan }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                        <Badge :class="['capitalize', statusBadgeClass]">{{ statusLabel }}</Badge>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat</span>
                                        <span class="text-right font-medium">{{ detailItem.unit_rawat }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Periode</span>
                                        <span class="text-right font-medium">{{ detailItem.periode }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Pengusul</span>
                                        <span class="text-right font-medium">{{ detailItem.createdBy }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-lg border p-4">
                                <h3 class="mb-3 text-sm font-semibold">Waktu</h3>
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Dibuat</span>
                                        <span class="text-right text-sm">
                                            {{ detailItem.createdAt ? formatDateShort(detailItem.createdAt) : '-' }}
                                        </span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Diperbarui</span>
                                        <span class="text-right text-sm font-medium">
                                            {{ detailItem.updatedAt ? formatDateShort(detailItem.updatedAt) : '-' }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-lg border p-4 lg:col-span-2">
                                <h3 class="mb-3 text-sm font-semibold">Riwayat Persetujuan</h3>
                                <div v-if="detailItem.history?.length > 0" class="space-y-2">
                                    <div class="bg-muted/30 grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-xs font-semibold uppercase">
                                        <span class="col-span-3">Waktu</span>
                                        <span class="col-span-3">Validator</span>
                                        <span class="col-span-2">Lokasi</span>
                                        <span class="col-span-2">Dari</span>
                                        <span class="col-span-2">Ke</span>
                                    </div>
                                    <div
                                        v-for="row in detailItem.history"
                                        :key="row.id"
                                        class="grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-xs"
                                    >
                                        <span class="col-span-3">{{ row.waktu ? formatDateShort(row.waktu) : '-' }}</span>
                                        <span class="col-span-3">{{ row.validator }}</span>
                                        <span class="col-span-2">{{ row.lokasi }}</span>
                                        <span class="col-span-2">{{ row.dari }}</span>
                                        <span class="col-span-2">{{ row.ke }}</span>
                                        <span class="col-span-12 text-muted-foreground mt-1">{{ row.keterangan }}</span>
                                    </div>
                                </div>
                                <div v-else class="text-muted-foreground text-sm">
                                    Belum ada riwayat perubahan status yang tercatat pada audit log.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
</template>
