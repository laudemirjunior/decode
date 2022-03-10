require("dotenv").config();

const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bp.json());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.v2z3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

const userRoute = require("./src/controllers/userRoute");
app.use("/", userRoute);

const urlRoute = require("./src/controllers/urlRoute");
app.use("/", urlRoute);

app.listen(PORT, () => {
  console.log(`App is running at the port ${PORT}`);
});
