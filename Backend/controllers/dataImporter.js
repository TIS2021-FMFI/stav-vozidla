const moment = require('moment');
const db = require('../models');
const Sequelize = require('sequelize');

module.exports.importData = (csvData) => {
  csvData.forEach(async (csvrow) => {
    if (csvrow[0] != 'Final Consignee Code') {
      var completionDate =
        csvrow[6] == '' ? null : moment.utc(csvrow[6], 'DD.MM.YYYY HH:mm');
      var entryDate = moment.utc(csvrow[4], 'DD.MM.YYYY HH:mm');
      await db.Order.findOrCreate({
        where: { VIN: csvrow[3], entryDate: entryDate },
        // if not found :
        defaults: {
          vehicleName: `${csvrow[1]} ${csvrow[2]}`,
          idGefco: csvrow[0],
        },
        isolationLevel:
          Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }).then((Order) => {
        db.Update.create({
          statusCode: csvrow[7],
          serviceName: csvrow[5],
          OrderId: Order[0].dataValues.id,
          completionDate: completionDate,
        });
      });
    }
  });
};
