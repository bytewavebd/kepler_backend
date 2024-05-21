const mongoose = require("mongoose");

const mockTestRegistrationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    examType: String,
    totalFee: String,
    paid: String
  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const mockTestRegistration = mongoose.model(
  "mockTestRegistration",
  mockTestRegistrationSchema
);
// console.log(User)

module.exports = mockTestRegistration;
