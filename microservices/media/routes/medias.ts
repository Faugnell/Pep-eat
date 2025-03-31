const router = require('express').Router();

const mediasController = require("../controllers/medias");

// Récupérer un média spécifique
router.get("/:id", mediasController.find);

// Ajouter un média
router.post("/", mediasController.create);

// Modifier un média
router.put("/:id", mediasController.update);

// Supprimer un média
router.delete("/:id", mediasController.remove);

module.exports = router;