const event = require("../modules/event");


exports.postEvent = async (image,filename, title,date, description) => {
  const EventItem = new event({ image,filename, title,date, description });
  const Event = await EventItem.save();

  return Event;
};
exports.getAllEvent = async () => {
  const AllEvent = await event.find({});
  return AllEvent;
};

exports.getSpecificEvent = async (_id) => {
    const specificEvent = await event.find({ _id });
    return specificEvent;
  };
  
  exports.deleteEvent = async (_id) => {
    const deletedEvent = await event.findByIdAndRemove({ _id });
    return deletedEvent;
  };
  