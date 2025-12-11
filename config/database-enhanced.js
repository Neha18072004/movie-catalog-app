const mysql = require('mysql2');
require('dotenv').config();

// Database configuration object
const dbConfig = {
  host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'movies_db',
  port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Add SSL configuration for production databases (like Aiven)
if (process.env.NODE_ENV === 'production' && process.env.DB_SSL === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: false // Set to true in production with proper certificates
  };
}

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Please check your database configuration in .env file');
  } else {
    console.log('✅ Database connected successfully');
    connection.release();
  }
});

// Get promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
