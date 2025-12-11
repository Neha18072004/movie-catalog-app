const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Routes
router.get('/movies', movieController.getAllMovies);
router.get('/movies/search', movieController.searchMovies);
router.get('/movies/:id', movieController.getMovieById);
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
