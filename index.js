const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());

const items = [];

app.get("/api/items", (req, res) => {
  res.json(items);
});
app.get("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});
app.post("/api/items", (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now();
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);

  const index = items.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
