<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { Notivue, Notification, NotificationProgress, NotivueSwipe, pastelTheme, push } from 'notivue';

import { onMounted, ref } from 'vue';
import { loginAuth, loginLostpassword } from '@/routes';
import { Button } from '@components/ui/button';
import { Spinner } from '@components/ui/spinner';
import bgLogin from '@images/bg_login.webp';
import logo from '@images/Logo.svg';
import axiosJS from '@lib/libAxios';

const appInfo = (usePage().props.appInfo ?? {}) as any;
const title = `Login | ${appInfo.appshortname} ${appInfo.appver}`;

const AUTO_HIDE_DELAY = 1000;
let autoHideTimer: ReturnType<typeof setTimeout> | null = null;
const showPassword = ref(false);
const theme = {
    ...pastelTheme,
    '--nv-z': '9999',
    '--nv-shadow': '0px 0rem 2.5rem 10px rgba(0, 0, 0, 0.15)',
} as const;

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    if (autoHideTimer) {
        clearTimeout(autoHideTimer);
    }
    if (showPassword.value) {
        autoHideTimer = setTimeout(() => {
            showPassword.value = false;
        }, AUTO_HIDE_DELAY);
    }
};

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

onMounted(() => {
    document.body.style.overflow = 'hidden';
    const el = document.querySelector('.page-transition');
    if (el) {
        el.addEventListener('animationend', () => {
            document.body.style.overflow = 'auto';
        });
    }

    focusUsername();
});

const username = ref('');
const password = ref('');
const remember = ref(false);
const isSubmit = ref(false);

const usernameRef = ref<HTMLInputElement | null>(null);
const passwordRef = ref<HTMLInputElement | null>(null);
const rememberRef = ref<HTMLInputElement | null>(null);
const btnSubmit = ref<HTMLInputElement | null>(null);

const focusUsername = (): void => {
    usernameRef.value?.focus();
};

const focusPasswordInput = (): void => {
    passwordRef.value?.focus();
};

const focusRememberInput = (): void => {
    rememberRef.value?.focus();
};

const focusButtonSubmit = (): void => {
    btnSubmit.value?.focus();
};

const errors = ref({
    username: false,
    password: false,
});

const submitLogin = async () => {
    errors.value.username = !username.value.trim();
    errors.value.password = !password.value.trim();
    if (errors.value.username || errors.value.password) return;
    const active = document.activeElement;
    if (active === rememberRef.value || active === passwordRef.value) {
        return;
    }
    isSubmit.value = true;
    try {
        const payload = {
            username: username.value.trim(),
            password: password.value.trim(),
            remember: remember.value,
        };
        const response = await axiosJS.post(loginAuth.url(), payload, { encrypt: true });
        const { status, message, redirect } = response.data ?? {};
        const isSuccess = status === true || status === 1 || status === '1' || status === 'true';

        if (isSuccess && redirect) {
            router.visit(redirect, { replace: true });
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

    <!-- Gradient Overlay -->
    <!-- <div class="absolute inset-0 rounded-xl bg-linear-to-t from-crusoe-700 via-crusoe-500/30 to-transparent"></div> -->

    <div class="page-transition bg-hero-logo from-crusoe-50 flex min-h-screen grow flex-col bg-linear-25 to-gray-300">
        <section class="z-10 flex flex-1 items-center justify-center px-4">
            <div class="group flex w-full max-w-4xl rounded-xl bg-gray-100 p-4 shadow transition duration-300 hover:shadow-xl">
                <div class="w-full md:w-1/2 md:pr-6">
                    <div class="mx-auto mb-2 flex items-center gap-3">
                        <img class="size-9 shrink-0" alt="Logo" :src="logo" />
                        <h2 class="text-crusoe-600 mb-1 text-center text-3xl font-bold text-shadow-lg">Selamat Datang</h2>
                    </div>
                    <p class="text-center text-gray-700">Sistem Informasi Manajemen Distribusi Obat & Alkes Rumah Sakit</p>
                    <p class="text-center font-semibold text-gray-700">Tepat Ukuran, Tepat Guna dan Tepat UnitRawat</p>
                    <hr class="my-5 border-t-gray-200" />
                    <p class="mt-2 text-sm font-light text-gray-500">Isikan user password anda untuk dapat masuk ke dalam aplikasi. Terimakasih</p>

                    <form
                        class="mt-2"
                        method="POST"
                        autocomplete="off"
                        @paste.prevent="blockAction"
                        @copy.prevent="blockAction"
                        @cut.prevent="blockAction"
                        @drop.prevent="blockAction"
                        @submit.prevent="submitLogin"
                    >
                        <div class="mb-6">
                            <label for="username" class="mb-1 block text-sm font-medium text-gray-700">Username</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="uil-user text-gray-400"></i>
                                </div>
                                <input
                                    ref="usernameRef"
                                    v-model="username"
                                    type="text"
                                    placeholder="Username"
                                    autocomplete="off"
                                    :class="['input-login transition duration-200', { 'border-red-500': errors.username }]"
                                    @keyup.enter.prevent="focusPasswordInput"
                                />
                            </div>
                            <Transition name="slide-down" mode="out-in">
                                <div v-if="errors.username" key="username-error" class="absolute">
                                    <p class="mt-0.5 text-sm text-red-600">* Isian username tidak boleh kosong.</p>
                                </div>
                            </Transition>
                        </div>

                        <div class="mb-6">
                            <div class="flex items-center justify-between">
                                <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
                                <Link
                                    :href="loginLostpassword.url()"
                                    class="hover:text-verdigris focus:text-verdigris text-sm font-light text-gray-700 transition duration-300"
                                >
                                    Lupa Password?
                                </Link>
                            </div>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="uil-asterisk text-gray-400"></i>
                                </div>
                                <input
                                    id="password"
                                    ref="passwordRef"
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Password"
                                    :class="['input-login pr-10 transition duration-200', { 'border-red-500': errors.password }]"
                                    @keyup.enter.prevent="focusRememberInput"
                                />
                                <button
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex cursor-pointer items-center pe-3 text-gray-400 transition-colors duration-200 hover:text-gray-500"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    @click="togglePasswordVisibility"
                                >
                                    <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                                </button>
                            </div>
                            <Transition name="slide-down" mode="out-in">
                                <div v-if="errors.password" key="password-error" class="absolute">
                                    <p class="mt-0.5 text-sm text-red-600">* Isian password tidak boleh kosong.</p>
                                </div>
                            </Transition>
                        </div>

                        <div class="flex items-center gap-2">
                            <input
                                id="remember"
                                ref="rememberRef"
                                v-model="remember"
                                type="checkbox"
                                name="remember"
                                class="text-verdigris focus:outline-verdigris h-4 w-4 cursor-pointer rounded border-gray-300"
                                @keyup.enter.prevent="focusButtonSubmit"
                            />
                            <label
                                for="remember"
                                class="hover:text-verdigris focus:text-verdigris cursor-pointer text-sm text-gray-700 transition duration-300"
                            >
                                Remember Me
                            </label>
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

                            <div v-else>Masuk</div>
                        </Button>
                    </form>
                </div>

                <div
                    class="drop-shadow-crusoe-500/5 group-hover:drop-shadow-crusoe-500/50 relative ml-4 hidden w-1/2 drop-shadow-lg transition duration-300 md:block"
                >
                    <img
                        :src="bgLogin"
                        class="h-full w-full rounded-e-xl mask-radial-[100%_100%] mask-radial-from-35% mask-radial-at-right object-cover"
                        alt="page img"
                    />
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
