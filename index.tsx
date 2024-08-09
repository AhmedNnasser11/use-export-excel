import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportOptions {
  sheetName?: string;
  bookType?: XLSX.BookType;
  filename?: string;
  columnWidths?: Array<number>; // Allows specifying column widths
}

const defaultOptions: ExportOptions = {
  sheetName: 'Sheet1',
  bookType: 'xlsx',
  filename: 'table.xlsx',
  columnWidths: [],
};

const useExportExcel = () => {
  const exportExcel = useCallback(
    (data: any[], options?: ExportOptions) => {
      const { sheetName, bookType, filename, columnWidths } = {
        ...defaultOptions,
        ...options,
      };

      // Convert JSON data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Define column widths if provided
      if (columnWidths && columnWidths.length > 0) {
        worksheet['!cols'] = columnWidths.map((width) => ({
          wpx: width,
        }));
      }

      // Apply styles to cells (note: color styling is limited)
      Object.keys(worksheet).forEach((cell) => {
        if (cell.startsWith('!')) return; // Skip metadata cells

        const cellData = worksheet[cell];

        // Basic example of styling (colors might not work in all environments)
        if (cell.startsWith('A1') || cell.startsWith('B1') || cell.startsWith('C1')) {
          cellData.s = {
            font: {
              bold: true,
            },
          };
        }
      });

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate Excel file buffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: bookType || 'xlsx',
        type: 'array',
        cellStyles: true,
      });

      // Create a Blob from the buffer and save it
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      saveAs(blob, filename);
    },
    []
  );

  return { exportExcel };
};

export default useExportExcel;
