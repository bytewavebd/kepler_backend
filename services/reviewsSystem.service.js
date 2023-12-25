const ReviewSystem = require("../modules/reviewsSystem");

exports.postReviewSystem = async (image,filename,reviewerName,rating,comment) => {
  const ReviewSystemItem = new ReviewSystem({image,filename,reviewerName,rating,comment});
  const reviewSystem = await ReviewSystemItem.save();

  return reviewSystem;
};

exports.getSpecificReviewSystem = async (_id) => {
  const getSpecificReviewSystem = await ReviewSystem.find({ _id });
  return getSpecificReviewSystem;
};

exports.getAllReviewSystem = async () => {
  const getReviewSystem = await ReviewSystem.find({});
  return getReviewSystem;
};

exports.deleteReviewSystem = async (_id) => {
  const deletedReviewSystem = await ReviewSystem.findByIdAndRemove({ _id });
  return deletedReviewSystem;
};
