import mongoose from 'mongoose';
import { Request, Response, NextFunction, request } from 'express';

require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();

app.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Répondre immédiatement aux preflight requests (requête vérfiant les CORS)
    }
 
    next();
});

app.use(express.json());

app.use("/", routes);

app.use((req:Request) => {
    console.log(req)
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
        console.log("Connexion à MongoDB réussie");
        // Attendre la connexion à la base de données avant de lancer le serveur
        app.listen(process.env.PORT, () => {
            console.log(`Lancement du micro-service gérant les commandes sur le port : `+ process.env.PORT);
        })
    }
    catch (error) {
        console.error("Échec de connexion à MongoDB :", error);
    }  
}

main();