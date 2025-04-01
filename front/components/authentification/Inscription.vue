<script setup lang="ts">
import { ref } from 'vue';
import type { ApiResponse, FormFieldRegistration, User } from './types';
import { useUserStore } from '~/stores/userStore';

const {
    setUserInfo
} = useUserStore();

const last_name: Ref<string> = ref('');
const first_name: Ref<string> = ref('');
const role: Ref<string> = ref('');
const city: Ref<string> = ref('');
const postal_code: Ref<string> = ref('');
const address: Ref<string> = ref('');
const email: Ref<string> = ref('');
const phone: Ref<string> = ref('');
const password: Ref<string> = ref('');
const referral_link: Ref<string> = ref('');

const roleOptions: string[] = ['client', 'livreur', 'restaurateur'];

const formFields: Ref<FormFieldRegistration[]> = ref([
    { label: 'Nom', model: last_name, type: 'text', placeholder: 'Votre nom' },
    { label: 'Prénom', model: first_name, type: 'text', placeholder: 'Votre prénom' },
    { label: 'Ville', model: city, type: 'text', placeholder: 'Votre ville' },
    { label: 'Code postal', model: postal_code, type: 'text', placeholder: 'Votre code postal' },
    { label: 'Adresse de domicile', model: address, type: 'text', placeholder: '1 rue de Paris' },
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Téléphone', model: phone, type: 'text', placeholder: '+33 6 66 66 66 66' },
    { label: 'Mot de passe', model: password, type: 'password', placeholder: 'Mot de passe' },
]);

const isSubmitted: Ref<boolean> = ref(false);
const errorMessage = ref<string | null>(null);

const handleSubmit = async (): Promise<void> => {
    isSubmitted.value = true;
    errorMessage.value = null;

    // Vérifie que tous les champs obligatoires sont remplis
    if (!last_name.value || !first_name.value || !role.value || !city.value || !postal_code.value || !address.value || !email.value || !phone.value || !password.value) {
        return;
    }

    const userData = {
        last_name: last_name.value,
        first_name: first_name.value,
        role: role.value,
        city: city.value,
        postal_code: postal_code.value,
        address: address.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        referral_link: referral_link.value || null
    };

    try {
        const response = await fetch("http://localhost:3104/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data: ApiResponse<User> = await response.json();

        if (response.ok) {
            // Stockage du token JWT
            localStorage.setItem("user", JSON.stringify(data.data));

            setUserInfo(
                {
                    id: data.data._id,
                    firstName: data.data.first_name,
                    lastName: data.data.last_name,
                    role: data.data.role,
                    city: data.data.city,
                    postalCode: data.data.postal_code,
                    address: data.data.address,
                    email: data.data.email,
                    phone: data.data.phone
                }
            );
        } else {
            useToast().add({
                title: "Erreur lors de l'inscription",
                description: data.message,
                color: "error"
            });

            return;
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = "Erreur lors de la connexion.";
    }
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

    <!-- Ville et code postal sur la même ligne -->
    <div class="flex space-x-4 mb-4">
        <div v-for="(field, index) in formFields.slice(2, 4)" :key="index" class="w-1/2">
            <UFormField :label="field.label" required>
                <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder" class="w-full" />
                <template #hint>
                    <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
                </template>
            </UFormField>
        </div>
    </div>

    <!-- Champs restants -->
    <div v-for="(field, index) in formFields.slice(4)" :key="index" class="w-full mb-4">
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
        <UInput v-model="referral_link" type="text" placeholder="Code de parrainage (optionnel)" class="w-full" />
    </UFormField>

    <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>

    <USeparator class="my-4" />
    <div class="w-full flex justify-center">
        <UButton label="S'inscrire" color="primary" @click="handleSubmit" class="w-1/3 py-2" />
    </div>
</template>