const express = require("express");
const Product = require("../models/product");
const Group = require("../models/group");
const Code = require("../models/code");
const router = new express.Router();
const { google } = require("googleapis");

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

  const folderId = process.env.GOOGLE_DRIVE_REPLICATOR;

  var fileMetadata = {
    name: generateDate(),
    parents: [folderId],
  };

  const media = {
    body: file, // Modified
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



router.get("/admin/replicator", async (req, res) => {
  try {
    const products = await Product.find({});
    const groups = await Group.find({});
    const codes = await Code.find({});

    const replica = {
      products,
      groups,
      codes,
    };

    const replicaJSON = JSON.stringify(replica)

    createAndUploadFile(replicaJSON);

    // await product.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
