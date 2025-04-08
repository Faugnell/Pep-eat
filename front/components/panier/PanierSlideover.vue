<script setup lang='ts'>
const emit = defineEmits<{ close: [boolean] }>();
import { usePanierStore } from '~/stores/panierStore';
import ArticlePanier from '~/components/articles/ArticlePanier.vue';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
    getArticles,
    getNombreArticles,
    getPrixTotal
} = usePanierStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const router = useRouter()

const articles = computed(() => getArticles());
const nombreArticles = computed(() => getNombreArticles());
const prixTotalFormat = computed(() => {
    const total = getPrixTotal();

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
            <div class="flex flex-col gap-5">
                <div v-for="article in articles">
                    <ArticlePanier :key="article.id" :id="article.id" :name="article.name" :price="article.price"
                        :quantity="article.quantity" />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-col w-full items-end">
                <div class="flex justify-between items-center gap-3">
                    <p class="text-lg">Total : {{ prixTotalFormat }}</p>
                    <p class="text-lg">Nombre d'articles : {{ nombreArticles }}</p>
                </div>
                <UButton label="Finaliser ma commande" color="neutral" trailing-icon="i-lucide-arrow-right"
                    @click="router.push('/commande')" />
            </div>
        </template>
    </USlideover>
</template>