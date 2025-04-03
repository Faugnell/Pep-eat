const router = require('express').Router();

const profilController = require("../controllers/profil");

// Modifier le profil de l'utilisateur
router.put("/:id", profilController.update);

module.exports = router;