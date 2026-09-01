<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { CircleCheck, CircleQuestionMark, Info, RotateCw, ShieldAlert } from 'lucide-vue-next';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import z from 'zod';
import FormErrorMessage from '@/components/composable/FormErrorMessage.vue';
import SelectWithCreate from '@/components/composable/SelectWithCreate.vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Badge from '@/components/ui/badge/Badge.vue';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { connectSerial, disconnectSerial, nfcIsConnected, NfcTagEvent, writeTag } from '@/lib/libNCF';
import { _opsiAlokasi, loadOpsiAlokasi } from '@/lib/libPengiriman';
import { isJson, isResponseSuccess, requiredSelectSchema } from '@/lib/libUtils';
import { pengirimanDataAlokasi, pengirimanHashBox, pengirimanUid, pengirimanStore, pengirimanBaru } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import { ResultSelectWithCreate, type BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

type AddNewBoxPayload = {
    boxuid: number;
    hash: string;
    alokasi: number;
};

type DataAlokasiSelected = {
    nan?: string;
    periode?: string;
    status?: string;
    unit_rawat?: { id?: number | string; nama?: string };
    total_alokasi_items?: number | string;
    items_teralokasi?: number | string;
};

const layout = useLayoutStore();
const isLoadingUID = ref(false);
const isWriting = ref(false);
const isLoadingSubmit = ref(false);
const submitPayload = ref<AddNewBoxPayload | null>(null);
const isLoadingSignature = ref(false);
const dataAlokasi = ref<DataAlokasiSelected | null>(null);
const hasDataAlokasi = computed(() => dataAlokasi.value !== null);
const itemNotEnough = ref<boolean>(false);

withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(async () => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Pengiriman Barang', href: '' },
        { label: 'Buat Pengiriman', href: pengirimanBaru.url() },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 1.31 } });
    await Promise.all([loadOpsiAlokasi(), getUID()]);

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
const savePengiriman = async (): Promise<void> => {
    if (!submitPayload.value) {
        throw new Error('Payload pengiriman kosong.');
    }

    const response = await axiosJS.post(
        pengirimanStore.url(),
        {
            boxuid: submitPayload.value.boxuid,
            signature: submitPayload.value.hash,
            alokasi: submitPayload.value.alokasi,
        },
        { encrypt: true },
    );
    const { status, message } = response.data ?? {};

    if (!isResponseSuccess(status)) {
        throw new Error(message ?? 'Terjadi kesalahan saat menyimpan pengiriman.');
    }
};

const onSubmit = form.handleSubmit(async (values) => {
    if (!nfcIsConnected.value) {
        push.error('Reader tidak terkoneksi.');
        return;
    }

    if (!values.signature) {
        push.error('Silahkan tapping NTAG/RFID pada perangkat reader.');
        return;
    }

    if (!isJson(values.alokasi as string)) {
        push.error('Data alokasi tidak valid. Silahkan pilih ulang alokasi.');
        return;
    }

    const alokasi = JSON.parse(values.alokasi as string);
    const boxuid = Number(values.boxuid);

    if (!alokasi?.id) {
        push.error('Data alokasi tidak ditemukan. Silahkan pilih ulang alokasi.');
        return;
    }

    if (!boxuid) {
        push.error('Box UID tidak valid. Silahkan generate ulang UID.');
        return;
    }

    submitPayload.value = {
        boxuid,
        hash: String(values.signature),
        alokasi: Number(alokasi.id),
    };

    try {
        isLoadingSubmit.value = true;
        isWriting.value = true;
        push.info({
            title: 'Proses Binding',
            message:
                'Silakan lakukan tapping ulang pada NFC/RFID, kemudian tunggu beberapa saat. Sistem sedang menuliskan data ke perangkat NFC/RFID',
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

    itemNotEnough.value = false;
    dataAlokasi.value = null;
    submitPayload.value = null;
    await Promise.all([getUID()]);
};

async function getUID(): Promise<void> {
    try {
        isLoadingUID.value = true;
        const response = await axiosJS.get(pengirimanUid.url());
        const { status, uid } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && uid) {
            await nextTick();
            setFieldValue('boxuid', uid);
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
        isLoadingUID.value = false;
    }
}

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

const onChangeAlokasi = async (items: any) => {
    if (!isJson(items)) return;
    const dataPayload = JSON.parse(items);
    const payload = { id: dataPayload.id };
    try {
        const response = await axiosJS.post(pengirimanDataAlokasi.url(), payload, { encrypt: true });
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            dataAlokasi.value = data;
            itemNotEnough.value = (dataAlokasi.value?.items_teralokasi ?? 0) < (dataAlokasi.value?.total_alokasi_items ?? 0);
        } else {
            dataAlokasi.value = null;
            push.error('Gagal mendapatkan data alokasi.');
        }
    } catch (error) {
        dataAlokasi.value = null;
        console.error('Error loading opsi ukuran:', error);
    }
};

/**
 * NFC
 */
const indicatorActive = ref(false);
let indicatorTimer: any = null;

const hashBoxData = async (uid: string): Promise<void> => {
    try {
        setFieldValue('signature', '');
        isLoadingSignature.value = true;
        const boxUID = form.values.boxuid ?? '';
        const payload = { uid: uid, boxUID: boxUID };
        const response = await axiosJS.post(pengirimanHashBox.url(), payload, { encrypt: true });

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
        isLoadingSignature.value = false;
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
function processTag(uid: string, cardType: string) {
    if (isWriting.value) return;
    triggerIndicator();

    const cleanUid = uid?.trim() || '';
    const currentNfc = (form.values.nfc as string | undefined)?.trim() || '';
    const currentUid = currentNfc.split(' - ')[0];

    if (!cleanUid || cleanUid === currentUid) return;

    setFieldValue('nfc', `${cleanUid} - ${cardType}`);
    hashBoxData(cleanUid);
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

    NfcTagEvent.on('onWriteSuccess', async ({ uid, cardType, dataWritten, isEncrypted }) => {
        console.log('Write berhasil:', uid, cardType, isEncrypted ? '[ENCRYPTED]' : dataWritten);
        try {
            await savePengiriman();
            push.success({
                title: 'Berhasil',
                message: 'Data berhasil ditulis ke NFC/RFID dan disimpan ke sistem.',
            });
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

    NfcTagEvent.on('onWriteFail', ({ reason, uid, cardType }) => {
        console.log('Write gagal:', reason, uid, cardType);
        isWriting.value = false;
        isLoadingSubmit.value = false;
        submitPayload.value = null;
        push.error({
            title: 'Gagal',
            message: uid ? `Gagal menulis ke kartu ${cardType} (${uid}): ${reason}` : `Gagal menulis ke kartu: ${reason}`,
        });
    });

    // NfcTagEvent.on('onWriteSuccess', async ({ uid, cardType }) => {
    //     console.log('Write berhasil:', uid, cardType);
    //     try {
    //         await savePengiriman();
    //         push.success({
    //             title: 'Berhasil',
    //             message: 'Data berhasil ditulis ke NFC/RFID dan disimpan ke sistem.',
    //         });
    //         await onResetMainForm();
    //     } catch (error) {
    //         console.error(error);
    //         push.error({
    //             title: 'Gagal',
    //             message: (error as Error)?.message ?? 'Data berhasil ditulis ke tag, tetapi gagal disimpan ke sistem.',
    //         });
    //     } finally {
    //         isWriting.value = false;
    //         isLoadingSubmit.value = false;
    //         submitPayload.value = null;
    //     }
    // });

    // NfcTagEvent.on('onWriteFail', ({ reason }) => {
    //     console.log('Write gagal:', reason);
    //     isWriting.value = false;
    //     isLoadingSubmit.value = false;
    //     submitPayload.value = null;
    //     push.error('Data gagal di tambahkan ke NFC/RFID');
    // });

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
    <PublicLayout title="Buat Pengiriman" page-title="Buat Pengiriman" page-sub-title="Proses pembuatan dan pencatatan pengiriman baru">
        <form autocomplete="off" @submit.prevent="onSubmit" @reset.prevent="onResetMainForm">
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="space-y-4">
                    <FormField
                        v-slot="{ componentField }"
                        name="boxuid"
                        :validate-on-change="false"
                        :validate-on-model-update="false"
                        :validate-on-blur="false"
                    >
                        <FormItem hidden="true">
                            <FormLabel>BOX UID</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput v-bind="componentField" readonly placeholder="Box UID" />
                                    <InputGroupAddon align="inline-end">
                                        <div v-if="isLoadingUID">
                                            <Spinner />
                                        </div>
                                        <div v-else>
                                            <InputGroupButton
                                                type="button"
                                                aria-label="Generate"
                                                title="Generate"
                                                size="icon-xs"
                                                :disabled="isLoadingUID"
                                                @click="getUID"
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

                    <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 translate-y-2"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-2"
                    >
                        <div v-if="hasDataAlokasi" class="space-y-4 rounded-lg border p-4">
                            <FieldSet class="flex gap-2">
                                <FieldGroup class="flex gap-2 transition-all duration-300">
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel>Detail alokasi</FieldLabel>
                                        </FieldContent>
                                    </Field>
                                    <hr />
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel class="font-light">Nomor Alokasi Nasional</FieldLabel>
                                        </FieldContent>
                                        <FieldDescription>{{ dataAlokasi?.nan ?? '-' }}</FieldDescription>
                                    </Field>
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel class="font-light">Periode</FieldLabel>
                                        </FieldContent>
                                        <FieldDescription>{{ dataAlokasi?.periode ?? '-' }}</FieldDescription>
                                    </Field>
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel class="font-light">UnitRawat Penerima</FieldLabel>
                                        </FieldContent>
                                        <FieldDescription>{{ dataAlokasi?.unit_rawat?.nama ?? '-' }}</FieldDescription>
                                    </Field>
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel class="font-light">Jumlah Item yang Dialokasikan</FieldLabel>
                                        </FieldContent>
                                        <FieldDescription>{{ dataAlokasi?.total_alokasi_items ?? 0 }} item(s)</FieldDescription>
                                    </Field>
                                    <Field orientation="responsive">
                                        <FieldContent>
                                            <FieldLabel class="font-light">Jumlah Item yang Sudah Teralokasi</FieldLabel>
                                        </FieldContent>
                                        <FieldDescription :class="[{ 'text-red-500': itemNotEnough }]"
                                            >{{ dataAlokasi?.items_teralokasi ?? 0 }} item(s)</FieldDescription
                                        >
                                    </Field>

                                    <Transition
                                        enter-active-class="transition-all duration-300 ease-out"
                                        enter-from-class="opacity-0 translate-y-2"
                                        enter-to-class="opacity-100 translate-y-0"
                                        leave-active-class="transition-all duration-200 ease-in"
                                        leave-from-class="opacity-100 translate-y-0"
                                        leave-to-class="opacity-0 translate-y-2"
                                    >
                                        <Alert v-if="itemNotEnough" variant="destructive">
                                            <ShieldAlert />
                                            <AlertDescription>
                                                Jumlah item belum memenuhi alokasi, silahkan tambah item pada menu inventory
                                            </AlertDescription>
                                        </Alert>
                                    </Transition>
                                </FieldGroup>
                            </FieldSet>
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-1">
                <Field orientation="horizontal" class="items-start justify-start">
                    <Button type="reset" variant="outline"> Reset </Button>
                    <Button type="submit" class="shrink-0" :disabled="isLoadingSubmit || itemNotEnough"> Proses Agregasi </Button>
                </Field>
            </div>
        </form>
    </PublicLayout>
</template>
