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
    <div class="flex justify-around items-center w-full bg-white h-[7vh] min-h-10 sticky mb-2">
        <div class="grid grid-cols-3 justify-items-center gap-x-4">
            <ULink to="">© Droits d'auteur</ULink>
            <ULink to="">Conditions d’utilisation</ULink>
            <ULink to="">Politique de confidentialité</ULink>
            <ULink to="">Propriété du site</ULink>
            <ULink to="">Conditions générales de vente</ULink>
            <ULink to="">Cookies</ULink>
        </div>
        <div class="flex justify-center gap-4">
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
    </div>
</template>

<style scoped>
</style>