const router = require('express').Router();

const registrationController = require("../controllers/registration");

// Créer un nouvel utilisateur
router.post("/", registrationController.registration);

module.exports = router;