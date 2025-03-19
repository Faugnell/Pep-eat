const express = require('express');
const app = express();
const port = 3101;

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

app.get('/restaurants/get', (req, res) => {
    setTimeout(() => {
        res.send({
            code: 200,
            ok: true,
            message: 'Micro-service gérant les restaurants'
        });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Lancement de du micro-service gérant les restaurants sur le port : ${port}`);
});