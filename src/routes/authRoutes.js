// routes/authRoutes.js

const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/register', authController.register);

router.get('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;