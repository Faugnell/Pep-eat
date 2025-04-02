<script setup>
import HeaderPepeat from "~/components/common/HeaderPepeat";
import FooterPepeat from "~/components/common/FooterPepeat";
import RestaurantTile from "~/components/articles/RestaurantTile.vue";
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const categories = [
    '/icons/cat/American.png',
    '/icons/cat/Asian.png',
    '/icons/cat/BBQ.png',
    '/icons/cat/Burgers.png',
    '/icons/cat/BubbleTea.png',
    '/icons/cat/Chinese.png',
    '/icons/cat/Hawaiian.png',
    '/icons/cat/IceCream.png',
    '/icons/cat/Grocery_v2.png',
    '/icons/cat/FastFood.png',
    '/icons/cat/Halal.png',
    '/icons/cat/Japanese.png',
    '/icons/cat/Sandwich.png',
    '/icons/cat/Pizza.png',
]

const restaurants = [
    'https://picsum.photos/500/300?random=1',
    'https://picsum.photos/500/300?random=2',
    'https://picsum.photos/500/300?random=3',
    'https://picsum.photos/500/300?random=4',
    'https://picsum.photos/500/300?random=5',
    'https://picsum.photos/500/300?random=6',
]

const connected = ref(false);
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
    <!--* ===========================================================================================     *-->
    <!--* ==================================     NOT CONNECTED     ==================================     *-->
    <!--* ===========================================================================================     *-->
    <HeaderPepeat />
    <div v-if="connected === false" class="flex flex-col min-h-screen">
        <div class="bg-fixed-background flex-1 w-full bg-cover bg-center">
            <div class="absolute bottom-30 left-20">
                <div class="text-white">
                    <NuxtImg src="/icons/white.png" width="400" />
                    <h2 class="mt-4 text-6xl">La pépite du fast-food healthy !</h2>
                </div>
            </div>
        </div>
    </div>

    <!--* ===========================================================================================     *-->
    <!--* ==================================        CONNECTED       =================================     *-->
    <!--* ===========================================================================================     *-->

    <div v-else class="flex flex-col px-8">
        <!--* ===== Categorie ===== *-->
        <div class="flex w-full justify-center">
            <UCarousel v-slot="{ item: categorie }" :items="categories" arrows :next="{ variant: 'ghost' }"
                :prev="{ variant: 'ghost' }" prev-icon="i-material-symbols-light:arrow-back-ios-new"
                next-icon="i-material-symbols-light:arrow-forward-ios"
                :ui="{ item: 'lg:basis-1/10 md:basis-1/6 basis-1/3' }" class="max-w-9/10 mx-auto">
                <NuxtImg :src="categorie" width="320" height="320" class="rounded-sm" />
            </UCarousel>
        </div>
        <!--* ===== Populaires ===== *-->
        <div class="flex flex-col w-full">
            <h2 class="font-semibold text-2xl py-2">Les plus populaires 😋</h2>
        </div>
        <div class="flex w-full justify-center">
            <UCarousel v-slot="{ item: restaurant }" :items="restaurants" arrows :next="{ variant: 'ghost' }"
                :prev="{ variant: 'ghost' }" prev-icon="i-material-symbols-light:arrow-back-ios-new"
                next-icon="i-material-symbols-light:arrow-forward-ios" :ui="{ item: 'basis-auto md:basis-1/3' }"
                class="max-w-9/10 mx-auto">
                <RestaurantTile restaurant-name="Miam miam" :image-url="restaurant" rating="4.5" />
            </UCarousel>
        </div>
        <!--* ===== Proche ===== *-->
        <div class="flex flex-col w-full">
            <h2 class="font-semibold text-2xl py-2">Proches de chez vous 🚀​</h2>
        </div>
        <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-2 py-1">
            <RestaurantTile v-for="restaurant in restaurants" restaurant-name="Miam miam" :image-url="restaurant" rating="4.5" />
        </div>
        <FooterPepeat />
    </div>
</template>


<style scoped>
.bg-fixed-background {
    background-image: url('./bg-homepage.png');
}
</style>