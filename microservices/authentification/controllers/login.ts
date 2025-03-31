import { Request, Response } from "express";
import { buildSuccessResponse, buildErrorResponse } from "../utils/responseBuilder";
import mongoose from "mongoose";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
 * Fonction de connexion de l'utilisateur.
 * Cette fonction permet de valider les informations d'identification de l'utilisateur 
 * (email et mot de passe), de vérifier leur validité, et de générer un token JWT 
 * pour une session authentifiée.
 * 
 * @param {Request} req - L'objet de la requête, qui contient les informations envoyées par le client.
 * Il attend un corps de requête avec un `email` et un `password`.
 * @param {Response} res - L'objet de la réponse, utilisé pour envoyer la réponse au client.
 * 
 * @returns {Promise<Response>} - Retourne une réponse HTTP. Selon le cas, cela peut être :
 *  - Un code 400 si l'email ou le mot de passe est manquant.
 *  - Un code 401 si les identifiants sont incorrects.
 *  - Un code 200 avec le succès de la connexion et un token JWT valide.
 *  - Un code 500 en cas d'erreur serveur.
 * 
 * @throws {Error} - Si une erreur se produit lors de l'exécution de la fonction (par exemple, une erreur dans la base de données ou lors de la comparaison des mots de passe).
 */
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send(buildErrorResponse(null, 400, "Email et mot de passe requis"));
        }

        const user: IUser = await Utilisateur.findOne({ email });

        if (!user) {
            return res.status(401).send(buildErrorResponse(null, 401, "Identifiant incorrect"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send(buildErrorResponse(null, 401, "Mot de passe incorrect"));
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET ?? "secret_key",
            { expiresIn: "1h" }
        );

        return res.status(200).send(buildSuccessResponse(
            { user: { ...user.toObject() }, token } as any,
            200, "Connexion réussie"
        ));
    } catch (err) {
        res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la connexion"));
    }
}