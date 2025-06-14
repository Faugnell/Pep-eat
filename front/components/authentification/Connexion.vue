<script setup lang="ts">
import { ref } from 'vue';
import type { ApiResponse, FormFieldLogin, Data } from './types';
import { useUserStore } from '~/stores/userStore';
import { usePanierStore } from '~/stores/panierStore';

const { setUserInfo } = useUserStore();
const { setUserId } = usePanierStore();

const email = ref<string>('');
const password = ref<string>('');

const formFields = ref<FormFieldLogin[]>([
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Mot de passe', model: password, type: 'password', placeholder: 'Mot de passe' },
]);

const isSubmitted = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const handleLogIn = async (): Promise<void> => {
    isSubmitted.value = true;
    errorMessage.value = null;

    if (!email.value || !password.value) {
        return;
    }

    try {
        const data = await $fetch<ApiResponse<Data>>("/api/authentification/connexion", {
            method: "POST",
            body: {
                email: email.value,
                password: password.value
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (data.ok) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            setUserInfo({
                id: data.data.user._id,
                firstName: data.data.user.first_name,
                lastName: data.data.user.last_name,
                role: data.data.user.role,
                city: data.data.user.city,
                postalCode: data.data.user.postal_code,
                address: data.data.user.address,
                email: data.data.user.email,
                phone: data.data.user.phone,
                referral_link: data.data.user.referral_link,
                is_suspended: data.data.user.is_suspended
            });

            setUserId(data.data.user._id);
        } else {
            useToast().add({
                title: "Erreur lors de la connexion",
                description: data.message,
                color: "error"
            });
        }
    } catch (error) {
        errorMessage.value = "Erreur lors de la connexion.";
    }
};
</script>

<template>
    <div class="max-w-md mx-auto p-4">
        <!-- Champs du formulaire -->
        <div v-for="(field, index) in formFields" :key="index" class="w-full mb-4">
            <UFormField :label="field.label" required>
                <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder" class="w-full" />
                <template #hint>
                    <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
                </template>
            </UFormField>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>

        <USeparator class="my-4" />
        <div class="w-full flex justify-center">
            <UButton label="Se connecter" color="primary" @click="handleLogIn" class="w-1/3 text-center" />
        </div>
    </div>
</template>