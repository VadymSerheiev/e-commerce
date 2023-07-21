const mongoose = require("mongoose");
const { google } = require("googleapis");
// import("node-fetch").then(({ default: fetch }) => fetch(...args));
const stream = require("stream");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  miniature: {
    type: String,
  },
});

const generateDate = () => {
  const date = new Date();

  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const MM =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const YYYY = date.getFullYear();

  const hh = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mm =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${DD}-${MM}-${YYYY}-${hh}-${mm}`;
};

groupSchema.pre("save", async function (next) {
  const group = this;

  const createAndUploadFile = async (file) => {
    const SCOPES = ["https://www.googleapis.com/auth/drive"];

    const credentials = {
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
    };

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: SCOPES,
    });

    const driveService = google.drive({ version: "v3", auth });

    const folderId = process.env.GOOGLE_DRIVE_PHOTOS;

    var fileMetadata = {
      name: generateDate(),
      parents: [folderId],
    };

    const uploadImg = file.split(/,(.+)/)[1];
    const buf = new Buffer.from(uploadImg, "base64"); // Added
    const bs = new stream.PassThrough(); // Added
    bs.end(buf); // Added

    const media = {
      body: bs, // Modified
    };

    const responseCreate = await driveService.files.create({
      resource: fileMetadata,
      media: media,
    });
    // console.log(file.slice(100, 150))
    const dataCreate = responseCreate.data.id;
    // console.log(responseCreate.data.id);
    return dataCreate;
    // https://drive.google.com/file/d/1TIDJn8KEPaQ69mtoKaTu8wBDAIVEClP6
    // console.log(responseCreate.data.id);
  };

  if (group.isModified("miniature")) {
    const id = await createAndUploadFile(group.miniature);
    group.miniature = `https://drive.google.com/uc?id=${id}`;
  }

  next();
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
