const router = require("express").Router();
const { Hero, User, Review } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth,  (req, res) => {
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "reviewMessage",
      "hero_id"
    ],
    include: [
      {
        model: Hero,
        attributes: [
          "id", "name", "description", "picture",],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((post) => post.get({ plain: true }));
      res.render("overview", { reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Review.findByPk(req.params.id, {
      attributes: [
        "id",
        "reviewMessage",
        "hero_id",
      ],
    include: [
      {
        model: Hero,
        attributes: ["id", "name", "decription", "picture"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((reviewdData) => {
      if (reviewdData) {
        const review = reviewdData.get({ plain: true });
        res.render("edit-review", {
          review,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;