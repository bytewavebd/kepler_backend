const { addMockTest, getAllMockTest, deleteMockTestbyId } = require("../services/mockTest.service");

exports.postMockTest = async (req, res) => {
  try {
    const data = await addMockTest(req.body);

    res.status(200).send({ message: "mock test added successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllMockTest = async (req, res) => {
  try {
    const data = await getAllMockTest();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteMockTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteMockTestbyId(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
