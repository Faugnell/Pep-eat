<script setup lang="ts">

import HeaderPepeat from "~/components/common/HeaderPepeat.vue";

definePageMeta({
    layout: false,
});
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <HeaderPepeat />
    <div class="flex flex-col min-h-screen">
        <div class="homepageBackgroundImage flex-1 w-full bg-cover bg-center">
            <div class="flex flex-col w-full">
                <div class="pl-8 pt-8 md:pl-14 md:pt-14 lg:pl-20 lg:pt-20 flex justify-start">
                    <div class="text-white">
                        <NuxtImg src="/icons/white.png" class="w-[200px] md:w-[300px] lg:w-[400px]" />
                        <h2 class="mt-4 text-4xl lg:text-6xl">La pépite du fast-food healthy !</h2>
                    </div>
                </div>
                <div class="flex w-full justify-end pt-25 lg:pt-2 pr-5 lg:pr-20">
                    <UButton
                    to="/restaurants"
                    trailingIcon="i-ic:round-launch"
                    :ui="{
                        base: 'px-3 py-2 text-lg lg:text-2xl gap-2'
                    }">Notre catalogue de restaurants</UButton>
                </div>  
            </div>
        </div>
    </div>
</template>