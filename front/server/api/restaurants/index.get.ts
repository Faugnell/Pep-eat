import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";

export default defineEventHandler(async (event : H3Event) => {
    console.log(process.env);
	console.log(process.env.RESTAURANT_API);
    
    try {
        const response = await $fetch<Response<Restaurant[]>>('http://localhost:3101/restaurants', {
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