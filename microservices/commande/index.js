require('dotenv').config({path:'./secret/.env'})

const express = require('express');
const routes = require("./routes");

const app = express();

app.use("/", routes)
app.use(express.json());

async function main() {
    // Attendre la connexion à la base de données avant de lancer le serveur
    app.listen(process.env.PORT, () => {
        console.log(`Lancement de du micro-service gérant les commandes sur le port : ${process.env.PORT}`);
    })
}

main(); 