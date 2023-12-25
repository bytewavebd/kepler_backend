const mongoose = require("mongoose");

const reviewSystemSchema = new mongoose.Schema({
  image:String,
  filename:String,
  reviewerName: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
});

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const ReviewSystem = mongoose.model("reviewSystem", reviewSystemSchema);
// console.log(User)

module.exports = ReviewSystem;
