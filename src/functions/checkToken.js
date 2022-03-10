require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "unauthorized" });
  }
  try {
    let secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthorized" });
  }
};

export default checkToken;
