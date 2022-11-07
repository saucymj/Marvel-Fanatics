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

router.get("/heros/:id", withAuth, async (req, res) => {
  try{ 
    const heroData = await Hero.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "description", "picture"],
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "reviewMessage",
          "hero_id",
          "user_id",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
  if (!heroData) {
    res.status(404).json({ message: "No character found with this id" });
    return;
  }
  const hero = heroData.get({ plain: true });

  res.render("heros", {
    hero,
    loggedIn: req.session.loggedIn,
  });
} catch (err) {
  console.log(err);
      res.status(500).json(err);
}
  
});

router.get("/reviews", async (req, res) => {
  try{ 
    const reviewData = await Review.findAll({
    attributes: [
      "id",
      "reviewMessage",
      "hero_id",
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


router.get("/users/:username", withAuth, (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    attributes: ["username"],
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "reviewMessage",
          "hero_id",
          "user_id",
        ],
        include: {
          model: Hero,
          attributes: ["name", "description", "picture"],
        },
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      const user = userData.get({ plain: true });
      res.render("user-account", {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;