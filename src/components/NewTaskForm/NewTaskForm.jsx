import React from 'react'
import {useState} from 'react'
import sendRequest from '../../utilities/send-request';

export default function NewTaskForm() {
    const [newTask, setNewTask] = useState({
        title: '',
        dueDate: '',
        priority: '',
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setNewTask({...newTask, [evt.target.name]: evt.target.value})
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            const response = await sendRequest('/api/tasks', 'POST', newTask);
            console.log('New task added:', response);
      
            // Clear form inputs
            setNewTask({
              title: '',
              dueDate: '',
              priority: '',
            });
          } catch (error) {
            setError('Error adding task. Please try again.');
            console.error('Error adding task:', error);
          }
        }
    

    return (
        <div className="container">
        <h1>New Task Form</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit">Add Task</button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
}