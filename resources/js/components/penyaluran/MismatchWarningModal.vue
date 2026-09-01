<script setup lang="ts">
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';

defineProps<{
    open: boolean;
    overrideReason: string;
    loading?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
    (e: 'update:overrideReason', value: string): void;
    (e: 'confirm-override'): void;
    (e: 'cancel'): void;
}>();
</script>

<template>
    <AlertDialog :open="open" @update:open="emit('update:open', $event)">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Warning Ukuran</AlertDialogTitle>
                <AlertDialogDescription> Ukuran item tidak sesuai dengan profil nakes. </AlertDialogDescription>
            </AlertDialogHeader>

            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Alasan Override <span class="text-red-500">*</span></label>
                <textarea
                    :value="overrideReason"
                    :disabled="loading"
                    rows="4"
                    placeholder="Jelaskan alasan override ukuran"
                    class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-amber-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                    @input="emit('update:overrideReason', ($event.target as HTMLTextAreaElement).value)"
                />
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel :disabled="loading" @click="emit('cancel')">Batal</AlertDialogCancel>
                <AlertDialogAction :disabled="loading" class="bg-amber-500 text-white hover:bg-amber-600" @click="emit('confirm-override')">
                    {{ loading ? 'Memproses...' : 'Override & Lanjutkan' }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
