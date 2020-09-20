import React from "react";
import { uploadFile } from "../datastore";

export default class Upload extends React.Component {
  uploadFile = (event) => {
    console.log(event.target);
    const fileUpload = event.target;
    this.props.setStatus(1);
    uploadFile(fileUpload)
      .then((response) => {
        if (response === "done") {
          this.props.setStatus(2);
        } else {
          this.props.setStatus(3);
        }
      })
      .catch((e) => {
        console.error(e);
        this.props.setStatus(3);
      });
  };

  render() {
    return (
      <div>
        <input name="upload" type="file" onChange={this.uploadFile}></input>
      </div>
    );
  }
}
