const mongoose = require("mongoose");

const courseRegistrationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    region: String,
    email: String,
    phoneNumber: String,
    age: String,
    group: String,
    board: String,
    courseType: String,
    totalFee: String,
    paid: String,
  },
  { timestamps: true }
);

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const courseRegistration = mongoose.model(
  "courseRegistration",
  courseRegistrationSchema
);
// console.log(User)

module.exports = courseRegistration;
