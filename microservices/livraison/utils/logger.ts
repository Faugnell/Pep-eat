const LogModel = require("../models/log");

export async function logResponse({ service, code, ok, message }:
    {
        service: string,
        code: number,
        ok: boolean,
        message: string,
    }) {
    try {
        await LogModel.create({ service, code, ok, message });
    } catch (err) {
        console.error('Erreur de log :', err);
    }
}