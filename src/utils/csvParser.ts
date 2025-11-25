export interface CsvRow {
  [key: string]: string;
}

export const parseCSV = (buffer: Buffer): CsvRow[] => {
  const content = buffer.toString('utf-8');
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const results: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let currentVal = '';
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());

    const rowObj: CsvRow = {};
    headers.forEach((header, index) => {
      rowObj[header] = values[index]?.replace(/^"|"$/g, '') || '';
    });
    results.push(rowObj);
  }

  return results;
};
