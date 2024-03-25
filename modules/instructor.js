const mongoose = require("mongoose");

const instructorInfoSchema = new mongoose.Schema(
  {
    // image: String,
    // filename: String,
    name: String,
    email: String,
    batchNo: String,
    slots: [
            {
                slot: {
                type: String,
                required: true
                },
                file: {
                type: String,
                required: true
                }
          }
        ]

  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const instructorInfo = mongoose.model("instructorInfo", instructorInfoSchema);
// console.log(User)

module.exports = instructorInfo;
