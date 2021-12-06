module.exports = (sequelize, DataTypes) => {
  const Update = sequelize.define(
    'Update',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      statusCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
  return Update;
};
