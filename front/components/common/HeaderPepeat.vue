<script setup lang='ts'>
import type { DropdownMenuItem } from '@nuxt/ui';
import Connexion from '~/components/authentification/Connexion.vue'
import Inscription from '~/components/authentification/Inscription.vue'
/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const itemsHeader = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profil',
      icon: 'i-lucide-user'
    },
    {
      label: 'Mes commandes',
      icon: 'i-material-symbols-light:shopping-bag-speed-outline',
      to: '/utilisateur/commandes'
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
    },
    {
      label: 'Commercial',
      icon: 'i-uil-briefcase-alt'
    }
  ],
  [
    {
      label: 'Déconnexion',
      icon: 'i-basil-logout-outline',
      color: 'tertiary'
    }
  ],
]);

const router = useRouter()
const goHome = () => {
  router.push('/')
}

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
        <img id="logo" alt="logo" class="h-[80%] object-contain mx-[1%]" src="../../public/icons/black.svg" @click="goHome"/>
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
        <div v-else class="flex gap-5 mr-3">
          <!-- Inscription -->
          <UModal title="Inscription">
            <UButton label="Inscription" color="neutral" size="md" class="text-xl cursor-pointer" variant="link" />
            <template #body>
              <Inscription />
            </template>
          </UModal>
          <!-- Connexion -->
          <UModal title="Se connecter à Pep'Eat">
              <UButton label="Connexion" color="primary" size="md" class="text-xl rounded-full cursor-pointer" />

              <template #body>
                  <!-- Email -->
                  <Connexion />
              </template>
          </UModal>
        </div>
    </div>
</template>

<style scoped>
</style>