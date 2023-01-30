const express = require('express');
const ratAuthMiddleware = require("../middlewares/ratAuth.middleware");
const router = express.Router();
const ReparationController = require("../controllers/reparation.controller");

router.get('/', ratAuthMiddleware(), ReparationController.findAllReparation);
router.get('/a-faire', ratAuthMiddleware(), ReparationController.findReparationAFaire);
router.post('/commencer', ratAuthMiddleware(), ReparationController.commencerReparationVoiture);
router.get('/en-cours', ratAuthMiddleware(), ReparationController.findReparationEnCours);

module.exports = router;