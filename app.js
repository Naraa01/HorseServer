const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");

const multer = require("multer");

const connectDB = require("./config/db");

const Error = require("./middleware/error");

var morgan = require("morgan");
const logger = require("./middleware/logger");

const PedigreeRoutes = require("./routes/pedigrees");
const UserRoutes = require("./routes/users");
const HorseRoutes = require("./routes/horses");
const RaceRoutes = require("./routes/races");
const SireRoutes = require("./routes/sires");
const CommentRoutes = require("./routes/comments");
const UserMRoutes = require("./routes/usersM");
const HorseMroutes = require("./routes/Mong/horses");
const GenderRoutes = require("./routes/gender");

const injectDb = require("./middleware/injectDb");

const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();
const db = require("./config/db-mysql");

console.log(__dirname.green.inverse);
console.log(__filename.red);

const app = express();

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });
app.use("/profile", express.static("./upload/images"));
app.post("/upload", upload.single("profile"), (req, res) => {
  console.log(req.file);
  res.json({
    success: true,
    profile_url: `http://localhost:5000/profile/${req.file.filename}`,
  });
});

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(injectDb(db));
app.use("/pedigree", PedigreeRoutes);
app.use("/user", UserRoutes);
app.use("/horse", HorseRoutes);
app.use("/race", RaceRoutes);
app.use("/sire", SireRoutes);
app.use("/comment", CommentRoutes);
app.use("/userM", UserMRoutes);
app.use("/horsesM", HorseMroutes);
app.use("/gender", GenderRoutes);

app.use(Error);

// db.user.belongsToMany(db.horse, { through: "comment" });
// db.horse.belongsToMany(db.user, { through: "comment" });

// db.sequelize
//   .sync()
//   .then((result) => {
//     console.log("Sync hiigdlee");
//   })
//   .catch((err) => {
//     console.log("err");
//   });

const server = app.listen(
  process.env.PORT,
  console.log(`Server started aaaon PORT ${process.env.PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Aldaa GarSan : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  }); //
});
