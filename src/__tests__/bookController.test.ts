import request from 'supertest';
import express from 'express';
import bookRoutes from '../routes/bookRoutes';

const app = express();
app.use(express.json());
app.use('/api', bookRoutes);

describe('Book API', () => {
  it('should return all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      publishedYear: 2024,
    };
    const response = await request(app)
      .post('/api/books')
      .send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Book');
  });
});
