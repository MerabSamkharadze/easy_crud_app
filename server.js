const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "data.json";

app.use(express.json()); // To parse JSON bodies

// Helper function to read data from the JSON file
function readData() {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

// Helper function to write data to the JSON file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Read all items
app.get("/items", (req, res) => {
  const data = readData();
  res.json(data);
});

// Create a new item
app.post("/items", (req, res) => {
  const data = readData();
  const newItem = req.body;
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// Update an existing item
app.put("/items/:id", (req, res) => {
  const data = readData();
  const itemId = req.params.id;
  const updatedItem = req.body;

  const itemIndex = data.findIndex((item) => item.id == itemId);
  if (itemIndex !== -1) {
    data[itemIndex] = { ...data[itemIndex], ...updatedItem };
    writeData(data);
    res.json(data[itemIndex]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  const data = readData();
  const itemId = req.params.id;

  const newData = data.filter((item) => item.id != itemId);
  if (newData.length !== data.length) {
    writeData(newData);
    res.json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
