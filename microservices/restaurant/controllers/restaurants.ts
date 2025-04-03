import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseBuilder';

const Restaurant = require("../models/restaurants");

/**
 * Récupérer tous les restaurants ou un restaurant spécifique
 * @param {string} id - L'identifiant du restaurant à récupérer
 * @return {Array} - La liste des restaurants ou un restaurant spécifique
 * @throws {Error} - Erreur lors de la récupération des restaurants
 */
export async function find(req:Request, res:Response) {
	console.log(`Find restaurant - ${req.params.id ? req.params.id : 'all'}`)

	const match = req.params.id !== undefined ? {_id : new mongoose.Types.ObjectId(req.params.id)} : {};

	try {
		const restaurants =
			/* Si un identifiant est fourni, on récupère le restaurant correspondant */
			await Restaurant.aggregate([
				{
					$match: match
				},
				{
					$lookup: {
						from: "users",
						localField: "id_proprietaire",
						foreignField: "_id",
						as: "proprietaire"
					}
				},
				{
					$unwind: {
						path: "$proprietaire",
						preserveNullAndEmptyArrays: true /* Conserve le restaurant même si le propriétaire n'existe pas */
					}
				},
				{
					$lookup: {
						from: "medias",
						localField: "id_media",
						foreignField: "_id",
						as: "media"
					}
				},
				{
					$unwind: {
						path: "$media",
						preserveNullAndEmptyArrays: true /* Conserve le restaurant même si le média n'existe pas */
					}
				},
				{
					$replaceRoot: {
						newRoot: {
							/* Conserve le restaurant et ajoute le propriétaire et le média (garder uniquement l'image) */
							$mergeObjects: ["$$ROOT", { image: "$media.buffer" }]
						}
					}
				},
				{
					$project: {
						media: 0 /* Supprime le champ media de la réponse créé lors de la jointure et maintenant inutile */
					}
				}
			]);

		res.status(200).send(buildSuccessResponse(restaurants, 200, "Restaurants récupérés avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la récupération des restaurants"));
	}
}

export async function findLike(req:Request, res:Response) {
	console.log(`Find restaurant like : ${req.params.filter}`)
	const filter = req.params.filter

	try {
		const restaurants =
			/* Si un identifiant est fourni, on récupère le restaurant correspondant */
			await Restaurant.aggregate([
				{
					$match: {
						$or: [
							{
								nom: { $regex: '.*' + filter + '.*' }
							},
							{
								type_cuisine: { $regex: '.*' + filter + '.*' }
							},
						]
					}
				},
				{
					$lookup: {
						from: "users",
						localField: "id_proprietaire",
						foreignField: "_id",
						as: "proprietaire"
					}
				},
				{
					$unwind: {
						path: "$proprietaire",
						preserveNullAndEmptyArrays: true /* Conserve le restaurant même si le propriétaire n'existe pas */
					}
				},
				{
					$lookup: {
						from: "medias",
						localField: "id_media",
						foreignField: "_id",
						as: "media"
					}
				},
				{
					$unwind: {
						path: "$media",
						preserveNullAndEmptyArrays: true /* Conserve le restaurant même si le média n'existe pas */
					}
				},
				{
					$replaceRoot: {
						newRoot: {
							/* Conserve le restaurant et ajoute le propriétaire et le média (garder uniquement l'image) */
							$mergeObjects: ["$$ROOT", { image: "$media.buffer" }]
						}
					}
				},
				{
					$project: {
						media: 0 /* Supprime le champ media de la réponse créé lors de la jointure et maintenant inutile */
					}
				}
			]);

		res.status(200).send(buildSuccessResponse(restaurants, 200, "Restaurants récupérés avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la récupération des restaurants"));
	}
}

/**
 * Créer un restaurant
 * @param nom - Le nom du restaurant
 * @param description - La description du restaurant
 * @param adresse - L'adresse du restaurant
 * @param telephone - Le numéro de téléphone du restaurant
 * @param horaires - Les horaires d'ouverture du restaurant
 * @param id_proprietaire - L'identifiant du propriétaire du restaurant
 * @param siret - Le SIRET du restaurant
 * @param type_cuisine - Le type de cuisine du restaurant
 * @returns {Object} - L'objet restaurant créé
 * @throws {Error} - Erreur lors de la création du restaurant
 */
export async function create(req:Request, res:Response) {
	// TODO: Supprimer la ligne ci-dessous
	if (req.body.id_proprietaire === undefined) {
		req.body.id_proprietaire = '660c1a1e2f5a5b1a4b8e4c21';
	}

	try {
		const restaurant = await Restaurant.findOne({ siret: req.body.siret });

		if (restaurant !== null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Un restaurant avec ce SIRET existe déjà"));
		}
	} catch (err) {
		return res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la vérification du SIRET"));
	}

	try {
		const restaurant = await Restaurant.create(req.body);
		
		if (restaurant === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la création du restaurant"));
		}

		return res.status(200).send(buildSuccessResponse(restaurant, 200, "Restaurant créé avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la création du restaurant"));
	}
}

/**
 * Mettre à jour un restaurant
 * @param {string} id - L'identifiant du restaurant à mettre à jour
 * @param {Object} body - Les nouvelles données du restaurant
 * @return {Object} - L'objet restaurant mis à jour
 * @throws {Error} - Erreur lors de la mise à jour du restaurant
 */
export async function update(req:Request, res:Response) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).send(buildErrorResponse(null, 400, "Aucun identifiant fourni"));
	}

	try {
		const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);

		if (restaurant === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la mise à jour du restaurant"));
		}

		const updatedRestaurant = await Restaurant.find({ _id: id });

		return res.status(200).send(buildSuccessResponse(updatedRestaurant, 200, "Restaurant mis à jour avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la mise à jour du restaurant"));
	}
}

/**
 * Supprimer un restaurant
 * @param id - L'identifiant du restaurant à supprimer 
 * @returns {Object} - L'objet restaurant supprimé
 * @throws {Error} - Erreur lors de la suppression du restaurant
 */
export async function remove(req:Request, res:Response) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).send(buildErrorResponse(null, 400, "Aucun identifiant fourni"));
	}

	try {
		const restaurant = await Restaurant.findOneAndDelete({ _id: id });

		if (restaurant === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la suppression du restaurant"));
		}
	
		return res.status(200).send(buildSuccessResponse(restaurant, 200, "Restaurant supprimé avec succès"));
	} catch (err) {
		res.status(500).send(buildErrorResponse(err, 500, "Erreur lors de la suppression du restaurant"));
	}
}