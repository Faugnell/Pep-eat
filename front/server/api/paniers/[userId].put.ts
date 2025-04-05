import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Panier } from "~/utils/types/Panier";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const userId = getRouterParam(event, 'userId');

    if (!userId) return buildErrorResponse(null, 400, `L'ID de l'utilisateur est requis`);

    const body = await readBody(event);

    try {
        const response = await $fetch<Response<Panier[]>>(`http://${process.env.API_COMMANDE_SERVICE_HOST}:${process.env.API_COMMANDE_SERVICE_PORT}/paniers/${userId}`, {
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