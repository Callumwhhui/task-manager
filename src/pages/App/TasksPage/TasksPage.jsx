import '../App.css';
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
  
    return (
      <div className="tasks-page">
        <h1>Task List</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <p>Title: {task.title}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  