const db = require('../config/database');

class Movie {
  // Get all movies
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM movies ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get movie by ID
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new movie
  static async create(movieData) {
    try {
      const { title, director, genre, release_year, rating } = movieData;
      const [result] = await db.query(
        'INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)',
        [title, director, genre, release_year, rating]
      );
      return { id: result.insertId, ...movieData };
    } catch (error) {
      throw error;
    }
  }

  // Update movie
  static async update(id, movieData) {
    try {
      const { title, director, genre, release_year, rating } = movieData;
      const [result] = await db.query(
        'UPDATE movies SET title = ?, director = ?, genre = ?, release_year = ?, rating = ? WHERE id = ?',
        [title, director, genre, release_year, rating, id]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return { id, ...movieData };
    } catch (error) {
      throw error;
    }
  }

  // Delete movie
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM movies WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Search movies
  static async search(searchTerm) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM movies WHERE title LIKE ? OR director LIKE ? OR genre LIKE ?',
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Movie;
