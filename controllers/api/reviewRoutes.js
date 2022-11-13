const router = require('express').Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async  (req, res) => {
    try {
        const reviewData = await Review.create({
          where: {
            user_id: req.session.user_id,
          },
            reviewMessage: req.body.reviewMessage,
            hero_name: req.body.hero_name,
            username: req.body.username
        });

        res.status(200).json(reviewData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
          attributes: [
            "id",
            "reviewMessage",
          ],
          include: {
            model: User,
            attributes: ["username"]
          }
        });
        
        res.status(200).json(reviewData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


  router.put("/:id", (req, res) => {
    Review.update(
      {
        reviewMessage: req.body.reviewMessage,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((reviewData) => {
        if (!reviewData) {
          res.status(404).json({ message: "No review found with this id" });
          return;
        }
        res.json(reviewData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;