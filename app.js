const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.database");
const routerPath = require("./route/user.router");

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/", routerPath);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
