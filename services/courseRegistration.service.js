const courseRegistration = require("../modules/courseRegistration");



exports.addCourseRegistration = async (data) => {
  const courseRegistrationPost = new courseRegistration(data);
  const courseRegistration = await courseRegistrationPost.save();

  return courseRegistration;
};

exports.getAllCourseRegistrations = async (data) => {
  const allCourseRegistration = await courseRegistration.find({});
  return allCourseRegistration;
};

exports.deleteCourseRegistrationbyId = async (_id) => {
  const deletedCourseRegistration = await courseRegistration.findByIdAndRemove({ _id });
  return deletedCourseRegistration;
};
