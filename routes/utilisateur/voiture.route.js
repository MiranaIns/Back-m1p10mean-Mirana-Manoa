const express = require('express');
const authMiddleware = require("../../middlewares/auth.middleware");
const VoitureController = require("../../controllers/voiture.controller");
const router = express.Router();

router.get('/', authMiddleware(), VoitureController.findAllVoiture);

module.exports = router;