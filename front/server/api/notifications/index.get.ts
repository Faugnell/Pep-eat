import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Notification } from "~/utils/types/Notification";

export default defineEventHandler(async (event : H3Event) => {
    console.log(process.env);

    try {
        const response = await $fetch<Response<Notification[]>>(`http://${process.env.API_NOTIFICATION_SERVICE_HOST}:${process.env.API_NOTIFICATION_SERVICE_PORT}/notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            retry: 3,
            retryDelay: 1000
        });

        return response;
    } catch (error) {
        console.log(error);
    }
});