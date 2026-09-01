<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import { ModuleRegistry, PaginationModule, type ColDef, type IsRowMaster } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { CirclePlus, Funnel, FunnelX, RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import type { AlokasiRow, GridApiWithAdvancedFilter } from '@/lib/libDataAlokasi';
import { components, createColumnDefs, detailCellRendererParams, gridApi, onGridReady, onPaginationChanged } from '@/lib/libDataAlokasi';
import { dataAlokasi, dataAlokasiAcc, dataAlokasiAcc2, dataAlokasiBaru, dataAlokasiDestroy } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

ModuleRegistry.registerModules([PaginationModule]);

const layout = useLayoutStore();
const auth = usePermissionStore();
const isOpen = ref(false);
const selectedItem = ref<Record<string, any>>([]);
const selectedAction = ref<'delete' | 'acc' | 'acc2' | null>(null);
const msgdialog = ref<string | ''>();
const titleDialog = ref<string | ''>();
const confirmText = ref<string | ''>();
const isLoading = ref(false);

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Data Rencana Penyaluran', href: dataAlokasi.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.1 } });
});

/**
 * Button Action
 */
const newAlokasi = () => {
    router.visit(dataAlokasiBaru.url());
};

/**
 * GRID
 */
const isAdvancedFilterVisible = ref(false);

const isRowMaster = ref<IsRowMaster>((dataItem: AlokasiRow | undefined) => {
    return dataItem ? dataItem.details.length > 0 : false;
});

const mode = useColorMode();
const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const onEditRow = (row: Record<string, any>) => {
    if (auth.can('menu.alokasi.edit')) {
        router.visit(dataAlokasiBaru.url(), { data: { id: row.id } });
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini.',
        });
    }
};
const onDeleteRow = (row: Record<string, any>) => {
    if (auth.can('menu.alokasi.hapus')) {
        selectedAction.value = 'delete';
        selectedItem.value = row;
        isOpen.value = true;
        titleDialog.value = `Hapus Data Rencana Penyaluran ?`;
        msgdialog.value = `Hapus data alokasi dengan Nomor Alokasi <span class='font-semibold'>${row?.nan}</span>.<br />
        Tindakan ini akan menghapus data alokasi dari sistem. Lanjutkan hanya jika Anda
        yakin`;
        confirmText.value = `Hapus`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};
const onAcc = (row: Record<string, any>) => {
    if (auth.can('menu.alokasi.accrencana')) {
        selectedAction.value = 'acc';
        selectedItem.value = row;
        isOpen.value = true;

        titleDialog.value = `Setujui Rencana`;
        msgdialog.value = `Setujui Data Rencana Penyaluran ?`;
        confirmText.value = `Setujui`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};

const onAcc2 = (row: Record<string, any>) => {
    if (auth.can('menu.alokasi.accrencanapusat')) {
        selectedAction.value = 'acc2';
        selectedItem.value = row;
        isOpen.value = true;

        titleDialog.value = `Setujui Rencana (PUSAT)`;
        msgdialog.value = `Setujui Data Rencana Penyaluran ?`;
        confirmText.value = `Setujui`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};

const handleConfirmAction = async (): Promise<void> => {
    if (!selectedAction.value || !selectedItem.value?.id) {
        return;
    }

    try {
        isLoading.value = true;

        let response;
        if (selectedAction.value === 'delete') {
            response = await axiosJS.delete(dataAlokasiDestroy.url(selectedItem.value.id));
        } else if (selectedAction.value === 'acc2') {
            response = await axiosJS.post(dataAlokasiAcc2.url(selectedItem.value.id), {}, { encrypt: true });
        } else {
            response = await axiosJS.post(dataAlokasiAcc.url(selectedItem.value.id), {}, { encrypt: true });
        }

        if (response.data.status) {
            isOpen.value = false;
            push.success({
                title: 'Berhasil',
                message: selectedAction.value === 'delete' ? 'Data alokasi berhasil dihapus.' : 'Data alokasi berhasil di-acc.',
            });
            gridApi.value?.refreshServerSide({ purge: true });
        } else {
            push.error({
                title: 'Gagal',
                message: response.data.message || 'Terjadi kesalahan saat memproses data.',
            });
        }
    } catch (err) {
        console.log(err);

        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan saat memproses data.',
        });
    } finally {
        isLoading.value = false;
    }
};

const columnDefs = createColumnDefs(
    onEditRow,
    onDeleteRow,
    auth.can('menu.alokasi.accrencana') ? onAcc : undefined,
    auth.can('menu.alokasi.accrencanapusat') ? onAcc2 : undefined,
);

const defaultColDef = ref<ColDef<AlokasiRow>>({
    sortable: true,
    filter: true,
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
        const advancedFilterApi = api as GridApiWithAdvancedFilter<AlokasiRow>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};
</script>

<template>
    <div>
        <PublicLayout title="Data Rencana Penyaluran" page-title="Data Rencana Penyaluran" page-sub-title="Pengelolaan dan Monitoring Alokasi UnitRawat">
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
                    <Button
                        variant="outline"
                        size="sm"
                        class="bg-crusoe-300 border-crusoe-300 hover:bg-crusoe-500 text-gray-600 hover:text-white dark:text-gray-500 dark:hover:text-white"
                        @click="newAlokasi()"
                    >
                        <CirclePlus /> Alokasi Baru
                    </Button>
                </ButtonGroup>
            </div>

            <!-- GRID -->
            <div class="relative mb-5 h-130 w-full rounded-md">
                <AgGridVue
                    :enable-advanced-filter="isAdvancedFilterVisible"
                    style="width: 100%; height: 100%"
                    row-model-type="serverSide"
                    :master-detail="true"
                    :is-row-master="isRowMaster"
                    :column-defs="columnDefs"
                    :default-col-def="defaultColDef"
                    :components="components"
                    :detail-cell-renderer-params="detailCellRendererParams"
                    :pagination="true"
                    :pagination-page-size="10"
                    :pagination-page-size-selector="[10, 20, 50, 100]"
                    :pagination-auto-page-size="false"
                    :cache-block-size="10"
                    :theme="currentGridTheme"
                    :locale-text="AG_GRID_LOCALE_ID"
                    row-selection="single"
                    :suppress-cell-focus="true"
                    :loading-overlay-component="CustomLoadingOverlay"
                    :loading-overlay-component-params="{ loadingMessage: 'Memuat data alokasi...' }"
                    @grid-ready="onGridReady"
                    @pagination-changed="onPaginationChanged"
                />
                <ModalDialog
                    v-model:open="isOpen"
                    :item="selectedItem"
                    :loading="isLoading"
                    :title="titleDialog"
                    :description="msgdialog"
                    :confirm-text="confirmText"
                    @confirm="handleConfirmAction"
                />
            </div>

            <div class="flex flex-1 flex-col justify-start gap-2 text-[13px]">
                <p class="text-muted m-0 p-0 text-sm underline">Legend :</p>
                <div class="flex flex-row gap-1">
                    <Badge class="w-15">Open</Badge>
                    <span class="text-muted-foreground italic"> Data belum terintegrasi dengan Item Inventory dan masih dapat diubah. </span>
                </div>

                <div class="flex flex-row gap-1">
                    <Badge class="w-15" variant="destructive">Lock</Badge>
                    <span class="text-muted-foreground italic"> Data sudah terintegrasi dengan Item Inventory sehingga tidak dapat diubah. </span>
                </div>
            </div>
        </PublicLayout>
    </div>
</template>
