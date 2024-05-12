// routes/userRoutes.js

const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const verifyAuth = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/roleMiddleware');

router.get('/allusers', [verifyAuth, checkAdmin], userController.getAllUsers);

module.exports = router;