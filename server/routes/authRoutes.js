const express = require('express');
const { signup, login, getUser,getUserByEmail} = require('../controllers/authController');
const router = express.Router();
const users = require('../models/User');

// Route for user signup
router.post('/signup', signup);
// Route for user login
router.post('/login', login);

router.get('/email/:email', getUserByEmail);


// Export the router
module.exports = router;
