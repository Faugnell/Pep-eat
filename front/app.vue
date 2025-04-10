<script setup lang="ts">
import type { Notification } from './utils/types/Notification';
import { useUserStore } from '~/stores/userStore';
import { usePanierStore } from '~/stores/panierStore';

const {
    getId,
    setUserInfo
} = useUserStore();

const {
    setUserId
} = usePanierStore();

const appConfig = useAppConfig();
const userId = computed(() => getId());

onMounted(() => {
    const user = localStorage.getItem("user");
    let parsedUser = null
    
    try {
        parsedUser = JSON.parse(user)
        if (user) {
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
    } catch (err) {
        console.log(err)
    }

    /* Gestion des notifications */
    const { $connectToUserRoom, $disconnectSocket, $socket } = useNuxtApp();

    $socket?.on('new-notification', (notification: Notification) => {
        useToast().add({
            title: notification.titre,
            description: notification.description,
            color: notification.couleur ?? notification.type
        });

        const notificationData = {
            body: notification.description,
            badge: '/favicons/favicon_64.ico'
        }

        if (Notification.permission === "granted") {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
            const notif = new Notification(notification.titre, notificationData);
            // …
        } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    const notif = new Notification(notification.titre, notificationData);
                    // …
                }
            });
        }
    });

    watch(userId, (newValue) => {
        if (newValue) {
            $connectToUserRoom(newValue);
        } else {
            $disconnectSocket();
        }
    }, { immediate: true });
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
