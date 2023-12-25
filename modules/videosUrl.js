const mongoose = require("mongoose");

const videosUrlSchema = new mongoose.Schema({
  Url: String,
  alt: String,
});

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const VideosUrl = mongoose.model("VideosUrl", videosUrlSchema);
// console.log(User)

module.exports = VideosUrl;
