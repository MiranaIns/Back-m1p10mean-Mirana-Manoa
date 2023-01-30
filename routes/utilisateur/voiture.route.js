const express = require('express');
const authMiddleware = require("../../middlewares/auth.middleware");
const VoitureController = require("../../controllers/voiture.controller");
const router = express.Router();

router.get('/', authMiddleware(), VoitureController.findAllVoiture);
router.post('/', authMiddleware(), VoitureController.ajoutVoitureClient);
router.post('/garage/', authMiddleware(), VoitureController.depotVoitureGarage);

module.exports = router;