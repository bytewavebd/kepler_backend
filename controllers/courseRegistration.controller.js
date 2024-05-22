const {
  addCourseRegistration,
  getAllCourseRegistrations,
  deleteCourseRegistrationbyId,
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
