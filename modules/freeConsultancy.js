const mongoose = require("mongoose");

const freeConsultancyInfoSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    date: String,
    
  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const freeConsultancyInfo = mongoose.model("freeConsultancyInfo", freeConsultancyInfoSchema);
// console.log(User)

module.exports = freeConsultancyInfo;
