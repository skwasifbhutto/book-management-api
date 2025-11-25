import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { importBooks } from '../services/importService';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id }
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear } = req.body;
        console.log('Received data:', { title, author, publishedYear });

    const book = await prisma.book.create({
      data: { title, author, publishedYear: Number(publishedYear) }
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(400).json({ error: 'Failed to create book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear } = req.body;
    const book = await prisma.book.update({
      where: { id: req.params.id },
      data: { title, author, publishedYear: Number(publishedYear) }
    });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({ where: { id: req.params.id } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete book' });
  }
};

export const importBooksFromCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const result = await importBooks(req.file.buffer);
    res.json({
      message: 'Import complete',
      imported: result.successCount,
      failed: result.errors.length,
      errors: result.errors
    });
  } catch (error) {
    res.status(500).json({ error: 'Import failed' });
  }
};
