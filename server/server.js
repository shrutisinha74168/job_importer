require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const importRoutes = require("./routes/importRoutes");
const jobRoutes = require("./routes/jobRoutes");
const importLogRoutes = require("./routes/importLogRoutes");

// Connect Database
connectDB();

const app = express();

// ✅ Middleware (must come BEFORE routes)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json()); // <-- move this line above routes

// ✅ Routes
app.use("/api/import", importRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/import-logs", importLogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
