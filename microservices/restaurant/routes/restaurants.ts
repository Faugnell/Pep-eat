const router = require('express').Router();

const restaurantsController = require("../controllers/restaurants");

// Tous les artistes
router.get("/", restaurantsController.find);

// Détails d'un artiste
router.get("/:id", restaurantsController.find);

// Créer un artiste
router.post("/", restaurantsController.create);

// Modifier un artiste
router.put("/:id", restaurantsController.update);

// Supprimer un artiste
router.delete("/:id", restaurantsController.remove);

module.exports = router;