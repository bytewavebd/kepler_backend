const slider = require("../modules/slider");

exports.postSlider = async (image,filename, slot) => {
  const SliderItem = new slider({ image,filename, slot });
  const Slider = await SliderItem.save();

  return Slider;
};
exports.getAllSlider = async () => {
  const AllSlider = await slider.find({});
  return AllSlider;
};

exports.getSpecificSlider= async (_id) => {
    const specificSlider = await slider.find({ _id });
    return specificSlider;
  };
  
  exports.deletePhoto = async (_id) => {
    const deletedPhoto = await slider.findByIdAndRemove({ _id });
    return deletedPhoto;

  };
  