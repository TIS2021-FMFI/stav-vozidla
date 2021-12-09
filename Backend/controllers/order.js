// Database models
const db = require('../models');
const Sequelize = require('sequelize');

const { Parser } = require('json2csv');

module.exports.getOrder = (req, res) => {
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

      updates = await order.getUpdates({
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
      res.status(201).send({ ...order.dataValues, updates });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

module.exports.getOrders = async (req, res) => {
  const idCheck = req.user.user.admin
    ? ''
    : `WHERE o.idGefco = '${req.user.user.idGefco}'`;

  const orders = await db.sequelize.query(
    `SELECT id, VIN as vin, vehicleName, entryDate as dateOfCreation
        ,sum(case MaxStatusCode when 400 then 1 else 0 end) unfinishedServices
        ,sum(case MaxStatusCode when 500 then 1 else 0 end) finishedServices
        ,sum(case MaxStatusCode when 600 then 1 else 0 end) removedServices
        ,sum(case MaxStatusCode when 400 then 1 else 0 end) > 0 as finished
      FROM Orders o
      JOIN
      (SELECT OrderId, MAX(statusCode) AS MaxStatusCode
      FROM Updates
      GROUP BY OrderId, serviceName) groupedo
      ON o.Id = groupedo.OrderId 
      ${idCheck}
      group by o.Id`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  res.status(200).send(orders);
};

module.exports.getOrdersCSV = async (req, res) => {
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
          }
        : {},
    },
    where: { ...idCheck },
    raw: true,
  }).then((data) => {
    const jsonUsers = JSON.parse(JSON.stringify(data));
    const json2csvParser = new Parser();

    // -> Convert JSON to CSV data
    const csv = json2csvParser.parse(jsonUsers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=export.csv'
    );

    res.status(200).end(csv);
  });
};
