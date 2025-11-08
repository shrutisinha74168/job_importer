const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(50);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getImportLogs = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getJobs, getImportLogs };
