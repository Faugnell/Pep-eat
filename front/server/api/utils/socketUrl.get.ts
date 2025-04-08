import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";

export default defineEventHandler(async (event : H3Event) => {
    try {
        return {
            code: 200,
            ok: true,
            data: {
                serviceHost: process.env.API_NOTIFICATION_SERVICE_HOST,
                servicePort: process.env.API_NOTIFICATION_SERVICE_PORT,
            }
        } as Response<any>;
    } catch (error) {
        console.log(error);
    }
});