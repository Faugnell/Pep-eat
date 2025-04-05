import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";

export default defineEventHandler(async (event : H3Event) => {
    const body = await readBody(event);

    try {
        const response = await $fetch<Response<Restaurant[]>>(`http://${process.env.API_RESTAURANT_SERVICE_HOST}:${process.env.API_RESTAURANT_SERVICE_PORT}/restaurants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
            retry: 3,
            retryDelay: 1000
        });

        return response;
    } catch (error) {
        console.log(error);
    }
});