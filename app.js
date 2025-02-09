const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [
  { id: 1, description: 'Buy groceries', completed: false },
  { id: 2, description: 'Read a book', completed: false }
];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ message: 'Task description is required' });
  }
  const newTask = {
    id: tasks.length + 1,
    description,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT to update task completion status
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = req.body.completed;
  res.json(task);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
