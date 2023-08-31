import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request';
import './NewTaskForm.css'

export default function NewTaskForm() {
    const navigate = useNavigate();
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

            navigate('/tasks')
          } catch (error) {
            setError('Error adding task. Please try again.');
            console.error('Error adding task:', error);
          }
        }
    

    return (
    <div className="container">
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
            </div><br />
            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                
              />
            </div><br />
            <div className="form-group">
              <label>Priority:</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
              >
                <option value="Low">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div><br />
            <div className="form-group">
              <button type="submit">Add Task</button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
}