const mongoose = require("mongoose");

const GenderSchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  // },
  name: {
    type: String,
    unique: true,
    // validate: {
    //   len: { args: [2, 75], msg: "Name-iin too baga eswel ih baina" },
    // },
  },
  age: {
    type: String,
  },
  horseId: {
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
});

module.exports = mongoose.model("Gender", GenderSchema);
