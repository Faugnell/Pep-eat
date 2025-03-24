<script setup lang="ts">
const appConfig = useAppConfig()
</script>
 
<template>
    <UApp :toaster="appConfig.toaster">
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </UApp>
</template>
 
<style>
html, body {
  background-color: white;
}
</style>