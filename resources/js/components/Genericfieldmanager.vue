<script setup lang="ts" generic="T extends { id: number | string; nama?: string; kode?: string; [key: string]: any }">
import { Loader2, Pencil, PlusCircle, Trash2 } from 'lucide-vue-next';
import { Form } from 'vee-validate';
import { ref, watch } from 'vue';
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogTrigger from '@/components/ui/alert-dialog/AlertDialogTrigger.vue';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Button from '@/components/ui/button/Button.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue';
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import Field from '@/components/ui/field/Field.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select/Select.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectGroup from '@/components/ui/select/SelectGroup.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectLabel from '@/components/ui/select/SelectLabel.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import FormErrorMessage from '@components/composable/FormErrorMessage.vue';

/**
 * Definisi tiap field input di dalam dialog (form tambah/edit).
 */
export interface FieldDefinition {
    /** Nama field yang dipakai oleh vee-validate (harus sama dengan key di initialValues & schema) */
    name: string;
    /** Label yang ditampilkan di atas input */
    label: string;
    /** Placeholder pada input */
    placeholder?: string;
    /** Tipe input HTML, default 'text' */
    type?: string;
}

const props = withDefaults(
    defineProps<{
        /** Nama field di vee-validate form induk (misal: 'unit_rawat', 'pangkat', 'agama') */
        fieldName: string;
        /** Label yang tampil di atas select */
        label?: string;
        /** Teks kecil opsional di bawah label (misal: "(Batalyon)") */
        labelSub?: string;
        /** Teks placeholder pada SelectTrigger */
        placeholder?: string;
        /** Keterangan di bawah select */
        description?: string;
        /** Nama kelompok di dalam dropdown */
        groupLabel?: string;
        /** Teks judul di alert konfirmasi hapus */
        deleteDialogTitle?: string;
        /** Deskripsi di alert konfirmasi hapus */
        deleteDialogDescription?: string;

        // --- data ---
        items: T[];
        /**
         * Fungsi untuk mengambil teks yang ditampilkan pada setiap item.
         * Default: item.nama ?? item.kode ?? String(item.id)
         */
        getItemLabel?: (item: T) => string;
        /**
         * Fungsi untuk mengambil value setiap item.
         * Default: String(item.id)
         */
        getItemValue?: (item: T) => string;

        // --- state ---
        isLoadingBtn: boolean;
        isDialogOpen: boolean;
        isEditMode: boolean;
        dialogFormKey: number;
        dialogInitialValues: Record<string, any>;
        formSchema: Record<string, any>;

        /** Daftar field input di dalam dialog */
        fields: FieldDefinition[];

        // --- handlers ---
        onOpenCreate: () => void;
        onEditSelected: (selectedValue: string | number | null | undefined) => void;
        onDeleteSelected: (selectedValue: string | number | null | undefined) => void;
        onSubmit: (values: unknown) => void;
    }>(),
    {
        label: 'Item',
        placeholder: 'Pilih data',
        description: 'Silahkan tambah data jika belum tersedia.',
        groupLabel: 'Daftar yang tersedia :',
        deleteDialogTitle: 'Hapus data ini?',
        deleteDialogDescription:
            'Tindakan ini akan menghapus data dari sistem. Data yang masih digunakan dapat menyebabkan inkonsistensi. Lanjutkan hanya jika Anda yakin.',
    },
);

// ─── Resolver (menghindari implicit any di withDefaults) ──────────────────────

const resolveItemLabel = (item: T): string => (props.getItemLabel ? props.getItemLabel(item) : (item.nama ?? item.kode ?? String(item.id)));

const resolveItemValue = (item: T): string => (props.getItemValue ? props.getItemValue(item) : String(item.id));

// ─── Auto-refresh Select saat items berubah (tambah / edit / hapus) ───────────
// Prop selectKey tidak perlu lagi dikirim dari parent; komponen mengurus sendiri.

const internalSelectKey = ref(0);

watch(
    () => props.items,
    () => {
        internalSelectKey.value++;
    },
    { deep: true },
);

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<{
    (event: 'update:isDialogOpen', value: boolean): void;
}>();
</script>

<template>
    <Field orientation="horizontal">
        <FormField
            v-slot="{ componentField: innerField, errorMessage: fieldErrorMessage }"
            :name="props.fieldName"
            class="flex-1"
            :validate-on-change="false"
            :validate-on-model-update="false"
            validate-on-blur
        >
            <FormItem class="flex-1">
                <FormLabel class="flex justify-start text-start">
                    <template v-if="props.labelSub">
                        {{ props.label }}
                        <span class="ml-1 text-xs text-gray-500 italic">({{ props.labelSub }})</span>
                    </template>
                    <template v-else>
                        {{ props.label }}
                    </template>
                </FormLabel>

                <FormControl>
                    <div class="flex flex-wrap items-end gap-2">
                        <!-- Select — key dikelola internal, otomatis re-render saat items berubah -->
                        <div class="min-w-0 flex-1">
                            <Select :key="internalSelectKey" v-bind="innerField">
                                <SelectTrigger class="w-full" :aria-invalid="!!fieldErrorMessage">
                                    <SelectValue :placeholder="props.placeholder" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{{ props.groupLabel }}</SelectLabel>
                                        <SelectItem v-for="item in props.items" :key="resolveItemValue(item)" :value="resolveItemValue(item)">
                                            {{ resolveItemLabel(item) }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <!-- Edit & Delete (muncul saat ada item terpilih) -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 translate-x-2"
                            enter-to-class="opacity-100 translate-x-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-x-0"
                            leave-to-class="opacity-0 translate-x-2"
                        >
                            <div v-if="innerField.modelValue" class="flex shrink-0 items-center gap-2">
                                <!-- Edit -->
                                <AnimatedTooltip :text="`Edit ${props.label} terpilih`" position="left">
                                    <Button type="button" size="icon" variant="outline" @click="props.onEditSelected(innerField.modelValue)">
                                        <Pencil />
                                    </Button>
                                </AnimatedTooltip>

                                <!-- Delete -->
                                <AnimatedTooltip :text="`Hapus ${props.label} terpilih`" position="left">
                                    <AlertDialog>
                                        <AlertDialogTrigger as-child>
                                            <Button
                                                type="button"
                                                size="icon"
                                                class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{{ props.deleteDialogTitle }}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {{ props.deleteDialogDescription }}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                                                    @click="props.onDeleteSelected(innerField.modelValue)"
                                                >
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </AnimatedTooltip>
                            </div>
                        </Transition>

                        <!-- Dialog Tambah / Edit -->
                        <Dialog :open="props.isDialogOpen" @update:open="(value) => emit('update:isDialogOpen', value)">
                            <AnimatedTooltip :text="`Tambah ${props.label}`" position="left">
                                <DialogTrigger as-child>
                                    <Button type="button" size="icon" class="shrink-0" :disabled="props.isLoadingBtn" @click="props.onOpenCreate">
                                        <Loader2 v-if="props.isLoadingBtn" class="h-4 w-4 animate-spin" />
                                        <PlusCircle v-else />
                                    </Button>
                                </DialogTrigger>

                                <DialogContent class="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {{ props.isEditMode ? `Edit ${props.label}` : `Tambah ${props.label}` }}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Kelola data {{ props.label.toLowerCase() }} dengan menambahkan atau mengubah informasi yang tersedia dalam
                                            sistem.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <Form
                                        id="genericDialogForm"
                                        :key="props.dialogFormKey"
                                        as="form"
                                        class="grow space-y-6"
                                        autocomplete="off"
                                        :initial-values="props.dialogInitialValues"
                                        :validation-schema="props.formSchema"
                                        @submit="props.onSubmit"
                                    >
                                        <!-- Field-field dinamis -->
                                        <FormField
                                            v-for="fieldDef in props.fields"
                                            :key="fieldDef.name"
                                            v-slot="{ componentField }"
                                            :name="fieldDef.name"
                                        >
                                            <FormItem>
                                                <FormLabel>{{ fieldDef.label }}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        :type="fieldDef.type ?? 'text'"
                                                        :placeholder="fieldDef.placeholder ?? fieldDef.label"
                                                        v-bind="componentField"
                                                    />
                                                </FormControl>
                                                <FormErrorMessage />
                                            </FormItem>
                                        </FormField>

                                        <DialogFooter>
                                            <Button type="submit">
                                                {{ props.isEditMode ? 'Simpan Perubahan' : `Tambah ${props.label}` }}
                                            </Button>
                                        </DialogFooter>
                                    </Form>
                                </DialogContent>
                            </AnimatedTooltip>
                        </Dialog>
                    </div>
                </FormControl>

                <FormDescription>{{ props.description }}</FormDescription>
                <FormErrorMessage />
            </FormItem>
        </FormField>
    </Field>
</template>
