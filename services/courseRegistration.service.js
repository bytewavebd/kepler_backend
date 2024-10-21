const courseRegistration = require("../modules/courseRegistration");



exports.addCourseRegistration = async (data) => {
  const courseRegistrationPost = new courseRegistration(data);
  const addCourseRegistration = await courseRegistrationPost.save();

  return addCourseRegistration;
};
exports.findCourseRegistrationsByEmail = async (email) => {
  return await courseRegistration.find({ email }).populate('instructorId');
};
exports.findCourseRegistrationsById = async (_id) => {
  return await courseRegistration.findOne({ _id }).populate('instructorId');
};
exports.getAllCourseRegistrations = async (data) => {
  const allCourseRegistration = await courseRegistration.find({}).populate('instructorId');
  return allCourseRegistration;
};

exports.deleteCourseRegistrationbyId = async (_id) => {
  const deletedCourseRegistration = await courseRegistration.findByIdAndRemove({ _id });
  return deletedCourseRegistration;
};
