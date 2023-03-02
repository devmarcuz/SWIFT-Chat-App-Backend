const Message = require("../model/Message");

exports.recieveMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.json({
        msg: "Message added successfully.",
        time: data.createdAt,
      });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
        time: message.createdAt,
      };
    });

    return res.json({ messages: projectMessages });
  } catch (error) {
    next(error);
  }
};
