const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./src/routers/auth");
const profile = require("./src/routers/profile");
const products = require("./src/routers/products");
const cart = require("./src/routers/cart");

app.use(express.json());
app.use(cors());

app.use("/products", products);
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/cart", cart);

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
