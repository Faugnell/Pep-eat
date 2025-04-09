import { H3Event } from 'h3';
import { Response } from '~/utils/types/Response';
import { Utilisateur } from '~/utils/types/Utilisateur';
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);
    const id = getRouterParam(event, "id") || body.id;

    if (!id) return buildErrorResponse(null, 400, `L'ID de l'utilisateur est requis`);

    try {
        const response = await $fetch<Response<Utilisateur>>(
            `http://${process.env.API_PROFIL_SERVICE_HOST}:${process.env.API_PROFIL_SERVICE_PORT}/profil/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body,
                retry: 3,
                retryDelay: 1000
            });

        return response;
    } catch (error) {
        console.error(error);
    }
});