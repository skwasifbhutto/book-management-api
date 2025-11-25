import { prisma } from '../config/db';
import { parseCSV } from '../utils/csvParser';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
});

export const importBooks = async (fileBuffer: Buffer) => {
  const parsedData = parseCSV(fileBuffer);
  let successCount = 0;
  const errors: any[] = [];

  for (const [index, row] of parsedData.entries()) {
    try {
      const bookData = {
        title: row.title,
        author: row.author,
        publishedYear: Number(row.publishedYear),
      };

      const validated = bookSchema.parse(bookData);
      await prisma.book.create({ data: validated });
      successCount++;
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push({
          row: index + 2,
          data: row,
          reason: error.issues, // Use 'issues' instead of 'errors'
        });
      } else {
        errors.push({
          row: index + 2,
          data: row,
          reason: 'Invalid data',
        });
      }
    }
  }

  return { successCount, errors };
};
