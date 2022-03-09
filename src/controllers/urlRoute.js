const express = require("express");
const router = express.Router();
const checkToken = require("../functions/checkToken");
const generator = require("../functions/generador");
const Url = require("../models/Url");

router.post("/", async (req, res) => {
  const url = req.body.url;
  const id_user = req.body.id_user;

  const exist = await Url.findOne({ url: url });

  if (exist) {
    return res.status(200).json({ url: `http://localhost:3000/${exist.code}` });
  } else {
    const code = generator();
    const hits = 0;
    const newUrl = new Url({
      code,
      url,
      hits,
      id_user,
    });
    await newUrl.save();
    return res.status(201).json({ url: `http://localhost:3000/${code}` });
  }
});

router.get("/my", async (req, res, next) => {
  const { id } = req.body;
  const url = await Url.find({ user: id });
  let newUrl = [];

  url.forEach((item) =>
    newUrl.push({
      code: item.url,
      hits: item.hits,
    })
  );
  res.status(200).json(url);
});

router.get("/all", async (req, res, next) => {
  const url = await Url.find().sort({ hits: -1 }).limit(100);
  const newUrl = [];

  url.forEach((item) =>
    newUrl.push({
      code: item.url,
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

router.delete("/", checkToken, async (req, res, next) => {
  const { code, id_user } = req.body;
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
