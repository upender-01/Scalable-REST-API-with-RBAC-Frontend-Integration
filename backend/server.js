require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Task = require('./models/Task');
const { verifyToken } = require('./middleware/auth');

const app = express();

/* ================= CORS ================= */
app.use(cors({
  origin: "https://rest-api-00.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ================= MongoDB Connection ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err.message);
    process.exit(1);
  });

/* ================= Test Route ================= */
app.get('/', (req, res) => {
  res.send("Backend is Working ");
});

/* ================= AUTH APIs ================= */

// REGISTER
app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(" REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });

  } catch (error) {
    console.error(" LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= TASK APIs ================= */

// GET TASKS
app.get('/api/v1/tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(" FETCH TASK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE TASK
app.post('/api/v1/tasks', verifyToken, async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      user: req.user.id
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE TASK
app.delete('/api/v1/tasks/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(" DELETE TASK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
