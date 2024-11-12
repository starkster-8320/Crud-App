const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://dixitpatel83str:dixit8320@cluster0.oc54y.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define a simple schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const User = mongoose.model("User", userSchema);

// CRUD Routes

// 1. Create a new user (Create operation)
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  const newUser = new User({ name, age });
  await newUser.save();
  res.status(201).json(newUser);
});

// 2. Get all users (Read operation)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// 3. Update a user (Update operation)
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { name, age }, { new: true });
  res.status(200).json(updatedUser);
});

// 4. Delete a user (Delete operation)
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
