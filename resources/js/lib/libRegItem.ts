import type {
    ColDef,
    FirstDataRenderedEvent,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
    IServerSideDatasource,
    IServerSideGetRowsParams,
    PaginationChangedEvent,
} from "ag-grid-community";
import { Trash2 } from "lucide-vue-next";
import { defineComponent, h, ref } from "vue";
import { Button } from "@/components/ui/button";
import { opsiAlokasi, opsiAlokasiDetail, regItemJmlalokasi, regItemListdata } from "@/routes";
import axiosJS from '@lib/libAxios';
import { formatDate, isResponseSuccess } from "./libUtils";

export const gridApi = ref<GridApi<Record<string, any>> | null>(null);
export type ActionButtonDisplayMode = 'icon-only' | 'icon-text';
type ActionRendererParams = ICellRendererParams<Record<string, any>> & {
    onEdit?: (row: Record<string, any>) => void;
    onDelete?: (row: Record<string, any>) => void;
    displayMode?: ActionButtonDisplayMode;
};


export const isAdvancedFilterVisible = ref(false);
export const onClickRefresh = (): void => {
    gridApi.value?.refreshServerSide({ purge: true });
};
export const onClickToggleFilter = (): void => {
    const api = gridApi.value;

    if (!api) {
        return;
    }

    const nextState = !isAdvancedFilterVisible.value;
    isAdvancedFilterVisible.value = nextState;
    api.setGridOption('enableAdvancedFilter', nextState);

    if (!nextState) {
        const advancedFilterApi = api as GridApiWithAdvancedFilter<Record<string, any>>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};

export const _opsiAlokasi = ref<any[]>([]);
export const _opsiDetailAlokasi = ref<any[]>([]);
export const _jmlAlokasi = ref<any[]>([]);
export const _jmlteralokasi = ref<any[]>([]);
export const isLoadingDetailAlokasi = ref(false);

export const loadOpsiAlokasi = async () => {
    try {
        const response = await axiosJS.get(opsiAlokasi.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess && Array.isArray(data) && data.length > 0) {
            _opsiAlokasi.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                }));
        } else {
            _opsiAlokasi.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi ukuran:', error);
        _opsiAlokasi.value = [];
    }
};
export const loadDetailAlokasi = async (nandata: number) => {
    try {
        isLoadingDetailAlokasi.value = true;
        const payload = { nan: nandata }
        const response = await axiosJS.post(opsiAlokasiDetail.url(), payload, { encrypt: true });
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        isLoadingDetailAlokasi.value = false;
        if (isSuccess && Array.isArray(data) && data.length > 0) {
            _opsiDetailAlokasi.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                    jml: item.jml_alokasi
                }));
        } else {
            _opsiDetailAlokasi.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi ukuran:', error);
        _opsiDetailAlokasi.value = [];
    }
};
export const loadHasAlokasi = async (idDetail: number): Promise<number> => {
    try {
        const payload = { id: idDetail };
        const response = await axiosJS.post(regItemJmlalokasi.url(), payload, { encrypt: true });
        const { status, jml } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        return isSuccess ? (Number(jml) || 0) : 0;
    } catch (error) {
        console.error('Error load jumlah alokasi:', error);
        return 0;
    }
}

export const ActionButtonsRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ActionRendererParams,
            required: true,
        },
    },
    setup(props) {
        const getDisplayMode = (): ActionButtonDisplayMode => {
            return props.params.displayMode ?? 'icon-text';
        };

        const runAction = (action: 'delete'): void => {
            const row = props.params.data;

            if (!row) {
                return;
            }

            if (action === 'delete') {
                props.params.onDelete?.(row);
            }
        };

        return () => {
            const displayMode = getDisplayMode();
            const iconOnly = displayMode === 'icon-only';

            return h('div', { class: 'flex h-full items-center m-0 p-0' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        class: 'h-7 rounded-sm bg-red-400 hover:bg-red-500 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50',
                        title: 'Hapus',
                        disabled: props.params.data?.is_sent === true,
                        onClick: () => runAction('delete'),
                    },
                    () =>
                        iconOnly ? [h(Trash2, { class: 'h-4 w-4' })] : [h(Trash2, { class: 'mr-1 h-4 w-4' }), 'Hapus'],
                ),
            ]);
        };
    },
});
export const components = {
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const defaultColDef: ColDef<Record<string, any>> = {
    sortable: true,
    filter: false,
};
export const createColumnDefs = (
    onDeleteRow: (row: Record<string, any>) => void
): ColDef<Record<string, any>>[] => [
        {
            headerName: 'Aksi',
            colId: 'actions',
            suppressMovable: true,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            sortable: false,
            filter: false,
            width: 70,
            cellRenderer: 'actionButtonsRenderer',
            cellRendererParams: {
                onDelete: onDeleteRow,
                displayMode: 'icon-only',
            },
        },
        {
            field: 'alokasi_detail.alokasi_nan',
            headerName: 'Nomor Alokasi',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'nsn',
            headerName: 'Nomor Stok Nasional',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'hash',
            headerName: 'Hash/NTAG',
            filter: false,
        },

        {
            field: 'alokasi_detail.jenis.name',
            headerName: 'Jenis',
            filter: 'agTextColumnFilter',
            width: 110,
        },
        {
            field: 'alokasi_detail.ukuran.name',
            headerName: 'Ukuran',
            filter: 'agTextColumnFilter',
            width: 110,
        },
        {
            field: 'alokasi_detail.kategori.name',
            headerName: 'Kategori',
            filter: 'agTextColumnFilter',
            width: 110,
        },
        {
            field: 'alokasi_detail.tenaga_medis.data.nama',
            headerName: 'Alokasi Nakes',
            filter: 'agTextColumnFilter',
            width: 130,
        },
        {
            field: 'created_at',
            headerName: 'Dibuat Pada',
            filter: 'agDateColumnFilter',
            valueFormatter: params => params.value ? formatDate(params.value.toString()) : '',
        },
    ];

export const onGridReady = (params: GridReadyEvent<Record<string, any>>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

export const onPaginationChanged = (params: PaginationChangedEvent<Record<string, any>>): void => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

export const onFirstDataRendered = (params: FirstDataRenderedEvent<Record<string, any>>): void => {
    params.api.autoSizeColumns(['alokasi_detail.alokasi_nan', 'nsn', 'alokasi_detail.jenis.name', 'alokasi_detail.ukuran.name', 'alokasi_detail.kategori.name']);
};


const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }

    return columnId;
};

type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};
const normalizeFilterModelForApi = (filterModel: unknown): unknown => {
    if (!filterModel || typeof filterModel !== 'object') {
        return null;
    }

    const modelRecord = filterModel as Record<string, unknown>;

    if ('colId' in modelRecord && 'filterType' in modelRecord) {
        return modelRecord;
    }

    const normalizedEntries = Object.entries(modelRecord)
        .filter(([, value]) => value && typeof value === 'object')
        .map(([columnId, condition]) => [
            columnId,
            {
                colId: columnId,
                ...(condition as Record<string, unknown>),
            },
        ]);

    if (normalizedEntries.length === 0) {
        return null;
    }

    if (normalizedEntries.length === 1) {
        return normalizedEntries[0][1];
    }

    return Object.fromEntries(normalizedEntries);
};
export const buildServerDatasource = (): IServerSideDatasource<Record<string, any>> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<Record<string, any>>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<Record<string, any>> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);

            try {
                // Check if grid is not destroyed before setting options
                if (!rowParams.api.isDestroyed?.()) {
                    rowParams.api.setGridOption('loading', true);
                }

                const response = await axiosJS.post(
                    regItemListdata.url(),
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
                const isSuccess = isResponseSuccess(payload.status);

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
                // Check if grid is not destroyed before setting options
                if (!rowParams.api.isDestroyed?.()) {
                    rowParams.api.setGridOption('loading', false);
                }
            }
        },
    };
};


type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};
export const deleteSelectedRow = (row?: Record<string, any> | null): void => {
    const api = gridApi.value;
    if (!api) {
        return;
    }
    const rowsToRemove = row ? [row] : api.getSelectedRows();
    if (rowsToRemove.length === 0) {
        return;
    }
    const serverSideApi = api as GridApiWithServerSideTransaction<Record<string, any>>;
    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }
    api.applyTransaction({ remove: rowsToRemove });
};
