const mongoose = require("mongoose");

const bkashGrandTokenSchema = new mongoose.Schema(
  {
    id_token: String,
    token_type: String,
    expires_in: String,
    refresh_token: String,
    statusMessage: String,


  },
  { timestamps: true }
);



const bkashGrandToken = mongoose.model(
  "bkashGrandToken",
  bkashGrandTokenSchema
);


module.exports = bkashGrandToken;
