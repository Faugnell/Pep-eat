<script setup lang='ts'>
const {
  imageUrl,
  badgeText,
  badgeClass,
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
    default: 'N/A',
  },
  badgeClass: {
    type: String,
    default: 'bg-grey-200',
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
    <UCard class="drop-shadow-[0_1px_1px_rgba(0,0,0,0.20)] w-[50vh] rounded-none"
        :ui="{body: 'p-0 sm:p-6'}">
        <NuxtImg src="https://picsum.photos/800/500?random=1" fit="cover" />
        <template #footer>
            <div class="flex flex-row">
                <div class="flex basis-5/6 gap-2">
                    <UBadge class="font-bold rounded-full" :class="badgeClass">{{ badgeText }}</UBadge>
                    <p>{{ title }}</p>
                </div>
                <div class="basis-1/6">{{ price }} €</div>
            </div>
        </template>
    </UCard>
</template>

<style scoped>
</style>
