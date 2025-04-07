const express = require('express');
const router = express.Router();
const paniersController = require("../controllers/paniers");

// Toutes les paneirs
router.get("/", paniersController.list);

// Détails d'un panier
router.get("/:id", paniersController.read);

// Créer un panier
router.post("/", paniersController.create);

// Modifier un panier
router.put("/:id", paniersController.update);

// Supprimer un panier
router.delete("/:id", paniersController.remove);

module.exports = router;
