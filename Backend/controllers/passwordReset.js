// Database models
const db = require('../models');
const Sequelize = require('sequelize');
const sendEmail = require('./sendEmail');
const crypto = require('crypto');
const { APP_URL } = require(__dirname + '/../config/config.json');
const bcrypt = require("bcrypt");

module.exports.sendResetEmail = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    const token = crypto.randomBytes(32).toString('hex');
    await user.update({
      resetToken: token,
    });

    const link = `${APP_URL}/password-reset?userId=${user.idUsers}&token=${token}`;
    const massage = `You can set up new password on following link: ${link}`;
    await sendEmail(user.email, 'Password reset', massage);
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.setForgottenPassword = async (req, res, next) => {
  try {
    //const schema = Joi.object({ password: Joi.string().required() });
    //const { error } = schema.validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    const user = await db.user.findOne({
      where: { idUsers: req.params.userId, resetToken: req.params.token },
    });
    console.log(user);
    if (!user || user.resetToken == null)
      return res.status(400).send('invalid link or expired');

    await user.update({
      password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
      resetToken: null,
    });

    res.send();
  } catch (error) {
    res.send('An error occured');
    next(error);
  }
};
