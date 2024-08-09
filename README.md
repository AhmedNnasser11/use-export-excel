# use-export-excel Hook

The `useExportExcel` hook allows you to export data to an Excel file.

#### Parameters

This hook does not take any parameters directly, but you can customize the export by passing options to the `exportExcel` function.

#### Options

- `sheetName`: The name of the sheet within the Excel file (default: `Sheet1`).
- `bookType`: The format of the Excel file (e.g., `xlsx`, `xls`, `csv`).
- `filename`: The name of the exported file (default: `table.xlsx`).
- `columnWidths`: An array specifying the width of each column in pixels.

#### Returns

- `exportExcel`: A function to export the table data to an Excel file.

#### Example

```typescript
import React from 'react';
import  useExportExcel from 'use-export-excel';

const MyComponent = () => {
  const { exportExcel } = useExportExcel();

  const data = [
    { col1: 'Row 1, Column 1', col2: 'Row 1, Column 2', col3: 'Row 1, Column 3' },
    { col1: 'Row 2, Column 1', col2: 'Row 2, Column 2', col3: 'Row 2, Column 3' },
  ];

  const handleExport = () => {
    exportExcel(data, {
      sheetName: 'CustomSheetName',
      bookType: 'xlsx', // Can be 'xlsx', 'csv', 'xlsb', etc.
      filename: 'CustomFilename.xlsx',
      columnWidths: [100, 200, 150], // Widths in pixels for each column
    });
  };

  return (
    <div>
      <button onClick={handleExport}>
        Export to Excel
      </button>
    </div>
  );
};

export default MyComponent;