require('dotenv').config({ path: './secret/.env' })

import { Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const express = require('express');
const routes = require("./routes/restaurants");

const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

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

app.use("/restaurants", jsonParser, routes)
app.use(express.json());

async function main() {
    try {
        // Attendre la connexion à la base de données avant de lancer le serveur
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    } catch(err) {
        console.log(err)
    }

    app.listen(process.env.PORT, () => {
        console.log(`Lancement de du micro-service gérant les restaurants sur le port : ${process.env.PORT}`);
    })
}

main();