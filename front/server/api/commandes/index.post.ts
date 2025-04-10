import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { ordersDataType } from "~/utils/types/Commande";

export type fetchedDataType = {
    "code": number,
    "ok": boolean,
    "error"?: string,
    "message": string,
    "data": ordersDataType
}

export default defineEventHandler(async (event : H3Event) => {
    const body = await readBody(event);
    try {
        const response = await $fetch<Response<fetchedDataType>>(`http://${process.env.API_COMMANDE_SERVICE_HOST}:${process.env.API_COMMANDE_SERVICE_PORT}/commandes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            retry: 3,
            retryDelay: 1000
        });
        return response;
    } catch (error) {
        console.log(error);
    }
});
