const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  let connection;
  
  try {
    // Create connection without database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'movies_db'}`);
    console.log(`Database '${process.env.DB_NAME || 'movies_db'}' created or already exists`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'movies_db'}`);

    // Create movies table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        director VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        release_year INT NOT NULL,
        rating DECIMAL(3, 1) CHECK (rating >= 0 AND rating <= 10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createTableQuery);
    console.log('Table "movies" created or already exists');

    // Insert sample data
    const sampleMovies = [
      ['The Shawshank Redemption', 'Frank Darabont', 'Drama', 1994, 9.3],
      ['The Godfather', 'Francis Ford Coppola', 'Crime', 1972, 9.2],
      ['The Dark Knight', 'Christopher Nolan', 'Action', 2008, 9.0],
      ['Pulp Fiction', 'Quentin Tarantino', 'Crime', 1994, 8.9],
      ['Forrest Gump', 'Robert Zemeckis', 'Drama', 1994, 8.8],
      ['Inception', 'Christopher Nolan', 'Sci-Fi', 2010, 8.8],
      ['The Matrix', 'The Wachowskis', 'Sci-Fi', 1999, 8.7],
      ['Interstellar', 'Christopher Nolan', 'Sci-Fi', 2014, 8.6]
    ];

    // Check if table is empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM movies');
    
    if (rows[0].count === 0) {
      const insertQuery = 'INSERT INTO movies (title, director, genre, release_year, rating) VALUES ?';
      await connection.query(insertQuery, [sampleMovies]);
      console.log('Sample movie data inserted successfully');
    } else {
      console.log('Table already contains data, skipping sample data insertion');
    }

    console.log('\n✅ Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run initialization
initDatabase();
