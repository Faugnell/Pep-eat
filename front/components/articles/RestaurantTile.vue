<script setup lang='ts'>
const {
    imageUrl,
    restaurantName,
    rating,
} = defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        default: '-',
    },
})

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
onMounted(async () => {
});
</script>

<template>
    <UCard :ui="{ body: 'p-2 sm:p-2 w-full grow' }" class="mx-2 my-1 drop-shadow-sm rounded-sm flex-col justify-center">
        <div class="flex justify-center">
            <NuxtImg :src="imageUrl" fit="cover" class="rounded-sm grow" />
        </div>
        <template #footer>
            <div class="flex">
                <p>{{restaurantName}}</p>
                <div class="flex ml-auto">
                    <div class="flex flex-col justify-center">
                        <p>{{rating}}</p>
                    </div>
                    <div class="flex flex-col justify-center">
                        <UIcon name="i-material-symbols-light:star" size="25" />
                    </div>
                </div>
            </div>
        </template>
    </UCard>
</template>

<style scoped></style>
