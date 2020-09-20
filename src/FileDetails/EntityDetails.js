import React from "react";
import * as styles from "./index.css";
// import Button from './Buttons/Button.js'
import { getColumnNames } from "../datastore";

export default class EntityDetails extends React.Component {
  handleRowRendering = (user) => {
    console.log(user);
    return (
      <>
        {user.map((item) => (
          <div key={item} className="table-column">
            {item}
          </div>
        ))}

        <button id="reject"> Reject</button>
      </>
    );
  };

  approveEntity = () => {
    console.log("hehr");
  };

  rejectRow = (earning_id) => {
    this.props.reject(earning_id, "something");
  };

  render() {
    const { entityDetails } = this.props;

    return (
      this.props.uploadStatus === 2 &&
      entityDetails && (
        <>
          <button id="approve" onClick={this.approve}>
            Approve
          </button>

          <div className="table">
            <div className="table-row">
              {getColumnNames().map((col) => (
                <div key={col} className="table-column">
                  {col}
                </div>
              ))}
            </div>
            {entityDetails && (
              <div>
                {entityDetails.map((row, index) => {
                  return (
                    <div className="table-row" key={row.earning_id}>
                      <input type="checkbox" id={index} />
                      <div className="table-column">{row.mobile}</div>
                      <div className="table-column">{row.earning_id}</div>
                      <div className="table-column">{row.earning}</div>
                      <div className="table-column">
                        <button onClick={() => this.rejectRow(row.earning_id)}>
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )
    );
  }
}
