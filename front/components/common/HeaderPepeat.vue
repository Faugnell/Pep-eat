<script setup lang='ts'>
import type { DropdownMenuItem } from '@nuxt/ui';
import Connexion from '~/components/authentification/Connexion.vue'
import Inscription from '~/components/authentification/Inscription.vue'
import { useUserStore } from '~/stores/userStore';
import PanierSlideover from '../panier/PanierSlideover.vue';
import { usePanierStore } from '~/stores/panierStore';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */
const {
  getFirstName,
  isConnected,
  disconnectUser
} = useUserStore();

const {
  getNombreArticles,
  setUserId
} = usePanierStore();

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
const router = useRouter()
const goHome = async () => {
  await navigateTo('/');
}

const searchValue = ref<string | number | null | undefined>("")

const itemsHeader = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profil',
      icon: 'i-lucide-user',
      to: '/profil'
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
      color: 'error',
      onSelect: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserId(null);
        disconnectUser();
        goHome();
      }
    }
  ],
]);

const userConnected = computed<boolean>(() => isConnected());
const userFirstName = computed<string>(() => getFirstName());

const panierSlideoverOverlay = useOverlay().create(PanierSlideover);
const numberOfArticles = computed(() => getNombreArticles());
const showPanierChip = computed(() => numberOfArticles.value > 0);

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */
async function openPanierSlideover() {
  await panierSlideoverOverlay.open();
}

const goToSearch = () => {
  const filter = String(searchValue.value).length ? `/${String(searchValue.value)}` : ""
  router.push(`/restaurants/search${filter}`)
}

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
    <img id="logo" alt="logo"
      class="h-[80%] object-contain mx-[1%] hover:cursor-pointer hover:h-[83%] ease-in-out duration-150"
      src="../../public/icons/black.svg" @click="goHome" />
    <UInput
    v-on:keyup.enter="goToSearch" 
    ize="md"
    variant="outline"
    placeholder="Restaurant, commerces, plats..."
      class="w-[50vh] min-w-50"
      v-model="searchValue">
      <template #trailing>
        <UButton color="neutral" variant="link" size="sm" icon="i-lucide-search"
          @click="goToSearch"/>
      </template>
    </UInput>
    <div v-if="userConnected" class="flex gap-3 pr-4">
      <UChip :text="numberOfArticles" :show="showPanierChip" size="3xl" color="neutral" inset>
        <UButton color="neutral" variant="ghost" icon="i-lucide-shopping-basket" size="xl" :ui="{ base: 'text-xl' }"
          @click="openPanierSlideover" />
      </UChip>
      <UDropdownMenu class="h-[80%] object-contain mx-[1%]" :items="itemsHeader" :ui="{
        content: 'w-48'
      }">
        <UButton :label="userFirstName" icon="i-lucide-user" color="neutral" variant="link" size="xl"
          :ui="{ base: 'text-xl' }" />
      </UDropdownMenu>
    </div>
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