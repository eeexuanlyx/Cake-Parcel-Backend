const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }
};

const authAdmin = (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = payload.user;

    if (user.role !== "admin") {
      return res.status(403).json("Not Authorized: Admin access required");
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};

module.exports = { auth, authAdmin };
