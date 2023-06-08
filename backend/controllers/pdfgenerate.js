const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const { Parser } = require('json2csv');

async function generatePDF() {
  const jsonData = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'London' },
    { name: 'Bob Johnson', age: 40, city: 'Paris' }
  ];
  
  // Convert JSON data to CSV
  const fields = ['name', 'age', 'city'];
  const opts = { fields };
  const parser = new Parser(opts);
  const csvData = parser.parse(jsonData);
  
  // Split CSV data into rows and columns
  const rows = csvData.split('\n');
  const columns = rows.map(row => row.split(','));
  
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a new page
  const page = pdfDoc.addPage();
  
  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(12);
  
  // Set the column widths and row height
  const columnWidths = [100, 50, 100];
  const rowHeight = 20;
  
  // Draw the column headers
  page.drawText('Name', { x: 50, y: 700, color: rgb(0, 0.53, 0.71) });
  page.drawText('Age', { x: 150, y: 700, color: rgb(0, 0.53, 0.71) });
  page.drawText('City', { x: 200, y: 700, color: rgb(0, 0.53, 0.71) });
  
  // Draw the data rows
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    for (let j = 0; j < column.length; j++) {
      const value = column[j].trim();
      const x = 50 + columnWidths[j] * j;
      const y = 700 - (i + 1) * rowHeight;
      page.drawText(value, { x, y });
    }
  }
  
  // Serialize the PDF document to a buffer
  const pdfBytes = await pdfDoc.save();
  
  // Write the buffer to a file
  fs.writeFileSync('output.pdf', pdfBytes);
}

generatePDF().catch((error) => console.log(error));