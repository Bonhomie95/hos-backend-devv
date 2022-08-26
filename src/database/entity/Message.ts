import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    attachments:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
