const Message = require("../database/entity/Message");

module.exports.addMessage = async (req:any, res:any, next:any) => {
 
  try {
    const savedMessage = await Message.create({
      conversationId: req.body.conversationId,
      sender: req.user.id,
      text: req.body.message,
      attachments: req.file.originalname
    });
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports.getMessages = async (req:any, res:any, next:any) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

