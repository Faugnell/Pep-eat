import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const id = getRouterParam(event, 'id');

    if (!id) return buildErrorResponse(null, 400, `L'ID du restaurant est requis`);

    try {
        const response = await $fetch<Response<Restaurant[]>>(`http://${process.env.API_RESTAURANT_SERVICE_HOST}:${process.env.API_RESTAURANT_SERVICE_PORT}/restaurants/${id}`, {
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