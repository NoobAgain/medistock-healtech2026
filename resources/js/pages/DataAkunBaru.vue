<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';
import {
    ALargeSmall,
    ArrowBigLeft,
    CheckIcon,
    ChevronsUpDownIcon,
    Eye,
    EyeOff,
    Loader2,
    MailIcon,
    RectangleEllipsis,
    ShieldAlert,
} from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import Field from '@/components/ui/field/Field.vue';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { isResponseSuccess, requiredSelectSchema } from '@/lib/libUtils';
import { cn } from '@/lib/utils';
import { akunbaruAddedit, akunbaruOpsi, dataakun } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const backPage = () => {
    router.visit(dataakun.url(), { replace: true });
};

const layout = useLayoutStore();
const isLoadingSubmit = ref(false);
const isUpdate = ref(false);

interface AkunFormData {
    id?: number | null;
    data?: {
        username?: string;
        email?: string;
        id_tenaga_medis?: string | number;
        role?: string | number;
        activeUser?: boolean;
    } | null;
}

const props = withDefaults(defineProps<AkunFormData>(), {
    id: null,
    data: null,
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Akun Pengguna', href: dataakun.url() },
        { label: 'Akun Pengguna Baru', href: '' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.4 } });

    getTenagaMedisRole();

    if (props.id && props.data) {
        bindDataToForm(props.data);
    }
});

/**
 * FORM
 */
const createSchema = z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka')
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password harus mengandung minimal 1 karakter spesial');

const formSchema = toTypedSchema(
    z.object({
        username: z.string({ required_error: 'Isian harus diisi' }).min(5, 'Minimal 5 karakter').max(255, 'Maksimal 255 karakter'),
        password: props.id ? z.union([z.literal(''), createSchema]) : createSchema,
        email: z.string().optional(),
        id_tenaga_medis: requiredSelectSchema(),
        role: requiredSelectSchema(),
        activeUser: z.boolean().default(false),
    }),
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        username: '',
        password: '',
        email: '',
        id_tenaga_medis: '',
        role: '',
        activeUser: true,
    },
});

/**
 * Button Action
 */
const onSubmitNewAkun = form.handleSubmit(async (values) => {
    let isNavigatingBack = false;
    isLoadingSubmit.value = true;

    try {
        const payload = {
            ...values,
            id: isUpdate.value ? props.id : undefined,
            activeUser: Boolean(values.activeUser),
        };

        const response = await axiosJS.post(akunbaruAddedit.url(), payload, { encrypt: true });
        const { status, message, errors } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess) {
            push.success({
                title: 'Berhasil',
                message: message ?? (isUpdate.value ? 'Data akun berhasil diperbarui.' : 'Data akun baru berhasil disimpan.'),
            });

            if (isUpdate.value) {
                isNavigatingBack = true;
                router.visit(dataakun.url(), {
                    replace: true,
                    onFinish: () => {
                        isLoadingSubmit.value = false;
                    },
                });
            } else {
                onResetForm();
            }

            return;
        }

        if (errors && typeof errors === 'object') {
            form.setErrors(errors as Record<string, string | string[]>);
        }

        push.error({
            title: 'Gagal',
            message: message ?? 'Gagal menyimpan data akun. Silahkan ulangi beberapa saat lagi!',
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
const onResetForm = () => {
    form.resetForm({
        values: {
            username: '',
            password: '',
            email: '',
            id_tenaga_medis: '',
            role: '',
            activeUser: true,
        },
    });
};

const bindDataToForm = (data: NonNullable<AkunFormData['data']>): void => {
    form.resetForm({
        values: {
            username: data.username ?? '',
            password: '',
            email: data.email ?? '',
            id_tenaga_medis: data.id_tenaga_medis ? String(data.id_tenaga_medis) : '',
            role: data.role ? String(data.role) : '',
            activeUser: Boolean(data.activeUser),
        },
    });

    isUpdate.value = true;
};

const AUTO_HIDE_DELAY = 1000;
const showPassword = ref(false);
let autoHideTimer: ReturnType<typeof setTimeout> | null = null;

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    if (autoHideTimer) {
        clearTimeout(autoHideTimer);
    }
    if (showPassword.value) {
        autoHideTimer = setTimeout(() => {
            showPassword.value = false;
        }, AUTO_HIDE_DELAY);
    }
};

export interface DataTenagaMedis {
    id: number;
    id_hash: string;
    nama: string;
    nrp: string;
}
export interface DataRole {
    id: number;
    display_name: string;
}

const dataTenagaMedis = ref<DataTenagaMedis[]>([]);
const dataRole = ref<DataRole[]>([]);
const open = ref(false);

const getSelectedTenagaMedisLabel = (selectedValue: unknown): string => {
    if (!selectedValue) {
        return 'Pilih Daftar TenagaMedis/Nakes';
    }

    const selected = dataTenagaMedis.value.find((tenaga_medis) => tenaga_medis.id.toString() === String(selectedValue));

    if (!selected) {
        return 'Pilih Daftar TenagaMedis/Nakes';
    }

    return `${selected.nrp} - ${selected.nama}`;
};

const getTenagaMedisRole = async () => {
    try {
        const response = await axiosJS.get(akunbaruOpsi.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess && data) {
            dataTenagaMedis.value = [...(data['tenaga_medis'] ?? [])];
            dataRole.value = [...(data['role'] ?? [])];
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <PublicLayout title="Akun Pengguna Baru" page-title="Akun Pengguna Baru" page-sub-title="Tambah akun pengguna baru ke dalam sistem">
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

        <form autocomplete="off" @submit.prevent="onSubmitNewAkun" @reset.prevent="onResetForm">
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <!-- KOLOM KIRI -->
                <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
                    <div class="lg:col-span-2">
                        <FormField
                            v-slot="{ componentField }"
                            name="username"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupInput type="text" placeholder="Username" v-bind="componentField" />
                                        <InputGroupAddon>
                                            <ALargeSmall />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormControl>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <!-- Password -->
                    <div class="lg:col-span-2">
                        <FormField
                            v-slot="{ componentField }"
                            name="password"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupInput :type="showPassword ? 'text' : 'password'" placeholder="Password" v-bind="componentField" />
                                        <InputGroupAddon>
                                            <RectangleEllipsis />
                                        </InputGroupAddon>
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                type="button"
                                                aria-label="view"
                                                title="view"
                                                size="icon-sm"
                                                @click="togglePasswordVisibility"
                                            >
                                                <div v-if="showPassword">
                                                    <EyeOff />
                                                </div>
                                                <div v-else>
                                                    <Eye />
                                                </div>
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormControl>
                                <FormDescription>
                                    Password harus terdiri dari minimal 8 karakter dan harus mengandung 1 huruf besar, 1 huruf kecil, 1 angka, serta 1
                                    karakter spesial untuk meningkatkan keamanan
                                </FormDescription>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <div class="lg:col-span-2">
                        <FormField
                            v-slot="{ componentField }"
                            name="email"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <InputGroup>
                                        <InputGroupInput type="email" placeholder="Email" v-bind="componentField" />
                                        <InputGroupAddon>
                                            <MailIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormControl>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>
                </div>

                <!-- KOLOM KANAN -->
                <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
                    <div class="lg:col-span-2">
                        <FormField
                            v-slot="{ componentField, errorMessage }"
                            name="id_tenaga_medis"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel class="flex justify-start text-start"> TenagaMedis / Nakes </FormLabel>
                                <FormControl>
                                    <div class="flex items-end gap-2">
                                        <div class="flex-1">
                                            <Popover v-model:open="open">
                                                <PopoverTrigger as-child>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        :aria-expanded="open"
                                                        :aria-invalid="!!errorMessage"
                                                        class="w-full justify-between"
                                                    >
                                                        <!-- :class="cn('truncate ps-3 text-start font-normal', !values.tgllahir && 'text-muted-foreground')" -->
                                                        <span
                                                            :class="
                                                                cn(
                                                                    'truncate text-start font-normal',
                                                                    !componentField.modelValue && 'text-muted-foreground',
                                                                )
                                                            "
                                                        >
                                                            {{ getSelectedTenagaMedisLabel(componentField.modelValue) }}
                                                        </span>
                                                        <ChevronsUpDownIcon class="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent class="w-(--reka-popover-trigger-width) p-0" align="start">
                                                    <Command class="w-full">
                                                        <CommandInput class="h-9" placeholder="Cari TenagaMedis/Nakes ..." />
                                                        <CommandList>
                                                            <CommandEmpty>Tidak ada nakes yang terpilih</CommandEmpty>
                                                            <CommandGroup class="w-full">
                                                                <CommandItem
                                                                    v-for="k in dataTenagaMedis"
                                                                    :key="k.id"
                                                                    :value="k.id.toString()"
                                                                    @select="
                                                                        (ev) => {
                                                                            const selectedValue = String(ev.detail.value ?? '');
                                                                            const currentValue = String(componentField.modelValue ?? '');
                                                                            const nextValue = selectedValue === currentValue ? '' : selectedValue;
                                                                            form.setFieldValue('id_tenaga_medis', nextValue);
                                                                            open = false;
                                                                        }
                                                                    "
                                                                >
                                                                    {{ k.nrp }} - {{ k.nama }}
                                                                    <CheckIcon
                                                                        :class="
                                                                            cn(
                                                                                'ml-auto',
                                                                                String(componentField.modelValue ?? '') === k.id.toString()
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )
                                                                        "
                                                                    />
                                                                </CommandItem>
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Silahkan pilih tenaga_medis/nakes yang terdaftar untuk identifikasi kepemilikan akun.
                                </FormDescription>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="lg:col-span-2">
                        <FormField
                            v-slot="{ componentField, errorMessage }"
                            name="role"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel class="flex justify-start text-start"> Role / Hak Akses </FormLabel>
                                <FormControl>
                                    <div class="flex items-end gap-2">
                                        <div class="flex-1">
                                            <Select v-bind="componentField">
                                                <SelectTrigger class="w-full" :aria-invalid="!!errorMessage">
                                                    <SelectValue placeholder="Pilih Daftar Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Daftar role tersedia :</SelectLabel>
                                                        <div v-for="k in dataRole" :key="k.id">
                                                            <SelectItem :value="k.id.toString()">{{ k.display_name }}</SelectItem>
                                                        </div>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Pastikan memilih nama role yang merepresentasikan level atau tanggung jawab pengguna secara tepat.
                                </FormDescription>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="lg:col-span-2">
                        <Alert>
                            <ShieldAlert />
                            <AlertDescription>
                                <FormField
                                    v-slot="{ componentField }"
                                    name="activeUser"
                                    :validate-on-change="false"
                                    :validate-on-model-update="false"
                                    :validate-on-blur="false"
                                    type="checkbox"
                                >
                                    <Field orientation="horizontal">
                                        <FieldContent class="gap-0">
                                            <FieldLabel for="activeUser" class="text-crusoe-500"> Status Keaktifan Akun </FieldLabel>
                                            <FieldDescription> Mengatur kondisi keaktifan akun dalam sistem. </FieldDescription>
                                        </FieldContent>
                                        <Switch id="activeUser" v-bind="componentField" />
                                    </Field>
                                </FormField>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </div>

            <!-- ACTION BUTTON -->
            <div class="mt-4 flex justify-start gap-2">
                <Button type="reset" variant="outline" :disabled="isUpdate"> Reset </Button>

                <Button type="submit" :disabled="isLoadingSubmit">
                    <Loader2 v-if="isLoadingSubmit" class="h-4 w-4 animate-spin" />
                    {{ isUpdate ? 'Edit Akun Pengguna' : 'Tambah Akun Baru' }}
                </Button>
            </div>
        </form>
    </PublicLayout>
</template>
