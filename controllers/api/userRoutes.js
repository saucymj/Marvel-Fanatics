const router = require('express').Router();
const { User, Hero, Review } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Review,
          attributes: ["id", "reviewMessage", "hero_name", "user_id"],
          include: {
            model: Hero,
            attributes: ["name", "picture"],
          },
        },
      ],
  });

  res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.email = userData.email;
          req.session.password = userData.password;
          req.session.loggedIn = true;
      
            res.status(200).json(userData);
          });
      
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
  try {
      const userData = await User.findOne({
          where: {
              id: req.params.id
          },
          include: [
            {
              model: Review,
              attributes: ["id", "reviewMessage", "hero_name", "user_id"],
              include: {
                model: Hero,
                attributes: ["name", "picture"],
              },
            },
          ],
      });
      if (!userData) {
          res
            .status(400)
            .json({ message: 'No user with this ID!' });
          return;
        }
    

      res.status(200).json(userData);

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
              },
         });

         if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
          }
      
          const validPassword = await userData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
          }
          
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.email = userData.email;
            req.session.password = userData.password;
            req.session.loggedIn = true;
      
            res.status(200).json({ user: userData, message: 'You are now successfully logged in!' });
          });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
      
 router.post('/logout', (req, res) => {
     if (req.session.loggedIn) {
     req.session.destroy(() => {
     res.status(204).end();
    });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(500).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
      
module.exports = router;
      