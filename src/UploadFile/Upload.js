import React from "react";
import { uploadFile } from "../datastore";

export default class Upload extends React.Component {
  state = { errorText: "" };
  uploadFile = (event) => {
    const fileUpload = event.target;
    this.props.setStatus(1);
    this.setState({ errorText: "" });
    uploadFile(fileUpload)
      .then((response) => {
        if (response === "done") {
          this.props.setStatus(2);
          this.setState({ errorText: "" });
        } else {
          this.props.setStatus(3);
          this.setState({ errorText: "Some error occured" });
        }
      })
      .catch((e) => {
        console.error(e);
        this.props.setStatus(3);
        this.setState({ errorText: e.message });
      });
  };

  render() {
    return (
      <div>
        <input name="upload" type="file" onChange={this.uploadFile}></input>
        {this.state.errorText && <div>{this.state.errorText}</div>}
      </div>
    );
  }
}
