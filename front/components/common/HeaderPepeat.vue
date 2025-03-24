<script setup lang='ts'>
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const itemsHeader = ref([
  [
    {
      label: 'Profil',
      icon: 'i-lucide-user'
    },
    {
      label: 'Restaurant',
      icon: 'i-uil-restaurant'
    },
    {
      label: 'Coursier',
      icon: 'i-mdi-bike-fast'
    },
  ],
  [
    {
      label: 'Développeur',
      icon: 'i-ic-baseline-computer'
    }
  ],
  [
    {
      label: 'Déconnexion',
      icon: 'i-basil-logout-outline',
      color: 'red'
    }
  ],
]);

const isConnected = ref<boolean>(true)

const user = ref({firstName:'Victor'})

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
    <div class="flex justify-between items-center w-full bg-white h-[7vh] min-h-10">
        <img id="logo" alt="logo" class="h-[80%] object-contain mx-[1%]" src="../../public/pepeat-logo.png"/>
        <template v-if="isConnected">
          <UInput icon="i-lucide-search" size="md" variant="outline" placeholder="Restaurant, commerces, plats..." class="w-[50vh] min-w-50"/>
        </template>
        <UDropdownMenu v-if="isConnected" class="h-[80%] object-contain mx-[1%]"
            :items="itemsHeader"
            :ui="{
                content: 'w-48'
            }">
            <UButton :label="user.firstName" icon="i-lucide-user" color="neutral" variant="link" />
        </UDropdownMenu>
        <div v-else class="h-[80%] object-contain mx-[1%]">
          <UModal title="Inscription">
            <UButton label="Inscription" color="neutral" variant="link" />
          </UModal>
          <UModal title="Connexion">
            <UButton label="Connexion" color="primary" variant="solid" />
          </UModal>
        </div>
    </div>
</template>

<style scoped>

</style>