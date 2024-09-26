const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true, // If you need credentials like cookies, authorization headers, etc.
};
app.use(cors(corsOptions));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle preflight requests (CORS preflight)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error("MongoDB connection error:", e));

// Import models
require("./userDetails");
require("./blogDetails");
require("./productDetails");
require("./feedbackDetails");


const User = mongoose.model("UserInfo");
const Blog = mongoose.model("BlogData");
const Product = mongoose.model("ProductData");
const Feedback = mongoose.model("Feedback");


// Register route
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ status: "error", message: "Registration failed" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "5m" });
      return res.json({
        status: "ok",
        data: {
          token,
          userType: user.userType,
          fname: user.fname,
          lname: user.lname,
        },
      });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch user data route
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    const data = await User.findOne({ email: useremail });
    res.json({ status: "ok", data });
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch user data" });
  }
});

// Create blog route
app.post("/create-blog", async (req, res) => {
  const { title, body, tag, date, userName, userAvatar, image, tags } = req.body;

  // Validate required fields
  if (!title || !userName || !userAvatar || !tags) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    // Create a new blog post
    const newBlog = new Blog({
      title,
      body,
      tag,
      date: new Date(date), // Convert date string to Date object
      userName,
      userAvatar,
      image,
      tags,
    });

    // Save the blog post to the database
    await newBlog.save();
    res.status(201).json({ status: "success", message: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ status: "error", message: "Failed to create blog" });
  }
});

// Fetch all blogs route
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch blogs" });
  }
});

// New endpoint to fetch unique tags
app.get("/tags", async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'tags'); // Retrieve only the tags field
    const uniqueTags = [...new Set(blogs.flatMap(blog => blog.tags))]; // Extract unique tags
    res.json(uniqueTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch tags" });
  }
});
// Product creation route
app.post("/create-product", async (req, res) => {
  const { name, description, price, image } = req.body;

  // Validate required fields
  if (!name || !description || !price) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ status: "success", message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ status: "error", message: "Failed to create product" });
  }
});

// Fetch all products route
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch products" });
  }
});

// Feedback submission route
app.post("/submit-feedback", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ status: "error", message: "Email and message are required" });
  }

  try {
    const newFeedback = new Feedback({ email, message });
    await newFeedback.save();
    res.status(201).json({ status: "success", message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ status: "error", message: "Failed to submit feedback" });
  }
});

// Forgot password route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ status: "error", message: "User does not exist" });
    }

    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password/${oldUser._id}/${token}`; 

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`, // Add email content
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ status: "error", message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ status: "ok", message: "Password reset link sent" });
      }
    });
  } catch (error) {
    console.error("Forgot password process failed:", error);
    res.status(500).json({ status: "error", message: "Failed to process request" });
  }
});

// Reset password routes (GET and POST)
app.route("/reset-password/:id/:token")
  .get(async (req, res) => {
    const { id, token } = req.params;
    try {
      const oldUser = await User.findOne({ _id: id });
      if (!oldUser) {
        return res.status(404).json({ status: "error", message: "User does not exist" });
      }

      const secret = JWT_SECRET + oldUser.password;
      jwt.verify(token, secret); // Token verification
      return res.status(200).json({ status: "success", message: "Token is valid" });
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(400).json({ status: "error", message: "Token is invalid or expired" });
    }
  })
  .post(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      const oldUser = await User.findOne({ _id: id });
      if (!oldUser) {
        return res.status(404).json({ status: "error", message: "User does not exist" });
      }

      const secret = JWT_SECRET + oldUser.password;
      jwt.verify(token, secret); // Verify token

      const encryptedPassword = await bcrypt.hash(password, 10); // Encrypt new password
      await User.updateOne({ _id: id }, { $set: { password: encryptedPassword } });
      res.status(200).json({ status: "success", message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(400).json({ status: "error", message: "Failed to reset password" });
    }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








