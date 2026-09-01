<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useColorMode } from '@vueuse/core';
import type { ColDef, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { push } from 'notivue';
import { computed, onMounted, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import { isResponseSuccess } from '@/lib/libUtils';
import { receivedPengiriman, rekonItems } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

//FIXME: jika skip 2, pada grid kok menjadi macth, harusnya ada 2 skip

type RekonInfo = {
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
};

type RekonItemRow = {
    id: number;
    nsn: string | number;
    hash: string;
    skipped?: boolean;
    tenaga_medis?: string;
    alokasi_detail?: {
        jenis?: { name?: string } | string[] | string | null;
        ukuran?: { name?: string } | string[] | string | null;
        kategori?: { name?: string } | string[] | string | null;
        tenaga_medis?: {
            id: number;
            data: {
                nama?: string;
                [key: string]: any;
            };
        };
    };
};

const layout = useLayoutStore();
const props = withDefaults(
    defineProps<{
        pengirimanInfo?: RekonInfo | null;
    }>(),
    {
        pengirimanInfo: null,
    },
);

const mode = useColorMode();
const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const defaultColDef: ColDef<RekonItemRow> = {
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 130,
};

const toDisplayValue = (value: unknown): string => {
    if (value === null || value === undefined) {
        return '-';
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value.join(', ');
    }

    if (typeof value === 'object') {
        const namedValue = (value as { name?: unknown }).name;
        if (typeof namedValue === 'string' && namedValue.trim() !== '') {
            return namedValue;
        }
    }

    return '-';
};

const columnDefs: ColDef<RekonItemRow>[] = [
    {
        field: 'nsn',
        headerName: 'Nomor Stok Nasional',
        filter: 'agTextColumnFilter',
        minWidth: 170,
    },
    {
        field: 'hash',
        headerName: 'Hash/Tag',
        minWidth: 240,
    },
    {
        colId: 'jenis',
        headerName: 'Jenis',
        sortable: false,
        valueGetter: (params) => toDisplayValue(params.data?.alokasi_detail?.jenis),
    },
    {
        colId: 'ukuran',
        headerName: 'Ukuran',
        sortable: false,
        valueGetter: (params) => toDisplayValue(params.data?.alokasi_detail?.ukuran),
    },
    {
        colId: 'kategori',
        headerName: 'Kategori',
        sortable: false,
        valueGetter: (params) => toDisplayValue(params.data?.alokasi_detail?.kategori),
    },
    {
        colId: 'tenaga_medis',
        headerName: 'Alokasi Nakes',
        sortable: false,
        minWidth: 150,
        valueGetter: (params) => params.data?.alokasi_detail?.tenaga_medis?.data?.nama || '-',
    },
    {
        colId: 'status',
        headerName: 'Status',
        sortable: false,
        minWidth: 120,
        cellRenderer: (params: any) => {
            if (params.data?.skipped) {
                return `<span class="inline-flex items-center rounded-md bg-orange-500 px-2 py-1 text-xs font-medium text-white">Skipped</span>`;
            }
            return `<span class="inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">Match</span>`;
        },
    },
];

const isLoadingItems = ref(false);
const isSubmittingConfirm = ref(false);
const isMismatchChecked = ref(false);
const totalItems = ref(0);

const onMismatchChecked = (value: boolean | 'indeterminate'): void => {
    isMismatchChecked.value = value === true;
};

const onConfirmReceived = async (): Promise<void> => {
    const info = props.pengirimanInfo;

    if (!info?.id) {
        push.error({
            title: 'Gagal',
            message: 'Data pengiriman tidak ditemukan. Silahkan kembali scan box dari halaman konfirmasi.',
        });
        return;
    }

    try {
        isSubmittingConfirm.value = true;

        const response = await axiosJS.post(
            '/rekon-confirm-received',
            {
                pengiriman_id: info.id,
                missmatch: isMismatchChecked.value,
            },
            { encrypt: true },
        );

        const payload = response.data ?? {};

        if (!isResponseSuccess(payload.status)) {
            push.error({
                title: 'Gagal',
                message: payload.message || 'Konfirmasi penerimaan gagal diproses.',
            });
            return;
        }

        push.success({
            title: 'Berhasil',
            message: payload.message || 'Konfirmasi penerimaan berhasil diproses.',
        });

        router.visit(receivedPengiriman.url(), {
            method: 'get',
        });
    } catch {
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi.',
        });
    } finally {
        isSubmittingConfirm.value = false;
    }
};

const buildDatasource = (): IServerSideDatasource<RekonItemRow> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RekonItemRow>) => {
            const info = props.pengirimanInfo;

            if (!info?.id) {
                totalItems.value = 0;
                rowParams.success({ rowData: [], rowCount: 0 });
                return;
            }

            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];

            try {
                if (!rowParams.api.isDestroyed?.()) {
                    rowParams.api.setGridOption('loading', true);
                }

                isLoadingItems.value = true;

                const response = await axiosJS.post(
                    rekonItems.url(),
                    {
                        pengiriman_id: info.id,
                        page,
                        perPage,
                        sortField: firstSort?.colId ?? 'id',
                        sortDirection: firstSort?.sort ?? 'asc',
                    },
                    { encrypt: true },
                );

                const payload = response.data ?? {};

                if (!isResponseSuccess(payload.status)) {
                    totalItems.value = 0;
                    rowParams.fail();
                    return;
                }

                totalItems.value = Number(payload.total ?? 0);

                const rowData = Array.isArray(payload.data) ? payload.data : [];
                rowParams.success({
                    rowData,
                    rowCount: Number(payload.total ?? 0),
                });
            } catch {
                totalItems.value = 0;
                rowParams.fail();
            } finally {
                isLoadingItems.value = false;
                if (!rowParams.api.isDestroyed?.()) {
                    rowParams.api.setGridOption('loading', false);
                }
            }
        },
    };
};

const onGridReady = (params: GridReadyEvent<RekonItemRow>) => {
    params.api.setGridOption('serverSideDatasource', buildDatasource());
};

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Penerimaan & Pencocokan', href: '' },
        { label: 'Konfirmasi Penerimaan', href: receivedPengiriman.url() },
        { label: 'Pencocokan', href: '' },
    ];

    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.41 } });
});
</script>

<template>
    <PublicLayout
        title="Pencocokan"
        page-title="Pencocokan"
        page-sub-title="Halaman untuk melakukan pencocokan dan verifikasi data pengiriman dengan data yang tercatat di dalam sistem."
    >
        <div class="grid flex-1 grid-cols-1 content-start gap-4 lg:grid-cols-4 lg:content-normal">
            <div class="space-y-2 lg:col-span-1 lg:flex lg:flex-col">
                <h3 class="text-sm font-semibold">Informasi Box</h3>
                <Command class="rounded-md border shadow-sm lg:flex-1">
                    <CommandList>
                        <CommandGroup>
                            <CommandItem value="uid" class="flex items-center justify-between gap-4">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Box UID</span>
                                <span class="text-right font-medium">{{ pengirimanInfo?.uid || '-' }}</span>
                            </CommandItem>
                            <CommandItem value="unit_rawat" class="flex items-center justify-between gap-4">
                                <span class="text-xs text-gray-600 dark:text-gray-400">UnitRawat Penerima</span>
                                <span class="text-right font-medium">{{ pengirimanInfo?.unit_rawat || '-' }}</span>
                            </CommandItem>
                            <CommandItem value="nan" class="flex items-center justify-between gap-4">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Nomor Alokasi</span>
                                <span class="text-right font-medium">{{ pengirimanInfo?.nan || '-' }}</span>
                            </CommandItem>

                            <CommandItem value="periode" class="flex items-center justify-between gap-4">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Periode Alokasi</span>
                                <span class="text-right font-medium">{{ pengirimanInfo?.periode || '-' }}</span>
                            </CommandItem>

                            <CommandItem value="periode" class="flex items-center justify-between gap-4">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Jumlah Item Manifest</span>
                                <span class="text-right font-medium">{{ totalItems }}</span>
                            </CommandItem>

                            <div class="mx-2 my-3 flex flex-col gap-4">
                                <hr />
                                <div class="flex items-center gap-3">
                                    <Checkbox
                                        id="missmatch"
                                        :model-value="isMismatchChecked"
                                        class="data-[state=checked]:border-orange-600 data-[state=checked]:bg-orange-400 data-[state=checked]:text-white dark:data-[state=checked]:border-orange-700 dark:data-[state=checked]:bg-orange-700"
                                        @update:model-value="onMismatchChecked"
                                    />
                                    <Label for="missmatch">Ada ketidaksesuaian</Label>
                                </div>
                                <Button class="w-auto" :disabled="isSubmittingConfirm" @click="onConfirmReceived">
                                    {{ isSubmittingConfirm ? 'Memproses...' : 'Konfirmasi Penerimaan' }}
                                </Button>
                            </div>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>

            <div class="flex flex-col gap-2 lg:col-span-3">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold">Detail Item Pengiriman</h3>
                    <Badge v-if="isLoadingItems" class="bg-amber-500 text-white">Memuat...</Badge>
                </div>

                <div class="relative h-130 w-full rounded-md border p-1">
                    <AgGridVue
                        :column-defs="columnDefs"
                        :default-col-def="defaultColDef"
                        :loading-overlay-component="CustomLoadingOverlay"
                        :loading-overlay-component-params="{ loadingMessage: 'Memuat data item...' }"
                        row-model-type="serverSide"
                        :locale-text="AG_GRID_LOCALE_ID"
                        :theme="currentGridTheme"
                        :pagination="true"
                        :pagination-page-size="10"
                        :pagination-page-size-selector="[10, 20, 50, 100]"
                        :cache-block-size="10"
                        style="width: 100%; height: 100%"
                        @grid-ready="onGridReady"
                    />
                </div>
            </div>
        </div>
    </PublicLayout>
</template>
