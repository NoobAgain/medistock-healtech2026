<script setup lang="ts">
interface ManifestData {
    id?: number;
    nomor_manifest?: string;
    tanggal_pengiriman?: string;
    asal_gudang?: string;
    tujuan_unit_rawat?: string;
    total_item?: number;
}

interface ManifestOption {
    id: number;
    nomor_manifest?: string;
    tanggal_pengiriman?: string;
    status_text?: string;
}

defineProps<{
    manifest: ManifestData | null;
    manifests?: ManifestOption[];
    selectedManifestId?: string;
}>();

const emit = defineEmits<{
    (e: 'update:selectedManifestId', value: string): void;
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
        <div class="mb-4 flex items-center justify-between">
            <h2 class="text-base font-semibold text-slate-900">Informasi Manifest</h2>
            <div class="flex items-center gap-2">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Data Penerimaan</span>
                <select
                    v-if="(manifests?.length ?? 0) > 1"
                    :value="selectedManifestId"
                    class="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 transition outline-none focus:border-emerald-500"
                    @change="emit('update:selectedManifestId', ($event.target as HTMLSelectElement).value)"
                >
                    <option value="">Pilih Manifest</option>
                    <option v-for="item in manifests" :key="item.id" :value="String(item.id)">
                        {{ item.nomor_manifest }} - {{ item.status_text ?? '-' }}
                    </option>
                </select>
            </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-xs tracking-wide text-slate-500 uppercase">Nomor Manifest</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">{{ toDisplay(manifest?.nomor_manifest) }}</p>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-xs tracking-wide text-slate-500 uppercase">Tanggal Pengiriman</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">{{ toDisplay(manifest?.tanggal_pengiriman) }}</p>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-xs tracking-wide text-slate-500 uppercase">Asal Gudang</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">{{ toDisplay(manifest?.asal_gudang) }}</p>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-xs tracking-wide text-slate-500 uppercase">Tujuan UnitRawat</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">{{ toDisplay(manifest?.tujuan_unit_rawat) }}</p>
            </div>

            <div class="rounded-xl border border-emerald-300 bg-emerald-50 p-3">
                <p class="text-xs tracking-wide text-emerald-700 uppercase">Total Item</p>
                <p class="mt-1 text-sm font-semibold text-emerald-900">{{ Number(manifest?.total_item ?? 0) }}</p>
            </div>
        </div>
    </section>
</template>
