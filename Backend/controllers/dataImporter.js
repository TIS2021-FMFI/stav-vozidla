const moment = require('moment');
const db = require('../models');
const Sequelize = require('sequelize');

module.exports.importData = async (csvData) => {
  for await (let csvrow of csvData) {
    if (csvrow[0] != 'Final Consignee Code') {
      var completionDate = csvrow[6] == '' ? null : moment.utc(csvrow[6]);
      //console.log(csvrow[4], moment.utc(csvrow[4]));
      var entryDate = moment.utc(csvrow[4]);
      await db.Order.findOrCreate({
        where: { VIN: csvrow[3], entryDate: entryDate },
        // if not found :
        defaults: {
          vehicleName: `${csvrow[1]} ${csvrow[2]}`,
          idGefco: csvrow[0],
        },
        //isolationLevel:
        //  Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      })
        .then(async (Order) => {
          await db.Update.findOrCreate({
            where: {
              statusCode: csvrow[7],
              serviceName: csvrow[5],
              OrderId: Order[0].dataValues.id,
              completionDate: completionDate,
            },
          });
        })
        .catch((err) => {
          console.log('HERRRHHEHE');
          console.log(err);
        });
    }
  }
};
