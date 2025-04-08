import { logResponse } from './logger';

export async function buildSuccessResponse(data: [unknown], code = 200, message = 'Success', service = 'profil') {
    await logResponse({ service, code, ok: true, message });
    return {
        code: code,
        ok: true,
        data: data,
        message: message
    };
}

export async function buildErrorResponse(error: unknown, code = 500, message = 'Internal Server Error', service = 'profil') {
    await logResponse({ service, code, ok: false, message });
    return {
        code: code,
        ok: false,
        error: error,
        message: message
    };
}