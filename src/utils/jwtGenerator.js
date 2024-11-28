const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, user_role) {
  const payload = {
    user: {
      id: user_id,
      role: user_role,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
