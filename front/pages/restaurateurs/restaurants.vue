<script setup lang='ts'>
import type { TabsItem } from '@nuxt/ui'
import HeaderPepeat from '~/components/common/HeaderPepeat.vue';
import Restaurants from '~/components/restaurateurs/restaurants.vue';
import ArticleTile from '~/components/articles/ArticleTile.vue';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const activeTab = ref('0')
const category = ref("")
const articles = ref<Article[]>([])


const nutriscoreOptions = ref([
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' }
])

const foodCategoryOptions = ref([
  { label: 'Alcool', value: 'alcohol' },
  { label: 'Américain', value: 'american' },
  { label: 'Asiatique', value: 'asian' },
  { label: 'Barbecue', value: 'bbq' },
  { label: 'Bubble Tea', value: 'bubble_tea' },
  { label: 'Burgers', value: 'burgers' },
  { label: 'Chinois', value: 'chinese' },
  { label: 'Comfort Food', value: 'comfort' },
  { label: 'Snacking', value: 'convenience' },
  { label: 'Fast food', value: 'fast_food' },
  { label: 'Français', value: 'french' },
  { label: 'Épicerie', value: 'grocery' },
  { label: 'Halal', value: 'halal' },
  { label: 'Hawaïen', value: 'hawaiian' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Glaces', value: 'ice_cream' },
  { label: 'Indien', value: 'indian' },
  { label: 'Italien', value: 'italian' },
  { label: 'Japonais', value: 'japanese' },
  { label: 'Coréen', value: 'korean' },
  { label: 'Mexicain', value: 'mexican' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Plat à emporter', value: 'takeout' },
  { label: 'Poké', value: 'poke' },
  { label: 'Sandwich', value: 'sandwich' },
  { label: 'Fruits de mer', value: 'seafood' },
  { label: 'Spécialités', value: 'specialty' },
  { label: 'Street Food', value: 'street_food' },
  { label: 'Sushi', value: 'sushi' },
  { label: 'Thaï', value: 'thai' },
  { label: 'Vietnamien', value: 'vietnamese' },
  { label: 'Poulet frit', value: 'wings' },
])

interface Article {
  _id: string
  name: string
  price: number
  nutriscore: string
  category: string
}

interface Restaurant {
  _id: string
  nom: string
  adresse: string
  siret: string
}

// Champs du formulaire
const name = ref('')
const description = ref('')
const price = ref(0)
const nutriscore = ref('')
const available = ref(true)
const isSubmitting = ref(false)

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

const selectedRestaurant = ref<Restaurant | null>(null)

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

async function fetchArticlesByRestaurant(restaurantId: string) {
  try {
    const response = await $fetch<Article[]>(
      `http://localhost:3103/articles/restaurant/${restaurantId}`
    )
    return response
  } catch (error) {
    console.error(`Erreur pour le resto ${restaurantId} :`, error)
  }
}

async function handleSubmit(restaurantId: string) {
  isSubmitting.value = true

  try {
    const newArticle = {
      restaurant_id: restaurantId,
      name: name.value,
      description: description.value,
      price: price.value,
      category: category.value,
      nutriscore: nutriscore.value,
      available: available.value,
    }

    await $fetch('http://localhost:3103/articles/', {
      method: 'POST',
      body: newArticle,
    })

    useToast().add({
      title: 'Article créé !',
      color: 'primary',
      icon: 'i-heroicons-check-badge',
    })

    // Réinitialiser le formulaire
    name.value = ''
    description.value = ''
    price.value = 0
    nutriscore.value = ''
    available.value = true
  } catch (error) {
    useToast().add({
      title: 'Erreur lors de la création',
      color: 'error',
      icon: 'i-heroicons-x-mark',
    })
    console.error('Erreur création article :', error)
  } finally {
    isSubmitting.value = false
    await fetchArticlesByRestaurant(restaurantId)
  }
}
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

async function updateRestaurant() {
    console.log('updateRestaurant called');

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

    console.log(body);

    if (selectedRestaurant.value._id) {
        /* Mise à jour d'un restaurant existant */
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
watch(activeTab, () => {
    selectedRestaurant.value = null;
})

watch(
  () => listeRestaurants.value,
  async (restaurants) => {
    if (restaurants && restaurants.length > 0) {
      for (const r of restaurants) {
        r.articles = await fetchArticlesByRestaurant(r._id)
      }
    }
  },
  { immediate: true } // facultatif si tu veux relancer à la 1ère assignation
)
/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <HeaderPepeat/>
    <div class="flex flex-col p-4 w-full gap-4">
        <UTabs :items="items" class="w-full" color="neutral" v-model="activeTab">
            <template #restaurant="{ item }">
                <div class="flex flex-row justify-between items-center mb-4">
                    <p class="text-black text-4xl font-bold mb-2">Gérer mes restaurants</p>
                    <UButton color="primary" variant="outline"  icon="i-material-symbols-add-2-rounded" :ui="{base: 'text-lg'}" @click="selectedRestaurant = {}">Ajouter un restaurant</UButton>
                </div>

                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <div v-for="restaurant in listeRestaurants" :key="restaurant._id">
                            <Restaurants :id="restaurant._id" :nom="restaurant.nom" :adresse="restaurant.adresse" @click="selectedRestaurant = restaurant"/>
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

                            <div class="grid grid-cols-2 gap-4">
                                <UForm class="flex flex-col gap-2 items-center" :validate="validate">
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
                                </UForm>
                                <div class="flex flex-col gap-4 items-center">
                                    <NuxtImg :src="`/restaurants/thumbnails/${selectedRestaurant._id}.png`" fit="cover" class="aspect-square rounded-md"/>
                                    <UButton color="neutral" variant="outline" icon="i-heroicons-camera">Modifier l'image</UButton>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>
            </template>
            <template #plats="{ item }">
                <p class="text-black text-4xl font-bold">Gérer mes plats</p>

                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <div v-for="restaurant in listeRestaurants" :key="restaurant._id">
                            <h2 class="text-xl font-semibold">{{ restaurant.nom }}</h2>
                            <div class="flex">
                                <UCarousel
                                    v-if="restaurant.articles?.length"
                                    :items="restaurant.articles"
                                    v-slot="{ item: article }"
                                    :ui="{
                                        container: 'flex gap-4',
                                        item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
                                    }"
                                    class="w-full"
                                    >
                                    <ArticleTile
                                        :key="article._id"
                                        :title="article.name"
                                        :nutriscore="article.nutriscore"
                                        :price="article.price.toFixed(2)"
                                        :badgeText="article.nutriscore"
                                    />
                                </UCarousel>
                                <UButton
                                    icon="i-heroicons-plus"
                                    color="primary"
                                    variant="soft"
                                    @click="selectedRestaurant = restaurant"
                                    >
                                </UButton>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedRestaurant" class="w-3/5">
                        <UCard>
                            <template #header>
                                <div class="flex flex-row justify-between">
                                    <p class="font-bold text-2xl">Créer un article</p>
                                    <UButton color="neutral" variant="ghost"  icon="i-fluent-emoji-high-contrast-cross-mark" @click="selectedRestaurant = null"/>
                                </div>
                            </template>
                            <form @submit.prevent="handleSubmit(selectedRestaurant._id)" class="flex flex-col gap-4">
                                <UInput v-model="name" placeholder="Nom de l'article" label="Nom" required />
                                <UTextarea v-model="description" placeholder="Description" label="Description" />
                                <UInput v-model="price" label="Prix (€)" type="number" min="0" required />
                                <USelect
                                v-model="category"
                                label="Catégorie"
                                :items="foodCategoryOptions"
                                placeholder="Choisir une catégorie"
                                required />
                                <USelect
                                v-model="nutriscore"
                                label="Nutri-Score"
                                :items="nutriscoreOptions"
                                placeholder="Choisir un score"
                                />
                                <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium">Image</label>

                                <!-- Bouton stylé -->
                                <label
                                    for="image-upload"
                                    class="inline-block px-4 py-2 border border-gray-300 text-sm rounded cursor-pointer hover:bg-gray-100 bg-white text-gray-700 w-fit"
                                >
                                    📸 Choisir une image
                                </label>

                                <!-- Input invisible -->
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    class="hidden"
                                />
                                </div>
                                <UCheckbox v-model="available" label="Disponible" />
                                <div class="flex justify-end">
                                    <UButton
                                        type="submit"
                                        :loading="isSubmitting"
                                        color="primary"
                                        size="md"
                                        class="px-4 py-2"
                                    >
                                        Créer
                                    </UButton>
                                </div>
                            </form>
                        </UCard>
                    </div>
                </div>
            </template>
        </UTabs>
    </div>
</template>