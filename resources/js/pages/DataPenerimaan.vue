<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { AgGridVue } from 'ag-grid-vue3';
import { CircleCheck, Funnel, FunnelX, Info, Loader2, Package, RotateCw, Truck, UserCheck } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import {
    components,
    createColumnDefs,
    defaultColDef,
    gridApi,
    onFirstDataRendered,
    onGridReady,
    onPaginationChanged,
    type GridApiWithAdvancedFilter,
    type RowPenerimaan,
} from '@/lib/libDataPenerimaan';
import { formatDate, isResponseSuccess } from '@/lib/libUtils';
import { dataPenerimaan, dataPenerimaanDetail } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const mode = useColorMode();

type MonitoringEventItem = {
    uid: string;
    status: number;
    statusLabel: string;
    lokasi: string;
    createdAt: string;
};

type MonitoringDetailRow = RowPenerimaan & {
    eventHistory?: MonitoringEventItem[];
};

const props = withDefaults(
    defineProps<{
        isAdmin?: boolean;
    }>(),
    {
        isAdmin: false,
    },
);

const isAdvancedFilterVisible = ref(false);
const isMonitoringOpen = ref(false);
const monitoringItem = ref<MonitoringDetailRow | null>(null);
const isLoadingDetail = ref(false);
const latestDetailRequestToken = ref(0);

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const statusSteps = [
    {
        step: 1,
        title: 'Initialized / Ready',
        description: 'Item dan box telah diregistrasi serta agregasi selesai',
        icon: Package,
        color: 'gray',
    },
    {
        step: 2,
        title: 'In Transit',
        description: 'Sedang dalam proses pengiriman melalui simpul gudang atau transit',
        icon: Truck,
        color: 'blue',
    },
    {
        step: 3,
        title: 'Arrived / Verified',
        description: 'Barang telah tiba di unit_rawat dan diverifikasi melalui proses rekonsiliasi',
        icon: CircleCheck,
        color: 'amber',
    },
    {
        step: 4,
        title: 'Delivered PoD',
        description: 'Barang telah diterima nakes dan Proof of Delivery tercatat',
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

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Penerimaan & Pencocokan', href: '' },
        { label: 'Data Penerimaan', href: dataPenerimaan.url() },
    ];

    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.42 } });
});

const onClickRefresh = (): void => {
    gridApi.value?.refreshServerSide({ purge: true });
};

const onClickToggleFilter = (): void => {
    const api = gridApi.value;

    if (!api) {
        return;
    }

    const nextState = !isAdvancedFilterVisible.value;
    isAdvancedFilterVisible.value = nextState;
    api.setGridOption('enableAdvancedFilter', nextState);

    if (!nextState) {
        const advancedFilterApi = api as GridApiWithAdvancedFilter<RowPenerimaan>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};

const loadMonitoringDetail = async (id: number): Promise<void> => {
    const requestToken = latestDetailRequestToken.value + 1;
    latestDetailRequestToken.value = requestToken;
    isLoadingDetail.value = true;
    monitoringItem.value = null;

    try {
        const response = await axiosJS.post(dataPenerimaanDetail.url(), { id }, { encrypt: true });

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

const onInfoRow = async (row: RowPenerimaan): Promise<void> => {
    isMonitoringOpen.value = true;
    await loadMonitoringDetail(row.id);
};

const columnDefs = createColumnDefs((row) => {
    void onInfoRow(row);
}, props.isAdmin);
</script>

<template>
    <PublicLayout
        title="Data Penerimaan"
        page-title="Data Penerimaan"
        page-sub-title="Riwayat penerimaan pengiriman berdasarkan role dan unit_rawat pengguna"
    >
        <div class="flex flex-1 justify-end">
            <ButtonGroup class="mb-4">
                <Button variant="outline" size="sm" class="text-gray-600 dark:text-gray-500 dark:hover:text-white" @click="onClickRefresh">
                    <RotateCw />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    :class="[
                        'text-gray-600 dark:text-gray-500 dark:hover:text-white',
                        { 'border-orange-300 bg-orange-400 text-white hover:bg-orange-500 hover:text-white': isAdvancedFilterVisible },
                    ]"
                    @click="onClickToggleFilter"
                >
                    <div v-if="isAdvancedFilterVisible">
                        <FunnelX />
                    </div>
                    <div v-else>
                        <Funnel />
                    </div>
                </Button>
            </ButtonGroup>
        </div>

        <div class="relative mb-5 h-130 w-full rounded-md">
            <AgGridVue
                :suppress-drag-leave-hides-columns="true"
                :row-height="35"
                :enable-advanced-filter="isAdvancedFilterVisible"
                :column-defs="columnDefs"
                :default-col-def="defaultColDef"
                :components="components"
                :loading-overlay-component="CustomLoadingOverlay"
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data penerimaan...' }"
                row-model-type="serverSide"
                :locale-text="AG_GRID_LOCALE_ID"
                :row-selection="{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }"
                :get-row-id="(params: any) => String(params.data.id)"
                :suppress-cell-focus="true"
                :theme="currentGridTheme"
                :pagination="true"
                :pagination-page-size="10"
                :pagination-page-size-selector="[10, 20, 50, 100]"
                :pagination-auto-page-size="false"
                :cache-block-size="10"
                style="width: 100%; height: 100%"
                @grid-ready="onGridReady"
                @first-data-rendered="onFirstDataRendered"
                @pagination-changed="onPaginationChanged"
            />
        </div>

        <Drawer v-model:open="isMonitoringOpen">
            <DrawerContent>
                <div class="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <DrawerTitle v-if="monitoringItem">Informasi Penerimaan - {{ monitoringItem.uid }}</DrawerTitle>
                        <DrawerTitle v-else>Informasi Penerimaan</DrawerTitle>
                        <DrawerDescription>Detail status dan riwayat penerimaan pengiriman</DrawerDescription>
                    </DrawerHeader>

                    <div v-if="isLoadingDetail" class="flex min-h-80 items-center justify-center p-6">
                        <div class="text-muted-foreground flex items-center gap-3 text-sm">
                            <Loader2 class="h-5 w-5 animate-spin" />
                            Memuat detail data penerimaan...
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
                            <ScrollArea class="flex h-100">
                                <div class="w-full space-y-3 pe-3">
                                    <div class="rounded-lg border p-4">
                                        <h3 class="mb-3 text-sm font-semibold">Status Penerimaan</h3>
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
                                            <div class="flex items-center justify-between gap-4">
                                                <span class="text-sm text-gray-600 dark:text-gray-400">Update Terakhir</span>
                                                <span class="text-right text-sm">{{ formatDate(monitoringItem.updatedAt, true) }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-lg border p-4">
                                        <h3 class="mb-3 text-sm font-semibold">Riwayat Event</h3>
                                        <div v-if="monitoringHistory.length" class="space-y-2">
                                            <div
                                                v-for="(eventItem, index) in monitoringHistory"
                                                :key="`${eventItem.uid}-${eventItem.status}-${index}`"
                                                class="rounded-md border border-gray-200 p-3 dark:border-gray-700"
                                            >
                                                <div class="mb-1 flex items-center justify-between gap-2">
                                                    <span class="text-sm font-semibold">{{ eventItem.statusLabel }}</span>
                                                    <span class="text-xs text-gray-500 dark:text-gray-400">{{
                                                        formatDate(eventItem.createdAt, true)
                                                    }}</span>
                                                </div>
                                                <p class="text-xs text-gray-600 dark:text-gray-300">Lokasi: {{ eventItem.lokasi }}</p>
                                            </div>
                                        </div>
                                        <div v-else class="text-sm text-gray-500 dark:text-gray-400">Belum ada riwayat event.</div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <div v-else class="p-4 pt-0">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Info />
                                </EmptyMedia>
                                <EmptyTitle>Data tidak ditemukan</EmptyTitle>
                                <EmptyDescription>Detail data penerimaan belum tersedia untuk dipilih.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </div>

                    <DrawerFooter />
                </div>
            </DrawerContent>
        </Drawer>
    </PublicLayout>
</template>
