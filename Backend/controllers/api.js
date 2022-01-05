// 3rd party modules
const jwt = require('jsonwebtoken');

// Database models
const db = require('../models');
const axios = require('axios');
const crypto = require('crypto');
const sendEmail = require('./sendEmail');
const { APP_URL, JWT_SECRET } = require(__dirname +
  '/../config/config.json');

module.exports.postLogin = async (req, res, next) => {
  //hladame usera podla parametrov z tela http requestu
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then(async (user) => {
      if (user == null || !(await user.validPassword(req.body.password))) {
        return res.status(401).send('Invalid Credentials');
      }
      const token = jwt.sign({ user }, JWT_SECRET);
      res.cookie('SESSIONID', token, { httpOnly: true, secure: false }); // zmen secure na true ak spravime https
      res.send({
        id: user.idUsers,
        idGefco: user.idGefco,
        name: user.name,
        email: user.email,
        isAdmin: user.admin,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    }); //ak najdeme vratime token zasifrovany podla tajneho kodu
};

module.exports.postLogout = async (req, res) => {
  res.clearCookie('SESSIONID');
  res.end();
};

module.exports.postCreateUser = async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.password ||
    req.body.admin === undefined
  ) {
    res.status(400).send({
      status: false,
      message: 'No email or password or isAdmin',
    });
  } else {
    const token = crypto.randomBytes(32).toString('hex');
    db.user
      .create({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        idGefco: req.body.idGefco,
        name: req.body.name,
        resetToken: token,
      })
      .then(async (user) => {
        const link = `${APP_URL}/api/password-reset/${user.idUsers}/${token}`;
        const massage = `You can set up new password on following link: ${link}`;
        await sendEmail(user.email, 'Password setup', massage);
        res.status(201).send({
          id: user.idUsers,
          idGefco: user.idGefco,
          name: user.name,
          email: user.email,
          isAdmin: user.admin,
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
};

module.exports.postChangePassword = async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    res.status(400).send({
      status: false,
      message: 'No old or new password',
    });
  } else {
    const user = await db.user.findOne({
      where: { idUsers: req.user.user.idUsers },
    });
    //if (!user) return res.status(400).send('User dont exist');
    if (!(await user.validPassword(req.body.oldPassword))) {
      return res.status(401).send('Invalid old password');
    }
    return user
      .update({
        password: req.body.newPassword,
      })
      .then(function (user) {
        res.status(201).send({
          id: user.idUsers,
          idGefco: user.idGefco,
          name: user.name,
          email: user.email,
          isAdmin: user.admin,
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
};

module.exports.postUpdateUser = async (req, res, next) => {
  return db.user
    .findOne({
      where: { idUsers: req.params.id },
    })
    .then(function (result) {
      if (!result) return res.status(400).send('User dont exist');
      return result
        .update({
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.admin,
          idGefco: req.body.idGefco,
          name: req.body.name,
        })
        .then(function (user) {
          res.status(201).send({
            id: user.idUsers,
            idGefco: user.idGefco,
            name: user.name,
            email: user.email,
            isAdmin: user.admin,
          });
        });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  db.user
    .findAll()
    .then((users) =>
      res.send(
        users.map((user) => ({
          id: user.idUsers,
          idGefco: user.idGefco,
          name: user.name,
          email: user.email,
          isAdmin: user.admin,
        }))
      )
    )
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports.getUser = (req, res, next) => {
  db.user
    .findOne({ where: { idUsers: req.params.id } })
    .then((user) => {
      if (!user) return res.status(400).send('User dont exist');
      res.send({
        id: user.idUsers,
        idGefco: user.idGefco,
        name: user.name,
        email: user.email,
        isAdmin: user.admin,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports.deleteUser = (req, res, next) => {
  db.user
    .findOne({ where: { idUsers: req.params.id } })
    .then(async (user) => {
      if (!user) return res.status(400).send('User dont exist');
      if (user.dataValues.idUsers == req.user.user.idUsers)
        return res.status(400).send('Cant delete yourself');
      console.log(await user.destroy());
      res.status(204).send();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports.getLoggedUser = (req, res) => {
  return res.send({
    id: req.user.user.idUsers,
    idGefco: req.user.user.idGefco,
    name: req.user.user.name,
    email: req.user.user.email,
    isAdmin: req.user.user.admin,
  });
};
