# 🎬 Movie Catalog System

A full-stack movie catalog application built with Node.js, Express.js, MySQL, and Tailwind CSS. This application allows users to browse, add, edit, and delete movies from a catalog with a beautiful and responsive user interface.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 🔍 Real-time search functionality
- 🎨 Beautiful UI with Tailwind CSS 3.4.17
- 📱 Fully responsive design
- ⚡ Fast and efficient with connection pooling
- 🔄 Auto-reload with Nodemon
- 🎯 RESTful API architecture
- ✨ Toast notifications for user feedback
- 🎭 Modal-based forms for better UX

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

```bash
cd movie-catalog-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MySQL Database

Create a MySQL user and database, or use existing credentials. Update the `.env` file with your MySQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=movies_db
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Initialize the Database

Run the database initialization script to create the database, table, and sample data:

```bash
npm run init-db
```

This will:
- Create the `movies_db` database
- Create the `movies` table with proper schema
- Insert sample movie data

### 5. Start the Server

For development (with Nodemon auto-reload):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
movie-catalog-app/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── movieController.js   # Request handlers
├── models/
│   └── Movie.js            # Database queries
├── routes/
│   └── movieRoutes.js      # API route definitions
├── public/
│   ├── index.html          # Frontend HTML
│   └── app.js              # Frontend JavaScript
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── server.js              # Express server setup
├── initDatabase.js        # Database initialization
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🔌 API Endpoints

### Get All Movies
```
GET /api/movies
```
Returns all movies in the database.

### Get Movie by ID
```
GET /api/movies/:id
```
Returns a specific movie by ID.

### Create New Movie
```
POST /api/movies
Content-Type: application/json

{
  "title": "Movie Title",
  "director": "Director Name",
  "genre": "Genre",
  "release_year": 2024,
  "rating": 8.5
}
```

### Update Movie
```
PUT /api/movies/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "director": "Director Name",
  "genre": "Genre",
  "release_year": 2024,
  "rating": 9.0
}
```

### Delete Movie
```
DELETE /api/movies/:id
```

### Search Movies
```
GET /api/movies/search?q=search_term
```

## 🗄️ Database Schema

### Movies Table

| Column       | Type         | Description                |
|-------------|--------------|----------------------------|
| id          | INT          | Primary key, auto-increment |
| title       | VARCHAR(255) | Movie title                |
| director    | VARCHAR(255) | Director name              |
| genre       | VARCHAR(100) | Movie genre                |
| release_year| INT          | Year of release            |
| rating      | DECIMAL(3,1) | Rating (0-10)             |
| created_at  | TIMESTAMP    | Creation timestamp         |
| updated_at  | TIMESTAMP    | Last update timestamp      |

## 🚀 Deployment Options

### Option 1: Deploy to Render

1. **Prepare your repository**
   - Push your code to GitHub
   - Make sure `.env` is in `.gitignore`

2. **Deploy Backend on Render**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Configure environment variables in Render dashboard
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Deploy MySQL Database**
   - Use Render's managed PostgreSQL (convert schema) OR
   - Use [Aiven](https://aiven.io) for MySQL hosting
   - Update connection details in Render environment variables

### Option 2: Deploy to Railway

1. **Sign up at Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account

2. **Deploy Backend**
   - Create new project
   - Add your repository
   - Railway will auto-detect Node.js
   - Add environment variables

3. **Add MySQL Database**
   - Click "New" → "Database" → "MySQL"
   - Railway provides connection details automatically
   - Update your environment variables

### Option 3: Use Aiven for MySQL

1. **Create MySQL Service**
   - Sign up at [aiven.io](https://aiven.io)
   - Create a free MySQL service
   - Note connection details

2. **Update Connection**
   - Update `.env` with Aiven credentials
   - Ensure SSL connection if required

3. **Deploy Backend**
   - Use Render or Railway for the Node.js app
   - Connect to Aiven MySQL database

## 🔧 Environment Variables for Production

When deploying, set these environment variables:

```env
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=movies_db
DB_PORT=3306
PORT=3000
NODE_ENV=production
```

## 🧪 Testing the API

### Using cURL

```bash
# Get all movies
curl http://localhost:3000/api/movies

# Get movie by ID
curl http://localhost:3000/api/movies/1

# Create new movie
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Movie",
    "director": "Director Name",
    "genre": "Action",
    "release_year": 2024,
    "rating": 8.5
  }'

# Update movie
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Movie",
    "director": "Director Name",
    "genre": "Action",
    "release_year": 2024,
    "rating": 9.0
  }'

# Delete movie
curl -X DELETE http://localhost:3000/api/movies/1
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:3000/api`
3. Test each endpoint with appropriate request bodies

## 🎨 UI Features

- **Responsive Design**: Works on all screen sizes
- **Search**: Real-time search across title, director, and genre
- **Modals**: Beautiful modal forms for add/edit operations
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Spinner during data fetching
- **Empty States**: Helpful messages when no data exists

## 🐛 Troubleshooting

### Database Connection Issues

If you get connection errors:
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `.env`
3. Ensure user has proper permissions
4. Test connection: `mysql -u username -p`

### Port Already in Use

If port 3000 is busy:
1. Change PORT in `.env`
2. Or kill the process: `lsof -ti:3000 | xargs kill`

### Nodemon Not Working

If Nodemon doesn't auto-reload:
1. Install globally: `npm install -g nodemon`
2. Or use: `npx nodemon server.js`

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created for streaming startup movie catalog system.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
