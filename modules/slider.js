const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  images: [{ image: String, filename: String }],
  heading: String,
  description: String,
});

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const slider = mongoose.model("slider", sliderSchema);
// console.log(User)

module.exports = slider;
