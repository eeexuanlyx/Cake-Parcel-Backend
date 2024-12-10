const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, user_role, type) {
  const payload = {
    user: {
      id: user_id,
      role: user_role,
    },
  };
  const expiresIn = type === "access" ? "20m" : "7d";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

module.exports = jwtGenerator;
