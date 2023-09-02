# MERN- Task Manager 

## Overview 

A task management web application designed to help users organize their tasks, set priorities, and efficiently manage their task lists.

![Screenshot 2023-09-02 at 16 29 06](https://github.com/Callumwhhui/task-manager/assets/130695899/40f0821c-4a4c-4355-a61b-13fd623bd157)


## Features

- Task Creation: Create and add new tasks with titles, due dates, and priorities.
  
- Task List: View all tasks in a list, sortable by priority and due date.
  
- Task Deletion: Easily delete tasks that are no longer needed.
  
- User Authentication: Sign up and log in to access your tasks securely.
  
- Responsive Design: A mobile-responsive interface for task management on the go.
  
## Installation 

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm install.
4. Start the development server with npm start.

## Usage

1. Follow the link to the deployed app <a href="https://task-manager-sei-6923532b5068.herokuapp.com/">here </a>
2. Sign up or log in to your account.
3. Create new tasks with titles, due dates, and priorities.
4. View, edit, or delete tasks from your task list.
5. Stay organized and manage your tasks efficiently.

## Technologies used 

- Frontend: React, React Router, CSS
- Backend: Node.js, Express.js, MongoDB
- User Authentication: JSON Web Tokens (JWT)
- Deployment: Heroku
- Database: MongoDB Atlas

## Project Brief 

A working full-stack, single-page application hosted on Heroku.

 Incorporate the technologies of the MERN-stack:
  - MongoDB/Mongoose
  - Express
  - React
  - Node
    
  Have a well-styled interactive front-end.
  
Communicates with the Express backend via AJAX.

Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
  
Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.

Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:
  - Consume data from a third-party API.
  - Implement additional functionality if the user is an admin.
  - Implementation of a highly dynamic UI or data visualization.
  - Other, instructor approved, complexity/features.

## Timeframe and Working Team 

- Development period: 1 week
- working team: Solo

## Planning 

### ERD
![Screenshot 2023-09-02 at 15 36 23](https://github.com/Callumwhhui/task-manager/assets/130695899/c1902076-d4dd-49bf-a6b3-d504308c0efe)

### Wireframe 
![Screenshot 2023-09-02 at 18 17 50](https://github.com/Callumwhhui/task-manager/assets/130695899/83f09f33-7bb9-4cdb-8487-6a83758e52c9)

![Screenshot 2023-09-02 at 18 18 30](https://github.com/Callumwhhui/task-manager/assets/130695899/9955fdef-2a07-45b8-9ee3-e1f575e9263e)


## Build/ Code Process 

### Step 1: Setting up the project 

I began by cloning a repo called <a href="https://github.com/Callumwhhui/MERN-Infrastructure"> MERN-Infrastructure </a> and then installing any essential dependencies.
`npm i `

I then chagned the name of the project to relate to the Task-Manager project as well as changing the .env file to connect to the right databse. 

After I ran the express server with ` nodemon server.js ` and the react server with `npm start`.

### Step 2: Backend Config

Set up the Express backend, define routes, and connect to the MongoDB database.

Routes:
```
const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/tasks')

router.get('/', tasksCtrl.getTask);
router.post('/', tasksCtrl.saveTask);
router.delete('/:id', tasksCtrl.deleteTask);
router.put('/:id', tasksCtrl.updateTask);

module.exports = router;
```

### Step 3: Frontend Setup 

Set up the React frontend, create components, and configure routing.

Main TasksPage.jsx component:

```
import './TasksPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import sendRequest from '../../../utilities/send-request';


export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
```

### Step 4: CRUD Operations

Implement Create, Read, Update, and Delete (CRUD) operations for tasks.

Code Snippet - Creating a New Task fronend:
```
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
```

The `sendRequest()` function is a utility function created to send api requests and is used throught the full project. 

```
import {getToken} from './users-service'

export default async function sendRequest(url, method = 'GET',payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken()
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, options);

    if (res.ok) return res.json();
    throw new Error('Bad Request')
}
```

Code Snippet - Creating a New Task back end:

```
async function saveTask(req, res) {
  
    try {
      const newTask = await TaskModel.create({...req.body, user: req.user._id});
      res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding task' });
    }
  }
```
### Step 5: Styling and UI Enhancement 

Style the frontend components, making them responsive and user-friendly.

Code Snippet - Styling (App.css):

```
.form-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  margin-top: 6px;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
```

Step 6: Deployment 

Deploy the application to Heroku for production use.

## Key Learnings 

Throughout this project, I gained insights and practical experience in various areas:

- Implementing secure token-based user authentication and authorization.
- Creating a responsive, interactive frontend using React.
- Developing a RESTful backend with Express and MongoDB.

## Biggest Challenges 

The development process presented several challenges:

- Implementing CRUD operations for the frontend and backend
- Designing an engaging frontend with smooth navigation.

## Future Improvements 

- Integration with Third-Party Services: Integrate your application with popular third-party services like Google Calendar, Slack, or email clients for enhanced functionality.
- Advanced User Roles: Implement more granular user roles and permissions, allowing administrators to define access levels and capabilities for different users.
