<script setup lang="ts">
import { Loader2, Pencil, PlusCircle, Trash2 } from 'lucide-vue-next';
import { Form } from 'vee-validate';
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
import type { UnitRawat } from '@/types/globalType';
import FormErrorMessage from '@components/composable/FormErrorMessage.vue';

const props = defineProps<{
    title?: string;
    unit_rawat: UnitRawat[];
    unit_rawatSelectKey: number;
    isLoadingBtnSat: boolean;
    isUnitRawatDialogOpen: boolean;
    isEditUnitRawatMode: boolean;
    unit_rawatDialogFormKey: number;
    unit_rawatDialogInitialValues: { nmunit_rawat: string };
    unit_rawatFormSchema: Record<string, any>;
    onOpenCreate: () => void;
    onEditSelected: (selectedValue: string | number | null | undefined) => void;
    onDeleteSelected: (selectedValue: string | number | null | undefined) => void;
    onSubmitNewUnitRawat: (values: unknown) => void;
}>();

const emit = defineEmits<{
    (event: 'update:isUnitRawatDialogOpen', value: boolean): void;
}>();
</script>

<template>
    <Field orientation="horizontal">
        <FormField
            v-slot="{ componentField: unit_rawatFieldInternal, errorMessage: fieldErrorMessage }"
            name="unit_rawat"
            class="flex-1"
            :validate-on-change="false"
            :validate-on-model-update="false"
            validate-on-blur
        >
            <FormItem class="flex-1">
                <FormLabel class="flex justify-start text-start">
                    <div v-if="title">
                        {{ title }}
                    </div>
                    <div v-else>
                        Unit Rawat
                        <span class="text-xs text-gray-500 italic">(Batalyon)</span>
                    </div>
                </FormLabel>

                <FormControl>
                    <div class="flex flex-wrap items-end gap-2">
                        <div class="min-w-0 flex-1">
                            <Select :key="props.unit_rawatSelectKey" v-bind="unit_rawatFieldInternal">
                                <SelectTrigger class="w-full" :aria-invalid="!!fieldErrorMessage">
                                    <SelectValue placeholder="Pilih Daftar UnitRawat" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Daftar UnitRawat yang tersedia :</SelectLabel>
                                        <SelectItem v-for="sat in props.unit_rawat" :key="sat.id" :value="sat.id.toString()">
                                            {{ sat.nama }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 translate-x-2"
                            enter-to-class="opacity-100 translate-x-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-x-0"
                            leave-to-class="opacity-0 translate-x-2"
                        >
                            <div v-if="unit_rawatFieldInternal.modelValue" class="flex shrink-0 items-center gap-2">
                                <AnimatedTooltip text="Edit UnitRawat terpilih" position="left">
                                    <Button type="button" size="icon" variant="outline" @click="props.onEditSelected(unit_rawatFieldInternal.modelValue)">
                                        <Pencil />
                                    </Button>
                                </AnimatedTooltip>

                                <AnimatedTooltip text="Hapus UnitRawat terpilih" position="left">
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
                                                <AlertDialogTitle>Hapus Unit Rawat?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini akan menghapus unit rawat dari sistem. Unit yang masih digunakan atau terasosiasi
                                                    dengan data personel lain berpotensi menyebabkan inkonsistensi data. Lanjutkan hanya jika Anda
                                                    yakin.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                                                    @click="props.onDeleteSelected(unit_rawatFieldInternal.modelValue)"
                                                >
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </AnimatedTooltip>
                            </div>
                        </Transition>

                        <Dialog :open="props.isUnitRawatDialogOpen" @update:open="(value) => emit('update:isUnitRawatDialogOpen', value)">
                            <AnimatedTooltip text="Tambah Unit Rawat" position="left">
                                <DialogTrigger as-child>
                                    <Button type="button" size="icon" class="shrink-0" :disabled="props.isLoadingBtnSat" @click="props.onOpenCreate">
                                        <div v-if="props.isLoadingBtnSat">
                                            <Loader2 class="h-4 w-4 animate-spin" />
                                        </div>
                                        <div v-else>
                                            <PlusCircle />
                                        </div>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>{{ props.isEditUnitRawatMode ? 'Edit Unit Rawat' : 'Tambah Unit Rawat' }}</DialogTitle>
                                        <DialogDescription>
                                            Kelola data unit rawat dengan menambahkan informasi unit_rawat yang tersedia dalam sistem.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form
                                        id="dialogForm"
                                        :key="props.unit_rawatDialogFormKey"
                                        as="form"
                                        class="grow space-y-6"
                                        autocomplete="off"
                                        :initial-values="props.unit_rawatDialogInitialValues"
                                        :validation-schema="props.unit_rawatFormSchema"
                                        @submit="props.onSubmitNewUnitRawat"
                                    >
                                        <FormField v-slot="{ componentField }" name="nmunit_rawat">
                                            <FormItem>
                                                <FormLabel>Nama UnitRawat</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Nama unit UnitRawat" v-bind="componentField" />
                                                </FormControl>
                                                <FormErrorMessage />
                                                <FormDescription>Kode unit_rawat akan dibuat otomatis oleh sistem.</FormDescription>
                                            </FormItem>
                                        </FormField>

                                        <DialogFooter>
                                            <Button type="submit">
                                                {{ props.isEditUnitRawatMode ? 'Simpan Perubahan' : 'Tambah UnitRawat Baru' }}
                                            </Button>
                                        </DialogFooter>
                                    </Form>
                                </DialogContent>
                            </AnimatedTooltip>
                        </Dialog>
                    </div>
                </FormControl>

                <FormDescription> Silahkan tambah unit rawat jika belum tersedia. </FormDescription>
                <FormErrorMessage />
            </FormItem>
        </FormField>
    </Field>
</template>
