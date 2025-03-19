<script setup>
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
    <div>
        <h1 class="bg-red-500 w-full">Home</h1>
        <div class="flex flex-col w-1/4 gap-4">
            <div class="grid grid-cols-3 gap-4">
                <UButton>Primary</UButton>
                <UButton variant="soft">Primary soft</UButton>
                <UButton variant="outline">Primary outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="secondary">Secondary</UButton>
                <UButton color="secondary" variant="soft">Secondary soft</UButton>
                <UButton color="secondary" variant="outline">Secondary outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="tertiary">Tertiary</UButton>
                <UButton color="tertiary" variant="soft">Tertiary soft</UButton>
                <UButton color="tertiary" variant="outline">Tertiary outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="success">Success</UButton>
                <UButton color="success" variant="soft">Success soft</UButton>
                <UButton color="success" variant="outline">Success outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="warning">Warning</UButton>
                <UButton color="warning" variant="soft">Warning soft</UButton>
                <UButton color="warning" variant="outline">Warning outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="error">Error</UButton>
                <UButton color="error" variant="soft">Error soft</UButton>
                <UButton color="error" variant="outline">Error outline</UButton>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <UButton color="info">Info</UButton>
                <UButton color="info" variant="soft">Info soft</UButton>
                <UButton color="info" variant="outline">Info outline</UButton>
            </div>
        </div>
    </div>
</template>