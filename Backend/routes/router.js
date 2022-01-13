// 3rd party modules
const express = require('express');
const router = express.Router();

// Routes
const apiRoutes = require('./api/apiRoutes');
const orderRoutes = require('./api/orderRoutes');
const passwordReset = require('./api/passwordReset');
const { E404, errorHandler } = require('../controllers/errorHandler');

router.use('/', apiRoutes);
router.use('/order', orderRoutes);
router.use('/password-reset', passwordReset);
router.use(E404);
router.use(errorHandler);

module.exports = router;
