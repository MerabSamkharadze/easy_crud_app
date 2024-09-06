const express = require("express");
const fs = require("fs");

const { readData, writeData, DATA_FILE } = require("./helper");

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON bodies

// Read all items
app.get("/items", (req, res) => {
  const data = readData();
  res.json(data);
});

// Create a new items
app.post("/items", (req, res) => {
  const data = readData();

  const nextId =
    data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

  const newItem = { id: nextId, ...req.body };

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
