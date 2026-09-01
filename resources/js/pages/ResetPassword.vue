<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { ArrowBigLeftDash } from 'lucide-vue-next';
import { Notivue, Notification, NotificationProgress, NotivueSwipe, pastelTheme, push } from 'notivue';

import { ref } from 'vue';
import { login, passwordResetuser } from '@/routes';
import Button from '@components/ui/button/Button.vue';
import Spinner from '@components/ui/spinner/Spinner.vue';
import logo from '@images/LogoOnly.svg';
import axiosJS from '@lib/libAxios';
import { validateStrongPassword } from '@lib/libUtils';

const theme = {
    ...pastelTheme,
    '--nv-z': '9999',
    '--nv-shadow': '0px 0rem 2.5rem 10px rgba(0, 0, 0, 0.15)',
} as const;
const appInfo = (usePage().props.appInfo ?? {}) as any;
const title = `Reset Password | ${appInfo.appshortname} ${appInfo.appver}`;
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

let autoHideTimer: ReturnType<typeof setTimeout> | null = null;
const AUTO_HIDE_DELAY = 1000;
const gotoLogin = () => {
    router.visit(login.url(), { replace: true });
};
const togglePasswordVisibility = (num: number) => {
    if (num === 1) showPassword1.value = !showPassword1.value;
    if (num === 2) showPassword2.value = !showPassword2.value;

    if (autoHideTimer) {
        clearTimeout(autoHideTimer);
    }
    switch (num ?? 0) {
        case 1:
            if (showPassword1.value) {
                autoHideTimer = setTimeout(() => {
                    showPassword1.value = false;
                }, AUTO_HIDE_DELAY);
            }
            break;
        case 2:
            if (showPassword2.value) {
                autoHideTimer = setTimeout(() => {
                    showPassword2.value = false;
                }, AUTO_HIDE_DELAY);
            }
            break;
    }
};

const isSubmit = ref(false);
const errors = ref({ pass1: false, pass2: false, errMsg1: '', errMsg2: '' });
const password1 = ref('');
const password2 = ref('');

const showPassword1 = ref(false);
const showPassword2 = ref(false);

const token = usePage().props.token ?? '';
const email = usePage().props.email ?? '';

// Admindev123.
const submitReset = async () => {
    errors.value.pass1 = false;
    errors.value.pass2 = false;
    errors.value.errMsg1 = '';
    errors.value.errMsg2 = '';

    const result = validateStrongPassword(password1.value.trim());
    if (!result.valid) {
        errors.value.pass1 = true;
        errors.value.errMsg1 = result.message ?? '';
        return;
    }

    if (password1.value.trim() != password2.value.trim()) {
        errors.value.pass2 = true;
        errors.value.errMsg2 = 'Pastikan password konfirmasi yang anda isikan sesuai!';
        return;
    }

    try {
        isSubmit.value = true;
        const payload = { password: password1.value.trim(), password_confirmation: password2.value.trim(), token: token, email: email };
        const response = await axiosJS.post(passwordResetuser.url(), payload, { encrypt: true });
        const { status, message } = response.data ?? {};
        const isSuccess = status === true || status === 1 || status === '1' || status === 'true';

        if (isSuccess) {
            push.success({
                title: 'Success',
                message: message ?? 'Perubahan password berhasil.',
            });

            setTimeout(() => {
                router.visit(login.url(), { replace: true });
            }, 1500);
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
    }
};
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
                        <h2 class="text-crusoe-600 mb-1 text-3xl font-bold text-shadow-lg">Reset Password</h2>
                    </div>
                    <p class="text-gray-700">Silakan isi password baru Anda.</p>
                    <small class="text-muted font-light italic"
                        >Pastikan password terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, serta simbol untuk
                        meningkatkan keamanan akun Anda.</small
                    >
                    <hr class="my-5 border-t-gray-200" />

                    <form
                        class="mt-2"
                        method="POST"
                        autocomplete="off"
                        novalidate
                        @submit.prevent="submitReset"
                        @paste.prevent="blockAction"
                        @copy.prevent="blockAction"
                        @cut.prevent="blockAction"
                        @drop.prevent="blockAction"
                    >
                        <div class="mb-2">
                            <label class="mb-1 block text-sm font-medium text-gray-700">Password Baru</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="uil-asterisk text-gray-400"></i>
                                </div>
                                <input
                                    ref="passwordRef"
                                    v-model="password1"
                                    :type="showPassword1 ? 'text' : 'password'"
                                    placeholder="Password"
                                    :class="['input-login pr-10 transition duration-200', { 'border-red-500': errors.pass1 }]"
                                    @keydown.enter.prevent=""
                                />
                                <button
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex cursor-pointer items-center pe-3 text-gray-400 transition-colors duration-200 hover:text-gray-500"
                                    :aria-label="showPassword1 ? 'Hide password' : 'Show password'"
                                    @click="togglePasswordVisibility(1)"
                                >
                                    <i :class="showPassword1 ? 'bi-eye-slash' : 'bi-eye'"></i>
                                </button>
                            </div>
                            <Transition name="slide-down" mode="out-in">
                                <div v-if="errors.pass1" key="password-error" class="">
                                    <p class="mt-0.5 text-sm text-red-600">{{ errors.errMsg1 ?? '* Isian password tidak boleh kosong.' }}</p>
                                </div>
                            </Transition>
                        </div>
                        <div class="mb-2">
                            <label class="mb-1 block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="uil-asterisk text-gray-400"></i>
                                </div>
                                <input
                                    ref="passwordRef"
                                    v-model="password2"
                                    :type="showPassword2 ? 'text' : 'password'"
                                    placeholder="Password Konfirmasi"
                                    :class="['input-login pr-10 transition duration-200', { 'border-red-500': errors.pass2 }]"
                                    @keydown.enter.prevent=""
                                />
                                <button
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex cursor-pointer items-center pe-3 text-gray-400 transition-colors duration-200 hover:text-gray-500"
                                    :aria-label="showPassword1 ? 'Hide password' : 'Show password'"
                                    @click="togglePasswordVisibility(2)"
                                >
                                    <i :class="showPassword1 ? 'bi-eye-slash' : 'bi-eye'"></i>
                                </button>
                            </div>
                            <Transition name="slide-down" mode="out-in">
                                <div v-if="errors.pass2" key="password-error" class="">
                                    <!-- <p class="mt-0.5 text-sm text-red-600">{{ errors.errMsg2 ?? '* Isian password tidak boleh kosong.' }}</p> -->
                                    <p class="mt-0.5 text-sm text-red-600">
                                        {{ errors.errMsg2 ?? '* Isian password tidak boleh kosong.' }}
                                    </p>
                                </div>
                            </Transition>
                        </div>

                        <div class="flex flex-row flex-wrap items-center justify-between">
                            <Button
                                size="lg"
                                variant="outline"
                                class="mt-6 flex h-12 w-full font-light sm:w-auto"
                                :disabled="isSubmit"
                                @click="gotoLogin()"
                            >
                                <ArrowBigLeftDash />
                                Batal
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                class="from-crusoe-500 to-crusoe-600 hover:from-crusoe-600 hover:to-crusoe-500 focus:from-crusoe-600 focus:outline-crusoe-300 mt-6 flex h-12 w-full bg-linear-to-r text-white transition-colors duration-300 hover:text-white sm:w-auto"
                                :disabled="isSubmit"
                            >
                                <div v-if="isSubmit" class="flex items-center justify-center gap-3">
                                    <Spinner class="animate-spin" />
                                    Silahkan tunggu
                                </div>

                                <div v-else>Reset Password</div>
                            </Button>
                        </div>
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
