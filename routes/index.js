const router = require("express").Router();

const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/", usersRouter);
router.use("/", clothingItemsRouter);

module.exports = router;