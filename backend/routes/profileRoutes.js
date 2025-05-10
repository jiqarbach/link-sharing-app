const express = require('express');
const auth = require('../middleware/authMiddleware');
const validateProfile = require('../middleware/validateProfile');
const { getProfile, upsertProfile } = require('../controllers/profileController');
const router = express.Router();

router.get('/', auth, getProfile);
router.post('/', auth, validateProfile, upsertProfile);

module.exports = router;
