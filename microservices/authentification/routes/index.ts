import { Request, Response, Router } from "express";

require('dotenv').config();

const router = Router();
const registrationRoute = require("./registration");
const loginRoute = require("./login");

router.use("/registration", registrationRoute);
router.use("/login", loginRoute);

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("<p>test ok</p>");
});

module.exports = router;
