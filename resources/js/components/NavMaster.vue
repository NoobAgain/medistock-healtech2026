<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@components/ui/sidebar';

defineProps<{
    projects: {
        name?: string;
        url?: string;
        icon?: LucideIcon;
        isActive?: boolean;
        isDivider?: boolean;
        isEnable?: boolean;
    }[];
}>();
</script>

<template>
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel v-if="projects.filter((item) => item.isEnable).length > 1">Data Pendukung</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in projects" :key="item.name">
                <div v-if="item.isEnable">
                    <div v-if="item.isDivider">
                        <hr class="border-dashed" />
                    </div>

                    <div v-else>
                        <SidebarMenuButton
                            as-child
                            :class="[
                                'min-w-8 transition duration-300',
                                { 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item.isActive },
                            ]"
                        >
                            <Link :href="item.url">
                                <component :is="item.icon" />
                                <span>{{ item.name }}</span>
                            </Link>
                        </SidebarMenuButton>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
