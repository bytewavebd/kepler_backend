const {
  addFreeConsultancy,
  getAllFreeConsultancy,
  deleteFreeConsultancy,
} = require("../services/freeConsultancy.service");

exports.postFreeConsultancy = async (req, res) => {
  try {
    const data = await addFreeConsultancy(req.body);

    res.status(200).send({ message: "Free Consultancy added successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllFreeConsultancy = async (req, res) => {
  try {
    const data = await getAllFreeConsultancy();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteFreeConsultancy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteFreeConsultancy(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.status(200).send({ message: "Item removed " });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
