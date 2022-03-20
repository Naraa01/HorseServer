const mongoose = require("mongoose");

const SireSchema = new mongoose.Schema({
  createUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  horse: {
    type: mongoose.Schema.ObjectId,
    ref: "Horse",
  },
  name: {
    type: String,
    unique: true,
    // validate: {
    //   len: { args: [2, 75], msg: "Name-iin too baga eswel ih baina" },
    // },
  },
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  photo: {
    type: String,
    default: "no-photo.png",
  },
  title: {
    type: String,
  },
  birthcountry: {
    type: String,
  },
  other: {
    type: String,
  },
});

module.exports = mongoose.model("Sire", SireSchema);
