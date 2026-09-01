import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ActiveMenuPage, BreadcrumbItem } from '@/types/globalType';

export const useLayoutStore = defineStore('layout', () => {
    const header = ref({
        title: '',
        subtitle: '',
    });

    const breadcrumb = ref<BreadcrumbItem[]>([]);
    const activeMenu = ref<ActiveMenuPage>({ id: 0 });

    function setHeader(data: Partial<typeof header.value>) {
        header.value = {
            ...header.value,
            ...data,
        };
    }

    function setBreadcrumb(items: BreadcrumbItem[]) {
        breadcrumb.value = items;
    }

    function clearBreadcrumb() {
        breadcrumb.value = [];
    }

    function setActiveMenuPage(idMenu: number) {
        activeMenu.value.id = idMenu;
    }

    return {
        header,
        breadcrumb,
        activeMenu,
        setHeader,
        setBreadcrumb,
        clearBreadcrumb,
        setActiveMenuPage,
    };
});
