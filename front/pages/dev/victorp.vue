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

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
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
      <div class="flex-grow p-6">
        <div class="flex gap-4 mb-4">
          <UButton @click="fetchArticles">Tous les articles</UButton>
          <UButton @click="fetchArticlesByRestaurant">Articles du restaurant</UButton>
        </div>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ArticleTile
            v-for="article in articles"
            :key="article._id"
            :title="article.name"
            :nutriscore="article.nutriscore"
            :price="article.price.toFixed(2)"
            :badgeText="article.category"
          />
        </div>
      </div>
      <FooterPepeat />
    </div>
  </template>
  