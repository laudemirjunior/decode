require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const userRoute = require("./controllers/userRoute");
const urlRoute = require("./controllers/urlRoute");

const app = express();

app.use(cors());
app.use(bp.json());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.v2z3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

app.use("/", userRoute);

app.use("/", urlRoute);

app.listen(PORT, () => {
  console.log(`App is running at the port ${PORT}`);
});
