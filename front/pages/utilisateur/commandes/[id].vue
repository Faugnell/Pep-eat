<script setup lang="ts">
import type { ordersDataType } from '~/utils/types/Commande'
import type { livraisonDataType } from '~/utils/types/Livraison'

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
type fetchedCommandDataType = {
    "code": number,
    "ok": boolean,
    "message": string,
    "data": ordersDataType
}

type fetchedLivraisonDataType = {
    "code": number,
    "ok": boolean,
    "message": string,
    "data": livraisonDataType
}

const route = useRoute()

const CommandeFetch = await $fetch<fetchedCommandDataType>(`/api/commandes/${route.params.id}`);
const LivraisonFetch = await $fetch<fetchedLivraisonDataType>(`/api/livraison/${route.params.id}`);

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */

const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Avancement de la commande
const progressBarValue = ref<number>(0)
const listOrderInstruction: { progress: number; instruction: string }[] = [
    { progress: 1, instruction: 'Le restaurant prépare votre commande.' },
    { progress: 2, instruction: 'Prise en charge de la commande.' },
    { progress: 3, instruction: 'La commande arrive.' },
    { progress: 4, instruction: 'La commande a été livrée.' }
]

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <div v-if="CommandeFetch !== undefined" class="flex justify-center min-h-screen pt-5">
        <div class="flex flex-col w-full">
            <div class="flex justify-center">
                <div v-if="CommandeFetch.data === undefined">
                    <p>{{ route.params.id }}</p>
                </div>
                <div v-else class="w-9/10 md:w-1/3 lg:w-1/4">
                    <UCard>
                        <template #header>
                            <h1 class="w-full text-lg text-center">{{ `Commande #${CommandeFetch.data._id}` }}</h1>
                        </template>
                        <h1 class="w-full text-center text-xl capitalize">{{ CommandeFetch.data.status }}</h1>
                        <USeparator class="py-1"/>
                        <h2 class="text-lg">{{ `Votre commande du ${new Date(CommandeFetch.data.date).toLocaleString()}:` }}</h2>
                        <div class="pl-4 w-full">
                            <template v-for="(plat, index) in CommandeFetch.data.billing_details">
                                <USeparator v-if="index !== 0" type="dashed" />
                                <div class="flex justify-between">
                                    <p>{{ `${plat.quantity} x - ${plat.article_data.name}` }}</p>
                                    <p>{{`${(parseFloat(plat.article_data.price['$numberDecimal'])*plat.quantity).toFixed(2)}€`}}</p>
                                </div>
                            </template>
                            <template v-for="(promotion, index) in CommandeFetch.data.promotions">
                                <USeparator v-if="index===0" class="py-1" size="md"/>
                                <div class="flex justify-between">
                                    <p>{{ promotion.code }}</p>
                                    <p v-if="promotion.type==='percentage'">{{`-${(parseFloat(promotion.value['$numberDecimal'])*100).toFixed(2)}%`}}</p>
                                </div>
                            </template>
                            <USeparator class="py-1" size="md"/>
                            <div class="flex justify-between">
                                <p class="font-semibold">Total</p>
                                <p>{{`${parseFloat(CommandeFetch.data.price['$numberDecimal']).toFixed(2)}€`}}</p>
                            </div>
                            <p class="w-full text-right"></p>
                        </div>
                        <USeparator class="py-1"/>
                        <div class="flex justify-between">
                            <div class="flex flex-col">
                                <p class="w-full text-lg">{{ formatTime(CommandeFetch.data.restaurant_data.nom)  }}</p>
                                <p class="w-full align-middle"><UIcon size="12" name="i-material-symbols:call"/> {{ CommandeFetch.data.restaurant_data.telephone  }}</p>
                                <p class="w-full text-right">{{ CommandeFetch.data.restaurant_data.adresse  }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <p ></p>
                        </div>
                        <template #footer>
                            <p class="text-sm text-center">Merci d'avoir commandé sur Pep'eat ❤️</p>
                        </template>
                    </UCard>
                </div>
            </div>
            <USeparator class="pt-8"/>
            <div class="flex justify-center">
                <UContainer class="p-4">
                    <div class="flex justify-between">
                        <h1 class="text-3xl font-bold">{{ new Date(LivraisonFetch.data.delivery_estimated_arrival_time).toLocaleTimeString() || '...' }}</h1>
                        <p class="text-gray-500">Arrivée estimée</p>
                    </div>

                    <!-- Barre de progression -->
                    <div class="mt-2">
                        <UProgress v-model="progressBarValue" :max="4" color="success" class="w-full" />
                        <p class="mt-1 text-gray-700">
                            {{ listOrderInstruction[progressBarValue - 1]?.instruction || 'En attente...' }}
                        </p>
                        <p class="text-gray-500">
                            Arrivée la plus tardive : <strong>{{ new Date(LivraisonFetch.data.delivery_lastest_arrival_time).toLocaleTimeString() || '...' }}</strong>
                        </p>
                    </div>

                    <!-- Carte -->
                    <div class="mt-4">
                        <NuxtImg src="/commande/static_map.png" alt="Carte" class="w-full rounded-lg shadow-md" />
                    </div>

                    <!-- Infos livreur -->
                    <div class="mt-6 flex items-center">
                        <UCard class="w-full p-2">
                            <div class="flex justify-between items-center w-full">
                                <h2 class="text-xl font-semibold">CharlyPIMP roule à vélo.</h2> <!--TODO : Problème de jointure pour récup le nom du livreur -->
                                <UChip>
                                    <UAvatar src="/commande/profil_serveur.jpg" size="xl" />
                                </UChip>
                            </div>
                        </UCard>
                    </div>
                </UContainer>
            </div>
        </div>
    </div>
</template>