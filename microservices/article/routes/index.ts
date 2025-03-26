import { Request, Response, NextFunction } from 'express';

const express = require('express');
const router = express.Router();

const articlesRoutes = require("./articles");

router.use("/articles", articlesRoutes);

router.get("/",(req:Request, res:Response)=>{
    res.status(200).send("<h1>Hello World!</h1>")
})

module.exports = router;