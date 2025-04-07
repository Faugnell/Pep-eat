import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Article } from "~/utils/types/Article";
import { buildErrorResponse } from "~/utils/responseBuilder";

export default defineEventHandler(async (event : H3Event) => {
    const id = getRouterParam(event, 'id');

    if (!id) return buildErrorResponse(null, 400, `L'ID de l'article est requis`);

    const body = await readBody(event);

    try {
        const response = await $fetch<Response<Article[]>>(`http://${process.env.API_ARTICLE_SERVICE_HOST}:${process.env.API_ARTICLE_SERVICE_PORT}/articles/${id}`, {
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