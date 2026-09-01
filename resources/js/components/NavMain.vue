<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';
import { ChevronRight } from 'lucide-vue-next';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@components/ui/sidebar';

defineProps<{
    items: {
        id?: number;
        title: string;
        url: string;
        icon?: LucideIcon | undefined;
        isActive?: boolean;
        isEnable?: boolean;
        isDivider?: boolean | undefined;
        items?: {
            title: string;
            url: string;
            isActive?: boolean;
            isEnable?: boolean;
        }[];
    }[];
}>();
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel>Proses Distribusi Obat & Alkes</SidebarGroupLabel>
        <SidebarMenu>
            <template v-for="item in items" :key="item.title">
                <div v-if="item.isEnable">
                    <div v-if="item.isDivider">
                        <hr class="border-dashed" />
                    </div>
                    <div v-else>
                        <Collapsible v-if="item.items?.length" as-child :default-open="true" class="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger as-child>
                                    <SidebarMenuButton :tooltip="item.title">
                                        <component :is="item.icon" v-if="item.icon" />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight
                                            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent
                                    class="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all"
                                >
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                            <div v-if="subItem.isEnable">
                                                <SidebarMenuSubButton
                                                    as-child
                                                    :tooltip="subItem.title"
                                                    :class="[
                                                        'min-w-8 transition duration-300',
                                                        {
                                                            'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground':
                                                                subItem.isActive,
                                                        },
                                                    ]"
                                                >
                                                    <Link :href="subItem.url">
                                                        <span>{{ subItem.title }}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </div>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                        <SidebarMenuItem v-else>
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
                                    <span>{{ item.title }}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </div>
                </div>
            </template>
        </SidebarMenu>
    </SidebarGroup>
</template>
