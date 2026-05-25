const ClothingItem = require('../models/clothingItem');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }

      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.id)
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }

      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You cannot delete another user's item");
      }

      return ClothingItem.findByIdAndDelete(req.params.id);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }

      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }

      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }

      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }

      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }

      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
