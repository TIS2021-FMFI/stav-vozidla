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
const {
  postLogin,
  getAllUsers,
  postCreateUser,
} = require('../../controllers/api');

router.post('/login/', postLogin);

router.post('/users/', authenticateToken, authUser, authAdmin, postCreateUser);
router.get('/users/', authenticateToken, authUser, authAdmin, getAllUsers);

module.exports = router;
