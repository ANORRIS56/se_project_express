const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server." }),
    );
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data" });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
