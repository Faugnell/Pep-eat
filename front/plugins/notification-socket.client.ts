import { io } from 'socket.io-client'

export default defineNuxtPlugin(async (nuxtApp) => {
    const socketUrlResponse = await $fetch('/api/utils/socketUrl');

    const socket = io(`http://${socketUrlResponse.data.serviceHost}:${socketUrlResponse.data.servicePort}`, {
        autoConnect: false, // on connecte manuellement
    })

    const userRoom = ref<string | null>(null)

    const connectToUserRoom = (userId: string) => {
        if (!userId) return

        if (socket.connected) {
            socket.emit('userDisconnect', userRoom.value) // quitte l'ancienne room si besoin
        }

        userRoom.value = userId;
        socket.connect()
        socket.emit('register', userRoom.value)
    }

    const disconnect = () => {
        if (socket.connected) {
            socket.emit('userDisconnect', userRoom.value)
            socket.disconnect()
        }
        userRoom.value = null
    }

    nuxtApp.provide('socket', socket)
    nuxtApp.provide('connectToUserRoom', connectToUserRoom)
    nuxtApp.provide('disconnectSocket', disconnect)
});