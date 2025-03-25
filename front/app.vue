<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
	<UApp :toaster="appConfig.toaster">
		<NuxtRouteAnnouncer />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<NuxtPage />
	</UApp>
</template>