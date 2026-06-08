const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Users");
const cors = require("cors");
const express = require("express");
const auth = require("./middleware/auth");

const mongoose = require("mongoose");
const app = express();
app.use(cors());

app.use(express.json());


mongoose.connect(
   process.env.MONGO_URI
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// fake database
const users = {

  octocat: {

    name: "The Octocat",

    followers: 5000

  },

  tanzil: {

    name: "Tanzil",

    followers: 120

  }

};



app.get("/user/:username", (req, res) => {
  const username = req.params.username;

  const user = users[username];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email: email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.get("/profile", auth, async (req, res) => {

  const user = await User.findById(
    req.user.userId
  ).select("-password");

  res.json(user);

});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on ${process.env.PORT}`
    );
  }
);   