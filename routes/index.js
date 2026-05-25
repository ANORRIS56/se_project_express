const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { getItems } = require('../controllers/clothingItems');

const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');

const auth = require('../middlewares/auth');

const { validateUser, validateLogin } = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.get('/items', getItems);

router.use(auth);

router.use('/', usersRouter);
router.use('/', clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
