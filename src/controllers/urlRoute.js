const express = require("express");
const checkToken = require("../functions/checkToken");
const generator = require("../functions/generador");
const validUrl = require("../functions/validUrl");
const Url = require("../models/Url");

const router = express.Router();

router.post("/", async (req, res) => {
  const url = req.body.url;
  const id_user = req.body.id_user;
  let exist = await Url.findOne({ url: url });

  if (!validUrl(url)) {
    return res.status(404).json({ msg: "not found" });
  }
  if (exist !== null) {
    return res
      .status(200)
      .json({ url: `https://delc.herokuapp.com/${exist.code}` });
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
    return res.status(201).json({ url: `https://delc.herokuapp.com/${code}` });
  }
});

router.get("/", async (req, res, next) => {
  const url = await Url.find().sort({ hits: -1 }).limit(100);
  const newUrl = [];

  url.forEach((item) => {
    if (item.hits !== 0) {
      newUrl.push({
        url: item.url,
        code: item.code,
        hits: item.hits,
      });
    }
  });
  res.status(200).send(newUrl);
});

router.get("/:id", async (req, res, next) => {
  const code = req.params.id;
  const url = await Url.findOne({ code: code });
  if (url) {
    url.hits++;
    await url.save();
    if (url.url.split("//")[0] === "https:") {
      return res.redirect(url.url);
    } else {
      return res.redirect(`https://${url.url}`);
    }
  } else {
    return res.status(404).json({ msg: "not found" });
  }
});

router.get("/url/:id", async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const url = await Url.find({ id_user: id });
    res.status(200).json(url);
  }
  res.status(404).json({ msg: "not found" });
});

router.delete("/:code/:id_user", checkToken, async (req, res, next) => {
  const { id_user, code } = req.params;
  const url = await Url.findOne({ code: code, id_user: id_user });
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
