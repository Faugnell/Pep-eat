import mongoose from 'mongoose';

module.exports = mongoose.model("Log", new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    service: { type: String, required: true },
    code: { type: Number, required: true },
    ok: { type: Boolean, required: true },
    message: { type: String, required: true },
}, {
    versionKey: false
}));