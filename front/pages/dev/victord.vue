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
        <HeaderPepeat />
        <div class="flex flex-col px-24">
            <div class="flex w-full justify-center">
                <UCarousel
                v-slot="{ item: categorie }"
                arrows
                :items="categories"
                :next="{ variant: 'ghost' }"
                :prev="{ variant: 'ghost' }"
                prev-icon="i-material-symbols-light:arrow-back-ios-new"
                next-icon="i-material-symbols-light:arrow-forward-ios"
                :ui="{ item: 'basis-1/10' }"
                class="max-w mx-auto">
                    <NuxtImg :src="categorie" width="320" height="320" class="rounded-sm" />
                </UCarousel>
            </div>
            <div class="flex flex-col w-full">
                <h2 class="font-semibold text-2xl py-2">Offres prés de chez vous</h2>
            </div>
            <div class="flex w-full justify-center">
                <UCarousel
                v-slot="{ item: restaurant }"
                arrows
                :next="{ variant: 'ghost' }"
                :prev="{ variant: 'ghost' }"
                prev-icon="i-material-symbols-light:arrow-back-ios-new"
                next-icon="i-material-symbols-light:arrow-forward-ios"
                :items="restaurants"
                :ui="{ item: 'basis-1/3', prev: '', next: '' }" class="mx-auto">
                    <div class="px-2 py-1">
                        <UCard :ui="{body: 'p-0 sm:p-2'}" class="drop-shadow-sm rounded-sm">
                            <NuxtImg :src="restaurant" fit="cover" width="500" height="325" class="rounded-sm" />
                            <template #footer>
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
                            </template>
                        </UCard>
                    </div>
                </UCarousel>
            </div>
            <div class="flex flex-col w-full">
                <h2 class="font-semibold text-2xl py-2">Les plus populaires</h2>
            </div>
            <div class="flex w-full justify-center">
                <div class="px-2 py-1">
                    <UCard
                    v-slot="{ item: restaurant }"
                    :items="restaurants"

                    :ui="{body: 'p-0 sm:p-2'}"
                    class="drop-shadow-sm rounded-sm">
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
        </div>
        <FooterPepeat />
    </div>
</template>