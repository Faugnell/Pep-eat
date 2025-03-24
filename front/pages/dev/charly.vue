<script setup lang="ts">
import Connexion from '~/components/authentification/Connexion.vue'
import Inscription from '~/components/authentification/Inscription.vue'
</script>

<template>
    <!-- Connexion -->
    <UModal title="Se connecter à Pep'Eat">
        <UButton label="Connexion" color="primary" />

        <template #body>
            <!-- Email -->
            <Connexion />
        </template>
    </UModal>

    <!-- Inscription -->
    <UModal title="S'inscrire à Pep'Eat">
        <UButton label="Inscription" color="primary" />

        <template #body>
            <Inscription />
        </template>
    </UModal>
</template>