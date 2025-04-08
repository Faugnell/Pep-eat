import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";

export default defineEventHandler(async (event : H3Event) => {
    try {
        return {
            code: 200,
            ok: true,
            data: {
                serviceHost: "api-notification",
                servicePort: "3109",
            }
        } as Response<any>;
    } catch (error) {
        console.log(error);
    }
});