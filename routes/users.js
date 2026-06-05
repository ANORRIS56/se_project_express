const express = require('express');

const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

const { validateUpdateUser } = require('../middlewares/validation');

const router = express.Router();

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateUpdateUser, updateCurrentUser);

module.exports = router;
