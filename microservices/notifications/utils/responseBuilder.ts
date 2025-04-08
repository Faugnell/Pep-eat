export function buildSuccessResponse(data:[unknown], code = 200, message = 'Success') {
    return {
        code: code,
        ok: true,
        data: data,
        message: message
    }
}

export function buildErrorResponse(error:any, code = 500, message = 'Internal Server Error') {
    return {
        code: code,
        ok: false,
        error: error,
        message: message
    }
}