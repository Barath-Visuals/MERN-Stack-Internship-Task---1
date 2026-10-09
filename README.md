# Product Management System

A full-stack MERN internship project for viewing and managing products. The application separates product browsing from product administration with a simple sidebar and responsive interface.

## Features

- **Product View:** Browse product cards with images and key product details.
- **Product Management:** View products in a table with product name, category, price, description, and actions.
- **Add Product:** Create a product using the product form.
- **Edit Product:** Update existing product information.
- **Delete Product:** Remove a product after confirmation.
- **Product Count:** Display the number of products.
- **Responsive UI:** Layout designed to work across desktop and smaller screens.
- **MongoDB integration:** Store product data through a Node.js and Express API.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS

## Project Structure

```text
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── service/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (includes npm)
- A MongoDB database, either local MongoDB or [MongoDB Atlas](https://www.mongodb.com/atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with your GitHub repository URL and folder name.

### 2. Configure the backend

Open a terminal in the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI. Do not commit the `.env` file or publish database credentials.

Start the backend:

```bash
node server.js
```

The backend connects to MongoDB and runs at:

- API base URL: `http://localhost:5000/api/products`
- Server health check: `http://localhost:5000/`

Keep this terminal running.

### 3. Configure and run the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal (usually `http://localhost:5173`).

## API Overview

The frontend communicates with the backend at `http://localhost:5000/api/products`.

| Operation | Method | Endpoint |
|---|---|---|
| Get all products | GET | `/api/products` |
| Create product | POST | `/api/products` |
| Get product by ID | POST | `/api/products/:id` |
| Update product | POST | `/api/products/update` |
| Delete product | POST | `/api/products/delete` |

All endpoints are relative to `http://localhost:5000`. These routes reflect the current project implementation.

## Available Frontend Scripts

Run these commands from the `frontend/` directory:

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Notes

- Start MongoDB and the backend before using the frontend product features.
- The frontend currently expects the backend at `http://localhost:5000`.
- Keep secrets such as MongoDB connection strings in environment variables.
- Confirm that create, edit, and delete operations work with your configured database before deployment.

## Project Purpose

This project was developed as an internship task to practice building a MERN stack application, implementing product CRUD operations, connecting a React frontend to an Express API, and creating a clear product browsing and management experience.
