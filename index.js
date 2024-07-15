const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
// DBConnect();
mongoose.connect(process.env.DATABASE_ECO,{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
  console.log(`Database connection is successful 🛢` .grey.bold);
})
// console.log(process.env.DATABASE_ECO)
// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

// saif67090707
// dAF68ARasP7uwdRu