<script setup lang="ts">
interface ScannedItem {
    item_id: string;
    nrp?: string;
    nama_item?: string;
    ukuran_item?: string;
    ukuran_nakes?: string;
    status_text?: string;
    override_reason?: string | null;
    delivered_at?: string;
}

defineProps<{
    items: ScannedItem[];
}>();

const toDisplay = (value: unknown): string => {
    if (value === null || value === undefined || value === '') {
        return '-';
    }

    return String(value);
};
</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-3 flex items-center justify-between">
            <h2 class="text-base font-semibold text-slate-900">Riwayat Penyaluran</h2>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{{ items.length }} item</span>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm">
                <thead>
                    <tr class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase">
                        <th class="px-3 py-2">Item ID</th>
                        <th class="px-3 py-2">Nama Item</th>
                        <th class="px-3 py-2">Ukuran Item</th>
                        <th class="px-3 py-2">Profil Ukuran Nakes</th>
                        <th class="px-3 py-2">Status</th>
                        <th class="px-3 py-2">Override Reason</th>
                        <th class="px-3 py-2">Waktu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="items.length === 0">
                        <td colspan="7" class="px-3 py-6 text-center text-sm text-slate-500">Belum ada item yang disalurkan.</td>
                    </tr>

                    <tr v-for="item in items" :key="item.item_id" class="border-b border-slate-100">
                        <td class="px-3 py-2 font-medium text-slate-900">{{ toDisplay(item.item_id) }}</td>
                        <td class="px-3 py-2 text-slate-700">{{ toDisplay(item.nama_item) }}</td>
                        <td class="px-3 py-2 text-slate-700">{{ toDisplay(item.ukuran_item) }}</td>
                        <td class="px-3 py-2 text-slate-700">{{ toDisplay(item.ukuran_nakes) }}</td>
                        <td class="px-3 py-2">
                            <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                {{ toDisplay(item.status_text) }}
                            </span>
                        </td>
                        <td class="px-3 py-2 text-slate-700">{{ toDisplay(item.override_reason) }}</td>
                        <td class="px-3 py-2 text-slate-700">{{ toDisplay(item.delivered_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
