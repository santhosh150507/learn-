const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for notes
const notes = [];

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Simple Notes API is running' });
});

// GET /api/notes - Retrieve all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST /api/notes - Add a new note
app.post('/api/notes', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Note text is required.' });
  }

  const newNote = {
    id: Date.now(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  notes.unshift(newNote); // Put newest note first
  res.status(201).json(newNote);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
