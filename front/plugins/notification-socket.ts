import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    console.log('Notification socket plugin loaded');
    console.log('Runtime config : ', useRuntimeConfig());
    console.log('Process.env : ', process.env);

    const socket = io(`http://${process.env.API_NOTIFICATION_SERVICE_HOST}:${process.env.API_NOTIFICATION_SERVICE_PORT}`);

    console.log(`Connecting to notification socket at http://${process.env.API_NOTIFICATION_SERVICE_HOST}:${process.env.API_NOTIFICATION_SERVICE_PORT}`);

    return {
        provide: {
            socket,
        },
    };
});