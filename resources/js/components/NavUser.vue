<!-- eslint-disable import/order -->
<script setup lang="ts">
import { IconDotsVertical, IconLogout } from '@tabler/icons-vue';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

const props = defineProps<{
    user: User | null;
}>();

const { isMobile } = useSidebar();

import axiosJS from '@lib/libAxios';
import { logout } from '@/routes';
import { router } from '@inertiajs/vue3';
import { push } from 'notivue';
import type { User } from '@/types';
import { usePermissionStore } from '@/store/permissionStore';
import defaultAvatar from '@images/avatar.webp';

const auth = usePermissionStore();
const logoutUser = async () => {
    try {
        const response = await axiosJS.post(logout.url(), '', { encrypt: true });
        const { status, redirect } = response.data ?? {};
        const isSuccess = status === true || status === 1 || status === '1' || status === 'true';

        if (isSuccess && redirect) {
            auth.logout();
            router.visit(redirect, { replace: true });
        } else {
            push.error({
                title: 'Gagal',
                message: 'Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi!',
            });
        }
    } catch (error) {
        console.error(error);
        push.error({
            title: 'Gagal',
            message: 'Terjadi kesalahan jaringan. Silahkan periksa koneksi internet Anda dan coba lagi!',
        });
    }
};
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="group/user data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar class="h-8 w-8 rounded-lg grayscale transition-all duration-300 group-hover/user:grayscale-0">
                            <AvatarImage :src="props.user?.avatar || defaultAvatar" :alt="props.user?.name" />
                            <AvatarFallback class="rounded-lg">
                                {{ props.user?.name?.charAt(0) }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">{{ props.user?.name }}</span>
                            <span class="text-muted-foreground truncate text-xs">
                                {{ props.user?.email }}
                            </span>
                            <span class="text-muted-foreground truncate text-xs"> Faskes - UnitRawat </span>
                        </div>
                        <IconDotsVertical class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    :side-offset="4"
                    align="end"
                >
                    <DropdownMenuLabel class="p-0 font-normal">
                        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage :src="props.user?.avatar || defaultAvatar" :alt="props.user?.name" />
                                <AvatarFallback class="rounded-lg"> {{ props.user?.name?.charAt(0) }} </AvatarFallback>
                            </Avatar>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-medium">{{ props.user?.name }}</span>
                                <span class="text-muted-foreground truncate text-xs">
                                    {{ props.user?.email }}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <!-- <DropdownMenuSeparator /> -->
                    <!-- <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <IconUserCircle />
                            Account
                        </DropdownMenuItem>
                    </DropdownMenuGroup> -->
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="logoutUser">
                        <IconLogout />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
