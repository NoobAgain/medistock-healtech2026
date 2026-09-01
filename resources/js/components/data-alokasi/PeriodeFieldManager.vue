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
import type { Periode } from '@/types/globalType';
import FormErrorMessage from '@components/composable/FormErrorMessage.vue';

const props = defineProps<{
    title?: string;
    periode: Periode[];
    periodeSelectKey: number;
    isLoadingBtnPeriode: boolean;
    isPeriodeDialogOpen: boolean;
    isEditPeriodeMode: boolean;
    periodeDialogFormKey: number;
    periodeDialogInitialValues: { nama: string };
    periodeFormSchema: Record<string, any>;
    canManagePeriode: boolean;
    onOpenCreate: () => void;
    onEditSelected: (selectedValue: string | number | null | undefined) => void;
    onDeleteSelected: (selectedValue: string | number | null | undefined) => void;
    onSubmitNewPeriode: (values: unknown) => void;
}>();

const emit = defineEmits<{
    (event: 'update:isPeriodeDialogOpen', value: boolean): void;
}>();
</script>

<template>
    <Field orientation="horizontal">
        <FormField
            v-slot="{ componentField: periodeFieldInternal, errorMessage: fieldErrorMessage }"
            name="periode"
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
                    <div v-else>Periode Alokasi</div>
                </FormLabel>

                <FormControl>
                    <div class="flex flex-wrap items-end gap-2">
                        <div class="min-w-0 flex-1">
                            <Select :key="props.periodeSelectKey" v-bind="periodeFieldInternal">
                                <SelectTrigger class="w-full" :aria-invalid="!!fieldErrorMessage">
                                    <SelectValue placeholder="Pilih Periode" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Daftar Periode yang tersedia :</SelectLabel>
                                        <SelectItem v-for="per in props.periode" :key="per.id" :value="per.id.toString()">
                                            {{ per.nama }}
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
                            <div v-if="periodeFieldInternal.modelValue && props.canManagePeriode" class="flex shrink-0 items-center gap-2">
                                <AnimatedTooltip text="Edit Periode terpilih" position="left">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        @click="props.onEditSelected(periodeFieldInternal.modelValue)"
                                    >
                                        <Pencil />
                                    </Button>
                                </AnimatedTooltip>

                                <AnimatedTooltip text="Hapus Periode terpilih" position="left">
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
                                                <AlertDialogTitle>Hapus Periode?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini akan menghapus periode dari sistem. Periode yang masih digunakan dalam alokasi
                                                    berpotensi menyebabkan inkonsistensi data. Lanjutkan hanya jika Anda yakin.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    class="bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                                                    @click="props.onDeleteSelected(periodeFieldInternal.modelValue)"
                                                >
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </AnimatedTooltip>
                            </div>
                        </Transition>

                        <Dialog :open="props.isPeriodeDialogOpen" @update:open="(value) => emit('update:isPeriodeDialogOpen', value)">
                            <AnimatedTooltip v-if="props.canManagePeriode" text="Tambah Periode" position="left">
                                <DialogTrigger as-child>
                                    <Button
                                        type="button"
                                        size="icon"
                                        class="shrink-0"
                                        :disabled="props.isLoadingBtnPeriode"
                                        @click="props.onOpenCreate"
                                    >
                                        <div v-if="props.isLoadingBtnPeriode">
                                            <Loader2 class="h-4 w-4 animate-spin" />
                                        </div>
                                        <div v-else>
                                            <PlusCircle />
                                        </div>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>{{ props.isEditPeriodeMode ? 'Edit Periode' : 'Tambah Periode' }}</DialogTitle>
                                        <DialogDescription>
                                            Kelola data periode alokasi dengan menambahkan informasi periode yang tersedia dalam sistem.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form
                                        id="dialogForm"
                                        :key="props.periodeDialogFormKey"
                                        as="form"
                                        class="grow space-y-6"
                                        autocomplete="off"
                                        :initial-values="props.periodeDialogInitialValues"
                                        :validation-schema="props.periodeFormSchema"
                                        @submit="props.onSubmitNewPeriode"
                                    >
                                        <FormField v-slot="{ componentField }" name="nama">
                                            <FormItem>
                                                <FormLabel>Nama Periode</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Nama periode (contoh: 2026-01)" v-bind="componentField" />
                                                </FormControl>
                                                <FormErrorMessage />
                                                <FormDescription
                                                    >Contoh format: 2026-01, Januari 2026, atau format lainnya sesuai kebutuhan.</FormDescription
                                                >
                                            </FormItem>
                                        </FormField>

                                        <DialogFooter>
                                            <Button type="submit">
                                                {{ props.isEditPeriodeMode ? 'Simpan Perubahan' : 'Tambah Periode Baru' }}
                                            </Button>
                                        </DialogFooter>
                                    </Form>
                                </DialogContent>
                            </AnimatedTooltip>
                        </Dialog>
                    </div>
                </FormControl>

                <FormDescription> Silahkan tambah periode jika belum tersedia. </FormDescription>
                <FormErrorMessage />
            </FormItem>
        </FormField>
    </Field>
</template>
