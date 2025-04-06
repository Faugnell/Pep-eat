<script setup lang='ts'>
import { usePanierStore } from '~/stores/panierStore';

const {
    id,
    name,
    price
} = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
    getArticleById,
    updateArticleQuantity
} = usePanierStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const article = computed(() => getArticleById(id));
const prixTotal = computed(() => price * article.value.quantity);
const prixTotalFormat = computed(() => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(prixTotal.value);
})

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
const updateQuantity = (quantity: number) => {
    updateArticleQuantity(id, quantity);
}

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <div class="grid grid-cols-[1fr_25%_15%] gap-4 items-center justify-between">
        <div class="flex flex-row gap-4 items-center">
            <NuxtImg src="https://placehold.co/50x50" width="50" height="50" class="rounded-sm"/>
            <div class="flex flex-col">
                <p class="font-bold text-xl truncate">{{ name }}</p>
                <p class="text-sm text-neutral-500">{{ price }} €</p>
            </div>
        </div>
        <div class="flex flex-row gap-2 items-center">
            <UButton icon="i-lucide-minus" color="neutral" variant="outline" class="rounded-fulL" size="sm" @click="updateQuantity(--article.quantity)"/>
            <p>{{ article.quantity }}</p>
            <UButton icon="i-lucide-plus" color="neutral" variant="outline" class="rounded-fulL" size="sm" @click="updateQuantity(++article.quantity)"/>
        </div>
        <p class="text-lg">{{ prixTotalFormat }}</p>
    </div>
</template>