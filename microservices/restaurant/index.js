import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();
const app = express();

import {
    getRestaurants
} from './controllers/restaurant.js';

app.use(express.json());

/* Middleware pour gérer les CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Répondre immédiatement aux preflight requests (requête vérfiant les CORS)
    }

    next();
});

app.get('/', getRestaurants);

async function main() {
    // Attendre la connexion à la base de données avant de lancer le serveur
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données');
        console.error(error);
        process.exit(1);
    }

    app.listen(process.env.PORT, () => {
        console.log(`Lancement de du micro-service gérant les restaurants sur le port : ${process.env.PORT}`);
    });
}

main();