<script setup lang="ts">
import { Wifi, WifiOff, Trash2 } from 'lucide-vue-next';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent } from '@/lib/libNCF';
import { testReader } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';

const layout = useLayoutStore();
const logs = ref('');
const loading = ref(false);
const error = ref('');
const logTextarea: HTMLTextAreaElement | null = null;

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Test Pembacaan Reader', href: testReader.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.6 } });

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
});

const addLog = (message: string): void => {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    logs.value += `[${timestamp}] ${message}\n`;

    // Auto-scroll to bottom
    if (logTextarea) {
        setTimeout(() => {
            if (logTextarea) {
                logTextarea.scrollTop = logTextarea.scrollHeight;
            }
        }, 0);
    }
};

const setupNfcEvents = (): void => {
    NfcTagEvent.on('onTagReady', (ready: any) => {
        addLog('✓ NFC Reader siap menerima');
        console.log('NFC siap:', ready);
    });

    NfcTagEvent.on('onTagRead', (tag: any) => {
        const message = `✓ Kartu terbaca | UID: ${tag.uid} | Hash: ${tag.data}`;
        addLog(message);
        console.log('Kartu terbaca:', tag.uid, 'Hash:', tag.data);
    });

    NfcTagEvent.on('onTagUnverified', (tag: any) => {
        const message = `⚠ Kartu tidak terverifikasi | UID: ${tag.uid} | Hash: ${tag.data}`;
        addLog(message);
        console.log('Kartu tidak terverifikasi:', tag.uid, 'Hash:', tag.data);
    });

    NfcTagEvent.on('onCloneDetected', ({ uid, data }: any) => {
        const message = `⚠ Clone terdeteksi | UID: ${uid} | Hash: ${data}`;
        addLog(message);
        console.log('Clone terdeteksi:', uid, 'Hash:', data);
    });
};

const toggleNfcReader = async () => {
    try {
        loading.value = true;
        error.value = '';

        if (nfcIsConnected.value) {
            await disconnectSerial();
            addLog('× Reader diputuskan');
        } else {
            await connectSerial();
            addLog('✓ Reader terhubung');
        }
    } catch (err) {
        error.value = 'Gagal menghubungkan NFC reader.';
        addLog(`× Error: ${error.value}`);
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const clearLogs = (): void => {
    logs.value = '';
    addLog('Log dibersihkan');
};
</script>

<template>
    <PublicLayout title="Test Pembacaan Reader" page-title="Test Pembacaan Reader" page-sub-title="Validasi pembacaan data oleh perangkat reader">
        <div class="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kontrol Reader</CardTitle>
                    <CardDescription>Hubungkan dan test pembacaan perangkat reader NFC</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex gap-2">
                        <Button :disabled="loading" :variant="nfcIsConnected ? 'destructive' : 'default'" class="gap-2" @click="toggleNfcReader">
                            <component :is="nfcIsConnected ? WifiOff : Wifi" class="h-4 w-4" />
                            {{ loading ? 'Memproses...' : nfcIsConnected ? 'Putus Koneksi' : 'Hubungkan Reader' }}
                        </Button>
                        <Button variant="outline" class="gap-2" @click="clearLogs">
                            <Trash2 class="h-4 w-4" />
                            Bersihkan Log
                        </Button>
                    </div>

                    <div v-if="error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {{ error }}
                    </div>

                    <div
                        class="rounded-md p-3 text-sm"
                        :class="
                            nfcIsConnected ? 'border border-green-200 bg-green-50 text-green-700' : 'border border-gray-200 bg-gray-50 text-gray-600'
                        "
                    >
                        {{ nfcIsConnected ? '● Reader terhubung - Siap membaca kartu' : '● Reader terputus - Hubungkan untuk memulai' }}
                    </div>
                </CardContent>
            </Card>

            <Card class="mt-6">
                <CardHeader>
                    <CardTitle>Log Pembacaan</CardTitle>
                    <CardDescription>Setiap pembacaan kartu akan ditampilkan di bawah ini</CardDescription>
                </CardHeader>
                <CardContent>
                    <textarea
                        ref="logTextarea"
                        v-model="logs"
                        readonly
                        class="h-96 w-full rounded-md border border-gray-300 bg-gray-50 p-3 font-mono text-sm focus:outline-none"
                        placeholder="Log pembacaan akan muncul di sini..."
                    />
                </CardContent>
            </Card>
        </div>
    </PublicLayout>
</template>
