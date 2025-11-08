const mongoose = require("mongoose");

const ImportLogSchema = new mongoose.Schema({
  feedUrl: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
}, { timestamps: true });

module.exports = mongoose.model("ImportLog", ImportLogSchema);
