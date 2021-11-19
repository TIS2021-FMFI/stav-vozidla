const jwt = require('jsonwebtoken');
const JWT_SECRET = require(__dirname + '/../config/config.json')[
  'JWT_SECRET'
];

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
  const token = req.cookies['SESSIONID']; //token z tele http requestu
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
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
