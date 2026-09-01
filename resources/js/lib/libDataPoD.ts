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
import { ImageIcon, Trash2 } from 'lucide-vue-next';
import { defineComponent, h, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { dataPodListdata } from '@/routes';
import axiosJS from '@lib/libAxios';
import { formatDate, isResponseSuccess } from './libUtils';

export interface RowPoD {
    id: number;
    nsn: string;
    itemNsn?: string;
    itemNsnDetail?: string;
    itemDetail?: string;
    nrp: string;
    nama: string;
    pangkat: string;
    pengirimanUid: string;
    file: string;
    createdAt: string;
    itemJenis?: string;
    itemUkuran?: string;
    itemKategori?: string;
    status: number;
    keterangan: string;
}

export const gridApi = ref<GridApi<RowPoD> | null>(null);

type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};

type ActionRendererParams = ICellRendererParams<RowPoD> & {
    onDelete?: (row: RowPoD) => void;
    onPreview?: (row: RowPoD) => void;
};

export const ActionButtonsRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ActionRendererParams,
            required: true,
        },
    },
    setup(props) {
        const runAction = (action: 'delete' | 'preview'): void => {
            const row = props.params.data;

            if (!row) {
                return;
            }

            if (action === 'delete') {
                props.params.onDelete?.(row);
            }

            if (action === 'preview') {
                props.params.onPreview?.(row);
            }
        };

        const isPreviewDisabled = (): boolean => {
            return props.params.data?.status === 2;
        };

        return () =>
            h('div', { class: 'flex h-full items-center gap-2' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'outline',
                        disabled: isPreviewDisabled(),
                        class: 'h-7 rounded-sm text-sm text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                        title: isPreviewDisabled() ? 'Preview tidak tersedia untuk data yang dibatalkan' : 'Lihat Foto',
                        onClick: () => !isPreviewDisabled() && runAction('preview'),
                    },
                    () => [h(ImageIcon, { class: 'h-4 w-4' })],
                ),
                h(
                    Button,
                    {
                        size: 'sm',
                        class: 'h-7 rounded-sm bg-red-400 transition duration-300 hover:bg-red-500',
                        title: 'Hapus',
                        onClick: () => runAction('delete'),
                    },
                    () => [h(Trash2, { class: 'h-4 w-4' })],
                ),
            ]);
    },
});

export const components = {
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const defaultColDef: ColDef<RowPoD> = {
    sortable: true,
    filter: false,
};

export const createColumnDefs = (
    onDeleteRow: (row: RowPoD) => void,
    onPreviewRow: (row: RowPoD) => void,
    onItemNsnClick: (row: RowPoD) => void,
): ColDef<RowPoD>[] => [
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
                onDelete: onDeleteRow,
                onPreview: onPreviewRow,
            },
        },
        { field: 'nsn', headerName: 'NSN', minWidth: 150, filter: 'agTextColumnFilter' },
        { field: 'nrp', headerName: 'NRP', minWidth: 160, sortable: false, filter: false },
        { field: 'nama', headerName: 'Nama TenagaMedis', minWidth: 200, sortable: false, filter: false },
        { field: 'pangkat', headerName: 'Pangkat', minWidth: 200, sortable: false, filter: false },
        { field: 'pengirimanUid', headerName: 'Box UID', minWidth: 170, filter: 'agTextColumnFilter' },
        {
            field: 'itemNsn',
            headerName: 'Item NSN',
            minWidth: 190,
            filter: 'agTextColumnFilter',
            valueGetter: ({ data }) => data?.itemNsn ?? data?.nsn ?? '-',
            cellClass: 'cursor-pointer text-blue-600 underline',
            onCellClicked: ({ data }) => {
                if (!data) {
                    return;
                }
                onItemNsnClick(data);
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 180,
            filter: false,
            sortable: false,
            valueFormatter: ({ data }) => {
                if (!data) return '-';
                const status = data.status;
                const keterangan = data.keterangan || '';
                if (status === 1) {
                    return `Telah Diserahkan${keterangan ? ` - ${keterangan}` : ''}`;
                } else if (status === 2) {
                    return `Dibatalkan Penyerahan${keterangan ? ` - ${keterangan}` : ''}`;
                }
                return keterangan || '-';
            },
        },
        {
            field: 'createdAt',
            headerName: 'Tanggal Penyaluran',
            minWidth: 190,
            filter: false,
            valueFormatter: ({ value }) => (value ? formatDate(String(value), true) : '-'),
        },
    ];

const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
    }

    if (columnId === 'itemNsn') {
        return 'nsn';
    }

    if (columnId === 'createdAt') {
        return 'created_at';
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
        colId: mapColumnToApiField(columnId) ?? columnId,
        ...(condition as Record<string, unknown>),
    };
};

const autoSizeGridColumns = (api: GridApi<RowPoD>): void => {
    const autoSizeApi = api as GridApi<RowPoD> & {
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

const buildServerDatasource = (): IServerSideDatasource<RowPoD> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RowPoD>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);

            try {
                rowParams.api.setGridOption('loading', true);

                const response = await axiosJS.post(
                    dataPodListdata.url(),
                    {
                        page,
                        perPage,
                        sortField,
                        sortDirection: firstSort?.sort ?? null,
                        filterModel: normalizedFilterModel,
                        advancedFilterModel: normalizedFilterModel,
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

export const onGridReady = (params: GridReadyEvent<RowPoD>): void => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

export const onFirstDataRendered = (params: FirstDataRenderedEvent<RowPoD>): void => {
    autoSizeGridColumns(params.api);
};

export const onPaginationChanged = (params: PaginationChangedEvent<RowPoD>): void => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};

export const getRowStyle = (params: { data?: RowPoD }): Record<string, string | number> | undefined => {
    console.log(params.data?.status);

    if (params.data?.status === 2) {
        return {
            backgroundColor: '#fee2e2',
            borderTop: '1px solid #fca5a5',
            borderBottom: '1px solid #fca5a5'
        };
    }
    return undefined;
};

export const deleteSelectedRow = (row?: RowPoD | null): void => {
    const api = gridApi.value;

    if (!api) {
        return;
    }

    const rowsToRemove = row ? [row] : api.getSelectedRows();

    if (rowsToRemove.length === 0) {
        return;
    }

    const serverSideApi = api as GridApiWithServerSideTransaction<RowPoD>;

    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }

    api.applyTransaction({ remove: rowsToRemove });
};
