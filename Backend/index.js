const express = require('express');
const db = require('./models');
const schedule = require('node-schedule');
const mailReader = require('./controllers/mailReader');
//  ------- Routes Part -------
const router = require('./routes/router');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', router);

const job = schedule.scheduleJob('40 * * * *', function () {
  console.log('Import of data');
});
console.log(mailReader.connect());

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`); //pocuvame na porte PORT
  });
});
