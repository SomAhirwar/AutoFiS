const express = require("express");
const userRouter = express.Router();
const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateProfileImage,
} = require("../controller/userController");
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController");
//const {updateProfileImage}=require('../controller/userController')
const multer = require("multer");
//users k option
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//for signup
userRouter.route("/signup").post(signup);

//for login
userRouter.route("/login").post(login);

//logout
userRouter.route("/logout").get(logout);

//forget password
userRouter.route("/forgetpassword").post(forgetpassword);

//reset password
userRouter.route("/resetpassword/:token").post(resetpassword);
//profile page

//multer for file upload
//upload -> storage,filter
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("not ans image! please upload img"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);

userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile("C:/Users/Laukik/OneDrive/Desktop/foodapp/multer.html");
});

userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

module.exports = userRouter;
