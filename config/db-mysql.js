const Sequelize = require("sequelize");

var db = {}; //hooson obekt

const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);

//connection
const models = [
  require("../models/Pedigree"),
  require("../models/Horse"),
  require("../models/Race"),
  require("../models/Sire"),
  require("../models/User"),
  require("../models/Comment"),
];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.sequelize = sequelize;

module.exports = db;
