// 3rd party modules
const express = require('express');
const router = express.Router();

//  Middleware
const {
  authUser,
  authAdmin,
  authenticateToken,
} = require('../../middleware/autentification');

// Controllers
const { getOrder, getOrders } = require('../../controllers/order');

router.get('/:id/', authenticateToken, authUser, getOrder);
router.get('/', authenticateToken, authUser, getOrders);

module.exports = router;
