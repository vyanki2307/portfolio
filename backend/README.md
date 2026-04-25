# 🚀 My Portfolio — Setup Guide

## 📁 Folder Structure
```
portfolio/
├── frontend/
│   ├── index.html    ← Your webpage
│   ├── style.css     ← Your design/colors
│   └── script.js     ← Fetches data from backend
└── backend/
    ├── server.js     ← Node.js + Express API
    └── package.json  ← Dependencies list
```

---

## ▶️ How to Run This Project

### STEP 1 — Open the Frontend
1. Open VS Code
2. Open the `frontend` folder
3. Right-click `index.html` → "Open with Live Server"
4. Your website opens in the browser!

---

### STEP 2 — Run the Backend

Open a **new terminal** in VS Code (Terminal → New Terminal)

```bash
# Go into the backend folder
cd backend

# Install all packages (only needed once)
npm install

# Start the server
npm run dev
```

You should see:
```
✅ Connected to MongoDB!
🌍 Server is running at http://localhost:5000
```

---

### STEP 3 — Test the API

Open your browser and go to:
- http://localhost:5000 → should say "🚀 Portfolio Backend is running!"
- http://localhost:5000/api/projects → shows your projects as JSON

---

### STEP 4 — Add a Project (via Postman or Thunder Client)

Install **Thunder Client** extension in VS Code, then:

- Method: `POST`
- URL: `http://localhost:5000/api/projects`
- Body (JSON):
```json
{
  "title": "My Todo App",
  "description": "A task manager built with JavaScript",
  "techStack": "HTML, CSS, JS",
  "githubLink": "https://github.com/yourusername/todo-app",
  "liveLink": "https://mytodoapp.netlify.app"
}
```

---

### STEP 5 — Connect MongoDB Atlas (Cloud Database)

1. Go to https://mongodb.com/atlas
2. Create a free account → Create a free cluster
3. Click "Connect" → "Drivers" → Copy the connection string
4. In `server.js`, replace this line:
   ```js
   const MONGO_URI = "mongodb://localhost:27017/portfolioDB";
   ```
   with your Atlas URI:
   ```js
   const MONGO_URI = "mongodb+srv://youruser:yourpass@cluster.mongodb.net/portfolioDB";
   ```

---

## 🌐 Deploy Your Site

### Frontend → Netlify (Free)
1. Go to https://netlify.com
2. Drag & drop your `frontend` folder
3. Done! You get a free URL like `yourname.netlify.app`

### Backend → Render (Free)
1. Push your backend to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set Start Command: `node server.js`
5. Add Environment Variable: `MONGO_URI` = your Atlas URI

---

## 🛠️ Customize It!
- Change your name in `index.html`
- Change colors in `style.css` (look for `:root` at the top)
- Add your GitHub/LinkedIn links in `index.html`
- Add more sections as you learn more!
