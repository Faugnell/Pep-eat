<script setup>
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
    <div class="flex justify-center min-h-screen pt-5">
        <div v-if="data === null">
            <p>{{ route.params.id }}</p>
        </div>
        <div v-else class="w-9/10 md:w-1/3 lg:w-1/4">
            <UCard>
                <template #header>
                    <h1 class="w-full text-lg text-center">{{ `Commande #${data.data._id}` }}</h1>
                </template>
                <h2 class="text-lg">{{ `Votre commande du ${new Date(data.data.date).toLocaleString()}:` }}</h2>
                <div class="pl-4 w-full">
                    <template v-for="(plat, index) in data.data.plat_data">
                        <USeparator v-if="index !== 0" type="dashed" />
                        <div class="flex justify-between">
                            <p>{{ `- ${plat.name}` }}</p>
                            <p>{{`${plat.price.toFixed(2)}€`}}</p>
                        </div>
                    </template>
                    <template v-for="(promotion, index) in data.data.promotions">
                        <USeparator v-if="index===0" class="py-1" size="md"/>
                        <div class="flex justify-between">
                            <p>{{ promotion.code }}</p>
                            <p v-if="promotion.type==='percentage'">{{`-${((promotion.value['$numberDecimal'])*100).toFixed(2)}%`}}</p>
                        </div>
                    </template>
                    <USeparator class="py-1" size="md"/>
                    <div class="flex justify-between">
                        <p class="font-semibold">Total</p>
                        <p>{{`${parseFloat(data.data.price['$numberDecimal']).toFixed(2)}€`}}</p>
                    </div>
                    <p class="w-full text-right"></p>

                </div>
                <USeparator class="py-1"/>
                <div class="flex justify-between">
                    <div class="flex flex-col">
                        <p class="w-full text-lg">{{ data.data.restaurant_data.nom  }}</p>
                        <p class="w-full align-middle"><UIcon size="12" name="i-material-symbols:call"/> {{ data.data.restaurant_data.telephone  }}</p>
                        <p class="w-full text-right">{{ data.data.restaurant_data.adresse  }}</p>
                    </div>
                </div>
                <div class="flex justify-between">
                    <p ></p>
                </div>
                <template #footer>
                    <p class="text-sm text-center">Merci d'avoir commander sur Pep'eat ❤️</p>
                </template>
            </UCard>
        </div>
    </div>
</template>


<style scoped>
.bg-fixed-background {
    background-image: url('bg-homepage.png');
}
</style>