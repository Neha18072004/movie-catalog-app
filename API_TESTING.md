# API Testing Guide

## Base URL
```
http://localhost:3000/api
```

## Test Scenarios

### 1. Get All Movies
**Endpoint:** `GET /movies`

**Expected Response:**
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

### 2. Get Single Movie
**Endpoint:** `GET /movies/1`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "genre": "Drama",
    "release_year": 1994,
    "rating": 9.3
  }
}
```

### 3. Create New Movie
**Endpoint:** `POST /movies`

**Request Body:**
```json
{
  "title": "Avengers: Endgame",
  "director": "Russo Brothers",
  "genre": "Action",
  "release_year": 2019,
  "rating": 8.4
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie created successfully",
  "data": {
    "id": 9,
    "title": "Avengers: Endgame",
    "director": "Russo Brothers",
    "genre": "Action",
    "release_year": 2019,
    "rating": 8.4
  }
}
```

### 4. Update Movie
**Endpoint:** `PUT /movies/9`

**Request Body:**
```json
{
  "title": "Avengers: Endgame",
  "director": "Anthony and Joe Russo",
  "genre": "Action",
  "release_year": 2019,
  "rating": 8.5
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie updated successfully",
  "data": {
    "id": 9,
    "title": "Avengers: Endgame",
    "director": "Anthony and Joe Russo",
    "genre": "Action",
    "release_year": 2019,
    "rating": 8.5
  }
}
```

### 5. Delete Movie
**Endpoint:** `DELETE /movies/9`

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

### 6. Search Movies
**Endpoint:** `GET /movies/search?q=nolan`

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 3,
      "title": "The Dark Knight",
      "director": "Christopher Nolan",
      "genre": "Action",
      "release_year": 2008,
      "rating": 9.0
    }
  ]
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Movie not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields: title, director, genre, release_year, rating"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error creating movie",
  "error": "Detailed error message"
}
```

## Postman Collection

You can import this into Postman:

1. Create new collection "Movie Catalog API"
2. Add requests for each endpoint above
3. Set environment variable: `base_url = http://localhost:3000/api`
4. Use `{{base_url}}/movies` in your requests

## cURL Commands

### Get All Movies
```bash
curl http://localhost:3000/api/movies
```

### Create Movie
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Movie",
    "director": "Test Director",
    "genre": "Drama",
    "release_year": 2024,
    "rating": 7.5
  }'
```

### Update Movie
```bash
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "director": "Updated Director",
    "genre": "Drama",
    "release_year": 2024,
    "rating": 8.0
  }'
```

### Delete Movie
```bash
curl -X DELETE http://localhost:3000/api/movies/1
```
