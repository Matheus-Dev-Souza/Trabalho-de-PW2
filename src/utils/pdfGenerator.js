const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (data, cidade) => {
  const doc = new PDFDocument();
  const filePath = `./relatorios/relatorio_${cidade}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(18).text(`Relatório de Placas - ${cidade}`, { align: 'center' });
  doc.moveDown();

  data.forEach(item => {
    doc.fontSize(12).text(`Placa: ${item.placa}, Cidade: ${item.cidade}, Data e Hora: ${item.dataHora}`);
    doc.moveDown();
  });

  doc.end();
  return filePath;
};

module.exports = { generatePDF };
