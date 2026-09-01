<script setup lang="ts">
defineProps<{
    modelValue: string;
    disabled?: boolean;
    loading?: boolean;
    nfcConnected?: boolean;
    nfcBusy?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'scan'): void;
    (e: 'tap-nfc'): void;
    (e: 'disconnect-nfc'): void;
}>();

const onEnter = (): void => {
    emit('scan');
};
</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 class="text-base font-semibold text-slate-900">Scan Item</h2>
            <div class="flex items-center gap-2">
                <button
                    type="button"
                    :disabled="disabled || loading || nfcBusy"
                    class="h-9 rounded-lg bg-slate-800 px-3 text-xs font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
                    @click="emit('tap-nfc')"
                >
                    {{ nfcBusy ? 'Menyambungkan...' : 'Tap RFID/NTAG' }}
                </button>

                <button
                    type="button"
                    :disabled="!nfcConnected || loading"
                    class="h-9 rounded-lg bg-rose-500 px-3 text-xs font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-400"
                    @click="emit('disconnect-nfc')"
                >
                    Putus NFC
                </button>
            </div>
        </div>

        <p class="mb-3 text-xs text-slate-500">Gunakan tombol Tap RFID/NTAG untuk scan otomatis, atau isi manual NFC / Item_ID jika diperlukan.</p>

        <div class="flex flex-col gap-3 sm:flex-row">
            <input
                :value="modelValue"
                :disabled="disabled || loading"
                type="text"
                placeholder="Scan NFC / Item_ID"
                class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 ring-0 transition outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                @keyup.enter="onEnter"
            />

            <button
                type="button"
                :disabled="disabled || loading"
                class="h-11 min-w-40 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                @click="emit('scan')"
            >
                {{ loading ? 'Memproses...' : 'Validasi Scan' }}
            </button>
        </div>
    </section>
</template>
