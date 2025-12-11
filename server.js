const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
  app.use(cors({
     origin: ['https://movie-catalog-test.netlify.app/', 'http://localhost:3000'],
     credentials: true
   }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', movieRoutes);

// Root route - serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   🎬 Movie Catalog Server Running       ║
╠══════════════════════════════════════════╣
║   Port: ${PORT}                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}          ║
║   URL: http://localhost:${PORT}            ║
╚══════════════════════════════════════════╝
  `);
  console.log('API Endpoints:');
  console.log('  GET    /api/movies          - Get all movies');
  console.log('  GET    /api/movies/:id      - Get movie by ID');
  console.log('  POST   /api/movies          - Create new movie');
  console.log('  PUT    /api/movies/:id      - Update movie');
  console.log('  DELETE /api/movies/:id      - Delete movie');
  console.log('  GET    /api/movies/search?q=term - Search movies');
  console.log('\n✨ Ready to handle requests!\n');
});

module.exports = app;
