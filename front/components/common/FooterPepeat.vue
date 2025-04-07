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
    <div class="w-full bg-white pt-4 pb-2">
      <!-- Réseaux sociaux -->
      <div class="flex gap-4 mb-2 ml-[7%]">
        <!-- Facebook -->
        <ULink to="https://facebook.com/" target="_blank" aria-label="Facebook">
          <UIcon name="i-garden-facebook-stroke-12" class="size-5" />
        </ULink>
  
        <!-- Instagram -->
        <ULink to="https://instagram.com/" target="_blank" aria-label="Instagram">
          <UIcon name="i-gg-instagram" class="size-5" />
        </ULink>
  
        <!-- Twitter -->
        <ULink to="https://twitter.com/" target="_blank" aria-label="Twitter">
          <UIcon name="i-garden-twitter-stroke-12" class="size-5" />
        </ULink>
  
        <!-- LinkedIn -->
        <ULink to="https://www.linkedin.com/company/pep-eat" target="_blank" aria-label="LinkedIn">
          <UIcon name="i-garden-linkedin-stroke-12" class="size-5" />
        </ULink>
      </div>
  
      <!-- Liens légaux -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-2 text-center text-sm px-4">
        <NuxtLink to="/legal/copyright">© Droits d'auteur</NuxtLink>
        <NuxtLink to="/legal/terms">Conditions d’utilisation</NuxtLink>
        <NuxtLink to="/legal/privacy-policy">Politique de confidentialité</NuxtLink>
        <NuxtLink to="/legal/ownership">Propriété du site</NuxtLink>
        <NuxtLink to="/legal/cgv">Conditions générales de vente</NuxtLink>
        <NuxtLink to="/legal/cookies">Cookies</NuxtLink>
      </div>
    </div>
  </template>

<style scoped>
</style>