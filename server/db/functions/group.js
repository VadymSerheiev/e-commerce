const Group = require("../models/group");

const initGroupDoc = async () => {
  try {
    const groupDoc = await Group.find({});

    if (!groupDoc?.length) {
      const initiGroup = new Group();
      await initiGroup.save();
      console.log("group doc is created!");
    }
  } catch (e) {
    console.log(e);
  }
};

initGroupDoc();
