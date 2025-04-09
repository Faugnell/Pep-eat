<script setup lang='ts'>
import type { TabsItem } from '@nuxt/ui'
import type { Restaurant } from '~/utils/types/Restaurant.ts';
import type { Article } from '~/utils/types/Article.ts';
import type { Media } from '~/utils/types/Media.ts';
import type { Response } from '~/utils/types/Response';
import Restaurants from '~/components/restaurateurs/restaurants.vue';
import ArticleTile from '~/components/articles/ArticleTile.vue';
import { useUserStore } from '~/stores/userStore';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
    getId
} = useUserStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const userId = computed(() => getId());

const activeTab = ref('0');
let showDeleteConfirm = ref(false);


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

// Champs du formulaire
const name = ref('')
const description = ref('')
const price = ref(0)
const nutriscore = ref('')
const available = ref(true)
const isSubmitting = ref(false)

const listeRestaurants = ref<Restaurant[]>([]);

const selectedRestaurant = ref<Restaurant | null>(null)
const selectedArticle = ref<Article | null>(null)

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

const itemsRestaurant = computed(() => listeRestaurants.value.map(restaurant => ({
  label: restaurant.nom,
  slot: restaurant._id as const,
  content: ''
})) satisfies AccordionItem[])
/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
/**
 * Fonction pour récupérer les articles d'un restaurant
 * @param {string} restaurantId - L'ID du restaurant
 * @return {Promise<Article[]>} - La liste des articles du restaurant
 * @throws {Error} - Si une erreur se produit lors de la récupération des articles
 */
async function fetchArticlesByRestaurant(restaurantId: string) {
  try {
    const response = await $fetch<Article[]>(
      `http://localhost:3103/articles/restaurant/${restaurantId}`
    )
    return response
  } catch (error) {
    // console.error(`Erreur pour le resto ${restaurantId} :`, error)
  }
}

/**
 * Fonction pour supprimer un article
 * @returns {Promise<void>}
 * @throws {Error} - Si une erreur se produit lors de la suppression de l'article
 */
async function deleteArticle() {
  if (!selectedArticle.value?._id) return;

    const id = selectedArticle.value._id;

  try {
    await $fetch(`http://localhost:3103/articles/${id}`, {
      method: 'DELETE',
    });

    const restaurant = listeRestaurants.value.find((resto) => resto._id == selectedArticle.value.restaurant_id);
    if (!restaurant) {
        return
    }
    restaurant.articles = restaurant.articles.filter((article) => article._id != selectedArticle.value._id);

    showDeleteConfirm = ref(false);
    selectedArticle.value = null;

    useToast().add({
      title: 'Article supprimé',
      icon: 'i-heroicons-check-badge',
      color: 'primary'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’article :', error);
    useToast().add({
      title: 'Erreur',
      description: 'Impossible de supprimer cet article',
      color: 'error',
      icon: 'i-heroicons-x-mark'
    });
  }
}

function validate() {
    const errors = [];

    if (!selectedRestaurant.value) return errors;

    if (!selectedRestaurant.value.nom) errors.push({name: 'nom', message: 'Nom is required'});
    if (!selectedRestaurant.value.adresse) errors.push({name: 'adresse', message: 'Adresse is required'});
    if (!selectedRestaurant.value.siret) errors.push({name: 'siret', message: 'SIRET is required'});
    if (!selectedRestaurant.value.type_cuisine) errors.push({name: 'type_cuisine', message: 'Type de cuisine is required'});

    return errors;
}

function validateArticle() {
  const errors = [];
  
  if (!selectedArticle.value) return errors;

  const article = selectedArticle.value;
  if (!article.name) errors.push({name: 'name', message: 'Nom is required'});
  if (!article.description) errors.push({name: 'description', message: 'Description is required'});
  if (!article.price) errors.push({name: 'price', message: 'Price is required'});
  if (!article.category) errors.push({name: 'category', message: 'Category is required'});
  if (!article.nutriscore) errors.push({name: 'nutriscore', message: 'Nutri-Score is required'});
  if (article.price < 0) errors.push({name: 'price', message: 'Price must be greater than or equal to 0'});
  if (article.price > 1000) errors.push({name: 'price', message: 'Price must be less than or equal to 1000'});
  if (!article.available) errors.push({name: 'available', message: 'Available is required'});

  return errors;
}

function handleArticleImageUpdate(event: Event) {
    const fileReader = new FileReader();
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    fileReader.onloadend = () => {
        if (!selectedArticle.value) return;

        selectedArticle.value.updatedImage = fileReader.result as string;
        selectedArticle.value.image = fileReader.result as string;
    };

    fileReader.readAsDataURL(file);
}

function handleImageUpdate(event: Event) {
    const fileReader = new FileReader();
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    fileReader.onloadend = () => {
        if (!selectedRestaurant.value) return;

        selectedRestaurant.value.updatedImage = fileReader.result as string;
        selectedRestaurant.value.image = fileReader.result as string; // Mettre à jour l'image du restaurant
    };

    /* Lire le fichier en tant que Data URL (base64) */
    fileReader.readAsDataURL(file);
}

/**
 * Fonction pour mettre à jour ou créer un article
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur se produit lors de la mise à jour ou de la création de l'article
 */
async function updateArticle() {
  
  if (!selectedArticle.value) return;

  const body = {
    restaurant_id: selectedArticle.value.restaurant_id,
    name: selectedArticle.value.name,
    description: selectedArticle.value.description,
    price: selectedArticle.value.price,
    category: selectedArticle.value.category,
    nutriscore: selectedArticle.value.nutriscore,
    available: selectedArticle.value.available
  };

  try {
    if (selectedArticle.value._id) {
      /* Mise à jour d'un article existant */

      /* Si l'image de l'article a été modifiée, on l'envoie au serveur */
      if (selectedArticle.value.updatedImage) {
        const formData = new FormData();
        formData.append('buffer', selectedArticle.value.image);

        const imageResponse: Response<Media> = await $fetch<Response<Media>>(`/api/medias/${selectedArticle.value.id_media ?? ''}`, {
          method: selectedArticle.value.id_media ? 'PUT' : 'POST', // PUT si l'image existe déjà, sinon POST
          body: formData
        });

        if (imageResponse.ok && imageResponse.data) {
          selectedArticle.value.id_media = imageResponse.data._id; // Mettre à jour l'ID de l'image dans le restaurant
            body.id_media = imageResponse.data._id; // Ajouter l'ID de l'image au corps de la requête
            delete selectedArticle.value.updatedImage; // Supprimer le champ updatedImage du restaurant
        } else {
          useToast().add({
            title: 'Erreur',
            description: 'Une erreur est survenue lors de la mise à jour de l\'image.',
            color: 'error',
            icon: 'i-heroicons-x-mark'
          });
        }
      }

      const response: Response<Article> = await $fetch<Response<Article>>(`/api/articles/${selectedArticle.value._id}`, {
        method: 'PUT',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const restaurant = listeRestaurants.value.find((resto) => resto._id == selectedArticle.value.restaurant_id);
        if (!restaurant) {
            return
        }

        const updatedArticle = response.data;

        // Supprime l'ancien s’il existe (en cas de mise à jour)
        restaurant.articles = restaurant.articles.filter(
          (a) => a._id !== updatedArticle._id
        );

        // Ajoute le nouvel article
        restaurant.articles.push(updatedArticle);

        useToast().add({
          title: 'Article modifié',
          icon: 'i-heroicons-check-badge',
          color: 'primary'
        });
        } else {
          useToast().add({
            title: 'Erreur',
            description: 'Une erreur est survenue lors de la mise à jour du plat.',
            color: 'error',
            icon: 'i-heroicons-x-mark'
          });
        }
    } else {
        /* Création d'un nouveau article */
        const response: Response<Article> = await $fetch(`/api/articles`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('response', response);

        if (response.ok && response.data) {
          const restaurant = listeRestaurants.value.find((resto) => resto._id == selectedArticle.value.restaurant_id);
          if (!restaurant) {
              return
          }
          restaurant.articles = restaurant.articles.filter((article) => article._id != selectedArticle.value._id);

          restaurant.articles.push(updatedArticle);

          useToast().add({
              title: 'Article créé',
              description: 'Le plat a été créé avec succès.',
              icon: 'i-heroicons-check-badge',
              color: 'primary'
          });
        } else {
            useToast().add({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la création du restaurant.',
                color: 'error',
                icon: 'i-heroicons-x-mark'
            });
        }
    }
  } catch (error) {
    console.error('Erreur lors de la modification de l’article :', error);
    useToast().add({
      title: 'Erreur',
      description: 'Impossible de modifier cet article',
      color: 'error',
      icon: 'i-heroicons-x-mark'
    });
  }
}

async function updateRestaurant() {
    if (!selectedRestaurant.value) return;

    if (!userId.value) return;

    const body = {
        nom: selectedRestaurant.value.nom,
        adresse: selectedRestaurant.value.adresse,
        siret: selectedRestaurant.value.siret,
        description: selectedRestaurant.value.description,
        telephone: selectedRestaurant.value.telephone,
        horaires: selectedRestaurant.value.horaires,
        type_cuisine: selectedRestaurant.value.type_cuisine,
        sponsorise: selectedRestaurant.value.sponsorise,
        id_proprietaire: userId.value
    };

    if (selectedRestaurant.value._id) {
        /* Mise à jour d'un restaurant existant */

        /* Si l'image du restaurant a été modifiée, on l'envoie au serveur */
        if (selectedRestaurant.value.updatedImage) {
            const formData = new FormData();
            formData.append('buffer', selectedRestaurant.value.image);

            const imageResponse: Response<Media> = await $fetch<Response<Media>>(`/api/medias/${selectedRestaurant.value.id_media ?? ''}`, {
                method: selectedRestaurant.value.id_media ? 'PUT' : 'POST', // PUT si l'image existe déjà, sinon POST
                body: formData
            });

            if (imageResponse.ok && imageResponse.data) {
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

        const response: Response<Restaurant> = await $fetch<Response<Restaurant>>(`/api/restaurants/${selectedRestaurant.value._id}`, {
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
        const response: Response<Restaurant> = await $fetch(`/api/restaurants`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok && response.data) {
            listeRestaurants.value.push(response.data);

            selectedRestaurant.value = response.data;

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
onMounted(async () => {
    const response = await $fetch<Response<Restaurant[]>>(`/api/restaurants/user/${userId.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        retry: 3,
        retryDelay: 1000
    });

    if (response.ok && response.data) {
        listeRestaurants.value = response.data;
    } else {
        console.error('Error while fetching restaurants:', response.error);
    }
});
</script>

<template>
    <div class="flex flex-col p-4 w-full gap-4">
        <UTabs :items="items" class="w-full" color="neutral" v-model="activeTab">
            <template #restaurant="{ item }">
                <div class="flex flex-row justify-between items-center mb-4">
                    <p class="text-black text-4xl font-bold mb-2">Gérer mes restaurants</p>
                    <UButton color="primary" variant="outline"  icon="i-material-symbols-add-2-rounded" :ui="{base: 'text-lg'}" @click="selectedRestaurant = {insertion: true}">Ajouter un restaurant</UButton>
                </div>

                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <div v-for="restaurant in listeRestaurants" :key="restaurant._id">
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
                                    <NuxtImg :src="selectedRestaurant.image" fit="cover" class="aspect-square rounded-md"/>
                                    <UInput type="file" id="image" name="image" accept="image/*" @change="handleImageUpdate" placeholder="Modifier l'image"/>
                                </div>
                            </UForm>
                        </UCard>
                    </div>
                </div>
            </template>
            <template #plats="{ item }">
                <p class="text-black text-4xl font-bold">Gérer mes plats</p>
                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-4 w-full">
                        <UAccordion :items="itemsRestaurant" multiple>
                            <template
                            v-for="restaurant in listeRestaurants"
                            :key="restaurant._id"
                            #[restaurant._id]="{ item }"
                            >
                            <div class="relative pt-10">
                                <UButton color="primary" variant="outline"  icon="i-material-symbols-add-2-rounded" :ui="{base: 'text-lg'}" @click="selectedArticle = {insertion: true, restaurant_id: restaurant._id}">Ajouter un plat</UButton>
                                <!-- Grille d'articles -->
                                <div
                                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-5 gap-4 m-2"
                                >
                                <ArticleTile
                                    v-for="article in restaurant.articles"
                                    :key="article._id"
                                    :image-url="article.image"
                                    :title="article.name"
                                    :nutriscore="article.nutriscore"
                                    :price="article.price ? article.price.toFixed(2) : '0.00'"
                                    :badgeText="article.nutriscore"
                                    @click="selectedArticle = article"
                                />
                                </div>
                            </div>
                            </template>
                        </UAccordion>
                    </div>
                    <div v-if="selectedArticle" class="w-3/5">
                        <UCard>
                            <template #header>
                                <div class="flex flex-row justify-between">
                                    <p class="font-bold text-2xl"> {{ selectedArticle.insertion ? 'Créer un article' : 'Modifier ' + selectedArticle.name }}</p>
                                    <UButton color="neutral" variant="ghost"  icon="i-fluent-emoji-high-contrast-cross-mark" @click="selectedArticle = null"/>
                                </div>
                            </template>

                            <UForm class="grid grid-cols-2 gap-4" :validate="validateArticle" enctype="multipart/form-data">
                                <div class="flex flex-col gap-2">
                                    <UFormField label="Nom" class="w-full" name="nom">
                                        <UInput v-model="selectedArticle.name" type="text" class="w-full"/>
                                    </UFormField>
                                    <UTextarea v-model="selectedArticle.description" label="Description" class="w-full"/>
                                    <UInput v-model="selectedArticle.price" label="Prix (€)" type="number" min="0" step="0.01" required class="w-full"/>
                                    <USelect
                                        v-model="selectedArticle.category"
                                        label="Catégorie"
                                        :items="foodCategoryOptions"
                                        placeholder="Choisir une catégorie"
                                        required
                                        class="w-full"
                                    />
                                    <USelect
                                        v-model="selectedArticle.nutriscore"
                                        label="Nutri-Score"
                                        :items="nutriscoreOptions"
                                        placeholder="Choisir un score"
                                        class="w-full"
                                    />
                                    <div class="flex">
                                        <UCheckbox v-model="selectedArticle.available" label="Disponible" />
                                    </div>
                                    <UButton color="primary" type="submit" @click="updateArticle">Enregistrer</UButton>
                                    <UButton
                                        v-if="!selectedArticle.insertion"
                                        color="error"
                                        variant="outline"
                                        icon="i-material-symbols-delete-outline-rounded"
                                        @click="deleteArticle"
                                        label="Supprimer l'article"
                                    />
                                </div>
                                <!-- Image -->
                                <div class="flex flex-col gap-4 items-center">
                                    <div v-if="!selectedArticle.insertion && selectedArticle.image">
                                    <NuxtImg :src="selectedArticle.image" fit="cover" class="aspect-square rounded-md" />
                                    </div>
                                    <label class="text-sm font-medium">Image</label>
                                    <UInput type="file" id="image" name="image" accept="image/*" @change="handleArticleImageUpdate" placeholder="Choisir une image" />
                                </div>
                            </UForm>
                        </UCard>
                    </div>
                </div>
            </template>
        </UTabs>
    </div>
</template>