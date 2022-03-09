const mongoose = require("mongoose");

const Url = mongoose.model("Url", {
  code: String,
  url: String,
  hits: Number,
  id_user: String,
});

module.exports = Url;
