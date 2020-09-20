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
        const checkedEarningIds = this.state.checkedEarningIds;
        var earning_id = this.state.rejectId;
        const isEarningIdIsAlreadyChecked = checkedEarningIds.includes(earning_id);
        if (isEarningIdIsAlreadyChecked) {
            const newCheckedEarningIds = checkedEarningIds.filter(
                (id) => id !== earning_id
            );
            this.setState({ checkedEarningIds: newCheckedEarningIds });
        }
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
                <div className="entity-details">
                    <div className="approve-btn-row">
                        <button
                            className="btn approve-btn"
                            onClick={this.approveEntity}
                            disabled={this.state.checkedEarningIds.length === 0}
                        >
                            Approve
            </button>
                    </div>

                    <div className="table">
                        <div className="table-row thead">
                            <div className="table-column select">{""}</div>
                            {getColumnNames().map((col) => (
                                <div key={col} className="table-column">
                                    {col === "earning_id" ? "EARNING-ID" : col.toUpperCase()}
                                </div>
                            ))}
                            <div className="table-column action">Action</div>
                        </div>
                        {entityDetails && (
                            <div>
                                {entityDetails.map((row, index) => {
                                    return (
                                        <div className="table-row" key={row.earning_id}>
                                            <input
                                                className="table-column select"
                                                type="checkbox"
                                                onChange={(event) =>
                                                    this.selectRow(event, row.earning_id)
                                                }
                                            />
                                            <div className="table-column">{row.mobile}</div>
                                            <div className="table-column">{row.earning_id}</div>
                                            <div className="table-column">{row.earning}</div>
                                            <div className="table-column action">
                                                <button
                                                    onClick={() => this.rejectModalShow(row.earning_id)}
                                                    className="btn reject-btn"
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
                                    <button
                                        className="btn reject-btn"
                                        onClick={this.rejectModalSubmit}
                                    >
                                        Reject
                  </button>
                                    <button
                                        className="btn cancel-btn"
                                        onClick={this.rejectModalCancel}
                                    >
                                        Cancel
                  </button>
                                </div>
                            </div>
                        </RejectModal>
                    )}
                </div>
            )
        );
    }
}
