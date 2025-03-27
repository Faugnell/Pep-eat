const express = require('express');
const router = express.Router();
 
const articlesController = require("../controllers/articles.controller");
 
// Tous les articles
router.get("/", articlesController.list);
 
// Détails d'un article
router.get("/:id", articlesController.read);
 
// Créer un article
router.post("/", articlesController.create);
 
// Modifier un article
router.put("/:id", articlesController.update);
 
// Supprimer un article
router.delete("/:id", articlesController.remove);
 
module.exports = router;