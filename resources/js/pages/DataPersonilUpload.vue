<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ArrowBigLeft, Upload, Loader2, Info, Download } from 'lucide-vue-next';
import { push } from 'notivue';
import { ref, onMounted, computed } from 'vue';
import Alert from '@/components/ui/alert/Alert.vue';
import AlertDescription from '@/components/ui/alert/AlertDescription.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard, datapersonil } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';
import axiosJS from '@lib/libAxios';

interface TenagaMedisRow {
    nrp: string;
    nama: string;
    tglLahir: string;
    alamat: string;
    pangkat: string;
    unit_rawat: string;
    faskes: string;
    dislokasi: string;
    tglMasukUnitRawat: string;
    ukuranBaju: string;
}

interface FaskesOption {
    id: number | string;
    nama: string;
}

interface UnitRawatOption {
    id: number | string;
    nama: string;
}

const layout = useLayoutStore();
const isLoading = ref(false);
const selectedFile = ref<File | null>(null);
const previewData = ref<TenagaMedisRow[]>([]);
const showPreview = ref(false);
const fileInput = ref<HTMLInputElement>();
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface Props {
    faskes?: FaskesOption[] | null;
    unit_rawat?: UnitRawatOption[] | null;
}

const props = withDefaults(defineProps<Props>(), {
    faskes: null,
    unit_rawat: null,
});

const faskesMap = computed(() => {
    if (!props.faskes) return {};
    return Object.fromEntries(props.faskes.map((k) => [k.id, k.nama]));
});

const unit_rawatMap = computed(() => {
    if (!props.unit_rawat) return {};
    return Object.fromEntries(props.unit_rawat.map((s) => [s.id, s.nama]));
});

const hasFile = computed(() => selectedFile.value !== null);

const onGoBack = () => {
    router.visit(datapersonil.url());
};

const onDownloadTemplate = () => {
    window.location.href = '/download-template-tenaga_medis';
};

const onFileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
        previewData.value = [];
        showPreview.value = false;
    }
};

const parseCSV = (csv: string): TenagaMedisRow[] => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) {
        throw new Error('File CSV harus memiliki minimal 1 baris header dan 1 baris data');
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const data: TenagaMedisRow[] = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim());
        if (values.length !== headers.length) {
            throw new Error(`Baris ${i + 1} memiliki jumlah kolom yang tidak sesuai`);
        }

        const row: any = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });

        data.push({
            nrp: row.nrp || '',
            nama: row['Nama'] || row['nama'] || row['nama lengkap'] || row.nama || '',
            tglLahir: row['tgl lahir'] || row.tgllahir || '',
            alamat: row.alamat || '',
            pangkat: row.pangkat || '',
            unit_rawat: row.unit_rawat || '',
            faskes: row.faskes || '',
            dislokasi: row.dislokasi || '',
            tglMasukUnitRawat:
                row['Tgl. Masuk UnitRawat'] ||
                row['Tgl Masuk UnitRawat'] ||
                row['Tanggal Masuk UnitRawat'] ||
                row['Tgl Masuk'] ||
                row['TGL MASUK UNIT_RAWAT'] ||
                row['Tgl masuk unit_rawat'] ||
                row['Tgl_Masuk_UnitRawat'] ||
                row['tgl_masuk_unit_rawat'] ||
                row['tgl masuk unit_rawat'] ||
                row['Tgl masuk unit_rawat'] ||
                row.tglmasukunit_rawat ||
                '',
            ukuranBaju: (row['ukuran baju'] || row.ukuran_baju || row.ukuranbaju || '').toUpperCase(),
        });
    }

    return data;
};

const onPreview = async () => {
    if (!selectedFile.value) {
        push.warning({
            title: 'Peringatan',
            message: 'Silakan pilih file terlebih dahulu',
        });
        return;
    }

    try {
        const fileContent = await selectedFile.value.text();
        const data = parseCSV(fileContent);

        if (data.length === 0) {
            throw new Error('File tidak memiliki data yang valid');
        }

        previewData.value = data.slice(0, 10);
        showPreview.value = true;

        push.success({
            title: 'Berhasil',
            message: `Preview menampilkan ${Math.min(10, data.length)} dari ${data.length} baris data`,
        });
    } catch (error: any) {
        push.error({
            title: 'Error',
            message: error.message || 'Gagal membaca file',
        });
    }
};

const onUpload = async () => {
    if (!selectedFile.value) {
        push.warning({
            title: 'Peringatan',
            message: 'Silakan pilih file terlebih dahulu',
        });
        return;
    }

    if (isLoading.value) {
        return;
    }

    try {
        isLoading.value = true;
        const formData = new FormData();
        formData.append('file', selectedFile.value);

        const response = await axiosJS.post('/upload-tenaga_medis', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { status, message } = response.data ?? {};

        if (status) {
            push.success({
                title: 'Berhasil',
                message: message || 'Data tenaga_medis berhasil diunggah',
            });
            setTimeout(() => {
                router.visit(datapersonil.url());
            }, 1500);
        } else {
            push.error({
                title: 'Gagal',
                message: message || 'Gagal mengunggah data tenaga_medis',
            });
        }
    } catch (error: any) {
        console.error(error);
        push.error({
            title: 'Error',
            message: error.response?.data?.message || 'Terjadi kesalahan jaringan',
        });
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [
        { label: 'Data Nakes', href: datapersonil.url() },
        { label: 'Upload Data', href: '#' },
    ];
    layout.setBreadcrumb(breadcrumb);
    layout.$patch({ activeMenu: { id: 2.2 } });
});
</script>

<template>
    <PublicLayout title="Upload Data Nakes" page-title="Upload Data Nakes" page-sub-title="Unggah data nakes/tenaga_medis dari file CSV">
        <div class="space-y-6">
            <!-- Back Button -->
            <div class="flex justify-start gap-2">
                <Button variant="outline" size="sm" @click="onGoBack"> <ArrowBigLeft /> Kembali </Button>
                <Button variant="outline" size="sm" @click="onDownloadTemplate"> <Download /> Download Template </Button>
            </div>

            <!-- Format Info Alert -->
            <Alert class="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                <AlertDescription class="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Format file CSV:</strong> - NRP, Nama, Tgl Lahir, Alamat, Pangkat, UnitRawat, Faskes, Dislokasi, Tgl. Masuk UnitRawat, Ukuran
                    Baju
                    <br />
                    - Gunakan tombol "Download Template" di atas untuk melihat contoh data dan referensi ID yang valid.
                    <br />
                    - Format tanggal: 05/12/1990, 12/05/1990, 1990-05-12, 12 May 1990, dll.
                    <br />
                    - Silahkan hapus semua data referensi sebelum melakukan upload data.
                </AlertDescription>
            </Alert>

            <!-- File Input Section -->
            <div class="rounded-lg border-2 border-dashed border-gray-300 p-8 dark:border-gray-600">
                <div class="flex flex-col items-center justify-center gap-4">
                    <Upload class="h-12 w-12 text-gray-400" />
                    <div class="text-center">
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Pilih file CSV untuk diunggah</p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">atau seret file ke sini</p>
                    </div>
                    <input ref="fileInput" type="file" accept=".csv" class="hidden" @change="onFileSelected" />
                    <Button type="button" @click="($event) => fileInput?.click()"> Pilih File </Button>
                    <p v-if="selectedFile" class="text-sm text-gray-600 dark:text-gray-400">File terpilih: {{ selectedFile.name }}</p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-center gap-2">
                <Button :disabled="!hasFile || isLoading" @click="onPreview"> Preview </Button>
                <Button variant="default" :disabled="!hasFile || isLoading" @click="onUpload">
                    <Loader2 v-if="isLoading" class="animate-spin" />
                    {{ isLoading ? 'Mengunggah...' : 'Unggah Data' }}
                </Button>
            </div>

            <!-- Preview Table -->
            <div v-if="showPreview && previewData.length > 0" class="overflow-x-auto rounded-lg border">
                <table class="w-full text-sm">
                    <thead class="border-b bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-2 text-left">NRP</th>
                            <th class="px-4 py-2 text-left">Nama</th>
                            <th class="px-4 py-2 text-left">Pangkat</th>
                            <th class="px-4 py-2 text-left">UnitRawat</th>
                            <th class="px-4 py-2 text-left">Faskes</th>
                            <th class="px-4 py-2 text-left">Ukuran Baju</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, idx) in previewData" :key="idx" class="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td class="px-4 py-2">{{ row.nrp }}</td>
                            <td class="px-4 py-2">{{ row.nama }}</td>
                            <td class="px-4 py-2">{{ row.pangkat }}</td>
                            <td class="px-4 py-2">{{ row.unit_rawat }} ({{ unit_rawatMap[row.unit_rawat] || '?' }})</td>
                            <td class="px-4 py-2">{{ row.faskes }} ({{ faskesMap[row.faskes] || '?' }})</td>
                            <td class="px-4 py-2">{{ row.ukuranBaju }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </PublicLayout>
</template>
