const multer = require("multer");
const Admin = require("../models/Admin");

// const AppError = require("./errorHandler/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder;

    console.log(req.baseUrl);
    // if (req.baseUrl === "user") {
    //   subfolder = "";
    //   name = "profilephoto";
    // } else {
    //   subfolder = "movie";
    //   name = "posterurl";
    // }
    cb(null, `Photos/admin/adminProfile`);
  },
  filename: async (req, file, cb) => {
    if (req.params.id) {
      const id = req.params.id;
      console.log(id);
      const user = await Admin.findById(id);

      req.body.email = user.email;
    }
    console.log(req);
    const filename = req.body.email;
    const ext = file.mimetype.split("/")[1];
    cb(null, `${filename}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(console.log("Not An Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadAdminPhoto = upload.single("profilephoto");

module.exports = {
  uploadAdminPhoto,
};
