<script setup lang='ts'>
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];
const variants = ['solid', 'soft', 'outline'];

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
    <div class="flex flex-col w-full">
        <div v-for="color in colors" :key="color" class="grid grid-cols-6 gap-4">
            <UButton v-for="variant in variants" :key="color" :color="color" :variant="variant">{{ color }} - {{ variant }}</UButton>
            <UBadge v-for="variant in variants" :key="color" :color="color" :variant="variant">{{ color }} - {{ variant }}</UBadge>
        </div>
    </div>
</template>