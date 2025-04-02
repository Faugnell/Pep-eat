import { Request, Response } from 'express';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseBuilder';

const Media = require("../models/medias");

/**
 * Récupérer un média spécifique
 * @param {string} id - L'identifiant du média à récupérer
 * @returns {Object} - L'objet média récupéré
 * @throws {Error} - Erreur lors de la récupération du média
 */
export async function find(req:Request, res:Response) {
	const id = req.params.id;
	
	try {
		const media = await Media.findById(id);

		res.status(200).send(buildSuccessResponse(media, 200, "Média récupéré avec succès"));
	} catch (err) {
		console.log(err);
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la récupération du média"));
	}
}

/**
 * Créer un média
 * @param {string} buffer - Le buffer du média à créer en base64
 * @return {Object} - L'objet média créé
 * @throws {Error} - Erreur lors de la création du média
 */
export async function create(req:any, res:Response) {
	console.log('Création d\'un média avec le buffer :', req.body.buffer); // Log du buffer pour le débogage
	console.log(req.files);

	if (!req.body.buffer) {
		return res.status(400).send(buildErrorResponse(null, 400, "Aucun buffer fourni"));
	}

	try {
		const media = await Media.create(req.body);
		
		if (media === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la création du média"));
		}

		return res.status(200).send(buildSuccessResponse(media, 200, "Média créé avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la création du média"));
	}
}

/**
 * Mettre à jour un média
 * @param {string} id - L'identifiant du média à mettre à jour
 * @param {string} buffer - Les nouvelles données du média
 * @return {Object} - L'objet média mis à jour
 * @throws {Error} - Erreur lors de la mise à jour du média
 */
export async function update(req:Request, res:Response) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).send(buildErrorResponse(null, 400, "Aucun identifiant fourni"));
	}

	try {
		const media = await Media.findByIdAndUpdate(id, req.body);

		if (media === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la mise à jour du média"));
		}

		const updatedMedia = await Media.find({ _id: id });

		return res.status(200).send(buildSuccessResponse(updatedMedia, 200, "Média mis à jour avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la mise à jour du média"));
	}
}

/**
 * Supprimer un média
 * @param id - L'identifiant du média à supprimer 
 * @returns {Object} - L'objet média supprimé
 * @throws {Error} - Erreur lors de la suppression du média
 */
export async function remove(req:Request, res:Response) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).send(buildErrorResponse(null, 400, "Aucun identifiant fourni"));
	}

	try {
		const media = await Media.findOneAndDelete({ _id: id });

		if (media === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la suppression du média"));
		}
	
		return res.status(200).send(buildSuccessResponse(media, 200, "Média supprimé avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la suppression du média"));
	}
}