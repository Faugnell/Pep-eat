import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";

export default defineEventHandler(async (event : H3Event) => {
    try {
        const response = await $fetch<Response<Restaurant[]>>('http://localhost:3101/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            retry: 3,
            retryDelay: 1000
        });

        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
    }
});