const express = require("express");
const router = express.Router();
const importJobs = require("../controllers/importController");

// ye route jab hit hoga tab feed URL se jobs import karega
router.post("/", async (req, res) => {
  const { feedUrl } = req.body;

  if (!feedUrl) {
    return res.status(400).json({ message: "Feed URL is required" });
  }

  await importJobs(feedUrl);
  res.json({ message: "Job import started successfully!" });
});

module.exports = router;
