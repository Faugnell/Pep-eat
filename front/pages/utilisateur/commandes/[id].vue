<script setup>
import HeaderPepeat from "~/components/common/HeaderPepeat";
import FooterPepeat from "~/components/common/FooterPepeat";
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */

const route = useRoute()
const {data} = await useFetch(`http://localhost:3102/commandes/${route.params.id}`, { method: "GET" })

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
    <HeaderPepeat />
    <div class="flex justify-center">
        <div v-if="data === null">
            <p>{{ route.params.id }}</p>
        </div>
        <div v-else class="w-1/4">
            <UCard>
                <template #header>
                    <h1 class="w-full text-lg text-center">{{ `Commande #${data.data._id}` }}</h1>
                </template>
                <h2 class="text-lg">Votre commande:</h2>
                <template #footer>
                    <p class="text-sm text-center">Merci d'avoir commander sur Pep'eat ❤️</p>
                </template>
            </UCard>
            <p>{{ JSON.stringify(data) }}</p>
        </div>
    </div>
    <FooterPepeat />
</template>


<style scoped>
.bg-fixed-background {
    background-image: url('bg-homepage.png');
}
</style>