const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const heroSearchRoutes = require('./heroSearchRoutes');
const overviewRoutes = require('./overviewRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/hero-search', heroSearchRoutes);
router.use('/overview', overviewRoutes);

module.exports = router;