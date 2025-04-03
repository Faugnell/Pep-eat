<script setup lang='ts'>
const {
  imageUrl,
  badgeText,
  title,
  price,
} = defineProps({
  imageUrl: {
    type: String,
    required: false,
    default: 'https://via.placeholder.com/800x500',
  },
  badgeText: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
    default: 'Plat 1',
  },
  price: {
    type: String,
    required: true,
    default: '20',
  },
})

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */
// Nutriscore ou N/A
const computedBadgeText = computed(() => {
  const validScores = ['A', 'B', 'C', 'D', 'E']
  return validScores.includes(badgeText?.toUpperCase()) ? badgeText.toUpperCase() : 'N/A'
})

// Classe dynamique
const computedBadgeClass = computed(() => {
  switch (computedBadgeText.value) {
    case 'A':
      return 'bg-green-500 text-white'
    case 'B':
      return 'bg-lime-400 text-black'
    case 'C':
      return 'bg-yellow-400 text-black'
    case 'D':
      return 'bg-orange-400 text-white'
    case 'E':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-200 text-black'
  }
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
  <UCard
    class="drop-shadow-[0_1px_1px_rgba(0,0,0,0.20)] w-full rounded-md"
    :ui="{ body: 'p-0 sm:p-0 w-full grow' }"
  >
    <div class="flex justify-center">
      <NuxtImg class="grow" :src="imageUrl" fit="cover" />
    </div>
    <template #footer>
      <div class="flex justify-between">
        <div class="flex items-center">
          <UBadge class="font-bold rounded-full mr-1" :class="computedBadgeClass">
            {{ computedBadgeText }}
          </UBadge>
          <p>{{ title }}</p>
        </div>
        <div class="text-right">{{ price }} €</div>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
</style>