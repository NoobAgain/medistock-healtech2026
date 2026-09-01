<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import type { ColDef } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { CirclePlus, Funnel, FunnelX, RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import {
    components,
    createColumnDefs,
    deleteSelectedRow,
    isAdvancedFilterVisible,
    onClickRefresh,
    onFirstDataRendered,
    onClickToggleFilter,
    onGridReady,
    onPaginationChanged,
    type RowUser,
} from '@/lib/libDataAkun';
import libGlowEffect from '@/lib/libGlowEffect';
import { isResponseSuccess } from '@/lib/libUtils';
import { akunbaru, akunbaruHapus, dataakun } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const mode = useColorMode();

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const auth = usePermissionStore();

const onEditRow = (row: RowUser): void => {
    if (!row.id) {
        return;
    }

    router.visit(akunbaru.url({ query: { id: row.id } }));
};

const onDeleteRow = (row: RowUser): void => {
    if (auth.can('menu.dataakun.hapus')) {
        selectedItem.value = row;
        isOpen.value = true;
        const selectedName = row.tenaga_medis_nama ?? row.username ?? '-';
        msgdialog.value = `Anda yakin akan menghapus data USER dengan nama user <span class="text-red-400">${selectedName}</span> ?<br />
        Tindakan ini akan menghapus data Role dari sistem. Role yang masih digunakan atau terasosiasi
        dengan akun lain berpotensi menyebabkan inkonsistensi data.`;
    } else {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini..',
        });
    }

    // console.log('Delete row:', row);
};

const columnDefs = createColumnDefs(onEditRow, onDeleteRow);

const defaultColDef: ColDef<RowUser> = {
    sortable: true,
    filter: false,
};

const newAkun = () => {
    router.visit(akunbaru.url());
};

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Akun Pengguna', href: dataakun.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.4 } });
});

/**
 * Dialog
 */
const isOpen = ref(false);
const isLoading = ref(false);
const msgdialog = ref<string | ''>();
const selectedItem = ref<RowUser | null>(null);
const handleDeleteUser = async (): Promise<void> => {
    if (isLoading.value) {
        return;
    }
    try {
        const payload = { id: selectedItem.value?.id ?? '' };
        const response = await axiosJS.post(akunbaruHapus.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data akun berhasil di hapus',
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
</script>

<template>
    <PublicLayout title="Akun Pengguna" page-title="Akun Pengguna" page-sub-title="Manajemen dan Pengelolaan Informasi Akun Pengguna.">
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
                    @click="newAkun()"
                >
                    <CirclePlus /> Akun Baru
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
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data akun...' }"
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

            <ModalDialog v-model:open="isOpen" :item="selectedItem" :loading="isLoading" :description="msgdialog" @confirm="handleDeleteUser" />
        </div>
    </PublicLayout>
</template>
