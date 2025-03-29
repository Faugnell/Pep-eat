<script setup lang='ts'>
import type { TabsItem } from '@nuxt/ui'
import HeaderPepeat from '~/components/common/HeaderPepeat.vue';
import Restaurants from '~/components/restaurateurs/restaurants.vue';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const {
    data : listeRestaurants,
    status,
    error
} = await useAsyncData(
    'liste-restaurants',
    () =>
        $fetch(`http://localhost:3101/restaurants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            retry: 3,
            retryDelay: 1000,
        }).then((response) => {
            if (response.ok) {
                return response.data;
            } else {
                throw new Error('Error while fetching restaurants');
            }
        })
);

const selectedRestaurant = ref(null);

const items = ref<TabsItem[]>([
    {
        label: 'Restaurants',
        icon: 'i-ion-storefront-outline',
        slot: 'restaurant' as const
    },
    {
        label: 'Plats',
        icon: 'i-game-icons-meal',
        slot: 'plats' as const
    }
]);

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
function validate() {
    const errors = [];

    if (!selectedRestaurant.value.nom) errors.push({name: 'nom', message: 'Nom is required'});
    if (!selectedRestaurant.value.adresse) errors.push({name: 'adresse', message: 'Adresse is required'});
    if (!selectedRestaurant.value.siret) errors.push({name: 'siret', message: 'SIRET is required'});
    if (!selectedRestaurant.value.type_cuisine) errors.push({name: 'type_cuisine', message: 'Type de cuisine is required'});

    return errors;
}

function handleImageUpdate(event: Event) {
    const fileReader = new FileReader();
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    fileReader.onloadend = () => {
        selectedRestaurant.value.updatedImage = fileReader.result as string;
        selectedRestaurant.value.image = fileReader.result as string; // Mettre à jour l'image du restaurant
    };

    /* Lire le fichier en tant que Data URL (base64) */
    fileReader.readAsDataURL(file);
}

async function updateRestaurant() {

    if (!selectedRestaurant.value) return;

    const body = {
        nom: selectedRestaurant.value.nom,
        adresse: selectedRestaurant.value.adresse,
        siret: selectedRestaurant.value.siret,
        description: selectedRestaurant.value.description,
        telephone: selectedRestaurant.value.telephone,
        horaires: selectedRestaurant.value.horaires,
        type_cuisine: selectedRestaurant.value.type_cuisine,
        sponsorise: selectedRestaurant.value.sponsorise
    };

    if (selectedRestaurant.value._id) {
        /* Mise à jour d'un restaurant existant */

        /* Si l'image du restaurant a été modifiée, on l'envoie au serveur */
        if (selectedRestaurant.value.updatedImage) {
            const formData = new FormData();
            formData.append('buffer', selectedRestaurant.value.image);

            const imageResponse = await $fetch(`http://localhost:3107/medias/${selectedRestaurant.value.id_media ?? ''}`, {
                method: selectedRestaurant.value.id_media ? 'PUT' : 'POST', // PUT si l'image existe déjà, sinon POST
                body: formData
            });

            if (imageResponse.ok) {
                selectedRestaurant.value.id_media = imageResponse.data._id; // Mettre à jour l'ID de l'image dans le restaurant
                body.id_media = imageResponse.data._id; // Ajouter l'ID de l'image au corps de la requête
                delete selectedRestaurant.value.updatedImage; // Supprimer le champ updatedImage du restaurant
            } else {
                useToast().add({
                    title: 'Erreur',
                    description: 'Une erreur est survenue lors de la mise à jour de l\'image.',
                    color: 'error'
                });
            }
        }

        const response = await $fetch(`http://localhost:3101/restaurants/${selectedRestaurant.value._id}`, {
            method: 'PUT',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            listeRestaurants.value.splice(
                listeRestaurants.value.findIndex((restaurant) => restaurant._id === selectedRestaurant.value._id),
                1,
                selectedRestaurant.value
            );
            selectedRestaurant.value = null;

            useToast().add({
                title: 'Restaurant mis à jour',
                description: 'Le restaurant a été mis à jour avec succès.'
            });
        } else {
            useToast().add({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la mise à jour du restaurant.',
                color: 'error'
            });
        }
    } else {
        /* Création d'un nouveau restaurant */
        const response = await $fetch(`http://localhost:3101/restaurants`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            useToast().add({
                title: 'Restaurant créé',
                description: 'Le restaurant a été créé avec succès.'
            });
        } else {
            useToast().add({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la création du restaurant.',
                color: 'error'
            });
        }
    }
}

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */
watch(selectedRestaurant, (newValue) => {
    console.log(newValue, newValue.image);
});

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <HeaderPepeat/>
    <div class="flex flex-col p-4 w-full gap-4">
        <UTabs :items="items" class="w-full" color="neutral">
            <template #restaurant="{ item }">
                <div class="flex flex-row justify-between items-center mb-4">
                    <p class="text-black text-4xl font-bold mb-2">Gérer mes restaurants</p>
                    <UButton color="primary" variant="outline"  icon="i-material-symbols-add-2-rounded" :ui="{base: 'text-lg'}" @click="selectedRestaurant = {insertion: true}">Ajouter un restaurant</UButton>
                </div>

                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <div v-for="restaurant in listeRestaurants" :key="restaurant.nom">
                            <Restaurants :id="restaurant._id" :nom="restaurant.nom" :adresse="restaurant.adresse" :image="restaurant.image" @click="selectedRestaurant = restaurant"/>
                        </div>
                    </div>
                    <div v-if="selectedRestaurant" class="w-3/5">
                        <UCard>
                            <template #header>
                                <div class="flex flex-row justify-between">
                                    <p class="font-bold text-2xl">{{ selectedRestaurant.nom }}</p>
                                    <UButton color="neutral" variant="ghost"  icon="i-fluent-emoji-high-contrast-cross-mark" @click="selectedRestaurant = null"/>
                                </div>
                            </template>

                            <UForm class="grid grid-cols-2 gap-4" :validate="validate" enctype="multipart/form-data">
                                <div class="flex flex-col gap-2 items-center">
                                    <UFormField label="Nom" class="w-full" name="nom">
                                        <UInput v-model="selectedRestaurant.nom" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Description" class="w-full" autoresize name="description">
                                        <UInput v-model="selectedRestaurant.description" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="SIRET" class="w-full" name="siret">
                                        <UInput v-model="selectedRestaurant.siret" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Adresse" class="w-full" name="adresse">
                                        <UInput v-model="selectedRestaurant.adresse" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Téléphone" class="w-full" name="telephone">
                                        <UInput v-model="selectedRestaurant.telephone" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Horaires" class="w-full" name="horaires">
                                        <UInput v-model="selectedRestaurant.horaires" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Type de cuisine" class="w-full" name="type_cuisine">
                                        <UInput v-model="selectedRestaurant.type_cuisine" type="text" class="w-full"/>
                                    </UFormField>
                                    <UFormField label="Sponsorisé" class="w-full" name="sponsorise">
                                        <UCheckbox v-model="selectedRestaurant.sponsorise" class="w-full"/>
                                    </UFormField>
                                    <UButton color="primary" type="submit" @click="updateRestaurant">Enregistrer</UButton>
                                </div>
                                <div v-if="!selectedRestaurant?.insertion" class="flex flex-col gap-4 items-center">
                                    <NuxtImg :src="`data:image/png;base64,${selectedRestaurant.image}`" fit="cover" class="aspect-square rounded-md"/>
                                    <img :src="`data:image/png;base64,${selectedRestaurant.image}`" alt="restaurant" class="aspect-square rounded-md"/>
                                    <UInput type="file" id="image" name="image" accept="image/*" @change="handleImageUpdate" label="test"/>
                                    <label for="image" class="cursor-pointer">
                                        <UButton color="primary" variant="outline" icon="i-heroicons-camera">Modifier l'image</UButton>
                                    </label>
                                </div>
                            </UForm>
                            <pre class="scroll-auto">{{ selectedRestaurant.image }}</pre>
                        </UCard>
                    </div>
                </div>
            </template>
            <template #plats="{ item }">
            </template>
        </UTabs>
    </div>
</template>