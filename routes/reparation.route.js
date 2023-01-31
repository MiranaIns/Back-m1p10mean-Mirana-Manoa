const express = require('express');
const ratAuthMiddleware = require("../middlewares/ratAuth.middleware");
const router = express.Router();
const ReparationController = require("../controllers/reparation.controller");

router.get('/', ratAuthMiddleware(), ReparationController.findAllReparation);

module.exports = router;