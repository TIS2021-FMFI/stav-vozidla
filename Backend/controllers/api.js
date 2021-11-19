// 3rd party modules
const jwt = require('jsonwebtoken');

// Database models
const db = require('../models');
const axios = require('axios');

const JWT_SECRET = require(__dirname + '/../config/config.json')[
  'JWT_SECRET'
];

module.exports.postLogin = async (req, res) => {
  //hladame usera podla parametrov z tela http requestu
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then(async (user) => {
      console.log(user);
      if (user == null || !(await user.validPassword(req.body.password))) {
        return res.status(401).send('Invalid Credentials');
      }
      const token = jwt.sign({ user }, JWT_SECRET);
      res.cookie('SESSIONID', token, { httpOnly: true, secure: false }); // zmen secure na true ak spravime https
      res.end();
      // res.send(JSON.stringify({ token: token}));
    }); //ak najdeme vratime token zasifrovany podla tajneho kodu
};

module.exports.postCreateUser = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    req.body.admin == undefined
  ) {
    res.status(400).send({
      status: false,
      message: 'No email or password',
    });
  } else {
    db.user
      .create({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        idGefco: req.body.idGefco,
        name: req.body.name,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};

module.exports.getAllUsers = (req, res) => {
  db.user.findAll().then((users) => res.send(users));
};
