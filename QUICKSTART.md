# ⚡ Quick Start Guide

Get the Movie Catalog System up and running in 5 minutes!

## 🎯 Quick Setup (5 Steps)

### Step 1: Install Node.js & MySQL
Make sure you have:
- Node.js (v14+): Download from [nodejs.org](https://nodejs.org)
- MySQL (v5.7+): Download from [mysql.com](https://mysql.com)

### Step 2: Install Dependencies
```bash
cd movie-catalog-app
npm install
```

### Step 3: Configure Database
Edit `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=movies_db
DB_PORT=3306
PORT=3000
```

### Step 4: Initialize Database
```bash
npm run init-db
```

This creates the database, table, and loads sample movies.

### Step 5: Start the Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🚀 That's It!

You should now see:
- 8 sample movies in the catalog
- Working search functionality
- Add/Edit/Delete operations

---

## 🎬 Test the Application

### Try These Actions:

1. **Search**: Type "Nolan" in the search bar
2. **Add Movie**: Click "Add Movie" button
3. **Edit**: Click "Edit" on any movie card
4. **Delete**: Click "Delete" on any movie

---

## 📡 Test the API

### Using Browser (GET requests):
```
http://localhost:3000/api/movies
http://localhost:3000/api/movies/1
```

### Using cURL:
```bash
# Get all movies
curl http://localhost:3000/api/movies

# Add a movie
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Avatar",
    "director": "James Cameron",
    "genre": "Sci-Fi",
    "release_year": 2009,
    "rating": 7.9
  }'
```

---

## 🛠️ Troubleshooting

### Problem: "Cannot connect to database"
**Solution:**
1. Start MySQL: `sudo systemctl start mysql` (Linux) or use MySQL Workbench (Windows)
2. Check credentials in `.env`
3. Verify MySQL is running: `mysql -u root -p`

### Problem: "Port 3000 already in use"
**Solution:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill

# Or change port in .env
PORT=3001
```

### Problem: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. ✅ Read [README.md](README.md) for full documentation
2. ✅ Check [API_TESTING.md](API_TESTING.md) for API details
3. ✅ See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options

---

## 🎓 Development Tips

### Hot Reload is Enabled
Thanks to Nodemon, the server automatically restarts when you edit:
- `server.js`
- Files in `routes/`, `controllers/`, `models/`, `config/`

### Frontend Changes
For frontend changes (HTML/CSS/JS), just refresh your browser.

### Database Changes
After schema changes, run:
```bash
npm run init-db
```

---

## 🌟 Features to Try

✨ **Search**: Real-time search across title, director, genre
📱 **Responsive**: Works on mobile, tablet, desktop
🎨 **Beautiful UI**: Tailwind CSS styling
⚡ **Fast**: Connection pooling for performance
🔔 **Notifications**: Toast messages for all actions

---

## 💡 Pro Tips

1. **Use Nodemon**: Always run `npm run dev` during development
2. **Check Logs**: Console shows helpful error messages
3. **Test API First**: Use browser or cURL before testing UI
4. **Keep MySQL Running**: Don't stop MySQL server while testing

---

## 📞 Need Help?

- Check the error message in terminal
- Review [README.md](README.md) for detailed docs
- Verify MySQL is running
- Check `.env` configuration

---

## ✅ Verification Checklist

Before reporting issues, verify:
- [ ] Node.js installed (`node --version`)
- [ ] MySQL installed and running
- [ ] Dependencies installed (`npm install` ran successfully)
- [ ] Database initialized (`npm run init-db` completed)
- [ ] Correct credentials in `.env`
- [ ] Port 3000 is available
- [ ] No firewall blocking MySQL connection

---

Happy Coding! 🎬🚀
