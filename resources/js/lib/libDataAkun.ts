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
import { Pencil, Trash2 } from "lucide-vue-next";
import { defineComponent, h, ref } from "vue";
import { Button } from "@/components/ui/button";
import { dataakunListdata } from "@/routes";
import type { ActionButtonDisplayMode } from "@lib/libAgGrid";
import axiosJS from '@lib/libAxios';
import { formatDate } from "@lib/libUtils";

export type RowUser = {
    id: number;
    tenaga_medis_nrp?: string;
    tenaga_medis_nama?: string;
    tenaga_medis_role?: string;
    tenaga_medis_unit_rawat?: string;
    email?: string;
    email_verified_at?: string;
    password?: string;
    remember_token?: string;
    username?: string;
    nrp?: string;
    rank?: string;
    position?: string;
    unit_id?: string;
    is_active?: string;
    last_login_at?: string;
    created_by?: string;
    created_at?: Date;
};


type ActionRendererParams = ICellRendererParams<RowUser> & {
    onEdit?: (row: RowUser) => void;
    onDelete?: (row: RowUser) => void;
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
    onEditRow: (row: RowUser) => void,
    onDeleteRow: (row: RowUser) => void
): ColDef<RowUser>[] => [
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
            field: 'tenaga_medis_nama', headerName: 'Nama User', filter: 'agTextColumnFilter',
            cellRenderer: (params: any) => {
                const value = params.data;
                if (value.tenaga_medis_nama && value.tenaga_medis_nrp) {
                    return `${value.tenaga_medis_nrp} - ${value.tenaga_medis_nama}`;
                }
            }
        },
        { field: 'username', headerName: 'Username', filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
        { field: 'tenaga_medis_role', headerName: 'Role', filter: 'agTextColumnFilter' },
        {
            field: 'is_active', headerName: 'Status', width: 110, filter: 'agSetColumnFilter',
            filterParams: {
                values: ['true', 'false'],
                valueFormatter: (params: any) => {
                    return params.value === true || params.value === 'true'
                        ? 'Aktif'
                        : 'Tidak Aktif';
                },
            },
            valueFormatter: params =>
                params.value === true || params.value === 'true'
                    ? 'Aktif'
                    : 'Tidak Aktif',
            cellRenderer: (params: any) => {
                const value = params.value;
                if (value === 1 || value === true || value === '1') {
                    return `<span class="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-500  dark:text-green-400 inset-ring inset-ring-green-500/20">Aktif</span>`;
                }
                return `<span class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">Tidak Aktif</span>`;
            }
        },
        { field: 'tenaga_medis_unit_rawat', headerName: 'UnitRawat', filter: 'agTextColumnFilter' },
        { field: 'created_by', headerName: 'Dibuat Oleh', filter: 'agTextColumnFilter' },
        {
            field: 'created_at', headerName: 'Dibuat Pada', filter: 'agDateColumnFilter',
            valueFormatter: params => params.value ? formatDate(params.value.toString()) : '',
        },

    ];


// Fetch API
const normalizeFilterModelForApi = (filterModel: unknown): unknown => {
    if (!filterModel || typeof filterModel !== 'object') {
        return null;
    }

    return filterModel;
};
const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }
    return columnId;
};
const buildServerDatasource = (): IServerSideDatasource<RowUser> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RowUser>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<RowUser> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);
            try {
                rowParams.api.setGridOption('loading', true);
                const response = await axiosJS.post(
                    dataakunListdata.url(),
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

type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};

export const deleteSelectedRow = (row?: RowUser | null): void => {
    const api = gridApi.value;
    if (!api) {
        return;
    }
    const rowsToRemove = row ? [row] : api.getSelectedRows();
    if (rowsToRemove.length === 0) {
        return;
    }
    const serverSideApi = api as GridApiWithServerSideTransaction<RowUser>;
    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }
    api.applyTransaction({ remove: rowsToRemove });
};




export const onGridReady = (params: GridReadyEvent<RowUser>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
}
export const onPaginationChanged = (params: PaginationChangedEvent<RowUser>) => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

export const onFirstDataRendered = (params: FirstDataRenderedEvent<RowUser>): void => {
    params.api.autoSizeColumns(['tenaga_medis_nama']);
};

export const isAdvancedFilterVisible = ref(false);
const gridApi = ref<GridApi<RowUser> | null>(null);
type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
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
        const advancedFilterApi = api as GridApiWithAdvancedFilter<RowUser>;
        advancedFilterApi.setAdvancedFilterModel?.(null);
        api.setFilterModel(null);
        api.refreshServerSide({ purge: true });
    }
};
