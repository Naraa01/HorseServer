const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hereglegchiig neriig shalgana u "],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email haygaa oruulna uuu  enee teree  "],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email hayg neg l buruu bgad bnda ",
    ],
  },
  role: {
    type: String,
    required: [true, "Hereglegchiin erhee shalga eswel oruulan uuu"],
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "passwordoo oruulna uu ene"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );
  return token;
};

UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
