const express = require('express');
const router = express.Router();
const AdminAuthentificationController = require('../controllers/adminAuthentification.controller');

router.post('/login', AdminAuthentificationController.login);
router.post('/register', AdminAuthentificationController.register);
module.exports = router;