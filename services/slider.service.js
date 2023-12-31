const slider = require("../modules/slider");

exports.postSlider = async (images, heading, description) => {
  const SliderItem = new slider({ images, heading, description });
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
  