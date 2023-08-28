const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const authTokenHandler = require("../middleware/authHandler");

router.get("/", authTokenHandler, getTasks);
router.post("/add", authTokenHandler, createTask);
router.patch("/update/:id", authTokenHandler, updateTask);
router.delete("/delete/:id", authTokenHandler, deleteTask);

module.exports = router;
