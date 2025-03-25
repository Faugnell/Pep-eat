<script setup>
import HeaderPepeat from "~/components/common/HeaderPepeat";
import FooterPepeat from "~/components/common/FooterPepeat";
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

const connected = ref(true);
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
                    <NuxtImg src="/icons/white.png" width="250" />
                    <h2>La pépite du fast-food healthy !</h2>
                </div>
            </div>
        </div>
    </div>

    <!--* ===========================================================================================     *-->
    <!--* ==================================        CONNECTED       =================================     *-->
    <!--* ===========================================================================================     *-->

    <div v-else class="flex flex-col px-24">
        <!--* ===== Categorie ===== *-->
        <div class="flex w-full justify-center">
            <UCarousel
            v-slot="{ item: categorie }"
            :items="categories"

            arrows
            :next="{ variant: 'ghost' }"
            :prev="{ variant: 'ghost' }"
            prev-icon="i-material-symbols-light:arrow-back-ios-new"
            next-icon="i-material-symbols-light:arrow-forward-ios"

            :ui="{ item: 'md:basis-1/10 basis-1/3' }"
            class="max-w mx-auto">
                <NuxtImg :src="categorie" width="320" height="320" class="rounded-sm" />
            </UCarousel>
        </div>
        <!--* ===== Offres ===== *-->
        <div class="flex flex-col w-full">
            <h2 class="font-semibold text-2xl py-2">Offres prés de chez vous</h2>
        </div>
        <div class="flex w-full justify-center">
            <UCarousel
            v-slot="{ item: restaurant }"
            :items="restaurants"

            arrows :next="{ variant: 'ghost' }"
            :prev="{ variant: 'ghost' }"
            prev-icon="i-material-symbols-light:arrow-back-ios-new"
            next-icon="i-material-symbols-light:arrow-forward-ios"
            
            :ui="{ item: 'md:basis-1/3' }"
            class="max-w mx-auto">
                <UCard
                :ui="{ body: 'p-2 sm:p-2 w-full grow' }"
                class="mx-2 my-1 drop-shadow-sm rounded-sm flex-col justify-center">
                <div class="flex justify-center">
                    <NuxtImg :src="restaurant" fit="cover" sizes="100px md:500px" class="rounded-sm grow" />
                </div>
                    <template #footer>
                        <div class="flex">
                            <h3>Miam miam</h3>
                            <div class="flex ml-auto">
                                <div class="flex flex-col justify-center">
                                    <h3>4.1</h3>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <UIcon name="i-material-symbols-light:star" size="25" />
                                </div>
                            </div>
                        </div>
                    </template>
                </UCard>
            </UCarousel>
        </div>
        <div class="flex flex-col w-full">
            <h2 class="font-semibold text-2xl py-2">Les plus populaires</h2>
        </div>
        <div class="flex w-full justify-center">
            <div class="flex flex-wrap px-2 py-1">
                <UCard
                v-for="restaurant in restaurants"
                :ui="{ body: 'p-0 sm:p-2' }"
                class="drop-shadow-sm rounded-sm basis-1 md:basis-1/3">
                    <NuxtImg :src="restaurant" fit="cover" width="500" height="325" class="rounded-sm" />
                    <div class="flex w-full">
                        <h3>Miam miam</h3>
                        <div class="flex ml-auto">
                            <div class="flex flex-col justify-center">
                                <h3>4.1</h3>
                            </div>
                            <div class="flex flex-col justify-center">
                                <UIcon name="i-material-symbols-light:star" size="25" />
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
        <FooterPepeat/>
    </div>
</template>


<style scoped>
.bg-fixed-background {
    background-image: url('bg-homepage.png');
}
</style>