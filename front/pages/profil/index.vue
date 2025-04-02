<script setup lang="ts">
import { ref } from 'vue';
import HeaderPepeat from "~/components/common/HeaderPepeat.vue";
import type { TabsItem } from '@nuxt/ui'

const last_name: Ref<string> = ref('');
const first_name: Ref<string> = ref('');
const city: Ref<string> = ref('');
const postal_code: Ref<string> = ref('');
const address: Ref<string> = ref('');
const email: Ref<string> = ref('');
const phone: Ref<string> = ref('');
const complaint: Ref<string> = ref('');

const isSubmitted = ref(false);
const errorMessage = ref<string | null>(null);

const items: TabsItem[] = [
    { label: 'Mon compte', icon: 'i-lucide-user' },
    { label: 'Changer de rôle', icon: 'i-ic:outline-question-answer' }
];

const formFields = ref([
    { label: 'Nom', model: last_name, type: 'text', placeholder: 'Votre nom' },
    { label: 'Prénom', model: first_name, type: 'text', placeholder: 'Votre prénom' },
    { label: 'Ville', model: city, type: 'text', placeholder: 'Votre ville' },
    { label: 'Code postal', model: postal_code, type: 'text', placeholder: 'Votre code postal' },
    { label: 'Adresse de domicile', model: address, type: 'text', placeholder: '1 rue de Paris' },
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Téléphone', model: phone, type: 'text', placeholder: '+33 6 66 66 66 66' },
]);

const deleteAccount = () => {
    console.log("compte supprimé");
};
</script>

<template>
    <UContainer>
        <UTabs :items="items" class="w-full">
            <template #content="{ item }">
                <!-- Partie éditeur de profil -->
                <div v-if="item.label === 'Mon compte'" class="min-h-max flex items-center justify-center py-10">
                    <UCard class="w-full max-w-2xl p-6">
                        <h2 class="text-2xl font-semibold mb-6 text-center">Modifier votre profil</h2>

                        <!-- Nom et Prénom sur la même ligne-->
                        <div class="flex space-x-4 mb-4">
                            <div v-for="(field, index) in formFields.slice(0, 2)" :key="index" class="w-1/2">
                                <UFormField :label="field.label">
                                    <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder"
                                        class="w-full" />
                                    <template #hint>
                                        <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ
                                            obligatoire</p>
                                    </template>
                                </UFormField>
                            </div>
                        </div>

                        <!-- Ville et Code Postal sur la même ligne -->
                        <div class="flex space-x-4 mb-4">
                            <div v-for="(field, index) in formFields.slice(2, 4)" :key="index" class="w-1/2">
                                <UFormField :label="field.label">
                                    <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder"
                                        class="w-full" />
                                    <template #hint>
                                        <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ
                                            obligatoire</p>
                                    </template>
                                </UFormField>
                            </div>
                        </div>

                        <!-- Adresse, Email, Téléphone -->
                        <div v-for="(field, index) in formFields.slice(4)" :key="index" class="w-full mb-4">
                            <UFormField :label="field.label">
                                <UInput v-model="field.model" :type="field.type" :placeholder="field.placeholder"
                                    class="w-full" />
                                <template #hint>
                                    <p v-if="isSubmitted && !field.model" class="text-red-500 text-sm">Champ
                                        obligatoire</p>
                                </template>
                            </UFormField>
                        </div>

                        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>

                        <USeparator class="my-4" />
                        <div class="flex justify-end space-x-4">
                            <UButton label="Supprimer le compte" color="error" class="w-1/2 py-2" @click="deleteAccount" />
                            <UButton label="Sauvegarder" color="primary" class="w-1/2 py-2" />
                        </div>
                    </UCard>
                </div>

                <!-- Partie Réclamation -->
                <div v-else class="flex justify-center py-10">
                    <UCard class="w-full max-w-2xl p-6">
                        <h2 class="text-2xl font-semibold text-center mb-6">Faire une réclamation</h2>
                        <p class="text-gray-600 text-sm mb-4 text-center">
                            Cette zone permet d'envoyer un message au service commercial pour demander un changement
                            de rôle (client,
                            livreur ou restaurateur).
                            Veuillez renseigner des informations importantes pour faciliter ce changement.
                        </p>
                        <UFormField label="Votre message">
                            <UTextarea class="w-full" v-model="complaint" :rows="12"
                                placeholder="Expliquez votre demande..." />
                        </UFormField>

                        <USeparator class="my-4" />
                        <div class="w-full flex justify-center">
                            <UButton label="Envoyer" color="primary" class="w-1/3 py-2" />
                        </div>
                    </UCard>
                </div>
            </template>
        </UTabs>
    </UContainer>
</template>