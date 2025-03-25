<script setup lang="ts">
import HeaderPepeat from "~/components/common/HeaderPepeat.vue";

type Tabs = {
    title: "Récapitulatif" | "Adresse" | "Paiement" | "Finalisation";
    description: string;
    icon?: string;
}

const tabs: Tabs[] = [
    { title: "Récapitulatif", description: "Récapitulatif de la commande", icon: "i-lucide-shopping-cart" },
    { title: "Adresse", description: "Confirmer votre adresse", icon: "i-lucide-house" },
    { title: "Paiement", description: "Renseigner vos informations de paiement", icon: "i-lucide-credit-card" },
    { title: "Finalisation", description: "Validation de votre commande", icon: "i-lucide-check" }
]

const numCard: Ref<string> = ref('');
const dateExpiration = ref(''); // format MM/AA
const cryptogramme: Ref<string> = ref('');
const numDeVoie: Ref<number | undefined> = ref();
const nomDeVoie: Ref<string> = ref('');
const codePostal: Ref<number | undefined> = ref();

// TESTS
const items: { item: string, price: number }[] = [
    { item: "Coca", price: 1.99 },
    { item: "Tacos XL", price: 9.99 },
    { item: "Nuggets", price: 4.99 },
    { item: "Glace", price: 3.99 },
]
</script>

<template>
    <HeaderPepeat />

    <UStepper ref="stepper" :items="tabs" class="w-full">
        <template #content="{ item }">
            <div class="flex justify-center">
                <UCard class="w-4/5">
                    <!-- Page de récapitulatif de commande -->
                    <template v-if="item?.title === 'Récapitulatif'">
                        <p class="text-lg font-semibold">récap</p>
                    </template>

                    <!-- Page de validation d'adresse -->
                    <template v-else-if="item?.title === 'Adresse'">
                        <UFormField class="w-full mb-4" label="Numéro de voie">
                            <UInput v-model="numDeVoie" type="text" class="w-1/2" />
                        </UFormField>
                        <UFormField class="w-full mb-4" label="Nom de la voie">
                            <UInput v-model="nomDeVoie" type="text" class="w-1/2" />
                        </UFormField>
                        <UFormField class="w-full mb-4" label="Code postal">
                            <UInput v-model="codePostal" type="text" class="w-1/2" />
                        </UFormField>
                    </template>

                    <!-- Page de validation d'info de paiement -->
                    <template v-else-if="item?.title === 'Paiement'">
                        <UFormField class="w-full mb-4" label="Numéro de la carte">
                            <UInput v-model="numCard" type="password" class="w-1/2" />
                        </UFormField>
                        <UFormField class="w-full mb-4" label="Date d'expiration">
                            <UInput v-model="dateExpiration" type="text" class="w-1/2" />
                        </UFormField>
                        <UFormField class="w-full mb-4" label="Cryptogramme visuel">
                            <UInput v-model="cryptogramme" type="password" class="w-1/2" />
                        </UFormField>
                    </template>

                    <!-- Page de finalisation -->
                    <template v-else-if="item?.title === 'Finalisation'">
                        <img id="logo" alt="logo" src="../../public/check-finalisation.png" class="w-48 h-48" />
                        <UButton>Retourner à l'accueil</UButton>
                        <UButton>Suivre la commande</UButton>
                    </template>
                </UCard>
            </div>
        </template>
    </UStepper>
</template>