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
  postLogout,
  getAllUsers,
  postCreateUser,
  getUser,
  postUpdateUser,
  postChangePassword,
  getLoggedUser,
  deleteUser,
} = require('../../controllers/api');

router.post('/login/', postLogin);
router.post('/logout/', postLogout);

router.post(
  '/users/',
  authenticateToken,
  authUser,
  authAdmin,
  postCreateUser
);

router.get('/users/', authenticateToken, authUser, authAdmin, getAllUsers);

router.get(
  '/users/logged-user/',
  authenticateToken,
  authUser,
  getLoggedUser
);

router.get('/users/:id', authenticateToken, authUser, authAdmin, getUser);

router.delete(
  '/users/:id',
  authenticateToken,
  authUser,
  authAdmin,
  deleteUser
);

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
