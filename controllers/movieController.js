const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAll();
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: error.message
    });
  }
};

// Get single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.getById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message
    });
  }
};

// Create new movie
exports.createMovie = async (req, res) => {
  try {
    const { title, director, genre, release_year, rating } = req.body;

    // Validation
    if (!title || !director || !genre || !release_year || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, director, genre, release_year, rating'
      });
    }

    // Validate rating range
    if (rating < 0 || rating > 10) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 10'
      });
    }

    // Validate release year
    const currentYear = new Date().getFullYear();
    if (release_year < 1888 || release_year > currentYear + 5) {
      return res.status(400).json({
        success: false,
        message: 'Invalid release year'
      });
    }

    const movie = await Movie.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating movie',
      error: error.message
    });
  }
};

// Update movie
exports.updateMovie = async (req, res) => {
  try {
    const { title, director, genre, release_year, rating } = req.body;

    // Validation
    if (!title || !director || !genre || !release_year || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, director, genre, release_year, rating'
      });
    }

    // Validate rating range
    if (rating < 0 || rating > 10) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 10'
      });
    }

    const movie = await Movie.update(req.params.id, req.body);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating movie',
      error: error.message
    });
  }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting movie',
      error: error.message
    });
  }
};

// Search movies
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search term'
      });
    }
    
    const movies = await Movie.search(q);
    
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching movies',
      error: error.message
    });
  }
};
