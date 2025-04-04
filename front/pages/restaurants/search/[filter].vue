<script setup lang="ts">
import type { Restaurant } from '~/utils/types/Restaurant'

const route = useRoute()

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */

type fetchedDataType = {
    "code": number,
    "ok": boolean,
    "message": string,
    "data": Array<Restaurant>
}

const { data } = await useFetch<fetchedDataType>(`http://localhost:3101/restaurants/filter/${route.params.filter}`, { method: "GET" })


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
    <div v-if="data?.ok" class="flex justify-center min-h-screen pt-5">
        <div class="flex flex-col w-8/10">
            <template v-for="(restaurant, index) in data.data">
                <USeparator v-if="index !== 0" />
                <NuxtLink :to="`/restaurants/${restaurant._id}`">
                    <div
                        class="group flex justify-between p-2.5 hover:bg-gray-500/10 transition-all hover:cursor-pointer active:bg-gray-500/5 rounded-lg">
                        <div class="flex w-full flex-col justify-center">
                            <div class="flex w-full justify-between">
                                <div class="flex justify-left">
                                    <div class="flex-col py-1 justify-center align-middle">
                                        <NuxtImg
                                        :src="restaurant.image ? restaurant.image : './restaurants/thumbnails/.default-thumbnail.jpg'"
                                        fit="inside"
                                        class="rounded-sm grow h-[125px] w-[200px] md:h-[250px] md:w-[400px] lg:h-[225px] lg:w-[300px]"/>
                                    </div>
                                    <div class="flex pl-3 flex-col">
                                        <p class="text-2xl">{{ restaurant.nom }}</p>
                                        <p class="text-md">{{ restaurant.description }}</p>
                                        <p class="text-lg">{{ `Cuisine ${restaurant.type_cuisine}` }}</p>
                                        <div class="flex justify-start items-center">
                                            <UIcon name="jam:gps-f" class="text-primary-500 mr-1"/>
                                            <p class="text-lg">{{ restaurant.adresse }}</p>
                                        </div>
                                        <div class="flex justify-start items-center">
                                            <UIcon name="material-symbols-light:nest-clock-farsight-analog-outline" class="text-primary-500 mr-1"/>
                                            <p class="text-lg">{{ restaurant.horaires }}</p>
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
                </NuxtLink>
            </template>
        </div>
    </div>
    <div v-else>

    </div>
</template>