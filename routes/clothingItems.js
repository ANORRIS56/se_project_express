const express = require("express");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const router = express.Router();

router.get("/items", getItems);
router.post("/items", createItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id/likes", likeItem);
router.delete("/items/:id/likes", dislikeItem);

module.exports = router;
