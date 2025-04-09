import mongoose from "mongoose";

module.exports = mongoose.model("Utilisateur", new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["client", "livreur", "restaurateur", "developpeur", "admin"],
        default: "client"
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    referral_link: {
        type: String
    },
    referral_discount: {
        type: Boolean,
        default: false
    },
    is_suspended: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false
}));