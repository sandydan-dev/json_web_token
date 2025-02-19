const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    next(error.message);
  }
});

// comparePassword
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);

    return isMatch; // return true if match
  } catch (error) {
    return "Password not match";
  }
};

// create model
const User = mongoose.model("User", userSchema);

module.exports = User;
