<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { AgGridVue } from 'ag-grid-vue3';
import { RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import {
    components,
    createColumnDefs,
    defaultColDef,
    deleteSelectedRow,
    getRowStyle,
    gridApi,
    onFirstDataRendered,
    onGridReady,
    onPaginationChanged,
    type RowPoD,
} from '@/lib/libDataPoD';
import libGlowEffect from '@/lib/libGlowEffect';
import { dataPod, dataPodDelete, dataPodFile } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const auth = usePermissionStore();
const mode = useColorMode();

const isOpen = ref(false);
const selectedItem = ref<RowPoD | null>(null);
const msgdialog = ref<string>('');
const isLoading = ref(false);

const isPreviewOpen = ref(false);
const previewItem = ref<RowPoD | null>(null);
const isItemDetailOpen = ref(false);
const itemDetailRow = ref<RowPoD | null>(null);

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Distribusi Final', href: '' },
        { label: 'Data Penyaluran', href: dataPod.url() },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.52 } });
});

const onClickRefresh = (): void => {
    gridApi.value?.refreshServerSide({ purge: true });
};

const onPreviewRow = (row: RowPoD): void => {
    previewItem.value = row;
    isPreviewOpen.value = true;
};

const onItemNsnClick = (row: RowPoD): void => {
    itemDetailRow.value = row;
    isItemDetailOpen.value = true;
};

const onDeleteRow = (row: RowPoD): void => {
    if (!auth.can('menu.distribusi.confirm')) {
        push.warning({
            title: 'Role Akses',
            message: 'Maaf, Anda tidak memiliki hak akses untuk melakukan tindakan ini.',
        });
        return;
    }

    selectedItem.value = row;
    isOpen.value = true;
    msgdialog.value = `Hapus data penyaluran NSN <span class='font-semibold'>${row.nsn}</span> untuk tenaga_medis <span class='font-semibold'>${row.nama}</span>.<br />Tindakan ini akan menghapus data PoD beserta foto bukti. Lanjutkan hanya jika Anda yakin.`;
};

const handleDeletePoD = async (): Promise<void> => {
    if (isLoading.value || !selectedItem.value) {
        return;
    }

    isLoading.value = true;

    try {
        const response = await axiosJS.post(dataPodDelete.url(), { id: selectedItem.value.id }, { encrypt: true });
        const payload = response.data ?? {};

        if (payload.status === true || payload.status === 1 || payload.status === '1' || payload.status === 'true') {
            push.success({
                title: 'Berhasil',
                message: payload.message ?? 'Data penyaluran berhasil dihapus.',
            });
            deleteSelectedRow(selectedItem.value);
        } else {
            push.error({
                title: 'Gagal',
                message: payload.message ?? 'Gagal menghapus data penyaluran.',
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

const previewImageUrl = computed((): string => {
    if (!previewItem.value?.id) {
        return '';
    }
    return dataPodFile.url({ id: previewItem.value?.id });
});

const columnDefs = createColumnDefs(onDeleteRow, onPreviewRow, onItemNsnClick);
</script>

<template>
    <PublicLayout title="Data Penyaluran" page-title="Data Penyaluran" page-sub-title="Riwayat penyaluran alkes kepada tenaga_medis">
        <div class="flex flex-1 justify-end">
            <ButtonGroup class="mb-4">
                <Button variant="outline" size="sm" class="text-gray-600 dark:text-gray-500 dark:hover:text-white" @click="onClickRefresh">
                    <RotateCw />
                </Button>
            </ButtonGroup>
        </div>
        <div class="relative h-140 w-full rounded-md">
            <libGlowEffect />
            <AgGridVue
                class="w-full flex-1"
                :theme="currentGridTheme"
                :column-defs="columnDefs"
                :default-col-def="defaultColDef"
                :components="components"
                :locale-text="AG_GRID_LOCALE_ID"
                :loading-overlay-component="CustomLoadingOverlay"
                :loading-overlay-component-params="{ loadingMessage: 'Memuat data penyaluran ...' }"
                :row-selection="{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }"
                :get-row-style="getRowStyle"
                row-model-type="serverSide"
                :pagination="true"
                :pagination-page-size="10"
                :pagination-page-size-selector="[10, 25, 50]"
                :cache-block-size="10"
                style="width: 100%; height: 100%"
                @grid-ready="onGridReady"
                @first-data-rendered="onFirstDataRendered"
                @pagination-changed="onPaginationChanged"
            />

            <ModalDialog v-model:open="isOpen" :item="selectedItem" :loading="isLoading" :description="msgdialog" @confirm="handleDeletePoD" />
        </div>

        <Dialog v-model:open="isPreviewOpen">
            <DialogContent class="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Foto Bukti Penyaluran</DialogTitle>
                    <DialogDescription v-if="previewItem">
                        NSN: {{ previewItem.nsn }} &mdash; {{ previewItem.nama }} ({{ previewItem.nrp }})
                    </DialogDescription>
                </DialogHeader>
                <div class="flex items-center justify-center overflow-hidden rounded-md bg-gray-50 dark:bg-gray-900">
                    <img
                        v-if="previewImageUrl"
                        :src="previewImageUrl"
                        :alt="`Foto bukti penyaluran NSN ${previewItem?.nsn}`"
                        class="max-h-[60vh] w-full object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="isItemDetailOpen">
            <DialogContent class="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detail Item NSN</DialogTitle>
                    <DialogDescription v-if="itemDetailRow"> NSN: {{ itemDetailRow.itemNsn ?? itemDetailRow.nsn ?? '-' }} </DialogDescription>
                </DialogHeader>

                <div class="grid gap-3 rounded-md border p-4 text-sm">
                    <div class="grid grid-cols-[96px,1fr] gap-2">
                        <span class="text-muted-foreground">Jenis</span>
                        <span class="font-medium">{{ itemDetailRow?.itemJenis ?? '-' }}</span>
                    </div>
                    <div class="grid grid-cols-[96px,1fr] gap-2">
                        <span class="text-muted-foreground">Ukuran</span>
                        <span class="font-medium">{{ itemDetailRow?.itemUkuran ?? '-' }}</span>
                    </div>
                    <div class="grid grid-cols-[96px,1fr] gap-2">
                        <span class="text-muted-foreground">Kategori</span>
                        <span class="font-medium">{{ itemDetailRow?.itemKategori ?? '-' }}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </PublicLayout>
</template>
