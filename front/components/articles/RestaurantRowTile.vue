<script setup lang='ts'>

const {
    imageUrl,
    Name,
    Description,
    TypeCuisine,
    Adresse,
    Horaire
} = defineProps({
    Name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    TypeCuisine: {
        type: String,
        default: '',
    },
    Adresse: {
        type: String,
        required: true,
    },
    Horaire: {
        type: String,
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
    <div
        class="group flex justify-between p-2.5 hover:bg-gray-500/10 transition-all hover:cursor-pointer active:bg-gray-500/5 rounded-lg">
        <div class="flex w-full flex-col justify-center">
            <div class="flex w-full justify-between">
                <div class="flex justify-left">
                    <div class="flex-col py-1 justify-center align-middle">
                        <NuxtImg
                            :src="imageUrl"
                            fit="inside"
                            class="rounded-sm grow h-[125px] w-[200px] md:h-[175px] md:w-[225px] lg:h-[225px] lg:w-[300px]" />
                    </div>
                    <div class="flex pl-3 flex-col">
                        <p class="text-lg mdtext-2xl">{{ Name }}</p>
                        <p v-if="Description" class="hidden md:block text-md">{{ Description }}</p>
                        <p class="text-md md:text-lg">{{ `Cuisine ${TypeCuisine}` }}</p>
                        <div class="flex justify-start items-center">
                            <UIcon name="jam:gps-f" class="text-primary-500 mr-1" />
                            <p class="text-sm md:text-lg">{{ Adresse }}</p>
                        </div>
                        <div v-if="Horaire" class="flex justify-start items-center">
                            <UIcon name="material-symbols-light:nest-clock-farsight-analog-outline"
                                class="text-primary-500 mr-1" />
                            <p class="text-md md:text-lg">{{ Horaire }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-right">
                    <div class="flex flex-col justify-center">
                        <UIcon name="i-material-symbols-light:arrow-forward-ios"
                            class="text-primary-500 group-hover:text-primary-600" size="28" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
