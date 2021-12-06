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
const job = schedule.scheduleJob('40 * * * *', function () {
  console.log('Import of data');
});

//middlaware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', router);

//initial mail fetch
mailReader.connect();

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`); //pocuvame na porte PORT
  });
});
