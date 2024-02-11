// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../../Middleware/authenticateToken');

// Get user profile
router.get('/:id', authenticate, userController.getUserData); // Changed to use getUserData

// Update user profile
router.put('/:id', authenticate, userController.updateUser);

// Delete user profile
router.delete('/:id', authenticate, userController.deleteUser);

// Get user data (dashboard data)
router.get('/data/:id', authenticate, userController.getDashboardData); // Assuming this is what you want

module.exports = router;
