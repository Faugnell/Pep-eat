const router = require('express').Router();

const notificationsController = require("../controllers/notifications");

// Récupérer toutes les notifications
router.get("/", notificationsController.find);

// Récupérer les notifications d'un utilisateur
router.get("/user/:userId", notificationsController.find);

// Créer une notification
router.post("/", notificationsController.create);

module.exports = router;