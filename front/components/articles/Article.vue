<script setup>
import { usePanierStore } from '~/stores/panierStore';

const {
    id,
    nom,
    description,
    prix,
    nutriscore,
    image
} = defineProps({
    id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    prix: {
        type: String,
        required: true
    },
    nutriscore: {
        type: String,
        required: false
    },
    image: {
        type: String,
        default: "./articles/.default_plate.jpg"
    }    
});

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
    addArticle,
    isArticleInPanier
} = usePanierStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const prixFormat = computed(() => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(prix);
});

const computedBadgeClass = computed(() => {
  switch (nutriscore) {
    case 'A':
      return 'bg-green-500 text-white'
    case 'B':
      return 'bg-lime-400 text-black'
    case 'C':
      return 'bg-yellow-400 text-black'
    case 'D':
      return 'bg-orange-400 text-white'
    case 'E':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-200 text-black'
  }
});

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
function addToPanier() {
    addArticle({
        id: id,
        name: nom,
        price: prix,
        quantity: 1
    });
}

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <div class="w-[375px] flex flex-row bg-white rounded-sm shadow-md aspect-6/2 px-7 py-4 gap-5 relative">
        <div class="flex flex-col w-full h-full">
            <div class="flex flex-col gap-1 h-3/4">
                <div class="flex flex-row gap-2 items-center h-fit">
                    <p class="text-2xl font-bold leading-none h-fit">{{ nom }}</p>
                    <UBadge v-if="nutriscore" :label="nutriscore" class="font-bold rounded-full" :class="computedBadgeClass"/>
                </div>
                <p class="text-lg leading-none h-fit text-balance overflow-hidden text-ellipsis">{{ description }}</p>
            </div>
            <div class="h-fit">
                <p class="text-xl font-thin">{{ prixFormat }}</p>
            </div>
        </div>
        <NuxtImg :src="image" alt="Article Image" class="rounded-sm aspect-square w-[50px] md:w-[75px] lg:w-[100px]"/>
        <UButton
            :icon="
                !isArticleInPanier(id) ?
                'material-symbols:add-2-rounded' :
                'material-symbols:check-rounded'
            "
            class="absolute bottom-2 right-2 shadow-sm"
            size="xl"
            color="neutral"
            :variant="
                !isArticleInPanier(id) ?
                'outline' :
                'solid'
            "
            @click="addToPanier()"
            :disabled="isArticleInPanier(id)"
            :ui="{
                base: 'disabled:opacity-100 disabled:border disabled:border-white'
            }"
        />
    </div>
</template>