const express = require('express');
const authMiddleware = require("../../middlewares/auth.middleware");
const VoitureController = require("../../controllers/voiture.controller");
const router = express.Router();
const ratAuthMiddleware = require("../../middlewares/ratAuth.middleware");

router.get('/', authMiddleware(), VoitureController.findAllVoiture);
router.post('/', authMiddleware(), VoitureController.ajoutVoitureClient);
router.post('/garage/', authMiddleware(), VoitureController.depotVoitureGarage);
router.get('/garage/', ratAuthMiddleware(), VoitureController.findAllVoitureGarage);
router.post('/devis/', ratAuthMiddleware(), VoitureController.ajoutVoitureDevis);

module.exports = router;