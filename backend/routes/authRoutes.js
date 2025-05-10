const express = require('express');
const { signup, login } = require('../controllers/authController');
const validateInput = require('../middleware/validateInput');
const router = express.Router();

router.post('/signup', validateInput, signup);
router.post('/login', validateInput, login);

module.exports = router;
