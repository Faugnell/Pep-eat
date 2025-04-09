import { Request, Response, Router } from "express";

require('dotenv').config();

const router = Router();
const livraisonsRoute = require("./livraisons");

router.use("/livraisons", livraisonsRoute);

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("<p>test ok</p>");
});

module.exports = router;
