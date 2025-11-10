require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

//  Import Routes
const importRoutes = require("./routes/importRoutes");
const jobRoutes = require("./routes/jobRoutes");
const importLogRoutes = require("./routes/importLogRoutes");

//  Connect MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); // JSON body parser

//  API Routes
app.use("/api/import", importRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/import-logs", importLogRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Job Importer API is running...");
});

//  Error Handling Middleware (optional, clean output)
app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
