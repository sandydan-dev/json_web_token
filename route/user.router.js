const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  veryfiyToken,
} = require("../controller/user.controller");

// create new user
router.post("/register", register);

// login user
router.post("/login", login);

// logout user
router.post("/logout", logout);

router.get("/protected-route", veryfiyToken, (req, res) => {
  res.send("This is a protected route!");
});

module.exports = router;
