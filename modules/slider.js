const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    image: String,
    filename: String,
    slot: String,
    // heading: String,
    // description: String,
  },
  { timestamps: true }
);

const slider = mongoose.model("slider", sliderSchema);

module.exports = slider;
