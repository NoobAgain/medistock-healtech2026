<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';

import { ArrowBigLeft, CalendarIcon, Loader2, ShieldAlert } from 'lucide-vue-next';
import moment from 'moment';
import 'moment/locale/id';

import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import * as z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import UnitRawatFieldManager from '@/components/data-tenaga_medis/UnitRawatFieldManager.vue';
import GenericFieldManager from '@/components/Genericfieldmanager.vue';

import Alert from '@/components/ui/alert/Alert.vue';
import AlertDescription from '@/components/ui/alert/AlertDescription.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import Field from '@/components/ui/field/Field.vue';
import FieldContent from '@/components/ui/field/FieldContent.vue';
import FieldDescription from '@/components/ui/field/FieldDescription.vue';
import FieldLabel from '@/components/ui/field/FieldLabel.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import { Input } from '@/components/ui/input';
import Popover from '@/components/ui/popover/Popover.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectGroup from '@/components/ui/select/SelectGroup.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectLabel from '@/components/ui/select/SelectLabel.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { findItemBySelectedId, isResponseSuccess, requiredSelectSchema, useCurrentTheme } from '@/lib/libUtils';
import { cn } from '@/lib/utils';
import {
    datapersonil,
    datapersonilbaruAddedit,
    dataSatuan,
    dataSatuanBaru,
    dataSatuanHapus,
    dataKodam,
    dataKodamBaru,
    dataKodamHapus,
} from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem, Faskes, UnitRawat } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

// moment.locale('id');

const formSchema = toTypedSchema(
    z.object({
        nrp: z
            .string({ required_error: 'Isian harus diisi' })
            .regex(/^[0-9]+$/, 'NRP harus berupa angka')
            .min(2, 'Minimal 2 digit')
            .max(50, 'Maksimal 50 digit'),
        nama: z.string({ required_error: 'Isian harus diisi' }).min(5, 'Minimal 5 karakter').max(255, 'Maksimal 50 digit'),
        pangkat: requiredSelectSchema(),
        faskes: requiredSelectSchema(),
        unit_rawat: requiredSelectSchema(),
        lokasi: requiredSelectSchema(),
        posisi: requiredSelectSchema(),
        tgllahir: requiredSelectSchema(),
        tglmasukunit_rawat: requiredSelectSchema(),
        alamat: requiredSelectSchema(),
        activeTenagaMedis: z.boolean().default(false),
    }),
);

const unit_rawatFormSchema = toTypedSchema(
    z.object({
        nmunit_rawat: z
            .string({ required_error: 'Isian harus diisi' })
            .min(3, 'Nama unit_rawat minimal 3 karakter')
            .max(255, 'Nama unit_rawat maksimal 255 karakter'),
    }),
);

const { handleSubmit, setFieldValue, resetForm, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        activeTenagaMedis: false,
    },
});

const layout = useLayoutStore();
const page = usePage<{ faskes: Faskes[] }>();
const currentTheme = useCurrentTheme();
const faskes = ref<Faskes[]>([]);
const isUnitRawatDialogOpen = ref(false);
const isEditUnitRawatMode = ref(false);
const editingUnitRawatId = ref<number | null>(null);
const unit_rawatDialogFormKey = ref(0);
const unit_rawatDialogInitialValues = ref({
    nmunit_rawat: '',
});
const unit_rawat = ref<UnitRawat[]>([]);
const pangkatSelectKey = ref(0);
const unit_rawatSelectKey = ref(0);

const props = withDefaults(
    defineProps<{
        id?: number | null;
        data?: Record<string, unknown> | null;
    }>(),
    {
        id: null,
        data: null,
    },
);

const toTextValue = (value: unknown): string => {
    return typeof value === 'string' ? value : '';
};

const toSelectValue = (value: unknown): string | null => {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    return String(value);
};

const isUpdate = ref(false);

const bindDataToForm = (data: Record<string, unknown>): void => {
    resetForm({
        values: {
            nrp: toTextValue(data.nrp),
            nama: toTextValue(data.nama),
            pangkat: toSelectValue(data.pangkat),
            faskes: toSelectValue(data.faskes),
            unit_rawat: toSelectValue(data.unit_rawat),
            lokasi: toTextValue(data.lokasi),
            posisi: toTextValue(data.posisi),
            tgllahir: toSelectValue(data.tgllahir),
            tglmasukunit_rawat: toSelectValue(data.tglmasukunit_rawat),
            alamat: toTextValue(data.alamat),
            activeTenagaMedis: Boolean(data.activeTenagaMedis),
        },
    });

    pangkatSelectKey.value += 1;
    unit_rawatSelectKey.value += 1;
    isUpdate.value = true;
};

onMounted(async () => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Data Nakes', href: datapersonil.url() },
        { label: 'Data Nakes Baru', href: '' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.2 } });

    await getFaskes();
    await getUnitRawat();

    if (props.id && props.data) {
        bindDataToForm(props.data);
    }
});

const backPage = () => {
    router.visit(datapersonil.url(), { replace: true });
};

const getFaskes = async () => {
    try {
        const response = await axiosJS.get(dataKodam.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess) {
            faskes.value = [...(data ?? [])];
        }
    } catch (error) {
        console.error(error);
    }
};

const getUnitRawat = async () => {
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

const onResetMainForm = (): void => {
    resetForm({
        values: {
            nrp: '',
            nama: '',
            pangkat: null,
            faskes: null,
            unit_rawat: null,
            activeTenagaMedis: false,
        },
    });

    setFieldValue('pangkat', null);
    setFieldValue('faskes', null);
    setFieldValue('unit_rawat', null);
    setFieldValue('activeTenagaMedis', false);

    pangkatSelectKey.value += 1;
    unit_rawatSelectKey.value += 1;
};

const openUnitRawatDialogCreate = (): void => {
    isEditUnitRawatMode.value = false;
    editingUnitRawatId.value = null;
    unit_rawatDialogInitialValues.value = {
        nmunit_rawat: '',
    };
    unit_rawatDialogFormKey.value += 1;
    isUnitRawatDialogOpen.value = true;
};

const isLoadingBtnSat = ref(false);
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

            setFieldValue('unit_rawat', null);
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

const selectTglLahir = computed<Date | null>(() => {
    if (!values.tgllahir) {
        return null;
    }
    const parsedDate = new Date(String(values.tgllahir));
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
});
const selectTglMasukSat = computed<Date | null>(() => {
    if (!values.tglmasukunit_rawat) {
        return null;
    }
    const parsedDate = new Date(String(values.tglmasukunit_rawat));
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
});

const isLoadingBtnSubmit = ref(false);
const onSubmitNewTenagaMedis = handleSubmit(async (values) => {
    let isNavigatingBack = false;
    isLoadingBtnSubmit.value = true;

    try {
        const payload = isUpdate.value && props.id ? { ...values, id: props.id } : values;
        const response = await axiosJS.post(datapersonilbaruAddedit.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data tenaga_medis/nakes berhasil di tambahkan',
            });

            if (isUpdate.value) {
                isNavigatingBack = true;
                router.visit(datapersonil.url(), {
                    replace: true,
                    onFinish: () => {
                        isLoadingBtnSubmit.value = false;
                    },
                });

                return;
            } else {
                onResetMainForm();
            }
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
    } finally {
        if (!isNavigatingBack) {
            isLoadingBtnSubmit.value = false;
        }
    }
});

// FASKES
const isFaskesDialogOpen = ref(false);
const isEditFaskesMode = ref(false);
const editingFaskesId = ref<number | null>(null);
const faskesDialogFormKey = ref(0);
const faskesDialogInitialValues = ref({
    nama: '',
});
const isLoadingBtnFaskes = ref(false);

const faskesFormSchema = toTypedSchema(
    z.object({
        nama: z.string({ required_error: 'Isian harus diisi' }).min(3, 'Nama faskes minimal 3 karakter').max(255, 'Nama faskes maksimal 255 karakter'),
    }),
);

const faskesFields = [{ name: 'nama', label: 'Nama Faskes', placeholder: 'Masukkan nama faskes' }];

const openFaskesDialogCreate = (): void => {
    isEditFaskesMode.value = false;
    editingFaskesId.value = null;
    faskesDialogInitialValues.value = {
        nama: '',
    };
    faskesDialogFormKey.value += 1;
    isFaskesDialogOpen.value = true;
};

const onSubmitFaskes = async (values: any) => {
    try {
        isFaskesDialogOpen.value = false;
        isLoadingBtnFaskes.value = true;
        const payload = isEditFaskesMode.value ? { id: editingFaskesId.value, ...values } : values;
        const response = await axiosJS.post(dataKodamBaru.url(), payload, { encrypt: true });
        const { status, message, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data faskes berhasil disimpan.',
            });
            isEditFaskesMode.value = false;
            editingFaskesId.value = null;
            // Refresh faskes list
            await getFaskes();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal dalam menyimpan data faskes. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingBtnFaskes.value = false;
    }
};

const onEditSelectedFaskes = (selectedValue: string | number | null | undefined): void => {
    const selectedFaskes = findItemBySelectedId<Faskes>(faskes.value, selectedValue);

    if (!selectedFaskes) {
        push.error({
            title: 'Pilih faskes terlebih dahulu',
            message: 'Silahkan pilih data faskes yang ingin diedit.',
        });

        return;
    }

    isEditFaskesMode.value = true;
    editingFaskesId.value = selectedFaskes.id;
    faskesDialogInitialValues.value = {
        nama: selectedFaskes.nama ?? '',
    };
    faskesDialogFormKey.value += 1;
    isFaskesDialogOpen.value = true;
};

const onDeleteSelectedFaskes = async (selectedValue: string | number | null | undefined): Promise<void> => {
    const selectedFaskes = findItemBySelectedId<Faskes>(faskes.value, selectedValue);
    if (!selectedFaskes) {
        push.error({
            title: 'Pilih faskes terlebih dahulu',
            message: 'Silahkan pilih data faskes yang ingin dihapus.',
        });
        return;
    }

    try {
        isLoadingBtnFaskes.value = true;

        const endpoint = dataKodamHapus.url({ query: { id: selectedFaskes.id } });
        const response = await axiosJS.delete(endpoint, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Data faskes berhasil dihapus.',
            });

            setFieldValue('faskes', null);

            // Refresh faskes list
            await getFaskes();
        } else {
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal menghapus data faskes. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingBtnFaskes.value = false;
    }
};
</script>

<template>
    <PublicLayout
        title="Data Nakes Baru"
        page-title="Data Nakes Baru"
        page-sub-title="Tambahkan dan lengkapi informasi tenaga_medis yang akan didaftarkan"
    >
        <div class="mb-5 flex flex-1 justify-start">
            <ButtonGroup class="mb-4">
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

        <form
            class="grid grow grid-cols-1 gap-4 md:grid-cols-2"
            autocomplete="off"
            @submit.prevent="onSubmitNewTenagaMedis"
            @reset.prevent="onResetMainForm"
        >
            <div class="space-y-4">
                <div class="grid grid-cols-1 items-start justify-start gap-4 md:grid-cols-2">
                    <FormField
                        v-slot="{ componentField }"
                        name="nrp"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormLabel>NRP</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="NRP tenaga_medis / Nakes" v-bind="componentField" />
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="nama"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nama lengkap tenaga_medis / Nakes" v-bind="componentField" />
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                </div>

                <div class="grid grid-cols-1 items-start justify-start gap-4 md:grid-cols-2">
                    <FormField name="tgllahir" :validate-on-change="false" :validate-on-model-update="false" :validate-on-blur="false">
                        <FormItem>
                            <FormLabel>Tgl. Lahir</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger as-child>
                                        <FormControl>
                                            <Button
                                                as="button"
                                                variant="outline"
                                                :class="cn('truncate ps-3 text-start font-normal', !values.tgllahir && 'text-muted-foreground')"
                                            >
                                                <span>{{
                                                    values.tgllahir
                                                        ? moment(values.tgllahir).format('DD MMMM YYYY')
                                                        : 'Tgl. Lahir TenagaMedis / Nakes'
                                                }}</span>
                                                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                            </Button>
                                            <input hidden />
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <VDatePicker
                                            :model-value="selectTglLahir ?? new Date()"
                                            mode="date"
                                            locale="id"
                                            title-position="left"
                                            :is-dark="currentTheme"
                                            :max-date="new Date()"
                                            @update:model-value="
                                                (value: moment.MomentInput): void => {
                                                    if (value) {
                                                        setFieldValue('tgllahir', moment(value).format('YYYY-MM-DD'), false);
                                                    } else {
                                                        setFieldValue('tgllahir', null, false);
                                                    }
                                                }
                                            "
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="tglmasukunit_rawat" :validate-on-change="false" :validate-on-model-update="false" :validate-on-blur="false">
                        <FormItem>
                            <FormLabel>Tgl. Masuk UnitRawat</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger as-child>
                                        <FormControl>
                                            <Button
                                                as="button"
                                                variant="outline"
                                                :class="cn('truncate ps-3 text-start font-normal', !values.tglmasukunit_rawat && 'text-muted-foreground')"
                                            >
                                                <span>{{
                                                    values.tglmasukunit_rawat ? moment(values.tglmasukunit_rawat).format('DD MMMM YYYY') : 'Tgl. Masuk UnitRawat'
                                                }}</span>
                                                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                            </Button>
                                            <input hidden />
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <VDatePicker
                                            :model-value="selectTglMasukSat ?? new Date()"
                                            mode="date"
                                            locale="id"
                                            title-position="left"
                                            :is-dark="currentTheme"
                                            :max-date="new Date()"
                                            @update:model-value="
                                                (value: moment.MomentInput): void => {
                                                    if (value) {
                                                        setFieldValue('tglmasukunit_rawat', moment(value).format('YYYY-MM-DD'), false);
                                                    } else {
                                                        setFieldValue('tglmasukunit_rawat', null, false);
                                                    }
                                                }
                                            "
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                </div>

                <FormField
                    v-slot="{ componentField }"
                    name="alamat"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Alamat tenaga_medis / Nakes" v-bind="componentField" class="capitalize" />
                        </FormControl>
                        <FormErrorMessage />
                        <FormDescription> Isikan alamat lengkap tenaga_medis / nakes </FormDescription>
                    </FormItem>
                </FormField>

                <!-- <FormField
                    v-slot="{ componentField, errorMessage }"
                    name="ukbaju"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel>Ukuran Baju</FormLabel>
                        <FormControl>
                            <Select :key="ukBajuSelectKey" v-bind="componentField">
                                <SelectTrigger class="w-full" :aria-invalid="!!errorMessage">
                                    <SelectValue placeholder="Pilih ukuran baju" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Daftar ukuran baju yang tersedia :</SelectLabel>
                                        <SelectItem value="s">S</SelectItem>
                                        <SelectItem value="m">M</SelectItem>
                                        <SelectItem value="l">L</SelectItem>
                                        <SelectItem value="xl">XL</SelectItem>
                                        <SelectItem value="xxl">XXL</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormErrorMessage />
                    </FormItem>
                </FormField> -->
                <FormField
                    v-slot="{ componentField }"
                    name="lokasi"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel>Dislokasi</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Dislokasi tenaga_medis / Nakes" v-bind="componentField" class="capitalize" />
                        </FormControl>
                        <FormErrorMessage />
                    </FormItem>
                </FormField>
            </div>
            <div class="space-y-4">
                <FormField
                    v-slot="{ componentField, errorMessage }"
                    name="pangkat"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel>Pangkat</FormLabel>
                        <FormControl>
                            <Select :key="pangkatSelectKey" v-bind="componentField">
                                <SelectTrigger class="w-full" :aria-invalid="!!errorMessage">
                                    <SelectValue placeholder="Pilih pangkat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Daftar Jabatan yang tersedia :</SelectLabel>
                                        <SelectItem value="prada">Tenaga Administrasi</SelectItem>
                                        <SelectItem value="pratu">Asisten Apoteker</SelectItem>
                                        <SelectItem value="praka">Pramu Farmasi Senior</SelectItem>
                                        <SelectItem value="kopda">Perawat Pelaksana</SelectItem>
                                        <SelectItem value="koptu">Perawat Pelaksana Lanjutan</SelectItem>
                                        <SelectItem value="kopka">Perawat Mahir</SelectItem>
                                        <SelectItem value="serda">Bidan Pelaksana</SelectItem>
                                        <SelectItem value="sertu">Bidan Pelaksana Lanjutan</SelectItem>
                                        <SelectItem value="serka">Bidan Mahir</SelectItem>
                                        <SelectItem value="serma">Apoteker</SelectItem>
                                        <SelectItem value="pelda">Apoteker Madya</SelectItem>
                                        <SelectItem value="peltu">Kepala Gudang Farmasi</SelectItem>
                                        <SelectItem value="letda">Dokter Umum</SelectItem>
                                        <SelectItem value="lettu">Dokter Jaga Senior</SelectItem>
                                        <SelectItem value="kapten">Kepala Unit Rawat</SelectItem>
                                        <SelectItem value="mayor">Kepala Instalasi Farmasi</SelectItem>
                                        <SelectItem value="letkol">Dokter Spesialis</SelectItem>
                                        <SelectItem value="kolonel">Kepala Bidang Pelayanan Medis</SelectItem>
                                        <SelectItem value="brigjen">Wakil Direktur Medis</SelectItem>
                                        <SelectItem value="mayjen">Direktur Medis</SelectItem>
                                        <SelectItem value="letjen">Direktur Rumah Sakit</SelectItem>
                                        <SelectItem value="jenderal">Kepala Dinas Kesehatan</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormErrorMessage />
                    </FormItem>
                </FormField>

                <!-- <FormField
                    v-slot="{ componentField, errorMessage }"
                    name="faskes"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel class="flex justify-start text-start">
                            Faskes <span class="text-xs text-gray-500 italic">(Komando Daerah Militer)</span>
                        </FormLabel>
                        <FormControl>
                            <div class="flex items-end gap-2">
                                <div class="flex-1">
                                    <Select :key="faskesSelectKey" v-bind="componentField">
                                        <SelectTrigger class="w-full" :aria-invalid="!!errorMessage">
                                            <SelectValue placeholder="Pilih Daftar Faskes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Daftar Faskes yang tersedia :</SelectLabel>
                                                <div v-for="k in faskes" :key="k.id">
                                                    <SelectItem :value="k.id.toString()">{{ k.kode }} / {{ k.nama }}</SelectItem>
                                                </div>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </FormControl>
                        <FormErrorMessage />
                    </FormItem>
                </FormField> -->

                <GenericFieldManager
                    v-model:is-dialog-open="isFaskesDialogOpen"
                    field-name="faskes"
                    label="Faskes"
                    placeholder="Pilih Faskes"
                    group-label="Daftar faskes yang tersedia :"
                    description="Silahkan tambah faskes jika belum tersedia."
                    delete-dialog-title="Hapus Faskes?"
                    delete-dialog-description="Tindakan ini akan menghapus data faskes dari sistem."
                    :items="faskes"
                    :is-loading-btn="isLoadingBtnFaskes"
                    :is-edit-mode="isEditFaskesMode"
                    :dialog-form-key="faskesDialogFormKey"
                    :dialog-initial-values="faskesDialogInitialValues"
                    :form-schema="faskesFormSchema"
                    :fields="faskesFields"
                    :on-open-create="openFaskesDialogCreate"
                    :on-edit-selected="onEditSelectedFaskes"
                    :on-delete-selected="onDeleteSelectedFaskes"
                    :on-submit="onSubmitFaskes"
                />

                <UnitRawatFieldManager
                    v-model:is-unit_rawat-dialog-open="isUnitRawatDialogOpen"
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

                <FormField
                    v-slot="{ componentField }"
                    name="posisi"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                >
                    <FormItem>
                        <FormLabel>Posisi</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Ex : Gudang A " v-bind="componentField" class="capitalize" />
                        </FormControl>
                        <FormErrorMessage />
                        <FormDescription>
                            Masukkan posisi atau area penugasan tenaga_medis di dalam lokasi unit_rawat, seperti Gudang A, Gudang B, atau Gudang Utama.
                        </FormDescription>
                    </FormItem>
                </FormField>
            </div>

            <div class="space-y-4 md:col-span-2">
                <Alert class="">
                    <ShieldAlert />
                    <AlertDescription>
                        <FormField
                            v-slot="{ componentField }"
                            name="activeTenagaMedis"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                            type="checkbox"
                        >
                            <Field orientation="horizontal">
                                <FieldContent class="gap-0">
                                    <FieldLabel for="activeTenagaMedis" class="text-crusoe-500"> Status Keaktifan TenagaMedis </FieldLabel>
                                    <FieldDescription> Mengatur kondisi keaktifan tenaga_medis dalam sistem. </FieldDescription>
                                </FieldContent>
                                <Switch id="activeTenagaMedis" v-bind="componentField" />
                            </Field>
                        </FormField>
                    </AlertDescription>
                </Alert>

                <Field orientation="horizontal">
                    <Button type="reset" variant="outline" :disabled="props.id"> Reset </Button>
                    <Button type="submit" class="shrink-0" :disabled="isLoadingBtnSubmit">
                        <Loader2 v-if="isLoadingBtnSubmit" class="h-4 w-4 animate-spin" />
                        {{ isUpdate ? 'Edit Data Nakes' : 'Tambah TenagaMedis Baru' }}
                    </Button>
                </Field>
            </div>
        </form>
    </PublicLayout>
</template>
