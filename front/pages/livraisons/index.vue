<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const deliveries = ref<Order[]>([]);

const getRandomDistance = (): number => {
    return parseFloat((Math.random() * (10 - 0.5) + 0.5).toFixed(2));
}

const fetchDeliveries = async () => {
    try {
        const response = await fetch('http://localhost:3102/commandes');
        const data = await response.json();

        if (data && data.data) deliveries.value = data.data;
    } catch (error) {
        console.error('Erreur réseau :', error);
    }
}

// const fetchOthers = async () => {
//     try {
//         const response = await fetch('http://localhost:3105/livraisons');
//         const data = await response.json();
// console.log(data.data)
//         if (data && data.data) deliveries.value = data.data;
//     } catch (error) {
//         console.error('Erreur réseau :', error);
//     }
// }

onMounted(() => {
    fetchDeliveries();
    // fetchOthers();
})
</script>

<template>
    <UContainer>
        <h1 class="text-2xl font-bold my-6">Livraisons en attente</h1>

        <div v-if="deliveries.length === 0">
            <p>Aucune livraison en attente.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink v-for="delivery in deliveries" :key="delivery._id" :to="`/livraisons/livraison/${delivery._id}`" target="_blank">
                <UCard class="cursor-pointer hover:shadow-lg transition">
                    <template #header>
                        <p>Commande de l'utilisateur : {{ delivery.user_data?.last_name }} {{ delivery.user_data?.first_name }}</p>
                    </template>
                    <p>Restaurant : {{ delivery.restaurant_data?.nom }}</p>
                    <p>Distance : À {{ getRandomDistance() }}km de vous</p>
                </UCard>
            </NuxtLink>
        </div>
    </UContainer>
</template>