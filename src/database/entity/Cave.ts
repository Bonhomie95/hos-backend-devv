import mongoose from 'mongoose';

const CaveSchema = new mongoose.Schema(
  {
    fileid:{
         type: String,
    },
    foldername:{
       type: String,
  },
    uploads: {
       type: String,
      required: [true, "Uploaded file must have a name"]
    },
    version:{
       type: String,
    },
    size:{
       type: String,
       required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cave", CaveSchema);
