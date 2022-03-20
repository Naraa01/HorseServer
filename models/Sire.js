module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "sire",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lastname: {
        type: DataTypes.STRING(20),
      },
      firstname: {
        type: DataTypes.STRING(20),
      },
      title: {
        type: DataTypes.STRING(45),
      },
      birth_country: {
        type: DataTypes.STRING(75),
      },
      horse: {
        type: DataTypes.STRING(75),
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "no-sire.jpg",
      },
      other: {
        type: DataTypes.STRING(255),
      },
      pedigreeId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: "pedigree",
          key: "id",
        },
      },
    },
    {
      tableName: "sire",
    }
  );
};
