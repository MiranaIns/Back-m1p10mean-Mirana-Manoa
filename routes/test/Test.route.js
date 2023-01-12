const express = require('express');
const router = express.Router();
const TestController = require('../../controllers/test/Test.controller');

router.get('/test', TestController.test);

module.exports = router;