const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/Users")

console.log(2)
router.post('/find', UserController.New);
router.post('/new', UserController.Create);
router.get('/login', UserController.Index);
router.post('/login', UserController.Authenticate);
router.get('/logout', UserController.Logout)

module.exports = router