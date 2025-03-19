const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Hello World!');
    }, 5000);
})

app.listen(port, () => {
    console.log(`Lancement de du micro-service gérant les restaurants sur le port : ${port}`);
})