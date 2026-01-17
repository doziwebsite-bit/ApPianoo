# MASTER_GUIDE.md - ApPianoo Project Documentation

## 📖 Introduction
This document serves as the central source of truth for the **ApPianoo** project (Alan Paul - Pianiste Compositeur). It is designed to guide both human developers and AI assistants in understanding the project structure, technology stack, and development workflows.

**Current Phase**: Phase 2 (Backend Integration & Database Setup)

---

## 🏗️ Project Architecture

The project is structured as a **Monorepo** containing two main applications:

1.  **Frontend** (`/frontend`): A Single Page Application (SPA) built with React and Vite.
2.  **Backend** (`/backend`): A RESTful API built with Node.js, Express, and MongoDB.

### Hosting
-   **Frontend**: Deployed on **Netlify** (configured via `netlify.toml`).
-   **Backend**: Deployed on **Render** (configured via `render.yaml`).

---

## 🛠️ Technology Stack

### Frontend
-   **Framework**: React 18 (with Vite)
-   **Language**: TypeScript
-   **Styling**: **Tailwind CSS** (Loaded via CDN in `index.html` - *Note: This is a non-standard production setup but current implementation*).
-   **Routing**: React Router DOM v6
-   **State Management**: Context API (`AuthContext`, `CartContext`, `ThemeContext`)
-   **Icons**: Lucide React
-   **HTTP Client**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (with Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens)
-   **Payments**: Stripe API
-   **File Storage**: Cloudinary (for PDF partitions)
-   **Email**: Nodemailer

---

## 📂 Directory Structure & Source of Truth

**⚠️ IMPORTANT**: The root directory contains some duplicate files (`App.tsx`, `index.html`, `vite.config.ts`). **These should be IGNORED.**

Always work within the specific `frontend` or `backend` directories.

```
/
├── frontend/                 # ✅ ACTIVE SOURCE for UI
│   ├── src/                  # (Implicit source root)
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route components
│   ├── context/              # Global state (Auth, Cart, Theme)
│   ├── assets/               # Images and static files
│   ├── App.tsx               # Main component
│   ├── index.html            # Entry point (Tailwind CDN here)
│   └── package.json          # Frontend dependencies
│
├── backend/                  # ✅ ACTIVE SOURCE for API
│   ├── models/               # Mongoose Schemas (User, Product, Order)
│   ├── routes/               # API Endpoint definitions
│   ├── server.js             # Entry point
│   └── package.json          # Backend dependencies
│
├── PHASE2_GUIDE.md           # Roadmap for backend integration
├── SETUP_MONGODB.md          # Database setup instructions
└── package.json              # Root orchestration scripts
```

---

## 🚀 Development Workflow

The root `package.json` contains scripts to manage both services simultaneously.

### 1. Installation
Install dependencies for **both** frontend and backend:
```bash
npm run install:all
```
*(This triggers `npm install` in both subdirectories)*

### 2. Running Locally
Start both the frontend and backend servers concurrently:
```bash
npm run dev
```
-   **Frontend**: http://localhost:5173
-   **Backend**: http://localhost:5000 (Health check: `/health`)

### 3. Environment Variables
You must create `.env` files in both directories:

**Frontend** (`frontend/.env`):
-   `VITE_API_URL`: URL of the backend API
-   `VITE_STRIPE_PUBLIC_KEY`: Stripe Public Key
-   `VITE_GOOGLE_CLIENT_ID`: Google OAuth Client ID

**Backend** (`backend/.env`) - *See `.env.example`*:
-   `MONGO_URI`: MongoDB connection string
-   `JWT_SECRET`: Secret for signing tokens
-   `STRIPE_SECRET_KEY`: Stripe Secret Key
-   `CLOUDINARY_*`: Cloudinary credentials

---

## 🎨 Design System & Conventions

-   **Theme**: Support for Dark/Light mode via `ThemeContext`.
-   **Colors**: Custom "Marble" theme implemented via CSS classes and Tailwind config in `index.html`.
-   **Fonts**: 'Inter' (Sans) and 'Playfair Display' (Serif).
-   **Components**: Functional components with Hooks.
-   **Filenames**: PascalCase for components (`Layout.tsx`), camelCase for utilities (`constants.ts`).

---

## 📚 Related Documentation
-   **[PHASE2_GUIDE.md](./PHASE2_GUIDE.md)**: Detailed roadmap for the current backend development phase.
-   **[SETUP_MONGODB.md](./SETUP_MONGODB.md)**: Step-by-step guide to setting up the MongoDB database.
