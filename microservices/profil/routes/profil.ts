const router = require('express').Router();

const profilController = require("../controllers/profil");

// Modifier le profil de l'utilisateur
router.put("/:id", profilController.update);

// Supprimer le profil de l'utilisateur
router.delete("/:id", profilController.remove);

module.exports = router;