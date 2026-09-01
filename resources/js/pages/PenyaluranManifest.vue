<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { GitBranchPlus, Info, Users } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import SelectWithCreate from '@/components/composable/SelectWithCreate.vue';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent } from '@/lib/libNCF';
import { formatDate, isJson, isResponseSuccess, maskStringRandomlyConsecutive, requiredSelectSchema } from '@/lib/libUtils';
import { penyaluranManifest, penyaluranManifestConfirmDelivery, penyaluranManifestScanValidate } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { ResultSelectWithCreate, type BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

const dataPenerimaan = ref<any[]>([]);
const allNakes = ref<any[]>([]);
const dataNakes = ref<any[]>([]);
const dataSelected = ref<Record<string, any> | null>(null);
const itemSelected = ref<Record<string, any> | null>(null);
const isLoadingItemDetail = ref(false);
const nakesSelected = ref<Record<string, any> | null>(null);
const layout = useLayoutStore();
const loading = ref<boolean>(false);
const proofPhoto = ref<File | null>(null);
const activeHashRequest = ref<string | null>(null);
const lastProcessedHash = ref<string | null>(null);
const lastProcessedAt = ref<number>(0);
const isProcessingTag = ref(false);
const isOpenDialog = ref(false);
const keteranganBuka = ref('');
const isOpenCancelDialog = ref(false);
const keteranganCancel = ref('');

const isSelectedBoxLocked = computed((): boolean => {
    if (dataSelected.value?.has_opening_note) {
        return false;
    }

    const lockStatus = dataSelected.value?.last_event_note ?? dataSelected.value?.status;
    return lockStatus === 'Arrived / Verified (LOCK)';
});

const props = withDefaults(
    defineProps<{
        data?: {
            penerimaan?: any[];
            nakes?: any[];
        } | null;
    }>(),
    {
        data: null,
    },
);

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

onMounted(async () => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Distribusi Final', href: '' },
        { label: 'Serah Terima ke Unit Rawat', href: penyaluranManifest.url() },
    ];

    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.51 } });

    dataPenerimaan.value = [];
    await loadInitialData();
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

watch(isOpenDialog, (newVal) => {
    console.log('isOpenDialog changed to:', newVal);
});

const loadInitialData = async (): Promise<void> => {
    try {
        const penerimaan = props?.data?.penerimaan ?? [];
        const nakes = props?.data?.nakes ?? [];

        dataPenerimaan.value = penerimaan.map((item) => {
            return {
                id: item.id,
                label: String(item.uid ?? item?.alokasi?.nan ?? ''),
                json: JSON.stringify(item),
            };
        });

        allNakes.value = nakes;
    } catch (error) {
        console.error(error);
        push.warning({
            title: 'Informasi',
            message: 'Data belum tersedia. Pastikan anda telah melakukan penerimaan paket.',
        });
    }
};

const formSchema = toTypedSchema(
    z.object({
        nfc: requiredSelectSchema({ msg: 'Silahkan tapping RFID/NTAG Box' }),
        signature: z.string().optional(),
        alokasi: requiredSelectSchema({ msg: 'Silahkan pilih Alokasi' }),
        nakes: requiredSelectSchema({ msg: 'Silahkan pilih nakes penerima' }),
    }),
);
const form = useForm({
    validationSchema: formSchema,
});

const { setFieldValue } = form;

const onSubmit = form.handleSubmit(async (_values) => {
    if (!dataSelected.value?.id || !itemSelected.value?.id || !nakesSelected.value?.id) {
        push.warning({
            title: 'Informasi',
            message: 'Lengkapi data pengiriman, item hasil scan, dan nakes penerima terlebih dahulu.',
        });
        return;
    }

    if (!proofPhoto.value) {
        push.warning({
            title: 'Informasi',
            message: 'Foto bukti penyerahan wajib diunggah.',
        });
        return;
    }

    try {
        loading.value = true;

        const formData = new FormData();
        formData.append('pengiriman_id', String(dataSelected.value.id));
        formData.append('item_id', String(itemSelected.value.id));
        formData.append('tenaga_medis_id', String(nakesSelected.value.id));
        formData.append('bukti_foto', proofPhoto.value);

        const response = await axiosJS.post(penyaluranManifestConfirmDelivery.url(), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { status, message } = response.data ?? {};

        if (!isResponseSuccess(status)) {
            push.error({
                title: 'Gagal',
                message: message || 'Konfirmasi penyerahan gagal diproses.',
            });
            return;
        }

        push.success({
            title: 'Berhasil',
            message: message || 'Konfirmasi penyerahan berhasil diproses.',
        });

        // Update badge for the delivered item
        const detail = dataSelected.value?.alokasi?.details?.find((d) => d.id === itemSelected.value?.alokasiDetail?.id);
        if (detail && detail.items) {
            const item = detail.items.find((i) => i.id === itemSelected.value?.id);
            if (item) {
                item.status = 'delivered';
            }
        }

        itemSelected.value = {
            ...itemSelected.value,
            status: 4,
        };

        proofPhoto.value = null;
        fileName.value = null;
        itemSelected.value = null;
        nakesSelected.value = null;
        form.setFieldValue('nfc', '');
        form.setFieldValue('signature', '');
        form.setFieldValue('nakes', '');
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!';

        push.error({
            title: 'Gagal',
            message,
        });
    } finally {
        loading.value = false;
    }
});

const onResetMainForm = async () => {
    dataSelected.value = null;
    dataNakes.value = [];
    itemSelected.value = null;
    nakesSelected.value = null;
    form.setFieldValue('nakes', '');
    form.setFieldValue('nfc', '');
    form.setFieldValue('signature', '');
    proofPhoto.value = null;
    fileName.value = null;
};

const bukaBox = async () => {
    if (!keteranganBuka.value.trim()) {
        push.warning({
            title: 'Informasi',
            message: 'Keterangan pembukaan tidak boleh kosong.',
        });
        return;
    }

    try {
        // Asumsikan route untuk open box
        const response = await axiosJS.post('/penyaluran-manifest-open-box', {
            pengiriman_id: dataSelected.value?.id,
            keterangan: keteranganBuka.value,
        });

        const { status, message } = response.data ?? {};

        if (!isResponseSuccess(status)) {
            push.error({
                title: 'Gagal',
                message: message || 'Gagal membuka box.',
            });
            return;
        }

        // Update dataSelected dan opsi dropdown untuk menandai box sudah dibuka
        if (dataSelected.value?.alokasi?.details) {
            dataSelected.value.alokasi.details.forEach((detail: any) => {
                detail.opening_note = keteranganBuka.value;
            });
        }

        if (dataSelected.value?.id) {
            markSelectedBoxAsOpened(dataSelected.value.id);
        }

        push.success({
            title: 'Berhasil',
            message: message || 'Box berhasil dibuka.',
        });

        isOpenDialog.value = false;
        keteranganBuka.value = '';
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!';
        push.error({
            title: 'Gagal',
            message,
        });
    }
};

const cancelDelivery = async () => {
    if (!keteranganCancel.value.trim()) {
        push.warning({
            title: 'Informasi',
            message: 'Keterangan pembatalan tidak boleh kosong.',
        });
        return;
    }

    if (!dataSelected.value?.id || !itemSelected.value?.id) {
        push.warning({
            title: 'Informasi',
            message: 'Data pengiriman dan item wajib dipilih.',
        });
        return;
    }

    try {
        const response = await axiosJS.post('/penyaluran-manifest-cancel-delivery', {
            pengiriman_id: dataSelected.value.id,
            item_id: itemSelected.value.id,
            keterangan: keteranganCancel.value,
        });

        const { status, message } = response.data ?? {};

        if (!isResponseSuccess(status)) {
            push.error({
                title: 'Gagal',
                message: message || 'Gagal membatalkan penyerahan.',
            });
            return;
        }

        // Update status item
        itemSelected.value.status = 3;
        itemSelected.value.keterangan = keteranganCancel.value;

        // Update badge in dataSelected
        const detail = dataSelected.value?.alokasi?.details?.find((d) => d.id === itemSelected.value?.alokasiDetail?.id);
        if (detail && detail.items) {
            const item = detail.items.find((i) => i.id === itemSelected.value?.id);
            if (item) {
                item.status = 'cancelled';
            }
        }

        push.success({
            title: 'Berhasil',
            message: message || 'Pembatalan penyerahan berhasil diproses.',
        });

        isOpenCancelDialog.value = false;
        keteranganCancel.value = '';

        // Clear form after successful cancellation
        itemSelected.value = null;
        nakesSelected.value = null;
        form.setFieldValue('nfc', '');
        form.setFieldValue('signature', '');
        form.setFieldValue('nakes', '');
        proofPhoto.value = null;
        fileName.value = null;
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!';
        push.error({
            title: 'Gagal',
            message,
        });
    }
};

const syncNakesOptions = (unit_rawatId: number | null | undefined) => {
    dataNakes.value = allNakes.value
        .filter((item) => {
            if (!unit_rawatId) {
                return false;
            }

            return Number(item?.unit_rawat_id) === Number(unit_rawatId);
        })
        .map((item) => {
            return {
                id: item.id,
                label: [item.nrp, item.nama].filter(Boolean).join(' - '),
                json: JSON.stringify(item),
            };
        });
};

const markSelectedBoxAsOpened = (pengirimanId: number): void => {
    dataPenerimaan.value = dataPenerimaan.value.map((option) => {
        try {
            const record = JSON.parse(option.json);
            if (record?.id === pengirimanId) {
                record.last_event_note = 'Arrived / Verified';
                record.has_opening_note = true;
                return {
                    ...option,
                    json: JSON.stringify(record),
                };
            }
        } catch {
            // ignored
        }

        return option;
    });

    if (dataSelected.value?.id === pengirimanId) {
        dataSelected.value.last_event_note = 'Arrived / Verified';
        dataSelected.value.has_opening_note = true;
    }
};

const buildNakesOption = (tenaga_medis: any) => {
    if (!tenaga_medis?.id) {
        return null;
    }

    return {
        id: tenaga_medis.id,
        label: [tenaga_medis.nrp, tenaga_medis.nama].filter(Boolean).join(' - '),
        json: JSON.stringify(tenaga_medis),
    };
};

const setNakesFromScannedItem = (item: any): void => {
    const tenaga_medis = item?.tenaga_medis ?? item?.alokasiDetail?.tenaga_medis;
    if (!tenaga_medis?.id) {
        return;
    }

    const option = buildNakesOption(tenaga_medis);
    if (!option) {
        return;
    }

    if (!dataNakes.value.some((existing) => Number(existing.id) === Number(option.id))) {
        dataNakes.value.push(option);
    }

    nakesSelected.value = tenaga_medis;
    form.setFieldValue('nakes', JSON.stringify(option));
};

const detailItemLabel = (value: unknown): string => {
    if (typeof value === 'string') {
        return value.trim() || '-';
    }

    if (Array.isArray(value)) {
        return (
            value
                .map((item) => detailItemLabel(item))
                .filter((item) => item !== '-')
                .join(', ') || '-'
        );
    }

    if (typeof value === 'object' && value !== null) {
        const namedValue =
            (value as { nama?: unknown; name?: unknown; label?: unknown }).nama ??
            (value as { name?: unknown }).name ??
            (value as { label?: unknown }).label;

        return typeof namedValue === 'string' && namedValue.trim() !== '' ? namedValue : '-';
    }

    return '-';
};

const fetchItemDetail = async (hashsha: string): Promise<void> => {
    const normalizedHash = String(hashsha ?? '')
        .trim()
        .toLowerCase();

    if (normalizedHash === '') {
        return;
    }

    const now = Date.now();
    const isDuplicateRecentHash = lastProcessedHash.value === normalizedHash && now - lastProcessedAt.value < 1200;

    if (activeHashRequest.value === normalizedHash || isDuplicateRecentHash) {
        return;
    }

    if (!dataSelected.value?.id) {
        itemSelected.value = null;
        push.warning({
            title: 'Informasi',
            message: 'Silahkan pilih data penerimaan terlebih dahulu.',
        });
        return;
    }

    try {
        activeHashRequest.value = normalizedHash;
        isLoadingItemDetail.value = true;

        const response = await axiosJS.post(
            penyaluranManifestScanValidate.url(),
            {
                pengiriman_id: dataSelected.value.id,
                hashsha: normalizedHash,
            },
            { encrypt: true },
        );

        const { status, message, data } = response.data ?? {};

        if (!isResponseSuccess(status) || !data || typeof data !== 'object') {
            itemSelected.value = null;
            push.error({
                title: 'Gagal',
                message: message || 'Detail item tidak ditemukan.',
            });
            return;
        }

        itemSelected.value = data;
        setNakesFromScannedItem(data);
    } catch (error) {
        console.error(error);
        itemSelected.value = null;
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingItemDetail.value = false;
        if (activeHashRequest.value === normalizedHash) {
            activeHashRequest.value = null;
        }
        lastProcessedHash.value = normalizedHash;
        lastProcessedAt.value = Date.now();
    }
};

function processTag(uid: string, cardType: string, data?: string) {
    const cleanUid = uid?.trim() || '';

    setFieldValue('nfc', `${cleanUid} - ${cardType}`);
    setFieldValue('signature', maskStringRandomlyConsecutive(data ?? '', 2, 3));

    if (isProcessingTag.value) {
        return; // Block if already processing
    }

    if (!dataSelected.value?.id) {
        itemSelected.value = null;
        push.warning({
            title: 'Informasi',
            message: 'Pilih data penerimaan sebelum melakukan scan item.',
        });
        return;
    }

    if (!data) {
        itemSelected.value = null;
        push.error({
            title: 'Gagal',
            message: 'Data hash pada tag tidak ditemukan. Gunakan tag item yang valid.',
        });
        return;
    }

    isProcessingTag.value = true;

    // Add a delay to prevent too rapid scanning
    setTimeout(() => {
        fetchItemDetail(data).finally(() => {
            isProcessingTag.value = false;
        });
    }, 1000); // 500ms delay
}

const onChangeDataPenerimaan = async (_items: any) => {
    if (isJson(_items)) {
        const selected = JSON.parse(_items);

        if (isJson(selected?.json)) {
            dataSelected.value = JSON.parse(selected.json);
            syncNakesOptions(dataSelected.value?.alokasi?.unit_rawat_id);
            itemSelected.value = null;
            nakesSelected.value = null;
            form.setFieldValue('nakes', '');
            form.setFieldValue('nfc', '');
            form.setFieldValue('signature', '');
            proofPhoto.value = null;
            fileName.value = null;

            // Check if box is locked and not opened
            if (isSelectedBoxLocked.value) {
                isOpenDialog.value = true;
            }

            return;
        }

        dataSelected.value = selected;
        syncNakesOptions(dataSelected.value?.alokasi?.unit_rawat_id);
        itemSelected.value = null;
        nakesSelected.value = null;
        form.setFieldValue('nakes', '');
        form.setFieldValue('nfc', '');
        form.setFieldValue('signature', '');
        proofPhoto.value = null;
        fileName.value = null;

        // Check if box is locked and not opened
        if (isSelectedBoxLocked.value) {
            isOpenDialog.value = true;
        }
        return;
    }

    dataSelected.value = null;
    dataNakes.value = [];
    itemSelected.value = null;
    nakesSelected.value = null;
    form.setFieldValue('nakes', '');
    form.setFieldValue('nfc', '');
    form.setFieldValue('signature', '');
    proofPhoto.value = null;
    fileName.value = null;
};

const fileName = ref<string | null>(null);
function handleFile(e: { target: { files: any[] } }) {
    const file = e.target.files[0] as File | undefined;
    if (file) {
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            push.error({
                title: 'Error',
                message: 'File yang dipilih harus berupa gambar (JPG, PNG, dll.).',
            });
            proofPhoto.value = null;
            fileName.value = null;
            return;
        }

        // Validasi ukuran file (maks 5MB)
        if (file.size > 5 * 1024 * 1024) {
            push.error({
                title: 'Error',
                message: 'Ukuran file maksimal 5 MB.',
            });
            proofPhoto.value = null;
            fileName.value = null;
            return;
        }

        proofPhoto.value = file;
        fileName.value = file.name;
        return;
    }

    proofPhoto.value = null;
    fileName.value = null;
}

const getBadgeClass = (status: string): string => {
    switch (status) {
        case 'skipped':
            return 'bg-orange-100 text-orange-800';
        case 'delivered':
            return 'bg-green-100 text-green-800';
        case 'no_delivery':
            return 'bg-red-100 text-red-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getBadgeText = (status: string): string => {
    console.log(status);

    switch (status) {
        case 'skipped':
            return 'Item Skip';
        case 'delivered':
            return 'Item Diserahkan';
        case 'no_delivery':
            return 'Item Belum Diserahkan';
        case 'cancelled':
            return 'Item Dibatalkan penyerahan';
        default:
            return 'Tidak tersedia';
    }
};

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
        title="Serah Terima ke Unit Rawat"
        page-title="Serah Terima ke Unit Rawat"
        page-sub-title="Proses penyerahan barang kepada nakes berdasarkan pengiriman"
    >
        <form autocomplete="off" @submit.prevent="onSubmit" @reset.prevent="onResetMainForm">
            <div class="mb-5 grid grid-cols-12 gap-4">
                <div class="col-span-12 flex flex-col gap-4 lg:col-span-4">
                    <FormField
                        v-slot="{ componentField }"
                        name="alokasi"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormControl>
                                <SelectWithCreate
                                    v-bind="componentField"
                                    title="Pilih Data Penerimaan"
                                    :options="dataPenerimaan"
                                    placeholder="Box UID Penerimaan"
                                    :value-result="ResultSelectWithCreate.json"
                                    :on-change="onChangeDataPenerimaan"
                                />
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>

                    <div v-if="dataSelected && !isSelectedBoxLocked" class="flex flex-col gap-4">
                        <div class="gap-4 rounded-lg border p-4">
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat Penerima</span>
                                <span class="text-right text-sm font-medium">{{ dataSelected?.alokasi?.unit_rawat?.nama || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Nomor Alokasi</span>
                                <span class="text-right text-sm font-medium">{{ dataSelected?.alokasi?.nan || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Periode Alokasi</span>
                                <span class="text-right text-sm font-medium">{{ dataSelected?.alokasi?.periode || '-' }}</span>
                            </div>
                        </div>

                        <div class="gap-4 rounded-lg border p-4">
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Penerima Paket</span>
                                <span class="text-right text-sm font-medium">
                                    {{ dataSelected?.penerima_event?.[0]?.user?.tenaga_medis?.data?.nama || '-' }}
                                </span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Tgl. Penerimaan</span>
                                <span class="text-right text-sm font-medium">{{
                                    dataSelected?.last_event_at ? formatDate(dataSelected.last_event_at) : '-'
                                }}</span>
                            </div>
                        </div>

                        <div class="gap-4 rounded-lg border p-4">
                            <ScrollArea class="h-50">
                                <div class="p-0">
                                    <h4 class="mb-4 text-sm leading-none font-medium">Detail Alokasi</h4>
                                    <template v-if="dataSelected?.alokasi?.details?.length">
                                        <template v-for="(detail, index) in dataSelected.alokasi.details" :key="index">
                                            <div class="text-sm">
                                                <div class="flex items-center justify-between">
                                                    <div class="flex items-center gap-2">
                                                        <span class="font-medium">{{ detail.jenis?.nama || detail.jenis?.name || '-' }}</span>
                                                        <div class="flex flex-wrap gap-1">
                                                            <span
                                                                v-for="item in detail.items"
                                                                :key="item.id"
                                                                :class="getBadgeClass(item.status)"
                                                                class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                                            >
                                                                {{ getBadgeText(item.status) }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span class="text-muted-foreground">{{ detail.jumlah }}x</span>
                                                </div>
                                                <div class="text-muted-foreground text-xs">
                                                    {{ detail.kategori?.nama || detail.kategori?.name || '-' }} &middot;
                                                    {{ detail.ukuran?.nama || detail.ukuran?.name || '-' }}
                                                </div>
                                                <div class="text-muted-foreground text-xs">TenagaMedis: {{ detail.tenaga_medis?.data?.nama || '-' }}</div>
                                            </div>
                                            <Separator class="my-2" />
                                        </template>
                                    </template>
                                    <p v-else class="text-muted-foreground text-xs">Tidak ada detail alokasi.</p>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <div v-else-if="dataSelected && isSelectedBoxLocked" class="gap-4 rounded-lg border bg-yellow-50 p-4 text-sm text-slate-800">
                        <div class="flex items-start gap-2">
                            <Info class="mt-0.5 size-4 shrink-0 text-orange-500" />
                            <div class="space-y-1">
                                <p class="font-medium">Box terkunci</p>
                                <p class="text-xs">Box ini memiliki status terkunci. Silahkan buka box terlebih dahulu sebelum melihat detail.</p>
                            </div>
                        </div>
                    </div>

                    <div v-else class="gap-4 rounded-lg border p-4">
                        <div class="text-muted-foreground flex items-start gap-2 text-sm">
                            <Info class="mt-0.5 size-4 shrink-0 text-orange-500" />
                            <div class="space-y-1">
                                <p class="font-medium">Belum ada Box Penerimaan yang terpilih</p>
                                <p class="text-xs">Silahkan pilih salah satu data penerimaan untuk mendapatkan informasi.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="dataSelected && !isSelectedBoxLocked" class="col-span-12 flex flex-col gap-4 lg:col-span-8">
                    <div class="">
                        <FormField
                            v-slot="{ componentField, errors }"
                            name="nfc"
                            :validate-on-change="false"
                            :validate-on-model-update="false"
                            :validate-on-blur="false"
                        >
                            <FormItem>
                                <FormLabel class="flex items-center justify-between gap-2">
                                    <span>Tap kartu RFID/NTAG pada Item</span>
                                    <span v-if="nfcIsConnected" class="text-crusoe-500 flex items-center text-xs font-semibold italic">
                                        NFC Reader Terhubung
                                    </span>
                                    <span v-else class="flex items-center text-xs font-semibold text-red-400 italic">
                                        NFC Reader Tidak Terhubung
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <InputGroup :class="[errors.length ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']">
                                        <InputGroupInput v-bind="componentField" readonly placeholder="UID - NFC/TAG Type" />
                                        <InputGroupAddon align="inline-end">
                                            <AnimatedTooltip text="Koneksikan ke perangkat reader" position="left">
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
                                            </AnimatedTooltip>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <p class="text-muted-foreground flex items-start gap-1 text-xs italic">
                                        <Info class="size-4 text-orange-500" /> Hubungkan NFC Reader, lalu tempelkan (tap) tag atau kartu RFID/NTAG
                                        pada perangkat untuk memulai proses pemindaian.
                                    </p>
                                </FormControl>
                                <FormErrorMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="rounded-lg border p-4">
                        <div v-if="isLoadingItemDetail" class="text-muted-foreground text-sm">Memuat detail item...</div>
                        <div v-else-if="itemSelected" class="grid grid-cols-1 gap-3 gap-x-10 md:grid-cols-2">
                            <div class="flex items-center justify-between gap-4 border-b pb-3 md:col-span-2">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">NSN</span>
                                    <span
                                        v-if="itemSelected?.is_skipped"
                                        class="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800"
                                    >
                                        <Info class="mr-1 size-3" />
                                        Item Di-skip
                                    </span>
                                </div>
                                <span class="text-right text-sm font-medium">{{ itemSelected?.nsn || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Jenis</span>
                                <span class="text-right text-sm font-medium">{{ detailItemLabel(itemSelected?.alokasiDetail?.jenis) }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Ukuran</span>
                                <span class="text-right text-sm font-medium">{{ detailItemLabel(itemSelected?.alokasiDetail?.ukuran) }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Kategori</span>
                                <span class="text-right text-sm font-medium">{{ detailItemLabel(itemSelected?.alokasiDetail?.kategori) }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Tgl. Registrasi</span>
                                <span class="text-right text-sm font-medium">
                                    {{ itemSelected?.createdAt ? formatDate(itemSelected.createdAt) : '-' }}
                                </span>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground flex items-start gap-2 text-sm">
                            <!-- <Info class="mt-0.5 size-4 shrink-0 text-orange-500" /> -->
                            <div class="space-y-1">
                                <p class="font-medium">Belum ada item yang dipindai</p>
                                <p class="text-xs">Hubungkan reader lalu tap tag item untuk memuat detail barang dari backend.</p>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-lg border p-4">
                        <div v-if="itemSelected && nakesSelected" class="grid grid-cols-1 gap-3 gap-x-10 md:grid-cols-2">
                            <div class="flex items-center justify-between gap-4 border-b pb-3 md:col-span-2">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Nama Nakes</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.nama || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">NRP</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.nrp || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Pangkat</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.pangkat || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Posisi</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.posisi || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Lokasi</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.lokasi || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">UnitRawat</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.unit_rawat || '-' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Faskes</span>
                                <span class="text-right text-sm font-medium">{{ nakesSelected?.faskes || '-' }}</span>
                            </div>
                        </div>
                        <div v-else class="text-muted-foreground flex items-start gap-2 text-sm">
                            <Users class="text-crusoe-500 mt-0.5 size-4 shrink-0" />
                            <div class="space-y-1">
                                <p class="font-medium">Belum ada nakes yang terpilih</p>
                                <p class="text-xs">Scan item untuk menampilkan detail nakes yang terkait.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid w-full items-center gap-1.5">
                        <label for="picture" class="cursor-pointer rounded-md border bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100">
                            Unggah foto bukti
                        </label>
                        <Input id="picture" type="file" class="hidden" @change="handleFile" />
                        <span class="text-sm text-gray-500">
                            {{ fileName ?? 'Belum ada file yang di pilih' }}
                        </span>
                    </div>

                    <div v-if="itemSelected && !itemSelected?.is_skipped" class="flex gap-2">
                        <Button type="button" variant="destructive" @click="isOpenCancelDialog = true"> Batalkan Penyerahan </Button>

                        <Button
                            type="submit"
                            :disabled="loading"
                            class="border-gray-300 bg-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-500 dark:hover:text-white"
                        >
                            <GitBranchPlus /> {{ loading ? 'Memproses...' : 'Konfirmasi Penyerahan' }}
                        </Button>
                    </div>
                </div>
            </div>
            <div class="mb-5 grid grid-cols-4 gap-4"></div>
        </form>

        <Dialog v-model:open="isOpenDialog">
            <DialogContent class="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Buka Box</DialogTitle>
                    <DialogDescription>
                        Box ini dalam status terkunci. Masukkan keterangan pembukaan untuk melanjutkan proses penyaluran.
                    </DialogDescription>
                </DialogHeader>
                <div class="py-4">
                    <label class="mb-2 block text-sm font-medium text-slate-700">Keterangan Pembukaan</label>
                    <Textarea v-model="keteranganBuka" placeholder="Masukkan keterangan pembukaan box" rows="4" />
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="isOpenDialog = false">Batal</Button>
                    <Button @click="bukaBox">Buka Box</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="isOpenCancelDialog">
            <DialogContent class="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Batalkan Penyerahan</DialogTitle>
                    <DialogDescription> Masukkan keterangan pembatalan penyerahan untuk item ini. </DialogDescription>
                </DialogHeader>
                <div class="py-4">
                    <label class="mb-2 block text-sm font-medium text-slate-700">Keterangan Pembatalan</label>
                    <Textarea v-model="keteranganCancel" placeholder="Masukkan keterangan pembatalan penyerahan" rows="4" />
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="isOpenCancelDialog = false">Batal</Button>
                    <Button variant="destructive" @click="cancelDelivery">Batalkan Penyerahan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </PublicLayout>
</template>
