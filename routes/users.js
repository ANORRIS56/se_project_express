const express = require('express');

const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

const router = express.Router();

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateCurrentUser);

module.exports = router;
