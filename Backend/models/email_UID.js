module.exports = (sequelize, DataTypes) => {
  const EmailUID = sequelize.define(
    'EmailUID',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      lastEmailUID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  return EmailUID;
};
