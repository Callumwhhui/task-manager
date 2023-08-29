const TaskModel = require('../models/task');

module.exports ={
    getTask,
    saveTask,
    deleteTask,
    updateTask,
}

async function getTask(req,res) {
    const Task = await TaskModel.find();
    res.send(Task);
}

async function saveTask(req, res) {
    const { title, dueDate, priority } = req.body;
  
    try {
      const newTask = await TaskModel.create({ title, dueDate, priority });
      res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding task' });
    }
  }

function deleteTask(req,res) {
    const {_id} = req.body;

    TaskModel
    .findByIdAndDelete(id)
    .then(()=> res.set(201).send('Deleted Successfully...'))
    .catch((err) => console.log(err))
}

async function updateTask(req, res) {
    const { title, dueDate } = req.body;
    const taskId = req.params.id; // Get the task ID from the request params
  
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId,
        { title, dueDate }, // Update fields as needed
        { new: true } // Return the updated task
      );
      res.status(200).json(updatedTask);
    } catch (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ message: 'Error updating task' });
    }
  }