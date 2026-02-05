const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/expense");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ADD expense
app.post("/add-expense", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json({ message: "Expense Added" });
});

// GET all expenses
app.get("/expenses", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

// DELETE expense
app.delete("/delete-expense/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense Deleted" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
