const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./src/routers/auth");
const profile = require("./src/routers/profile");

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/profile", profile);

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
