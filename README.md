# Book Management System

A Node.js/Express REST API for managing a book collection with CSV import functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Database](#database)

## ✨ Features

- RESTful API for book management (CRUD operations)
- CSV file import functionality for bulk book uploads
- MongoDB database with Prisma ORM
- Input validation using Zod
- Error handling middleware
- CORS enabled
- Request logging with Morgan
- Comprehensive test suite with Jest

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1
- **Database**: MongoDB
- **ORM**: Prisma
- **Language**: TypeScript
- **Testing**: Jest + Supertest
- **Validation**: Zod
- **Middleware**: 
  - CORS
  - Morgan (logging)
  - Multer (file uploads)

## 📦 Prerequisites

- Node.js 18+ installed
- pnpm package manager (v10.15.1+)
- MongoDB instance (local or cloud)

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-task
```

2. Install dependencies:
```bash
pnpm install
```

3. Generate Prisma client:
```bash
pnpm exec prisma generate
```

## 🔧 Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=3000
NODE_ENV=development
```

Replace the MongoDB connection string with your actual credentials.

## ▶️ Running the Application

### Development Mode
Runs with hot-reload:
```bash
pnpm run dev
```

### Production Build
```bash
pnpm run build
```

### Start Production Server
```bash
pnpm start
```

The server will start on `http://localhost:3000`

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Book Endpoints

#### Get All Books
```
GET /books
```

#### Get Book by ID
```
GET /books/:id
```

#### Create Book
```
POST /books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2023
}
```

#### Update Book
```
PUT /books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2024
}
```

#### Delete Book
```
DELETE /books/:id
```

#### Import Books from CSV
```
POST /books/import
Content-Type: multipart/form-data

Form Data:
- file: <CSV file>
```

CSV Format:
```
title,author,publishedYear
The Great Gatsby,F. Scott Fitzgerald,1925
To Kill a Mockingbird,Harper Lee,1960
```

## 📁 Project Structure

```
book-task/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── config/
│   │   └── db.ts               # Database configuration
│   ├── controllers/
│   │   └── bookController.ts    # Book request handlers
│   ├── routes/
│   │   └── bookRoutes.ts        # Book API routes
│   ├── services/
│   │   └── importService.ts     # CSV import logic
│   ├── middleware/
│   │   └── errorHandler.ts      # Error handling middleware
│   ├── utils/
│   │   └── csvParser.ts         # CSV parsing utilities
│   └── __tests__/
│       └── bookController.test.ts # Controller tests
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🧪 Testing

Run the test suite:
```bash
pnpm run test
```

Tests are located in `src/__tests__/` and use Jest with Supertest for HTTP endpoint testing.

## 🗄️ Database

### Schema

The `Book` model includes:
- `id` - MongoDB ObjectId (auto-generated)
- `title` - Book title
- `author` - Author name
- `publishedYear` - Publication year
- `createdAt` - Timestamp (auto-generated)

### Migrations

To run migrations:
```bash
pnpm exec prisma migrate dev
```

## 📝 Notes

- The application includes error handling middleware for graceful error responses
- CSV import validates data before inserting into the database
- All API endpoints are protected with error handling
- CORS is enabled for development purposes

## 📄 License

ISC

---

For more information or issues, please check the project documentation or create an issue in the repository.
