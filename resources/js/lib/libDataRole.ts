import type { ColDef, GridApi, ICellRendererParams } from "ag-grid-community";
import { Pencil, Trash2 } from "lucide-vue-next";
import { defineComponent, h, ref } from "vue";
import { Button } from "@/components/ui/button";
import type { ActionButtonDisplayMode } from "@lib/libAgGrid";

export type RoleRow = {
    id: number;
    name: string;
    guardName: string;
    permissionsCount: number;
    displayName: string;
};
export const gridApi = ref<GridApi<RoleRow> | null>(null);

type ActionRendererParams = ICellRendererParams<RoleRow> & {
    onEdit?: (row: RoleRow) => void;
    onDelete?: (row: RoleRow) => void;
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
            const row = props.params.data;
            const isAdminPusat = row?.name === 'admin_pusat';

            return h('div', { class: 'flex h-full items-center gap-2' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'outline',
                        class: 'h-7 rounded-sm transition duration-300 text-sm text-gray-400 hover:bg-crusoe-500 hover:text-white',
                        title: 'Edit',
                        onClick: () => runAction('edit'),
                    },
                    () => (iconOnly ? [h(Pencil, { class: 'h-4 w-4' })] : [h(Pencil, { class: 'mr-1 h-4 w-4' }), 'Edit']),
                ),
                // !isAdminPusat && h(
                h(
                    Button,
                    {
                        size: 'sm',
                        class: 'h-7 rounded-sm bg-red-400 hover:bg-red-500 transition duration-300',
                        title: 'Hapus',
                        disabled: isAdminPusat,
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


// Columnt
export const createColumnDefs = (
    onEditRow: (row: RoleRow) => void,
    onDeleteRow: (row: RoleRow) => void
): ColDef<RoleRow>[] => [
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
        { field: 'displayName', headerName: 'Nama Roles', filter: 'agTextColumnFilter' },
        { field: 'permissionsCount', headerName: 'Jumlah Permission', filter: false },

    ];


type GridApiWithServerSideTransaction<TData> = GridApi<TData> & {
    applyServerSideTransaction?: (transaction: { remove?: TData[] }) => void;
};

export const deleteSelectedRow = (row?: RoleRow | null): void => {
    const api = gridApi.value;
    if (!api) {
        return;
    }
    const rowsToRemove = row ? [row] : api.getSelectedRows();
    if (rowsToRemove.length === 0) {
        return;
    }
    const serverSideApi = api as GridApiWithServerSideTransaction<RoleRow>;
    if (serverSideApi.applyServerSideTransaction) {
        serverSideApi.applyServerSideTransaction({ remove: rowsToRemove });
        return;
    }
    api.applyTransaction({ remove: rowsToRemove });
};
