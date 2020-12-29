const express = require('express');
const HomeController = require('../Controllers/Home');
const router = express.Router();


router.get('/', HomeController.Index);

module.exports = router
