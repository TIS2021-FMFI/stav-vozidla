// 3rd party modules
const express = require('express');
const router = express.Router();

// Controllers
const {
  sendResetEmail,
  setForgottenPassword,
} = require('../../controllers/passwordReset');

router.post('/', sendResetEmail);
router.post('/:userId/:token', setForgottenPassword);

module.exports = router;
