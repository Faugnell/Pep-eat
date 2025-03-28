import mongoose from 'mongoose';

const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
    nom: String,
    adresse: String,
    id_proprietaire: String,
    siret: String
}));

export async function getRestaurants(req, res) {
    try {
        const result = await Restaurant.find({});

        res.send({
            code: 200,
            ok: true,
            message: 'Liste des restaurants',
            data: result
        });
    } catch (error) {
        console.error(error);
    }
}