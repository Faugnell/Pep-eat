const router = require('express').Router();

const loginController = require("../controllers/login");

// Créer un nouvel utilisateur
router.post("/", loginController.login);

module.exports = router;