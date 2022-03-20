const mongoose = require("mongoose");

const HorseSchema = new mongoose.Schema({
  // id: {
  //   type: DataTypes.INTEGER(10).UNSIGNED,
  //   allowNull: false,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  genderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Gender",
    required: true,
  },

  createUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  updateUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    unique: true,
    // validate: {
    //   len: { args: [2, 75], msg: "Name-iin too baga eswel ih baina" },
    // },
  },
  father: {
    type: String,
  },
  mother: {
    type: String,
  },
  photo: {
    type: String,
    default: "no-photo.png",
  },
  origin: {
    type: String,
  },
  pedigree: {
    type: String,
  },
  color: {
    type: String,
  },
  gender: {
    type: String,
  },
  sire: {
    type: String,
  },
  owner: {
    type: String,
  },
  country: {
    type: String,
  },
  info: {
    type: String,
  },
  award: {
    type: String,
  },
});

module.exports = mongoose.model("Horse", HorseSchema);
