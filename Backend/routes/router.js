// 3rd party modules
const express = require('express');
const router = express.Router();

// Routes
const apiRoutes = require('./api/apiRoutes');

router.use('/api', apiRoutes);

module.exports = router;
