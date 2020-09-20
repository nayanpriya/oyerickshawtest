import React from 'react';
import * as XLSX from 'xlsx';

export default class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = { listDetails: null }
    }

    uploadFile = (event) => {
        console.log(event.target)
        const fileUpload = event.target
        console.log(fileUpload.value)
        const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            let fileName = fileUpload.files[0].name;
            if (typeof (FileReader) !== 'undefined') {
                const reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = (evt) => {
                        const bstr = evt.target.result;
                        const wb = XLSX.read(bstr, { type: 'binary' });
                        /* Get first worksheet */
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        /* Convert array of arrays */
                        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                        /* Update state */
                        this.props.getFileDetails(data)
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                }
            } else {
                console.log("This browser does not support HTML5.");
            }
        } else {
            console.log("Please upload a valid Excel file.");
        }
    }

    render() {
        return (<div><input name="upload" type="file" onChange={this.uploadFile}></input></div>)
    }



}