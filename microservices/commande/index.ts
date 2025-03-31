import { Request, Response, NextFunction } from 'express';

require('dotenv').config({ path: './secret/.env' })
const db = require("./utils/db")

const express = require('express');
const routes = require("./routes");

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

async function main() {
    app.listen(process.env.PORT, () => {
        console.log(`Lancement de du micro-service gérant les commandes sur le port : ${process.env.PORT}`);
    })
}

main();