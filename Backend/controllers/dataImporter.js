const moment = require('moment');
const db = require('../models');
const Sequelize = require('sequelize');

module.exports.importData = (csvData) => {
  csvData.forEach((csvrow) => {
    var completionDate =
      csvrow[3] == '' ? null : moment.utc(csvrow[3], 'DD.MM.YYYY HH:mm');
    db.Order.findOrCreate({
      where: { VIN: csvrow[0], entryDate: csvrow[1] },
      // if not found :
      defaults: {
        vehicleName: csvrow[0],
        idGefco: 99,
      },
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }).then((Order) => {
      db.Update.create({
        statusCode: csvrow[4],
        serviceName: csvrow[2],
        OrderId: Order[0].dataValues.id,
        completionDate: completionDate,
      });
    });
  });
};
