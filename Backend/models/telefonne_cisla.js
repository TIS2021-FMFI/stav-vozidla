module.exports = (sequelize, DataTypes) => {
    const Telefonne_cislo = sequelize.define("Telefonne_cislo", {
      meno: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        allowNull: false
      },
      cislo: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    },{timestamps: false});
    return Telefonne_cislo;
  };
  