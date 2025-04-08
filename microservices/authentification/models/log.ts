import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    service: { type: String, required: true },
    code: { type: Number, required: true },
    ok: { type: Boolean, required: true },
    message: { type: String, required: true },
});

export const LogModel = mongoose.model('Log', logSchema);