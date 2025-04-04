require('dotenv').config({ path: './secret/.env' })

import { Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const express = require('express');
const routes = require("./routes/medias");

const app = express();
const multer = require('multer');
const upload = multer({limits: { fieldSize: 5 * 1024 * 1024 }}); // Middleware pour gérer les fichiers uploadés


/* Middleware pour gérer les CORS */
app.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Répondre immédiatement aux preflight requests (requête vérfiant les CORS)
    }

    next();
});

app.use("/medias", upload.any(), routes)
app.use(express.json({ limit: '50mb' })); // Limite de 50 Mo pour le corps de la requête
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Limite de 50 Mo pour les données URL-encoded

async function main() {
    try {
        // Attendre la connexion à la base de données avant de lancer le serveur
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    } catch(err) {
        console.log(err)
    }

    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Lancement de du micro-service gérant les médias sur le port : ${process.env.PORT}`);
    })
}

main();