# 📘 Project Documentation

## 🎯 Project Overview

**Movie Catalog System** is a full-stack web application designed for managing a movie database. Built for a streaming startup, it provides a complete solution for cataloging movies with an intuitive user interface and robust RESTful API.

### Key Objectives
- ✅ Create a scalable movie catalog system
- ✅ Implement full CRUD operations
- ✅ Provide responsive, user-friendly interface
- ✅ Enable real-time search capabilities
- ✅ Deploy to free hosting platforms

---

## 🏗️ Architecture

### Technology Stack

**Backend:**
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js 4.18.2
- **Database:** MySQL 5.7+
- **Database Driver:** mysql2 3.6.5
- **Auto-reload:** Nodemon 3.0.2

**Frontend:**
- **HTML5** - Semantic markup
- **CSS:** Tailwind CSS 3.4.17 (CDN)
- **JavaScript:** Vanilla JS (ES6+)
- **Icons:** Heroicons (embedded SVGs)

**Additional Libraries:**
- **cors:** Cross-origin resource sharing
- **dotenv:** Environment variable management
- **body-parser:** Request body parsing

### Architecture Pattern

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│                    (HTML/CSS/JS)                         │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────────────────────┐
│                   Express Server                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Routes Layer                         │  │
│  │    (API Endpoint Definitions)                     │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                      │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │           Controllers Layer                       │  │
│  │    (Business Logic & Request Handling)           │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                      │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │              Models Layer                         │  │
│  │         (Database Queries)                        │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼──────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                  MySQL Database                          │
│               (movies_db.movies)                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

### Movies Table Structure

```sql
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  release_year INT NOT NULL,
  rating DECIMAL(3, 1) CHECK (rating >= 0 AND rating <= 10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Field Descriptions

| Field        | Type          | Constraints                | Description                        |
|-------------|---------------|----------------------------|------------------------------------|
| id          | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                  |
| title       | VARCHAR(255)  | NOT NULL                   | Movie title                        |
| director    | VARCHAR(255)  | NOT NULL                   | Director's name                    |
| genre       | VARCHAR(100)  | NOT NULL                   | Movie genre                        |
| release_year| INT           | NOT NULL                   | Year of release                    |
| rating      | DECIMAL(3,1)  | 0-10 range                 | Movie rating (e.g., 8.5)          |
| created_at  | TIMESTAMP     | DEFAULT NOW()              | Record creation timestamp          |
| updated_at  | TIMESTAMP     | ON UPDATE NOW()            | Last update timestamp              |

### Sample Data

```sql
INSERT INTO movies (title, director, genre, release_year, rating) VALUES
('The Shawshank Redemption', 'Frank Darabont', 'Drama', 1994, 9.3),
('The Godfather', 'Francis Ford Coppola', 'Crime', 1972, 9.2),
('The Dark Knight', 'Christopher Nolan', 'Action', 2008, 9.0);
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints Overview

| Method | Endpoint           | Description              | Auth Required |
|--------|-------------------|--------------------------|---------------|
| GET    | /movies           | Get all movies           | No            |
| GET    | /movies/:id       | Get specific movie       | No            |
| POST   | /movies           | Create new movie         | No            |
| PUT    | /movies/:id       | Update existing movie    | No            |
| DELETE | /movies/:id       | Delete movie             | No            |
| GET    | /movies/search?q= | Search movies            | No            |

### Request/Response Examples

#### 1. GET /api/movies
**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "genre": "Drama",
      "release_year": 1994,
      "rating": 9.3,
      "created_at": "2024-12-11T02:48:00.000Z",
      "updated_at": "2024-12-11T02:48:00.000Z"
    }
  ]
}
```

#### 2. POST /api/movies
**Request Body:**
```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "genre": "Sci-Fi",
  "release_year": 2010,
  "rating": 8.8
}
```

**Response:**
```json
{
  "success": true,
  "message": "Movie created successfully",
  "data": {
    "id": 9,
    "title": "Inception",
    "director": "Christopher Nolan",
    "genre": "Sci-Fi",
    "release_year": 2010,
    "rating": 8.8
  }
}
```

---

## 🎨 Frontend Architecture

### Component Structure

```
public/
├── index.html          # Main HTML structure
│   ├── Header          # Navigation and branding
│   ├── Search Bar      # Real-time search input
│   ├── Movies Grid     # Dynamic movie cards
│   ├── Modal           # Add/Edit form
│   └── Toast           # Notifications
└── app.js              # Application logic
    ├── loadMovies()    # Fetch and display movies
    ├── handleSearch()  # Search filtering
    ├── editMovie()     # Edit functionality
    ├── deleteMovie()   # Delete with confirmation
    └── showToast()     # User feedback
```

### State Management

```javascript
// Global state
let movies = [];              // All movies data
let isEditMode = false;       // Form mode flag
let searchTimeout = null;     // Debounce search
```

### API Integration

```javascript
const API_BASE_URL = '/api';

// Fetch example
async function loadMovies() {
  const response = await fetch(`${API_BASE_URL}/movies`);
  const data = await response.json();
  // Handle response
}
```

---

## 🔐 Security Considerations

### Current Implementation

1. **Input Validation**
   - Required fields validation
   - Data type checking
   - Rating range validation (0-10)
   - Year range validation

2. **SQL Injection Prevention**
   - Parameterized queries
   - mysql2 prepared statements

3. **Error Handling**
   - Try-catch blocks
   - Meaningful error messages
   - No sensitive data in errors

### Recommended Enhancements

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Input sanitization
const validator = require('validator');
const sanitizedTitle = validator.escape(req.body.title);

// Authentication (future)
const jwt = require('jsonwebtoken');
// Implement JWT-based authentication
```

---

## ⚡ Performance Optimization

### Current Optimizations

1. **Database Connection Pooling**
   ```javascript
   connectionLimit: 10,
   queueLimit: 0
   ```

2. **Search Debouncing**
   ```javascript
   setTimeout(() => {
     // Search after 300ms pause
   }, 300);
   ```

3. **Async/Await**
   - Non-blocking operations
   - Efficient error handling

### Future Improvements

1. **Caching**
   ```javascript
   const redis = require('redis');
   // Cache frequently accessed movies
   ```

2. **Pagination**
   ```javascript
   GET /api/movies?page=1&limit=20
   ```

3. **Image CDN**
   - Store movie posters on CDN
   - Lazy loading images

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Backend API:**
- [ ] GET all movies returns array
- [ ] GET single movie returns object
- [ ] POST creates new movie
- [ ] PUT updates existing movie
- [ ] DELETE removes movie
- [ ] Search returns filtered results
- [ ] Invalid requests return 400
- [ ] Missing resources return 404

**Frontend:**
- [ ] Movies load on page load
- [ ] Search filters in real-time
- [ ] Add modal opens/closes
- [ ] Edit populates form correctly
- [ ] Delete shows confirmation
- [ ] Toast notifications appear
- [ ] Form validation works
- [ ] Responsive on mobile

### Automated Testing (Future)

```javascript
// Example with Jest
describe('Movie API', () => {
  test('GET /api/movies returns movies', async () => {
    const response = await request(app).get('/api/movies');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

---

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Multiple app instances
- Session management with Redis

### Database Scaling
- Read replicas for queries
- Write master for updates
- Connection pooling optimization

### Caching Strategy
- Redis for API responses
- CDN for static assets
- Browser caching headers

---

## 🔄 Future Enhancements

### Phase 1 (Short-term)
- [ ] User authentication
- [ ] Movie poster images
- [ ] Advanced filtering (genre, year range)
- [ ] Sorting options
- [ ] Pagination

### Phase 2 (Medium-term)
- [ ] User reviews and comments
- [ ] Watchlist functionality
- [ ] Movie recommendations
- [ ] Export to CSV/PDF
- [ ] Email notifications

### Phase 3 (Long-term)
- [ ] Integration with TMDB API
- [ ] Video trailers
- [ ] Social sharing
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

---

## 📚 Code Quality Standards

### Naming Conventions
- **Variables:** camelCase (`movieData`, `isEditMode`)
- **Functions:** camelCase (`loadMovies`, `handleSearch`)
- **Classes:** PascalCase (`Movie`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Files:** kebab-case (`movie-routes.js`)

### Code Organization
- One file per route
- One file per model
- Separate concerns (MVC pattern)
- Clear function responsibilities

### Comments
- JSDoc for functions
- Inline for complex logic
- TODO for future work

---

## 🐛 Common Issues & Solutions

### Issue: ECONNREFUSED
**Cause:** MySQL not running
**Solution:** Start MySQL service

### Issue: ER_ACCESS_DENIED_ERROR
**Cause:** Wrong credentials
**Solution:** Check .env file

### Issue: CORS errors
**Cause:** Cross-origin restrictions
**Solution:** CORS middleware already included

### Issue: Port already in use
**Cause:** Previous instance running
**Solution:** Kill process or change port

---

## 📖 Learning Resources

### Node.js & Express
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### MySQL
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [SQL Tutorial](https://www.w3schools.com/sql/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/)

---

## 👥 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Includes error handling
- [ ] No console.logs in production
- [ ] Comments for complex logic
- [ ] Tested manually

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Express.js team
- MySQL community
- Tailwind CSS creators
- Node.js contributors
