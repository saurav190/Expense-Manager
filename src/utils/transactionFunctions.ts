import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Transaction } from './types';


export function generatePDF(transactions: Transaction[]) {
  const pdf = new jsPDF();

  const pdfX = 10;
  const pdfY = 10;
  const pdfWidth = pdf.internal.pageSize.getWidth() - 20;

  pdf.setFontSize(18);
  pdf.text("Transaction Report", pdfX, pdfY);
  pdf.setFontSize(12);

  const headers = ["Transaction Type", "Category", "Title", "Date", "Amount"];
  const headerHeight = 12;
  let y = pdfY + headerHeight + 5;

  // Add borders to headers
  pdf.setDrawColor(0);
  pdf.setFillColor(200, 220, 240);
  pdf.rect(pdfX, y - headerHeight, pdfWidth, headerHeight, 'F');
  pdf.setTextColor(0);
  
  headers.forEach((header, columnIndex) => {
    pdf.text(header, pdfX + (pdfWidth / headers.length) * columnIndex + 5, y - 5);
  });

  const dataHeight = 10;
  y += dataHeight + 5;

  transactions.forEach((transaction, rowIndex) => {
    const row = [
      transaction.type,
      transaction.category,
      transaction.label,
      transaction.date,
      transaction.amount.toFixed(2)
    ];

    // Add borders to data rows
    pdf.setDrawColor(0);
    pdf.rect(pdfX, y - dataHeight, pdfWidth, dataHeight, 'S');
    pdf.setTextColor(0);

    row.forEach((cell, columnIndex) => {
      pdf.text(cell, pdfX + (pdfWidth / headers.length) * columnIndex + 5, y - 5);
    });

    y += dataHeight;
  });

  pdf.save('transactions.pdf');
}


export function exportToExcel(transactions: Transaction[]) {
  const transactionsWithSequentialIds = transactions.map((transaction, index) => ({
    ...transaction,
    id: index + 1,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(transactionsWithSequentialIds);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  const excelFileName = 'transactions.xlsx';
  XLSX.writeFile(workbook, excelFileName);
}
