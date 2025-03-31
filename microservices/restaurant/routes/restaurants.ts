const router = require('express').Router();

const restaurantsController = require("../controllers/restaurants");

// Récupérer tous les restaurants
router.get("/", restaurantsController.find);

// Récupérer un restaurant spécifique
router.get("/:id", restaurantsController.find);

// Créer un restaurant
router.post("/", restaurantsController.create);

// Modifier un restaurant
router.put("/:id", restaurantsController.update);

// Supprimer un restaurant
router.delete("/:id", restaurantsController.remove);

module.exports = router;