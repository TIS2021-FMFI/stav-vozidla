// Database models
const db = require('../models');
const Sequelize = require('sequelize');

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
    `SELECT id, VIN, vehicleName, entryDate
        ,sum(case MaxStatusCode when 400 then 1 else 0 end) Planned
        ,sum(case MaxStatusCode when 500 then 1 else 0 end) Completed
        ,sum(case MaxStatusCode when 600 then 1 else 0 end) Deleted
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
