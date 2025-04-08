import { Request, Response } from 'express';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseBuilder';

const Notification = require("../models/notifications");

/**
 * Récupérer tous les notifications d'un utilisateur
 * @param {string} id - L'identifiant du restaurant à récupérer
 * @return {Array} - La liste des notifications des utilisateurs
 * @throws {Error} - Erreur lors de la récupération des notifications
 */
export async function find(req:Request, res:Response) {
	const userId = req.params.userId;

	let match = {};

	if (userId) { match = { utilisateurs: userId } }

	try {
		const notifications = await Notification.find(match).sort({ date: -1 });

		res.status(200).send(buildSuccessResponse(notifications, 200, "Notifications récupérés avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la récupération des notifications"));
	}
}

/** Créer une notification
 * @param {string} titre - Le titre de la notification
 * @param {string} description - La description de la notification
 * @param {Date} date - La date de la notification
 * @param {Array} utilisateurs - La liste des utilisateurs de la notification
 * @param {string} type - Le type de la notification
 * @param {string} couleur - La couleur de la notification
 * @returns {Object} - L'objet notification créé
 * @throws {Error} - Erreur lors de la création de la notification
 */
export async function create(req:Request, res:Response) {
	try {
		const notification = await Notification.create(req.body);

		if (notification === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la création de la notification"));
		}

		return res.status(200).send(buildSuccessResponse(notification, 200, "Notification créé avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la création de la notification"));
	}
}