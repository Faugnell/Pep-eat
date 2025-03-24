<script setup lang="ts">
import { ref } from 'vue';

type FormField = {
    label: string;
    model: string;
    type: string;
    placeholder: string;
};

const lastName: Ref<string> = ref('');
const firstName: Ref<string> = ref('');
const address: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const role: Ref<string> = ref('');
const referralCode: Ref<string> = ref('');

const roleOptions: string[] = ['Client', 'Livreur', 'Restaurateur'];
const isSubmitted: Ref<boolean> = ref(false);

// Liste des champs du formulaire avec leurs propriétés
const formFields: Ref<FormField[]> = ref([
    { label: 'Nom', model: lastName, type: 'text', placeholder: 'Votre nom' },
    { label: 'Prénom', model: firstName, type: 'text', placeholder: 'Votre prénom' },
    { label: 'Adresse de domicile', model: address, type: 'text', placeholder: '1 rue de Paris' },
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Mot de passe', model: password, type: 'password', placeholder: 'Mot de passe' },
]);

// Validation de l'inscription si tous les champs obligatoires sont remplis
const handleRegister = (): void => {
    isSubmitted.value = true;

    if (!lastName.value || !firstName.value || !address.value || !email.value || !password.value || !role.value) return;

    console.log(
        'Inscription : ',
        `Nom: ${lastName.value}, Prénom: ${firstName.value}, Adresse: ${address.value}, Email: ${email.value}, Mot de passe: ${password.value}, Rôle: ${role.value}, Code de parrainage: ${referralCode.value || 'Aucun'}`
    );
};
</script>

<template>
    <!-- Nom et Prénom sur la même ligne -->
    <div class="flex space-x-4 mb-4">
        <div v-for="(field, index) in formFields.slice(0, 2)" :key="index" class="w-1/2">
            <UFormField :label="field.label" required>
                <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder" class="w-full" />
                <template #hint>
                    <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
                </template>
            </UFormField>
        </div>
    </div>

    <!-- Rôle -->
    <UFormField class="w-full mb-4" label="Rôle" required>
        <select v-model="role" class="w-full px-3 py-2 border rounded-lg">
            <option value="" disabled selected>Choisir un rôle</option>
            <option v-for="option in roleOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <template #hint>
            <p v-if="isSubmitted && !role" class="text-red-500 text-sm">Champ obligatoire</p>
        </template>
    </UFormField>

    <!-- Champs restants -->
    <div v-for="(field, index) in formFields.slice(2)" :key="index" class="w-full mb-4">
        <UFormField :label="field.label" required>
            <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder" class="w-full" />
            <template #hint>
                <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
            </template>
        </UFormField>
    </div>

    <USeparator class="my-4" />

    <!-- Code de parrainage (optionnel) -->
    <UFormField class="w-full mb-4" label="Code de parrainage">
        <UInput v-model="referralCode" type="text" placeholder="Code de parrainage (optionnel)" class="w-full" />
    </UFormField>

    <USeparator class="my-4" />

    <div class="w-full flex justify-center">
        <UButton label="S'inscrire" color="primary" @click="handleRegister" class="w-1/3 py-2" />
    </div>
</template>