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
const items = ref([
    [
        {
        label: 'Benjamin',
        avatar: {
            src: 'https://github.com/benjamincanac.png'
        },
        type: 'label'
        }
    ],
    [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
]);

const nom = ref('Victor')

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
    <div class="flex justify-between items-center w-full bg-[#FFD259] h-[7vh] min-h-10">
        <img id="logo" alt="logo" class="h-[80%] object-contain mx-[1%]" src="../../public/pepeat-logo.png"/>
        <UDropdownMenu
            :items="items"
            :ui="{
                content: 'w-48'
            }">
            <UButton :label="nom" icon="i-lucide-user" color="neutral" variant="link" />
        </UDropdownMenu>
    </div>
</template>

<style scoped>
</style>