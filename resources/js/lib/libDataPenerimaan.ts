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
import { CircleAlert } from 'lucide-vue-next';
import { defineComponent, h, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dataPenerimaanListdata } from '@/routes';
import axiosJS from '@lib/libAxios';
import { formatDate, isResponseSuccess } from './libUtils';

export interface RowPenerimaan {
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

export const gridApi = ref<GridApi<RowPenerimaan> | null>(null);

export type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};

type ActionRendererParams = ICellRendererParams<RowPenerimaan> & {
    onInfo?: (row: RowPenerimaan) => void;
};

export const StatusBadgeRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ICellRendererParams<RowPenerimaan> & { value?: unknown },
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
        const showInfo = (): void => {
            const row = props.params.data;

            if (!row) {
                return;
            }

            props.params.onInfo?.(row);
        };

        return () =>
            h('div', { class: 'flex h-full items-center gap-2' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'outline',
                        class: 'h-7 rounded-sm text-sm text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white',
                        title: 'Informasi Penerimaan',
                        onClick: showInfo,
                    },
                    () => [h(CircleAlert, { class: 'h-4 w-4' })],
                ),
            ]);
    },
});

export const components = {
    statusBadgeRenderer: StatusBadgeRenderer,
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const defaultColDef: ColDef<RowPenerimaan> = {
    sortable: true,
    filter: false,
};

export const createColumnDefs = (
    onInfoRow: (row: RowPenerimaan) => void,
    isAdmin: boolean,
): ColDef<RowPenerimaan>[] => {
    const baseColumns: ColDef<RowPenerimaan>[] = [
        {
            headerName: 'Aksi',
            colId: 'actions',
            suppressMovable: true,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            sortable: false,
            filter: false,
            width: 85,
            cellRenderer: 'actionButtonsRenderer',
            cellRendererParams: {
                onInfo: onInfoRow,
            },
        },
        { field: 'uid', headerName: 'Box UID', minWidth: 150, filter: 'agTextColumnFilter' },
        { field: 'nan', headerName: 'Nomor Alokasi', minWidth: 180, filter: 'agTextColumnFilter' },
        { field: 'periode', headerName: 'Periode', minWidth: 130, filter: 'agTextColumnFilter' },
        {
            field: 'statusLabel',
            headerName: 'Status Penerimaan',
            minWidth: 170,
            filter: 'agTextColumnFilter',
            cellRenderer: 'statusBadgeRenderer',
        },
        {
            field: 'note',
            headerName: 'Catatan Terakhir',
            minWidth: 230,
            filter: 'agTextColumnFilter',
            valueFormatter: ({ value }) => (value ? value : '-'),
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

    if (isAdmin) {
        baseColumns.splice(3, 0, {
            field: 'unit_rawat',
            headerName: 'UnitRawat Penerima',
            minWidth: 220,
            filter: 'agTextColumnFilter',
        });
    }

    return baseColumns;
};

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

const autoSizeGridColumns = (api: GridApi<RowPenerimaan>): void => {
    const autoSizeApi = api as GridApi<RowPenerimaan> & {
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

const buildServerDatasource = (): IServerSideDatasource<RowPenerimaan> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<RowPenerimaan>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<RowPenerimaan> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);

            try {
                rowParams.api.setGridOption('loading', true);

                const response = await axiosJS.post(
                    dataPenerimaanListdata.url(),
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

export const onGridReady = (params: GridReadyEvent<RowPenerimaan>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

export const onFirstDataRendered = (params: FirstDataRenderedEvent<RowPenerimaan>): void => {
    autoSizeGridColumns(params.api);
};

export const onPaginationChanged = (params: PaginationChangedEvent<RowPenerimaan>): void => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};
