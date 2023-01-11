const express = require('express');
const router = express.Router();
const TestController = require('../../controllers/test/Test.controller');

router.get('/', TestController.test);

module.exports = router;