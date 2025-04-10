require('dotenv').config()

import { Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');
const Notification = require("./models/notifications");

const express = require('express');
const routes = require("./routes/notifications");

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

app.use("/notifications", jsonParser, routes)
app.use(express.json());

/* Envoie des notifications en temps réel */

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

Notification.watch().on('change', (change:any) => {
    change.fullDocument?.utilisateurs?.forEach((utilisateur: any) => {
        console.log('envoi à user:', utilisateur.toString())
        io.to(`user:${utilisateur.toString()}`).emit('new-notification', change.fullDocument);
    });
});

async function main() {
    try {
        // Attendre la connexion à la base de données avant de lancer le serveur
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    } catch(err) {
        console.log(err)
    }

    io.on('connection', (socket: any) => {
        // L’utilisateur doit s’authentifier ou s’identifier
        socket.on('register', (userId: any) => {
            console.log(`Socket ${socket.id} enregistré pour l'utilisateur ${userId}`);
            socket.join(`user:${userId}`); // Le socket rejoint une room spécifique
        });

        socket.on('userDisconnect', () => {
            console.log('Un utilisateur s\'est déconnecté du micro-service de notifications : ' + socket.id);
        });
    });

    server.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Lancement de du micro-service gérant les notifications sur le port : ${process.env.PORT}`);
    })
}

main();