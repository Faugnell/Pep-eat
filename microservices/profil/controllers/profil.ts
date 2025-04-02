import { Request, Response } from "express";
import { buildSuccessResponse, buildErrorResponse } from "../utils/responseBuilder";
import mongoose from "mongoose";

const Utilisateur = require("../models/utilisateur");

interface IUser extends mongoose.Document {
    _id: string;
    first_name: string;
    last_name: string;
    role: "client" | "livreur" | "restaurateur";
    city: string;
    postal_code: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    referral_link?: string;
    referral_discount: boolean;
    is_suspended: boolean;
}

/**
 * Mettre à jour un utilisateur
 * @param {string} id - L'identifiant de l'utilisateur à mettre à jour
 * @param {Object} body - Les nouvelles données de l(utilisateur
 * @return {Object} - L'objet utilisateur mis à jour
 * @throws {Error} - Erreur lors de la mise à jour de l'utilisateur
 */
export async function update(req: Request, res: Response) {

}

/**
 * Supprimer un utilisateur
 * @param id - L'identifiant de l'utilisateur à supprimer 
 * @returns {Object} - L'objet utilisateur supprimé
 * @throws {Error} - Erreur lors de la suppression de l'utilisateur
 */
export async function remove(req: Request, res: Response) {

}