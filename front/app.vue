<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const {
    setUserInfo
} = useUserStore();

const appConfig = useAppConfig();

onMounted(() => {
    const user = localStorage.getItem("user");

    if (user) {
        const parsedUser = JSON.parse(user);

        setUserInfo({
            id: parsedUser._id,
            firstName: parsedUser.first_name,
            lastName: parsedUser.last_name,
            role: parsedUser.role,
            city: parsedUser.city,
            postalCode: parsedUser.postal_code,
            address: parsedUser.address,
            email: parsedUser.email,
            phone: parsedUser.phone,
            referral_link: parsedUser.referral_link,
            is_suspended: parsedUser.is_suspended
        });
    }
});
</script>
 
<template>
    <UApp :toaster="appConfig.toaster">
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
