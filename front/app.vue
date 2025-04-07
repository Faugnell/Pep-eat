<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';
import { usePanierStore } from '~/stores/panierStore';

const {
    setUserInfo
} = useUserStore();

const {
    setUserId
} = usePanierStore();

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

        setUserId(parsedUser._id);
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
