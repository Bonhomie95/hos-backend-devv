const Cave = require("../database/entity/Cave");

//new cave

module.exports.newCave = async (req: any, res: any) => {
  // Stuff to be added later
  console.log(req.file);
  try {
    const newFile = await Cave.create({
      fileid: req.user.id,
      foldername: req.body.foldername,
      uploads: req.file.originalname,
      version: req.body.version,
      size: req.file.size,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
      newFile
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

//get all files
module.exports.getCave = async (req: any, res: any) => {

  try {
    const files = await Cave.find({
      fileid: req.user.id
    });
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
}

// update Cave if a folder exists

module.exports.updateCave = async (req: any, res: any) => {

  Cave.find({ foldername: req.body.foldername }, async (err: any, docs: any) => {
    if (docs.length) {
      try {
        const cave = await Cave.update({
          foldername: req.body.foldername,
        }, {
          $set: {
            fileid: req.user.id,
            uploads: req.file.originalname,
            version: req.body.version,
            size: req.file.size,
          }
        });
        res.status(200).json({
          status: "success",
          message: "Folder updated successfully!!",
          cave
        })
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })

}