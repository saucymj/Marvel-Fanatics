const router = require("express").Router();

const userRoutes = require("./userRoutes");
const heroRoutes = require("./heroRoutes");
const reviewRoutes = require("./reviewRoutes");


router.use("/users", userRoutes);
router.use("/heros", heroRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;

