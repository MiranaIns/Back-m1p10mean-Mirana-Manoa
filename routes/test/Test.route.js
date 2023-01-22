const express = require('express');
const router = express.Router();
const TestController = require('../../controllers/test/Test.controller');
const authMiddleware = require("../../middlewares/auth.middleware");

router.post('/test', authMiddleware(), TestController.test);

module.exports = router;