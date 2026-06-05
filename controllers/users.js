const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    name, avatar, email, password,
  } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Email already exists'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

// FIXED LOGIN (uses model method)
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return res.send(user);
  })
  .catch(next);

const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
