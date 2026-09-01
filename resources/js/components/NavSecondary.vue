<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { Component } from 'vue';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@components/ui/sidebar';

interface NavItem {
    isActive: any;
    title: string;
    url: string;
    icon?: Component;
}

defineProps<{
    items: NavItem[];
}>();
</script>

<template>
    <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                    <!-- <SidebarMenuButton as-child> -->
                    <SidebarMenuButton
                        as-child
                        :tooltip="item.title"
                        :class="[
                            'min-w-8 transition duration-300',
                            { 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item.isActive },
                        ]"
                    >
                        <Link :href="item.url">
                            <component :is="item.icon" v-if="item.icon" />
                            {{ item.title }}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>
