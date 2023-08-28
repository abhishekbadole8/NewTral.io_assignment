const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5001;
const userRoute = require("./route/userRoute");
const taskRoute = require("./route/taskRoute");
const ConnectDb = require("./config/dbConnection");

app.use(cors());

ConnectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/tasks", taskRoute);

app.listen(port, () => {
  console.log(`Connected To Port:${port}`);
});
