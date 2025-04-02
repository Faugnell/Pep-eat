<script setup lang="ts">
import type { Router } from "vue-router";
import HeaderPepeat from "~/components/common/HeaderPepeat.vue";
import type { StepperItem } from '@nuxt/ui'

const tabs: StepperItem[] = [
    { slot: "recapitulatif", title: "Récapitulatif", description: "Résumé de la commande", icon: "i-lucide-shopping-cart" },
    { slot: "adresse", title: "Adresse", description: "Confirmer votre adresse", icon: "i-lucide-house" },
    { slot: "paiement", title: "Paiement", description: "Informations de paiement", icon: "i-lucide-credit-card" },
    { slot: "finalisation", title: "Finalisation", description: "Valider votre commande", icon: "i-lucide-check" }
]

const numDeVoie: Ref<number | undefined> = ref();
const nomDeVoie: Ref<string> = ref('');
const complementAdresse: Ref<string> = ref('');
const codePostal: Ref<number | undefined> = ref();
const ville: Ref<string> = ref('');
const telephone: Ref<string> = ref('');

const numCard: Ref<string> = ref('');
const dateExpiration: Ref<string> = ref('');
const cryptogramme: Ref<string> = ref('');
const paymentMessageVisible: Ref<boolean> = ref(false);

const stepper = useTemplateRef('stepper')

const router: Router = useRouter()
const goHome = (): void => {
    router.push('/')
}

// DONNÉES DE TEST
const items: Ref<{ item: string; price: number }[]> = ref([
    { item: "Coca", price: 1.99 },
    { item: "Tacos XL", price: 9.99 },
    { item: "Nuggets", price: 4.99 },
    { item: "Glace", price: 3.99 },
]);

// Calcule le prix total de la commande
const totalPrice = computed<number>(() =>
    items.value.reduce((total, product) => total + product.price, 0)
);

const completePayment = () => {
    paymentMessageVisible.value = true;
}
</script>

<template>
    <div class="w-full flex justify-center mt-6">
        <UStepper ref="stepper" :items="tabs" class="w-4/5 xl:w-3/5">

            <!-- Page de récapitulatif de commande -->
            <template #recapitulatif>
                <UCard class="w-full min-h-[400px] mt-6">
                    <p class="text-xl font-semibold mb-4">Votre commande</p>
                    <ul class="space-y-3 w-full">
                        <li v-for="(product, index) in items" :key="index"
                            class="flex justify-between items-center border-b pb-2">
                            <div class="flex items-center">
                                <p>{{ product.item }}</p>
                            </div>
                            <p>{{ product.price }} €</p>
                        </li>
                    </ul>
                    <div class="mt-4 flex justify-between text-lg font-semibold">
                        <p>Total :</p>
                        <p>{{ totalPrice }} €</p>
                    </div>
                </UCard>
            </template>

            <!-- Page de validation d'adresse -->
            <template #adresse>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex justify-center">
                        <div class="w-full max-w-xl">
                            <p class="text-xl font-semibold mb-6 text-center">Adresse de livraison</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <UFormField label="N°" required>
                                    <UInput v-model="numDeVoie" type="text" placeholder="8" class="w-[200px]" />
                                </UFormField>
                                <UFormField label="Rue" required>
                                    <UInput v-model="nomDeVoie" type="text" placeholder="Rue Isabelle Autissier"
                                        icon="i-lucide-compass" />
                                </UFormField>
                                <UFormField label="Complément (optionnel)">
                                    <UInput v-model="complementAdresse" type="text" placeholder="Bâtiment B, Appt 45"
                                        icon="i-lucide-home" />
                                </UFormField>
                                <UFormField label="Code Postal" required>
                                    <UInput v-model="codePostal" type="text" placeholder="17140"
                                        icon="i-lucide-map-pin" />
                                </UFormField>
                                <UFormField label="Ville" required>
                                    <UInput v-model="ville" type="text" placeholder="Lagord" icon="i-lucide-building" />
                                </UFormField>
                                <UFormField label="Téléphone (pour le livreur)" required>
                                    <UInput v-model="telephone" type="tel" placeholder="+33 6 66 66 66 66"
                                        icon="i-lucide-phone" />
                                </UFormField>
                            </div>
                        </div>
                    </div>
                </UCard>
            </template>

            <!-- Page de validation d'info de paiement -->
            <template #paiement>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex flex-col items-center">
                        <div class="flex justify-center mb-6 mt-2 gap-6">
                            <UIcon name="i-ri:visa-line" size="25" />
                            <UIcon name="i-ic:baseline-paypal" size="25" />
                            <UIcon name="i-logos:mastercard" size="25" />
                            <UIcon name="i-cib:american-express" size="25" />
                        </div>
                        <div class="w-full max-w-md p-6">
                            <UFormField class="w-full mb-4" label="Numéro de la carte" required>
                                <UInput v-model="numCard" type="text" class="w-full"
                                    placeholder="**** **** **** ****" />
                            </UFormField>
                            <div class="flex space-x-4 mb-12">
                                <UFormField class="w-1/2" label="Date d'expiration" required>
                                    <UInput v-model="dateExpiration" type="text" placeholder="MM/AA" class="w-full" />
                                </UFormField>
                                <UFormField class="w-1/2" label="Cryptogramme" required>
                                    <UInput v-model="cryptogramme" type="password" placeholder="***" class="w-full" />
                                </UFormField>
                            </div>
                            <UButton label="Payer" color="primary" variant="solid"
                                class="w-full h-full flex items-center justify-center" @click="completePayment" />
                            <div v-if="paymentMessageVisible" class="mt-4 text-center text-primary-500">
                                <p>Votre paiement a été effectué avec succès !</p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </template>


            <!-- Page de finalisation -->
            <template #finalisation>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex flex-col items-center text-center">
                        <UIcon name="i-material-symbols:check-circle-rounded" size="175" class="text-primary-500" />
                        <p class="text-2xl font-semibold mb-4">Commande validée avec succès !</p>
                        <p class="text-gray-600 mb-6">Vous recevrez une notification de confirmation sous peu.
                        </p>
                        <div class="flex space-x-4">
                            <UButton label="Retourner à l'accueil" color="primary" variant="outline" @click="goHome" />
                            <UButton label="Suivre la commande" color="primary" variant="solid" />
                        </div>
                    </div>
                </UCard>
            </template>
        </UStepper>
    </div>
    <!-- Boutons de navigation -->
    <div class="fixed top-1/2 flex justify-between w-full px-2">
        <UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev" @click="stepper?.prev()"></UButton>
        <UButton trailing-icon="i-lucide-arrow-right" :disabled="!stepper?.hasNext" @click="stepper?.next()"></UButton>
    </div>
</template>