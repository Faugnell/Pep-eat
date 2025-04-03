import { Request, Response, Router } from "express";

require('dotenv').config();

const router = Router();
const profilRoute = require("./profil");

router.use("/profil", profilRoute);

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("<p>test ok</p>");
});

module.exports = router;
