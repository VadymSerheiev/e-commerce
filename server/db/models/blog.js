const mongoose = require("mongoose");
const { google } = require("googleapis");
const stream = require("stream");

const blogSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  photos: [
    {
      type: String,
    },
  ],
  timestamp: {
    type: Number,
    default: Date.now,
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

blogSchema.pre("save", async function (next) {
  const record = this;

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

  if (record.isModified("photos")) {
    let photosArray = [];

    for (let i = 0; i < record.photos.length; i++) {
      const id = await createAndUploadFile(record.photos[i]);

      photosArray.push(`https://drive.google.com/uc?id=${id}`);
    }

    record.photos = photosArray;
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
