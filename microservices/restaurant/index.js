const express = require('express');
const app = express();
const port = 3101;
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://doadmin:T047v2J9G1CVP8j3@pepeat-mongo-db-ac667bc3.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=pepeat-mongo-db";
const client = new MongoClient(uri);

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

app.get('/restaurants/get', async (req, res) => {
    try {
        const database = client.db('pepeat');
        const restaurants = database.collection('restaurants');

        const query = {};
        const result = await restaurants.find(query).toArray();

        res.send({
            code: 200,
            ok: true,
            message: 'Liste des restaurants',
            data: result
        })
    } catch (error) {
        console.error(error);
        // TODO: Gérer les erreurs dans les logs
    }
});

app.listen(port, () => {
    console.log(`Lancement de du micro-service gérant les restaurants sur le port : ${port}`);
});