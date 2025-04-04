import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Media } from "~/utils/types/Media";

export default defineEventHandler(async (event : H3Event) => {
    const formData = await readFormData(event);

    try {
        const response = await $fetch<Response<Media[]>>(`http://${process.env.API_MEDIA_SERVICE_HOST}:${process.env.API_MEDIA_SERVICE_PORT}/medias`, {
            method: 'POST',
            body: formData,
            retry: 3,
            retryDelay: 1000
        });

        return response;
    } catch (error) {
        console.log(error);
    }
});