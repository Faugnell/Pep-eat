import { Types } from "mongoose";
const mongoose = require('mongoose');

export type LivraisonType = {
    order_id: Types.ObjectId,
    restaurant_id: Types.ObjectId,
    user_id: Types.ObjectId,
    status: "Prise en charge de la commande." | "La commande arrive." | "La commande a été livrée.",
    rating?: number,
    cooking_time_start?: Date,
    cooking_time_end?: Date,
    delivery_departure_time?: Date,
    delivery_estimated_arrival_time?: Date,
    delivery_lastest_arrival_time?: Date,
    is_finish: boolean,
    in_progress: boolean,
};

module.exports = mongoose.model("Livraison", new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "commandes"
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "restaurants"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "utilisateurs"
    },
    status: {
        type: String,
        required: true,
        enum: [
            "Prise en charge de la commande.",
            "La commande arrive.",
            "La commande a été livrée."
        ]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: false
    },
    cooking_time_start: { type: Date },
    cooking_time_end: { type: Date },
    delivery_departure_time: { type: Date },
    delivery_estimated_arrival_time: { type: Date },
    delivery_lastest_arrival_time: { type: Date },
    is_finish: {
        type: Boolean,
        default: false
    },
    in_progress: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
}));