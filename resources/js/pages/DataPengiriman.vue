<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { AgGridVue } from 'ag-grid-vue3';
import { CircleCheck, Funnel, FunnelX, Package, RotateCw, Truck, UserCheck } from 'lucide-vue-next';
import { push } from 'notivue';
import { DrawerClose } from 'vaul-vue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import {
    components,
    createColumnDefs,
    defaultColDef,
    deleteSelectedRow,
    gridApi,
    onFirstDataRendered,
    onGridReady,
    onPaginationChanged,
    type GridApiWithAdvancedFilter,
    type RowPengiriman,
} from '@/lib/libDataPengiriman';
import { formatDate } from '@/lib/libUtils';
import { dataPengiriman, dataPengirimanDelete } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const auth = usePermissionStore();
const mode = useColorMode();

const isOpen = ref(false);
const selectedItem = ref<RowPengiriman | null>(null);
const msgdialog = ref<string | ''>('');
const isLoading = ref(false);

const isMonitoringOpen = ref(false);
const monitoringItem = ref<RowPengiriman | null>(null);

const isAdvancedFilterVisible = ref(false);

const statusSteps = [
    {
        step: 1,
        code: 'S1',
        title: 'Initialized / Ready',
        description: 'Item dan box telah diregistrasi serta agregasi selesai',
        icon: Package,
        color: 'gray',
        state: 'current',
    },
    {
        step: 2,
        code: 'S2',
        title: 'In Transit',
        description: 'Sedang dalam proses pengiriman melalui simpul gudang atau transit',
        icon: Truck,
        color: 'blue',
        state: 'pending',
    },
    {
        step: 3,
        code: 'S3',
        title: 'Arrived / Verified',
        description: 'Barang telah tiba di unit_rawat dan diverifikasi melalui proses rekonsiliasi',
        icon: CircleCheck,
        color: 'amber',
        state: 'pending',
    },
    {
        step: 4,
        code: 'S4',
        title: 'Delivered PoD',
        description: 'Barang telah diterima nakes dan Proof of Delivery tercatat',
        icon: UserCheck,
        color: 'green',
        state: 'pending',
    },
];

const getCurrentStepIndex = computed(() => {
    if (!monitoringItem.value) return 0;
    const status = monitoringItem.value.status;
    if (status === 9) return -1; // Returned - no step highlighted
    return Math.max(0, status - 1);
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
    const nextStep = statusSteps[step.step];
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

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Pengiriman Barang', href: '' },
        { label: 'Daftar Pengiriman', href: dataPengiriman.url() },
    ];

    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.32 } });
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
        const advancedFilterApi = api as GridApiWithAdvancedFilter<RowPengiriman>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};

const onInfoRow = (row: RowPengiriman): void => {
    monitoringItem.value = row;
    isMonitoringOpen.value = true;
};

const onDeleteRow = (row: RowPengiriman): void => {
    if (!auth.can('menu.pengiriman.hapus')) {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini.',
        });
        return;
    }

    selectedItem.value = row;
    isOpen.value = true;
    msgdialog.value = `Hapus data pengiriman dengan UID <span class='font-semibold'>${row.uid}</span>.<br />
    Tindakan ini akan menghapus data pengiriman beserta histori monitoring. Lanjutkan hanya jika Anda yakin.`;
};

const handleDeletePengiriman = async (): Promise<void> => {
    if (isLoading.value || !selectedItem.value) {
        return;
    }

    isLoading.value = true;

    try {
        const response = await axiosJS.post(dataPengirimanDelete.url(), { id: selectedItem.value.id }, { encrypt: true });

        const payload = response.data ?? {};

        if (payload.status === true || payload.status === 1 || payload.status === '1' || payload.status === 'true') {
            push.success({
                title: 'Berhasil',
                message: payload.message ?? 'Data pengiriman berhasil dihapus.',
            });
            deleteSelectedRow(selectedItem.value);
        } else {
            push.error({
                title: 'Gagal',
                message: payload.message ?? 'Gagal menghapus data pengiriman.',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan coba beberapa saat lagi.',
        });
    } finally {
        isLoading.value = false;
        isOpen.value = false;
        selectedItem.value = null;
    }
};

const columnDefs = createColumnDefs(onInfoRow, onDeleteRow);
</script>

<template>
    <PublicLayout title="Daftar Pengiriman" page-title="Daftar Pengiriman" page-sub-title="Pemantauan status dan riwayat pengiriman barang">
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
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data pengiriman...' }"
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
            <ModalDialog v-model:open="isOpen" :item="selectedItem" :loading="isLoading" :description="msgdialog" @confirm="handleDeletePengiriman" />
        </div>

        <Drawer v-model:open="isMonitoringOpen">
            <DrawerContent>
                <div class="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <DrawerTitle v-if="monitoringItem">Monitoring Distribusi - {{ monitoringItem.uid }}</DrawerTitle>
                        <DrawerDescription>Informasi detail status dan riwayat pengiriman</DrawerDescription>
                    </DrawerHeader>

                    <!-- Status Stepper -->
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
                                    <StepperTitle class="text-xs font-medium">{{ item.title }}</StepperTitle>
                                    <StepperDescription class="text-center text-xs">{{ item.description }}</StepperDescription>
                                </div>
                            </StepperItem>
                        </Stepper>
                    </div>

                    <!-- Monitoring Information -->
                    <div class="space-y-4 p-4">
                        <ScrollArea class="flex h-100">
                            <div class="space-y-3 pe-3">
                                <!-- Status Section -->
                                <div class="rounded-lg border p-4">
                                    <h3 class="mb-3 text-sm font-semibold">Status Pengiriman</h3>
                                    <div v-if="monitoringItem" class="space-y-2">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Box UID</span>
                                            <span class="font-medium">{{ monitoringItem.uid }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                            <Badge :class="['capitalize', statusBadgeClass]">{{ monitoringItem.statusLabel }}</Badge>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat Penerima</span>
                                            <span class="font-medium">{{ monitoringItem.unit_rawat }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Nomor Alokasi</span>
                                            <span class="font-medium">{{ monitoringItem.nan }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Periode Alokasi</span>
                                            <span class="font-medium">{{ monitoringItem.periode }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Timeline Section -->
                                <div class="rounded-lg border p-4">
                                    <h3 class="mb-3 text-sm font-semibold">Riwayat Waktu</h3>
                                    <div v-if="monitoringItem" class="space-y-2">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Dibuat</span>
                                            <span class="text-sm">{{
                                                monitoringItem.createdAt ? formatDate(monitoringItem.createdAt, true) : '-'
                                            }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 dark:text-gray-400">Diperbarui</span>
                                            <span class="text-sm font-medium">{{
                                                monitoringItem.updatedAt ? formatDate(monitoringItem.updatedAt, true) : '-'
                                            }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Notes Section -->
                                <div class="rounded-lg border p-4">
                                    <h3 class="mb-3 text-sm font-semibold">Catatan</h3>
                                    <div v-if="monitoringItem" class="text-sm">
                                        <p v-if="monitoringItem.note" class="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                            {{ monitoringItem.note }}
                                        </p>
                                        <p v-else class="text-gray-400 italic">Tidak ada catatan</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <DrawerFooter>
                        <DrawerClose as-child>
                            <Button variant="outline"> Tutup </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </PublicLayout>
</template>
