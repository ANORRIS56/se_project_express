const express = require('express');

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');

const {
  validateClothingItem,
  validateId,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/items', getItems);

router.post('/items', validateClothingItem, createItem);

router.delete('/items/:id', validateId, deleteItem);

router.put('/items/:id/likes', validateId, likeItem);

router.delete('/items/:id/likes', validateId, dislikeItem);

module.exports = router;
