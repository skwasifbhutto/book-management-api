import { Router } from 'express';
import multer from 'multer';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  importBooksFromCSV
} from '../controllers/bookController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooksFromCSV);

export default router;
