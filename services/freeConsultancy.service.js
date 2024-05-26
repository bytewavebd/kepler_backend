const FreeConsultancy = require("../modules/freeConsultancy");

exports.addFreeConsultancy = async (data) => {

  const freeConsultancyPost = new FreeConsultancy(data);
  const freeConsultancy = await freeConsultancyPost.save();

  return freeConsultancy;
};

exports.getAllFreeConsultancy = async () => {
  const getAllFreeConsultancy = await FreeConsultancy.find({});
  return getAllFreeConsultancy;
};

exports.findFreeConsultancyByEmail = async (email) => {
  return await FreeConsultancy.find({ email });
};

exports.deleteFreeConsultancy = async (_id) => {
    const deletedFreeConsultancy = await FreeConsultancy.findByIdAndRemove({ _id });
    return deletedFreeConsultancy;
  };
  