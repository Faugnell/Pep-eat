const Restaurant = require("../models/restaurants")

async function findAll() {
	
}

async function find(id: string) {
	try {
		const restaurants = await Restaurant.find({ _id: id });
		return restaurants;
	} catch (err) {
		console.log("Erreur lors de la récupération des restaurants :", err);
		return err
	}
}

function create(newCommand: any) {
	// Restaurant.create({
	// 	"_id": {
	// 		"$oid": "67e31ff4224030298c111dad"
	// 	},
	// 	"user_id": "6601143d8f1b4c001f23a1b2",
	// 	"restaurant_id": "6601144e8f1b4c001f23a1b3",
	// 	"plat_ids": [
	// 		"6601145f8f1b4c001f23a1b4",
	// 		"6601146d8f1b4c001f23a1b5"
	// 	],
	// 	"date": "2024-03-25T12:30:00Z",
	// 	"status": "en cours",
	// 	"note": "Livraison rapide demandée"
	// });
}

function update(id: number, updatedCommand: any) {

}

function remove(id: any) {

}

module.exports = {
	findAll,
	find,
	create,
	update,
	remove,
};
