const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });

};

module.exports = connectDB;