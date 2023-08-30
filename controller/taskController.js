const { default: mongoose } = require("mongoose");
const Task = require("../model/taskModel");

// @desc Create a user
// @route POST api/tasks/addd
// @access Private route
const createTask = async (req, res) => {
  try {
    const { userId, title, description, priority, date } = req.body;

    if (!title || !description || !priority || !date) {
      return res.status(404).json({ message: "All Fields Are Mandatory" });
    }

    const parsedDate = new Date(date);

    const task = await Task.create({
      userId,
      title,
      description,
      priority,
      date: parsedDate,
    });
    if (task) {
      res.status(200).json({ message: "Task Created." });
    }
  } catch (error) {
    res.status(500).json(`Error Creating Task:${error}`);
  }
};

// @desc Get a Tasks
// @route Get api/tasks/
// @access Private route
const getTasks = async (req, res) => {
  try {
    const { isCompleted, priority } = req.query;
    let query = {};

    if (isCompleted) {
      query.isCompleted = isCompleted;
    }
    if (priority) {
      query.priority = priority;
    }
    
    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error Getting tasks." });
  }
};

// @desc Update a Task
// @route Patch api/tasks/update/:id
// @access Private route
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, priority, isCompleted, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task Id" });
    }

    const updateTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updateTask) {
      return res.status(404).json({ message: "Task Not Found." });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task." });
  }
};

// @desc delete a Task
// @route Delete api/tasks/delete/:id
// @access Private route
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task Id" });
    }

    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task Not Found." });
    }
    res.status(200).json({ message: "Task delete successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating task." });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
