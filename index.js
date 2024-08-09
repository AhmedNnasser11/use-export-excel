"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const XLSX = __importStar(require("xlsx"));
const file_saver_1 = require("file-saver");
const defaultOptions = {
    sheetName: 'Sheet1',
    bookType: 'xlsx',
    filename: 'table.xlsx',
    columnWidths: [],
};
const useExportExcel = () => {
    const exportExcel = react_1.default.useCallback((data, options) => {
        const { sheetName, bookType, filename, columnWidths } = Object.assign(Object.assign({}, defaultOptions), options);
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
            if (cell.startsWith('!'))
                return; // Skip metadata cells
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
        (0, file_saver_1.saveAs)(blob, filename);
    }, []);
    return { exportExcel };
};
exports.default = useExportExcel;
