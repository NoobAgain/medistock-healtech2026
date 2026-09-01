import { useColorMode } from '@vueuse/core';
import { CircleCheck, Package, Truck, UserCheck } from 'lucide-vue-next';
import moment from 'moment';
import 'moment/locale/id';
import { computed } from 'vue';
import z from 'zod';
import axiosJS from '@lib/libAxios';
import type { RowPengiriman } from './libDataPengiriman';
moment.locale('id');

const englishToIndonesianMonth: Record<string, string> = {
    January: 'Januari',
    February: 'Februari',
    March: 'Maret',
    April: 'April',
    May: 'Mei',
    June: 'Juni',
    July: 'Juli',
    August: 'Agustus',
    September: 'September',
    October: 'Oktober',
    November: 'November',
    December: 'Desember',
};

const normalizeIndonesianMonth = (value: string): string => {
    return value.replace(
        /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
        (month) => englishToIndonesianMonth[month] ?? month,
    );
};

export const getDataBE = async (path: string): Promise<string> => {
    try {
        const response = await axiosJS.get(path);
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);

        if (isSuccess && data) {
            return data;
        }

        return '';
    } catch (error) {
        console.error(error);
        return '';
    }
};


export const useCurrentTheme = () => {
    const mode = useColorMode();

    return computed(() => {
        return mode.value === 'dark';
    });
};


export function formatDate(date: string, useClock: boolean = true): string {
    try {
        const parsedDate = moment(
            date,
            [
                moment.ISO_8601,
                'YYYY-MM-DD HH:mm:ss',
                'YYYY-MM-DD',
                'DD-MM-YYYY',
                'DD/MM/YYYY',
            ],
            true,
        );

        if (!parsedDate.isValid()) {
            return '';
        }

        const formatted = useClock
            ? parsedDate.locale('id').format('DD MMMM YYYY HH:mm')
            : parsedDate.locale('id').format('DD MMMM YYYY');

        return normalizeIndonesianMonth(formatted);
    } catch (error) {
        console.error(error);
        return '';
    }
}

/**
 * Format tanggal ringkas untuk kebutuhan UI operasional.
 * Contoh: "08 Jun 2026, 10:45"
 */
export function formatDateShort(date: string): string {
    try {
        const parsedDate = moment(
            date,
            [
                moment.ISO_8601,
                'YYYY-MM-DD HH:mm:ss',
                'YYYY-MM-DD',
                'DD-MM-YYYY',
                'DD/MM/YYYY',
            ],
            true,
        );

        if (!parsedDate.isValid()) {
            return '';
        }

        // "DD MMM YYYY, HH:mm" sesuai kebutuhan user (bulan singkat).
        return parsedDate.locale('id').format('DD MMM YYYY, HH:mm');
    } catch (error) {
        console.error(error);
        return '';
    }
}

export function validateStrongPassword(password: string): {
    valid: boolean
    message: string
} {
    if (password.length < 8) {
        return { valid: false, message: "Password minimal 8 karakter" }
    }

    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password harus mengandung minimal 1 huruf besar" }
    }

    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password harus mengandung minimal 1 huruf kecil" }
    }

    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Password harus mengandung minimal 1 angka" }
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return { valid: false, message: "Password harus mengandung minimal 1 karakter spesial" }
    }

    return { valid: true, message: "Password kuat" }
}

export function emailValidation(email: string): string | null {
    if (!email) {
        return 'Email wajib diisi'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'Format email tidak valid'
    }

    return null
}


export const requiredSelectSchema = ({ min, msg, isOptional }: { min?: number; msg?: string; isOptional?: boolean } = {}) =>
    z.preprocess(
        (value) => {
            if (value === null || value === undefined) {
                return '';
            }
            return String(value);
        },
        isOptional
            ? z.string().optional()
            : z.string().min(min ?? 1, msg ?? 'Isian harus diisi'),
    );

export const isResponseSuccess = (status: unknown): boolean => {
    return status === true || status === 1 || status === '1' || status === 'true';
};

export const findItemBySelectedId = <T extends { id: string | number }>(
    items: T[],
    selectedValue: string | number | null | undefined,
): T | undefined => {
    if (selectedValue === null || selectedValue === undefined || selectedValue === '') {
        return undefined;
    }

    return items.find((item) => String(item.id) === String(selectedValue));
};


export const toProperCase = (value: string) => {
    return value
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}

export const toTextValue = (value: unknown): string => {
    return typeof value === 'string' ? value : '';
};


export const isJson = (value: string): boolean => {
    try {
        const parsed = JSON.parse(value)
        return typeof parsed === 'object' && parsed !== null
    } catch {
        return false
    }
}

/**
 * Masks a string at random positions
 * Example: maskStringRandomly("6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b309001")
 * Output: "6a4****afa94e697f5f6e***310*aea54cc99a**1c01b309001"
 */
export function maskStringRandomly(
    input: string,
    maskPercentage: number = 30,
    maskChar: string = '*'
): string {
    const chars = input.split('');
    const maskCount = Math.ceil((input.length * maskPercentage) / 100);
    const indices = new Set<number>();

    // Generate random unique indices to mask
    while (indices.size < maskCount) {
        indices.add(Math.floor(Math.random() * input.length));
    }

    // Apply mask at random positions
    const result = chars.map((char, index) => {
        return indices.has(index) ? maskChar : char;
    });

    return result.join('');
}

/**
 * Masks a string with consecutive mask characters at random positions
 * Example: maskStringRandomlyConsecutive("6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b309001", 2, 3)
 * Output: "6a4****afa94e697f5f6e***310*aea54cc99a**1c01b309001"
 */
export function maskStringRandomlyConsecutive(
    input: string,
    minMaskLength: number = 1,
    maxMaskLength: number = 3,
    maskChar: string = '*'
): string {
    const chars = input.split('');
    const maskRanges: Array<[number, number]> = [];
    let currentIndex = 0;
    const maskedIndices = new Set<number>();

    // Generate random mask ranges
    while (currentIndex < input.length) {
        // Random chance to apply mask (e.g., 40% chance per iteration)
        if (Math.random() < 0.4) {
            const maskLength = Math.floor(
                Math.random() * (maxMaskLength - minMaskLength + 1) + minMaskLength
            );
            const start = currentIndex;
            const end = Math.min(currentIndex + maskLength, input.length);

            maskRanges.push([start, end]);

            for (let i = start; i < end; i++) {
                maskedIndices.add(i);
            }

            currentIndex = end;
        } else {
            currentIndex++;
        }
    }

    // Apply mask
    const result = chars.map((char, index) => {
        return maskedIndices.has(index) ? maskChar : char;
    });

    return result.join('');
}

/**
 * Masks a string with custom mask ratio per segment
 * Divides string into segments and masks specific percentage of each
 * Example: maskStringBySegment("6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b309001", 10, 30)
 */
export function maskStringBySegment(
    input: string,
    segmentSize: number = 10,
    maskPercentage: number = 30,
    maskChar: string = '*'
): string {
    const chars = input.split('');
    const maskedIndices = new Set<number>();

    // Process each segment
    for (let i = 0; i < input.length; i += segmentSize) {
        const segmentEnd = Math.min(i + segmentSize, input.length);
        const segmentLength = segmentEnd - i;
        const maskCount = Math.ceil((segmentLength * maskPercentage) / 100);

        // Generate random indices within segment
        const segmentIndices = new Set<number>();
        while (segmentIndices.size < maskCount) {
            segmentIndices.add(i + Math.floor(Math.random() * segmentLength));
        }

        segmentIndices.forEach(idx => maskedIndices.add(idx));
    }

    // Apply mask
    const result = chars.map((char, index) => {
        return maskedIndices.has(index) ? maskChar : char;
    });

    return result.join('');
}

/**
 * Masks a string with alternating pattern of visible and masked characters
 * Example: maskStringAlternating("6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b309001", 2, 3)
 * Shows 2 chars, hides 3 chars, repeat
 */
export function maskStringAlternating(
    input: string,
    visibleChars: number = 2,
    maskChars: number = 3,
    maskChar: string = '*'
): string {
    const chars = input.split('');
    let charCount = 0;
    let showMode = true;

    const result = chars.map(() => {
        if (showMode) {
            if (charCount >= visibleChars) {
                charCount = 0;
                showMode = false;
            } else {
                charCount++;
                return chars[chars.indexOf(input[input.length - 1])]; // Keep original
            }
        }

        if (!showMode) {
            if (charCount >= maskChars) {
                charCount = 0;
                showMode = true;
            } else {
                charCount++;
                return maskChar;
            }
        }
    });

    // Rebuild with proper alternation
    let result2 = '';
    let visibleCount = 0;
    let maskedCount = 0;

    for (let i = 0; i < input.length; i++) {
        if (visibleCount < visibleChars) {
            result2 += input[i];
            visibleCount++;
        } else if (maskedCount < maskChars) {
            result2 += maskChar;
            maskedCount++;
        } else {
            visibleCount = 0;
            maskedCount = 0;
            result2 += input[i];
            visibleCount++;
        }
    }

    return result2;
}

/**
 * Masks a string with random clusters (groups of masked characters)
 * Example: maskStringWithClusters("6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b309001", 3, 4)
 * Creates 3 clusters of 4 masked characters each
 */
export function maskStringWithClusters(
    input: string,
    clusterCount: number = 3,
    clusterSize: number = 4,
    maskChar: string = '*'
): string {
    const chars = input.split('');
    const maskedIndices = new Set<number>();
    const maxPosition = input.length - clusterSize;

    // Generate random cluster positions
    for (let i = 0; i < clusterCount; i++) {
        const startPos = Math.floor(Math.random() * (maxPosition + 1));

        // Add all positions in cluster
        for (let j = startPos; j < startPos + clusterSize && j < input.length; j++) {
            maskedIndices.add(j);
        }
    }

    // Apply mask
    const result = chars.map((char, index) => {
        return maskedIndices.has(index) ? maskChar : char;
    });

    return result.join('');
}

/**
 * Advanced: Masks string with custom configuration
 * Provides fine-grained control over masking pattern
 */
export interface MaskConfig {
    maskPercentage?: number;
    maskChar?: string;
    minClusterSize?: number;
    maxClusterSize?: number;
    clusterCount?: number;
    seed?: number; // For reproducible results
}

export function maskStringAdvanced(
    input: string,
    config: MaskConfig = {}
): string {
    const {
        maskPercentage = 30,
        maskChar = '*',
        minClusterSize = 1,
        maxClusterSize = 4,
        clusterCount = undefined,
        seed = Math.random(),
    } = config;

    const chars = input.split('');
    const maskedIndices = new Set<number>();

    const calculateClusters = clusterCount || Math.ceil(input.length / 20);

    for (let i = 0; i < calculateClusters; i++) {
        const clusterSize = Math.floor(
            Math.random() * (maxClusterSize - minClusterSize + 1) + minClusterSize
        );
        const maxStart = Math.max(0, input.length - clusterSize);
        const startPos = Math.floor(Math.random() * (maxStart + 1));

        for (let j = startPos; j < startPos + clusterSize && j < input.length; j++) {
            maskedIndices.add(j);
        }
    }

    const result = chars.map((char, index) => {
        return maskedIndices.has(index) ? maskChar : char;
    });

    return result.join('');
}



export type PengirimanCommandItem = {
    id: number;
    uid: string;
    nan: string;
    label: string;
};

export type MonitoringEventItem = {
    uid: string;
    status: number;
    statusLabel: string;
    petugas?: string;
    unit_rawat?: string;
    lokasi: string;
    createdAt: string;
};
export type MonitoringDetailRow = RowPengiriman & {
    eventHistory?: MonitoringEventItem[];
};

export const statusSteps = [
    {
        step: 1,
        title: 'Initialized / Ready',
        description: 'Item dan box telah diregistrasi serta agregasi selesai',
        icon: Package,
        color: 'gray',
    },
    {
        step: 2,
        title: 'In Transit',
        description: 'Sedang dalam proses pengiriman melalui simpul gudang atau transit',
        icon: Truck,
        color: 'blue',
    },
    {
        step: 3,
        title: 'Arrived / Verified',
        description: 'Barang telah tiba di unit_rawat dan diverifikasi melalui proses rekonsiliasi',
        icon: CircleCheck,
        color: 'amber',
    },
    {
        step: 4,
        title: 'Delivered PoD',
        description: 'Barang telah diterima nakes dan Proof of Delivery tercatat',
        icon: UserCheck,
        color: 'green',
    },
] as const;


export function getTenagaMedisDetail() {
    // getTenagaMedisDetail
}
