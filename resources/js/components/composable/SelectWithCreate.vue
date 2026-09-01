<script setup lang="ts">
import { Pencil, PlusCircle, Trash2 } from 'lucide-vue-next';
import { push } from 'notivue';
import { ref, watch } from 'vue';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isResponseSuccess } from '@/lib/libUtils';
import { ResultSelectWithCreate } from '@/types/globalType';
import Spinner from '@components/ui/spinner/Spinner.vue';
import axiosJS from '@lib/libAxios';
// import Spinner from '../ui/spinner/Spinner.vue';

interface Option {
    id: number | string;
    label: string;
}

const props = defineProps<{
    title?: string;
    options: Option[];
    placeholder?: string;
    loading?: boolean;
    createLabel?: string;
    onCreate?: () => Promise<Option | null>;
    routeAdd?: string;
    routeRemove?: string;
    onEditSelected?: (selectedValue: string | number | null | undefined) => void;
    onDeleteSelected?: (selectedValue: string | number | null | undefined) => void;
    modelValue?: string | number;
    onChange?: (value: any) => void;
    ariaInvalid?: boolean;
    valueResult?: ResultSelectWithCreate;
}>();

const formOpsi = ref({
    nama: '',
});

const isAddLoading = ref(false);
const formatValueByResult = (item: Option): string => {
    const resultType = props.valueResult ?? ResultSelectWithCreate.id;

    switch (resultType) {
        case ResultSelectWithCreate.name:
            return item.label || String(item.id);

        case ResultSelectWithCreate.json:
            return JSON.stringify({
                id: item.id,
                name: item.label,
                ...Object.fromEntries(Object.entries(item).filter(([key]) => key !== 'id' && key !== 'label')),
            });

        default:
            return String(item.id);
    }
};

const emit = defineEmits<{
    'update:modelValue': [value: string];
    'update:options': [options: Option[]];
}>();

const validateOption = (item: any): item is Option => {
    return item && item.id != null && item.label && typeof item.label === 'string';
};

const dialogOpen = ref(false);
const internalOptions = ref<Option[]>(props.options.filter(validateOption));
const selectedValue = ref<any>(null);

watch(
    () => props.options,
    (val) => {
        internalOptions.value = val.filter(validateOption);
    },
    { deep: true, immediate: true },
);

const handleCreate = async () => {
    try {
        if (props.onCreate && props.routeAdd) {
            throw new Error('Gunakan salah satu: onCreate atau routeAdd');
        }

        if (!props.onCreate && !props.routeAdd) {
            throw new Error('onCreate atau routeAdd harus diisi salah satu');
        }

        let newItem: Option | null = null;

        if (props.routeAdd) {
            isAddLoading.value = true;
            const res = await axiosJS.post(props.routeAdd, { nama: formOpsi.value.nama }, { encrypt: true });
            const { status, success, data: responseData } = res.data ?? {};
            const isSuccess = status === true || success === true || isResponseSuccess(status) || isResponseSuccess(success);
            formOpsi.value.nama = '';

            if (!isSuccess || !responseData || !responseData.id) {
                throw new Error('Response data tidak valid');
            }

            newItem = {
                id: responseData.id,
                label: responseData.label || responseData.nama || responseData.name,
            };

            isAddLoading.value = false;
            push.success({
                title: 'Berhasil',
                message: 'Data berhasil ditambahkan.',
            });
        }

        if (props.onCreate) {
            newItem = await props.onCreate();
        }

        if (newItem && newItem.id != null && newItem.label) {
            internalOptions.value.push(newItem);
            emit('update:options', internalOptions.value);
            const newValue = formatValueByResult(newItem);
            selectedValue.value = newValue;
            props.onChange?.(newValue);
            emit('update:modelValue', newValue);
        }

        dialogOpen.value = false;
    } catch (error) {
        console.error('Error creating item:', error);
        push.error({
            title: 'Gagal',
            message: 'Gagal menambahkan data.',
        });
    }
};

const handleSelectChange = (value: any) => {
    selectedValue.value = value;
    props.onChange?.(value);
    emit('update:modelValue', value == null ? '' : value);
};

const applyDeleteResult = (resolvedId: string | number): void => {
    console.log('=== applyDeleteResult ===');
    console.log('resolvedId:', resolvedId);
    console.log('internalOptions before:', JSON.stringify(internalOptions.value));

    internalOptions.value = internalOptions.value.filter((option) => String(option.id) !== String(resolvedId));

    console.log('internalOptions after:', JSON.stringify(internalOptions.value));

    emit('update:options', internalOptions.value);
    selectedValue.value = null;
    props.onChange?.(null);
    emit('update:modelValue', '');

    console.log('emitted update:modelValue with empty string');

    // internalOptions.value = internalOptions.value.filter((option) => String(option.id) !== String(resolvedId));
    // emit('update:options', internalOptions.value);
    // selectedValue.value = null;
    // props.onChange?.(null);
    // emit('update:modelValue', '');
};

const handleDeleteSelected = async (itemId: string | number | null | undefined) => {
    if (itemId == null) return;

    // Parse jika itemId adalah JSON string {"id":15,"name":"..."}
    let resolvedId: string | number = itemId;
    if (typeof itemId === 'string' && itemId.trim().startsWith('{')) {
        try {
            const parsed = JSON.parse(itemId);
            resolvedId = parsed.id ?? itemId;
        } catch {
            resolvedId = itemId;
        }
    }

    if (props.onDeleteSelected) {
        await Promise.resolve(props.onDeleteSelected(resolvedId));
        applyDeleteResult(resolvedId);
        return;
    }

    if (!props.routeRemove) return;

    try {
        const res = await axiosJS.post(props.routeRemove, { id: resolvedId }, { encrypt: true });
        const { status, success, message } = res.data ?? {};

        const isSuccess = status === true || success === true || isResponseSuccess(status) || isResponseSuccess(success);
        if (!isSuccess) {
            throw new Error(message || 'Gagal menghapus data');
        }

        applyDeleteResult(resolvedId);

        push.success({
            title: 'Berhasil',
            message: message || 'Data berhasil dihapus.',
        });
    } catch (error) {
        console.error('Error removing item:', error);
        push.error({
            title: 'Gagal',
            message: 'Gagal menghapus data.',
        });
    }
};

// const handleDeleteSelected = async (itemId: string | number | null | undefined) => {
//     if (itemId == null) {
//         return;
//     }

//     if (props.onDeleteSelected) {
//         props.onDeleteSelected(itemId);
//         return;
//     }

//     if (!props.routeRemove) {
//         return;
//     }

//     try {
//         const res = await axiosJS.post(props.routeRemove, { id: itemId }, { encrypt: true });
//         const { status, message } = res.data ?? {};
//         const isSuccess = isResponseSuccess(status);

//         if (!isSuccess) {
//             throw new Error(message || 'Gagal menghapus data');
//         }

//         internalOptions.value = internalOptions.value.filter((option) => String(option.id) !== String(itemId));
//         emit('update:options', internalOptions.value);
//         selectedValue.value = null;
//         props.onChange?.(null);
//         emit('update:modelValue', '');

//         push.success({
//             title: 'Berhasil',
//             message: message || 'Data berhasil dihapus.',
//         });
//     } catch (error) {
//         console.error('Error removing item:', error);
//         push.error({
//             title: 'Gagal',
//             message: 'Gagal menghapus data.',
//         });
//     }
// };
</script>

<template>
    <div class="flex flex-col gap-2">
        <Label v-if="title" :class="['flex justify-start text-start', { 'text-red-500': props.ariaInvalid }]">
            {{ title }}
        </Label>

        <div class="flex flex-wrap items-end gap-2">
            <div class="min-w-0 flex-1">
                <Select :model-value="String(modelValue ?? '')" :disabled="props.loading == true" @update:model-value="handleSelectChange">
                    <SelectTrigger class="w-full" :aria-invalid="props.ariaInvalid">
                        <div v-if="props.loading" class="flex items-center justify-center gap-3"><Spinner /> Tunggu ...</div>
                        <div v-else>
                            <SelectValue :placeholder="placeholder ?? 'Pilih data'" />
                        </div>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem v-for="item in internalOptions" :key="item.id" :value="formatValueByResult(item)">
                            {{ item.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- Edit/Delete buttons for selected item -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-x-2"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 translate-x-2"
            >
                <div v-if="modelValue && (onEditSelected || onDeleteSelected || routeRemove)" class="flex shrink-0 items-center gap-2">
                    <AnimatedTooltip v-if="onEditSelected" text="Edit item terpilih" position="left">
                        <Button type="button" size="icon" variant="outline" @click="props.onEditSelected?.(modelValue)">
                            <Pencil />
                        </Button>
                    </AnimatedTooltip>

                    <AnimatedTooltip v-if="onDeleteSelected || routeRemove" text="Hapus item terpilih" position="left">
                        <AlertDialog>
                            <AlertDialogTrigger as-child>
                                <Button type="button" size="icon" class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500">
                                    <Trash2 />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus Item?</AlertDialogTitle>
                                    <AlertDialogDescription> Yakin akan menghapus data item? </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                                        @click="handleDeleteSelected(modelValue)"
                                    >
                                        Hapus
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </AnimatedTooltip>
                </div>
            </Transition>

            <Dialog v-if="routeAdd" v-model:open="dialogOpen">
                <AnimatedTooltip text="Tambah item" position="left">
                    <DialogTrigger as-child>
                        <Button type="button" size="icon" class="shrink-0">
                            <PlusCircle />
                        </Button>
                    </DialogTrigger>
                </AnimatedTooltip>

                <DialogContent class="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {{ createLabel ?? 'Tambah Data' }}
                        </DialogTitle>
                        <DialogDescription> Tambahkan data baru ke dalam sistem. </DialogDescription>
                    </DialogHeader>

                    <div class="space-y-4">
                        <Input v-model="formOpsi.nama" />
                    </div>

                    <DialogFooter>
                        <Button type="button" :disabled="isAddLoading" @click="handleCreate">
                            <div v-if="isAddLoading">
                                <Spinner class="animate-spin" />
                            </div>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>
</template>
