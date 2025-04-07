const router = require('express').Router();

const livraisonsController = require("../controllers/livraisons");

// Toutes les livraisons
router.get("/", livraisonsController.list);

// Détails d'une livraison
router.get("/:id", livraisonsController.read);

// Créer une commande
router.post("/", livraisonsController.create);

// Modifier la livraison du livreur
router.put("/:id", livraisonsController.update);

module.exports = router;