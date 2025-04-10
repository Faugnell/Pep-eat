<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

type Order = {
    _id: string
    user_id: string
    date: string
    status: string
    comment: string
    price: {
        $numberDecimal: string
    }
    restaurant_data?: {
        nom: string
    }
    user_data?: {
        first_name: string
        last_name: string
        address: string
        city: string
        postal_code: string
        phone: string
    }
}

const route = useRoute();
const delivery = ref<Order | null>(null);
const canAdvance = ref(false);

const statusSteps: string[] = [
    'Prise en charge de la commande.',
    'La commande arrive.',
    'La commande a été livrée.'
]

const currentStep = ref<number | null>(null);

const fetchDelivery = async () => {
    try {
        const response = await fetch(`http://localhost:3102/commandes/${route.params.id}`);
        const data = await response.json();

        if (data.ok && data.data) delivery.value = data.data;
    } catch (err) {
        console.error('Erreur lors de la récupération de la commande :', err);
    }
}

const takeOrder = () => {
    canAdvance.value = true;
    currentStep.value = 0;

    if (delivery.value) delivery.value.status = statusSteps[0];
}

const nextStep = () => {
    if (delivery.value && currentStep.value !== null && currentStep.value < statusSteps.length - 1) {
        currentStep.value++;
        delivery.value.status = statusSteps[currentStep.value];
    }
}

const displayStatus = computed(() => {
    return currentStep.value !== null && delivery.value?.status ? delivery.value.status : '-';
})

onMounted(() => {
    fetchDelivery();
})
</script>

<template>
    <UContainer class="py-6">
        <h1 class="text-2xl font-bold my-6">Détail de la livraison</h1>

        <div v-if="!delivery">
            <p>Chargement...</p>
        </div>

        <div v-else class="space-y-6">
            <UCard>
                <template #header>
                    <p class="text-lg font-semibold">
                        Commande de : {{ delivery.user_data?.first_name }} {{ delivery.user_data?.last_name }}
                    </p>
                </template>
                <div class="space-y-2">
                    <p><strong>Restaurant :</strong> {{ delivery.restaurant_data?.nom }}</p>
                    <p><strong>Date :</strong> {{ new Date(delivery.date).toLocaleString() }}</p>
                    <p><strong>Prix :</strong> {{ delivery.price?.$numberDecimal }} €</p>
                    <p><strong>Ville de la livraison :</strong> {{ delivery.user_data?.postal_code }}, {{ delivery.user_data?.city }}</p>
                    <p><strong>Adresse de livraison :</strong> {{ delivery.user_data?.address }}</p>
                    <p><strong>Contact du client :</strong> {{ delivery.user_data?.phone }}</p>
                    <p><strong>Information(s) :</strong> {{ delivery?.comment ? delivery?.comment : "-" }}</p>
                </div>
                <template #footer>
                    <p class="text-lg font-semibold">Status : {{ displayStatus }}</p>
                </template>
            </UCard>

            <div class="flex gap-4">
                <UButton @click="takeOrder" color="success" :disabled="canAdvance">
                    Prendre la commande
                </UButton>

                <UButton @click="nextStep" variant="outline" color="success"
                    :disabled="!canAdvance || currentStep === statusSteps.length - 1">
                    Étape suivante
                </UButton>
            </div>
        </div>
    </UContainer>
</template>