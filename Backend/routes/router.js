// 3rd party modules
const express = require('express');
const router = express.Router();

// Routes
const apiRoutes = require('./api/apiRoutes');
const orderRoutes = require('./api/orderRoutes');

router.use('/api', apiRoutes);
router.use('/api/order', orderRoutes);

module.exports = router;
