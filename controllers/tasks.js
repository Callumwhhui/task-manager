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

function updateTask(req,res) {
    const {_id, text} = req.body;

    TaskModel
    .findByIdAndUpdate(id, text)
    .then(()=> res.set(201).send('Updated Successfully...'))
    .catch((err) => console.log(err))
}