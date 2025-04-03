<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

const {
    getId,
    isConnected
} = useUserStore();


/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const userId = computed<string>(() => getId());
const userConnected = computed<boolean>(() => isConnected())

const { data: commande } = await useAsyncData<any>(
  'posts',
  () => $fetch(`http://localhost:3102/commandes/user/${userId.value}`), {
    watch: [userId]
  }
)

// const user_id = "67e6a0dc966cad123f40d4b2"

// const {data} = await useFetch(`http://localhost:3102/commandes/user/${userId}`, { method: "GET" })

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
    <div class="min-h-screen">
        <div v-if="commande == null" class="flex flex-col px-8 min-h-screen">
            <h1 v-if="userConnected" class="w-full">Une erreure est survenue</h1>
            <h1 v-else class="w-full text-center text-2xl">Vous devez être connecté pour consulter vos commandes</h1>
        </div>
        <div v-else class="flex flex-col px-8 min-h-screen">
            <p v-if="commande.data.length !== 0" class="py-3 w-full text-center text-xl">Vos commandes :</p>
            <div class="flex justify-center">
                <div v-if="commande.data.length !==0" class="flex flex-col px-2.5 py-2.5 w-7/10 border-1 rounded-sm border-gray-300">
                    <template  v-for="(commande, index) in commande.data">
                        <USeparator v-if="index !== 0"/>
                        <NuxtLink :to="`commandes/${commande._id}`">
                            <div class="group flex justify-between p-2.5 hover:bg-gray-500/10 transition-all hover:cursor-pointer active:bg-gray-500/5 rounded-lg">
                                <div class="flex w-full flex-col justify-center">
                                    <div class="flex w-full justify-between">
                                        <div class="flex justify-left">
                                            <div class="flex-col h-full w-16 py-1 justify-center align-middle">
                                                <UBadge class="rounded-full size:25 md:size-full flex justify-center text-xl">{{ commande.restaurant_data.nom[0] }}</UBadge>
                                            </div>
                                            <div class="flex pl-3 flex-col">
                                                <p class="text-lg">{{commande.restaurant_data.nom}}</p>
                                                <p class="text-sm">{{commande.status}}</p>
                                                <p class="text-md">{{`${commande.price['$numberDecimal'].replace('.',',')}€ • ${new Date(commande.date).toLocaleString()}`}}</p>
                                            </div>
                                        </div>
                                        <div class="flex justify-right">
                                            <div class="flex flex-col justify-center">
                                                <UIcon name="i-material-symbols-light:arrow-forward-ios" class="text-primary-500 group-hover:text-primary-600" size="28" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </template>
                </div>
                <div v-else class="flex flex-col py-5 w-6/10">
                    <h1 class="text-2xl w-full text-center">Aucune commande</h1>
                    <USeparator class="py-5"/>
                    <p class="text-lg text-center">Faites votre première commande sur Pep'eat et régalez-vous !</p>
                    <p class="text-md text-center">Accéder à notre large catalogue de restaurant en <NuxtLink class="text-primary-500" to="/">cliquant ici ! <UIcon name="i-ic:round-launch" size="10"/></NuxtLink></p>
                </div>
            </div>
        </div>
    </div>
</template>