//mongodb
const mongoose = require("mongoose");
const emailvalidator = require("email-validator");
// const bcrypt=require('bcrypt');
const crypto = require("crypto");
const db_link =
  "mongodb+srv://Laukik:K30JVY6Srre2gpkx@cluster0.bbzo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailvalidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  profileImage: {
    type: String,
    default: "img/user/default.jpeg",
  },
  resetToken: String,
});

//salting

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

//user pe methods attach krre h
userSchema.methods.createResetToken = function () {
  //creating a unique token using npm package crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

//reset password handler
userSchema.methods.resetPasswordHandler = function (password) {
  this.password = password;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

// (async function createUser(){
