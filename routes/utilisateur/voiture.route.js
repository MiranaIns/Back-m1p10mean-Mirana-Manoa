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
router.get('/devis/', authMiddleware(), VoitureController.findDetailsVoitureDevis);
router.get('/garage/client', authMiddleware(), VoitureController.findAllVoitureGarageClient);
router.post('/devis/annuler', authMiddleware(), VoitureController.annulerVoitureDevis);
router.post('/devis/valider', authMiddleware(), VoitureController.validerVoitureDevis);

module.exports = router;