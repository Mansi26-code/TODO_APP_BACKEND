import { Task } from "../model/tasksModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    await Task.create({
      title,
      description,
      tag,
      user: req.user, // Assuming req.user is correctly populated by middleware
    });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getMyTask

export const getMyTask = async (req, res) => {
  try {
    let tasks = await Task.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//edit
export const editTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found!!",
      });
    }

    // Extracting updated task information from request body
    const { title, description, tag } = req.body;

    // Updating the task
    await task.updateOne({ title, description, tag });

    // Sending success response
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    // Handling errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete

export const deleteTask = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }
    await task.deleteOne();
    res.status(200).json({
      status: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
