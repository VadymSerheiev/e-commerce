const Code = require("../models/code");

const initCodeDoc = async () => {
  try {
    const codeDoc = await Code.find({});

    if (!codeDoc?.length) {
      const initiCode = new Code();
      await initiCode.save();
      console.log('id doc is created!')
    }
  } catch (e) {
    console.log(e);
  }
};

initCodeDoc();