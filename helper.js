const fs = require("fs");

const DATA_FILE = "data.json";

// Helper function to read data from the JSON file
function readData() {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

// Helper function to write data to the JSON file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readData, writeData, DATA_FILE };
