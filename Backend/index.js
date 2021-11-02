const express = require('express');
const db = require('./models');
var schedule = require('node-schedule');
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

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`); //pocuvame na porte PORT
  });
});
