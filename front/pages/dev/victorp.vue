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
const articles = ref();
/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
async function fetchArticles() {
    try {
        const response = await $fetch('http://localhost:3103/articles/get');
        useToast().add({
            title: 'Articles fetched!',
            color: 'success',
            icon: 'i-heroicons-check-circle',
        });
        articles.value = response.data;
    } catch (error) {
        useToast().add({
            title: 'Error while fetching articles!',
            color: 'error',
            icon: 'i-heroicons-x-mark',
        });
        console.error('Error while fetching articles', error);
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
        <HeaderPepeat/>
        <div class="flex-grow">
            <UButton @click="fetchArticles">Fetch articles</UButton>
            <pre>{{ articles }}</pre>
        </div>
        <FooterPepeat/>
    </div>
</template>