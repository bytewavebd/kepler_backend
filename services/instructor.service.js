const Instructor = require("../modules/instructor");

exports.addInstructor = async (data) => {
  // console.log(image);
  const instructorPost = new Instructor(data);
  const instructor = await instructorPost.save();
  console.log(instructor);
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
  