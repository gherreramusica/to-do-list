const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    completed: false
  });
  await task.save();
  console.log(task);
  res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id, 
    { completed: req.body.completed },
    { new: true }
  );
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
