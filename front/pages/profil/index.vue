<script setup lang="ts">
import { ref } from 'vue';

const last_name = ref('');
const first_name = ref('');
const city = ref('');
const postal_code = ref('');
const address = ref('');
const email = ref('');
const phone = ref('');

const formFields = ref([
    { label: 'Nom', model: last_name, type: 'text', placeholder: 'Votre nom' },
    { label: 'Prénom', model: first_name, type: 'text', placeholder: 'Votre prénom' },
    { label: 'Ville', model: city, type: 'text', placeholder: 'Votre ville' },
    { label: 'Code postal', model: postal_code, type: 'text', placeholder: 'Votre code postal' },
    { label: 'Adresse de domicile', model: address, type: 'text', placeholder: '1 rue de Paris' },
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Téléphone', model: phone, type: 'text', placeholder: '+33 6 66 66 66 66' },
]);

const isSubmitted = ref(false);
const errorMessage = ref<string | null>(null);

// const handleSubmit = async () => {
//     isSubmitted.value = true;
//     errorMessage.value = null;

//     // Vérifie que tous les champs sont remplis
//     if (!last_name.value || !first_name.value || !role.value || !city.value || !postal_code.value || !address.value || !email.value || !phone.value) {
//         return;
//     }

//     const userData = {
//         last_name: last_name.value,
//         first_name: first_name.value,
//         role: role.value,
//         city: city.value,
//         postal_code: postal_code.value,
//         address: address.value,
//         email: email.value,
//         phone: phone.value,
//     };

//     try {
//         const response = await fetch("http://localhost:3104/update-profile", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData)
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             errorMessage.value = data.message;
//             return;
//         }

//         alert("Profil mis à jour avec succès !");
//     } catch (error) {
//         errorMessage.value = "Erreur lors de la mise à jour.";
//     }
// };
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <UCard class="max-w-xl w-full p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Modifier votre profil</h2>

            <!-- Nom et Prénom sur la même ligne-->
            <div class="flex space-x-4 mb-4">
                <div v-for="(field, index) in formFields.slice(0, 2)" :key="index" class="w-1/2">
                    <UFormField :label="field.label" required>
                        <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder"
                            class="w-full" />
                        <template #hint>
                            <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
                        </template>
                    </UFormField>
                </div>
            </div>

            <!-- Ville et Code Postal sur la même ligne -->
            <div class="flex space-x-4 mb-4">
                <div v-for="(field, index) in formFields.slice(2, 4)" :key="index" class="w-1/2">
                    <UFormField :label="field.label" required>
                        <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder"
                            class="w-full" />
                        <template #hint>
                            <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ obligatoire</p>
                        </template>
                    </UFormField>
                </div>
            </div>

            <!-- Adresse, Email, Téléphone -->
            <div v-for="(field, index) in formFields.slice(4)" :key="index" class="w-full mb-4">
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
                <UButton label="Sauvegarder" color="primary" class="w-1/3 py-2" />
            </div>
        </UCard>
    </div>
</template>