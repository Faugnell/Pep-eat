import { io } from 'socket.io-client';

export default defineNuxtPlugin(async () => {
    const socketUrlResponse = await $fetch('/api/utils/socketUrl');

    const socket = io(`http://${socketUrlResponse.data.serviceHost}:${socketUrlResponse.data.servicePort}`);

    return {
        provide: {
            socket,
        },
    };
});