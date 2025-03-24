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
                        <div class="flex justify-around w-full h-[7vh] min-h-10 fixed bottom-0">
                            <p>
                                Total de la commande :
                            </p>
                            <UTextarea placeholder="Ajouter une note (ex: pas d'oignon)" />
                            <div>
                                <UButton>Continuer les achats</UButton>
                                <UButton>Valider la commande</UButton>
                            </div>
                        </div>

                    </template>
                </UCard>
            </div>
        </template>
    </UStepper>
</template>