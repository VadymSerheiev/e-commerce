const mongoose = require("mongoose");
const { google } = require("googleapis");
// import("node-fetch").then(({ default: fetch }) => fetch(...args));
const stream = require("stream");
const Code = require("./code");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  miniature: {
    type: String,
  },
  mainPhoto: {
    type: String,
  },
  photos: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
  availability: {
    type: Boolean,
  },
  group: {
    type: String,
  },
  timestamp: {
    type: Number,
    default: Date.now,
  },
  code: {
    type: String,
  },
});

const generateCode = (code) => {
  if (code < 10) {
    return `FF000${code}`;
  }
  if (code >= 10 && code < 100) {
    return `FF00${code}`;
  }
  if (code >= 100 && code < 1000) {
    return `FF0${code}`;
  }
  if (code >= 1000) {
    return `FF${code}`;
  }
};

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

productSchema.pre("save", async function (next) {
  const product = this;

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

  if (product.isModified("photos")) {
    let photosArray = [];

    for (let i = 0; i < product.photos.length; i++) {
      const id = await createAndUploadFile(product.photos[i]);

      photosArray.push(`https://drive.google.com/uc?id=${id}`);
    }

    product.photos = photosArray;
  }

  if (product.isModified("miniature")) {
    const id = await createAndUploadFile(product.miniature);
    product.miniature = `https://drive.google.com/uc?id=${id}`;
  }

  if (product.isModified("mainPhoto")) {
    const id = await createAndUploadFile(product.mainPhoto);
    product.mainPhoto = `https://drive.google.com/uc?id=${id}`;
  }

  const codeDoc = await Code.findOne({});
  const newCode = codeDoc.currentCode + 1;
  await Code.updateOne(
    { _id: codeDoc._id },
    { $set: { currentCode: newCode } }
  );
  product.code = generateCode(newCode);

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
