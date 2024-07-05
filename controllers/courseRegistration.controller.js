const {
  addCourseRegistration,
  getAllCourseRegistrations,
  deleteCourseRegistrationbyId,
  findCourseRegistrationsByEmail,
} = require("../services/courseRegistration.service");

exports.postCourseRegistration = async (req, res) => {
  try {
    const data = await addCourseRegistration(req.body);

    res.status(200).send({ message: "course registration added successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllCourseRegistration = async (req, res) => {
  try {
    const data = await getAllCourseRegistrations();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.getCourseRegistrationByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await findCourseRegistrationsByEmail(email);

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.addInstructorInCourseRegistration = async (req, res) => {
  try {
    const { instructorId } = req.body; // Assuming instructorId is sent in the request body
    const { courseRegistrationId } = req.params;

    // Validate that both instructor and course registration exist
    const instructor = await InstructorInfo.findById(instructorId);
    if (!instructor) {
      return res.status(404).send('Instructor not found');
    }

    const courseRegistration = await CourseRegistration.findById(courseRegistrationId);
    if (!courseRegistration) {
      return res.status(404).send('Course registration not found');
    }

    // Update course registration with the instructor
    courseRegistration.instructor = instructorId;
    await courseRegistration.save();

    res.status(200).send(courseRegistration);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCourseRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteCourseRegistrationbyId(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
