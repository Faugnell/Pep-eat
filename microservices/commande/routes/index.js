const express = require("express");
const router = express.Router();

const commandesRoutes = require("./commandes");

router.use("/commandes", commandesRoutes);

module.exports = router;
