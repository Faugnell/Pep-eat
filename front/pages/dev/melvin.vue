<script setup lang='ts'>
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const restaurants = ref();

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
async function fetchRestaurants() {
    const response = await $fetch(`http://localhost:3101/restaurants/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        retry: 3,
        retryDelay: 1000,
    });

    if (response.ok) {
        useToast().add({
            title: 'Restaurants fetched !',
            color: 'success',
            icon: 'i-heroicons-check-circle'
        });

        restaurants.value = response.data;
    } else {
        useToast().add({
            title: 'Error while fetching restaurants !',
            color: 'error',
            icon: 'x-mark'
        });

        console.error('Error while fetching restaurants', response);
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
    <UButton @click="fetchRestaurants">Fetch restaurants</UButton>
    <pre>{{ restaurants }}</pre>
</template>