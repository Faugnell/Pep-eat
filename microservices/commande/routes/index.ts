import { Request, Response } from 'express';

const express = require('express');

const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const router = express.Router();

const commandesRoutes = require("./commandes");

router.use("/commandes", jsonParser, commandesRoutes);

router.get("/", (req:Request, res:Response)=>{
    res.status(200).send("<h1>zbraa</h1>")
})

module.exports = router;