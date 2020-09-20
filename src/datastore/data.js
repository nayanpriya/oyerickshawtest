let data = [];
const columns = ["mobile", "earning_id", "earning"];

export function getData() {
  return data;
}

export function getColumnNames() {
  return columns;
}

export function setData(rawData) {
  data = parseData(rawData);
  console.log("setData in data.js");
  console.log(data);
}

export function deleteData(earning_id) {
  const deleteIndex = data.findIndex((row) => row.earning_id === earning_id);
  return data.splice(deleteIndex, 1);
}

export function parseData(rawData) {
  if (!rawData || rawData.length === 0) {
    throw new Error("data is not present");
  }
  if (!(rawData[0] instanceof Array) || rawData[0].length !== 3) {
    throw new Error("incorrect data");
  }
  if (
    rawData[0][0] !== columns[0] ||
    rawData[0][1] !== columns[1] ||
    rawData[0][2] !== columns[2]
  ) {
    throw new Error(
      "incorrect columns or malformed columns with incorrect sequence"
    );
  }

  rawData.shift();

  return rawData.map((row) => {
    return {
      [columns[0]]: row[0],
      [columns[1]]: row[1],
      [columns[2]]: row[2]
    };
  });
}
