const mongoose = require("mongoose");

const instructorInfoSchema = new mongoose.Schema(
  {
    // image: String,
    // filename: String,
    name: String,
    email: String,
    batchNo: String,
    fileUpload: [
      {
        title: String,
        image: String,
        filename: String,
        slot: String,
      },
    ],
    urlUpload: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
        slot: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const instructorInfo = mongoose.model("instructorInfo", instructorInfoSchema);
// console.log(User)

module.exports = instructorInfo;
