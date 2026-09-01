<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Notivue, Notification, NotificationProgress, NotivueSwipe, pastelTheme, push } from 'notivue';

import { onMounted, ref } from 'vue';
import { loginLostpasswordReset } from '@/routes';
import Button from '@components/ui/button/Button.vue';
import Spinner from '@components/ui/spinner/Spinner.vue';
import logo from '@images/LogoOnly.svg';
import axiosJS from '@lib/libAxios';
import { emailValidation } from '@lib/libUtils';

const theme = {
    ...pastelTheme,
    '--nv-z': '9999',
    '--nv-shadow': '0px 0rem 2.5rem 10px rgba(0, 0, 0, 0.15)',
} as const;
const appInfo = (usePage().props.appInfo ?? {}) as any;
const title = `Lupa Password | ${appInfo.appshortname} ${appInfo.appver}`;
const blockAction = (e: Event) => {
    const actionNames: Record<string, string> = {
        paste: 'paste',
        copy: 'copy',
        cut: 'cut',
        drop: 'drop',
    };
    const actionType = actionNames[(e as any).type] ?? (e as any).type;
    push.error({
        title: 'Whoops...',
        message: `Maaf, aksi ${actionType} tidak di ijinkan pada kolom ini.`,
    });
};

const isSubmit = ref(false);
const emailRef = ref<HTMLInputElement | null>(null);
const email = ref('');
const errors = ref({ email: false, errMsg: '' });
const submitReset = async () => {
    errors.value.email = false;
    errors.value.errMsg = '';

    const error = emailValidation(email.value);
    if (error) {
        errors.value.email = true;
        errors.value.errMsg = error;
        return;
    }
    isSubmit.value = true;

    try {
        const payload = {
            email: email.value.trim(),
        };
        const response = await axiosJS.post(loginLostpasswordReset.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = status === true || status === 1 || status === '1' || status === 'true';

        if (isSuccess) {
            isSubmit.value = false;
            push.success({
                title: 'Success',
                message: message ?? 'Email link berhasil dikirimkan.',
            });
        } else {
            isSubmit.value = false;
            push.error({
                title: 'Gagal',
                message: message ?? 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        isSubmit.value = false;
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    } finally {
        email.value = '';
    }
};

onMounted(() => {
    emailRef.value?.focus();
});
</script>

<template>
    <Head :title="title">
        <meta name="description" content="Deskripsi halaman" />
        <meta name="csrf-token" :content="usePage().props?.csrf_token as string" />
    </Head>

    <div style="z-index: 2147483647 !important">
        <Notivue v-slot="item">
            <NotivueSwipe :item="item">
                <Notification :item="item" :theme="theme">
                    <NotificationProgress :item="item" />
                </Notification>
            </NotivueSwipe>
        </Notivue>
    </div>

    <div class="page-transition bg-hero-logo from-crusoe-50 flex min-h-screen grow flex-col bg-linear-25 to-gray-300">
        <section class="z-10 flex flex-1 items-center justify-center px-4">
            <div class="group flex w-full max-w-md rounded-xl bg-gray-100 p-4 shadow transition duration-300 hover:shadow-xl">
                <div class="w-full">
                    <div class="mx-auto mb-2 flex items-center gap-3">
                        <img class="size-9 shrink-0" alt="Logo" :src="logo" />
                        <h2 class="text-crusoe-600 mb-1 text-3xl font-bold text-shadow-lg">Lupa Password</h2>
                    </div>
                    <p class="text-gray-700">Silakan masukkan alamat email Anda untuk menerima tautan pengaturan ulang kata sandi.</p>
                    <hr class="my-5 border-t-gray-200" />

                    <form
                        class="mt-2"
                        method="POST"
                        autocomplete="off"
                        novalidate
                        @paste.prevent="blockAction"
                        @copy.prevent="blockAction"
                        @cut.prevent="blockAction"
                        @drop.prevent="blockAction"
                        @submit.prevent="submitReset"
                    >
                        <div class="mb-8">
                            <label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="uil-envelope-alt text-gray-400"></i>
                                </div>
                                <input
                                    ref="emailRef"
                                    v-model="email"
                                    type="email"
                                    placeholder="Alamat Email"
                                    autocomplete="off"
                                    :class="['input-login transition duration-200', { 'border-red-500': errors.email }]"
                                />
                            </div>
                            <Transition name="slide-down" mode="out-in">
                                <div v-if="errors.email" key="email-error" class="absolute">
                                    <p class="mt-0.5 text-sm text-red-600">
                                        {{ errors.errMsg ?? '* Isian Email tidak boleh kosong.' }}
                                    </p>
                                </div>
                            </Transition>
                        </div>

                        <Button
                            size="lg"
                            variant="outline"
                            class="from-crusoe-500 to-crusoe-600 hover:from-crusoe-600 hover:to-crusoe-500 focus:from-crusoe-600 focus:outline-crusoe-300 mt-6 flex h-12 w-full bg-linear-to-r text-white transition-colors duration-300 hover:text-white"
                            :disabled="isSubmit"
                        >
                            <div v-if="isSubmit" class="flex items-center justify-center gap-3">
                                <Spinner class="animate-spin" />
                                Silahkan tunggu
                            </div>

                            <div v-else>Kirim Reset Link</div>
                        </Button>
                    </form>
                </div>
            </div>
        </section>
        <footer class="to-crusoe-50 z-10 border-t border-gray-300 bg-linear-25 from-gray-50 py-5 text-xs text-gray-500 inset-shadow-sm">
            <div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <div class="text-center sm:text-center md:text-left">
                    <div class="mx-auto mb-0 flex items-center justify-center gap-3 md:justify-start">
                        <img class="size-5 shrink-0" alt="Logo" :src="logo" />
                        <p class="text-base font-semibold text-gray-500">{{ appInfo.appshortname }} {{ appInfo.appver }}</p>
                    </div>

                    <p>{{ appInfo.appname_en }}</p>
                    <p>{{ appInfo.appinfo_en }}</p>
                </div>
                <div class="text-center md:text-right">
                    <p>{{ appInfo.app_copyright }}</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
