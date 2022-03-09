require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const userRoute = require("./src/controllers/userRoute");
app.use("/", userRoute);

const urlRoute = require("./src/controllers/urlRoute");
app.use("/", urlRoute);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.v2z3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Running");
  })
  .catch((err) => console.log(err));
