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
        data: livraisons[0],
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
        data: livraison,
    });
}

export async function create(req: Request, res: Response) {
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