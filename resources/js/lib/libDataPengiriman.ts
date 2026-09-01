import type {
    ColDef,
    FirstDataRenderedEvent,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
    IServerSideDatasource,
    IServerSideGetRowsParams,
    PaginationChangedEvent,
} from 'ag-grid-community';
import { CircleAlert, Trash2 } from 'lucide-vue-next';
import { defineComponent, h, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dataPengirimanListdata } from '@/routes';
import axiosJS from '@lib/libAxios';
import { formatDate, isResponseSuccess } from './libUtils';

export interface RowPengiriman {
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    createdBy: string;
    status: number;
    statusLabel: string;
    note: string;
    updatedAt: string;
    createdAt: string;
}

export const gridApi = ref<GridApi<RowPengiriman> | null>(null);

export type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};

type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};

type ActionRendererParams = ICellRendererParams<RowPengiriman> & {
    onInfo?: (row: RowPengiriman) => void;
    onDelete?: (row: RowPengiriman) => void;
};

export const StatusBadgeRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ICellRendererParams<RowPengiriman> & { value?: unknown },
            required: true,
        },
    },
    setup(props) {
        const getClass = (): string => {
            const status = Number(props.params.data?.status ?? 0);

            if (status === 9) {
                return 'bg-red-500 text-white hover:bg-red-500';
            }

            if (status === 4) {
                return 'bg-green-500 text-white hover:bg-green-500';
            }

            if (status === 3) {
                return 'bg-amber-500 text-white hover:bg-amber-500';
            }

            if (status === 2) {
                return 'bg-blue-500 text-white hover:bg-blue-500';
            }

            return 'bg-gray-500 text-white hover:bg-gray-500';
        };

        return () => h(Badge, { class: getClass() }, () => String(props.params.value ?? '-'));
    },
});

export const ActionButtonsRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ActionRendererParams,
            required: true,
        },
    },
    setup(props) {
        const runAction = (action: 'info' | 'delete'): void => {
            const row = props.params.data;

            if (!row) {
                return;
            }

            if (action === 'info') {
                props.params.onInfo?.(row);
            }

            if (action === 'delete') {
                props.params.onDelete?.(row);
            }
        };

        return () =>
            h('div', { class: 'flex h-full items-center gap-2' }, [
                // h(
                //     Button,
                //     {
                //         size: 'sm',
                //         variant: 'outline',
                //         class: 'h-7 rounded-sm text-sm text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white',
                //         title: 'Info Monitoring',
                //         onClick: () => runAction('info'),
                //     },
                //     () => [h(CircleAlert, { class: 'h-4 w-4' })],
                // ),
                h(
                    Button,
                    {
                        size: 'sm',
                        class: 'h-7 rounded-sm bg-red-400 transition duration-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50',
                        title: 'Hapus',
                        disabled: Number(props.params.data?.status ?? 0) >= 2,
                        onClick: () => runAction('delete'),
                    },
                    () => [h(Trash2, { class: 'h-4 w-4' })],
                ),
            ]);
    },
});

export const components = {
    statusBadgeRenderer: StatusBadgeRenderer,
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const defaultColDef: ColDef<RowPengiriman> = {
    sortable: true,
    filter: false,
};

export const createColumnDefs = (
    onInfoRow: (row: RowPengiriman) => void,
    onDeleteRow: (row: RowPengiriman) => void,
): ColDef<RowPengiriman>[] => [
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
                // onInfo: onInfoRow,
                onDelete: onDeleteRow,
            },
        },
        { field: 'uid', headerName: 'Box UID', minWidth: 150, filter: 'agTextColumnFilter' },
        { field: 'nan', headerName: 'Nomor Alokasi', minWidth: 180, filter: 'agTextColumnFilter' },
        { field: 'unit_rawat', headerName: 'UnitRawat Penerima', minWidth: 220, filter: 'agTextColumnFilter' },
        { field: 'periode', headerName: 'Periode', minWidth: 130, filter: 'agTextColumnFilter' },

        {
            field: 'statusLabel',
            headerName: 'Status Monitoring',
            minWidth: 170,
            filter: 'agTextColumnFilter',
            cellRenderer: 'statusBadgeRenderer',
        },
        {
            field: 'note', headerName: 'Catatan Terakhir', minWidth: 230, filter: 'agTextColumnFilter',
            valueFormatter: ({ value }) => (value ? value : '-')
        },
        {
            field: 'createdBy',
            headerName: 'Dibuat Oleh',
            minWidth: 220,
            sortable: false,
            filter: false,
            valueFormatter: ({ value }) => (value ? String(value) : '-'),
        },
        {
            field: 'updatedAt',
            headerName: 'Update Terakhir',
            minWidth: 190,
            filter: false,
            valueFormatter: ({ value }) => (value ? formatDate(String(value), true) : '-'),
        },
    ];

const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }

    if (columnId === 'nan') {
        return 'id_nan';
    }

    if (columnId === 'updatedAt') {
        return 'last_event_at';
    }

    if (columnId === 'statusLabel') {
        return 'last_event_status';
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

const autoSizeGridColumns = (api: GridApi<RowPengiriman>): void => {
    const autoSizeApi = api as GridApi<RowPengiriman> & {
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

const buildServerDatasource = (): IServerSideDatasource<RowPengiriman> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RowPengiriman>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<RowPengiriman> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);

            try {
                rowParams.api.setGridOption('loading', true);

                const response = await axiosJS.post(
                    dataPengirimanListdata.url(),
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

                autoSizeGridColumns(rowParams.api);
            } catch {
                rowParams.fail();
            } finally {
                rowParams.api.setGridOption('loading', false);
            }
        },
    };
};

export const onGridReady = (params: GridReadyEvent<RowPengiriman>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

export const onFirstDataRendered = (params: FirstDataRenderedEvent<RowPengiriman>): void => {
    autoSizeGridColumns(params.api);
};

export const onPaginationChanged = (params: PaginationChangedEvent<RowPengiriman>): void => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

export const deleteSelectedRow = (row?: RowPengiriman | null): void => {
    const api = gridApi.value;

    if (!api) {
        return;
    }

    const rowsToRemove = row ? [row] : api.getSelectedRows();

    if (rowsToRemove.length === 0) {
        return;
    }

    const serverSideApi = api as GridApiWithServerSideTransaction<RowPengiriman>;

    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }

    api.applyTransaction({ remove: rowsToRemove });
};
