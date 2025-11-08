const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  description: String,
  url: String,
  sourceFeed: String,
  externalId: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
