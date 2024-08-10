
# use-export-excel

The `useExportExcel` hook enables you to export data to an Excel file effortlessly, making it an essential tool for any React.js or Next.js project.

## Example on StackBlitz

Check out a live example of how to use this component on StackBlitz:

[StackBlitz Example](https://stackblitz.com/edit/vitejs-vite-xer2as?file=src%2FApp.tsx&terminal=dev)

## Author

[Ahmed Nasser](https://www.linkedin.com/in/ahmed-nasser-931490212/)

## Installation

To install the package, use the following npm command:

```bash
npm install use-export-excel
```

## Parameters

This hook does not take any parameters directly, but you can customize the export by passing options to the `exportExcel` function.

### Options

- `sheetName`: The name of the sheet within the Excel file (default: `Sheet1`).
- `bookType`: The format of the Excel file (e.g., `xlsx`, `xls`, `csv`).
- `filename`: The name of the exported file (default: `table.xlsx`).
- `columnWidths`: An array specifying the width of each column in pixels.

## Returns

- `exportExcel`: A function to export the table data to an Excel file.

## Packages Used

This package relies on the following dependencies:

- **file-saver**: A library for saving files on the client-side.
- **xlsx**: A library for reading, writing, and manipulating spreadsheets in Excel formats.

These packages are included as dependencies when you install `use-export-excel`.

## Usage Example

Here's a basic example of how to use the `useExportExcel` hook in a React component:

```typescript
import React from 'react';
import useExportExcel from 'use-export-excel';

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
      columnWidths: [100, 200], // Widths in pixels for each column
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
```

## License

This project is licensed under the MIT License.
