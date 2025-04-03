import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Media } from "~/utils/types/Media";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const id = getRouterParam(event, 'id');

    if (!id) return buildErrorResponse(null, 400, `L'ID du média est requis`);

    try {
        const response = await $fetch<Response<Media[]>>(`http://${process.env.API_MEDIA_SERVICE_HOST}:${process.env.API_MEDIA_SERVICE_PORT}/media/${id}`, {
            method: 'DELETE',
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