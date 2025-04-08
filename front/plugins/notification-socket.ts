import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const socket = io(`http://${process.env.API_NOTIFICATION_SERVICE_HOST}:${process.env.API_NOTIFICATION_SERVICE_PORT}`);

    console.log(`Connecting to notification socket at http://${process.env.API_NOTIFICATION_SERVICE_HOST}:${process.env.API_NOTIFICATION_SERVICE_PORT}`);

    return {
        provide: {
            socket,
        },
    };
});