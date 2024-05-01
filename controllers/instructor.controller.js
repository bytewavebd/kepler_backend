const {
  addInstructor,
  getAllInstructor,
  deleteInstructor,
} = require("../services/instructor.service");
const Instructor = require("../modules/instructor");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject, // Import deleteObject from @google-cloud/storage
} = require("firebase/storage");

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + "" + time;
  return dateTime;
};

exports.postInstructor = async (req, res) => {
  try {
    const data = await addInstructor(req.body);

    res.status(200).send({ message: "instructor added successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllInstructor = async (req, res) => {
  try {
    const data = await getAllInstructor();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteInstructor(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//update url for video
exports.updateUrl = async (req, res) => {
  const instructorId = req.params.id;
  const { title, url, slot } = req.body;

  try {
    // Find the instructor by ID
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Add the new urlUpload item to the array
    instructor.urlUpload.push({ title, url, slot });

    // Save the updated instructor information
    await instructor.save();

    res
      .status(200)
      .json({ message: "urlUpload updated successfully", instructor });
  } catch (err) {
    console.error("Error updating urlUpload:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteInstructorUrl = async (req, res) => {
  const { instructorId, urlUploadId } = req.params;

  try {
    // Find the instructor by ID
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Find the index of the urlUpload item to delete
    const index = instructor.urlUpload.findIndex(
      (upload) => upload._id == urlUploadId
    );

    if (index === -1) {
      return res.status(404).json({ error: "urlUpload item not found" });
    }

    // Remove the urlUpload item from the array
    instructor.urlUpload.splice(index, 1);

    // Save the updated instructor information
    await instructor.save();

    res
      .status(200)
      .json({ message: "urlUpload item deleted successfully", instructor });
  } catch (err) {
    console.error("Error deleting urlUpload item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update file upload
exports.updateFile = async (req, res) => {
  const dateTime = giveCurrentDateTime();
  const storage = getStorage();

  const heading = req.body.heading;
  const description = req.body.description;
  const slot = req.body.slot;
  // const uploadPromises = req.files.map(async (file) => {
  const storageRef = ref(
    storage,
    `files/${req.file.originalname + "" + dateTime}`
  );
  const metadata = {
    contentType: req.file.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const image = await getDownloadURL(snapshot.ref);
  const filename = `files/${req.file.originalname + "" + dateTime}`;
  try {
    const instructorId = req.params.id;
    const { title, slot } = req.body;
    // Find the instructor by ID
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Add the new urlUpload item to the array
    instructor.fileUpload.push({ title, image, filename, slot });

    // Save the updated instructor information
    await instructor.save();

    res
      .status(200)
      .json({ message: "urlUpload updated successfully", instructor });
  } catch (err) {
    console.error("Error updating urlUpload:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteInstructorFile = async (req, res) => {
  const { instructorId, fileUploadId } = req.params;

  try {
    // Find the instructor by ID
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Find the index of the urlUpload item to delete
    const index = instructor.fileUpload.findIndex(
      (upload) => upload._id == fileUploadId
    );

    if (index === -1) {
      return res.status(404).json({ error: "fileUpload item not found" });
    }

    // Remove the urlUpload item from the array
    instructor.fileUpload.splice(index, 1);

    // Save the updated instructor information
    await instructor.save();

    res
      .status(200)
      .json({ message: "fileUpload item deleted successfully", instructor });
  } catch (err) {
    console.error("Error deleting urlUpload item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
