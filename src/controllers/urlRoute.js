const express = require("express");
const router = express.Router();
const checkToken = require("../functions/checkToken");
const generator = require("../functions/generador");
const Url = require("../models/Url");
const validUrl = require("../functions/validUrl");

router.post("/", async (req, res) => {
  const url = req.body.url;

  if (!validUrl(url)) {
    res.status(404).json({ msg: "not found" });
  }

  const id_user = req.body.id_user;
  let exist = await Url.findOne({ url: url });
  if (exist !== null) {
    res
      .status(200)
      .json({ url: `https://api-decode.herokuapp.com/${exist.code}` });
  } else {
    let code = generator();
    const hits = 0;
    const newUrl = new Url({
      code,
      url,
      hits,
      id_user,
    });
    await newUrl.save();
    res.status(201).json({ url: `https://api-decode.herokuapp.com/${code}` });
  }
});

router.get("/my/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (id) {
    const url = await Url.find({ id_user: id });
    res.status(200).json(url);
  }
  res.status(404).json({ msg: "not found" });
});

router.get("/all", async (req, res, next) => {
  const url = await Url.find().sort({ hits: -1 }).limit(100);
  const newUrl = [];

  url.forEach((item) =>
    newUrl.push({
      url: item.url,
      hits: item.hits,
    })
  );
  res.status(200).send(newUrl);
});

router.get("/:id", async (req, res, next) => {
  const code = req.params.id;
  const url = await Url.findOne({ code: code });
  if (url) {
    url.hits++;
    await url.save();
    return res.redirect(url.url);
  }
  return res.status(404).json({ msg: "not found" });
});

router.delete("/:code/:id_user", checkToken, async (req, res, next) => {
  const { id_user, code } = req.params;
  const url = await Url.findOne({ code: code });
  try {
    if (id_user === url.id_user && code === url.code) {
      url.deleteOne({ code: code });
      return res.status(204).json();
    }
  } catch {
    return res.status(422).json({ msg: "not found" });
  }
});

module.exports = router;
