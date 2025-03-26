import { Request, Response, NextFunction } from 'express';

require('dotenv').config({ path: './secret/.env' })
const express = require('express');
const routes = require("./routes");
const Mongoose = require('mongoose');

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

app.use("/", routes)
app.use(express.json());

Mongoose.connect(process.env.MONGO_CONNECTION_STRING)

async function main() {
    // Attendre la connexion à la base de données avant de lancer le serveur
    app.listen(process.env.PORT, () => {
        console.log(`Lancement de du micro-service gérant les commandes sur le port : ${process.env.PORT}`);
    })
}

main();

module.exports = Mongoose