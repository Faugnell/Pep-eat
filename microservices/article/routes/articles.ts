const express = require('express');
const router = express.Router();
 
const articlesController = require("../controllers/articles");
 
// Tous les artistes
router.get("/", articlesController.list);
 
// Détails d'un artiste
router.get("/:id", articlesController.read);
 
// Créer un artiste
router.post("/", articlesController.create);
 
// Modifier un artiste
router.put("/:id", articlesController.update);
 
// Supprimer un artiste
router.delete("/:id", articlesController.remove);
 
module.exports = router;