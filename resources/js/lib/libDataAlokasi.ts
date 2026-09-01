import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams, IDetailCellRendererParams, IServerSideDatasource, IServerSideGetRowsParams, PaginationChangedEvent } from "ag-grid-community";
import { CheckCircle, Pencil, Trash2 } from "lucide-vue-next";
import { defineComponent, h, ref } from "vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dataListAlokasi } from "@/routes";
import axiosJS from '@lib/libAxios';
import { isJson, isResponseSuccess } from "./libUtils";

export const gridApi = ref<GridApi<AlokasiRow> | null>(null);

export interface AlokasiDetailRow {
    id: number;
    // nsn: string;
    jenis: unknown;
    ukuran: unknown;
    kategori: unknown;
    tenaga_medis?: string;
    jumlah: number;
}

export interface AlokasiRow {
    id: number;
    nan: string;
    periode: string;
    status: string;
    namaUnitRawat: string;
    jumlahItem: number;
    totalJumlah: number;
    details: AlokasiDetailRow[];
}

export type StatusRendererParams = {
    value?: unknown;
};

export const StatusBadgeRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => StatusRendererParams,
            required: true,
        },
    },
    setup(props) {
        const getStatusVariant = (value: unknown): 'default' | 'outline' | 'secondary' | 'destructive' => {
            if (String(value) === '1') return 'default';
            if (String(value) === '2') return 'destructive';
            if (String(value) === '100') return 'secondary';
            if (String(value) === '110') return 'default';
            return 'outline';
        };

        const getStatusLabel = (value: unknown): string => {
            if (String(value) === '1') return 'OPEN';
            if (String(value) === '2') return 'LOCK';
            if (String(value) === '100') return 'DISETUJUI';
            if (String(value) === '110') return 'DISETUJUI PUSAT';
            return String(value ?? '-');
        };
        return () => h(Badge, {
            variant: getStatusVariant(props.params.value),
            class: String(props.params.value) === '100'
                ? 'bg-yellow-400 hover:bg-yellow-500 text-white border-transparent'
                : String(props.params.value) === '110'
                    ? 'bg-blue-400 hover:bg-blue-500 text-white border-transparent'
                    : '',
        }, () => getStatusLabel(props.params.value));
        // return () => h(Badge, { variant: getStatusVariant(props.params.value) }, () => getStatusLabel(props.params.value));
    },
});

export type ActionRendererParams = ICellRendererParams<AlokasiRow> & {
    onEdit?: (row: AlokasiRow) => void;
    onDelete?: (row: AlokasiRow) => void;
    onAcc?: (row: AlokasiRow) => void;
    onAcc2?: (row: AlokasiRow) => void;
    displayMode?: 'icon-only' | 'icon-text';
};

export const ActionButtonsRenderer = defineComponent({
    props: {
        params: {
            type: Object as () => ActionRendererParams,
            required: true,
        },
    },
    setup(props) {
        const isEditAccDisabled = (): boolean => {
            const row = props.params.data;
            if (!row) return true;
            return String(row.status) === '2' || String(row.status) === '110';
        };

        const isAcc2Disabled = (): boolean => {
            const row = props.params.data;
            if (!row) return true;
            return String(row.status) !== '100';
        };

        const isDeleteDisabled = (): boolean => {
            const row = props.params.data;
            if (!row) return true;
            return String(row.status) === '2';
        };

        const runAction = (action: 'edit' | 'acc' | 'acc2' | 'delete'): void => {
            const row = props.params.data;

            if (!row) return;
            if (action === 'delete' && isDeleteDisabled()) return;
            if ((action === 'edit' || action === 'acc') && isEditAccDisabled()) return;

            if (action === 'edit') props.params.onEdit?.(row);
            if (action === 'acc') props.params.onAcc?.(row);
            if (action === 'acc2') props.params.onAcc2?.(row);
            if (action === 'delete') props.params.onDelete?.(row);
        };

        return () => {
            const iconOnly = (props.params.displayMode ?? 'icon-only') === 'icon-only';
            const editAccDisabled = isEditAccDisabled();
            const acc2Disabled = isAcc2Disabled();
            const deleteDisabled = isDeleteDisabled();
            const showAcc = typeof props.params.onAcc === 'function';
            const showAcc2 = typeof props.params.onAcc2 === 'function';

            const buttons = [
                h(Button, {
                    size: 'sm',
                    variant: 'outline',
                    class: 'h-7 rounded-sm transition duration-300 text-sm text-gray-400 hover:bg-crusoe-500 hover:text-white',
                    title: 'Edit',
                    disabled: editAccDisabled,
                    onClick: () => runAction('edit'),
                }, () => iconOnly ? [h(Pencil, { class: 'h-4 w-4' })] : [h(Pencil, { class: 'mr-1 h-4 w-4' }), 'Edit']),
            ];

            if (showAcc) {
                buttons.push(h(Button, {
                    size: 'sm',
                    variant: 'outline',
                    class: 'h-7 rounded-sm transition duration-300 text-sm text-green-600 border-green-300 hover:bg-green-500 hover:text-white',
                    title: 'Setujui',
                    disabled: editAccDisabled,
                    onClick: () => runAction('acc'),
                }, () => iconOnly ? [h(CheckCircle, { class: 'h-4 w-4' })] : [h(CheckCircle, { class: 'mr-1 h-4 w-4' }), 'Acc']));
            }

            if (showAcc2) {
                buttons.push(h(Button, {
                    size: 'sm',
                    variant: 'outline',
                    class: 'h-7 rounded-sm transition duration-300 text-sm text-blue-600 border-blue-300 hover:bg-blue-500 hover:text-white',
                    title: 'Setujui (pusat)',
                    disabled: acc2Disabled,
                    onClick: () => runAction('acc2'),
                }, () => iconOnly ? [h(CheckCircle, { class: 'h-4 w-4' })] : [h(CheckCircle, { class: 'mr-1 h-4 w-4' }), 'Acc2']));
            }

            buttons.push(h(Button, {
                size: 'sm',
                class: 'h-7 rounded-sm bg-red-400 hover:bg-red-500 transition duration-300',
                title: 'Hapus',
                disabled: deleteDisabled,
                onClick: () => runAction('delete'),
            }, () => iconOnly ? [h(Trash2, { class: 'h-4 w-4' })] : [h(Trash2, { class: 'mr-1 h-4 w-4' }), 'Hapus']));

            return h('div', { class: 'flex h-full items-center gap-2' }, buttons);
        };
    },
});

export const components = {
    statusBadgeRenderer: StatusBadgeRenderer,
    actionButtonsRenderer: ActionButtonsRenderer,
};

export const createColumnDefs = (
    onEditRow: (row: Record<string, any>) => void,
    onDeleteRow: (row: Record<string, any>) => void,
    onAcc?: (row: Record<string, any>) => void,
    onAcc2?: (row: Record<string, any>) => void,
): ColDef<AlokasiRow>[] => [
        {
            headerName: 'Aksi',
            colId: 'actions',
            suppressMovable: true,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            sortable: false,
            filter: false,
            width: 200,
            cellRenderer: 'actionButtonsRenderer',
            cellRendererParams: {
                onEdit: onEditRow,
                onDelete: onDeleteRow,
                ...((onAcc) ? { onAcc } : {}),
                ...((onAcc2) ? { onAcc2 } : {}),
                displayMode: 'icon-only',
            },
        },
        { field: 'nan', headerName: 'Nomor Alokasi Nasional', cellRenderer: 'agGroupCellRenderer', minWidth: 300, filter: 'agTextColumnFilter' },
        { field: 'periode', headerName: 'Periode', width: 120, filter: 'agTextColumnFilter' },
        { field: 'namaUnitRawat', headerName: 'UnitRawat Penerima', minWidth: 200, filter: 'agTextColumnFilter' },
        { field: 'jumlahItem', headerName: 'Jml. Alokasi', maxWidth: 110, filter: false },
        { field: 'totalJumlah', headerName: 'Total Jumlah', width: 110, filter: false },
        {
            field: 'status',
            headerName: 'Status',
            maxWidth: 150,
            filter: false,
            cellRenderer: 'statusBadgeRenderer',
        },
    ];

export const detailCellRendererParams = ref<any>({
    detailGridOptions: {
        suppressCellFocus: true,
        rowSelection: 'single',
        columnDefs: [
            // { field: 'nsn', headerName: 'NAN', minWidth: 150 },
            {
                field: 'jenis',
                headerName: 'Jenis',
                minWidth: 140,
                valueFormatter: ({ value }) => {
                    if (typeof value === 'string' && isJson(value)) {
                        return JSON.parse(value).name ?? '-';
                    }

                    if (value && typeof value === 'object') {
                        return (value as { name?: string }).name ?? '-';
                    }

                    return '-';
                },
            },
            {
                field: 'ukuran',
                headerName: 'Ukuran',
                minWidth: 140,
                valueFormatter: ({ value }) => {
                    if (typeof value === 'string' && isJson(value)) {
                        return JSON.parse(value).name ?? '-';
                    }

                    if (value && typeof value === 'object') {
                        return (value as { name?: string }).name ?? '-';
                    }

                    return '-';
                },
            },
            {
                field: 'kategori',
                headerName: 'Kategori',
                minWidth: 140,
                valueFormatter: ({ value }) => {
                    if (typeof value === 'string' && isJson(value)) {
                        return JSON.parse(value).name ?? '-';
                    }

                    if (value && typeof value === 'object') {
                        return (value as { name?: string }).name ?? '-';
                    }

                    return '-';
                },
            },
            { field: 'tenaga_medis', headerName: 'Nakes', minWidth: 220, filter: false },
            { field: 'jumlah', headerName: 'Jumlah', minWidth: 120 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.details ?? []);
    },
} as IDetailCellRendererParams<AlokasiRow, AlokasiDetailRow>);

export type GridApiWithAdvancedFilter<TData> = GridApi<TData> & {
    setAdvancedFilterModel?: (model: unknown) => void;
    getAdvancedFilterModel?: () => unknown;
};

const mapColumnToApiField = (columnId?: string): string | null => {
    if (!columnId) {
        return null;
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

export const buildServerDatasource = (): IServerSideDatasource<AlokasiRow> => {
    return {
        getRows: async (rowParams: IServerSideGetRowsParams<AlokasiRow>) => {
            const startRow = rowParams.request.startRow ?? 0;
            const endRow = rowParams.request.endRow ?? 10;
            const perPage = Math.max(endRow - startRow, 1);
            const page = Math.floor(startRow / perPage) + 1;
            const firstSort = rowParams.request.sortModel?.[0];
            const sortField = mapColumnToApiField(firstSort?.colId);
            const advancedFilterApi = gridApi.value as GridApiWithAdvancedFilter<AlokasiRow> | null;
            const advancedFilterModelFromApi = advancedFilterApi?.getAdvancedFilterModel?.() ?? null;
            const advancedFilterModelFromRequest = (rowParams.request as { advancedFilterModel?: unknown }).advancedFilterModel ?? null;
            const filterModelFromRequest = (rowParams.request as { filterModel?: unknown }).filterModel ?? null;
            const normalizedFilterModel = normalizeFilterModelForApi(filterModelFromRequest);

            try {
                rowParams.api.setGridOption('loading', true);

                const response = await axiosJS.post(
                    dataListAlokasi.url(),
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
                rowParams.api.setGridOption('loading', false);
            }
        },
    };
};

export const onGridReady = (params: GridReadyEvent<AlokasiRow>) => {
    gridApi.value = params.api;
    params.api.setGridOption('serverSideDatasource', buildServerDatasource());
};

export const onPaginationChanged = (params: PaginationChangedEvent<AlokasiRow>) => {
    const pageSize = params.api.paginationGetPageSize();
    const currentCacheBlockSize = params.api.getGridOption('cacheBlockSize') ?? 10;

    if (currentCacheBlockSize !== pageSize) {
        params.api.setGridOption('cacheBlockSize', pageSize);
        params.api.refreshServerSide({ purge: true });
    }
};
