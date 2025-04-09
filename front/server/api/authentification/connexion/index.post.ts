import { H3Event } from "h3";
import { Response } from "~/utils/types/Response";
import { Utilisateur } from "~/utils/types/Utilisateur";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    try {
        const response = await $fetch<Response<Utilisateur>>(`http://${process.env.API_AUTHENTIFICATION_SERVICE_HOST}:${process.env.API_AUTHENTIFICATION_SERVICE_PORT}/login`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            },
            retry: 3,
            retryDelay: 1000,
        });

        return response;
    } catch (error) {
        console.error("Erreur login:", error);
        return {
            ok: false,
            code: 500,
            message: "Erreur serveur lors de la connexion"
        };
    }
});