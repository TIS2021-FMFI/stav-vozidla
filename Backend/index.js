const express = require('express');
const db = require('./models');
const schedule = require('node-schedule');
const mailReader = require('./controllers/mailReader');
const router = require('./routes/router');
const app = express();
var cookieParser = require('cookie-parser');
const cors = require('cors');

//config
const PORT = 8085;
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionSuccessStatus: 200,
};

//scheduled import every hour
const job = schedule.scheduleJob('10 * * * *', function () {
  mailReader.connect();
});

//middlaware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api', router);

//frontend
app.use(express.static('stav-vozidla'));
// For virtual routes
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/stav-vozidla/index.html');
});

//initial mail fetch
mailReader.connect();

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`); //pocuvame na porte PORT
  });
});
