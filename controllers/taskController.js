const Task = require('../models/Task');

// POST /api/tasks
exports.addTask = async (req, res, next) => {
 
  try {
    const { task_title, task_description, isCompleted } = req.body;

    const taskCreated = await Task.create({
      task_title,
      task_description,
      isCompleted,
      user: req.user._id,
    })


    if (taskCreated) {
      res.status(201).json({
        success: true,
        message: 'Task added successfully',
        data: taskCreated,
      });
    }

  } catch (error) {
    next(error);  // Forward to centralized error handler
  }
};



exports.getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
    if (tasks.length > 0) {
      res.status(201).json({
        success: true,
        message: 'Tasks fetched successfully',
        data: tasks,
      });
    } else {
      res.status(205).json({
        success: true,
        message: 'No Task Available',
        data: tasks,
      });
    }
  } catch (error) {
    next(error);  // Forward to centralized error handler
  }
};


exports.getTaskById = async (req, res, next) => {
  const taskId = req.params.taskId
  const taskFound = await Task.findOne({ _id: taskId, user: req.user._id })
  res.json({ status: 'success', message: 'Task Found ', task: taskFound })
}
exports.updateTask = async (req, res, next) => {
  const taskId = req.params.taskId
  const taskFound = await Task.findOne({ _id: taskId, user: req.user._id })
  if (!taskFound) {
    throw new Error('Task Not Found')
  }
  if (taskFound) {
    const { task_title, task_description, isCompleted, isVisible } = req.body
    const taskUpdated = await Task.findByIdAndUpdate({ _id: taskId, user: req.user._id }, { task_title, task_description, isCompleted, isVisible }, { new: true })
    res.status(200).json({ status: 'success', message: "Task Updated Successfully !!", task: taskUpdated })
  }
}







exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId
    const taskFound = await Task.findOne({_id : taskId, user : req.user._id})
    if (taskFound) {
      const taskDeleted = await Task.findByIdAndDelete({ _id: taskId, user: req.user._id })
      res.json({ status: 'success', message: 'Task Deleted Successfully !!', taskDeleted })
    }
    else {
      res.json({ status: 'error', message: 'Task Not Found !!' })
    }

  } catch (error) {
    next(error);  // Forward to centralized error handler
  }
};

