<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Données de la livraison (réponse backend)
const estimatedArrival = ref<string>('')
const latestArrival = ref<string>('')

// Avancement de la commande
const progressBarValue = ref<number>(0)
const listOrderInstruction: { progress: number; instruction: string }[] = [
    { progress: 1, instruction: 'Le restaurant prépare votre commande.' },
    { progress: 2, instruction: 'Prise en charge de la commande.' },
    { progress: 3, instruction: 'La commande arrive.' },
    { progress: 4, instruction: 'La commande a été livrée.' }
]

const fetchLivraison = async () => {
    try {
        const response = await fetch('http://localhost:3105/livraisons/67f428a09e8e701e4eb9fca8') // url de test, à adapter avec un [id]
        const result = await response.json()

        if (response.ok && result.data) {
            const livraison = result.data

            const formatTime = (isoDate: string): string => {
                const date = new Date(isoDate)
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }

            estimatedArrival.value = formatTime(livraison.delivery_estimated_arrival_time)
            latestArrival.value = formatTime(livraison.delivery_lastest_arrival_time)

            // Calcul de l'étape actuelle (1 à 4)
            const currentStep = listOrderInstruction.findIndex(
                i => i.instruction === livraison.status
            ) + 1

            progressBarValue.value = currentStep
        } else {
            console.error('Erreur récupération livraison :', result.error)
        }
    } catch (err) {
        console.error('Erreur réseau :', err)
    }
}

onMounted(() => {
    fetchLivraison();
})
</script>

<template>
    <UContainer class="p-4">
        <div class="flex justify-between">
            <h1 class="text-3xl font-bold">{{ estimatedArrival || '...' }}</h1>
            <p class="text-gray-500">Arrivée estimée</p>
        </div>

        <!-- Barre de progression -->
        <div class="mt-2">
            <UProgress v-model="progressBarValue" :max="4" color="success" class="w-full" />
            <p class="mt-1 text-gray-700">
                {{ listOrderInstruction[progressBarValue - 1]?.instruction || 'En attente...' }}
            </p>
            <p class="text-gray-500">
                Arrivée la plus tardive : <strong>{{ latestArrival || '...' }}</strong>
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
</template>