const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Profile management (protected)
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
