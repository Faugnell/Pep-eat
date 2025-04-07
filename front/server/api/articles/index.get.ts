import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Article } from "~/utils/types/Article";

export default defineEventHandler(async (event : H3Event) => {
    try {
        const response = await $fetch<Response<Article[]>>(`http://${process.env.API_ARTICLE_SERVICE_HOST}:${process.env.API_ARTICLE_SERVICE_PORT}/articles`, {
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