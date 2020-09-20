import React from "react";
import "./App.css";
import Upload from "./UploadFile/Upload.js";
import EntityDetails from "./FileDetails/EntityDetails.js";
import { approve, getData, reject } from "./datastore";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // uploadStatus 0 means nothing is processing, 1 means in-process, 2 means success, 3 means failure.
    this.state = { listDetails: null, uploadStatus: 0 };
  }

  setStatus = (uploadStatus) => {
    console.log("setting status as ", uploadStatus);
    if (uploadStatus === 2) {
      const listDetails = getData();
      this.setState({ listDetails });
    }
    this.setState({ uploadStatus });
  };

  approve = (earning_id_arr) => {
    approve(earning_id_arr).then(() => {
      this.setState({ listDetails: getData() });
    });
  };

  reject = (earning_id, remark) => {
    reject(earning_id, remark).then(() => {
      this.setState({ listDetails: getData() });
    });
  };

  render() {
    const { listDetails } = this.state;
    return (
      <>
        <Upload
          setStatus={this.setStatus}
          uploadStatus={this.state.uploadStatus}
        ></Upload>
        <EntityDetails
          entityDetails={listDetails}
          uploadStatus={this.state.uploadStatus}
          approve={this.approve}
          reject={this.reject}
        ></EntityDetails>
      </>
    );
  }
}
