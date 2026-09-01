<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import type { ColDef } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { CirclePlus, Funnel, FunnelX, RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import libGlowEffect from '@/lib/libGlowEffect';
import {
    components,
    createColumnDefs,
    defaultColDef,
    deleteSelectedRow,
    isAdvancedFilterVisible,
    onFirstDataRendered,
    onClickRefresh,
    onPaginationChanged,
    onClickToggleFilter,
    onGridReady,
} from '@/lib/libRegItem';
import { isResponseSuccess } from '@/lib/libUtils';
import { regItem, regItemBaru, regItemDelete } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const auth = usePermissionStore();

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});
const newRegItem = () => {
    if (auth.can('menu.inventory.baru')) {
        router.visit(regItemBaru.url());
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini.',
        });
    }
};
onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Data Obat & Alkes', href: regItem.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.2 } });
});

const mode = useColorMode();
const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const isOpen = ref(false);
const selectedItem = ref<Record<string, any> | null>(null);
const msgdialog = ref<string | ''>();
const rowIndex = ref<number>(-1);
const isLoadingDel = ref(false);

// const onDeleteRow = (_row: Record<string, unknown>): void => {
const onDeleteRow = (row: Record<string, any> | null, idx: number = -1): void => {
    if (auth.can('menu.inventory.hapus')) {
        selectedItem.value = row;
        rowIndex.value = idx;
        isOpen.value = true;
        msgdialog.value = `Anda yakin akan menghapus data Inventori dengan Nomor Stok Nasional ${row?.nsn ?? ''}?`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini.',
        });
    }
};
const handleDeleteData = async (): Promise<void> => {
    if (isLoadingDel.value) {
        return;
    }
    try {
        const payload = { id: selectedItem.value?.id ?? '' };
        const response = await axiosJS.post(regItemDelete.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data  berhasil di hapus',
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

const columnDefs = createColumnDefs(onDeleteRow);
const mergedDefaultColDef: ColDef<Record<string, unknown>> = {
    ...defaultColDef,
};
</script>

<template>
    <PublicLayout title="Data Obat & Alkes" page-title="Data Obat & Alkes" page-sub-title="Pengelolaan data, registrasi, dan pemantauan item ">
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
                    variant="outline"
                    size="sm"
                    class="bg-crusoe-300 border-crusoe-300 hover:bg-crusoe-500 text-gray-600 hover:text-white dark:text-gray-500 dark:hover:text-white"
                    @click="newRegItem()"
                >
                    <CirclePlus /> Item Baru
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
                :default-col-def="mergedDefaultColDef"
                :components="components"
                :loading-overlay-component="CustomLoadingOverlay"
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data inventory...' }"
                row-model-type="serverSide"
                :locale-text="AG_GRID_LOCALE_ID"
                :row-selection="{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }"
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
                @first-data-rendered="onFirstDataRendered"
                @pagination-changed="onPaginationChanged"
            />

            <ModalDialog v-model:open="isOpen" :item="selectedItem" :description="msgdialog" @confirm="handleDeleteData" />
        </div>
    </PublicLayout>
</template>
