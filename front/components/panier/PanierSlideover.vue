<script setup lang='ts'>
const emit = defineEmits<{ close: [boolean] }>();
import { usePanierStore } from '#imports';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
    getArticles,
    getNumberOfArticles,
    getTotalPrice
} = usePanierStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const articles = computed(() => getArticles());
const numberOfArticles = computed(() => getNumberOfArticles());
const totalPriceFormatted = computed(() => {
    const total = getTotalPrice();

    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(total);
});

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
    <USlideover :close="{ onClick: () => emit('close', false) }">
        <template #header>
            <h2 class="text-2xl">Mon panier</h2>
        </template>
        <template #body>
            <div v-for="article in articles">
                <p>{{ article.name }}</p>
                <p>{{ article.price }}</p>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-col w-full items-end">
                <div class="flex justify-between items-center gap-3">
                    <p class="text-lg">Total : {{ totalPriceFormatted }}</p>
                    <p class="text-lg">Nombre d'articles : {{ numberOfArticles }}</p>
                </div>
                <UButton label="Finaliser ma commande" color="neutral" trailing-icon="i-lucide-arrow-right"/>
            </div>
        </template>
    </USlideover>
</template>