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
git clone https://github.com/skwasifbhutto/book-management-api.git
cd book-management-api
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
book-management-api/
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
├── jest.config.js
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
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

## 🔍 API Response Examples

### Successful Book Retrieval
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925,
  "createdAt": "2025-11-25T10:30:00Z"
}
```

### Error Response
```json
{
  "error": "Book not found",
  "statusCode": 404
}
```

## 🚨 Error Handling

The API includes comprehensive error handling for:
- Invalid input validation (400)
- Resource not found (404)
- Server errors (500)
- Validation errors with detailed messages

## 🔐 Security Considerations

- Environment variables are used for sensitive data (DATABASE_URL, API keys)
- Input validation using Zod prevents malicious data
- CORS configuration should be restricted in production
- CSV file upload size limits are enforced

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env` file
- Ensure MongoDB instance is running
- Check network connectivity to MongoDB cluster

### CSV Import Fails
- Ensure CSV headers match: `title`, `author`, `publishedYear`
- Check file encoding (UTF-8 recommended)
- Verify file size is within upload limits

### Tests Fail
- Run `pnpm exec prisma generate` to generate Prisma client
- Clear Jest cache: `pnpm run test -- --clearCache`
- Ensure MongoDB test database is accessible

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

ISC

---

For more information or issues, please check the project documentation or create an issue in the repository.
