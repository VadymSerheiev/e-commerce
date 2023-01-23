const User = require("../models/user");

const initAdminUser = async () => {
  // move to env
  const credentials = {
    email: "michelle@test.com",
    password: "Michelle2022!",
  };

  try {
    const admin = await User.find({ email: credentials.email });
    // console.log(admin)
    if (!admin?.length) {
      const initAdmin = new User(credentials);
      await initAdmin.save();
      console.log('admin is created!')
    }
  } catch (e) {
    console.log(e);
  }
};

initAdminUser();
