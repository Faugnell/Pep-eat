import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";

export default defineEventHandler(async (event : H3Event) => {
    try {
        return {
            code: 200,
            ok: true,
            data: {
                serviceHost: process.env.PUBLIC_NOTIFICATION_SERVICE_HOST ?? "209.38.179.125",
                servicePort: process.env.PUBLIC_NOTIFICATION_SERVICE_PORT ?? "80",
            }
        } as Response<any>;
    } catch (error) {
        console.log(error);
    }
});