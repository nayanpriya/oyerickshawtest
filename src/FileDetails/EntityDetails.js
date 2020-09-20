import React from "react";
import "./index.css";
// import Button from './Buttons/Button.js'
import { getColumnNames } from "../datastore";
import RejectModal from "./RejectModal";

export default class EntityDetails extends React.Component {
  state = {
    rejectModalShow: false,
    rejectRemark: "",
    rejectId: null,
    checkedEarningIds: []
  };

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
    this.props.approve(this.state.checkedEarningIds);
  };

  rejectModalShow = (earning_id) => {
    this.setState({ rejectModalShow: true, rejectId: earning_id });
  };

  rejectReasonChange = (event) => {
    this.setState({ rejectRemark: event.target.value });
  };

  rejectModalSubmit = () => {
    this.props
      .reject(this.state.rejectId, this.state.rejectRemark)
      .then(this.rejectModalCancel);
  };

  rejectModalCancel = () => {
    this.setState({ rejectModalShow: false, rejectRemark: "", rejectId: null });
  };

  selectRow = (event, earning_id) => {
    const isChecked = event.target.checked;
    const checkedEarningIds = this.state.checkedEarningIds;
    const isEarningIdIsAlreadyChecked = checkedEarningIds.includes(earning_id);
    if (isChecked && !isEarningIdIsAlreadyChecked) {
      checkedEarningIds.push(earning_id);
      this.setState({ checkedEarningIds });
    } else if (!isChecked && isEarningIdIsAlreadyChecked) {
      const newCheckedEarningIds = checkedEarningIds.filter(
        (id) => id !== earning_id
      );
      this.setState({ checkedEarningIds: newCheckedEarningIds });
    }
  };

  render() {
    const { entityDetails } = this.props;

    return (
      this.props.uploadStatus === 2 &&
      entityDetails && (
        <>
          <button
            id="approve"
            onClick={this.approveEntity}
            disabled={this.state.checkedEarningIds.length === 0}
          >
            Approve
          </button>

          <div className="table">
            <div className="table-row">
              <div className="table-column">Select</div>
              {getColumnNames().map((col) => (
                <div key={col} className="table-column">
                  {col}
                </div>
              ))}
              <div className="table-column">Action</div>
            </div>
            {entityDetails && (
              <div>
                {entityDetails.map((row, index) => {
                  return (
                    <div className="table-row" key={row.earning_id}>
                      <input
                        className="table-column"
                        type="checkbox"
                        onChange={(event) =>
                          this.selectRow(event, row.earning_id)
                        }
                      />
                      <div className="table-column">{row.mobile}</div>
                      <div className="table-column">{row.earning_id}</div>
                      <div className="table-column">{row.earning}</div>
                      <div className="table-column">
                        <button
                          onClick={() => this.rejectModalShow(row.earning_id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {this.state.rejectModalShow && (
            <RejectModal>
              <div className="reject-modal">
                <textarea onChange={this.rejectReasonChange}></textarea>
                <div className="reject-actions">
                  <button onClick={this.rejectModalSubmit}>Reject</button>
                  <button onClick={this.rejectModalCancel}>Cancel</button>
                </div>
              </div>
            </RejectModal>
          )}
        </>
      )
    );
  }
}
