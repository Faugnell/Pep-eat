<script setup lang="ts">
import RestaurantRowTile from '~/components/articles/RestaurantRowTile.vue'
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


const data = await $fetch<fetchedDataType>(`/api/restaurants/`);



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
        <div class="flex flex-col w-11/12 md:w-8/10">
            <div v-if="data.data.length === 0">
                <h1 class="text-2xl w-full text-center">Aucun resultat</h1>
                <USeparator class="py-5"/>
                <p class="text-md text-center">Accéder à notre large catalogue de restaurant en <NuxtLink class="text-primary-500" to="/restaurants">cliquant ici ! <UIcon name="i-ic:round-launch" size="10"/></NuxtLink></p>
            </div>
            <template v-for="(restaurant, index) in data.data">
                <USeparator v-if="index !== 0" />
                <NuxtLink :to="`/restaurants/${restaurant._id}`">
                    <RestaurantRowTile
                    :imageUrl="restaurant.image ? restaurant.image : './restaurants/thumbnails/.default-thumbnail.jpg'"
                    :Name="restaurant.nom"
                    :Description="restaurant.description"
                    :TypeCuisine="restaurant.type_cuisine"
                    :Adresse="restaurant.adresse"
                    :Horaire="restaurant.horaires"
                    />
                </NuxtLink>
            </template>
        </div>
    </div>
    <div v-else>

    </div>
</template>