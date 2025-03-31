const express = require('express');
const router = express.Router();
const commandesController = require("../controllers/commandes");

// Toutes les commandes
router.get("/", commandesController.list);

// Détails d'une commande
router.get("/:id", commandesController.read);

// Créer une commande
router.post("/", commandesController.create);

// Modifier une commande
router.put("/:id", commandesController.update);

// Supprimer une commande
router.delete("/:id", commandesController.remove);

module.exports = router;
