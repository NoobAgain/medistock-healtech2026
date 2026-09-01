<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';
import { ArrowBigLeft, Loader2 } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';

import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Field from '@/components/ui/field/Field.vue';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import libGlowEffect from '@/lib/libGlowEffect';
import { isResponseSuccess, toProperCase, toTextValue } from '@/lib/libUtils';
import { datarole, dataroleBaru } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import { FormField } from '@components/ui/form';
import axiosJS from '@lib/libAxios';

const layout = useLayoutStore();
interface RoleFormData {
    id?: number | null;
    displayname?: string | '';
    dataPermissions?: string[];
    allPermission: string[];
}
const props = withDefaults(defineProps<RoleFormData>(), {
    id: null,
    displayname: '',
    dataPermissions: () => [],
    allPermission: () => [],
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Hak Akses', href: datarole.url() }, { label: 'Hak Akses Baru' }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.5 } });

    // console.log(permissions);
    if (props.id) {
        bindDataToForm(props);
    }
});
const backPage = () => {
    router.visit(datarole.url(), { replace: true });
};

const formSchema = toTypedSchema(
    z.object({
        displayname: z.string({ required_error: 'Isian harus diisi' }).min(5, 'Minimal 5 karakter').max(255, 'Maksimal 255 karakter'),
        permissions: z.array(z.string()).optional(),
    }),
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        displayname: '',
        permissions: [] as string[],
    },
});

const bindDataToForm = (data: RoleFormData): void => {
    form.resetForm({
        values: {
            displayname: toTextValue(data.displayname),
            permissions: data.dataPermissions ?? [],
        },
    });
    isUpdate.value = true;
};

const isLoadingSubmit = ref(false);
const isUpdate = ref(false);

const onSubmitRole = form.handleSubmit(async (values) => {
    let isNavigatingBack = false;
    isLoadingSubmit.value = true;

    try {
        const payload = {
            ...values,
            id: isUpdate.value ? props.id : undefined,
            permissions: Array.from(new Set((form.values.permissions as string[] | undefined) ?? [])),
        };

        const response = await axiosJS.post(dataroleBaru.url(), payload, { encrypt: true });
        const { status, message, errors } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? 'Role baru berhasil disimpan.',
            });

            isNavigatingBack = true;
            router.visit(datarole.url(), {
                replace: true,
                onFinish: () => {
                    isLoadingSubmit.value = false;
                },
            });

            return;
        }

        if (errors && typeof errors === 'object') {
            form.setErrors(errors as Record<string, string | string[]>);
        }

        push.error({
            title: 'Gagal',
            message: message ?? 'Gagal menyimpan data role. Silahkan ulangi beberapa saat lagi!',
        });
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        if (!isNavigatingBack) {
            isLoadingSubmit.value = false;
        }
    }
});

const onResetMainForm = () => {
    form.resetForm({
        values: {
            displayname: '',
            permissions: [] as string[],
        },
    });
};

const permissions = props.allPermission;
const selectedPermissions = () => (form.values.permissions as string[]) ?? [];
const parentMenus = computed(() => permissions.filter((p) => p.startsWith('menu.') && p.split('.').length === 2));

const getChildren = (parent: string) => {
    return permissions.filter((p) => p.startsWith(parent + '.'));
};
const actionLabelMap: Record<string, string> = {
    baru: 'Tambah Data',
    edit: 'Edit Data',
    hapus: 'Hapus Data',
    cetak: 'Cetak Data',
    disaktif: 'Nonaktifkan Data',
    confirm: 'Konfirmasi',
    monitoring: 'Monitoring',
    transit: 'Transit',
    tiba: 'Tiba',
    dataitem: 'Data Item',
    addeditperiode: 'Tambah/Edit/Hapus Periode',
    accrencana: 'Acc Rencana Penyaluran',
    accrencanapusat: 'Acc Rencana Penyaluran (Pusat)',
    caridata: 'Pencarian data Box/Item',
    testreader: 'Test Pembacaan RFID/nTAG',
};

const getMenuTitle = (permission: string) => {
    const key = permission.replace('menu.', '');
    return titleLabelMap[key] ?? key;
};
const titleLabelMap: Record<string, string> = {
    dataakun: 'Akun Pengguna',
    tenaga_medis: 'Data Nakes',
    alokasi: 'Data Rencana Penyaluran',
    datarole: 'Data Hak Akses',
    regitem: 'Registrasi Item',
};
const getParentState = (parent: string): boolean | 'indeterminate' => {
    const children = getChildren(parent);
    const checkedChildren = children.filter((c) => selectedPermissions().includes(c));

    if (checkedChildren.length === 0) return false;
    if (checkedChildren.length === children.length) return true;
    return 'indeterminate';
};

const onParentChange = (parent: string, checked: boolean | 'indeterminate') => {
    const related = [parent, ...getChildren(parent)];
    if (checked === true) {
        form.setFieldValue('permissions', Array.from(new Set([...selectedPermissions(), ...related])));
    } else {
        form.setFieldValue(
            'permissions',
            selectedPermissions().filter((p) => !related.includes(p)),
        );
    }
};

const onChildChange = (parent: string, child: string, checked: boolean | 'indeterminate') => {
    const nextChecked = checked === true;
    let updated = nextChecked ? Array.from(new Set([...selectedPermissions(), child])) : selectedPermissions().filter((p) => p !== child);

    const anyChildActive = getChildren(parent).some((c) => updated.includes(c));
    if (anyChildActive) {
        updated = Array.from(new Set([...updated, parent]));
    } else {
        updated = updated.filter((p) => p !== parent);
    }

    form.setFieldValue('permissions', updated);
};
</script>

<template>
    <PublicLayout
        title="Hak Akses Baru"
        page-title="Hak Akses Baru"
        page-sub-title="Kelola peran dan hak akses pengguna untuk memastikan kontrol sistem yang terstruktur dan aman."
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
        <form autocomplete="off" @submit.prevent="onSubmitRole" @reset.prevent="onResetMainForm">
            <div class="mb-5 grid grow grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                    v-slot="{ componentField }"
                    name="displayname"
                    :validate-on-change="false"
                    :validate-on-model-update="false"
                    :validate-on-blur="false"
                    class="md:w-1/2"
                >
                    <FormItem>
                        <FormLabel>Nama Role / Hak Akses</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nama role" v-bind="componentField" />
                        </FormControl>
                        <FormErrorMessage />
                    </FormItem>
                </FormField>
            </div>

            <div class="mb-5 grid grow grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Card v-for="parent in parentMenus" :key="parent" class="relative w-full transition duration-300 hover:shadow-xl">
                    <libGlowEffect />
                    <CardHeader>
                        <CardTitle>Akses {{ toProperCase(getMenuTitle(parent)) }}</CardTitle>
                        <CardDescription> Pengaturan hak akses untuk menu {{ getMenuTitle(parent).toLowerCase() }} </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField name="permissions">
                            <FormItem>
                                <div class="flex flex-col gap-3">
                                    <!-- Parent Permission -->
                                    <FormControl>
                                        <div class="flex items-start gap-3">
                                            <Checkbox
                                                :id="parent"
                                                :model-value="getParentState(parent)"
                                                @update:model-value="(val: boolean | 'indeterminate') => onParentChange(parent, val)"
                                            />
                                            <Label :for="parent" class="font-light"> Akses Halaman </Label>
                                        </div>
                                    </FormControl>

                                    <!-- Child Permissions -->
                                    <FormControl v-for="child in getChildren(parent)" :key="child">
                                        <div class="flex items-start gap-3">
                                            <Checkbox
                                                :id="child"
                                                :model-value="selectedPermissions().includes(child)"
                                                @update:model-value="(val: boolean | 'indeterminate') => onChildChange(parent, child, val)"
                                            />
                                            <Label :for="child" class="font-light">
                                                {{ actionLabelMap[child.split('.').pop()!] ?? child }}
                                            </Label>
                                        </div>
                                    </FormControl>
                                </div>
                            </FormItem>
                        </FormField>
                    </CardContent>
                </Card>
            </div>

            <div class="space-y-4 md:col-span-2">
                <Field orientation="horizontal">
                    <Button type="reset" variant="outline" :disabled="isUpdate"> Reset </Button>
                    <Button type="submit" class="shrink-0" :disabled="isLoadingSubmit">
                        <Loader2 v-if="isLoadingSubmit" class="h-4 w-4 animate-spin" />
                        {{ isUpdate ? 'Edit Data Role' : 'Tambah Role Baru' }}
                    </Button>
                </Field>
            </div>
        </form>
    </PublicLayout>
</template>
