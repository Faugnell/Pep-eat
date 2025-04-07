<script setup lang="ts">
import { ref } from 'vue';

const listOrderInstruction: { progress: number; instruction: string }[] = [
    { progress: 1, instruction: "Le restaurant prépare votre commande." },
    { progress: 2, instruction: "Prise en charge de la commande." },
    { progress: 3, instruction: "La commande arrive." },
    { progress: 4, instruction: "La commande a été livrée." }
];

// Simulation de la réponse du backend
const instructionFromBackend: string = "La commande a été livrée.";

const progressBarValue = ref<number>(
    listOrderInstruction.findIndex(instruction => instruction.instruction === instructionFromBackend) + 1
);

const progressBarNumber: number = Number(progressBarValue.value);
</script>

<template>
    <UContainer class="p-4">
        <div class="flex justify-between">
            <h1 class="text-3xl font-bold">12:20</h1>
            <p class="text-gray-500">Arrivée estimée</p>
        </div>

        <!-- Barre de progression -->
        <div class="mt-2">
            <UProgress v-model="progressBarValue" :max="4" color="success" class="w-full" />
            <p class="mt-1 text-gray-700">{{ listOrderInstruction[progressBarNumber - 1]?.instruction }}</p>
            <p class="text-gray-500">Arrivée la plus tardive : <strong>12:40</strong></p>
        </div>

        <div class="mt-4">
            <NuxtImg src="/commande/static_map.png" alt="Carte" class="w-full rounded-lg shadow-md" />
        </div>

        <!-- Carte du livreur -->
        <div class="mt-6 flex items-center">
            <UCard class="w-full p-2">
                <div class="flex justify-between items-center w-full">
                    <h2 class="text-xl font-semibold">CharlyPIMP roule à vélo.</h2>
                    <UChip>
                        <UAvatar src="/commande/profil_serveur.jpg" size="xl" />
                    </UChip>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>