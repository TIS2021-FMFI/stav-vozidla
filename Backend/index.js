const express = require('express');
const db = require('./models');
var schedule = require('node-schedule');
//  ------- Routes Part -------
const router = require('./routes/router');
const app = express();
var cookieParser = require('cookie-parser')

const PORT = 8085;
const cors=require("cors");
const corsOptions ={
  origin:'http://localhost:4200',
  credentials:true,
  optionSuccessStatus:200,
}


app.use(cors(corsOptions))
app.use(cookieParser())
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
