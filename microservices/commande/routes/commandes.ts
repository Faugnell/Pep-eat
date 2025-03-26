const express = require('express');
const router = express.Router();

const commandesController = require("../controllers/commandes");

// Tous les artistes
router.get("/", commandesController.list);

// Détails d'un artiste
router.get("/:id", commandesController.read);

// Créer un artiste
router.post("/", commandesController.create);

// Modifier un artiste
router.put("/:id", commandesController.update);

// Supprimer un artiste
router.delete("/:id", commandesController.remove);

module.exports = router;
