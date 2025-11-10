const express = require("express");
const router = express.Router();
const importController = require("../controllers/importController");

// POST route for importing jobs
router.post("/", async (req, res) => {
  const { feedUrl } = req.body;

  if (!feedUrl) {
    return res.status(400).json({ message: "Feed URL is required" });
  }

  try {
    await importController.importJobs(feedUrl);
    res.json({ message: "Job import started successfully!" });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import jobs", error: error.message });
  }
});

module.exports = router;
