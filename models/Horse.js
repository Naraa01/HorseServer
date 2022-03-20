module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "horse",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(75),
        // validate: {
        //   len: { args: [2, 75], msg: "Name-iin too baga eswel ih baina" },
        // },
      },
      father: {
        type: DataTypes.STRING(75),
      },
      mother: {
        type: DataTypes.STRING(75),
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "no-photo.png",
      },
      origin: {
        type: DataTypes.STRING(45),
      },
      pedigree: {
        type: DataTypes.STRING(45),
      },
      pedigreeId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: "pedigree",
          key: "id",
        },
      },
      color: {
        type: DataTypes.STRING(20),
      },
      gender: {
        type: DataTypes.STRING(20),
      },
      sire: {
        type: DataTypes.STRING(45),
      },
      owner: {
        type: DataTypes.STRING(45),
      },
      country: {
        type: DataTypes.STRING(75),
      },
      info: {
        type: DataTypes.STRING(255),
      },
      award: {
        type: DataTypes.STRING(999),
      },
    },
    {
      tableName: "horse",
    }
  );
};
