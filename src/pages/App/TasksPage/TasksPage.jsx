import './TasksPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import sendRequest from '../../../utilities/send-request';


export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
      async function fetchTasks() {
        try {
          const response = await sendRequest('/api/tasks', 'GET');
          setTasks(response);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
      fetchTasks();
    }, []);

    async function handleEditSubmit() {
        try {
          const response = await sendRequest(
            `/api/tasks/${editTask._id}`, // Adjust the endpoint to include the task's ID
            'PUT',
            editTask
          );
          console.log('Task updated:', response);
      
          // Update the tasks list with the edited task
          const updatedTasks = tasks.map((task) =>
            task._id === editTask._id ? editTask : task
          );
          setTasks(updatedTasks);
          setEditTask(null); 
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }

      async function handleDeleteTask(taskId) {
        try {
          const response = await sendRequest(`/api/tasks/${taskId}`, 'DELETE');
          console.log('Task deleted:', response);
      
          // Remove the task from the tasks list
          const updatedTasks = tasks.filter((task) => task._id !== taskId);
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }
      
  
    return (
<div className="tasks-page">
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                <label className='check-container'>
                <input className='check-input' type="checkbox" />
                <div className='checkmark'></div>
                </label>
              </td>
              <td>{task.title}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => setEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTask && (
        <div className="edit-task-form">
            <h2>Edit Task</h2>
            <input
                className='form-input' 
                type="text"
                value={editTask.title}
                onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
                }
            />
            <input
                className='form-input'
                type="date"
                value={editTask.dueDate}
                onChange={(e) =>
                setEditTask({ ...editTask, dueDate: e.target.value })
                }
            />
            <select
                value={editTask.priority}
                onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
                }
            >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleEditSubmit}>Save</button>
        </div>
      )}
    </div>
  );
}
  