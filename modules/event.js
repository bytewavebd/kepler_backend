const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    image: String,
    filename: String,
    title: String,
    date: String,
    description: String,
  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const event = mongoose.model("event", eventSchema);
// console.log(User)

module.exports = event;
