<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { useColorMode, useMediaQuery } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Button } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { Separator } from '@components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { SidebarTrigger } from '@components/ui/sidebar';

import { useLayoutStore } from '@store/layoutStore';
import Breadcrumb from './ui/breadcrumb/Breadcrumb.vue';
import BreadcrumbEllipsis from './ui/breadcrumb/BreadcrumbEllipsis.vue';
import BreadcrumbItem from './ui/breadcrumb/BreadcrumbItem.vue';
import BreadcrumbLink from './ui/breadcrumb/BreadcrumbLink.vue';
import BreadcrumbList from './ui/breadcrumb/BreadcrumbList.vue';
import BreadcrumbPage from './ui/breadcrumb/BreadcrumbPage.vue';
import BreadcrumbSeparator from './ui/breadcrumb/BreadcrumbSeparator.vue';

const mode = useColorMode();
const layout = useLayoutStore();
const ITEMS_TO_DISPLAY = 3;
const open = ref(false);
const isDesktop = useMediaQuery('(min-width: 768px)');

const middleItems = computed(() => {
    if (layout.breadcrumb.length <= ITEMS_TO_DISPLAY) {
        return [];
    }

    return layout.breadcrumb.slice(1, -2);
});

const visibleTailItems = computed(() => {
    if (layout.breadcrumb.length <= ITEMS_TO_DISPLAY) {
        return layout.breadcrumb.slice(1);
    }

    return layout.breadcrumb.slice(-ITEMS_TO_DISPLAY + 1);
});

const isSingleBreadcrumb = computed(() => layout.breadcrumb.length === 1);

const toggleThemes = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
    <header
        class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    >
        <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb v-if="layout.breadcrumb.length" class="min-w-0 flex-1 overflow-hidden">
                <BreadcrumbList class="min-w-0 flex-nowrap overflow-hidden">
                    <BreadcrumbItem class="min-w-0 shrink overflow-hidden">
                        <BreadcrumbLink
                            v-if="layout.breadcrumb[0]?.href"
                            :class="isSingleBreadcrumb ? '' : 'max-w-12 truncate sm:max-w-20 md:max-w-none'"
                        >
                            <Link :href="layout.breadcrumb[0].href" :class="isSingleBreadcrumb ? 'block' : 'block truncate'">
                                {{ layout.breadcrumb[0].label }}
                            </Link>
                        </BreadcrumbLink>
                        <BreadcrumbPage v-else :class="isSingleBreadcrumb ? '' : 'max-w-12 truncate sm:max-w-20 md:max-w-none'">
                            {{ layout.breadcrumb[0]?.label }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator v-if="layout.breadcrumb.length > 1" />

                    <template v-if="layout.breadcrumb.length > ITEMS_TO_DISPLAY">
                        <BreadcrumbItem>
                            <template v-if="isDesktop">
                                <DropdownMenu v-model:open="open">
                                    <DropdownMenuTrigger class="flex items-center gap-1" aria-label="Toggle menu">
                                        <BreadcrumbEllipsis class="size-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem v-for="(item, index) in middleItems" :key="`${item.label}-${index}`">
                                            <Link :href="item.href || '#'">
                                                {{ item.label }}
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </template>
                            <template v-else>
                                <Sheet v-model:open="open">
                                    <SheetTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis class="h-4 w-4" />
                                    </SheetTrigger>
                                    <SheetContent side="bottom">
                                        <SheetHeader class="text-left">
                                            <SheetTitle>Proses Distribusi Obat & Alkes Ke</SheetTitle>
                                            <SheetDescription>Pilih halaman yang ingin Anda tuju.</SheetDescription>
                                        </SheetHeader>
                                        <div class="grid gap-1 px-4">
                                            <Link
                                                v-for="(item, index) in middleItems"
                                                :key="`${item.label}-mobile-${index}`"
                                                :href="item.href || '#'"
                                                class="py-1 text-sm"
                                            >
                                                {{ item.label }}
                                            </Link>
                                        </div>
                                        <SheetFooter class="pt-4">
                                            <SheetClose as-child>
                                                <Button variant="outline"> Kembali </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </template>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </template>

                    <template v-for="(item, index) in visibleTailItems" :key="`${item.label}-tail-${index}`">
                        <BreadcrumbItem>
                            <template v-if="item.href">
                                <BreadcrumbLink class="max-w-12 truncate sm:max-w-20 md:max-w-none">
                                    <Link :href="item.href" class="block truncate">
                                        {{ item.label }}
                                    </Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator v-if="index < visibleTailItems.length - 1" />
                            </template>
                            <BreadcrumbPage v-else class="max-w-20 truncate md:max-w-none">
                                {{ item.label }}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </template>
                </BreadcrumbList>
            </Breadcrumb>
            <div class="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" class="text-muted transition duration-300 dark:text-white" @click="toggleThemes">
                    <div v-if="mode === 'light'">
                        <Moon />
                    </div>
                    <div v-else>
                        <Sun />
                    </div>
                </Button>
            </div>
        </div>
    </header>
</template>
