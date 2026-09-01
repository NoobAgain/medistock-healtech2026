<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { toTypedSchema } from '@vee-validate/zod';
import { AlertCircleIcon, ArrowBigLeft, CircleCheck, CircleQuestionMark, Info, RotateCw } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import SelectWithCreate from '@/components/composable/SelectWithCreate.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field } from '@/components/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent, writeTag } from '@/lib/libNCF';
import { _opsiAlokasi, _opsiDetailAlokasi, isLoadingDetailAlokasi, loadDetailAlokasi, loadHasAlokasi, loadOpsiAlokasi } from '@/lib/libRegItem';
import { isJson, isResponseSuccess, requiredSelectSchema } from '@/lib/libUtils';
import { regItem, regItemAddnew, regItemGethash, regItemGetnsn } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { ResultSelectWithCreate, type BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

type AddNewItemPayload = {
    id_detail_alokasi: number;
    nsn: string;
    hash: string;
    status: number;
};

const layout = useLayoutStore();
const isUpdatingData = ref(false);
const isLoadingSubmit = ref(false);
const isLoadingSignature = ref(false);
const isWriting = ref(false);
const isLoadingjmlAlokasi = ref(false);
const isjmlAlokasiFull = ref(false);

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(async () => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Data Obat & Alkes', href: regItem.url() },
        { label: 'Registrasi Item Baru', href: '' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.2 } });
    await Promise.all([loadOpsiAlokasi(), getnsn()]);

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

const backPage = () => {
    router.visit(regItem.url(), { replace: true });
};

const isLoadingNSN = ref(false);
const nsnValue = ref('');
const getnsn = async (): Promise<void> => {
    try {
        isLoadingNSN.value = true;
        const response = await axiosJS.get(regItemGetnsn.url());
        const { status, nsn } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && nsn) {
            nsnValue.value = nsn;
            await nextTick();
            setFieldValue('nsn', nsn);
        } else {
            push.error({
                title: 'Gagal',
                message: 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingNSN.value = false;
    }
};

/**
 * FORM
 */
const formSchema = toTypedSchema(
    z.object({
        nsn: requiredSelectSchema(),
        alokasi: requiredSelectSchema(),
        alokasi_detail: requiredSelectSchema(),
        jml_alokasi: z.number().optional(),
        jml_teralokasi: z.number().optional(),
        nfc: requiredSelectSchema({ isOptional: true }),
        signature: z.string().optional(),
    }),
);
const form = useForm({
    validationSchema: formSchema,
});
const { setFieldValue } = form;
const submitPayload = ref<AddNewItemPayload | null>(null);

const saveNewItem = async (): Promise<void> => {
    if (!submitPayload.value) {
        throw new Error('Payload registrasi item kosong.');
    }

    const response = await axiosJS.post(regItemAddnew.url(), submitPayload.value, { encrypt: true });
    const { status, message } = response.data ?? {};

    if (!isResponseSuccess(status)) {
        throw new Error(message ?? 'Gagal menyimpan data item.');
    }
};

const onSubmit = form.handleSubmit(async (values) => {
    if (nfcIsConnected.value === false) {
        push.error('Reader tidak terkoneksi.');
        return;
    }
    if (!values.signature) {
        push.error('Silahkan tapping NTAG/RFID pada perangkat reader');
        return;
    }
    if (!isJson(values.alokasi_detail as string)) {
        push.error('Detail alokasi tidak valid. Silahkan pilih ulang data alokasi.');
        return;
    }

    const alokasiDetail = JSON.parse(values.alokasi_detail as string);
    if (!alokasiDetail?.id) {
        push.error('Detail alokasi tidak ditemukan. Silahkan pilih ulang data alokasi.');
        return;
    }

    submitPayload.value = {
        id_detail_alokasi: Number(alokasiDetail.id),
        nsn: String(values.nsn),
        hash: String(values.signature),
        status: 1,
    };

    try {
        isLoadingSubmit.value = true;
        isWriting.value = true;
        push.info({
            title: 'Proses Binding',
            message: 'Silahkan tunggu, data sedang ditulis ke NFC/RFID.',
        });

        await writeTag(String(values.signature));
    } catch (error) {
        console.error(error);
        isLoadingSubmit.value = false;
        isWriting.value = false;
        submitPayload.value = null;
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan saat mengirim perintah tulis ke perangkat reader.',
        });
    }
});
const onResetMainForm = async () => {
    form.resetForm();
    _opsiAlokasi.value = [];
    _opsiDetailAlokasi.value = [];
    isjmlAlokasiFull.value = false;
    await Promise.all([loadOpsiAlokasi(), getnsn()]);
};

/**
 * Alokasi
 */
const onChangeAlokasi = (items: any) => {
    if (!isJson(items)) return;
    const data = JSON.parse(items);
    setFieldValue('alokasi', data.id);
    loadDetailAlokasi(data.id);
};
const onChangeDetail = async (items: any) => {
    if (!isJson(items)) return;
    isjmlAlokasiFull.value = false;
    const data = JSON.parse(items);
    setFieldValue('alokasi_detail', data.id);
    setFieldValue('jml_alokasi', data.jml ?? '0');
    isLoadingjmlAlokasi.value = true;
    const jmlTeralokasi = await loadHasAlokasi(data.id);
    setFieldValue('jml_teralokasi', jmlTeralokasi);
    isLoadingjmlAlokasi.value = false;

    if (data.jml <= jmlTeralokasi) {
        isjmlAlokasiFull.value = true;
    }
};

/**
 * NFC TAG
 */
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
const hashData = async (uid: string, nsn: string): Promise<void> => {
    try {
        setFieldValue('signature', '');
        isLoadingSignature.value = true;
        const payload = { uid: uid, nsn: nsn };
        const response = await axiosJS.post(regItemGethash.url(), payload, { encrypt: true });

        const { status, signature, message } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        isLoadingSignature.value = false;
        if (isSuccess && signature) {
            await nextTick();
            setFieldValue('signature', signature);
        } else {
            setFieldValue('nfc', '');
            push.error({
                title: 'Gagal',
                message: message || 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        isLoadingNSN.value = false;
    }
};

const indicatorActive = ref(false);
let indicatorTimer: any = null;

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
function processTag(uid: string, cardType: string) {
    if (isWriting.value) return;
    triggerIndicator();

    const cleanUid = uid?.trim() || '';
    const currentNfc = (form.values.nfc as string | undefined)?.trim() || '';
    const currentUid = currentNfc.split(' - ')[0];

    if (!cleanUid || cleanUid === currentUid) return;

    setFieldValue('nfc', `${cleanUid} - ${cardType}`);
    hashData(cleanUid, form.values.nsn as string);
}
const setupNfcEvents = () => {
    NfcTagEvent.on('onTagReady', (ready) => {
        console.log('NFC siap:', ready);
    });

    NfcTagEvent.on('onTagRead', (tag) => {
        console.log('Kartu terbaca:', tag.uid, tag.cardType, tag.data);
        processTag(tag.uid, tag.cardType);
    });

    NfcTagEvent.on('onTagUnverified', (tag) => {
        console.log('Kartu tidak terverifikasi:', tag.uid, tag.cardType);
        processTag(tag.uid, tag.cardType);
    });

    NfcTagEvent.on('onCloneDetected', ({ uid, cardType, data }) => {
        console.log('Clone terdeteksi:', uid, cardType, data);
        processTag(uid, cardType);
    });

    NfcTagEvent.on('onWriteSuccess', async ({ uid, cardType }) => {
        console.log('Write berhasil:', uid, cardType);
        try {
            await saveNewItem();
            push.success({ title: 'Enroled', message: 'Data berhasil di tambahkan ke NFC/RFID' });
            await onResetMainForm();
        } catch (error) {
            console.error(error);
            push.error({
                title: 'Gagal',
                message: (error as Error)?.message ?? 'Data berhasil ditulis ke tag, tetapi gagal disimpan ke sistem.',
            });
        } finally {
            isWriting.value = false;
            isLoadingSubmit.value = false;
            submitPayload.value = null;
        }
    });

    NfcTagEvent.on('onWriteFail', ({ reason }) => {
        console.log('Write gagal:', reason);
        isWriting.value = false;
        isLoadingSubmit.value = false;
        submitPayload.value = null;
        push.error('Data gagal di tambahkan ke NFC/RFID');
    });

    NfcTagEvent.on('onDisconnected', () => {
        console.log('NFC terputus');
        isWriting.value = false;
        isLoadingSubmit.value = false;
        submitPayload.value = null;
        push.error({ title: 'Gagal', message: 'Reader terputus. silahkan reload halaman.' });
    });
};
</script>

<template>
    <PublicLayout title="Registrasi Item Baru" page-title="Registrasi Item Baru" page-sub-title="Tambahkan item baru ke dalam sistem">
        <div class="mb-8 flex items-center justify-between">
            <ButtonGroup>
                <Button
                    variant="outline"
                    size="sm"
                    class="border-gray-300 bg-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white dark:text-gray-500 dark:hover:text-white"
                    @click="backPage()"
                >
                    <ArrowBigLeft /> Kembali
                </Button>
            </ButtonGroup>
        </div>

        <form autocomplete="off" @submit.prevent="onSubmit" @reset.prevent="onResetMainForm">
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="space-y-4">
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
                                    title="Pilih Alokasi"
                                    :options="_opsiAlokasi"
                                    placeholder="Nomor Alokasi Nasional - Periode"
                                    :value-result="ResultSelectWithCreate.json"
                                    :on-change="onChangeAlokasi"
                                />
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>

                    <FormField
                        v-slot="{ componentField }"
                        name="alokasi_detail"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormControl>
                                <SelectWithCreate
                                    v-bind="componentField"
                                    title="Pilih Alokasi Alkes"
                                    :options="_opsiDetailAlokasi"
                                    placeholder="Pilih Alokasi Alkes"
                                    :value-result="ResultSelectWithCreate.json"
                                    :on-change="onChangeDetail"
                                    :loading="isLoadingDetailAlokasi"
                                />
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>

                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div class="space-y-4">
                            <FormField
                                v-slot="{ componentField }"
                                name="jml_alokasi"
                                :validate-on-change="false"
                                :validate-on-model-update="false"
                                :validate-on-blur="false"
                            >
                                <FormItem>
                                    <FormLabel>Jumlah Alokasi</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupInput placeholder="0" disabled v-bind="componentField" />
                                        </InputGroup>
                                    </FormControl>
                                    <FormErrorMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <div class="space-y-4">
                            <FormField
                                v-slot="{ componentField }"
                                name="jml_teralokasi"
                                :validate-on-change="false"
                                :validate-on-model-update="false"
                                :validate-on-blur="false"
                            >
                                <FormItem>
                                    <FormLabel>Jumlah Teralokasi</FormLabel>
                                    <FormControl>
                                        <InputGroup data-disabled>
                                            <InputGroupInput placeholder="0" disabled v-bind="componentField" />
                                            <InputGroupAddon align="inline-end">
                                                <Spinner v-if="isLoadingjmlAlokasi" />
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormControl>
                                    <FormErrorMessage />
                                </FormItem>
                            </FormField>
                        </div>
                    </div>

                    <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 translate-y-2"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-2"
                    >
                        <Alert v-if="isjmlAlokasiFull" variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>Alokasi Telah Terpenuhi</AlertTitle>
                            <AlertDescription>
                                <p>Jumlah alokasi saat ini telah tercapai. Penambahan item baru tidak dapat dilakukan.</p>
                            </AlertDescription>
                        </Alert>
                    </Transition>
                </div>
                <div class="space-y-4">
                    <FormField
                        v-slot="{ componentField }"
                        name="nsn"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem hidden="true">
                            <FormLabel>Nomor Stok Nasional</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput v-bind="componentField" readonly placeholder="13 digit NSN" />
                                    <InputGroupAddon align="inline-end">
                                        <div v-if="isLoadingNSN">
                                            <Spinner />
                                        </div>
                                        <div v-else>
                                            <InputGroupButton
                                                type="button"
                                                aria-label="Generate"
                                                title="Generate"
                                                size="icon-xs"
                                                :disabled="isUpdatingData"
                                                @click="getnsn"
                                            >
                                                <RotateCw />
                                            </InputGroupButton>
                                        </div>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                            <FormErrorMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField, errors }"
                        name="nfc"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem>
                            <FormLabel class="flex items-center justify-between gap-2">
                                <span>nTag/Kartu NFC</span>
                                <span v-if="nfcIsConnected" class="text-crusoe-500 flex items-center text-xs font-semibold italic">
                                    NFC Reader Terhubung
                                </span>
                                <span v-else class="flex items-center text-xs font-semibold text-red-400 italic"> NFC Reader Tidak Terhubung </span>
                            </FormLabel>
                            <FormControl>
                                <InputGroup :class="[errors.length ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']">
                                    <InputGroupInput v-bind="componentField" readonly placeholder="UID - NFC/TAG Type" />
                                    <InputGroupAddon align="inline-end">
                                        <AnimatedTooltip text="Koneksikan ke perangkat reader" position="left">
                                            <InputGroupButton
                                                :disabled="isjmlAlokasiFull"
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
                                    <Info class="size-4 text-orange-500" /> Hubungkan NFC Reader, lalu tempelkan (tap) tag atau kartu NFC/NTAG pada
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
                                <!-- <Textarea placeholder="Enrole Data NTAG/RFID" v-bind="componentField" readonly class="resize-none" rows="1" /> -->
                                <InputGroup>
                                    <InputGroupTextarea placeholder="Enrole Data NTAG/RFID" v-bind="componentField" readonly class="resize-none" />
                                    <InputGroupAddon align="block-end">
                                        <div class="flex w-full items-center justify-between">
                                            <div class="flex items-center">
                                                <InputGroupText v-if="isLoadingSignature" class="text-muted-foreground text-xs">
                                                    <Spinner /> Enrolling data hash
                                                </InputGroupText>

                                                <template v-else>
                                                    <InputGroupText v-if="form.values.signature" class="text-muted-foreground text-xs">
                                                        <CircleCheck class="text-crusoe-500" />
                                                        HMAC 256 Enroled
                                                    </InputGroupText>

                                                    <InputGroupText v-else class="text-muted-foreground text-xs">
                                                        <CircleQuestionMark />
                                                        Tidak ada data enroled
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
            </div>
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-1">
                <Field orientation="horizontal" class="items-start justify-end">
                    <Button type="reset" variant="outline" :disabled="isUpdatingData"> Reset </Button>
                    <Button type="submit" class="shrink-0" :disabled="isLoadingSubmit || isjmlAlokasiFull"> Tambah Item </Button>
                </Field>
            </div>
        </form>
    </PublicLayout>
</template>
