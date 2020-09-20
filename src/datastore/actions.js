import { deleteData, getData } from "./data";

export function approve(earning_id_arr) {
  return new Promise((resolve, reject) => {
    const oldData = getData();
    let approvedRows = oldData.filter((row) =>
      earning_id_arr.includes(row.earning_id)
    );
    approvedRows = approvedRows.map((row) => ({
      mobile: row.mobile,
      earning_id: row.earning_id,
      earning: row.earning,
      action: "approve"
    }));
    console.log(approvedRows);
    earning_id_arr.forEach((earning_id) => {
      deleteData(earning_id);
    });
    resolve();
  });
}

export function reject(earning_id, remark) {
  return new Promise((resolve, reject) => {
    const oldData = getData();
    let rejectedRows = oldData.filter((row) => row.earning_id === earning_id);
    rejectedRows = rejectedRows.map((row) => ({
      mobile: row.mobile,
      earning_id: row.earning_id,
      earning: row.earning,
      action: "reject",
      remark
    }));
    console.log(rejectedRows);
    deleteData(earning_id);
    resolve();
  });
}
