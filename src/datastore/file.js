import * as XLSX from "xlsx";
import { setData } from "./data";

export function uploadFile(fileUpload) {
  return new Promise((resolve, reject) => {
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      //   let fileName = fileUpload.files[0].name;
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            try {
              setData(data);
              resolve("done");
            } catch (e) {
              reject(e);
            }
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        }
      } else {
        reject("This browser does not support HTML5.");
      }
    } else {
      reject("Please upload a valid Excel file.");
    }
  });
}
