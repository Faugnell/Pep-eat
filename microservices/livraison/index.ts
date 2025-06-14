require('dotenv').config()

import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const express = require('express');
const routes = require("./routes");

const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use("/", jsonParser, routes);
app.use(express.json());

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

// POSTMAN : GET http://localhost:3105/