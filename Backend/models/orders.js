module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      VIN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idGefco: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Order;
};
