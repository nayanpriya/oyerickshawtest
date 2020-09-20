import React from 'react';

export default class Input extends React.Component{

    render(){

     const {name , uploadFile , type} = this.props   
        return(<div><input id= "fileupload" type= {type} onChange = {uploadFile}></input></div>)
    }



}