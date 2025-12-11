# 🚀 Deployment Guide

This guide covers deploying the Movie Catalog System to various free hosting platforms.

## Table of Contents
1. [Render.com Deployment](#rendercom-deployment)
2. [Railway Deployment](#railway-deployment)
3. [Aiven MySQL Setup](#aiven-mysql-setup)
4. [Netlify (Frontend Only)](#netlify-frontend-only)

---

## Render.com Deployment

### Step 1: Prepare Your Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/movie-catalog-app.git
git push -u origin main
```

### Step 2: Create MySQL Database on Aiven
1. Visit [aiven.io](https://aiven.io)
2. Sign up for free account
3. Create new MySQL service (free tier available)
4. Note down connection details:
   - Host
   - Port
   - Username
   - Password
   - Database name

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name:** movie-catalog-app
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Add Environment Variables
In Render dashboard, add these environment variables:
```
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=your-aiven-password
DB_NAME=defaultdb
DB_PORT=12345
PORT=3000
NODE_ENV=production
```

### Step 5: Initialize Database
After deployment, use Render Shell to run:
```bash
npm run init-db
```

### Step 6: Access Your App
Your app will be available at: `https://movie-catalog-app.onrender.com`

---

## Railway Deployment

### Step 1: Prepare Repository
Same as Render - push your code to GitHub.

### Step 2: Sign Up on Railway
1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 3: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 4: Add MySQL Database
1. In your project, click "New"
2. Select "Database" → "MySQL"
3. Railway automatically provisions a MySQL database
4. Connection details are auto-generated

### Step 5: Configure Environment Variables
Railway auto-detects most variables, but add these:
```
NODE_ENV=production
PORT=3000
```

The database variables are automatically set:
- `MYSQL_URL`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

### Step 6: Update Database Config
Modify `config/database.js` to use Railway variables:
```javascript
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.DB_HOST,
  user: process.env.MYSQL_USER || process.env.DB_USER,
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME,
  port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
  // ... rest of config
});
```

### Step 7: Deploy
Railway automatically builds and deploys on git push.

### Step 8: Initialize Database
Use Railway's shell or run the init script:
```bash
npm run init-db
```

---

## Aiven MySQL Setup

### Step 1: Create Aiven Account
1. Visit [aiven.io](https://aiven.io)
2. Sign up (free tier available)

### Step 2: Create MySQL Service
1. Click "Create Service"
2. Select "MySQL"
3. Choose cloud provider and region
4. Select free plan (limited features)
5. Name your service: `movie-catalog-db`

### Step 3: Get Connection Details
Once service is running, note:
- **Service URI:** Full connection string
- **Host:** hostname.aivencloud.com
- **Port:** Usually 12345
- **User:** avnadmin
- **Password:** Generated password
- **Database:** defaultdb

### Step 4: Configure SSL (if required)
Download SSL certificates from Aiven dashboard if needed.

### Step 5: Update .env
```env
DB_HOST=movie-catalog-db-youraccount.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=generated-password
DB_NAME=defaultdb
DB_PORT=12345
```

### Step 6: Test Connection
```bash
mysql -h movie-catalog-db-youraccount.aivencloud.com \
      -P 12345 \
      -u avnadmin \
      -p \
      defaultdb
```

### Step 7: Initialize Database
```bash
npm run init-db
```

---

## Netlify (Frontend Only)

If you want to deploy frontend separately:

### Step 1: Separate Frontend
Create a `netlify.toml`:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.onrender.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Update Frontend API URL
In `public/app.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

### Step 3: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `public` folder
3. Or connect GitHub repo

---

## Complete Deployment Checklist

### Before Deployment
- [ ] Code pushed to GitHub
- [ ] `.env` file in `.gitignore`
- [ ] Database connection tested locally
- [ ] All dependencies in package.json

### Database Setup
- [ ] MySQL database created
- [ ] Connection details noted
- [ ] Database initialized with schema
- [ ] Sample data loaded (optional)

### Backend Deployment
- [ ] Service created on hosting platform
- [ ] Environment variables configured
- [ ] Build command set: `npm install`
- [ ] Start command set: `npm start`
- [ ] Health check passing

### Post-Deployment
- [ ] API endpoints tested
- [ ] Frontend accessible
- [ ] Database operations working
- [ ] CORS configured if needed

---

## Troubleshooting

### Issue: Database Connection Failed
**Solution:** 
- Verify environment variables
- Check if database service is running
- Ensure correct host, port, credentials
- Check firewall/network settings

### Issue: Build Failed on Platform
**Solution:**
- Check build logs
- Verify Node.js version compatibility
- Ensure all dependencies listed in package.json
- Check for syntax errors

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Verify API_BASE_URL in frontend
- Check CORS settings in backend
- Ensure backend is running
- Test API endpoints directly

### Issue: Environment Variables Not Working
**Solution:**
- Restart service after adding variables
- Check variable names (case-sensitive)
- Ensure no quotes in values
- Verify .env file format

---

## Monitoring & Logs

### Render
- View logs: Dashboard → Your Service → Logs
- Shell access: Dashboard → Your Service → Shell

### Railway
- View logs: Project → Deployments → View Logs
- Metrics available in dashboard

### Aiven
- Service metrics in dashboard
- Query statistics available
- Slow query logs

---

## Cost Optimization

### Free Tier Limits

**Render:**
- Free tier sleeps after 15 mins inactivity
- 750 hours/month free
- Limited bandwidth

**Railway:**
- $5 free credit monthly
- Pay-as-you-go after free credit

**Aiven:**
- Free tier with limited resources
- 1 CPU, 1GB RAM, 5GB storage

### Tips
1. Use connection pooling
2. Optimize queries
3. Implement caching
4. Minimize database calls
5. Use CDN for static files

---

## Security Best Practices

1. **Never commit .env file**
2. **Use strong database passwords**
3. **Enable SSL for database connections**
4. **Implement rate limiting**
5. **Validate all inputs**
6. **Use environment variables for secrets**
7. **Keep dependencies updated**
8. **Enable HTTPS only**

---

## Support

For platform-specific issues:
- **Render:** [render.com/docs](https://render.com/docs)
- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Aiven:** [docs.aiven.io](https://docs.aiven.io)

For application issues:
- Check logs first
- Review API_TESTING.md
- Verify database connection
- Test locally before deploying
