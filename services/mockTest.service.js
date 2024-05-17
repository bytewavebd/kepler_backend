const mockTestRegistration = require("../modules/mockTestRegistration");

exports.addMockTest = async (data) => {
  const mockTestPost = new mockTestRegistration(data);
  const mockTest = await mockTestPost.save();

  return mockTest;
};

exports.getAllMockTest = async () => {
  const getAllMockTest = await mockTestRegistration.find({});
  return getAllMockTest;
};

exports.deleteMockTestbyId = async (_id) => {
  const deletedMockTest = await mockTestRegistration.findByIdAndRemove({ _id });
  return deletedMockTest;
};
