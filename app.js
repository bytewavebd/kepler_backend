const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://www.keplerbd.org',
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(express.static('public'));
// const passportInfoRoute = require("./routes/passportInfo.route");
const homeRoute = require("./routes/home.route");
const userRoute = require("./routes/user.route");
// const productRoute = require("./routes/product.route");
// const cartRoute = require("./routes/cart.route");
// const wishlistRoute = require("./routes/wishlist.route");
// const orderRoute = require("./routes/order.route");


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


app.use("/api/v1/home", homeRoute);
app.use("/api/v1/user", userRoute);




module.exports = app;
