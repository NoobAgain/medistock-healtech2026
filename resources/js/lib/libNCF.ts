import mitt from 'mitt';
import { ref } from "vue";

export interface NfcTag {
    uid: string;
    cardType: string;
    data: any;
    cleanRaw: string;
}

type Events = {
    onTagRead: NfcTag;
    onTagUnverified: NfcTag;
    onTagReady: boolean;
    onCloneDetected: { uid: string; cardType: string; data: any };
    onWriteSuccess: { uid: string; cardType: string; dataWritten: string; isEncrypted: boolean };
    onWriteFail: { reason: string; uid?: string; cardType?: string };
    onWriteWaiting: void;
    onVerifyFail: { reason: string };
    onDisconnected: void;
    onError: { title: string; message: string };
    onInfo: { title: string; message: string };
    onSuccess: { title: string; message: string };
    onWarning: { title: string; message: string };
};
export const NfcTagEvent = mitt<Events>();

// ─── State ────────────────────────────────────────────────────────────────────
const port = ref<any | null>(null);
const reader = ref<ReadableStreamDefaultReader<Uint8Array> | null>(null);
const writer = ref<WritableStreamDefaultWriter<Uint8Array> | null>(null);
export const nfcIsConnected = ref(false);
export const nfcIsWriting = ref(false);

let lineBuffer = '';

// ─── Connect & Disconnect ─────────────────────────────────────────────────────

export async function connectSerial(): Promise<void> {
    if (!('serial' in navigator)) {
        NfcTagEvent.emit('onError', {
            title: 'Tidak didukung',
            message: 'Browser tidak mendukung Web Serial API.',
        });
        return;
    }

    if (nfcIsConnected.value) return;

    try {
        port.value = await (navigator as any).serial.requestPort();

        if (port.value.readable || port.value.writable) {
            try { await port.value.close(); } catch (_) { }
        }

        await port.value.open({ baudRate: 115200 });

        reader.value = port.value.readable?.getReader() ?? null;
        writer.value = port.value.writable?.getWriter() ?? null;
        nfcIsConnected.value = true;

        readLoop();
    } catch (error) {
        console.error(error);
        NfcTagEvent.emit('onError', {
            title: 'Gagal',
            message: 'Tidak bisa membuka port serial.',
        });
        await disconnectSerial();
    }
}

export async function disconnectSerial(): Promise<void> {
    try {
        await reader.value?.cancel();
        writer.value?.releaseLock();
        await port.value?.close();
    } catch (error) {
        console.error(error);
    } finally {
        reader.value = null;
        writer.value = null;
        port.value = null;
        nfcIsConnected.value = false;
        nfcIsWriting.value = false;
        lineBuffer = '';
        NfcTagEvent.emit('onDisconnected');
    }
}

// ─── Read Loop ────────────────────────────────────────────────────────────────

async function readLoop(): Promise<void> {
    if (!reader.value) return;

    const decoder = new TextDecoder();

    try {
        while (true) {
            const { value, done } = await reader.value.read();
            if (done) break;
            if (!value) continue;

            lineBuffer += decoder.decode(value, { stream: true });

            const lines = lineBuffer.split('\n');
            lineBuffer = lines.pop() ?? '';

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed) handleResponse(trimmed);
            }
        }
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Read error:', error);
            NfcTagEvent.emit('onError', {
                title: 'Koneksi terputus',
                message: 'Serial port error.',
            });
            await disconnectSerial();
        }
    } finally {
        reader.value?.releaseLock();
    }
}

// ─── Parse & Handle Response ──────────────────────────────────────────────────

const WRITE_FAIL_REASONS: Record<string, string> = {
    EMPTY_PAYLOAD: 'Data tidak boleh kosong.',
    PAYLOAD_TOO_LONG: 'Data terlalu panjang untuk kartu ini.',
    INVALID_CHARS: 'Data mengandung karakter tidak valid.',
    TIMEOUT_NO_CARD: 'Timeout: tidak ada kartu yang ditempelkan.',
    HARDWARE_ERROR: 'Gagal menulis ke kartu (hardware error).',
    VERIFY_MISMATCH: 'Verifikasi gagal: data yang ditulis tidak sesuai.',
    AUTH_FAIL: 'Autentikasi kartu MIFARE gagal.',
    BLOCK_OVERFLOW: 'Data melebihi kapasitas blok kartu.',
    PAGE_OVERFLOW: 'Data melebihi kapasitas halaman kartu.',
    TOO_LARGE: 'Data terlalu besar setelah enkripsi.',
};

const VERIFY_FAIL_REASONS: Record<string, string> = {
    CANNOT_READ_SIGNATURE: 'Tidak bisa membaca signature kartu.',
    REACTIVATE_FAILED: 'Kartu tidak bisa di-reactivate.',
    FAKE_FUDAN_SIGNATURE: 'Kartu terdeteksi clone (Fudan) — bukan NXP asli.',
    INVALID_SIGNATURE: 'Kartu tidak genuine / bukan produk NXP asli.',
};

function handleResponse(line: string): void {
    console.debug('RX:', line);

    // Filter log spam dari ESP ROM bootloader
    if (/^(ESP-ROM|ets |rst:|configsip:|Loaded app|entry |I \()/.test(line)) {
        console.debug('ESP bootloader log (ignored):', line);
        return;
    }

    // Filter debug internal Arduino / SigVerification
    if (/^(SIG_DEBUG|SIG_RAW|SIG_FALLBACK|VERSION_DEBUG|\[DBG\])/.test(line)) {
        console.debug('Arduino debug:', line);
        return;
    }

    const parts = line.split('|');
    const status = parts[0];

    switch (status) {

        // ── Device ───────────────────────────────────────────────────────────
        case 'NFC_READY':
            NfcTagEvent.emit('onTagReady', true);
            NfcTagEvent.emit('onSuccess', {
                title: 'NFC Siap',
                message: 'Perangkat NFC siap digunakan.',
            });
            break;

        case 'PN532_NOT_FOUND':
            NfcTagEvent.emit('onError', {
                title: 'NFC Error',
                message: 'Modul PN532 tidak ditemukan.',
            });
            break;

        // ── Read ─────────────────────────────────────────────────────────────
        case 'READ': {
            // Format: READ|UID|CARD_TYPE|DATA
            const [, uid, cardType, data, cleanRaw] = parts;
            NfcTagEvent.emit('onTagRead', { uid, cardType, data, cleanRaw });
            break;

            // const [, uid, cardType, data] = parts;
            // NfcTagEvent.emit('onTagRead', { uid, cardType, data });
            // break;
        }

        case 'READ_UNVERIFIED': {
            // Format: READ_UNVERIFIED|UID|CARD_TYPE|DATA
            const [, uid, cardType, data, cleanRaw] = parts;
            NfcTagEvent.emit('onTagUnverified', { uid, cardType, data, cleanRaw });
            NfcTagEvent.emit('onWarning', {
                title: 'Kartu Tidak Terverifikasi',
                message: `Kartu ${cardType} (${uid}) gagal verifikasi NXP.`,
            });
            break;

            // const [, uid, cardType, data] = parts;
            // NfcTagEvent.emit('onTagUnverified', { uid, cardType, data });
            // NfcTagEvent.emit('onWarning', {
            //     title: 'Kartu Tidak Terverifikasi',
            //     message: `Kartu ${cardType} (${uid}) gagal verifikasi NXP.`,
            // });
            // break;
        }

        case 'READ_CLONE_DETECTED': {
            // Format: READ_CLONE_DETECTED|UID|CARD_TYPE
            const [, uid, cardType, data] = parts;
            NfcTagEvent.emit('onCloneDetected', { uid, cardType, data });
            NfcTagEvent.emit('onError', {
                title: 'Kartu Clone Terdeteksi',
                message: `Data pada ${cardType} (${uid}) tidak valid — kemungkinan hasil clone.`,
            });
            break;
        }

        // ── Verify ───────────────────────────────────────────────────────────
        case 'VERIFY_OK':
        case 'VERIFY_SKIP':
            // Tidak perlu notifikasi
            break;

        case 'VERIFY_FAIL': {
            // Format: VERIFY_FAIL|REASON
            const reason = parts[1] ?? 'UNKNOWN';
            NfcTagEvent.emit('onVerifyFail', { reason });
            NfcTagEvent.emit('onError', {
                title: 'Verifikasi Gagal',
                message: VERIFY_FAIL_REASONS[reason] ?? `Error: ${reason}`,
            });
            break;
        }

        // ── Write ─────────────────────────────────────────────────────────────
        case 'WRITE_WAITING':
            NfcTagEvent.emit('onWriteWaiting');
            NfcTagEvent.emit('onInfo', {
                title: 'Tempelkan Kartu',
                message: 'Tempelkan kartu ke perangkat NFC...',
            });
            break;

        case 'WRITE_VERIFYING':
            NfcTagEvent.emit('onInfo', {
                title: 'Memverifikasi...',
                message: 'Memeriksa keaslian kartu NXP.',
            });
            break;

        case 'WRITE_SUCCESS': {
            // Format: WRITE_SUCCESS|UID|CARD_TYPE
            const [, uid, cardType, dataWritten] = parts;

            // Strip prefix ENC: atau PLN: untuk ditampilkan
            const isEncrypted = dataWritten?.startsWith('ENC:');
            const rawData = dataWritten?.replace(/^(ENC:|PLN:)/, '');

            nfcIsWriting.value = false;
            NfcTagEvent.emit('onWriteSuccess', { uid, cardType, dataWritten: rawData, isEncrypted });
            NfcTagEvent.emit('onSuccess', {
                title: 'Berhasil',
                message: `Data berhasil ditulis ke kartu ${cardType} (${uid})`,
            });
            break;

            // const [, uid, cardType] = parts;
            // nfcIsWriting.value = false;
            // NfcTagEvent.emit('onWriteSuccess', { uid, cardType });
            // NfcTagEvent.emit('onSuccess', {
            //     title: 'Berhasil',
            //     message: `Data berhasil ditulis ke kartu ${cardType} (${uid})`,
            // });
            // break;
        }

        case 'WRITE_FAIL': {
            // Format: WRITE_FAIL|REASON atau WRITE_FAIL|REASON|UID|CARD_TYPE
            const [, reason, uid, cardType] = parts;

            nfcIsWriting.value = false;
            NfcTagEvent.emit('onWriteFail', { reason, uid, cardType });
            NfcTagEvent.emit('onError', {
                title: 'Gagal',
                message: `Gagal menulis: ${reason}`,
            });
            break;

            // console.log(parts);

            // const reason = parts[1] ?? 'UNKNOWN';
            // nfcIsWriting.value = false;
            // NfcTagEvent.emit('onWriteFail', { reason });
            // NfcTagEvent.emit('onError', {
            //     title: 'Gagal Menulis',
            //     message: WRITE_FAIL_REASONS[reason] ?? `Error: ${reason}`,
            // });
            // break;
        }

        // ── Misc ─────────────────────────────────────────────────────────────
        case 'UNKNOWN_CMD':
            console.warn('Perintah tidak dikenal:', parts[1]);
            break;

        default:
            console.warn('Response tidak dikenal:', line);
    }
}

// ─── Send Command ─────────────────────────────────────────────────────────────

async function sendCommand(cmd: string): Promise<void> {
    if (!writer.value) {
        NfcTagEvent.emit('onError', {
            title: 'Error',
            message: 'Tidak ada koneksi serial.',
        });
        return;
    }
    const encoder = new TextEncoder();
    await writer.value.write(encoder.encode(cmd + '\n'));
}

export async function writeTag(payload: string): Promise<void> {
    if (nfcIsWriting.value) return;
    nfcIsWriting.value = true;
    await sendCommand(`WRITE|0|${payload}`);
}
