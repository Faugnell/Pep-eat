import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Restaurant } from "~/utils/types/Restaurant";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const id = getRouterParam(event, 'id');

    if (!id) return buildErrorResponse(null, 400, `L'ID du restaurant est requis`);

    const body = await readBody(event);

    try {
        const response = await $fetch<Response<Restaurant[]>>(`http://localhost:3101/restaurants/${id}`, {
            method: 'PUT',
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