<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
const appInfo = usePage().props.appInfo;
</script>

<template>
    <footer
        class="flex h-(--header-height) shrink-0 items-center gap-2 border-t transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    >
        <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <div class="flex-col items-center justify-center">
                <p class="hover:text-foreground mt-1.5 text-sm/2 text-gray-500 transition-colors">SCM BEKAL II</p>
                <p class="hover:text-foreground text-[12px] text-gray-500 transition-colors">TNI AD - Poltekad</p>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <p class="hover:text-foreground text-[12px] text-gray-500 transition-colors">{{ appInfo.app_copyright ?? '' }}</p>
            </div>
        </div>
    </footer>
</template>
