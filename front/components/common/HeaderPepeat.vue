<script setup lang='ts'>
const {
} = defineProps({
});

import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

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

const isConnected = ref<boolean>(false)

const user = ref({firstName:'Victor'})

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

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
          <UInput placeholder="Search..." />
        </template>
        <UDropdownMenu v-if="isConnected" class="h-[80%] object-contain mx-[1%]"
            :items="itemsHeader"
            :ui="{
                content: 'w-48'
            }">
            <UButton :label="user.firstName" icon="i-lucide-user" color="neutral" variant="link" />
        </UDropdownMenu>
        <div v-else class="h-[80%] object-contain mx-[1%]">
          <UButton label="Inscription" color="neutral" variant="link" />
          <UModal title="Connexion">
            <UButton label="Connexion" color="primary" variant="solid" />
            <template #body>
              <UForm :schema="schema" :state="state" class="space-y-4">
                <UFormField label="Email" name="email">
                  <UInput v-model="state.email" />
                </UFormField>

                <UFormField label="Password" name="password">
                  <UInput v-model="state.password" type="password" />
                </UFormField>

                <UButton type="submit">
                  Submit
                </UButton>
              </UForm>
            </template>
          </UModal>
        </div>
    </div>
</template>

<style scoped>
</style>