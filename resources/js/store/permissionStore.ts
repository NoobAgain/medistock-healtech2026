import { defineStore } from 'pinia';
import { permission } from '@/routes';
import axiosJS from '@lib/libAxios';

export const usePermissionStore = defineStore('auth', {
    state: () => ({
        permissions: [] as string[],
        loaded: false
    }),

    getters: {
        can: (state) => {
            return (permission: string) =>
                state.permissions.includes(permission)
        },
    },

    actions: {
        async loadPermission(force: boolean = false) {
            if (force == false && this.loaded) return
            const response = await axiosJS.get(permission.url());
            this.permissions = response.data.permissions ?? []
            this.loaded = true
        },

        logout() {
            this.permissions = []
            this.loaded = false
        },
    },

    persist: true
})
