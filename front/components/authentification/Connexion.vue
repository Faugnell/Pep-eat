<script setup lang="ts">
import { ref } from 'vue';

type Field = {
    name: string;
    label: string;
    value: string;
    type: 'email' | 'password';
    placeholder: string;
}

const fields = ref<Field[]>([
    { name: 'email', label: 'Adresse email', value: '', type: 'email', placeholder: 'example.ex@example.fr' },
    { name: 'password', label: 'Mot de passe', value: '', type: 'password', placeholder: 'Mot de passe' },
]);

const isSubmitted = ref<boolean>(false);

// Permet de se connecter si tous les champs sont remplis
const handleLogIn = (): void => {
    isSubmitted.value = true;
    
    if (fields.value.some(field => !field.value)) return;

    console.log('Connexion : ', fields.value.map(field => `${field.name}: ${field.value}`).join(', '));
};
</script>

<template>
    <!-- Email -->
    <UFormField v-model="fields[0].value" :label="fields[0].label" class="mb-4" required>
        <UInput v-model="fields[0].value" :type="fields[0].type" :placeholder="fields[0].placeholder" class="w-full" />
            <template #hint>
                <p v-if="isSubmitted && !fields[0].value" class="text-red-500 text-sm">Champ obligatoire</p>
            </template>
        </UFormField>

    <!-- Mot de passe -->
        <UFormField v-model="fields[1].value" :label=fields[1].label required>
            <UInput v-model="fields[1].value" :type="fields[1].type" :placeholder="fields[1].placeholder" class="w-full" />
            <template #hint>
                <p v-if="isSubmitted && !fields[1].value" class="text-red-500 text-sm">Champ obligatoire</p>
            </template>
        </UFormField>

        <USeparator class="my-4" />

        <div class="w-full flex justify-center">
            <UButton label="Se connecter" color="primary" @click="handleLogIn" class="w-1/3" />
        </div>
</template>