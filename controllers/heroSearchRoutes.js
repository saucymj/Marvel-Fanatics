const router = require("express").Router();
const withAuth = require("../utils/auth");


router.get("/", withAuth, (req, res) => {
  res.render("createReview", { loggedIn: true });
});


module.exports = router;
