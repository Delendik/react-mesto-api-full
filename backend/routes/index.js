const router = require('express').Router();

const userRoutes = require('./users.js');
const cardRoute = require('./cards.js');
const errorRoute = require('./error.js');

router.use('/', userRoutes);
router.use('/', cardRoute);
router.use('/', errorRoute);

module.exports = router;
