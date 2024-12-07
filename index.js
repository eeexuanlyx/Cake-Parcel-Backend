const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./src/routers/auth");
const profile = require("./src/routers/profile");
const products = require("./src/routers/products");
const cart = require("./src/routers/cart");
const invoice = require("./src/routers/invoice");
const admin = require("./src/routers/admin");
const requests = require("./src/routers/requests");
const striperouter = require("./src/routers/striperouter");

app.use(express.json());
app.use(cors());

app.use("/api", striperouter);
app.use("/products", products);
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/cart", cart);
app.use("/invoice", invoice);
app.use("/admin", admin);
app.use("/api", requests);

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
