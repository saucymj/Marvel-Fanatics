const router = require('express').Router();
const { Hero, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const heroData = await Hero.findAll({
          attributes: ["id", "name", "picture"],
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

        res.status(200).json(heroData);

    } catch (err) {
        console.log(err);
        res.json(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const heroData = await Hero.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "name", "picture"],
            include: [{
                model: Review,
                attributes: [
                "id",
                "reviewMessage",
                "hero_id",
                "user_id",
            ]    
            }],
            include: { model: User},
            attributes: ["username"],
        });
        if (!heroData) {
            res
              .status(400)
              .json({ message: 'No character with this ID!' });
            return;
          }
      

        res.status(200).json(heroData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const heroData = await Hero.create({
            id: req.body.hero_id,
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture,
        });

        res.status(200).json(heroData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/:id", withAuth, (req, res) => {
    Hero.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((heroData) => {
        if (!heroData) {
          res.status(404).json({ message: "No character found with this id" });
          return;
        }
        res.json(heroData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;


