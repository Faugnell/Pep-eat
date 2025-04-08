import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { livraisonDataType } from "~/utils/types/Livraison"

export type fetchedDataType = {
    "code": number,
    "ok": boolean,
    "error"?: string
    "message": string,
    "data": livraisonDataType
}

export default defineEventHandler(async (event : H3Event) => {
    const body = await readBody(event);
    console.log(body)
    try {
        const response = await $fetch<Response<fetchedDataType>>(`http://${process.env.API_LIVRAISON_SERVICE_HOST}:${process.env.API_LIVRAISON_SERVICE_PORT}/livraisons/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            retry: 3,
            retryDelay: 1000
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
});