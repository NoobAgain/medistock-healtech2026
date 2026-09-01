import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams, IServerSideDatasource, IServerSideGetRowsParams, ITextFilterParams, PaginationChangedEvent } from "ag-grid-community";
import { Pencil, Trash2 } from "lucide-vue-next";
import { defineComponent, h, ref } from "vue";
import { Button } from "@/components/ui/button";
import { listdatapersonil } from "@/routes";
import type { ActionButtonDisplayMode } from "@lib/libAgGrid";
import axiosJS from '@lib/libAxios';
import { formatDate } from "@lib/libUtils";


export type DataTenagaMedise = {
    nrp: string;
    nama: string;
    alamat: string;
    pangkat: string;
    unit_rawat: string;
    faskes: string;
    lokasi: string;
    tgllahir: Date;
    tglmasukunit_rawat: Date;
};

export type RowTenagaMedis = {
    id: number;
    data?: DataTenagaMedise;
};

type ActionRendererParams = ICellRendererParams<RowTenagaMedis> & {
    onEdit?: (row: RowTenagaMedis) => void;
    onDelete?: (row: RowTenagaMedis) => void;
    displayMode?: ActionButtonDisplayMode;
};

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

        const runAction = (action: 'edit' | 'delete'): void => {
            const row = props.params.data;

            if (!row) {
                return;
            }

            if (action === 'edit') {
                props.params.onEdit?.(row);
            }

            if (action === 'delete') {
                props.params.onDelete?.(row);
            }
        };

        return () => {
            const displayMode = getDisplayMode();
            const iconOnly = displayMode === 'icon-only';

            return h('div', { class: 'flex h-full items-center gap-2' }, [

                h(
                    Button,
                    {
                        size: 'sm',
                        class: 'h-7 rounded-sm bg-red-400 hover:bg-red-500 transition duration-300',
                        title: 'Hapus',
                        onClick: () => runAction('delete'),
                    },
                    () =>
                        iconOnly ? [h(Trash2, { class: 'h-4 w-4' })] : [h(Trash2, { class: 'mr-1 h-4 w-4' }), 'Hapus'],
                ), h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'outline',
                        class: 'h-7 rounded-sm transition duration-300 text-sm text-gray-400 hover:bg-crusoe-500 hover:text-white dark:hover:bg-crusoe-500',
                        title: 'Edit',
                        onClick: () => runAction('edit'),
                    },
                    () => (iconOnly ? [h(Pencil, { class: 'h-4 w-4' })] : [h(Pencil, { class: 'mr-1 h-4 w-4' }), 'Edit']),
                ),
            ]);
        };
    },
});

export const components = {
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const createColumnDefs = (
    onEditRow: (row: RowTenagaMedis) => void,
    onDeleteRow: (row: RowTenagaMedis) => void
): ColDef<RowTenagaMedis>[] => [
        {
            headerName: 'Aksi',
            colId: 'actions',
            suppressMovable: true,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            sortable: false,
            filter: false,
            width: 110,
            cellRenderer: 'actionButtonsRenderer',
            cellRendererParams: {
                onEdit: onEditRow,
                onDelete: onDeleteRow,
                displayMode: 'icon-only',
            },
        },

        {
            field: 'data.nrp',
            headerName: 'NRP',
            filter: 'agTextColumnFilter',
            filterParams: {
                filterOptions: ['equals'],
                maxNumConditions: 1,
            } as ITextFilterParams, sortable: false
        },
        { field: 'data.nama', headerName: 'Nama Lengkap', filter: false, sortable: false },
        {
            field: 'data.tgllahir', headerName: 'Tgl. Lahir', filter: false,
            valueFormatter: params => params.value ? formatDate(params.value.toString(), false) : '', sortable: false
        },
        { field: 'data.alamat', headerName: 'Alamat', filter: false, sortable: false },

        { field: 'data.pangkat', headerName: 'Pangkat', filter: false, sortable: false },
        { field: 'data.unit_rawat', headerName: 'UnitRawat', filter: false, sortable: false },
        { field: 'data.faskes', headerName: 'Faskes', filter: false, sortable: false },
        { field: 'data.lokasi', headerName: 'Dislokasi', filter: false, sortable: false },
        {
            field: 'data.tglmasukunit_rawat', headerName: 'Tgl. Masuk UnitRawat', filter: false,
            valueFormatter: params => params.value ? formatDate(params.value.toString(), false) : ''
        },
    ];


// Fetch API
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
const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }
    return columnId;
};

const autoSizeGridColumns = (api: GridApi<RowTenagaMedis>): void => {
    const autoSizeApi = api as GridApi<RowTenagaMedis> & {
        autoSizeAllColumns?: (skipHeader?: boolean) => void;
    };

    requestAnimationFrame(() => {
        if (autoSizeApi.autoSizeAllColumns) {
            autoSizeApi.autoSizeAllColumns(false);
            return;
        }

        api.sizeColumnsToFit();
    });
};

const buildServerDatasource = (): IServerSideDatasource<RowTenagaMedis> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RowTenagaMedis>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<RowTenagaMedis> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);
            try {
                rowParams.api.setGridOption('loading', true);
                const response = await axiosJS.post(
                    listdatapersonil.url(),
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

                autoSizeGridColumns(rowParams.api);
            } catch {
                rowParams.fail();
            } finally {
                rowParams.api.setGridOption('loading', false);
            }
        },
    };
};



export const onGridReady = (params: GridReadyEvent<RowTenagaMedis>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
    autoSizeGridColumns(params.api);
}
export const onPaginationChanged = (params: PaginationChangedEvent<RowTenagaMedis>) => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

export const isAdvancedFilterVisible = ref(false);
const gridApi = ref<GridApi<RowTenagaMedis> | null>(null);
type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};
type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};

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
        const advancedFilterApi = api as GridApiWithAdvancedFilter<RowTenagaMedis>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};
export const deleteSelectedRow = (row?: RowTenagaMedis | null): void => {
    const api = gridApi.value;
    if (!api) {
        return;
    }
    const rowsToRemove = row ? [row] : api.getSelectedRows();
    if (rowsToRemove.length === 0) {
        return;
    }
    const serverSideApi = api as GridApiWithServerSideTransaction<RowTenagaMedis>;
    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }
    api.applyTransaction({ remove: rowsToRemove });
};

