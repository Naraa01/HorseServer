module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "pedigree",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(75),
      },
      type: {
        type: DataTypes.STRING(75),
      },
      info: {
        type: DataTypes.STRING(75),
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "no-pedigree.jpg",
      },
    },
    {
      tableName: "pedigree",
    }
  );
};
