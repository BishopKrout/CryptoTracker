const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get('/user/:id', userController.getUser);

// Update user profile
router.put('/user/:id', userController.updateUser);

// Delete user profile
router.delete('/user/:id', userController.deleteUser);

module.exports = router;