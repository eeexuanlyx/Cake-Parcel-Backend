const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    //if user exist
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email incorrect");
    }

    const userId = user.rows[0].user_id;
    const userRole = user.rows[0].user_role;

    const accessToken = jwtGenerator(userId, userRole, "access");
    const refreshToken = jwtGenerator(userId, userRole, "refresh");

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: userId,
        name: user.rows[0].user_name,
        email: user.rows[0].user_email,
        role: userRole,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const verified = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.json({ verified: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json("Refresh token missing");
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json("Invalid refresh token");
      }

      const newAccessToken = jwtGenerator(
        decoded.user.id,
        decoded.user.role,
        "access"
      );
      const newRefreshToken = jwtGenerator(
        decoded.user.id,
        decoded.user.role,
        "refresh"
      );

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
};

module.exports = { register, login, verified, refreshAccessToken };
