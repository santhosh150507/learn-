# Simple Notes

A lightweight, clean full-stack web application built with **React + Vite** and **Node.js + Express**. Notes are stored in memory using a simple JavaScript array—no databases, no third-party APIs, and no complex setup required.

---

## Project Structure

```text
simple-notes/
├── backend/
│   ├── package.json
│   └── server.js         # Express REST API (in-memory storage)
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js    # Vite config with /api proxy to backend
│   └── src/
│       ├── App.jsx       # Single-page React notes app
│       ├── App.css       # Clean, modern UI styling
│       ├── index.css     # Base design system & typography
│       └── main.jsx
├── .gitignore
└── README.md
```

---

## API Endpoints

The backend provides two simple REST endpoints on `http://localhost:5000`:

| Method | Endpoint     | Description                   | Request Body              | Response |
| :----- | :----------- | :---------------------------- | :------------------------ | :------- |
| `GET`  | `/api/notes` | Returns all stored notes      | _None_                    | `Array` of note objects |
| `POST` | `/api/notes` | Adds a new note to the array  | `{ "text": "Your note" }` | Created note object (201) |

---

## Quick Start (Run Locally)

### 1. Start the Backend

Open a terminal and navigate to the backend folder:

```bash
cd simple-notes/backend
npm install
npm start
```

The backend server will run at: **http://localhost:5000**

### 2. Start the Frontend

Open a second terminal and navigate to the frontend folder:

```bash
cd simple-notes/frontend
npm install
npm run dev
```

Open your browser and visit: **http://localhost:5173**

---

## How to Test the API

You can test the backend directly using `curl` or PowerShell:

### Using cURL:
```bash
# 1. Fetch all notes:
curl http://localhost:5000/api/notes

# 2. Add a new note:
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"My first note\"}"
```

### Using PowerShell:
```powershell
# 1. Fetch all notes:
Invoke-RestMethod -Uri "http://localhost:5000/api/notes" -Method Get

# 2. Add a new note:
Invoke-RestMethod -Uri "http://localhost:5000/api/notes" -Method Post -ContentType "application/json" -Body '{"text": "My first note"}'
```

---

## Practicing Git & GitHub

Here are the standard Git commands to track, commit, and push this project:

```bash
# 1. Initialize git in the project root
git init

# 2. Add all files to staging (respecting .gitignore)
git add .

# 3. Create your first commit
git commit -m "feat: initial commit for Simple Notes full-stack app"

# 4. Rename default branch to main
git branch -M main

# 5. Link to your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/simple-notes.git

# 6. Push your commit to GitHub
git push -u origin main
```
