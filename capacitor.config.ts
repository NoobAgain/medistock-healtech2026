import type { CapacitorConfig } from '@capacitor/cli';

const serverUrl = process.env.CAP_SERVER_URL ?? 'https://192.168.5.25';
const parsedServerUrl = new URL(serverUrl);
const serverHost = parsedServerUrl.hostname;

const config: CapacitorConfig = {
    appId: 'com.syderbit.medistock',
    appName: 'MediStock',
    webDir: 'public',
    server: {
        url: serverUrl,
        cleartext: parsedServerUrl.protocol === 'http:',
        allowNavigation: [serverHost]
    }
};

export default config;
