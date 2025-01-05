const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct

// POST route to save user data
router.post('/entry', userController.saveUserData); // Ensure this is the correct function name

// GET route to fetch all users (optional)
router.get('/', userController.getAllUsers);

module.exports = router;
