const VideosUrl = require("../modules/videosUrl");
const { postVideoUrl, getAllVideoUrl, deleteVideoUrl, getSpecificVideoUrl } = require("../services/videosUrl.service");

exports.postVideosUrl = async (req, res) => {
  const { Url, alt } = req.body;

  try {
    //   await wishlistItem.save();
    // res.status(200).json(req.file);
    const data = await postVideoUrl(Url, alt);

    res.status(200).send({ message: "Url added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.getAllVideosUrl = async (req, res) => {
    // const { _id } = req.query;
    try {
      const data = await getAllVideoUrl();
  
      res.send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  exports.getSpecificVideosUrl = async (req, res) => {
    const { id } = req.params;
  console.log(id);
    try {
      const data = await getSpecificVideoUrl(id);
      //   const wishlist = await Wishlist.find({ userId });
  
      res.send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
exports.updateVideosUrl = async (req, res) => {
    try {
        const { Url, alt } = req.body;
        const updatedVideoUrl = await VideosUrl.findByIdAndUpdate(
          req.params.id,
          { Url, alt },
          { new: true }
        );
        if (!updatedVideoUrl) {
          return res.status(404).json({ error: "Video URL not found" });
        }
        res.status(200).json(updatedVideoUrl);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

  exports.deleteVideosUrl = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedItem = await deleteVideoUrl(id);
  
      if (!deletedItem) {
        return res.status(404).send({ error: "Item not found" });
      }
      //     if(res.status==200){
      // fs.unlink(path.join(__dirname,))
      //     }
      res.status(200).send({ message: "Item removed " });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  