<script setup lang="ts">
import { ref } from 'vue';
import type { TabsItem } from '@nuxt/ui'
import { useUserStore } from '~/stores/userStore';

const { userInfo } = useUserStore();

const toast = useToast();

const id:  Ref<string> = ref(userInfo.id);
const last_name:  Ref<string> = ref(userInfo.lastName);
const first_name:  Ref<string> = ref(userInfo.firstName);
const city:  Ref<string> = ref(userInfo.city);
const postal_code:  Ref<string> = ref(userInfo.postalCode);
const address:  Ref<string> = ref(userInfo.address);
const email:  Ref<string> = ref(userInfo.email);
const phone:  Ref<string> = ref(userInfo.phone);
const is_suspended: Ref<boolean> = ref(userInfo.is_suspended);

const makeAClaim: Ref<string> = ref('');

const isSubmitted = ref(false);
const errorMessage = ref<string | null>(null);

const items: TabsItem[] = [
    { label: 'Mon compte', icon: 'i-lucide-user' },
    { label: 'Changer de rôle', icon: 'i-ic:outline-question-answer' }
];

const formFieldsClient = ref([
    { label: 'Nom', model: last_name, type: 'text', placeholder: 'Votre nom' },
    { label: 'Prénom', model: first_name, type: 'text', placeholder: 'Votre prénom' },
    { label: 'Ville', model: city, type: 'text', placeholder: 'Votre ville' },
    { label: 'Code postal', model: postal_code, type: 'text', placeholder: 'Votre code postal' },
    { label: 'Adresse de domicile', model: address, type: 'text', placeholder: '1 rue de Paris' },
    { label: 'Adresse email', model: email, type: 'email', placeholder: 'example.ex@example.fr' },
    { label: 'Téléphone', model: phone, type: 'text', placeholder: '+33 6 66 66 66 66' },
]);

async function updateUtilisateur() {
    isSubmitted.value = true;
    errorMessage.value = null;

    if (!last_name.value || !first_name.value || !city.value || !postal_code.value || !address.value || !email.value || !phone.value) {
        return;
    }

    const profilData = {
        id: id.value,
        last_name: last_name.value,
        first_name: first_name.value,
        city: city.value,
        postal_code: postal_code.value,
        address: address.value,
        email: email.value,
        phone: phone.value
    };

    try {
        await $fetch("/api/profil", {
            method: "PUT",
            body: profilData,
            headers: {
                "Content-Type": "application/json"
            }
        });

        toast.add({
            title: "Profil modifié",
            description: "Vos changements ont été appliqués !"
        });
    } catch (error) {
        errorMessage.value = "Erreur lors de la modification.";
        console.error("Erreur updateUtilisateur:", error);
    }
}

async function disableAccount() {
    try {
        const newStatus = !is_suspended.value;

        await $fetch("/api/profil", {
            method: "PUT",
            body: {
                id: id.value,
                is_suspended: newStatus
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        is_suspended.value = newStatus;

        toast.add({
            title: newStatus ? "Compte désactivé" : "Compte réactivé",
            description: newStatus
                ? "Votre compte a été suspendu avec succès."
                : "Votre compte est maintenant actif."
        });
    } catch (error) {
        errorMessage.value = "Une erreur est survenue lors de la mise à jour du statut.";
    }
}
</script>

<template>
    <UContainer>
        <UTabs :items="items" class="w-full">
            <template #content="{ item }">
                <!--    PARTIE ÉDITEUR DE PROFIL    -->
                <div v-if="item.label === 'Mon compte'" class="min-h-max flex items-center justify-center py-10">
                    <UCard class="w-full max-w-2xl p-4">
                        <h2 class="text-xl mb-4">Code de parrainage :
                            <span class="font-semibold text-2xl px-2">{{ userInfo.referral_link }}</span>
                        </h2>
                        <h2 class="text-xl mb-2">Vous êtes :
                            <span class="font-semibold text-2xl px-2">{{ userInfo.role }}</span>
                        </h2>
                        <USeparator class="my-4" />

                        <h2 class="text-2xl font-semibold mb-6 text-center">Modifier votre profil</h2>

                        <!-- Nom et Prénom sur la même ligne-->
                        <div class="flex space-x-4 mb-4">
                            <div v-for="(field, index) in formFieldsClient.slice(0, 2)" :key="index" class="w-1/2">
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
                            <div v-for="(field, index) in formFieldsClient.slice(2, 4)" :key="index" class="w-1/2">
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
                        <div v-for="(field, index) in formFieldsClient.slice(4)" :key="index" class="w-full mb-4">
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
                            <UButton :label="is_suspended ? 'Réactiver le compte' : 'Désactiver le compte'"
                                :color="is_suspended ? 'primary' : 'error'"
                                :variant="is_suspended ? 'outline' : 'solid'" class="w-1/2 py-2"
                                @click="disableAccount" />
                            <UButton label="Sauvegarder" @click="updateUtilisateur" color="primary"
                                class="w-1/2 py-2" />
                        </div>
                    </UCard>
                </div>

                <!--    PARTIE RÉCLAMATION    -->
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
                            <UTextarea class="w-full" v-model="makeAClaim" :rows="12"
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