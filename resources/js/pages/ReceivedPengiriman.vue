<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';
import { AlertTriangle, CheckCircle2, CircleCheck, CircleQuestionMark, Info, Loader2, ShieldAlert } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import Animatedtooltip from '@/components/ui/animated-tooltip/Animatedtooltip.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent } from '@/lib/libNCF';
import type { MonitoringDetailRow } from '@/lib/libUtils';
import { isResponseSuccess, maskStringRandomlyConsecutive, requiredSelectSchema, statusSteps } from '@/lib/libUtils';
import { receivedInfobox, receivedPengiriman, rekonPengiriman } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const isWriting = ref(false);
const layout = useLayoutStore();
const isLoadingSignature = ref(false);
const indicatorActive = ref(false);
const isLoadingDetail = ref(false);
const isLoadingTransit = ref(false);
const isLoadingSubmit = ref(false);
const showTransitConfirmation = ref(false);
const isScanningScan = ref(false);
const isLoadingScan = ref(false);
const hasScannedItems = ref(false);
let indicatorTimer: any = null;

type ItemToScan = {
    id: number;
    nama_tenaga_medis?: string;
    ukuran?: string;
    kategori?: string;
    jumlah?: number;
    itemHash?: string;
    status: 'pending' | 'scanned' | 'skipped';
    nfcData?: string;
    skipReason?: string;
    previouslySkipped?: boolean;
    previousSkipReason?: string;
    previousSkipBy?: string;
    previousSkipAt?: string;
};

const itemsToScan = ref<ItemToScan[]>([]);

const scannedItemCount = computed(() => itemsToScan.value.filter((item) => item.status === 'scanned').length);
const skippedItemCount = computed(() => itemsToScan.value.filter((item) => item.status === 'skipped').length);
const resolvedItemCount = computed(() => scannedItemCount.value + skippedItemCount.value);

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Penerimaan & Pencocokan', href: '' },
        { label: 'Konfirmasi Penerimaan', href: receivedPengiriman.url() },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.41 } });

    setupNfcEvents();
});

onUnmounted(async () => {
    NfcTagEvent.off('onTagReady');
    NfcTagEvent.off('onTagRead');
    NfcTagEvent.off('onTagUnverified');
    NfcTagEvent.off('onCloneDetected');
    NfcTagEvent.off('onWriteSuccess');
    NfcTagEvent.off('onWriteFail');
    NfcTagEvent.off('onVerifyFail');
    NfcTagEvent.off('onDisconnected');

    if (nfcIsConnected.value) {
        await disTAG();
    }
});

const formSchema = toTypedSchema(
    z.object({
        boxuid: requiredSelectSchema(),
        nfc: requiredSelectSchema({ msg: 'Silahkan tapping RFID/NTAG Box' }),
        signature: z.string().optional(),
        alokasi: requiredSelectSchema({ msg: 'Silahkan pilih Alokasi' }),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});
const { setFieldValue } = form;

const onSubmit = form.handleSubmit(async (_values) => {});
const onResetMainForm = async () => {
    form.resetForm();
    selectedPengirimanId.value = null;
    monitoringItem.value = null;
    hasScannedItems.value = false;
};

const onProcessTransit = async (): Promise<void> => {
    if (!selectedPengirimanId.value) {
        push.error({
            title: 'Gagal',
            message: 'Data pengiriman tidak ditemukan. Silahkan tap ulang box.',
        });
        return;
    }

    showTransitConfirmation.value = true;
};

const confirmProcessTransit = async (
    isScanned: boolean = false,
    items: Array<{ id: number; status: 'scanned' | 'skipped'; nfc_data?: string; skip_reason?: string }> = [],
): Promise<boolean> => {
    if (!selectedPengirimanId.value) {
        push.error({
            title: 'Gagal',
            message: 'Data pengiriman tidak ditemukan. Silahkan tap ulang box.',
        });
        return false;
    }

    try {
        isLoadingTransit.value = true;
        const payload: Record<string, unknown> = {
            pengiriman_id: selectedPengirimanId.value,
            scanned_item: isScanned ? 1 : 0,
        };

        if (items.length > 0) {
            payload.items = items;

            // Tambahkan catatan dengan FLAG untuk item yang dilewati
            const skippedItems = items.filter((item) => item.status === 'skipped' && item.skip_reason);
            if (skippedItems.length > 0) {
                const skipNotes = skippedItems.map((item) => `[FLAG] Item #${item.id}: ${item.skip_reason}`).join(' | ');
                payload.note = skipNotes;
            }
        }

        const response = await axiosJS.post('/received-transit', payload, { encrypt: true });
        const { status, message } = response.data ?? {};

        if (!isResponseSuccess(status)) {
            push.error({
                title: 'Gagal',
                message: message || 'Gagal memproses transit. Silahkan coba lagi.',
            });
            return false;
        }

        push.success({
            title: 'Berhasil',
            message: message || 'Event transit berhasil ditambahkan.',
        });

        showTransitConfirmation.value = false;
        await onResetMainForm();
        return true;
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
        return false;
    } finally {
        isLoadingTransit.value = false;
    }
};

const startItemScanning = async (): Promise<void> => {
    if (!monitoringItem.value) {
        push.error({
            title: 'Gagal',
            message: 'Data pengiriman tidak ditemukan. Silahkan tap ulang box terlebih dahulu.',
        });
        return;
    }

    try {
        isLoadingScan.value = true;

        // Untuk saat ini, generate dummy items berdasarkan jumlah manifest
        // Ini adalah placeholder sampai backend menyediakan endpoint untuk get items
        const backendItems = monitoringItem.value?.items ?? [];

        if (backendItems.length === 0) {
            push.error({
                title: 'Gagal',
                message: 'Tidak ada item yang tersedia untuk di-scan.',
            });
            return;
        }

        itemsToScan.value = backendItems.map((item) => ({
            ...item,
            status: item.previouslySkipped ? 'skipped' : 'pending',
            nfcData: undefined,
            skipReason: item.previouslySkipped ? item.previousSkipReason : undefined,
        }));

        console.log('Items prepared for scanning:', itemsToScan.value);
        isScanningScan.value = true;
        await nextTick();
        console.log('Dialog should now be visible, isScanningScan:', isScanningScan.value);
    } catch (error) {
        console.error('Error in startItemScanning:', error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan. Silahkan coba lagi!',
        });
    } finally {
        isLoadingScan.value = false;
    }
};

const cancelItemScanning = (): void => {
    isScanningScan.value = false;
    itemsToScan.value = [];
    hasScannedItems.value = false;
};

const processItemScanned = (itemId: number, uid: string, nfcData?: string): void => {
    const item = itemsToScan.value.find((x) => x.id === itemId);
    if (item && !item.previouslySkipped) {
        item.status = 'scanned';
        item.nfcData = nfcData;
    }
};

const skipItem = (itemId: number): void => {
    const item = itemsToScan.value.find((x) => x.id === itemId);
    if (!item || item.previouslySkipped) {
        return;
    }

    item.status = 'skipped';
    item.nfcData = undefined;
    item.skipReason = '';

    push.info({
        title: 'Item Dilewati',
        message: `Item ${item.nama_tenaga_medis || 'Unknown'} telah ditandai sebagai dilewati. Silahkan masukkan keterangan.`,
    });
};

const finishItemScanning = async (): Promise<void> => {
    const scannedCount = scannedItemCount.value;
    const skippedCount = skippedItemCount.value;
    const resolvedCount = resolvedItemCount.value;
    const totalCount = itemsToScan.value.length;

    if (resolvedCount === 0) {
        push.error({
            title: 'Gagal',
            message: 'Belum ada item yang diproses. Silahkan scan atau lewati item terlebih dahulu.',
        });
        return;
    }

    // Verify all items processed before proceed
    if (resolvedCount < totalCount) {
        push.error({
            title: 'Peringatan',
            message: `Baru ${resolvedCount} dari ${totalCount} item yang diproses. Silahkan selesaikan semua item terlebih dahulu.`,
        });
        return;
    }

    // Validasi: semua item yang di-skip harus memiliki keterangan (kecuali yang sudah pernah di-skip sebelumnya)
    const skippedWithoutReason = itemsToScan.value.filter((item) => item.status === 'skipped' && !item.previouslySkipped && !item.skipReason?.trim());
    if (skippedWithoutReason.length > 0) {
        push.error({
            title: 'Keterangan Diperlukan',
            message: `${skippedWithoutReason.length} item yang dilewati masih memerlukan keterangan. Silahkan isi keterangan sebelum melanjutkan.`,
        });
        return;
    }

    try {
        isLoadingScan.value = true;

        // Log scanned items
        console.log('All items scanned successfully:', itemsToScan.value);

        // TODO: Send scanned items to backend if endpoint is available
        // const payload = {
        //     pengiriman_id: selectedPengirimanId.value,
        //     items: itemsToScan.value.map((item) => ({
        //         id: item.id,
        //         nfc_data: item.nfcData,
        //     })),
        // };
        // const response = await axiosJS.post('/received-verify-items', payload, { encrypt: true });

        const message =
            skippedCount > 0
                ? `${scannedCount} item berhasil di-scan dan ${skippedCount} item dilewati.`
                : `${scannedCount} item berhasil di-scan dan diverifikasi.`;

        push.success({
            title: 'Berhasil',
            message,
        });

        // Jika tujuan paket sesuai dengan unit_rawat, hanya tutup dialog dan tampilkan tombol verifikasi
        if (isDestinationUnitRawatMatched.value && !isArrivedStatus.value) {
            hasScannedItems.value = true;
            isScanningScan.value = false;
            return;
        }

        // Jika tujuan paket tidak sesuai atau paket sudah arrived, proses ke backend
        const itemPayload = itemsToScan.value.map((item) => ({
            id: item.id,
            status: item.status,
            nfc_data: item.nfcData,
            skip_reason: item.previouslySkipped ? item.previousSkipReason : item.skipReason,
        }));

        const transitSuccess = await confirmProcessTransit(scannedCount > 0, itemPayload);
        if (transitSuccess) {
            cancelItemScanning();
        }
    } catch (error) {
        console.error('Error in finishItemScanning:', error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan. Silahkan coba lagi!',
        });
    } finally {
        isLoadingScan.value = false;
    }
};

const onProcessVerified = () => {
    const pengirimanId = monitoringItem.value?.id;

    if (!pengirimanId) {
        push.error({
            title: 'Gagal',
            message: 'Data pengiriman tidak valid. Silahkan tap ulang box.',
        });
        return;
    }

    router.visit(rekonPengiriman.url(), {
        method: 'get',
        data: { id: pengirimanId },
    });
};

const selectedPengirimanId = ref<number | null>(null);
type CurrentOfficerInfo = {
    petugas?: string;
    unit_rawat?: string;
    lokasi?: string;
    posisi?: string;
};

type ReceivedMonitoringDetailRow = MonitoringDetailRow & {
    currentOfficer?: CurrentOfficerInfo;
    totalManifest?: number;
    items?: ItemToScan[];
};

const monitoringItem = ref<ReceivedMonitoringDetailRow | null>(null);

const getCurrentStepIndex = computed(() => {
    if (!monitoringItem.value) {
        return 0;
    }

    const status = monitoringItem.value.status;

    if (status === 9) {
        return -1;
    }

    return Math.max(0, status - 1);
});

const latestEventLocation = computed(() => {
    const latestEvent = Array.isArray(monitoringItem.value?.eventHistory) ? monitoringItem.value.eventHistory[0] : null;
    const location = latestEvent?.lokasi?.trim();

    return location ? location : '-';
});

const currentOfficerInfo = computed<CurrentOfficerInfo | null>(() => {
    const officer = monitoringItem.value?.currentOfficer;

    if (!officer) {
        return null;
    }

    return {
        petugas: officer.petugas || '-',
        unit_rawat: officer.unit_rawat || '-',
        lokasi: officer.lokasi || '-',
        posisi: officer.posisi || '-',
    };
});

const isDestinationUnitRawatMatched = computed(() => {
    const destinationUnitRawat = String(monitoringItem.value?.unit_rawat ?? '')
        .trim()
        .toLowerCase();
    const userUnitRawat = String(currentOfficerInfo.value?.unit_rawat ?? '')
        .trim()
        .toLowerCase();

    if (!destinationUnitRawat || !userUnitRawat || destinationUnitRawat === '-' || userUnitRawat === '-') {
        return false;
    }

    return destinationUnitRawat === userUnitRawat;
});

const isArrivedStatus = computed(() => {
    return [3, 4].includes(Number(monitoringItem.value?.status ?? 0));
    // return Number(monitoringItem.value?.status ?? 0) === 3 || 4;
});

const finishScanButtonLabel = computed(() => {
    if (isLoadingScan.value) return 'Memproses...';
    if (isDestinationUnitRawatMatched.value && !isArrivedStatus.value) {
        return 'Selesai';
    }
    return 'Selesai dan Proses Transit';
});

const statusBadgeClass = computed(() => {
    const status = Number(monitoringItem.value?.status ?? 0);
    if (status === 9) return 'bg-red-500 text-white hover:bg-red-500';
    if (status === 4) return 'bg-green-500 text-white hover:bg-green-500';
    if (status === 3) return 'bg-amber-500 text-white hover:bg-amber-500';
    if (status === 2) return 'bg-blue-500 text-white hover:bg-blue-500';
    return 'bg-gray-500 text-white hover:bg-gray-500';
});

const stepIndicatorColorMap: Record<string, string> = {
    gray: 'bg-gray-500 text-white',
    blue: 'bg-blue-500 text-white',
    amber: 'bg-amber-500 text-white',
    green: 'bg-green-500 text-white',
};

const stepSeparatorColorMap: Record<string, string> = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-400',
    amber: 'bg-amber-400',
    green: 'bg-green-400',
};

const getStepIndicatorClass = (step: (typeof statusSteps)[number]): string => {
    if (step.step <= getCurrentStepIndex.value + 1) {
        return stepIndicatorColorMap[step.color] ?? 'bg-gray-500 text-white';
    }

    return 'bg-gray-200 text-gray-400 dark:bg-gray-700';
};

const getStepSeparatorClass = (step: (typeof statusSteps)[number]): string => {
    const nextStep = statusSteps.find((item) => item.step === step.step + 1);

    if (step.step <= getCurrentStepIndex.value) {
        return stepSeparatorColorMap[nextStep?.color ?? 'gray'] ?? 'bg-gray-400';
    }

    return 'bg-gray-200 dark:bg-gray-700';
};

const scanTAG = async (): Promise<void> => {
    console.log(`Connecting`);
    setFieldValue('nfc', '');
    setFieldValue('signature', '');

    await connectSerial();
};
const disTAG = async (): Promise<void> => {
    console.log(`Disconnected`);
    await disconnectSerial();
    setFieldValue('nfc', '');
    setFieldValue('signature', '');
};

const hashBoxData = async (hashsha: string): Promise<void> => {
    try {
        if (hashsha.length < 64) return;
        isLoadingSignature.value = true;
        isLoadingDetail.value = true;
        const payload = { hashsha: hashsha };
        const response = await axiosJS.post(receivedInfobox.url(), payload, { encrypt: true });
        const { status, message, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            await nextTick();
            selectedPengirimanId.value = Number(data.id ?? 0) || null;
            monitoringItem.value = data as ReceivedMonitoringDetailRow;
        } else {
            selectedPengirimanId.value = null;
            monitoringItem.value = null;
            push.error({
                title: 'Gagal',
                message: message || 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        selectedPengirimanId.value = null;
        monitoringItem.value = null;
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingSignature.value = false;
        isLoadingDetail.value = false;
    }
};

function triggerIndicator() {
    indicatorActive.value = false;
    requestAnimationFrame(() => {
        indicatorActive.value = true;
    });
    clearTimeout(indicatorTimer);
    indicatorTimer = setTimeout(() => {
        indicatorActive.value = false;
    }, 500);
}
function processTag(uid: string, cardType: string, data?: string) {
    if (isWriting.value) return;
    triggerIndicator();

    // If in item scanning mode, process differently
    if (isScanningScan.value) {
        if (!data) {
            push.error({
                title: 'Gagal',
                message: 'Data NTAG tidak ditemukan.',
            });
            return;
        }

        const matchedItem = itemsToScan.value.find((x) => x.status === 'pending' && x.itemHash === data);
        if (!matchedItem) {
            push.error({
                title: 'Gagal',
                message: 'NTAG tidak cocok dengan item yang tersedia. Silahkan tap ulang item yang benar.',
            });
            return;
        }

        processItemScanned(matchedItem.id, uid, data);
        push.success({
            title: 'Berhasil',
            message: `Item ${matchedItem.nama_tenaga_medis || 'Unknown'} berhasil di-scan.`,
        });
        return;
    }

    const cleanUid = uid?.trim() || '';

    setFieldValue('nfc', `${cleanUid} - ${cardType}`);
    setFieldValue('signature', maskStringRandomlyConsecutive(data ?? '', 2, 3));

    if (!data) {
        selectedPengirimanId.value = null;
        monitoringItem.value = null;
        push.error({
            title: 'Gagal',
            message: 'Data hash pada tag tidak ditemukan. Gunakan tag box yang valid.',
        });
        return;
    }

    hashBoxData(data);
}
const setupNfcEvents = () => {
    NfcTagEvent.on('onTagReady', (ready) => {
        console.log('NFC siap:', ready);
    });

    NfcTagEvent.on('onTagRead', (tag) => {
        console.log('Kartu terbaca:', tag.uid, tag.cardType, maskStringRandomlyConsecutive(tag.data ?? '', 2, 3));
        processTag(tag.uid, tag.cardType, tag.data);
    });

    NfcTagEvent.on('onTagUnverified', (tag) => {
        console.log('Kartu tidak terverifikasi:', tag.uid, tag.cardType, maskStringRandomlyConsecutive(tag.data ?? '', 2, 3));
        processTag(tag.uid, tag.cardType, tag.data);
    });

    NfcTagEvent.on('onCloneDetected', ({ uid, cardType, data }) => {
        console.log('Clone terdeteksi:', uid, cardType, data);
        processTag(uid, cardType, data);
    });

    NfcTagEvent.on('onWriteSuccess', async ({ uid, cardType }) => {
        console.log('Write berhasil:', uid, cardType);
    });

    NfcTagEvent.on('onWriteFail', ({ reason }) => {
        console.log('Write gagal:', reason);
    });

    NfcTagEvent.on('onDisconnected', () => {
        console.log('NFC terputus');
        push.error({ title: 'Gagal', message: 'Reader terputus. silahkan reload halaman.' });
    });
};
</script>

<template>
    <PublicLayout
        title="Konfirmasi Penerimaan"
        page-title="Konfirmasi Penerimaan"
        page-sub-title="Halaman untuk melakukan verifikasi kedatangan barang serta menentukan status penerimaan sebagai tujuan akhir atau sebagai transit untuk pengiriman selanjutnya."
    >
        <form autocomplete="off" @submit.prevent="onSubmit" @reset.prevent="onResetMainForm">
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="space-y-4">
                    <FormField
                        v-slot="{ componentField, errors }"
                        name="nfc"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormLabel class="flex items-center justify-between gap-2">
                                <span>Tap kartu RFID/NTAG pada BOX</span>
                                <span v-if="nfcIsConnected" class="text-crusoe-500 flex items-center text-xs font-semibold italic">
                                    NFC Reader Terhubung
                                </span>
                                <span v-else class="flex items-center text-xs font-semibold text-red-400 italic"> NFC Reader Tidak Terhubung </span>
                            </FormLabel>
                            <FormControl>
                                <InputGroup :class="[errors.length ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']">
                                    <InputGroupInput v-bind="componentField" readonly placeholder="UID - NFC/TAG Type" />
                                    <InputGroupAddon align="inline-end">
                                        <Animatedtooltip text="Koneksikan ke perangkat reader" position="left">
                                            <InputGroupButton
                                                type="button"
                                                size="xs"
                                                :class="[
                                                    'bg-muted/70 text-xs text-white transition duration-300',
                                                    nfcIsConnected ? 'hover:bg-red-400' : 'hover:bg-amber-400',
                                                    'hover:text-white',
                                                ]"
                                                @click="nfcIsConnected ? disTAG() : scanTAG()"
                                            >
                                                {{ nfcIsConnected ? 'Diskonek Reader' : 'Hubungkan Reader' }}
                                            </InputGroupButton>
                                        </Animatedtooltip>
                                    </InputGroupAddon>
                                </InputGroup>
                                <p class="text-muted-foreground flex items-start gap-1 text-xs italic">
                                    <Info class="size-4 text-orange-500" /> Hubungkan NFC Reader, lalu tempelkan (tap) tag atau kartu RFID/NTAG pada
                                    perangkat untuk memulai proses pemindaian.
                                </p>
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="signature"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupTextarea placeholder="Data NTAG/RFID" v-bind="componentField" readonly class="resize-none" />
                                    <InputGroupAddon align="block-end">
                                        <div class="flex w-full items-center justify-between">
                                            <div class="flex items-center">
                                                <InputGroupText v-if="isLoadingSignature" class="text-muted-foreground text-xs">
                                                    <Spinner /> Enrolling data hash
                                                </InputGroupText>

                                                <template v-else>
                                                    <InputGroupText v-if="form.values.signature" class="text-muted-foreground text-xs">
                                                        <CircleCheck class="text-crusoe-500" />
                                                        HMAC 256 Data Enroled
                                                    </InputGroupText>

                                                    <InputGroupText v-else class="text-muted-foreground text-xs">
                                                        <CircleQuestionMark />
                                                        Tidak ada data
                                                    </InputGroupText>
                                                </template>
                                            </div>
                                            <div class="flex items-center justify-center">
                                                <!-- <Badge class="animate-blink h-2 w-2 rounded-full p-0" :display="!true" /> -->
                                                <Transition
                                                    enter-active-class="transition-all duration-200"
                                                    enter-from-class="opacity-0 scale-75"
                                                    enter-to-class="opacity-100 scale-100"
                                                    leave-active-class="transition-all duration-200"
                                                    leave-from-class="opacity-100 scale-100"
                                                    leave-to-class="opacity-0 scale-75"
                                                >
                                                    <Badge v-if="indicatorActive" class="h-2 w-2 rounded-full bg-green-500 p-0" />
                                                </Transition>
                                            </div>
                                        </div>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                        </FormItem>
                    </FormField>
                </div>
                <div class="space-y-4">
                    <div class="rounded-lg border p-4">
                        <h3 class="mb-3 text-sm font-semibold">Informasi BOX</h3>
                        <div class="space-y-2">
                            <Transition
                                enter-active-class="transition-all duration-300 ease-out"
                                enter-from-class="opacity-0 translate-y-2"
                                enter-to-class="opacity-100 translate-y-0"
                                leave-active-class="transition-all duration-200 ease-in"
                                leave-from-class="opacity-100 translate-y-0"
                                leave-to-class="opacity-0 translate-y-2"
                                mode="out-in"
                            >
                                <div v-if="isLoadingDetail" class="flex min-h-40 items-center justify-center p-6">
                                    <div class="text-muted-foreground flex items-center gap-3 text-sm">
                                        <Loader2 class="h-5 w-5 animate-spin" />
                                        Memuat detail pengiriman...
                                    </div>
                                </div>

                                <div v-else-if="monitoringItem" class="space-y-1">
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Box UID</span>
                                        <span class="text-right font-medium">{{ monitoringItem?.uid || '-' }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                        <Badge :class="['capitalize', statusBadgeClass]">{{ monitoringItem?.statusLabel || '-' }}</Badge>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat Penerima</span>
                                        <span class="text-right font-medium">{{ monitoringItem?.unit_rawat || '-' }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Nomor Alokasi</span>
                                        <span class="text-right font-medium">{{ monitoringItem?.nan || '-' }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Periode Alokasi</span>
                                        <span class="text-right font-medium">{{ monitoringItem?.periode || '-' }}</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Jumlah Item Manifest</span>
                                        <span class="text-right font-medium">{{ Number(monitoringItem?.totalManifest ?? 0) }}</span>
                                    </div>
                                </div>

                                <div v-else class="flex min-h-40 items-center justify-center p-4">
                                    <div class="text-muted-foreground flex items-start gap-2 text-sm">
                                        <Info class="mt-0.5 size-4 shrink-0 text-orange-500" />
                                        <div class="space-y-1">
                                            <p class="font-medium">Belum ada informasi Box</p>
                                            <p>Hubungkan reader lalu lakukan tap kartu RFID/NTAG untuk menampilkan informasi pengiriman.</p>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-2 grid grid-cols-1 gap-4">
                <hr v-if="monitoringItem" class="border-dashed" />
                <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2"
                    mode="out-in"
                >
                    <div v-if="monitoringItem">
                        <div class="mb-6 p-4 pb-0">
                            <Stepper class="flex w-full items-center gap-2">
                                <StepperItem
                                    v-for="item in statusSteps"
                                    :key="item.step"
                                    :step="item.step"
                                    class="relative flex w-full flex-col items-center justify-center"
                                >
                                    <StepperTrigger :disabled="item.step !== getCurrentStepIndex + 1">
                                        <StepperIndicator :class="['rounded-full', getStepIndicatorClass(item)]">
                                            <component :is="item.icon" class="h-5 w-5" />
                                        </StepperIndicator>
                                    </StepperTrigger>
                                    <StepperSeparator
                                        v-if="item.step !== statusSteps[statusSteps.length - 1]?.step"
                                        :class="[
                                            'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full',
                                            getStepSeparatorClass(item),
                                        ]"
                                    />
                                    <div class="flex flex-col items-center gap-1">
                                        <StepperTitle class="truncate text-center text-xs font-medium">{{ item.title }}</StepperTitle>
                                        <StepperDescription class="hidden text-center text-xs sm:block">{{ item.description }}</StepperDescription>
                                    </div>
                                </StepperItem>
                            </Stepper>
                        </div>
                        <div class="py-4">
                            <div class="mb-5 grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-sm">
                                <span class="col-span-6 font-light text-clip text-gray-400">
                                    Lokasi terakhir kiriman berdasarkan aktivitas / event terakhir yang tercatat.
                                </span>
                                <span class="col-span-6 truncate text-end">{{ latestEventLocation }}</span>
                            </div>

                            <h3 class="mb-1 text-sm font-semibold">Petugas UnitRawat / Lokasi Saat Ini</h3>
                            <div v-if="currentOfficerInfo" class="space-y-2">
                                <div
                                    class="bg-muted/30 grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-xs font-semibold tracking-wide uppercase"
                                >
                                    <span class="col-span-3 truncate">Petugas/TenagaMedis</span>
                                    <span class="col-span-3 truncate">UnitRawat</span>
                                    <span class="col-span-3 truncate">Lokasi</span>
                                    <span class="col-span-3 truncate">Posisi</span>
                                </div>
                                <div class="grid grid-cols-12 gap-1 rounded-md border px-3 py-2 text-sm">
                                    <span class="col-span-3 truncate font-medium">{{ currentOfficerInfo.petugas }}</span>
                                    <span class="col-span-3 truncate">{{ currentOfficerInfo.unit_rawat }}</span>
                                    <span class="col-span-3 truncate">{{ currentOfficerInfo.lokasi }}</span>
                                    <span class="col-span-3 truncate">{{ currentOfficerInfo.posisi }}</span>
                                </div>
                            </div>
                            <p v-else class="text-sm text-gray-400 italic">Tidak terdapat informasi saat ini.</p>
                            <p :class="['mt-2 flex flex-row gap-1 text-xs', isDestinationUnitRawatMatched ? 'text-green-600' : 'text-red-500']">
                                <ShieldAlert class="size-4" />
                                {{
                                    isDestinationUnitRawatMatched
                                        ? isArrivedStatus
                                            ? 'Paket telah di terima.'
                                            : 'Tujuan paket sesuai dengan unit_rawat anda.'
                                        : 'Tujuan paket tidak sesuai dengan unit_rawat anda!'
                                }}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>

            <Field v-if="monitoringItem" orientation="horizontal" class="items-start justify-between">
                <div class="flex gap-2">
                    <Button type="reset" variant="outline"> Reset </Button>
                    <!-- :disabled="isLoadingScan || !isDestinationUnitRawatMatched" -->
                    <Button
                        v-if="!isArrivedStatus"
                        type="button"
                        class="shrink-0 bg-blue-500 hover:bg-blue-600"
                        :disabled="isLoadingScan"
                        @click="startItemScanning"
                    >
                        {{ isLoadingScan ? 'Memuat Item...' : 'Scan Item' }}
                    </Button>
                    <Button
                        v-if="!isArrivedStatus"
                        type="button"
                        class="shrink-0 bg-orange-400 hover:bg-orange-500"
                        :disabled="isLoadingTransit || isDestinationUnitRawatMatched"
                        @click="onProcessTransit"
                    >
                        {{ isLoadingTransit ? 'Memproses Transit...' : 'Proses Transit' }}
                    </Button>
                </div>
                <Button
                    v-if="!isArrivedStatus && isDestinationUnitRawatMatched && hasScannedItems"
                    type="submit"
                    class="shrink-0"
                    :disabled="isLoadingSubmit"
                    @click="onProcessVerified"
                >
                    Proses Verified
                </Button>
            </Field>
        </form>

        <!-- Confirmation Dialog untuk Process Transit -->
        <Dialog v-model:open="showTransitConfirmation">
            <DialogContent class="max-w-md">
                <DialogHeader>
                    <DialogTitle class="flex items-center gap-2">
                        <AlertTriangle class="h-5 w-5 text-orange-500" />
                        Konfirmasi Proses Transit
                    </DialogTitle>
                    <DialogDescription> Harap baca dengan cermat sebelum melanjutkan </DialogDescription>
                </DialogHeader>

                <div class="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm dark:border-orange-900 dark:bg-orange-950">
                    <p class="font-semibold text-orange-900 dark:text-orange-100">
                        <strong>Pemberitahuan Tanggung Jawab</strong>
                    </p>
                    <p class="mt-2 text-orange-800 dark:text-orange-200">Dengan melanjutkan proses ini, Anda menyatakan bahwa:</p>
                    <ul class="mt-2 list-inside list-disc space-y-1 text-orange-800 dark:text-orange-200">
                        <li>Anda telah menerima dan memeriksa isi barang dalam box</li>
                        <li>Anda bertanggung jawab penuh atas kelengkapan dan kondisi barang</li>
                        <li>Anda memahami bahwa box ini akan diteruskan ke lokasi tujuan berikutnya</li>
                        <li>Jika terdapat kerusakan, loss, atau ketidaksesuaian, Anda bertanggung jawab melaporkannya</li>
                    </ul>
                </div>

                <DialogFooter class="gap-2">
                    <Button type="button" variant="outline" :disabled="isLoadingTransit" @click="showTransitConfirmation = false"> Batal </Button>
                    <Button
                        type="button"
                        class="bg-orange-400 hover:bg-orange-500"
                        :disabled="isLoadingTransit"
                        @click="confirmProcessTransit(false)"
                    >
                        {{ isLoadingTransit ? 'Memproses...' : 'Ya, Lanjutkan Transit' }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Item Scanning Dialog -->
        <Dialog v-model:open="isScanningScan">
            <DialogContent class="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Scan Item Manifest</DialogTitle>
                    <DialogDescription>
                        Hubungkan reader NFC dan tap setiap item untuk memverifikasi. Total item: {{ itemsToScan.length }}
                    </DialogDescription>
                </DialogHeader>

                <div class="max-h-[50vh] space-y-2 overflow-y-auto pr-4">
                    <div
                        v-for="(item, index) in itemsToScan"
                        :key="item.id"
                        class="rounded-lg border p-3 transition-colors"
                        :class="[
                            item.status === 'scanned'
                                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950'
                                : item.status === 'skipped'
                                  ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950'
                                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900',
                        ]"
                    >
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <span
                                        class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                    >
                                        {{ index + 1 }}
                                    </span>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">{{ item.nama_tenaga_medis || 'Unknown TenagaMedis' }}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {{ item.ukuran || '-' }} | {{ item.kategori || '-' }} | Qty: {{ item.jumlah }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <Transition
                                    enter-active-class="transition-all duration-300"
                                    enter-from-class="opacity-0 scale-0"
                                    enter-to-class="opacity-100 scale-100"
                                >
                                    <CheckCircle2 v-if="item.status === 'scanned'" class="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                                </Transition>
                                <Badge v-if="item.status === 'scanned'" class="bg-green-600 hover:bg-green-700">
                                    <CheckCircle2 class="mr-1 h-3 w-3" />
                                    Scanned
                                </Badge>
                                <Badge v-else-if="item.status === 'skipped'" class="bg-amber-600 hover:bg-amber-700"> Skipped </Badge>
                                <Badge v-else variant="outline" class="text-gray-600 dark:text-gray-400">Pending</Badge>
                                <Button
                                    v-if="item.status === 'pending'"
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    class="text-xs"
                                    @click="skipItem(item.id)"
                                >
                                    Skip
                                </Button>
                            </div>
                        </div>
                        <!-- Warning untuk item yang sudah pernah di-skip -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 max-h-0"
                            enter-to-class="opacity-100 max-h-96"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 max-h-96"
                            leave-to-class="opacity-0 max-h-0"
                        >
                            <div
                                v-if="item.previouslySkipped"
                                class="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950"
                            >
                                <div class="flex items-start gap-2">
                                    <AlertTriangle class="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <div class="flex-1 text-xs">
                                        <p class="font-medium text-amber-900 dark:text-amber-100">Item Sudah Pernah Dilewati</p>
                                        <p class="mt-1 text-amber-800 dark:text-amber-200">
                                            Item ini sudah dilewati pada transit sebelumnya oleh <strong>{{ item.previousSkipBy }}</strong> pada
                                            <strong>{{ item.previousSkipAt }}</strong
                                            >.
                                        </p>
                                        <p class="mt-1 text-amber-800 dark:text-amber-200">
                                            Alasan: <em>{{ item.previousSkipReason }}</em>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                        <!-- Textarea untuk keterangan skip -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 max-h-0"
                            enter-to-class="opacity-100 max-h-96"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 max-h-96"
                            leave-to-class="opacity-0 max-h-0"
                        >
                            <div
                                v-if="item.status === 'skipped' && !item.previouslySkipped"
                                class="mt-3 border-t border-amber-200 pt-3 dark:border-amber-700"
                            >
                                <label class="mb-2 block text-xs font-medium text-amber-900 dark:text-amber-100">
                                    Keterangan Mengapa Item Dilewati <span class="text-red-500">*</span>
                                </label>
                                <textarea
                                    v-model="item.skipReason"
                                    placeholder="Contoh: Barang rusak, tidak ada di box, cacat produksi, dll..."
                                    class="w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none dark:border-amber-700 dark:bg-amber-900/20 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-amber-700"
                                    rows="3"
                                />
                            </div>
                        </Transition>
                    </div>
                </div>

                <div class="border-t pt-3">
                    <div class="mb-3 flex items-center justify-between text-sm">
                        <span class="font-semibold"> Scan Progress: {{ resolvedItemCount }} / {{ itemsToScan.length }} </span>
                        <div class="flex items-center gap-2 text-xs">
                            <div class="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    class="h-full bg-green-500 transition-all duration-300"
                                    :style="{ width: `${(resolvedItemCount / itemsToScan.length) * 100}%` }"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter class="gap-2">
                    <Button type="button" variant="outline" :disabled="isLoadingScan" @click="cancelItemScanning"> Batal </Button>
                    <Button
                        type="button"
                        class="bg-green-600 hover:bg-green-700"
                        :disabled="isLoadingScan || resolvedItemCount < itemsToScan.length"
                        @click="finishItemScanning"
                    >
                        {{ finishScanButtonLabel }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </PublicLayout>
</template>
