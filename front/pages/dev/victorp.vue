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
  category: string
}

const articles = ref<Article[]>([])

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
        <UButton @click="fetchArticles">Fetch articles</UButton>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ArticleTile
            v-for="article in articles"
            :key="article._id"
            :title="article.name"
            :price="article.price.toFixed(2)"
            :badgeText="article.category"
          />
        </div>
      </div>
      <FooterPepeat />
    </div>
  </template>