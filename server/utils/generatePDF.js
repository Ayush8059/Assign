const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateMatchPDF = (userId, matched, unmatched) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `match-result-${userId}-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.fontSize(20).text('Transaction Matching Report', { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text('Matched Transactions:');
    doc.moveDown();

    matched.forEach(item => {
      doc.fontSize(12).text(`Date: ${item.date} | Amount: ${item.amount} | Description: ${item.description}`);
    });

    doc.moveDown();
    doc.fontSize(16).text('Unmatched Transactions:');
    doc.moveDown();

    unmatched.forEach(item => {
      doc.fontSize(12).text(`Date: ${item.date} | Amount: ${item.amount} | Description: ${item.description}`);
    });

    doc.end();

    writeStream.on('finish', () => {
      resolve(`/uploads/${fileName}`);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = generateMatchPDF;
