// controllers/livraisonsController.ts
import { Request, Response } from "express";

const livraisonsService = require('../services/livraisons');
const Livraison = require("../models/livraisons");

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

export async function list(req: Request, res: Response) {
    const livraisons = await livraisonsService.findAll();
    res.status(200).json({
        code: 200,
        ok: true,
        message: `${livraisons.length} trouvée(s) !`,
        data: livraisons,
    });
}

// * ==================================================
// * ====================   READ   ====================
// * ==================================================

export async function read(req: Request, res: Response) {
    const livraison = await livraisonsService.findById(req.params.id);

    if (!livraison) {
        return res.status(404).json({
            code: 404,
            ok: false,
            message: "Aucune livraison de trouvée !",
        });
    }

    res.status(200).json({
        code: 200,
        ok: true,
        message: `${livraison.length} trouvée(s) !`,
        data: livraison[0],
    });
}

// * ==================================================
// * ===================   CREATE   ===================
// * ==================================================

export async function create(req: Request, res: Response) {
    try {
        const {
            order_id,
            restaurant_id,
            user_id,
            status,
            address_number,
            address_street,
            postal_code,
            city,
            phone,
            order_information,
        } = req.body;

        if (!order_id || !restaurant_id || !user_id || !status || !address_number || !address_street || !postal_code || !city || !phone) {
            return res.status(400).json({
                code: 400,
                ok: false,
                error: "Tous les champs requis ne sont pas fournis.",
            });
        }

        const newLivraison = await Livraison.create({
            order_id,
            restaurant_id,
            user_id,
            status,
            address_number,
            address_street,
            postal_code,
            city,
            phone,
            order_information,
            // en dure dans le code pour le moment (données de test)
            cooking_time_start: new Date(),
            cooking_time_end: new Date(Date.now() + 30 * 60000), // +30min
            delivery_departure_time: new Date(Date.now() + 35 * 60000), // 5min après
            delivery_estimated_arrival_time: new Date(Date.now() + 60 * 60000), // 25min apres
            delivery_lastest_arrival_time: new Date(Date.now() + 70 * 60000), // arrivé la plus tard
            in_progress: true,
            is_finish: false
        });

        return res.status(201).json({
            code: 201,
            ok: true,
            data: newLivraison,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            ok: false,
            error: "Erreur lors de la création de la livraison.",
        });
    }
}

// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================

export async function update(req: Request, res: Response) {
    if (!req.params.id) {
        return res.status(400).json({
            code: 400,
            ok: false,
            error: `${req.params.id} is not a valid ID !`,
        });
    }

    try {
        const updatedLivraison = await Livraison.findByIdAndUpdate(req.params.id, req.body);

        if (!updatedLivraison) {
            return res.status(404).json({
                code: 404,
                ok: false,
                message: "Aucune livraison de trouvée !",
            });
        }

        res.status(200).json({
            code: 200,
            ok: true,
            message: `${updatedLivraison._id} mis à jour avec succés !`,
            data: updatedLivraison,
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            ok: false,
            error: `Erreur serveur lors de la mise à jour de la livraison, ${err}`,
        });
    }
}