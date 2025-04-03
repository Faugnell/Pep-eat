import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";

export default defineEventHandler(async (event : H3Event) => {
    console.log(process.env);
	console.log(process.env.RESTAURANT_API);
    console.log(`Restaurant API: ${process.env.API_RESTAURANT_SERVICE_HOST}:${process.env.API_RESTAURANT_SERVICE_PORT}`);

    try {
        const response = await $fetch<Response<Restaurant[]>>(`http://${process.env.API_RESTAURANT_SERVICE_HOST}:${process.env.API_RESTAURANT_SERVICE_PORT}/restaurants`, {
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