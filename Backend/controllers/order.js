// Database models
const db = require('../models');
const Sequelize = require('sequelize');

const { Parser } = require('json2csv');

module.exports.getOrder = (req, res, next) => {
  const idCheck = req.user.user.admin
    ? {}
    : { idGefco: req.user.user.idGefco };

  db.Order.findOne({
    where: { id: req.params.id, ...idCheck },
  })
    .then(async (order) => {
      if (!order)
        return res
          .status(400)
          .send(`Order with id ${req.params.id} not found`);

      services = await order.getUpdates({
        attributes: [
          'serviceName',
          'completionDate',
          [Sequelize.fn('max', Sequelize.col('statusCode')), 'statusCode'],
        ],
        group: ['serviceName'],
        where: {
          [Sequelize.Op.or]: [{ statusCode: 400 }, { statusCode: 500 }],
        },
        order: [
          Sequelize.fn('isnull', Sequelize.col('completionDate')),
          ['completionDate', 'ASC'],
        ],
      });
      orderRes = {
        orderId: order.dataValues.id,
        vin: order.dataValues.VIN,
        vehicleName: order.dataValues.vehicleName,
        dateOfCreation: order.dataValues.entryDate,
      };
      res.status(201).send({ ...orderRes, services });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports.getOrders = async (req, res) => {
  const idCheck = req.user.user.admin
    ? ''
    : `WHERE o.idGefco = '${req.user.user.idGefco}'`;
  try {
    const orders = await db.sequelize.query(
      `SELECT id, VIN as vin, vehicleName, entryDate as dateOfCreation
        ,sum(case MaxStatusCode when 400 then 1 else 0 end) unfinishedServices
        ,sum(case MaxStatusCode when 500 then 1 else 0 end) finishedServices
        ,sum(case MaxStatusCode when 600 then 1 else 0 end) removedServices
        ,sum(case MaxStatusCode when 400 then 1 else 0 end) = 0 as finished
        ,CASE WHEN MAX(dateOfUpdate) IS NULL THEN entryDate ELSE MAX(dateOfUpdate) END as dateOfUpdate
      FROM Orders o
      JOIN
      (SELECT OrderId, MAX(statusCode) AS MaxStatusCode,
      MAX(completionDate) AS dateOfUpdate
      FROM Updates
      GROUP BY OrderId, serviceName) groupedo
      ON o.Id = groupedo.OrderId 
      ${idCheck}
      group by o.Id`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.getOrdersCSV = async (req, res, next) => {
  const idCheck = req.user.user.admin
    ? {}
    : { idGefco: req.user.user.idGefco };

  db.Update.findAll({
    attributes: [
      'statusCode',
      'serviceName',
      'completionDate',
      'Order.VIN',
      'Order.vehicleName',
      'Order.entryDate',
      'Order.idGefco',
    ],
    include: {
      model: db.Order,
      attributes: [],
      where: req.body.idArray
        ? {
            id: req.body.idArray,
            ...idCheck,
          }
        : { ...idCheck },
    },
    raw: true,
  })
    .then((data) => {
      const jsonUsers = JSON.parse(JSON.stringify(data));
      const json2csvParser = new Parser();

      // -> Convert JSON to CSV data
      let csv;
      if (jsonUsers.length != 0) {
        csv = json2csvParser.parse(jsonUsers);
      }

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=export.csv'
      );

      res.status(200).end(JSON.stringify(csv));
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
