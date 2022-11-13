const router = require("express").Router();
const { Hero, User, Review } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const heroData = await Hero.findAll({
    attributes: ["id", "name", "description", "picture"],
  })
  let heros = heroData.map((hero) => hero.get({ plain: true }));
      res.render("homepage", {
        heros,
        loggedIn: req.session.loggedIn,
      });
} catch (err) {
  console.log(err);
      res.status(500).json(err);
}
  
});


router.get("/reviews", withAuth, async (req, res) => {
  try{ 
    const reviewData = await Review.findAll({
    attributes: [
      "id",
      "reviewMessage",
      "hero_name",
    ],
    include: [
      {
        model: Hero,
        attributes: ["id", "name", "description", "picture"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  const reviews = reviewData.map((post) => post.get({ plain: true }));

      res.render("reviews", {
        reviews,
        loggedIn: req.session.loggedIn,
      });
  } catch (err) {
    console.log(err);
      res.status(500).json(err);
  }
});




router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;