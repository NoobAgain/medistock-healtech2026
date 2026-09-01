import { ref } from "vue";
import { opsiNotalokasi } from "@/routes";
import axiosJS from '@lib/libAxios';
import { isResponseSuccess } from "./libUtils";

export const _opsiAlokasi = ref<any[]>([]);
export const loadOpsiAlokasi = async () => {
    try {
        const response = await axiosJS.get(opsiNotalokasi.url());
        const { status, data } = response.data ?? {};
        const isSuccess = isResponseSuccess(status);
        if (isSuccess && Array.isArray(data) && data.length > 0) {
            _opsiAlokasi.value = data
                .filter((item: any) => item && item.id != null && item.nama)
                .map((item: any) => ({
                    id: item.id,
                    label: item.nama || item.label,
                }));
        } else {
            _opsiAlokasi.value = [];
        }
    } catch (error) {
        console.error('Error loading opsi ukuran:', error);
        _opsiAlokasi.value = [];
    }
};
