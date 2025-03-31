<script setup lang='ts'>
import HeaderPepeat from "~/components/common/HeaderPepeat.vue";
import FooterPepeat from "~/components/common/FooterPepeat.vue";
import ArticleTile from "~/components/articles/ArticleTile.vue";
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
interface Article {
  _id: string
  name: string
  price: number
  nutriscore: string
  category: string
}

const articles = ref<Article[]>([])
const restaurantId = ref("67e284a2224030298c111d98")
const category = ref("Pizza")

// Champs du formulaire
const name = ref('')
const description = ref('')
const price = ref(0)
const nutriscore = ref('')
const available = ref(true)
const isSubmitting = ref(false)

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
/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
function clearArticles() {
  articles.value = []
}

async function fetchArticles() {
  try {
    const response = await $fetch<Article[]>('http://localhost:3103/articles/')
    articles.value = response

    useToast().add({
      title: 'Articles fetched!',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })
  } catch (error) {
    useToast().add({
      title: 'Error while fetching articles!',
      color: 'error',
      icon: 'i-heroicons-x-mark',
    })
    console.error('Error while fetching articles', error)
  }
}

async function fetchArticlesByRestaurant() {
  try {
    const response = await $fetch<Article[]>(`http://localhost:3103/articles/restaurant/${restaurantId.value}`)
    articles.value = response

    useToast().add({
      title: 'Articles du restaurant chargés !',
      color: 'primary',
      icon: 'i-heroicons-building-storefront',
    })
  } catch (error) {
    useToast().add({
      title: 'Erreur lors du chargement des articles du restaurant !',
      color: 'error',
      icon: 'i-heroicons-x-mark',
    })
    console.error('Error while fetching articles by restaurant', error)
  }
}

async function fetchArticlesByCategory() {
  try {
    const response = await $fetch<Article[]>(`http://localhost:3103/articles/${category.value}`)
    articles.value = response

    useToast().add({
      title: 'Articles de la catégorie chargés !',
      color: 'primary',
      icon: 'i-heroicons-building-storefront',
    })
  } catch (error) {
    useToast().add({
      title: 'Erreur lors du chargement des articles de la catégorie !',
      color: 'error',
      icon: 'i-heroicons-x-mark',
    })
    console.error('Error while fetching articles by category', error)
  }
}

async function handleSubmit() {
  isSubmitting.value = true

  try {
    const newArticle = {
      restaurant_id: restaurantId.value,
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

    // Optionnel : recharger la liste automatiquement
    await fetchArticlesByRestaurant()

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
  }
}
/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>
<template>
    <div class="flex flex-col min-h-screen">
      <HeaderPepeat />
      <div class="grid flex-grow p-6 justify-center">
        <!-- Formulaire -->
        <div class="p-6 bg-gray-50 border rounded mb-6 max-w-xl">
          <h1 class="text-xl font-semibold mb-4">Créer un article</h1>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
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
        </div>
  
        <!-- Boutons -->
        <div class="flex gap-4 mb-4">
          <UButton @click="fetchArticles">Tous les articles</UButton>
          <UButton @click="fetchArticlesByRestaurant">Articles du restaurant</UButton>
          <UButton @click="fetchArticlesByCategory">Articles de la catégorie</UButton>
          <UButton @click="clearArticles">Vider la page</UButton>
        </div>
  
        <!-- Articles -->
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ArticleTile
            v-for="article in articles"
            :key="article._id"
            :title="article.name"
            :nutriscore="article.nutriscore"
            :price="article.price.toFixed(2)"
            :badgeText="article.nutriscore"
          />
        </div>
      </div>
      <FooterPepeat />
    </div>
  </template>