<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import type { ColDef } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { CirclePlus, Funnel, FunnelX, RotateCw, CloudUpload } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import type { RowTenagaMedis } from '@/lib/libDataTenagaMedise';
import {
    components,
    createColumnDefs,
    deleteSelectedRow,
    isAdvancedFilterVisible,
    onClickRefresh,
    onClickToggleFilter,
    onGridReady,
    onPaginationChanged,
} from '@/lib/libDataTenagaMedise';

import libGlowEffect from '@/lib/libGlowEffect';
import { isResponseSuccess } from '@/lib/libUtils';
import { dashboard, datapersonilbaru, datapersonilDelete, datapersonilUpload } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const isOpen = ref(false);
const selectedItem = ref<RowTenagaMedis | null>(null);
const msgdialog = ref<string | ''>();
const isLoading = ref(false);
const auth = usePermissionStore();

const newPrsonil = () => {
    router.visit(datapersonilbaru.url());
};
const newPrsonilUpload = () => {
    router.visit(datapersonilUpload.url());
};

const onEditRow = (row: RowTenagaMedis): void => {
    if (auth.can('menu.tenaga_medis.edit')) {
        router.visit(datapersonilbaru.url(), { data: { id: row.id } });
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};
const onDeleteRow = (row: RowTenagaMedis): void => {
    if (auth.can('menu.tenaga_medis.hapus')) {
        selectedItem.value = row;
        isOpen.value = true;
        msgdialog.value = `Hapus data tenaga_medis dengan NRP <span class='font-semibold'>${row.data?.nrp} - ${row.data?.nama}</span>.<br />
        Tindakan ini akan menghapus data tenaga_medis dari sistem. TenagaMedis yang masih digunakan atau terasosiasi
        dengan data lain berpotensi menyebabkan inkonsistensi data. Lanjutkan hanya jika Anda
        yakin`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }
};
const handleDeleteTenagaMedis = async (): Promise<void> => {
    if (isLoading.value) {
        return;
    }
    try {
        const payload = { id: selectedItem.value?.id ?? '' };
        const response = await axiosJS.post(datapersonilDelete.url(), payload, { encrypt: true });
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

const columnDefs = createColumnDefs(onEditRow, onDeleteRow);
const defaultColDef: ColDef<RowTenagaMedis> = {
    sortable: true,
    filter: false,
};
const mode = useColorMode();
const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const layout = useLayoutStore();

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Data Nakes', href: dashboard.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.2 } });
});
</script>

<template>
    <PublicLayout title="Data Nakes" page-title="Data Nakes" page-sub-title="Kelola dan pantau daftar tenaga_medis dalam sistem">
        <div class="flex flex-1 justify-end">
            <ButtonGroup class="mb-4">
                <Button variant="outline" size="sm" class="text-gray-600 dark:text-gray-500 dark:hover:text-white" @click="onClickRefresh">
                    <RotateCw
                /></Button>
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
                    v-if="auth.can('menu.tenaga_medis.baru')"
                    variant="outline"
                    size="sm"
                    class="bg-crusoe-300 border-crusoe-300 hover:bg-crusoe-500 text-gray-600 hover:text-white dark:text-gray-500 dark:hover:text-white"
                    @click="newPrsonil()"
                >
                    <CirclePlus /> Nakes Baru
                </Button>
                <Button
                    v-if="auth.can('menu.tenaga_medis.baru')"
                    variant="outline"
                    size="sm"
                    class="text-gray-600 dark:text-gray-500 dark:hover:text-white"
                    @click="newPrsonilUpload()"
                >
                    <CloudUpload /> Upload Data
                </Button>
            </ButtonGroup>
        </div>
        <div class="relative h-140 w-full rounded-md">
            <libGlowEffect />
            <AgGridVue
                :suppress-drag-leave-hides-columns="true"
                :row-height="35"
                :enable-advanced-filter="isAdvancedFilterVisible"
                :column-defs="columnDefs"
                :default-col-def="defaultColDef"
                :components="components"
                :loading-overlay-component="CustomLoadingOverlay"
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data tenaga_medis...' }"
                row-model-type="serverSide"
                :locale-text="AG_GRID_LOCALE_ID"
                :row-selection="{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }"
                :get-row-id="(params) => String(params.data.id)"
                :suppress-cell-focus="true"
                :theme="currentGridTheme"
                :pagination="true"
                :pagination-page-size="20"
                :pagination-page-size-selector="[20, 50, 100]"
                :pagination-auto-page-size="false"
                :cache-block-size="20"
                style="width: 100%; height: 100%"
                @grid-ready="onGridReady"
                @pagination-changed="onPaginationChanged"
            />
        </div>

        <ModalDialog v-model:open="isOpen" :item="selectedItem" :loading="isLoading" :description="msgdialog" @confirm="handleDeleteTenagaMedis" />
    </PublicLayout>
</template>
