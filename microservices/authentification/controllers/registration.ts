import { Request, Response } from "express";
import { buildSuccessResponse, buildErrorResponse } from "../utils/responseBuilder";

const bcrypt = require('bcrypt');

const Utilisateur = require("../models/utilisateur");

/**
 * Génère un code de parrainage unique de 12 caractères (lettres et chiffres).
 * 
 * @returns {Promise<string>} - Retourne une chaîne de 12 caractères unique.
 * 
 * @throws {Error} - Si une erreur se produit lors de la vérification en base de données.
 */
const generateReferralCode = async (): Promise<string> => {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let referralCode: string;
    let existingCode: any;

    while (true) {
        referralCode = Array.from({ length: 12 }, () => 
            characters[Math.floor(Math.random() * characters.length)]
        ).join("");

        existingCode = await Utilisateur.findOne({ referral_link: referralCode });

        if (!existingCode) break;
    }

    return referralCode;
};

/**
 * Fonction d'enregistrement d'un nouvel utilisateur.
 * Cette fonction permet de valider les informations d'un utilisateur, de vérifier que l'email n'est pas déjà utilisé,
 * de hasher le mot de passe, puis de créer un nouvel utilisateur dans la base de données.
 * 
 * @param {Request} req - L'objet de la requête, qui contient les informations envoyées par le client.
 * Il attend un corps de requête avec des informations sur l'utilisateur telles que le prénom, nom, email, mot de passe, etc.
 * @param {Response} res - L'objet de la réponse, utilisé pour envoyer la réponse au client.
 * 
 * @returns {Promise<Response>} - Retourne une réponse HTTP. Selon le cas, cela peut être :
 *  - Un code 400 si certains champs sont manquants dans la requête.
 *  - Un code 409 si l'email est déjà utilisé par un autre utilisateur.
 *  - Un code 201 avec le succès de la création de l'utilisateur.
 *  - Un code 500 en cas d'erreur serveur.
 * 
 * @throws {Error} - Si une erreur se produit lors de l'exécution de la fonction (par exemple, une erreur de base de données ou de hachage de mot de passe).
 */
export async function registration(req: Request, res: Response) {
    try {
        const { first_name, last_name, email, password, role, city, postal_code, phone, address, referral_link } = req.body;

        if (!first_name || !last_name || !email || !password || !role || !city || !postal_code || !phone || !address) {
            return res.status(400).send(buildErrorResponse(null, 400, "Tous les champs sont requis"));
        }

        const existingEmail = await Utilisateur.findOne({ email });
        if (existingEmail) {
            return res.status(409).send(buildErrorResponse(null, 409, "Cet email est déjà utilisé"));
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newReferralLink: string = await generateReferralCode();

        let referralDiscount: boolean = false;
        if (referral_link) {
            const referredUser = await Utilisateur.findOne({ referral_link: referral_link });

            if (!referredUser) {
                return res.status(400).send(buildErrorResponse(null, 400, "Code de parrainage invalide"));
            }
            
            referralDiscount = true;
        }

        const newUser = await Utilisateur.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            city,
            postal_code,
            phone,
            address,
            referral_link: newReferralLink,
            referral_discount: referralDiscount
        });

        return res.status(201).send(buildSuccessResponse(newUser, 201, "Utilisateur créé avec succès"));
    } catch (err) {
        return res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la création de l'utilisateur"));
    }
}