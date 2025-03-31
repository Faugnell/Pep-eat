<script setup>
import HeaderPepeat from "~/components/common/HeaderPepeat";
import FooterPepeat from "~/components/common/FooterPepeat";
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const router = useRouter()

const user_id = "6601143d8f1b4c001f23a1b2"

let loading = ref<Boolean>(true)

const {data} = await useFetch(`http://localhost:3102/commandes/user/${user_id}`, { method: "GET" })

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
    <div v-if="data == null" class="flex flex-col px-8 min-h-screen">
        <p>y a pas wesh</p>
    </div>
    <div v-else class="flex flex-col px-8 min-h-screen">
        <div class="flex justify-center">
            <div class="flex flex-col px-2.5 py-2.5 w-7/10 border-1 rounded-sm border-gray-300">
                <template  v-for="(commande, index) in data.data">
                    <USeparator v-if="index !== 0"/>
                    <nuxt-link :to="`/utilisateurs/livraison/${commande._id}`">
                        <div class="group flex justify-between p-2.5 hover:bg-gray-500/10 transition-all hover:cursor-pointer active:bg-gray-500/5 rounded-lg">
                            <div class="flex w-full flex-col justify-center">
                                <div class="flex w-full justify-between">
                                    <div class="flex justify-left">
                                        <div class="flex-col h-full w-16 py-1 justify-center">
                                            <UBadge class="rounded-full size-full flex justify-center text-xl">{{ commande.restaurant_data.nom[0] }}</UBadge>
                                        </div>
                                        <div class="flex pl-3 flex-col">
                                            <p class="text-lg">{{commande.restaurant_data.nom}}</p>
                                            <p class="text-sm">{{commande.status}}</p>
                                            <p class="text-md">27,30€ • {{new Date(commande.date).toLocaleString()}}</p>
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
                    </nuxt-link>
                </template>
            </div>
        </div>
    </div>
    <FooterPepeat />
</template>


<style scoped>
.bg-fixed-background {
    background-image: url('bg-homepage.png');
}
</style>