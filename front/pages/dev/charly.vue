<script setup lang="ts">
import { UButton } from '#components';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
</script>

<template>
    <UButton @click="handleLogout"">
        Se déconnecter
    </UButton>
</template>
