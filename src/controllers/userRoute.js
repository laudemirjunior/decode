const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const checkToken = require("../functions/checkToken");

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name) {
    return res.status(422).json({ msg: "mandatory name" });
  }
  if (!email) {
    return res.status(422).json({ msg: "mandatory email" });
  }
  if (!password) {
    return res.status(422).json({ msg: "mandatory password" });
  }
  if (password === confirmPassword) {
    return res.status(422).json({ msg: "passwords don't match" });
  }
  if (await User.findOne({ email: email })) {
    return res.status(422).json({ msg: "email already exist" });
  }
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: passwordHash,
  });
  try {
    await user.save();
    res.status(201).json({ msg: "created user" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).json({ msg: "mandatory email" });
  }
  if (!password) {
    return res.status(422).json({ msg: "mandatory password" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).json({ msg: "user not exist" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "password incorrect" });
  }
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    res.status(200).json({ token: token, id: user._id });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(422).json({ msg: "user not exist" });
  }

  res.status(200).json(user);
});

module.exports = router;
