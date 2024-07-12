const courseRegistration = require("../modules/courseRegistration");
const instructorInfo = require("../modules/instructor");
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
    const instructor = await instructorInfo.findById(instructorId);

    if (!instructor) {
      return res.status(404).send("Instructor not found");
    }

    const getSpecificCourseRegistration = await courseRegistration.findById(
      courseRegistrationId
    );

    if (!getSpecificCourseRegistration) {
      return res.status(404).send("Course registration not found");
    }

    // Update course registration with the instructor
    getSpecificCourseRegistration.instructorId = instructor._id;

    await getSpecificCourseRegistration.save();

    res.status(200).send(getSpecificCourseRegistration);
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
