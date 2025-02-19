const User = require("../model/User.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // create new user ,
    const user = await User.create({
      name,
      email,
      password,
    });

    const saveData = await user.save();

    // token
    const token = await jwt.sign({ email }, process.env.JWT_SECRET);

    // send token cookies
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    console.log("cookie set succesfully");

    res
      .status(201)
      .json({ message: "User created successfully", user: saveData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    // && (await bcrypt.compare(password, user.password)))
    if (!user) {
      console.log("User email not found");
      return res.status(400).json({ message: "User email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT token
    const token = await jwt.sign({ email }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    // res.json({ token });

    // Compare passwords using bcrypt
    // const isMatch = await user.comparePassword(password);

    res.status(200).json({
      message: "Logged in successfully",
      email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

module.exports = { register, login, logout };
