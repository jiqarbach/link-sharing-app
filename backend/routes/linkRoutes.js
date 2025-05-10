const express = require('express');
const auth = require('../middleware/authMiddleware');
const validateLink = require('../middleware/validateLink');
const {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks
} = require('../controllers/linkController');
const router = express.Router();

router.get('/', auth, getLinks);
router.post('/', auth, validateLink, createLink);
router.put('/:id', auth, validateLink, updateLink);
router.delete('/:id', auth, deleteLink);
router.post('/reorder', auth, reorderLinks);

module.exports = router;
