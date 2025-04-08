import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";

export default defineEventHandler(async (event : H3Event) => {
    try {
        return {
            code: 200,
            ok: true,
            data: {
                serviceHost: "209.38.179.125",
                servicePort: "80",
            }
        } as Response<any>;
    } catch (error) {
        console.log(error);
    }
});