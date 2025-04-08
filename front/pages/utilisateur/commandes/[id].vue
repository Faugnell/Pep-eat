<script setup lang="ts">
import type { ordersDataType } from '~/utils/types/Commande'
import type { Response } from '~/utils/types/Response';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
type fetchedDataType = {
    "code": number,
    "ok": boolean,
    "message": string,
    "data": ordersDataType
}

const route = useRoute()

const APIresponse = await $fetch<fetchedDataType>(`/api/commandes/${route.params.id}`);

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
    <div v-if="APIresponse !== undefined" class="flex justify-center min-h-screen pt-5">
        <div v-if="APIresponse.data === undefined">
            <p>{{ route.params.id }}</p>
        </div>
        <div v-else class="w-9/10 md:w-1/3 lg:w-1/4">
            <UCard>
                <template #header>
                    <h1 class="w-full text-lg text-center">{{ `Commande #${APIresponse.data._id}` }}</h1>
                </template>
                <h1 class="w-full text-center text-xl capitalize">{{ APIresponse.data.status }}</h1>
                <USeparator class="py-1"/>
                <h2 class="text-lg">{{ `Votre commande du ${new Date(APIresponse.data.date).toLocaleString()}:` }}</h2>
                <div class="pl-4 w-full">
                    <template v-for="(plat, index) in APIresponse.data.billing_details">
                        <USeparator v-if="index !== 0" type="dashed" />
                        <div class="flex justify-between">
                            <p>{{ `${plat.quantity} x - ${plat.article_data.name}` }}</p>
                            <p>{{`${(parseFloat(plat.article_data.price['$numberDecimal'])*plat.quantity).toFixed(2)}€`}}</p>
                        </div>
                    </template>
                    <template v-for="(promotion, index) in APIresponse.data.promotions">
                        <USeparator v-if="index===0" class="py-1" size="md"/>
                        <div class="flex justify-between">
                            <p>{{ promotion.code }}</p>
                            <p v-if="promotion.type==='percentage'">{{`-${(parseFloat(promotion.value['$numberDecimal'])*100).toFixed(2)}%`}}</p>
                        </div>
                    </template>
                    <USeparator class="py-1" size="md"/>
                    <div class="flex justify-between">
                        <p class="font-semibold">Total</p>
                        <p>{{`${parseFloat(APIresponse.data.price['$numberDecimal']).toFixed(2)}€`}}</p>
                    </div>
                    <p class="w-full text-right"></p>

                </div>
                <USeparator class="py-1"/>
                <div class="flex justify-between">
                    <div class="flex flex-col">
                        <p class="w-full text-lg">{{ APIresponse.data.restaurant_data.nom  }}</p>
                        <p class="w-full align-middle"><UIcon size="12" name="i-material-symbols:call"/> {{ APIresponse.data.restaurant_data.telephone  }}</p>
                        <p class="w-full text-right">{{ APIresponse.data.restaurant_data.adresse  }}</p>
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
</template>