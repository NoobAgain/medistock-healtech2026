// resources/js/lib/libCrypto.ts
import axios from 'axios';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';

let publicKeyPem: string | null = null;
let fetchPromise: Promise<string> | null = null;
const EXPECTED_KEY_HASH = 'cUwiI7/q1BVD0gtKJW+vIeXRs/lv4HOchDVjHA4lqrg=';

/**
 * Init RSA public key (ambil sekali)
 */
export async function initCrypto() {
    if (publicKeyPem) return publicKeyPem;
    if (!fetchPromise) {
        fetchPromise = axios.get('/guardrail/pubkey').then(({ data }) => {
            if (!data.key || typeof data.key !== 'string' || !data.key.includes('BEGIN PUBLIC KEY')) {
                throw new Error('Invalid public key received from server');
            }

            // Verifikasi hash
            const keyHash = CryptoJS.SHA256(data.key).toString(CryptoJS.enc.Base64);
            if (keyHash !== EXPECTED_KEY_HASH) {
                throw new Error('Public key fingerprint mismatch!');
            }

            publicKeyPem = data.key;
            return publicKeyPem as string;
        });
    }

    return fetchPromise;
}

/**
 * Generate AES-256 key
 */
function generateAesKey() {
    return CryptoJS.lib.WordArray.random(32); // 256-bit
}

/**
 * Encrypt payload with AES (CBC)
 */
function encryptPayload(data: unknown) {
    const aesKey = generateAesKey();
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), aesKey, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return {
        payload: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
        iv: CryptoJS.enc.Base64.stringify(iv),
        aesKey,
    };
}

/**
 * Encrypt AES key using RSA public key
 */
function encryptAesKey(aesKey: CryptoJS.lib.WordArray, publicKeyPem: string) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const aesKeyBase64 = CryptoJS.enc.Base64.stringify(aesKey);

    return forge.util.encode64(publicKey.encrypt(aesKeyBase64, 'RSA-OAEP'));
}

/**
 * Public API: hybrid encryption
 */
export function setSecurePayload(data: unknown) {
    if (!publicKeyPem) {
        throw new Error('Crypto not initialized. Call initCrypto() first.');
    }

    const encrypted = encryptPayload(data);
    const encryptedKey = encryptAesKey(encrypted.aesKey, publicKeyPem);

    return {
        payload: encrypted.payload,
        iv: encrypted.iv,
        key: encryptedKey,
    };
}
