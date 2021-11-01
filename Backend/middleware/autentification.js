const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
  console.log(req.user);
  if (req.user == null) {
    res.status(403);
    return res.send('You need to sign in');
  }
  next();
}

function authAdmin(req, res, next) {
  if (req.user.user.admin != true) {
    res.status(401);
    return res.send('Not allowed');
  }
  next();
}

function authenticateToken(req, res, next) {
  const token = req.body.token; //token z tele http requestu
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, 'e1e7c8fa67a96e224cb0f77c4efe9', (err, user) => {
    //verifikujeme podla nasho tajneho kodu
    if (err) return res.sendStatus(403);
    req.user = user; //ulozime verifikovaneho usera
    next();
  });
}

module.exports = {
  authUser,
  authAdmin,
  authenticateToken,
};
