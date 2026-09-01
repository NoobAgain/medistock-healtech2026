<script setup lang="ts">
import axios from 'axios';
import { History, Search, RefreshCw, Wifi, WifiOff } from 'lucide-vue-next';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent } from '@/lib/libNCF';
import { pelacakanItem } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';

interface TraceEvent {
    id: number;
    status: number;
    statusLabel: string;
    note: string;
    lokasi: string;
    createdBy: string;
    createdAt: string;
}

interface TracePengirimanInfo {
    id: number;
    uid: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    createdBy: string;
    createdAt: string;
}

interface TracePenerima {
    nama: string;
    nrp: string;
    pangkat: string;
    createdAt: string;
}

interface TraceAlokasi {
    nan: string;
    unit_rawat: string;
    periode: string;
    tenaga_medis: {
        nama: string;
        nrp: string;
        pangkat: string;
    } | null;
}

interface TraceResultItem {
    type: 'item';
    id: number;
    nsn: string;
    hash: string;
    itemStatus: number;
    alokasi: TraceAlokasi | null;
    pengiriman: TracePengirimanInfo | null;
    events: TraceEvent[];
    penerima: TracePenerima | null;
}

interface TraceResultPengiriman {
    type: 'pengiriman';
    id: number;
    uid: string;
    hash: string;
    nan: string;
    unit_rawat: string;
    periode: string;
    jumlah: number;
    items: Array<{
        id: number;
        nsn: string;
        hash: string;
        status: number;
    }>;
    pengiriman: TracePengirimanInfo;
    events: TraceEvent[];
    createdBy: string;
    createdAt: string;
}

interface TraceResultAlokasi {
    type: 'alokasi';
    nan: string;
    jumlah: number;
    jenis: string[];
    kategori: string[];
    items: Array<{
        id: number;
        nsn: string;
        status: number;
    }>;
}

type TraceResult = TraceResultItem | TraceResultAlokasi | TraceResultPengiriman;

const layout = useLayoutStore();
const identifier = ref('');
const nfcHash = ref('');
const result = ref<TraceResult | null>(null);
const loading = ref(false);
const error = ref('');
const indicatorActive = ref(false);
let indicatorTimer: NodeJS.Timeout | null = null;

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Pelacakan', href: pelacakanItem.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.6 } });

    setupNfcEvents();
});

onBeforeUnmount(() => {
    NfcTagEvent.off('onTagReady');
    NfcTagEvent.off('onTagRead');
    NfcTagEvent.off('onTagUnverified');
    NfcTagEvent.off('onCloneDetected');
    if (nfcIsConnected.value) {
        disconnectSerial();
    }
    if (indicatorTimer) {
        clearTimeout(indicatorTimer);
    }
});

const triggerIndicator = (): void => {
    indicatorActive.value = false;
    requestAnimationFrame(() => {
        indicatorActive.value = true;
    });
    if (indicatorTimer) {
        clearTimeout(indicatorTimer);
    }
    indicatorTimer = setTimeout(() => {
        indicatorActive.value = false;
    }, 500);
};

const processTag = (uid: string, hash: string = ''): void => {
    triggerIndicator();

    const cleanUid = uid?.trim() || '';
    const cleanHash = hash?.trim() || '';
    const currentHash = nfcHash.value.trim();

    if (!cleanUid || (cleanHash && cleanHash === currentHash)) return;

    identifier.value = cleanUid;
    nfcHash.value = cleanHash;
    // Trigger search after NFC read
    setTimeout(() => {
        search();
    }, 100);
};

const setupNfcEvents = (): void => {
    NfcTagEvent.on('onTagReady', (ready: any) => {
        console.log('NFC siap:', ready);
    });

    NfcTagEvent.on('onTagRead', (tag: any) => {
        console.log('Kartu terbaca:', tag.uid, 'Hash:', tag.data);
        processTag(tag.uid, tag.data);
    });

    NfcTagEvent.on('onTagUnverified', (tag: any) => {
        console.log('Kartu tidak terverifikasi:', tag.uid, 'Hash:', tag.data);
        processTag(tag.uid, tag.data);
    });

    NfcTagEvent.on('onCloneDetected', ({ uid, data }: any) => {
        console.log('Clone terdeteksi:', uid, 'Hash:', data);
        processTag(uid, data);
    });
};

const toggleNfcReader = async () => {
    try {
        if (nfcIsConnected.value) {
            await disconnectSerial();
        } else {
            await connectSerial();
        }
    } catch (err) {
        error.value = 'Gagal menghubungkan NFC reader.';
        console.error(err);
    }
};

const search = async () => {
    const searchValue = nfcHash.value.trim() || identifier.value.trim();
    const isHashSearch = !!nfcHash.value.trim();

    if (!searchValue) {
        error.value = 'Silahkan masukkan UID Box, Nomor Alokasi, Nomor Stok, atau tap NFC tag.';
        return;
    }

    loading.value = true;
    error.value = '';
    result.value = null;
    try {
        const response = await axios.post('/pelacakan-item/search', {
            identifier: searchValue,
            type: isHashSearch ? 'hash' : undefined,
        });
        if (response.data.success) {
            result.value = response.data.data;
        } else {
            error.value = response.data.message || 'Data tidak ditemukan.';
        }
    } catch (err) {
        error.value = 'Terjadi kesalahan saat mencari.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getStatusLabel = (status: number): string => {
    const labels: { [key: number]: string } = {
        1: 'Dikirim',
        2: 'Dalam Transit',
        3: 'Diterima',
        4: 'Tersimpan',
        9: 'Masalah',
    };
    return labels[status] || 'Tidak Diketahui';
};

const traceEventStatusClass = (status: number): string => {
    switch (status) {
        case 1:
            return 'bg-blue-500 border-blue-500';
        case 2:
            return 'bg-yellow-500 border-yellow-500';
        case 3:
            return 'bg-green-500 border-green-500';
        case 4:
            return 'bg-purple-500 border-purple-500';
        case 9:
            return 'bg-red-500 border-red-500';
        default:
            return 'bg-gray-500 border-gray-500';
    }
};

const statusColorClass = (status: number): string => {
    switch (status) {
        case 1:
            return 'text-blue-700 border-blue-200 bg-blue-50';
        case 2:
            return 'text-yellow-700 border-yellow-200 bg-yellow-50';
        case 3:
            return 'text-green-700 border-green-200 bg-green-50';
        case 4:
            return 'text-purple-700 border-purple-200 bg-purple-50';
        case 9:
            return 'text-red-700 border-red-200 bg-red-50';
        default:
            return 'text-gray-700 border-gray-200 bg-gray-50';
    }
};
</script>

<template>
    <PublicLayout title="Pelacakan Item" page-title="Pelacakan" page-sub-title="Pantau status, lokasi, dan riwayat pengiriman box atau item">
        <div class="space-y-6 px-4 lg:px-6">
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="flex items-center gap-2 text-base font-semibold">
                        <History class="size-4" />
                        Penelusuran Box atau Item
                    </CardTitle>
                    <CardDescription>Cari dengan UID Box, Nomor Alokasi, Nomor Stok, atau gunakan NFC Reader</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <!-- Error Message -->
                    <div v-if="error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {{ error }}
                    </div>

                    <!-- Hash Display (tampil jika ada hash dari NFC) -->
                    <div v-if="nfcHash" class="space-y-2 rounded-md border border-green-200 bg-green-50 p-3">
                        <p class="text-xs font-semibold text-green-700">✓ Hash Terdeteksi dari NFC</p>
                        <p class="font-mono text-xs break-all text-green-900">{{ nfcHash }}</p>
                        <button
                            class="text-crusoe-500 hover:text-crusoe-700 text-xs font-semibold underline"
                            @click="
                                () => {
                                    nfcHash = '';
                                    identifier = '';
                                    result = null;
                                    error = '';
                                }
                            "
                        >
                            Hapus Hash & Cari Manual
                        </button>
                    </div>

                    <!-- Input Field with Manual and Reader Options -->
                    <div class="flex gap-2">
                        <div class="relative flex-1">
                            <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                            <input
                                v-model="identifier"
                                :disabled="!!nfcHash"
                                type="text"
                                :placeholder="nfcHash ? 'Cari berdasarkan hash dari NFC...' : 'Masukkan UID Box, Nomor Alokasi, atau Nomor Stok...'"
                                class="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border pr-4 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
                                @keydown.enter="search"
                            />
                        </div>
                        <button
                            class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:opacity-50"
                            :disabled="loading || (!nfcHash && !identifier.trim())"
                            @click="search"
                        >
                            <RefreshCw v-if="loading" class="size-4 animate-spin" />
                            <Search v-else class="size-4" />
                            {{ nfcHash ? 'Cari Data' : 'Lacak' }}
                        </button>
                    </div>

                    <!-- NFC Reader Connection -->
                    <div class="space-y-3">
                        <div class="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 p-3">
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-blue-900">nTag / Kartu NFC</p>
                                <p v-if="nfcIsConnected" class="text-xs font-semibold text-blue-700 italic">✓ NFC Reader Terhubung</p>
                                <p v-else class="text-xs font-semibold text-red-500 italic">✗ NFC Reader Tidak Terhubung</p>
                            </div>
                            <button
                                :class="[
                                    'inline-flex h-10 items-center gap-2 rounded-md px-3 text-xs font-semibold transition',
                                    nfcIsConnected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-amber-500 text-white hover:bg-amber-600',
                                ]"
                                @click="toggleNfcReader"
                            >
                                <Wifi v-if="nfcIsConnected" class="size-4" />
                                <WifiOff v-else class="size-4" />
                                {{ nfcIsConnected ? 'Diskoneksi Reader' : 'Hubungkan Reader' }}
                            </button>
                        </div>
                        <div class="flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50/50 p-2 text-xs text-blue-700">
                            <span class="mt-0.5 font-bold">ℹ</span>
                            <span
                                >Hubungkan NFC Reader, lalu tempelkan (tap) tag atau kartu NFC/NTAG pada perangkat untuk memulai proses
                                pemindaian.</span
                            >
                        </div>
                        <div class="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-2">
                            <span class="text-xs font-semibold text-gray-700">Status Pemindaian:</span>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-gray-600">
                                    {{ indicatorActive ? 'Tag terdeteksi' : 'Menunggu...' }}
                                </span>
                                <Transition
                                    enter-active-class="transition-all duration-200"
                                    enter-from-class="opacity-0 scale-75"
                                    enter-to-class="opacity-100 scale-100"
                                    leave-active-class="transition-all duration-200"
                                    leave-from-class="opacity-100 scale-100"
                                    leave-to-class="opacity-0 scale-75"
                                >
                                    <div v-if="indicatorActive" class="h-2 w-2 rounded-full bg-green-500" />
                                </Transition>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Results Section -->
            <div v-if="result" class="space-y-4">
                <!-- Item Trace Result -->
                <div v-if="result.type === 'item'" class="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Detail Item</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                <div>
                                    <p class="text-muted-foreground">Nomor Alokasi</p>
                                    <p class="font-semibold">{{ result.nsn }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Status</p>
                                    <p :class="['font-semibold', statusColorClass(result.itemStatus)]">
                                        {{ getStatusLabel(result.itemStatus) }}
                                    </p>
                                </div>
                                <div>
                                    <!-- <p class="text-muted-foreground">ID Item</p> -->
                                    <!-- <p class="font-semibold">{{ result.id }}</p> -->
                                </div>
                            </div>

                            <!-- Alokasi Info -->
                            <div v-if="result.alokasi" class="border-t pt-4">
                                <h3 class="mb-2 text-sm font-semibold">Informasi Alokasi</h3>
                                <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                                    <div>
                                        <p class="text-muted-foreground">Nomor Alokasi</p>
                                        <p class="font-semibold">{{ result.alokasi.nan }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">UnitRawat</p>
                                        <p class="font-semibold">{{ result.alokasi.unit_rawat }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">Periode</p>
                                        <p class="font-semibold">{{ result.alokasi.periode }}</p>
                                    </div>
                                </div>
                                <div v-if="result.alokasi.tenaga_medis" class="mt-3 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                                    <div>
                                        <p class="text-muted-foreground">TenagaMedis - Nama</p>
                                        <p class="font-semibold">{{ result.alokasi.tenaga_medis.nama }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">TenagaMedis - NRP</p>
                                        <p class="font-semibold">{{ result.alokasi.tenaga_medis.nrp }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">TenagaMedis - Pangkat</p>
                                        <p class="font-semibold">{{ result.alokasi.tenaga_medis.pangkat }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Pengiriman Info -->
                            <div v-if="result.itemStatus === 1" class="border-t pt-4">
                                <h3 class="mb-2 text-sm font-semibold">Informasi Pengiriman</h3>
                                <div v-if="result.pengiriman" class="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                                    <div>
                                        <p class="text-muted-foreground">UID Box</p>
                                        <p class="font-semibold">{{ result.pengiriman.uid }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">Nomor Alokasi</p>
                                        <p class="font-semibold">{{ result.pengiriman.nan }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">Periode</p>
                                        <p class="font-semibold">{{ result.pengiriman.periode }}</p>
                                    </div>
                                </div>
                                <div v-else class="text-muted-foreground text-sm italic">Belum ada informasi pengiriman</div>
                            </div>

                            <!-- Penerima Info -->
                            <div v-if="result.penerima" class="border-t pt-4">
                                <h3 class="mb-2 text-sm font-semibold">Penerima</h3>
                                <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                                    <div>
                                        <p class="text-muted-foreground">Nama</p>
                                        <p class="font-semibold">{{ result.penerima.nama }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">NRP</p>
                                        <p class="font-semibold">{{ result.penerima.nrp }}</p>
                                    </div>
                                    <div>
                                        <p class="text-muted-foreground">Pangkat</p>
                                        <p class="font-semibold">{{ result.penerima.pangkat }}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Timeline Events -->
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Riwayat Pengiriman</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div v-if="result.events.length > 0" class="space-y-4">
                                <div v-for="(event, idx) in result.events" :key="event.id" class="flex gap-4">
                                    <!-- Timeline Dot -->
                                    <div class="flex flex-col items-center">
                                        <div :class="['size-4 rounded-full border-2', traceEventStatusClass(event.status)]" />
                                        <div v-if="idx < result.events.length - 1" class="h-12 w-0.5 bg-gray-200" />
                                    </div>
                                    <!-- Event Details -->
                                    <div class="pb-4 text-sm">
                                        <p class="font-semibold">{{ event.statusLabel }}</p>
                                        <p class="text-muted-foreground">{{ event.lokasi }}</p>
                                        <p class="text-xs text-gray-500">{{ formatDate(event.createdAt) }}</p>
                                        <p v-if="event.note" class="mt-1 text-gray-600">{{ event.note }}</p>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-muted-foreground text-center">Belum ada riwayat pengiriman</p>
                        </CardContent>
                    </Card>
                </div>

                <!-- Alokasi Trace Result -->
                <div v-if="result.type === 'alokasi'" class="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Detail Alokasi</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                <div>
                                    <p class="text-muted-foreground">NAN</p>
                                    <p class="font-semibold">{{ result.nan }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Jumlah Item</p>
                                    <p class="font-semibold">{{ result.jumlah }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Jenis</p>
                                    <p class="font-semibold">{{ result.jenis.join(', ') }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Kategori</p>
                                    <p class="font-semibold">{{ result.kategori.join(', ') }}</p>
                                </div>
                            </div>

                            <!-- Items Table -->
                            <div class="border-t pt-4">
                                <h3 class="mb-3 text-sm font-semibold">Daftar Item</h3>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-xs">
                                        <thead class="border-b bg-gray-50">
                                            <tr>
                                                <th class="px-2 py-2 text-left font-semibold">ID</th>
                                                <th class="px-2 py-2 text-left font-semibold">Nomor Alokasi</th>
                                                <th class="px-2 py-2 text-left font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y">
                                            <tr v-for="item in result.items" :key="item.id">
                                                <td class="px-2 py-2">{{ item.id }}</td>
                                                <td class="px-2 py-2">{{ item.nsn }}</td>
                                                <td class="px-2 py-2">
                                                    <span :class="['rounded px-2 py-1 text-xs font-semibold', statusColorClass(item.status)]">
                                                        {{ getStatusLabel(item.status) }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <!-- Pengiriman Trace Result -->
                <div v-if="result.type === 'pengiriman'" class="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Detail Box/Pengiriman</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                <div>
                                    <p class="text-muted-foreground">UID Box</p>
                                    <p class="font-semibold">{{ result.uid }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Hash</p>
                                    <p class="font-mono text-xs font-semibold">{{ result.hash }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">NAN</p>
                                    <p class="font-semibold">{{ result.nan }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Jumlah Item</p>
                                    <p class="font-semibold">{{ result.jumlah }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">UnitRawat</p>
                                    <p class="font-semibold">{{ result.unit_rawat }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Periode</p>
                                    <p class="font-semibold">{{ result.periode }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Dibuat Oleh</p>
                                    <p class="font-semibold">{{ result.createdBy }}</p>
                                </div>
                                <div>
                                    <p class="text-muted-foreground">Tanggal Dibuat</p>
                                    <p class="font-semibold">{{ formatDate(result.createdAt) }}</p>
                                </div>
                            </div>

                            <!-- Items Table -->
                            <div class="border-t pt-4">
                                <h3 class="mb-3 text-sm font-semibold">Daftar Item dalam Box</h3>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-xs">
                                        <thead class="border-b bg-gray-50">
                                            <tr>
                                                <th class="px-2 py-2 text-left font-semibold">ID</th>
                                                <th class="px-2 py-2 text-left font-semibold">Nomor Alokasi</th>
                                                <th class="px-2 py-2 text-left font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y">
                                            <tr v-for="item in result.items" :key="item.id">
                                                <td class="px-2 py-2">{{ item.id }}</td>
                                                <td class="px-2 py-2">{{ item.nsn }}</td>
                                                <td class="px-2 py-2">
                                                    <span :class="['rounded px-2 py-1 text-xs font-semibold', statusColorClass(item.status)]">
                                                        {{ getStatusLabel(item.status) }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Timeline Events -->
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Riwayat Pengiriman Box</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div v-if="result.events.length > 0" class="space-y-4">
                                <div v-for="(event, idx) in result.events" :key="event.id" class="flex gap-4">
                                    <!-- Timeline Dot -->
                                    <div class="flex flex-col items-center">
                                        <div :class="['size-4 rounded-full border-2', traceEventStatusClass(event.status)]" />
                                        <div v-if="idx < result.events.length - 1" class="h-12 w-0.5 bg-gray-200" />
                                    </div>
                                    <!-- Event Details -->
                                    <div class="pb-4 text-sm">
                                        <p class="font-semibold">{{ event.statusLabel }}</p>
                                        <p class="text-muted-foreground">{{ event.lokasi }}</p>
                                        <p class="text-xs text-gray-500">{{ formatDate(event.createdAt) }}</p>
                                        <p v-if="event.note" class="mt-1 text-gray-600">{{ event.note }}</p>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-muted-foreground text-center">Belum ada riwayat pengiriman</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div></PublicLayout
    >
</template>
