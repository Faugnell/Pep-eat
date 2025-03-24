<script setup lang='ts'>
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const items = [
  '/icon/cat/American.png',
  '/icon/cat/Asian.png',
  '/icon/cat/BBQ.png',
  '/icon/cat/Burgers.png',
  '/icon/cat/BubbleTea.png',
  '/icon/cat/Chinese.png',
  '/icon/cat/Hawaiian.png',
  '/icon/cat/IceCream.png',
  '/icon/cat/Grocery_v2.png',
  '/icon/cat/FastFood.png',
  '/icon/cat/Halal.png',
  '/icon/cat/Japanese.png',
  '/icon/cat/Sandwich.png',
  '/icon/cat/Pizza.png',
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
    <div class="flex flex-col">
        <div class="flex w-full justify-center px-24">
            <UCarousel v-slot="{ item }" arrows :items="items" :ui="{ item: 'basis-1/10' }" class="max-w mx-auto">
                 <NuxtImg :src="item    " width="320" height="320" class="rounded-lg" />
            </UCarousel>
        </div> 
        <div class="flex flex-col w-full">
            <div class="flex w-full">
                <h2 class="font-semibold">Offres prés de chez vous</h2>
            </div>
            <!-- <div class="flex w-full">
                <UCarousel v-slot="{ item }" arrows :items="items" :ui="{ item: 'basis-1/3' }" class="max-w mx-auto">
                    <NuxtImg :src="item    " width="320" height="320" class="rounded-lg" />
                </UCarousel>
            </div> -->
        </div>
        <div>
            <UCarousel v-slot="{ item }" arrows :items="items" :ui="{ item: 'basis-1/3' }" class="max-w mx-auto p-10">
                <div class="p-1">
                    <UCard>
                        <NuxtImg :src="item " width="320" height="320" class="rounded-lg" />
                        <template #footer>
                            <div>
                                <h3>Miam miam</h3>
                            </div>
                            <div>
                                <UIcon name="i-material-symbols-light-star" class="size-5" /> 
                                <h3 icon="i-material-symbols-light:star">Miam miam</h3>
                            </div>
                        </template>
                    </UCard>
                </div>
            </UCarousel>
           
        </div>
    </div>
</template>