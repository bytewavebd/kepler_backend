const VideosUrl = require("../modules/videosUrl");

exports.postVideoUrl = async (videoName,Url, alt,page) => {
  // console.log(image);
  const VideosUrlItem = new VideosUrl({videoName, Url, alt,page });
  const videosUrl = await VideosUrlItem.save();
  console.log(videosUrl);
  return videosUrl;
};

exports.getSpecificVideoUrl = async ( _id) => {

    const getSpecificVideoUrl= await VideosUrl.find({ _id });
    return getSpecificVideoUrl;
  };

exports.getAllVideoUrl = async () => {
  const getVideoUrl = await VideosUrl.find({});
  return getVideoUrl;
};

exports.deleteVideoUrl = async (_id) => {
  const deletedVideo = await VideosUrl.findByIdAndRemove({ _id });
  return deletedVideo;
};
