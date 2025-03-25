<script setup lang="ts">
import HeaderPepeat from "~/components/common/HeaderPepeat.vue";

type Items = {
    title: "Adresse" | "Expédition" | "Finalisation";
    description: string;
    icon?: string;
}

const items: Items[] = [
    { title: "Adresse", description: "Ajouter votre adresse", icon: "i-lucide-house" },
    { title: "Expédition", description: "Choisisser votre méthode d'expédition", icon: "i-lucide-truck" },
    { title: "Finalisation", description: "Confirmer votre commande" }
]
</script>

<template>
    <HeaderPepeat />

    <UStepper ref="stepper" :items="items" class="w-full">
        <template #content="{ item }">
            <div class="flex justify-center">
                <UCard class="w-4/5">
                    <template v-if="item?.title === 'Adresse'">
                        <p>Adresse</p>
                    </template>

                    <template v-else-if="item?.title === 'Expédition'">
                        <p>Expédition</p>
                    </template>

                    <!-- Page de finalisation -->
                    <template v-else-if="item?.title === 'Finalisation'">
                        <p>Panier</p>

                        <UCard>
                            <USeparator class="my-4" />

                        </UCard>

                        <!-- Footer pour payer -->
                        <div class="fixed bottom-0 left-0 w-full bg-gray-50 p-4 shadow-lg flex flex-col items-center">
                            <p class="text-lg font-semibold text-left w-[60%] mb-4">Total de la commande : x€ </p>

                            <div class="flex flex-col items-center w-[60%] space-y-3">
                                <UTextarea :rows="8" placeholder="Ajouter une note (ex: pas d'oignon)" class="w-full" />

                                <div class="flex justify-between w-full">
                                    <UButton class="w-1/2 mr-2" color="primary">Continuer les achats</UButton>
                                    <UButton class="w-1/2 ml-2" color="primary">Valider la commande</UButton>
                                </div>
                            </div>
                        </div>
                    </template>
                </UCard>
            </div>
        </template>
    </UStepper>
</template>