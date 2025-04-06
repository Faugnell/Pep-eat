<script setup lang="ts">
import type { Response } from '~/utils/types/Response';
import type { Restaurant } from '~/utils/types/Restaurant';
import type { Article as ArticleType } from '~/utils/types/Article';
import Article from '~/components/articles/Article.vue';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const nutriscoreValues = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    'N/A': 0,
    '': 0,
    null: 0,
};

const { data: restaurant } = useLazyAsyncData('restaurant-data', async () => {
    const restaurantId = useRoute().params.id as string;

    const { data } = await $fetch<Response<Restaurant>>(`/api/restaurants/${restaurantId}`);

    if (data.length === 0) {
        throw new Error('No restaurant found with this ID.');
    }

    return data[0];
});

const { data: articles } = useAsyncData('articles-data', async () => {
    const restaurantId = useRoute().params.id as string;

    const articles = await $fetch<Response<ArticleType[]>>(`/api/articles/restaurant/${restaurantId}`);

    if (articles.length === 0) {
        throw new Error('No articles found for this restaurant.');
    }

    return articles.sort((a, b) => {
        return nutriscoreValues[b.nutriscore] - nutriscoreValues[a.nutriscore];
    });
});

const categories = computed(() => {
    if (!articles.value || articles.value.length === 0) return [];

    return articles.value?.map((article) => article.category).filter((category, index, self) => self.indexOf(category) === index);
});

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
</script>

<template>
    <div class="flex flex-col bg-slate-50 w-full h-full overflow-x-scroll">
        <div class="w-full h-80 bg-[url(/restaurants/banner/banner.jpg)] bg-cover bg-center bg-no-repeat flex items-center p-6">
            <div class="bg-white w-fit px-4 py-10 rounded-sm shadow-lg">
                <div class="flex flex-col">
                    <h2 class="text-black text-6xl font-black">{{ restaurant.nom }}</h2>
                    <p class="text-lg mb-2 italic">{{ restaurant.description }}</p>
                    <div v-if="restaurant.horaires" class="flex flex-row gap-2 items-center">
                        <UIcon name="material-symbols-light:nest-clock-farsight-analog-outline"/>
                        <p class="text-lg">{{ restaurant.horaires }}</p>
                    </div>
                    <div v-if="restaurant.telephone" class="flex flex-row gap-2 items-center">
                        <UIcon name="material-symbols:call-sharp"/>
                        <p class="text-lg">{{ restaurant.telephone }}</p>                        
                    </div>
                    <div v-if="restaurant.adresse" class="flex flex-row gap-2 items-center">
                        <UIcon name="jam:gps-f"/>
                        <p class="text-lg">{{ restaurant.adresse }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 py-1 w-full h-full">
            <h2 class="text-3xl font-bold my-4">Nos Articles</h2>
            <UCarousel v-if="articles" v-slot="{ item: article }" :items="articles" arrows :ui="{ container: 'flex gap-1 py-2', root: 'w-[95%]', item: 'basis-auto sm:basis-1/2 md:basis-1/3 lg:basis-auto' }">
                <Article
                    :key="article._id"
                    :id="article._id"
                    :nom="article.name"
                    :description="article.description"
                    :prix="article.price"
                    :nutriscore="article.nutriscore"
                    :image="article.image"
                    class="select-none"
                />
            </UCarousel>
        </div>
        <div v-if="categories" v-for="category in categories" :key="category" class="flex flex-col px-4 py-1">
            <USeparator class="my-4" />
            <h2 class="text-3xl font-bold my-2 capitalize">{{ category }}</h2>
            <div class="grid grid-cols-6 gap-2">
                <Article
                    v-for="article in articles.filter(article => article.category === category)"
                    :key="article._id"
                    :id="article._id"
                    :nom="article.name"
                    :description="article.description"
                    :prix="article.price"
                    :nutriscore="article.nutriscore"
                    :image="article.image"
                />
            </div>
        </div>
    </div>
</template>