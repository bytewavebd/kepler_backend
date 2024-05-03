const Instructor = require("../modules/instructor");

exports.addInstructor = async (data) => {

  const instructorPost = new Instructor(data);
  const instructor = await instructorPost.save();

  return instructor;
};

exports.getAllInstructor = async () => {
  const getInstructor = await Instructor.find({});
  return getInstructor;
};

exports.deleteInstructor = async (_id) => {
    const deletedInstructor = await Instructor.findByIdAndRemove({ _id });
    return deletedInstructor;
  };
  