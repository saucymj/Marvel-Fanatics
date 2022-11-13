const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User } = require('../models');

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    
    const users = userData.map((project) => project.get({ plain:true}));
    res.render("createReview", { users, loggedIn: true });
  } catch (err) {
    res.status.json(err)
  }
});


module.exports = router;
