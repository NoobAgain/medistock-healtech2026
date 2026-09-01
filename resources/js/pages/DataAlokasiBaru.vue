<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';
import { useColorMode } from '@vueuse/core';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { ArrowBigLeft, CirclePlus, Loader2, RotateCw, Trash2 } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm, Form } from 'vee-validate';
import { computed, defineComponent, h, nextTick, onMounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import ModalDialog from '@/components/composable/ModalDialog.vue';
import SelectWithCreate from '@/components/composable/SelectWithCreate.vue';
import PeriodeFieldManager from '@/components/data-alokasi/PeriodeFieldManager.vue';
import UnitRawatFieldManager from '@/components/data-tenaga_medis/UnitRawatFieldManager.vue';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { AG_GRID_LOCALE_ID, CustomLoadingOverlay, greenTema, greenTemaLight } from '@/lib/libAgGrid';
import libGlowEffect from '@/lib/libGlowEffect';
import { findItemBySelectedId, isJson, isResponseSuccess, requiredSelectSchema } from '@/lib/libUtils';
import {
    dataAlokasi,
    dataAlokasiAddEdit,
    dataAlokasiNan,
    dataSatuan,
    dataSatuanBaru,
    dataSatuanHapus,
    dataPeriode,
    dataPeriodeBaru,
    dataPeriodeHapus,
    opsiAddjenis,
    opsiAddjenisRemove,
    opsiAddkategori,
    opsiAddkategoriRemove,
    opsiAddukuran,
    opsiAddukuranRemove,
    opsiJenis,
    opsiKategori,
    opsiUkuran,
    listdatapersonil,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { usePermissionStore } from '@/store/permissionStore';
import { ResultSelectWithCreate, type BreadcrumbItem, type UnitRawat, type Periode } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
const auth = usePermissionStore();
const canManagePeriode = computed(() => auth.can('menu.alokasi.addeditperiode'));

const isUnitRawatDialogOpen = ref(false);
const unit_rawat = ref<UnitRawat[]>([]);
const unit_rawatSelectKey = ref(0);
const isLoadingBtnSat = ref(false);
const isEditUnitRawatMode = ref(false);
const unit_rawatDialogFormKey = ref(0);

const isPeriodeDialogOpen = ref(false);
const periode = ref<Periode[]>([]);
const periodeSelectKey = ref(0);
const isLoadingBtnPeriode = ref(false);
const isEditPeriodeMode = ref(false);
const periodeDialogFormKey = ref(0);

const isAlokasiLocked = ref(false);
const isLoadingStatusAlokasi = ref(true);

const isUpdatingData = ref(false);
const isLoadingSubmit = ref(false);
const isLoadingDelete = ref(false);
const rowIndex = ref<number>(-1);
const isLoadingNAN = ref(false);
const nanValue = ref('');

const mode = useColorMode();

const props = withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

const bindDataUpdateToForm = (data: Record<string, any>): void => {
    // Helper function to convert field to JSON string format
    const toJsonString = (field: any, _idKey: string, _nameKey: string): string => {
        if (!field) return '';
        if (typeof field === 'string' && field.startsWith('{')) {
            return field;
        }
        if (typeof field === 'object' && field !== null) {
            const name =
                field.name ||
                field.nama ||
                field.label ||
                (field.data ? `${field.data.nrp ?? ''}${field.data.nama ? ` - ${field.data.nama}` : ''}` : '');

            return JSON.stringify({
                id: field.id,
                name: String(name).trim(),
            });
        }
        return '';
    };

    // Set nan value to both ref and form
    nanValue.value = data.nan || '';

    // Transform details to match expected grid format
    const transformedDetails = (data.details || []).map((detail: any) => {
        // Handle different possible backend formats
        let jenisJson = '';
        let ukuranJson = '';
        let kategoriJson = '';

        // Try to get jenis
        if (detail.jenis) {
            jenisJson = toJsonString(detail.jenis, '', '');
        } else if (detail.jenis_id && (detail.jenis_nama || detail.nama_jenis)) {
            jenisJson = JSON.stringify({
                id: detail.jenis_id,
                name: detail.jenis_nama || detail.nama_jenis,
            });
        }

        // Try to get ukuran
        if (detail.ukuran) {
            ukuranJson = toJsonString(detail.ukuran, '', '');
        } else if (detail.ukuran_id && (detail.ukuran_nama || detail.nama_ukuran)) {
            ukuranJson = JSON.stringify({
                id: detail.ukuran_id,
                name: detail.ukuran_nama || detail.nama_ukuran,
            });
        }

        // Try to get kategori
        if (detail.kategori) {
            kategoriJson = toJsonString(detail.kategori, '', '');
        } else if (detail.kategori_id && (detail.kategori_nama || detail.nama_kategori)) {
            kategoriJson = JSON.stringify({
                id: detail.kategori_id,
                name: detail.kategori_nama || detail.nama_kategori,
            });
        }

        // Try to get tenaga_medis
        let tenaga_medisJson = '';
        if (detail.tenaga_medis) {
            tenaga_medisJson = toJsonString(detail.tenaga_medis, '', '');
        } else if (detail.tenaga_medis_id && detail.tenaga_medis) {
            tenaga_medisJson = JSON.stringify({
                id: detail.tenaga_medis.id,
                name: `${detail.tenaga_medis.nrp} - ${detail.tenaga_medis.nama}`,
            });
        }

        return {
            jenis: jenisJson,
            ukuran: ukuranJson,
            kategori: kategoriJson,
            tenaga_medis: tenaga_medisJson,
            jumlah: Number(detail.jumlah || 0),
        };
    });

    form.resetForm({
        values: {
            nan: data.nan || '',
            periode: String(data.periode_id ?? data.periode ?? ''),
            unit_rawat: String(data.unit_rawat_id || ''),
            rowData: transformedDetails,
        },
    });

    // Force re-render of unit_rawat select to show selected value
    unit_rawatSelectKey.value += 1;
};

onMounted(async () => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Data Rencana Penyaluran', href: dataAlokasi.url() },
        { label: 'Data Rencana Penyaluran Baru', href: '' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.1 } });

    isLoadingStatusAlokasi.value = true;
    await Promise.all([getUnitRawat(), getPeriode(), loadOpsiJenis(), loadOpsiUkuran(), loadOpsiKategori(), loadOpsiTenagaMedis()]);

    if (props.data) {
        isUpdatingData.value = true;
        bindDataUpdateToForm(props.data);
    } else {
        getNAN();
    }

    isAlokasiLocked.value = props.data?.status == '2' ? true : false;
    isLoadingStatusAlokasi.value = false;
});

const backPage = () => {
    router.visit(dataAlokasi.url(), { replace: true });
};
const formSchema = toTypedSchema(
    z.object({
        nan: requiredSelectSchema(),
        periode: requiredSelectSchema(),
        unit_rawat: requiredSelectSchema(),
        rowData: z.array(
            z.object({
                jenis: z.string(),
                ukuran: z.string(),
                kategori: z.string(),
                tenaga_medis: z.string(),
                jumlah: z.number(),
            }),
        ),
    }),
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        nan: '',
        periode: '',
        unit_rawat: '',
        rowData: [],
    },
});

const { setFieldValue: setMainFieldValue } = form;

const onSubmitDataAlokasi = form.handleSubmit(
    async (values) => {
        try {
            isLoadingSubmit.value = true;
            const payload = {
                ...values,
                nan: String(values.nan ?? ''),
                periode: String(values.periode ?? ''),
                unit_rawat: Number(values.unit_rawat),
                rowData: (values.rowData ?? []).map((row) => {
                    const tenaga_medisData = row.tenaga_medis ? (isJson(row.tenaga_medis) ? JSON.parse(row.tenaga_medis) : null) : null;
                    return {
                        ...row,
                        jenis: String(row.jenis ?? ''),
                        ukuran: String(row.ukuran ?? ''),
                        kategori: String(row.kategori ?? ''),
                        tenaga_medis: String(row.tenaga_medis ?? ''),
                        tenaga_medis_id: tenaga_medisData?.id || null,
                        jumlah: Number(row.jumlah ?? 0),
                    };
                }),
            };

            const response = await axiosJS.post(dataAlokasiAddEdit.url(), payload, { encrypt: true });
            const { status, message, data, errors } = response.data ?? {};
            const isSuccess = isResponseSuccess(status);

            if (isSuccess && data) {
                push.success({
                    title: 'Berhasil',
                    message: message ?? (isUpdatingData.value ? 'Data alokasi berhasil diperbarui.' : 'Data alokasi berhasil dibuat.'),
                });
                onResetMainForm();
            } else {
                const firstValidationError = errors && typeof errors === 'object' ? Object.values(errors)[0] : null;
                const errorMessage = Array.isArray(firstValidationError) ? firstValidationError[0] : null;

                push.error({
                    title: 'Gagal',
                    message: errorMessage || message || 'Gagal menyimpan data alokasi. Silahkan periksa isian Anda.',
                });
            }
        } catch (error) {
            console.error(error);
            push.error({
                title: 'Gagal',
                message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
            });
        } finally {
            isLoadingSubmit.value = false;
        }
    },
    ({ errors }) => {
        const firstError = Object.values(errors ?? {})[0];
        const message = typeof firstError === 'string' ? firstError : 'Form belum valid. Periksa kembali isian wajib.';

        push.error({
            title: 'Validasi Gagal',
            message,
        });
    },
);
const onResetMainForm = () => {
    form.resetForm({
        values: {
            nan: '',
            periode: '',
            unit_rawat: '',
            rowData: [],
        },
    });

    getUnitRawat();
    getNAN();

    setTimeout(() => {
        if (isUpdatingData.value == true) {
            backPage();
        }
    }, 3000);
};

const unit_rawatDialogInitialValues = ref({
    nmunit_rawat: '',
});
const periodeDialogInitialValues = ref({
    nama: '',
});
const editingUnitRawatId = ref<number | null>(null);
const editingPeriodeId = ref<number | null>(null);

const unit_rawatFormSchema = toTypedSchema(
    z.object({
        nmunit_rawat: z
            .string({ required_error: 'Isian harus diisi' })
            .min(3, 'Nama unit_rawat minimal 3 karakter')
            .max(255, 'Nama unit_rawat maksimal 255 karakter'),
    }),
);
const periodeFormSchema = toTypedSchema(
    z.object({
        nama: z
            .string({ required_error: 'Isian harus diisi' })
            .min(3, 'Nama periode minimal 3 karakter')
            .max(100, 'Nama periode maksimal 100 karakter'),
    }),
);
const openUnitRawatDialogCreate = (): void => {
    isEditUnitRawatMode.value = false;
    editingUnitRawatId.value = null;
    unit_rawatDialogInitialValues.value = {
        nmunit_rawat: '',
    };
    unit_rawatDialogFormKey.value += 1;
    isUnitRawatDialogOpen.value = true;
};
const openPeriodeDialogCreate = (): void => {
    isEditPeriodeMode.value = false;
    editingPeriodeId.value = null;
    periodeDialogInitialValues.value = {
        nama: '',
    };
    periodeDialogFormKey.value += 1;
    isPeriodeDialogOpen.value = true;
};
const onEditSelectedUnitRawat = (selectedValue: string | number | null | undefined): void => {
    const selectedUnitRawat = findItemBySelectedId<UnitRawat>(unit_rawat.value, selectedValue);

    if (!selectedUnitRawat) {
        push.error({
            title: 'Pilih unit_rawat terlebih dahulu',
            message: 'Silahkan pilih data unit_rawat yang ingin diedit.',
        });

        return;
    }

    isEditUnitRawatMode.value = true;
    editingUnitRawatId.value = selectedUnitRawat.id;
    unit_rawatDialogInitialValues.value = {
        nmunit_rawat: selectedUnitRawat.nama ?? '',
    };
    unit_rawatDialogFormKey.value += 1;
    isUnitRawatDialogOpen.value = true;
};
const onDeleteSelectedUnitRawat = async (selectedValue: string | number | null | undefined): Promise<void> => {
    const selectedUnitRawat = findItemBySelectedId<UnitRawat>(unit_rawat.value, selectedValue);
    if (!selectedUnitRawat) {
        push.error({
            title: 'Pilih unit_rawat terlebih dahulu',
            message: 'Silahkan pilih data unit_rawat yang ingin dihapus.',
        });

        return;
    }

    try {
        isLoadingBtnSat.value = true;

        const endpoint = dataSatuanHapus.url({ query: { id: selectedUnitRawat.id } });
        const response = await axiosJS.delete(endpoint, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data unit_rawat berhasil dihapus.',
            });

            setMainFieldValue('unit_rawat', null);
            await getUnitRawat();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal menghapus data unit_rawat. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingBtnSat.value = false;
    }
};
const getUnitRawat = async (): Promise<void> => {
    try {
        isLoadingBtnSat.value = true;
        const response = await axiosJS.get(dataSatuan.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess) {
            unit_rawat.value = [...(data ?? [])];
            unit_rawatSelectKey.value += 1;
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoadingBtnSat.value = false;
    }
};
const getPeriode = async (): Promise<void> => {
    try {
        isLoadingBtnPeriode.value = true;
        const response = await axiosJS.get(dataPeriode.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess) {
            periode.value = [...(data ?? [])];
            periodeSelectKey.value += 1;
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoadingBtnPeriode.value = false;
    }
};
const onSubmitNewUnitRawat = async (values: any) => {
    try {
        isUnitRawatDialogOpen.value = false;
        isLoadingBtnSat.value = true;
        const payload = isEditUnitRawatMode.value ? { id: editingUnitRawatId.value, ...values } : values;
        const response = await axiosJS.post(dataSatuanBaru.url(), payload, { encrypt: true });
        const { status, message, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data unit_rawat berhasil disimpan.',
            });
            isEditUnitRawatMode.value = false;
            editingUnitRawatId.value = null;
            await getUnitRawat();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    }
};

const onEditSelectedPeriode = (selectedValue: string | number | null | undefined): void => {
    const selectedPeriode = findItemBySelectedId<Periode>(periode.value, selectedValue);

    if (!selectedPeriode) {
        push.error({
            title: 'Pilih periode terlebih dahulu',
            message: 'Silahkan pilih data periode yang ingin diedit.',
        });

        return;
    }

    isEditPeriodeMode.value = true;
    editingPeriodeId.value = selectedPeriode.id;
    periodeDialogInitialValues.value = {
        nama: selectedPeriode.nama ?? '',
    };
    periodeDialogFormKey.value += 1;
    isPeriodeDialogOpen.value = true;
};

const onDeleteSelectedPeriode = async (selectedValue: string | number | null | undefined): Promise<void> => {
    const selectedPeriode = findItemBySelectedId<Periode>(periode.value, selectedValue);
    if (!selectedPeriode) {
        push.error({
            title: 'Pilih periode terlebih dahulu',
            message: 'Silahkan pilih data periode yang ingin dihapus.',
        });

        return;
    }

    try {
        isLoadingBtnPeriode.value = true;

        const endpoint = dataPeriodeHapus.url({ query: { id: selectedPeriode.id } });
        const response = await axiosJS.delete(endpoint, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data periode berhasil dihapus.',
            });

            setMainFieldValue('periode', null);
            await getPeriode();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal menghapus data periode. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingBtnPeriode.value = false;
    }
};

const onSubmitNewPeriode = async (values: any) => {
    try {
        isPeriodeDialogOpen.value = false;
        isLoadingBtnPeriode.value = true;
        const payload = isEditPeriodeMode.value ? { id: editingPeriodeId.value, ...values } : values;
        const response = await axiosJS.post(dataPeriodeBaru.url(), payload, { encrypt: true });
        const { status, message, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data periode berhasil disimpan.',
            });
            isEditPeriodeMode.value = false;
            editingPeriodeId.value = null;
            await getPeriode();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    }
};

const getNAN = async (): Promise<void> => {
    try {
        isLoadingNAN.value = true;
        const response = await axiosJS.get(dataAlokasiNan.url());
        const { status, nan } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && nan) {
            nanValue.value = nan;
            await nextTick();
            setMainFieldValue('nan', nan);
        } else {
            push.error({
                title: 'Gagal',
                message: 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingNAN.value = false;
    }
};

const currentGridTheme = computed(() => {
    return mode.value === 'dark' ? greenTema : greenTemaLight;
});

const ActionButtonsDeleted = defineComponent({
    props: {
        params: {
            type: Object as () => ICellRendererParams<Record<string, any>> & {
                onDelete?: (row: Record<string, any>, rowIndex: number) => void;
            },
            required: true,
        },
    },
    setup(props) {
        const handleDelete = (): void => {
            const row = props.params.data;
            if (!row) return;

            const idx = props.params.node?.rowIndex ?? -1;
            props.params.onDelete?.(row, idx);
        };

        return () => {
            return h('div', { class: 'flex h-full items-center justify-center' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        type: 'button',
                        class: 'h-7 rounded-sm bg-red-400 hover:bg-red-500 transition duration-300',
                        title: 'Hapus',
                        onClick: handleDelete,
                    },
                    () => h(Trash2, { class: 'h-4 w-4' }),
                ),
            ]);
        };
    },
});

const components = {
    ActionButtonsDeleted: ActionButtonsDeleted,
};

const onDeleteRow = (row: Record<string, any> | null, idx: number = -1): void => {
    selectedItem.value = row;
    rowIndex.value = idx;
    isOpen.value = true;
    msgdialog.value = `Anda yakin akan menghapus data alokasi alkes ?`;
};
const deletedSelectedRow = async () => {
    try {
        isLoadingDelete.value = true;
        const row = selectedItem.value;
        if (!row) {
            push.error({
                title: 'Gagal',
                message: 'Data tidak ditemukan!',
            });
            return;
        }
        if (rowIndex.value >= 0) {
            const nextRows = rowData.value.filter((_, index) => index !== rowIndex.value);
            setMainFieldValue('rowData', nextRows);
        }

        push.success({
            title: 'Berhasil',
            message: 'Data alokasi berhasil dihapus.',
        });
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingDelete.value = false;
    }
};

const columnDefs: ColDef[] = [
    {
        headerName: 'Aksi',
        colId: 'actions',
        pinned: 'left',
        sortable: false,
        filter: false,
        width: 70,
        cellRenderer: 'ActionButtonsDeleted',
        cellRendererParams: {
            onDelete: onDeleteRow,
        },
    },
    {
        headerName: 'NO',
        width: 50,
        valueGetter: 'node.rowIndex + 1',
        sortable: false,
        filter: false,
    },
    {
        field: 'jenis',
        headerName: 'JENIS',
        width: 120,
        valueFormatter: (params) => (params.value ? (isJson(params.value) ? (JSON.parse(params.value).name ?? '-') : '') : ''),
    },
    {
        field: 'ukuran',
        headerName: 'UKURAN',
        width: 120,
        valueFormatter: (params) => (params.value ? (isJson(params.value) ? (JSON.parse(params.value).name ?? '-') : '') : ''),
    },
    {
        field: 'kategori',
        headerName: 'KATEGORI',
        width: 120,
        valueFormatter: (params) => (params.value ? (isJson(params.value) ? (JSON.parse(params.value).name ?? '-') : '') : ''),
    },
    {
        field: 'tenaga_medis',
        headerName: 'TENAGA_MEDIS',
        width: 150,
        valueFormatter: (params) => (params.value ? (isJson(params.value) ? (JSON.parse(params.value).name ?? '-') : '') : ''),
    },
    { field: 'jumlah', width: 120, headerName: 'JUMLAH' },
];
const defaultColDef: ColDef = {
    suppressHeaderMenuButton: true,
};
type AlokasiGridRow = {
    jenis: string;
    ukuran: string;
    kategori: string;
    tenaga_medis: string;
    jumlah: number;
};

const rowData = computed<AlokasiGridRow[]>(() => {
    return (form.values.rowData ?? []) as AlokasiGridRow[];
});

/**
 * Dialog
 */
const isOpen = ref(false);
const selectedItem = ref<Record<string, any> | null>(null);
const msgdialog = ref<string | ''>();

/**
 * Dialog Alokasi
 */
const isDialogAlokasiOpen = ref(false);
const alokasiDialogFormKey = ref(0);
const alokasiDialogInitialValues = ref({
    jenis: '',
    ukuran: '',
    kategori: '',
    tenaga_medis: '',
    jumlah: 1,
});

const onDialogAlokasiOpenChange = (open: boolean): void => {
    isDialogAlokasiOpen.value = open;

    if (!open) {
        alokasiDialogInitialValues.value = {
            jenis: '',
            ukuran: '',
            kategori: '',
            tenaga_medis: '',
            jumlah: 0,
        };
        alokasiDialogFormKey.value += 1;
        return;
    }

    alokasiDialogInitialValues.value = {
        jenis: '',
        ukuran: '',
        kategori: '',
        tenaga_medis: '',
        jumlah: 0,
    };
    alokasiDialogFormKey.value += 1;
};

const alokasiFormSchema = toTypedSchema(
    z.object({
        jenis: requiredSelectSchema(),
        ukuran: requiredSelectSchema(),
        kategori: requiredSelectSchema(),
        tenaga_medis: requiredSelectSchema(),
        jumlah: z.coerce.number({ invalid_type_error: 'Isian harus diisi' }).refine((val) => val === 0 || val === 1, {
            message: 'Jumlah hanya boleh 0 atau 1',
        }),
    }),
);
const tambahDataAlokasiGrid = async (values: any, { resetForm }: { resetForm: () => void }) => {
    try {
        const newRow: AlokasiGridRow = {
            jenis: values.jenis || '',
            ukuran: values.ukuran || '',
            kategori: values.kategori || '',
            tenaga_medis: values.tenaga_medis || '',
            jumlah: Number(values.jumlah ?? 0),
        };

        // Helper function to extract name from JSON string
        const extractName = (jsonStr: string): string => {
            try {
                if (!jsonStr || !isJson(jsonStr)) return '';
                const obj = JSON.parse(jsonStr);
                return obj.name || '';
            } catch {
                return '';
            }
        };

        const newJenisName = extractName(newRow.jenis);
        const newUkuranName = extractName(newRow.ukuran);
        const newKategoriName = extractName(newRow.kategori);
        const newTenagaMedisName = extractName(newRow.tenaga_medis);

        // Check for duplicate: jenis + ukuran + kategori + tenaga_medis must be unique
        // But same jenis+ukuran+kategori is allowed if tenaga_medis is different
        const exists = rowData.value.some((row) => {
            const existingJenisName = extractName(row.jenis);
            const existingUkuranName = extractName(row.ukuran);
            const existingKategoriName = extractName(row.kategori);
            const existingTenagaMedisName = extractName(row.tenaga_medis);

            return (
                existingJenisName === newJenisName &&
                existingUkuranName === newUkuranName &&
                existingKategoriName === newKategoriName &&
                existingTenagaMedisName === newTenagaMedisName
            );
        });

        if (exists) {
            push.error({
                title: 'Gagal',
                message: 'Data alokasi dengan kombinasi jenis, ukuran, kategori, dan tenaga_medis yang sama sudah tersedia.',
            });
            return;
        }

        setMainFieldValue('rowData', [...rowData.value, newRow]);
        isDialogAlokasiOpen.value = false;
        resetForm();
        push.success({
            title: 'Berhasil',
            message: 'Data alokasi berhasil ditambahkan.',
        });
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan. Silahkan coba lagi!',
        });
    }
};

/**
 * Jenis Dropdown
 */
const opsiJenisData = ref<any[]>([]);
const opsiUkuranData = ref<any[]>([]);
const opsiKategoriData = ref<any[]>([]);
const opsiTenagaMedisData = ref<any[]>([]);

const loadOpsiUkuran = async () => {
    try {
        const response = await axiosJS.get(opsiUkuran.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && Array.isArray(data) && data.length > 0) {
            opsiUkuranData.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                }));
        } else {
            opsiUkuranData.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi ukuran:', error);
        opsiUkuranData.value = [];
    }
};
const loadOpsiJenis = async () => {
    try {
        const response = await axiosJS.get(opsiJenis.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && Array.isArray(data) && data.length > 0) {
            opsiJenisData.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                }));
        } else {
            opsiJenisData.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi jenis:', error);
        opsiJenisData.value = [];
    }
};
const loadOpsiKategori = async () => {
    try {
        const response = await axiosJS.get(opsiKategori.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && Array.isArray(data) && data.length > 0) {
            opsiKategoriData.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                }));
        } else {
            opsiKategoriData.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi kategori:', error);
        opsiKategoriData.value = [];
    }
};
const loadOpsiTenagaMedis = async () => {
    try {
        const response = await axiosJS.post(listdatapersonil.url(), {
            page: 1,
            perPage: 100, // Load up to 100 for dropdown
        });
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && Array.isArray(data) && data.length > 0) {
            opsiTenagaMedisData.value = data
                .filter((item: any) => {
                    const hasId = item && item.id != null;
                    const hasNrp = item.nrp || (item.data && item.data.nrp);
                    const hasNama = item.nama || (item.data && item.data.nama);
                    return hasId && hasNrp && hasNama;
                })
                .map((item: any) => {
                    const nrp = item.nrp || item.data?.nrp || 'N/A';
                    const nama = item.nama || item.data?.nama || 'N/A';
                    return {
                        id: item.id,
                        label: `${nrp} - ${nama}`,
                    };
                });
        } else {
            opsiTenagaMedisData.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi tenaga_medis:', error);
        opsiTenagaMedisData.value = [];
    }
};
</script>

<template>
    <PublicLayout
        :title="!isUpdatingData ? 'Edit Data Rencana Penyaluran' : 'Data Rencana Penyaluran Baru'"
        :page-title="!isUpdatingData ? 'Edit Data Rencana Penyaluran' : 'Data Rencana Penyaluran Baru'"
        page-sub-title="Inisialisasi dan Pencatatan Alokasi UnitRawat Tujuan Periode Baru"
    >
        <div class="mb-5 flex items-center justify-between">
            <div class="flex items-center">
                <ButtonGroup>
                    <Button
                        variant="outline"
                        size="sm"
                        class="border-gray-300 bg-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white dark:text-gray-500 dark:hover:text-white"
                        @click="backPage()"
                    >
                        <ArrowBigLeft /> Kembali
                    </Button>
                </ButtonGroup>
            </div>

            <div class="flex flex-col text-right">
                <small class="text-sm font-medium">Status Alokasi</small>
                <Skeleton v-if="isLoadingStatusAlokasi" class="h-7" />
                <code
                    v-else
                    :class="[
                        'bg-accent relative rounded px-2 py-0 text-center font-mono text-sm font-semibold transition duration-300 hover:shadow-xl',
                        {
                            'bg-crusoe-400 dark:bg-crusoe-400/60 text-white': !isAlokasiLocked,
                            'bg-red-400 text-white dark:bg-red-400/60': isAlokasiLocked,
                        },
                    ]"
                >
                    <h1 class="text-xl font-bold">
                        {{ isAlokasiLocked ? 'LOCK' : 'OPEN' }}
                    </h1>
                </code>
            </div>
        </div>

        <form autocomplete="off" @submit.prevent="onSubmitDataAlokasi" @reset.prevent="onResetMainForm">
            <div class="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="grid items-start gap-4">
                    <FormField
                        v-slot="{ componentField }"
                        name="nan"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem hidden="true">
                            <FormLabel>Nomor Alokasi Nasional</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput v-bind="componentField" v-model="nanValue" readonly placeholder="Nomor Alokasi" />
                                    <InputGroupAddon align="inline-end">
                                        <div v-if="isLoadingNAN">
                                            <Spinner />
                                        </div>
                                        <div v-else>
                                            <InputGroupButton
                                                type="button"
                                                aria-label="Generate"
                                                title="Generate"
                                                size="icon-xs"
                                                :disabled="isUpdatingData"
                                                @click="getNAN"
                                            >
                                                <RotateCw />
                                            </InputGroupButton>
                                        </div>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>

                    <PeriodeFieldManager
                        v-model:is-periode-dialog-open="isPeriodeDialogOpen"
                        title="Periode Alokasi"
                        :periode="periode"
                        :periode-select-key="periodeSelectKey"
                        :is-loading-btn-periode="isLoadingBtnPeriode"
                        :is-edit-periode-mode="isEditPeriodeMode"
                        :periode-dialog-form-key="periodeDialogFormKey"
                        :periode-dialog-initial-values="periodeDialogInitialValues"
                        :periode-form-schema="periodeFormSchema"
                        :can-manage-periode="canManagePeriode"
                        :on-open-create="openPeriodeDialogCreate"
                        :on-edit-selected="onEditSelectedPeriode"
                        :on-delete-selected="onDeleteSelectedPeriode"
                        :on-submit-new-periode="onSubmitNewPeriode"
                    />

                    <UnitRawatFieldManager
                        v-model:is-unit_rawat-dialog-open="isUnitRawatDialogOpen"
                        title="Unit Rawat Penerima"
                        :unit_rawat="unit_rawat"
                        :unit_rawat-select-key="unit_rawatSelectKey"
                        :is-loading-btn-sat="isLoadingBtnSat"
                        :is-edit-unit_rawat-mode="isEditUnitRawatMode"
                        :unit_rawat-dialog-form-key="unit_rawatDialogFormKey"
                        :unit_rawat-dialog-initial-values="unit_rawatDialogInitialValues"
                        :unit_rawat-form-schema="unit_rawatFormSchema"
                        :on-open-create="openUnitRawatDialogCreate"
                        :on-edit-selected="onEditSelectedUnitRawat"
                        :on-delete-selected="onDeleteSelectedUnitRawat"
                        :on-submit-new-unit_rawat="onSubmitNewUnitRawat"
                    />
                </div>
            </div>
            <div class="mb-5 grid grow grid-cols-1 gap-3">
                <div class="grid grow grid-cols-1 items-end sm:grid-cols-2">
                    <div>
                        <Label>Data Rencana Penyaluran Alkes</Label>
                        <p class="text-muted-foreground text-sm">Tambah atau edit alokasi data alkes.</p>
                    </div>

                    <Field orientation="horizontal" class="justify-end">
                        <AnimatedTooltip text="Tambah baru data alokasi alkes" position="left">
                            <Dialog :open="isDialogAlokasiOpen" @update:open="onDialogAlokasiOpenChange">
                                <DialogTrigger as-child>
                                    <Button variant="outline" size="icon" type="button"> <CirclePlus /></Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-lg" @interact-outside="(e) => e.preventDefault()">
                                    <DialogHeader>
                                        <DialogTitle>Tambah/Edit Alokasi</DialogTitle>
                                        <DialogDescription>Tambah atau edit data alokasi</DialogDescription>
                                    </DialogHeader>
                                    <Form
                                        :key="alokasiDialogFormKey"
                                        :validation-schema="alokasiFormSchema"
                                        :initial-values="alokasiDialogInitialValues"
                                        class="space-y-4"
                                        @submit="tambahDataAlokasiGrid"
                                    >
                                        <FormField v-slot="{ componentField, handleChange }" name="jenis">
                                            <FormItem>
                                                <FormControl>
                                                    <SelectWithCreate
                                                        v-bind="componentField"
                                                        title="Pilih Jenis"
                                                        :options="opsiJenisData"
                                                        :route-add="opsiAddjenis.url()"
                                                        :route-remove="opsiAddjenisRemove.url()"
                                                        placeholder="Pilih jenis"
                                                        :value-result="ResultSelectWithCreate.json"
                                                        :on-change="(val) => handleChange(val ?? '')"
                                                        @update:options="opsiJenisData = $event"
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <FormField v-slot="{ componentField, handleChange }" name="ukuran">
                                            <FormItem>
                                                <FormControl>
                                                    <SelectWithCreate
                                                        v-bind="componentField"
                                                        title="Pilih Ukuran"
                                                        :options="opsiUkuranData"
                                                        :route-add="opsiAddukuran.url()"
                                                        :route-remove="opsiAddukuranRemove.url()"
                                                        placeholder="Pilih ukuran"
                                                        :value-result="ResultSelectWithCreate.json"
                                                        :on-change="(val) => handleChange(val ?? '')"
                                                        @update:options="opsiUkuranData = $event"
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <FormField v-slot="{ componentField, handleChange }" name="kategori">
                                            <FormItem>
                                                <FormControl>
                                                    <SelectWithCreate
                                                        v-bind="componentField"
                                                        title="Pilih Kategori"
                                                        :options="opsiKategoriData"
                                                        :route-add="opsiAddkategori.url()"
                                                        :route-remove="opsiAddkategoriRemove.url()"
                                                        placeholder="Pilih kategori"
                                                        :value-result="ResultSelectWithCreate.json"
                                                        :on-change="(val) => handleChange(val ?? '')"
                                                        @update:options="opsiKategoriData = $event"
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <FormField v-slot="{ componentField, handleChange }" name="tenaga_medis">
                                            <FormItem>
                                                <FormControl>
                                                    <SelectWithCreate
                                                        v-bind="componentField"
                                                        title="Pilih TenagaMedis"
                                                        :options="opsiTenagaMedisData"
                                                        placeholder="Pilih tenaga_medis"
                                                        :value-result="ResultSelectWithCreate.json"
                                                        :on-change="(val) => handleChange(val ?? '')"
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <FormField
                                            v-slot="{ componentField }"
                                            name="jumlah"
                                            :validate-on-change="false"
                                            :validate-on-model-update="false"
                                            :validate-on-blur="false"
                                        >
                                            <FormItem>
                                                <FormLabel>Jumlah Alokasi</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        v-bind="componentField"
                                                        min="0"
                                                        max="1"
                                                        step="1"
                                                        @input="
                                                            (e: any) => {
                                                                const val = parseInt(e.target.value);
                                                                if (val !== 0 && val !== 1) {
                                                                    e.target.value = val > 0.5 ? 1 : 0;
                                                                }
                                                                componentField.onChange(e);
                                                            }
                                                        "
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <DialogFooter>
                                            <DialogClose as-child>
                                                <Button variant="outline" type="button"> Batal </Button>
                                            </DialogClose>
                                            <Button type="submit" class="shrink-0"> Simpan </Button>
                                        </DialogFooter>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </AnimatedTooltip>
                    </Field>
                </div>

                <div class="relative h-60 w-full rounded-md">
                    <libGlowEffect />
                    <AgGridVue
                        :column-defs="columnDefs"
                        :default-col-def="defaultColDef"
                        :components="components"
                        :suppress-context-menu="true"
                        :suppress-movable-columns="true"
                        :loading-overlay-component="CustomLoadingOverlay"
                        :loading-overlay-component-params="{ loadingMessage: 'Memuat data...' }"
                        :locale-text="AG_GRID_LOCALE_ID"
                        row-selection="single"
                        :suppress-cell-focus="true"
                        :theme="currentGridTheme"
                        :pagination="false"
                        :cache-block-size="10"
                        :row-data="rowData"
                        style="width: 100%; height: 100%"
                    />
                </div>
                <ModalDialog v-model:open="isOpen" :item="selectedItem" :description="msgdialog" @confirm="deletedSelectedRow" />
            </div>

            <div class="mb-5 grid grow grid-cols-1 gap-4 lg:grid-cols-2">
                <Field orientation="horizontal">
                    <Button type="reset" variant="outline" :disabled="isUpdatingData"> Reset </Button>
                    <Button type="button" class="shrink-0" :disabled="isLoadingSubmit" @click="onSubmitDataAlokasi">
                        <Loader2 v-if="isLoadingSubmit" class="h-4 w-4 animate-spin" />
                        {{ isUpdatingData ? 'Edit Data Rencana Penyaluran' : 'Tambah Alokasi Baru' }}
                    </Button>
                </Field>
            </div>
        </form>
    </PublicLayout>
</template>
