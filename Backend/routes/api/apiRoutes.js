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
  getUser,
  postUpdateUser,
  postChangePassword,
} = require('../../controllers/api');

router.post('/login/', postLogin);

router.post(
  '/users/',
  authenticateToken,
  authUser,
  authAdmin,
  postCreateUser
);

router.get('/users/', authenticateToken, authUser, authAdmin, getAllUsers);

router.get('/users/:id', authenticateToken, authUser, authAdmin, getUser);

router.post(
  '/users/change-password/',
  authenticateToken,
  authUser,
  postChangePassword
);

router.post(
  '/users/:id',
  authenticateToken,
  authUser,
  authAdmin,
  postUpdateUser
);

module.exports = router;
