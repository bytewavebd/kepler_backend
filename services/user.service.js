const User = require("../models/User");


exports.signupService = async (userInfo) => {

  const user = await User.create(userInfo);
  return user;
};
exports.googleLoginService = async (filter, updateDoc, options) => {
  const user = await User.updateOne(filter, updateDoc, options);
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
exports.findUserByEmailandPhone = async (email, phone) => {
  return await User.find({ email, phone });
};
exports.findUserByPhone = async (phone) => {
  // console.log(phone)
  return await User.findOne({ phone });
};