module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "race",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      race_name: {
        type: DataTypes.STRING(75),
      },
      race_place: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING(75),
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "no-race.jpg",
      },
      race_date: {
        type: DataTypes.DATEONLY,
      },
      race_end_date: {
        type: DataTypes.DATEONLY,
      },
      info: {
        type: DataTypes.STRING(999),
      },
    },
    {
      tableName: "race",
    }
  );
};
