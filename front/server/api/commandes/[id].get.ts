import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { buildErrorResponse } from "~/utils/responseBuilder";
import { ordersDataType } from "~/utils/types/Commande";

type fetchedDataType = {
    "code": number,
    "ok": boolean,
    "message": string,
    "data": ordersDataType
}

export default defineEventHandler(async (event : H3Event) => {
    const idCommande = getRouterParam(event, 'id');
    console.log(idCommande)

    if (!idCommande) return buildErrorResponse(null, 400, `L'ID de commande est requis`);

    try {
        const response = await $fetch<Response<fetchedDataType>>(`http://${process.env.API_COMMANDE_SERVICE_HOST}:${process.env.API_COMMANDE_SERVICE_PORT}/commandes/${idCommande}`, {
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