const Notice = require("../Model/Notice");
const Events = require("../Model/Event");
const moment = require("moment");
const User = require("../Model/User");
const Question = require("../Model/Question");
// const Image = require("../models/Image");
// const formidable = require("formidable");
// const fs = require("fs");
const createNotice = async (req, res) => {
  const obj = req.body;

  let today = moment();
  if (obj.date) {
    today = moment(obj.date, "YYYY-MM-DD");
  }
  const notice = new Notice({
    title: obj.title,
    description: obj.description,
    date: today.toISOString(),
  });

  try {
    await notice.save();
    res.status(201).send(notice);
  } catch (e) {
    res.status(400).send(e);
  }
};
const createEvent = async (req, res) => {
  const obj = req.body;

  let today = moment();
  if (obj.date) {
    today = moment(obj.date, "YYYY-MM-DD");
  }
  const event = new Events({
    title: obj.title,
    description: obj.description,
    date: today.toISOString(),
  });

  try {
    await event.save();
    res.status(201).send(event);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateScore = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  console.log(body);

  User.findOneAndUpdate(
    { _id: body.userId },
    {
      $push: {
        score: {
          date: Date.now(),
          question: body.questionId,
        },
      },
    },
    (err, user) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "Note not found",
        });
      }

      return res.status(200).json({
        success: true,
        id: user._id,
        message: "Note Updated!",
      });
    }
  );

  // User.findOne({ _id: req.params.id }, (err, user) => {
  //   if (err) {
  //     return res.status(404).json({
  //       err,
  //       message: "Note not found",
  //     });
  //   }
  //   console.log(user);
  //   user.leetcode_id = body.leetcode_id;
  //   user
  //     .save()
  //     .then(() => {
  //       return res.staus(200).json({
  //         success: true,
  //         id: user._id,
  //         message: "Note Updated!",
  //       });
  //     })
  //     .catch((error) => {
  //       return res.status(404).json({
  //         error,
  //         message: "Note not Updated!",
  //       });
  //     });
  // });
};
const createQuestion = async (req, res) => {
  const obj = req.body;

  const question = new Question({
    name: obj.name,
    description: obj.description,
    input: obj.input,
    output: obj.output,
  });

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
};

// const addImage = async (req, res) => {
//   try {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;

//     form.parse(req, async (err, fields, file) => {
//       if (err) {
//         console.log("Error parsing the files");
//         return res.status(400).json({
//           status: "Fail",
//           message: "There was an error parsing the files",
//           error: err,
//         });
//       }

//       //Single file

//       const file1 = file.file;
//       console.log(file, file1);

//       // creates a valid name by removing spaces
//       // const fileName = encodeURIComponent(file1.name.replace(/\s/g, "-"));

//       try {
//         // renames the file in the directory
//         // fs.renameSync(file.path, join(uploadFolder, fileName));
//         const image = fs.readFileSync(file1.filepath, { encoding: "base64" });
//         // console.log(image);
//         const contentType = file1.mimetype;
//         let newImage = new Image({
//           image,
//           contentType,
//         });

//         newImage = await newImage.save();
//         res.json(newImage);
//         // res.json({ file, file1 });
//       } catch (err) {
//         res.status(500).json({ err });
//       }
//     });
//   } catch (err) {}
// };

module.exports = { createEvent, createNotice, updateScore, createQuestion };
