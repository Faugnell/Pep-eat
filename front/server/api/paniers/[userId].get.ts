import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Panier } from "~/utils/types/Panier";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const idUtilisateur = getRouterParam(event, 'userId');

    if (!idUtilisateur) return buildErrorResponse(null, 400, `L'ID de l'utilisateur est requis`);

    try {
        const response = await $fetch<Response<Panier[]>>(`http://${process.env.API_COMMANDE_SERVICE_HOST}:${process.env.API_COMMANDE_SERVICE_PORT}/paniers/${idUtilisateur}`, {
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