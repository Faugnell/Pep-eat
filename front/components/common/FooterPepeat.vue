<script setup lang='ts'>
const {
} = defineProps({
});

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- WATCHERS -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
---------------------------- LIFECYCLE HOOKS -------------------------------
------------------------------------------------------------------------- */
onMounted(async () => {
});
</script>
<template>
    <div class="flex flex-col md:flex-row justify-around items-center w-full bg-white h-fit min-h-10 sticky mb-2 px-4 py-2">
        <div
            class="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-items-center text-xs sm:text-sm md:text-base text-center">
            <NuxtLink to="/legal/copyright">© Droits d'auteur</NuxtLink>
            <NuxtLink to="/legal/terms">Conditions d’utilisation</NuxtLink>
            <NuxtLink to="/legal/privacy-policy">Politique de confidentialité</NuxtLink>
            <NuxtLink to="/legal/ownership">Propriété du site</NuxtLink>
            <NuxtLink to="/legal/cgv">Conditions générales de vente</NuxtLink>
            <NuxtLink to="/legal/cookies">Cookies</NuxtLink>
        </div>

        <div class="flex justify-center gap-4 mt-2 md:mt-0">
            <ULink to="https://facebook.com/" target="_blank" aria-label="Facebook">
                <UIcon name="i-garden-facebook-stroke-12" class="size-5" />
            </ULink>
            <ULink to="https://instagram.com/" target="_blank" aria-label="Instagram">
                <UIcon name="i-gg-instagram" class="size-5" />
            </ULink>
            <ULink to="https://twitter.com/" target="_blank" aria-label="Twitter">
                <UIcon name="i-garden-twitter-stroke-12" class="size-5" />
            </ULink>
            <ULink to="https://www.linkedin.com/company/pep-eat" target="_blank" aria-label="LinkedIn">
                <UIcon name="i-garden-linkedin-stroke-12" class="size-5" />
            </ULink>
        </div>
    </div>
</template>

<style scoped>
</style>