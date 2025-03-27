<script setup lang='ts'>
const {
  imageUrl,
  nutriscore,
  title,
  price,
} = defineProps({
  imageUrl: {
    type: String,
    required: false,
    default: 'https://via.placeholder.com/800x500',
  },
  nutriscore: {
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
// Texte du badge (valide A-E ou N/A)
const computedBadgeText = computed(() => {
  const validScores = ['A', 'B', 'C', 'D', 'E']
  return validScores.includes(nutriscore?.toUpperCase()) ? nutriscore.toUpperCase() : 'N/A'
})

// Couleur du badge en fonction du nutriscore
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
    class="drop-shadow-[0_1px_1px_rgba(0,0,0,0.20)] w-[50vh] rounded-none"
    :ui="{ body: 'p-0 sm:p-6' }"
  >
    <NuxtImg src="https://picsum.photos/800/500?random=1" fit="cover" />
    <template #footer>
      <div class="flex flex-row">
        <div class="flex basis-5/6 gap-2 items-center">
          <UBadge class="font-bold rounded-full" :class="computedBadgeClass">
            {{ computedBadgeText }}
          </UBadge>
          <p>{{ title }}</p>
        </div>
        <div class="basis-1/6 text-right">{{ price }} €</div>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
</style>