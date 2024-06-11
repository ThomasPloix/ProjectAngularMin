import { Injectable } from '@angular/core';
import { saveAs } from "file-saver";
import * as Papa from "papaparse";

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {

  constructor() { }

  exportToCsv(filename: string, rows: object[]) {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }
}
