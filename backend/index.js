const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files from /uploads with content-type detection for files without extensions
const fs = require('fs');
const FileType = require('file-type');

app.get('/uploads/:name', async (req, res) => {
  const name = req.params.name;
  const filePath = path.join(__dirname, 'uploads', name);
  try {
    const data = await fs.promises.readFile(filePath);
    const ft = await FileType.fromBuffer(data).catch(() => null);
    if (ft && ft.mime) {
      res.setHeader('Content-Type', ft.mime);
    } else {
      // fallback to generic binary — allow browser to attempt rendering
      res.setHeader('Content-Type', 'application/octet-stream');
    }
    res.send(data);
  } catch (err) {
    res.status(404).end();
  }
});

// Connect to MongoDB
console.log('DATABASE_URL:', process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const commentRoutes = require('./routes/Comment');
app.use('/comments', commentRoutes);

const galleryRoutes = require('./routes/gallery');
app.use('/gallery', galleryRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Cheesecake Safari Backend!');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));