import mongoose from "mongoose";
import { LivraisonType } from "../models/livraisons";

const Livraison = require("../models/livraisons");

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

async function findAll() {
    try {
        const livraisons: LivraisonType[] = await Livraison.aggregate([
            {
                $lookup: {
                    from: "commandes",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order_data"
                }
            },
            { $unwind: { path: "$order_data", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurant_id",
                    foreignField: "_id",
                    as: "restaurant_data"
                }
            },
            { $unwind: { path: "$restaurant_data", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "utilisateurs",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user_data"
                }
            },
            { $unwind: { path: "$user_data", preserveNullAndEmptyArrays: true } },
        ]);

        return livraisons;
    } catch (error) {
        console.error("Erreur lors de l'aggrégation des livraisons:", error);
        throw error;
    }
}

// * ==================================================
// * =================   READ BY ID   =================
// * ==================================================

async function findById(id: string) {
    try {
        const results: LivraisonType | null = await Livraison.aggregate([
            { $match: { order_id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "commandes",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order_data"
                }
            },
            { $unwind: { path: "$order_data", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurant_id",
                    foreignField: "_id",
                    as: "restaurant_data"
                }
            },
            { $unwind: { path: "$restaurant_data", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "utilisateurs",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user_data"
                }
            },
            { $unwind: { path: "$user_data", preserveNullAndEmptyArrays: true } }
        ]);

        return results;
    } catch (error) {
        console.error("Erreur lors de la récupération de la livraison:", error);
        throw error;
    }
}

module.exports = {
    findAll,
    findById,
};