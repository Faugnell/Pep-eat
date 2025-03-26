const mongoose = require('mongoose');

const Commande = mongoose.model('Commande', new mongoose.Schema({
    user_id: String,
    restaurant_id: String,
    plat_ids: [String],
    date: Date,
    status: String
}));

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/commande/get', async (req, res) => {
    try {
        const result = await Commande.find({});

        res.send({
            code: 200,
            ok: true,
            message: 'Liste des commandes',
            data: result
        });
    } catch (error) {
        console.error(error);
    }
})

async function main() {
    // Attendre la connexion à la base de données avant de lancer le serveur
    try {
        await mongoose.connect('mongodb+srv://doadmin:password@pepeat-mongo-db-ac667bc3.mongo.ondigitalocean.com/pepeat?tls=true&authSource=admin&replicaSet=pepeat-mongo-db');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données');
        console.error(error);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Lancement de du micro-service gérant les commandes sur le port : ${port}`);
    })
}

main();