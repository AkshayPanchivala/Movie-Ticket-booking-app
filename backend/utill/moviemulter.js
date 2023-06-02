const multer = require("multer");

// const AppError = require("./errorHandler/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder;

    console.log("lkkkdf");
    // if (req.baseUrl === "user") {
    //   subfolder = "";
    //   name = "profilephoto";
    // } else {
    //   subfolder = "movie";
    //   name = "posterurl";
    // }
    cb(null, `Photos/movie/movie`);
  },
  filename: async (req, file, cb) => {
    if (req.params.id) {
      const id = req.params.id;
      console.log(id);
    //   const user = await User.findById(id);

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

const uploadMoviePhoto = upload.single("posterUrl");

module.exports = {
  uploadMoviePhoto,
};
