<script setup lang='ts'>
const {
    restaurantId,
    imageUrl,
    restaurantName,
    rating,
} = defineProps({
    restaurantId: {
        type: String,
        required: true
    },
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
    <NuxtLink :to="`/restaurant/${restaurantId}`">
        <UCard :ui="{ body: 'p-2 sm:p-2 w-full grow' }" class="mx-2 my-1 drop-shadow-sm rounded-sm flex-col justify-center">
            <div class="flex justify-center">
                <NuxtImg :src="imageUrl" fit="contain" class="rounded-sm grow h-[125px] md:h-[250px] lg:h-[300px]" />
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
    </NuxtLink>
</template>

<style scoped></style>
