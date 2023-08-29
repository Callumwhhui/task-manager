const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/tasks')

router.get('/', tasksCtrl.getTask);
router.post('/', tasksCtrl.saveTask);
router.post('/', tasksCtrl.deleteTask);
router.put('/:id', tasksCtrl.updateTask);

module.exports = router;