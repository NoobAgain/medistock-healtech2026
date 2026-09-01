<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import {
    ModuleRegistry,
    PaginationModule,
    type ColDef,
    type GridApi,
    type GridReadyEvent,
    type IServerSideDatasource,
    type IServerSideGetRowsParams,
    type PaginationChangedEvent,
} from 'ag-grid-community';

ModuleRegistry.registerModules([PaginationModule]);

import { AgGridVue } from 'ag-grid-vue3';
import { CirclePlus, Funnel, FunnelX, RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import libGlowEffect from '@/lib/libGlowEffect';
import { isResponseSuccess } from '@/lib/libUtils';
import { datarole, dataroleBaru, dataroleDelete, dataroleListdata } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';
import type { RoleRow } from '@lib/libDataRole';
import { components, createColumnDefs, deleteSelectedRow, gridApi } from '@lib/libDataRole';

const layout = useLayoutStore();
const mode = useColorMode();

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Hak Akses', href: datarole.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.5 } });
});

const auth = usePermissionStore();
const newRole = () => {
    router.visit(dataroleBaru.url());
};

const onEditRow = (row: RoleRow): void => {
    if (auth.can('menu.datarole.edit')) {
        router.visit(dataroleBaru.url(), { data: { id: row.id } });
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};

const isOpen = ref(false);
const selectedItem = ref<RoleRow | null>(null);
const msgdialog = ref<string | ''>();
const isLoading = ref(false);

const onDeleteRow = (row: RoleRow): void => {
    if (auth.can('menu.datarole.hapus')) {
        selectedItem.value = row;
        isOpen.value = true;
        msgdialog.value = `Anda yakin akan menghapus data ROLE dengan nama role <span class="text-red-400">${row.displayName}</span> ?<br />
        Tindakan ini akan menghapus data Role dari sistem. Role yang masih digunakan atau terasosiasi
        dengan akun lain berpotensi menyebabkan inkonsistensi data.`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};

const handleDeleteRole = async (): Promise<void> => {
    if (isLoading.value) {
        return;
    }
    try {
        const payload = { id: selectedItem.value?.id ?? '' };
        const response = await axiosJS.post(dataroleDelete.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data tenaga_medis/nakes berhasil di hapus',
            });
            deleteSelectedRow(selectedItem.value);
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isOpen.value = false;
        selectedItem.value = null;
    }
};

const isAdvancedFilterVisible = ref(false);
const columnDefs = createColumnDefs(onEditRow, onDeleteRow);

type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};

const defaultColDef: ColDef<RoleRow> = {
    sortable: true,
    filter: false,
};

const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }

    if (columnId === 'displayName') {
        return 'display_name';
    }

    return columnId;
};

const normalizeFilterModelForApi = (filterModel: unknown): unknown => {
    if (!filterModel || typeof filterModel !== 'object') {
        return null;
    }

    const modelRecord = filterModel as Record<string, unknown>;

    if ('colId' in modelRecord && 'filterType' in modelRecord) {
        return modelRecord;
    }

    const firstColumnEntry = Object.entries(modelRecord).find(([, value]) => value && typeof value === 'object');

    if (!firstColumnEntry) {
        return null;
    }

    const [columnId, condition] = firstColumnEntry;

    return {
        colId: columnId,
        ...(condition as Record<string, unknown>),
    };
};

// Fetch API
const buildServerDatasource = (): IServerSideDatasource<RoleRow> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RoleRow>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<RoleRow> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);
            try {
                rowParams.api.setGridOption('loading', true);
                const response = await axiosJS.post(
                    dataroleListdata.url(),
                    {
                        page,
                        perPage,
                        sortField,
                        sortDirection: firstSort?.sort ?? null,
                        filterModel: normalizedFilterModel,
                        advancedFilterModel: advancedFilterModelFromApi ?? advancedFilterModelFromRequest ?? normalizedFilterModel,
                    },
                    { encrypt: true },
                );

                const payload = response.data ?? {};
                const isSuccess = payload.status === true || payload.status === 1 || payload.status === '1' || payload.status === 'true';

                if (!isSuccess) {
                    rowParams.fail();
                    return;
                }

                rowParams.success({
                    rowData: payload.data ?? [],
                    rowCount: payload.total ?? 0,
                });
            } catch {
                rowParams.fail();
            } finally {
                rowParams.api.setGridOption('loading', false);
            }
        },
    };
};

const onGridReady = (params: GridReadyEvent<RoleRow>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

const onPaginationChanged = (params: PaginationChangedEvent<RoleRow>) => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

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
        const advancedFilterApi = api as GridApiWithAdvancedFilter<RoleRow>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};
</script>

<template>
    <div>
        <PublicLayout
            title="Hak Akses"
            page-title="Hak Akses"
            page-sub-title="Kelola peran dan hak akses pengguna untuk memastikan kontrol sistem yang terstruktur dan aman."
        >
            <div class="flex flex-1 justify-end">
                <ButtonGroup class="mb-4">
                    <Button variant="outline" size="sm" class="text-gray-600 dark:text-gray-500" @click="onClickRefresh"> <RotateCw /></Button>
                    <Button
                        variant="outline"
                        size="sm"
                        :class="[
                            'text-gray-600 dark:text-gray-500',
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
                        v-if="auth.can('menu.datarole')"
                        variant="outline"
                        size="sm"
                        class="bg-crusoe-300 border-crusoe-300 hover:bg-crusoe-500 text-gray-600 hover:text-white dark:text-gray-500"
                        @click="newRole"
                    >
                        <CirclePlus /> Role Baru
                    </Button>
                </ButtonGroup>
            </div>
            <div class="relative h-140 w-full rounded-md">
                <libGlowEffect />
                <AgGridVue
                    :enable-advanced-filter="isAdvancedFilterVisible"
                    :column-defs="columnDefs"
                    :default-col-def="defaultColDef"
                    :components="components"
                    :loading-overlay-component="CustomLoadingOverlay"
                    :loading-overlay-component-params="{ loadingMessage: 'Memuat data role...' }"
                    row-model-type="serverSide"
                    :locale-text="AG_GRID_LOCALE_ID"
                    row-selection="single"
                    :get-row-id="(params) => String(params.data.id)"
                    :suppress-cell-focus="true"
                    :theme="currentGridTheme"
                    :pagination="true"
                    :pagination-page-size="10"
                    :pagination-page-size-selector="[10, 20, 50, 100]"
                    :pagination-auto-page-size="false"
                    :cache-block-size="10"
                    style="width: 100%; height: 100%"
                    @grid-ready="onGridReady"
                    @pagination-changed="onPaginationChanged"
                />
            </div>

            <ModalDialog v-model:open="isOpen" :item="selectedItem" :loading="isLoading" :description="msgdialog" @confirm="handleDeleteRole" />
        </PublicLayout>
    </div>
</template>
