<script setup lang="ts">
import DOMPurify from 'dompurify';
import AlertDialog from '@components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogAction from '@components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogContent from '@components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogDescription from '@components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '@components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogHeader from '@components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@components/ui/alert-dialog/AlertDialogTitle.vue';

interface Props<T = any> {
    open: boolean;
    item?: T | null;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    item: null,
    title: 'Konfirmasi Hapus',
    description: 'Data ini akan dihapus permanen.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    loading: false,
});

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
}>();

const close = () => {
    emit('update:open', false);
};

const onConfirm = () => {
    emit('confirm');
};

const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html);
};
</script>

<template>
    <AlertDialog :open="open" @update:open="emit('update:open', $event)">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {{ title }}
                </AlertDialogTitle>

                <AlertDialogDescription>
                    <span v-html="sanitizeHtml(description)" />
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel @click="close">
                    {{ cancelText }}
                </AlertDialogCancel>

                <AlertDialogAction :disabled="loading" class="bg-red-500 text-white hover:bg-red-600" @click="onConfirm">
                    {{ loading ? 'Memproses...' : confirmText }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
