<script setup lang='ts'>
import HeaderPepeat from '~/components/common/HeaderPepeat.vue';
import Restaurants from '~/components/restaurateurs/restaurants.vue';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const {
    data : listeRestaurants,
    status,
    error
} = await useAsyncData(
    'liste-restaurants',
    () =>
        $fetch(`http://localhost:3101/restaurants/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            retry: 3,
            retryDelay: 1000,
        }).then((response) => {
            if (response.ok) {
                return response.data;
            } else {
                throw new Error('Error while fetching restaurants');
            }
        })
);

const selectedRestaurant = ref(null);

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
async function a() {
    console.log(await $fetch(`http://localhost:3101/restaurants/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            retry: 3,
            retryDelay: 1000,
        }).then((response) => {
            if (response.ok) {
                return response.data;
            } else {
                throw new Error('Error while fetching restaurants');
            }
        }));
}

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
    <HeaderPepeat/>
    <UButton @click="a">Fetch restaurants</UButton>
    <div class="flex flex-col p-4 w-full gap-4">
        <p class="text-black text-4xl font-bold">Gérer mes restaurants</p>

        <div class="flex flex-row gap-4">
            <div class="flex flex-col gap-4 w-full">
                <div v-for="restaurant in listeRestaurants" :key="restaurant.nom">
                    <Restaurants :id="restaurant._id" :nom="restaurant.nom" :adresse="restaurant.adresse" @click="selectedRestaurant = restaurant"/>
                </div>
            </div>
            <div v-if="selectedRestaurant" class="w-3/5">
                <UCard>
                    <template #header>
                        <div class="flex flex-row justify-between">
                            <p class="font-bold text-2xl">{{ selectedRestaurant.nom }}</p>
                            <UButton color="neutral" variant="ghost"  icon="i-fluent-emoji-high-contrast-cross-mark" @click="selectedRestaurant = null"/>
                        </div>
                    </template>

                    <div class="grid grid-cols-2 gap-4">
                        <UForm class="flex flex-col gap-2 items-center">
                            <UFormField label="Nom" class="w-full">
                                <UInput v-model="selectedRestaurant.nom" type="text" class="w-full"/>
                            </UFormField>
                            <UFormField label="Adresse" class="w-full">
                                <UInput v-model="selectedRestaurant.adresse" type="text" class="w-full"/>
                            </UFormField>
                            <UFormField label="SIRET" class="w-full">
                                <UInput v-model="selectedRestaurant.siret" type="text" class="w-full"/>
                            </UFormField>
                            <UButton color="primary">Enregistrer</UButton>
                        </UForm>
                        <div class="flex flex-col gap-4 items-center">
                            <NuxtImg :src="`/restaurants/thumbnails/${selectedRestaurant._id}.png`" fit="cover" class="aspect-square rounded-md"/>
                            <UButton color="neutral" variant="outline" icon="i-heroicons-camera">Modifier l'image</UButton>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>