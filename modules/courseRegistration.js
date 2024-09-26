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
    paid: {
      type: Boolean,
      default: false,  // Correcting to Boolean type with default value
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorInfo",
    },
  },
  { timestamps: true }
);



const courseRegistration = mongoose.model(
  "courseRegistration",
  courseRegistrationSchema
);


module.exports = courseRegistration;
