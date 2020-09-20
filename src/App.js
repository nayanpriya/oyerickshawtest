import React from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './UploadFile/Upload.js';
import UserDetails from './FileDetails/EntityDetails.js';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { listDetails: null }
  }

  getFileDetails = (data) => {
    console.log(data)
    this.setState({ listDetails: data })
  }

  render() {
    const { listDetails } = this.state
    return (<><Upload getFileDetails={this.getFileDetails}></Upload>
      <UserDetails userDetails={listDetails}></UserDetails></>)
  }

}
