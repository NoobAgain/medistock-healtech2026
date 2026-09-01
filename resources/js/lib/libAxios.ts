import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        encrypt?: boolean;
    }
}

import axios from 'axios';
import { initCrypto, setSecurePayload } from '@lib/libCrypto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const readCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
};

const instance = axios.create({
    // baseURL: '/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
    config.headers = config.headers ?? {};

    // const csrfMetaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // if (csrfMetaToken) {
    //     config.headers['X-CSRF-TOKEN'] = csrfMetaToken;
    // }

    // ENCRYPT BODY
    const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData;
    if (config.encrypt === true && config.data && !isFormData) {
        await initCrypto();

        try {
            const { key, iv, payload } = setSecurePayload(config.data);
            config.data = { payload };
            config.headers['X-ENC-KEY'] = key;
            config.headers['X-ENC-IV'] = iv;
        } catch (err) {
            return Promise.reject(new Error(`Encryption failed: ${(err as Error).message}`));
        }
    }

    return config;
});

export default instance;
