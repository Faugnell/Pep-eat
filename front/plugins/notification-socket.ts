import { io } from 'socket.io-client';

export default defineNuxtPlugin(async () => {
    console.log('Notification socket plugin loaded');

    const data = await $fetch('/api/utils/socketUrl');

    console.log('Socket URL data : ', data);
    console.log('Socket URL : ', `http://${data.data.serviceHost}:${data.data.servicePort}`);

    console.log('Runtime config : ', useRuntimeConfig());
    console.log('Process.env : ', process.env);

    const socket = io(`http://${data.data.serviceHost}:${data.data.servicePort}`);

    console.log(`Connecting to notification socket at http://${data.data.serviceHost}:${data.data.servicePort}`);

    return {
        provide: {
            socket,
        },
    };
});