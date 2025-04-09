import { logResponse } from './logger';

export function buildSuccessResponse(data: [unknown], code = 200, message = 'Success', service = 'authentification') {
    logResponse({ service, code, ok: true, message });
    return {
        code: code,
        ok: true,
        data: data,
        message: message
    }
}

export function buildErrorResponse(error: unknown, code = 500, message = 'Internal Server Error', service = 'authentification') {
    logResponse({ service, code, ok: false, message });
    return {
        code: code,
        ok: false,
        error: error,
        message: message
    }
}